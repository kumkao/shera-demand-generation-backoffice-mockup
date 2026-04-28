## Page Identity
- **Page Title:** Referral Management & Report
- **Primary Page Action:** Export to CSV

---

## Utility Bar (Filters & Search)
- **Search:** Search by name
- **Primary Filters:**
    - User Type: Single-select Dropdown (End-user, Sub-agent)
- **Secondary Actions:** Refresh

---

## Table Configuration
- **Density:** Comfortable
- **Row Selection:** No

| Column Header | Data Type | Sortable | Alignment | Style/Component |
| :--- | :--- | :--- | :--- | :--- |
| User Name | String | Yes | Left | Plain Text (First Name + Last Name) |
| User Type | Enum | Yes | Left | Badge/Pill (End-user, Sub-agent) |
| Total Earned Point | Number | Yes | Right | Numeric Text |
| Referred Count | Number | Yes | Right | Numeric Text |

---

## Row Actions
*What happens when a user interacts with a specific row?*
- **Primary Hover Action:** View Details
- **Menu Items:** View Details

---

## Footer & Pagination
- **Pagination Type:** Numbered Pages
- **Items Per Page:** 10, 25, 50, 100
- **Summary Stats:** Total referrals: [count]