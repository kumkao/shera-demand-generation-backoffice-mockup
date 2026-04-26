## Page Profile
- **Page Title:** [Inspiring Catalog Details #1029]
- **Layout:** [2-Column Split]
- **Primary Action:** [Save Changes]
- **Secondary Action:** [Cancel / Duplicate]

---

## Section 1: [Primary Category Name - e.g., Basic Information]
*Description: Brief summary of what this section handles.*

- **Main Menu Name:** [Input Type: TextInput] | Value: "" | Required: True
- **Icon Image Preview:** [Input Type: Image] | Value: "" | Required: True
- **Upload Image:** [Input Type: UploadFile] | Value: "" | Required: True
- **Main Menu URL:** [Input Type: URLInput] | Value: "" | Help Text: "https://www.shera.com/th/catalog" | Required: True
- **Status:** [Input Type: Select] | Value: "Public" | Options: [Public,Hidden] | Required: True

---

## Section 2: [Filters]
*show the table of input with inline edit and row dragging for ordering*

| Field Label | Input Type | Requirement | Placeholder/Value |
| :--- | :--- | :--- | :--- |
| Filter Name | TextInput | Required | - |
| Image Preview | Image | Required | - |
| Icon Image | UploadFile | Required | - |
| Query Parameter | TextInput | Required | placeholder: "type=example", help text: "example: https://www.shera.com/th/catalog/post1?type=example" |
| Is Public? | Boolean | Required |  |
| Action | Actions | - | [Remove],[Duplicate] |

---

## Section 3: [Additional Info]
- **Created By:** [System Label]
- **Last Modified:** [Timestamp]
- **Created Date:** [Date in YYYY-MM-DD HH:mm:ss]

---

## Footer / Floating Actions
- [Left Side]: [Delete Button (Danger Style)]
- [Right Side]: [Cancel Button] [Submit Button (Primary Style)]