// Deal Management System JavaScript
class DealManagementForm {
    constructor() {
        this.currentSection = 1;
        this.totalSections = 8;
        this.formData = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeForm();
        this.updateNavigation();
        this.setupConditionalLogic();
    }

    setupEventListeners() {
        // Navigation buttons
        document.getElementById('prevBtn').addEventListener('click', () => this.changeSection(-1));
        document.getElementById('nextBtn').addEventListener('click', () => this.changeSection(1));
        
        // Section indicators
        document.querySelectorAll('.indicator').forEach(indicator => {
            indicator.addEventListener('click', (e) => {
                const section = parseInt(e.target.dataset.section);
                this.goToSection(section);
            });
        });

        // Form submission
        document.getElementById('dealForm').addEventListener('submit', (e) => this.handleSubmit(e));

        // Auto-save functionality
        document.getElementById('dealForm').addEventListener('input', () => this.autoSave());
        document.getElementById('dealForm').addEventListener('change', () => this.autoSave());

        // Conditional logic triggers
        document.getElementById('investmentStructure').addEventListener('change', () => this.handleInvestmentStructureChange());
        document.getElementById('assetClass').addEventListener('change', () => this.handleAssetClassChange());
        document.getElementById('isSecondary').addEventListener('change', () => this.handleSecondaryChange());
        document.getElementById('industrySectorSelect').addEventListener('change', () => this.handleIndustrySectorChange());
    }

    initializeForm() {
        // Set current date
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('submissionDate').value = today;
        
        // Generate Deal ID
        const dealId = 'DEAL-' + Date.now().toString().slice(-8);
        document.getElementById('dealId').value = dealId;

        // Load saved data if exists
        this.loadSavedData();
    }

    changeSection(direction) {
        const newSection = this.currentSection + direction;
        
        if (newSection < 1 || newSection > this.totalSections) return;
        
        // Validate current section before moving
        if (direction > 0 && !this.validateCurrentSection()) {
            return;
        }
        
        this.goToSection(newSection);
    }

