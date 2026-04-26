## Page Identity
- **Page Title:** [Knowledge Base]
- **Primary Page Action:** [Add New Item]

---

## Utility Bar (Filters & Search)
- **Search:** [Placeholder text "Search by Name"]
- **Primary Filters:** - [Public]: [Type: Select [Public,Hidden]]

---

## Table Configuration
*for row dragging use UI from https://icflorescu.github.io/mantine-datatable/examples/row-dragging (use first column to drag and drop row ordering)*
- **Row Selection:** [No]
- **Row Dragging:** [Yes]

| Column Header | Data Type | Sortable | Alignment | Style/Component |
| :--- | :--- | :--- | :--- | :--- |
| Main Menu | [String] | [No] | [Left] | [Plain Text] |
| Image Preview | [String] | [No] | [Left] | [Image] |
| [Public] | [Boolean] | [No] | [Left] | [Badge/Pill Component [Public,Hidden]] |
| Created At | [String] | Yes | Left | [Plain Text] |
| Updated At | [String] | Yes | Left | [Date in format YYYY-MM-DD HH:mm:ss] |
| Created By | [String] | Yes | Left | [Date in format YYYY-MM-DD HH:mm:ss] |

---

## Row Actions
*What happens when a user interacts with a specific row?*
- **Primary Hover Action:** [View]
- **Menu Items:** [Duplicate, [Public/Hidden], Delete (Danger)]

---

## Footer & Pagination
- **Pagination Type:** [e.g., Numbered Pages / Infinite Scroll]
- **Items Per Page:** [e.g., 10, 25, 50, 100]
- **Summary Stats:** [e.g., Total: 1,240 items | Selected: 0]