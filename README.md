# Deal Management System - Interactive Form

A comprehensive, single-page form for investment deal management designed for small to mid-size investment institutions. This form implements the complete validated specification with modern UI/UX and intelligent conditional logic.

## Features

### ✨ Core Features
- **Single-Page Design**: All form sections on one page with smooth navigation
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Professional appearance with smooth animations and transitions
- **Auto-Save**: Automatically saves form progress to prevent data loss
- **Smart Validation**: Real-time validation with helpful error messages
- **Progress Tracking**: Visual progress bar and section indicators

### 🔄 Conditional Logic
- **Investment Structure Based**: Form adapts based on Direct/Fund/Co-Investment selection
- **Asset Class Specific**: Shows relevant fields for PE/VC/Growth, Real Estate, Private Credit, Infrastructure, Natural Resources
- **Secondary Investment Support**: Special handling for secondary market transactions
- **Dynamic Field Requirements**: Required fields change based on selections
- **Label Updates**: Field labels automatically update for secondary transactions

### 📊 Investment Structures Supported
1. **Direct Investment**: Company details, financial metrics, instrument types
2. **Fund Investment**: GP information, fund terms, commitment details  
3. **Co-Investment**: Lead investor details, deal information, access rights

### 🏢 Asset Classes Covered
- Private Equity with industry sector classification
- Venture Capital with technology/healthcare sub-sectors
- Growth Equity with business model options
- Real Estate with property types and investment strategies
- Private Credit with credit type classifications
- Infrastructure with infrastructure types and risk profiles
- Natural Resources with resource type classifications

### 💼 Secondary Investment Features
- Automatic label updates for secondary transactions
- Seller type classification
- Discount/premium to NAV pricing
- Remaining fund life tracking
- Reason for sale documentation

## Form Sections

### Section 1: Deal Overview
- Deal name and summary
- Submitter information
- Auto-generated submission date and deal ID

### Section 2: Investment Classification  
- Investment structure selection
- Asset class selection
- Secondary investment flag
- Asset-class-specific classifications

### Section 3: Investment Details
- Deal size range
- Geographic focus
- Timeline urgency
- Priority level

### Section 4: Structure-Specific Information
**Conditional sections based on investment structure:**
- Direct Investment Details
- Fund Investment Details  
- Co-Investment Details

### Section 5: Secondary Transaction Details
**Appears only for secondary investments:**
- Seller information
- Pricing details
- Transaction specifics

### Section 6: Pipeline Management
- Pipeline status
- Deal source tracking
- Assessment metrics
- Internal notes

### Section 7: Documents & Files
- File upload capabilities
- Document categorization
- Multi-file support

### Section 8: Additional Information
- Custom fields
- Additional notes
- Special considerations

## Technical Features

### 🎨 Modern Design
- CSS Grid and Flexbox layouts
- CSS Custom Properties for theming
- Smooth animations and transitions
- Professional color scheme
- Custom form controls

### 📱 Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interface
- Optimized navigation for mobile

### ⚡ Performance
- Efficient DOM manipulation
- Minimal external dependencies
- Fast loading and rendering
- Smooth animations

### 💾 Data Management
- LocalStorage for auto-save
- Form state persistence
- Progress restoration
- Data validation

## Usage

1. **Open the Form**: Open `index.html` in a web browser
2. **Fill Information**: Complete each section as needed
3. **Navigate**: Use Next/Previous buttons or click section indicators
4. **Auto-Save**: Form automatically saves progress
5. **Submit**: Complete form and submit when ready

## Validation Rules

### Required Fields
- All fields marked with red asterisk (*) are required
- Validation occurs when moving between sections
- Email format validation
- Percentage range validation (0-100%)
- Currency format validation

### Conditional Requirements
- Secondary investment fields become required when secondary flag is checked
- Asset-class-specific fields are required based on selections
- Investment structure determines which sections are required

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design for all screen sizes
- Progressive enhancement approach

## Customization

### Styling
- Modify CSS custom properties in `:root` for color scheme changes
- Responsive breakpoints can be adjusted in media queries
- Animation speeds and effects can be customized

### Fields
- Add new fields by following existing HTML structure
- Update JavaScript conditional logic for new field dependencies
- Extend validation rules as needed

### Sections
- Additional sections can be added by following the existing pattern
- Update navigation logic for new sections
- Extend conditional visibility logic

## File Structure

```
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript functionality and logic
└── README.md          # Documentation
```

## Key JavaScript Classes and Functions

### DealManagementForm Class
- `init()`: Initialize form and event listeners
- `changeSection()`: Navigate between sections
- `handleInvestmentStructureChange()`: Manage conditional sections
- `handleAssetClassChange()`: Show/hide asset-specific fields
- `handleSecondaryChange()`: Secondary investment logic
- `validateCurrentSection()`: Section-level validation
- `autoSave()`: Automatic form data saving
- `submitForm()`: Form submission handling

### Utility Functions
- `formatCurrency()`: Currency input formatting
- `formatPercentage()`: Percentage input validation
- `updateLabel()`: Dynamic label updates
- `showFieldError()`: Validation error display

## Implementation Notes

This form implements the complete validated specification from the Deal Management System document, including:

- ✅ All universal fields
- ✅ Conditional fields by asset class
- ✅ Investment structure specific fields
- ✅ Secondary investment enhancements
- ✅ Pipeline management fields
- ✅ Document upload capabilities
- ✅ Custom field support

The form treats all fields as optional from a user interaction perspective while maintaining the logical structure and validation rules from the specification.

## Future Enhancements

- Backend integration for form submission
- Advanced file upload with progress indicators
- Multi-language support
- Advanced analytics and reporting
- Integration with CRM systems
- Bulk import/export capabilities

---

Built with modern web technologies for optimal user experience and maintainability.