    goToSection(sectionNumber) {
        if (sectionNumber < 1 || sectionNumber > this.totalSections) return;
        
        // Hide current section
        document.querySelector('.form-section.active').classList.remove('active');
        
        // Show target section
        const targetSection = this.getVisibleSectionByNumber(sectionNumber);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionNumber;
            this.updateNavigation();
            this.updateProgressBar();
            this.updateSectionIndicators();
        }
    }

    getVisibleSectionByNumber(sectionNumber) {
        const sections = document.querySelectorAll('.form-section');
        let visibleSectionCount = 0;
        
        for (let section of sections) {
            if (this.isSectionVisible(section)) {
                visibleSectionCount++;
                if (visibleSectionCount === sectionNumber) {
                    return section;
                }
            }
        }
        return null;
    }

    isSectionVisible(section) {
        const sectionId = section.id;
        
        // Always visible sections
        if (!section.classList.contains('conditional-section')) {
            return true;
        }
        
        // Investment structure specific sections
        const investmentStructure = document.getElementById('investmentStructure').value;
        if (sectionId === 'directInvestmentSection' && investmentStructure === 'direct') return true;
        if (sectionId === 'fundInvestmentSection' && investmentStructure === 'fund') return true;
        if (sectionId === 'coInvestmentSection' && investmentStructure === 'co-investment') return true;
        
        // Secondary section
        const isSecondary = document.getElementById('isSecondary').checked;
        if (sectionId === 'secondarySection' && isSecondary) return true;
        
        return false;
    }

    updateNavigation() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');
        
        // Update previous button
        prevBtn.disabled = this.currentSection === 1;
        
        // Update next/submit button
        const visibleSections = this.getVisibleSectionCount();
        if (this.currentSection === visibleSections) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'flex';
        } else {
            nextBtn.style.display = 'flex';
            submitBtn.style.display = 'none';
        }
    }

    getVisibleSectionCount() {
        const sections = document.querySelectorAll('.form-section');
        let count = 0;
        sections.forEach(section => {
            if (this.isSectionVisible(section)) count++;
        });
        return count;
    }

    updateProgressBar() {
        const visibleSections = this.getVisibleSectionCount();
        const progress = (this.currentSection / visibleSections) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
    }

    updateSectionIndicators() {
        const indicators = document.querySelectorAll('.indicator');
        const visibleSections = this.getVisibleSectionCount();
        
        indicators.forEach((indicator, index) => {
            const sectionNum = index + 1;
            
            if (sectionNum <= visibleSections) {
                indicator.style.display = 'flex';
                indicator.classList.remove('active', 'completed');
                
                if (sectionNum === this.currentSection) {
                    indicator.classList.add('active');
                } else if (sectionNum < this.currentSection) {
                    indicator.classList.add('completed');
                }
            } else {
                indicator.style.display = 'none';
            }
        });
    }

    setupConditionalLogic() {
        this.handleInvestmentStructureChange();
        this.handleAssetClassChange();
        this.handleSecondaryChange();
    }

    handleInvestmentStructureChange() {
        const investmentStructure = document.getElementById('investmentStructure').value;
        
        // Hide all structure-specific sections
        document.getElementById('directInvestmentSection').style.display = 'none';
        document.getElementById('fundInvestmentSection').style.display = 'none';
        document.getElementById('coInvestmentSection').style.display = 'none';
        
        // Show relevant section
        switch (investmentStructure) {
            case 'direct':
                document.getElementById('directInvestmentSection').style.display = 'block';
                this.handleAssetClassChange(); // Update asset-specific fields
                break;
            case 'fund':
                document.getElementById('fundInvestmentSection').style.display = 'block';
                break;
            case 'co-investment':
                document.getElementById('coInvestmentSection').style.display = 'block';
                this.handleAssetClassChange(); // Update asset-specific fields
                break;
        }
        
        this.updateSectionIndicators();
        this.updateNavigation();
    }

    handleAssetClassChange() {
        const assetClass = document.getElementById('assetClass').value;
        const investmentStructure = document.getElementById('investmentStructure').value;
        
        // Hide all asset-class-specific fields
        document.getElementById('industrySector').style.display = 'none';
        document.getElementById('propertyType').style.display = 'none';
        document.getElementById('creditType').style.display = 'none';
        document.getElementById('infrastructureType').style.display = 'none';
        document.getElementById('resourceType').style.display = 'none';
        
        // Show relevant fields based on asset class
        switch (assetClass) {
            case 'private-equity':
            case 'venture-capital':
            case 'growth-equity':
                document.getElementById('industrySector').style.display = 'block';
                this.showInstrumentTypeForDirect();
                break;
            case 'real-estate':
                document.getElementById('propertyType').style.display = 'block';
                this.showInvestmentStrategyForDirect();
                break;
            case 'private-credit':
                document.getElementById('creditType').style.display = 'block';
                this.hideInstrumentTypeForDirect();
                break;
            case 'infrastructure':
                document.getElementById('infrastructureType').style.display = 'block';
                this.showInvestmentStrategyForDirect();
                break;
            case 'natural-resources':
                document.getElementById('resourceType').style.display = 'block';
                this.showInvestmentStrategyForDirect();
                break;
        }
        
        this.handleSecondaryChange(); // Update secondary-specific logic
    }

    showInstrumentTypeForDirect() {
        const investmentStructure = document.getElementById('investmentStructure').value;
        if (investmentStructure === 'direct' || investmentStructure === 'co-investment') {
            document.getElementById('instrumentType').style.display = 'block';
        }
        document.getElementById('investmentStrategy').style.display = 'none';
    }

    showInvestmentStrategyForDirect() {
        const investmentStructure = document.getElementById('investmentStructure').value;
        if (investmentStructure === 'direct' || investmentStructure === 'co-investment') {
            document.getElementById('investmentStrategy').style.display = 'block';
        }
        document.getElementById('instrumentType').style.display = 'none';
    }

    hideInstrumentTypeForDirect() {
        document.getElementById('instrumentType').style.display = 'none';
        document.getElementById('investmentStrategy').style.display = 'none';
    }

    handleSecondaryChange() {
        const isSecondary = document.getElementById('isSecondary').checked;
        const investmentStructure = document.getElementById('investmentStructure').value;
        
        // Show/hide secondary section
        if (isSecondary) {
            document.getElementById('secondarySection').style.display = 'block';
            this.updateSecondaryLabels();
            this.updateSecondaryRequiredFields();
        } else {
            document.getElementById('secondarySection').style.display = 'none';
            this.resetSecondaryLabels();
            this.resetSecondaryRequiredFields();
        }
        
        this.updateSectionIndicators();
        this.updateNavigation();
    }

    updateSecondaryLabels() {
        const investmentStructure = document.getElementById('investmentStructure').value;
        
        switch (investmentStructure) {
            case 'direct':
                this.updateLabel('companyName', 'Target Portfolio Company');
                this.updateLabel('proposedInvestmentAmount', 'Secondary Purchase Price');
                this.updateLabel('proposedValuation', 'Implied Portfolio Valuation');
                this.updateLabel('ownershipPercentage', 'Acquired Ownership Percentage');
                break;
            case 'fund':
                this.updateLabel('fundName', 'Target Fund Name');
                this.updateLabel('proposedCommitment', 'Secondary Purchase Price');
                this.updateLabel('minimumCommitment', 'Purchase as % of Total Fund');
                break;
            case 'co-investment':
                // Show warning for co-investment secondary
                this.showSecondaryWarning();
                break;
        }
    }

    resetSecondaryLabels() {
        this.updateLabel('companyName', 'Company Name');
        this.updateLabel('proposedInvestmentAmount', 'Proposed Investment Amount');
        this.updateLabel('proposedValuation', 'Proposed Valuation');
        this.updateLabel('ownershipPercentage', 'Ownership Percentage');
        this.updateLabel('fundName', 'Fund Name');
        this.updateLabel('proposedCommitment', 'Proposed Commitment');
        this.updateLabel('minimumCommitment', 'Minimum Commitment');
        this.hideSecondaryWarning();
    }

    updateLabel(fieldId, newText) {
        const label = document.querySelector(`label[for="${fieldId}"]`);
        if (label) {
            const required = label.innerHTML.includes('<span class="required">');
            label.innerHTML = newText + (required ? ' <span class="required">*</span>' : '');
        }
    }

    updateSecondaryRequiredFields() {
        // Make secondary-specific fields required
        this.setRequired('sellerType', true);
        this.setRequired('discountPremiumNAV', true);
        
        const investmentStructure = document.getElementById('investmentStructure').value;
        if (investmentStructure === 'fund') {
            this.setRequired('remainingFundLife', true);
        }
    }

    resetSecondaryRequiredFields() {
        this.setRequired('sellerType', false);
        this.setRequired('discountPremiumNAV', false);
        this.setRequired('remainingFundLife', false);
    }

    setRequired(fieldId, required) {
        const field = document.getElementById(fieldId);
        const label = document.querySelector(`label[for="${fieldId}"]`);
        
        if (field && label) {
            if (required) {
                field.setAttribute('required', '');
                if (!label.innerHTML.includes('<span class="required">')) {
                    label.innerHTML += ' <span class="required">*</span>';
                }
            } else {
                field.removeAttribute('required');
                label.innerHTML = label.innerHTML.replace(' <span class="required">*</span>', '');
            }
        }
    }

    showSecondaryWarning() {
        // Implementation for showing warning message
        console.log('Warning: Co-investments are typically primary investments. Confirm this is secondary.');
    }

    hideSecondaryWarning() {
        // Implementation for hiding warning message
    }

    handleIndustrySectorChange() {
        const industry = document.getElementById('industrySectorSelect').value;
        
        // Hide all sub-sector fields (would be implemented with additional HTML)
        // For now, just log the change
        console.log('Industry sector changed to:', industry);
        
        // In a full implementation, you would show/hide technology, healthcare, 
        // financial services sub-sectors based on the industry selection
    }

    validateCurrentSection() {
        const currentSectionElement = document.querySelector('.form-section.active');
        const requiredFields = currentSectionElement.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                this.showFieldError(field, 'This field is required');
                isValid = false;
            } else {
                this.clearFieldError(field);
            }
        });
        
        // Additional validation logic
        if (currentSectionElement.dataset.section === '1') {
            isValid = this.validateSection1() && isValid;
        }
        
        return isValid;
    }

    validateSection1() {
        const email = document.getElementById('submitterEmail').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && !emailRegex.test(email)) {
            this.showFieldError(document.getElementById('submitterEmail'), 'Please enter a valid email address');
            return false;
        }
        
        return true;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.validation-message.error');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'validation-message error';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorMessage = field.parentNode.querySelector('.validation-message.error');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    autoSave() {
        const formData = new FormData(document.getElementById('dealForm'));
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Save to localStorage
        localStorage.setItem('dealFormData', JSON.stringify(data));
        localStorage.setItem('dealFormCurrentSection', this.currentSection.toString());
    }

    loadSavedData() {
        const savedData = localStorage.getItem('dealFormData');
        const savedSection = localStorage.getItem('dealFormCurrentSection');
        
        if (savedData) {
            const data = JSON.parse(savedData);
            
            // Populate form fields
            Object.keys(data).forEach(key => {
                const field = document.getElementById(key) || document.querySelector(`[name="${key}"]`);
                if (field) {
                    if (field.type === 'checkbox') {
                        field.checked = data[key] === 'on';
                    } else {
                        field.value = data[key];
                    }
                }
            });
            
            // Restore section
            if (savedSection) {
                this.currentSection = parseInt(savedSection);
                this.goToSection(this.currentSection);
            }
            
            // Trigger conditional logic
            this.setupConditionalLogic();
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        // Validate entire form
        if (!this.validateEntireForm()) {
            alert('Please fill in all required fields before submitting.');
            return;
        }
        
        // Collect form data
        const formData = new FormData(document.getElementById('dealForm'));
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Add checkbox values
        data.isSecondary = document.getElementById('isSecondary').checked;
        
        // Simulate form submission
        this.submitForm(data);
    }

    validateEntireForm() {
        const sections = document.querySelectorAll('.form-section');
        let isValid = true;
        
        sections.forEach(section => {
            if (this.isSectionVisible(section)) {
                const requiredFields = section.querySelectorAll('[required]');
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                    }
                });
            }
        });
        
        return isValid;
    }

    submitForm(data) {
        // Show loading state
        document.getElementById('submitBtn').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        document.getElementById('submitBtn').disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            console.log('Form submitted with data:', data);
            
            // Clear saved data
            localStorage.removeItem('dealFormData');
            localStorage.removeItem('dealFormCurrentSection');
            
            // Show success message
            this.showSuccessMessage();
            
            // Reset form
            document.getElementById('dealForm').reset();
            this.currentSection = 1;
            this.goToSection(1);
            this.initializeForm();
            
            // Reset submit button
            document.getElementById('submitBtn').innerHTML = '<i class="fas fa-check"></i> Submit Deal';
            document.getElementById('submitBtn').disabled = false;
        }, 2000);
    }

    showSuccessMessage() {
        // Create success modal or notification
        const successDiv = document.createElement('div');
        successDiv.innerHTML = `
            <div style="position: fixed; top: 20px; right: 20px; background: var(--success-color); color: white; padding: 1rem 2rem; border-radius: 8px; box-shadow: var(--shadow-lg); z-index: 1000;">
                <i class="fas fa-check-circle"></i> Deal submitted successfully!
            </div>
        `;
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 5000);
    }
}

