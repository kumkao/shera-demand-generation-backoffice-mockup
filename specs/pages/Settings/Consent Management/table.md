## Page Identity
- **Page Title:** Consent Management
- **Primary Page Action:** + Create New Consent

---

## Utility Bar (Filters & Search)
- **Search:** Search by consent title or version
- **Primary Filters:**
    - User Type: Single-select Dropdown (Agent, Sub-agent, End-user)
    - Status: Single-select Dropdown (Active, Inactive)
- **Secondary Actions:** Refresh

---

## Table Configuration
- **Density:** Comfortable
- **Row Selection:** No

| Column Header | Data Type | Sortable | Alignment | Style/Component |
| :--- | :--- | :--- | :--- | :--- |
| Consent Title | String | Yes | Left | Plain Text |
| User Type | Enum | Yes | Left | Badge/Pill (Agent, Sub-agent, End-user) |
| Consent Version | String | Yes | Left | Monospace Font |
| Status | Enum | Yes | Center | Badge/Pill (Active, Inactive) |
| Last Updated | Datetime | Yes | Left | Plain Text |

---

## Row Actions
*What happens when a user interacts with a specific row?*
- **Primary Hover Action:** View Details
- **Menu Items:** View Details, Edit, Set as Active
- **Activation Rule:** Only one consent can be Active for each user type. Setting one record to Active will auto-set other Active records of the same user type to Inactive.

---

## Footer & Pagination
- **Pagination Type:** Numbered Pages
- **Items Per Page:** 10, 25, 50, 100
- **Summary Stats:** Total consents: [count] | Active by type: Agent [count], Sub-agent [count], End-user [count]