## Page Identity
- **Page Title:** [End-User Management]
- **Primary Page Action:** [e.g., + Add New Item / Export To CSV]

---

## Utility Bar (Filters & Search)
- **Search:** [placeholder: Search Name or Phone Number]
- **Primary Filters:** - [User Type]: [Type: Single-select Dropdown [Contractor', 'Designer', 'Technician]]
    - [Register Date]: [Type: DateRangeWithPreset]
    - [Status]: [Type: SingleSelect Dropdown [Active, Inactive]]
- **Secondary Actions:** [Export CSV]

---

## Table Configuration
- **Row Selection:** [Yes]

| Column Header | Data Type | Sortable | Alignment | Style/Component |
| :--- | :--- | :--- | :--- | :--- |
| [User ID] | [String/ID] | [Yes/No] | [Left] | [Plain Text] |
| [Name] | [String] | [Yes] | [Right] | [Plain] |
| [Phone] | [String] | [Yes] | [Center] | [Phone Format] |
| [User Type] | [String] | [No] | [Left] | [Plain] |
| [Register Date] | [Date] | [No] | [Left] | [Date format: YYYY-MM-DD HH:mm] |
| [Status] | [Status] | [No] | [Left] | [Badge/Pill Component] |

---

## Row Actions
*What happens when a user interacts with a specific row?*
- **Primary Hover Action:** [e.g., View]
- **Menu Items:** [Duplicate, [Active/Inactive], Delete (Danger)]

---

## Footer & Pagination
- **Pagination Type:** [e.g., Numbered Pages / Infinite Scroll]
- **Items Per Page:** [e.g., 10, 25, 50, 100]
- **Summary Stats:** [e.g., Total: 1,240 items | Selected: 0]