// Global functions for HTML onclick handlers
function changeSection(direction) {
    window.dealForm.changeSection(direction);
}

// Initialize the form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dealForm = new DealManagementForm();
});

// Additional utility functions
function formatCurrency(input) {
    // Format currency inputs
    let value = input.value.replace(/[^\d.]/g, '');
    if (value) {
        input.value = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    }
}

function formatPercentage(input) {
    // Format percentage inputs
    let value = parseFloat(input.value);
    if (!isNaN(value)) {
        input.value = Math.min(100, Math.max(0, value));
    }
}

// Add event listeners for currency and percentage formatting
document.addEventListener('DOMContentLoaded', () => {
    // Currency fields
    const currencyFields = [
        'annualRevenue', 'proposedInvestmentAmount', 'proposedValuation',
        'targetFundSize', 'minimumCommitment', 'proposedCommitment',
        'totalRoundSize', 'coInvestmentAvailable', 'proposedCoInvestmentAmount'
    ];
    
    currencyFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', () => formatCurrency(field));
        }
    });
    
    // Percentage fields
    const percentageFields = [
        'revenueGrowthRate', 'ownershipPercentage', 'managementFee',
        'carriedInterest', 'probabilityOfInvestment', 'discountPremiumNAV'
    ];
    
    percentageFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', () => formatPercentage(field));
        }
    });
});