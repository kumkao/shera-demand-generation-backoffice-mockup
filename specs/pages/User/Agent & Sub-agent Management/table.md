## Page Identity
- **Page Title:** Agent & Sub-agent Management
- **Primary Page Action:**
[]

---

## Utility Bar (Filters & Search)
- **Search:** [Label: [Search Label]] [Placeholder: Search by Name or Phone]
- **Primary Filters:**
- Status: [Type: Select] [Config: Not Verified,Verified,Waiting For Approve]
- Registered Date: [Type: DatePickerInput] [Config: Range]
- User Type: [Type: Select] [Config: Agent,Sub-agent]
- **Secondary Actions:**
- Export to Excel: [Type: IconButton] [Config: icon=Excel, variant=light, color=orange, size=sm]

---

## Table Configuration
- **Density:** Comfortable
- **Row Selection:** Yes

| Column Header | Data Type | Sortable | Alignment | Style/Component |
| :--- | :--- | :--- | :--- | :--- |
| ID | String | Yes | Left | monospace font |
| Agent/Sub-agent Name | String | Yes | Left | [Plain Text] |
| Owner Phone | String | Yes | Left | Telephone format |
| Total Points | Number | No | Right | [Plain Text] |
| [User Type] | [String] | [No] | [Left] | [Badge/Pill Component] |
| [Register Date] | [Date] | [No] | [Left] | [Date format: YYYY-MM-DD HH:mm] |
| [Status] | [Status] | [No] | [Left] | [Badge/Pill Component [Not Verified,Verified,Waiting For Approve]] |

---

## Row Actions
*What happens when a user interacts with a specific row?*
- **Primary Hover Action:** View
- **Menu Items:** [[Active/Inactive],  Delete (Danger)]

---

## Footer & Pagination
- **Pagination Type:** Numbered Pages
- **Items Per Page:** [10, 25, 50, 100]
- **Summary Stats:** Total: 1,240 items | Selected: 0

---

## Actions
- **Buttons:**
[]