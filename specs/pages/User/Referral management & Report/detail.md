## Page Profile
- **Page Title:** Referral Record Details
- **Layout:** Single Column Centered
- **Primary Action:** Back to List
- **Secondary Action:** None (View Only)

---

## Section 1: Referrer Information
*Description: Basic read-only information of the selected referrer.*

| Field Label | Input Type | Requirement | Placeholder/Value |
| :--- | :--- | :--- | :--- |
| User Full Name | Read-only Text | Required | First Name + Last Name |
| User Type | Read-only Badge | Required | End-user / Sub-agent |
| Referral Code | Read-only Text | Required | REF-XXXXXX |

---

## Section 2: Basic Stats
*Use this section to display referral performance summary.*

- **Total Earned Point:** Read-only Number | Value: "0"
- **Referred Count:** Read-only Number | Value: "0"
- **Active Referred Children:** Read-only Number | Value: "0"

---

## Section 3: Referred Children List
- **Purpose:** Show the list of child users who used this user's referral code.
- **Display Type:** Read-only Table
- **Columns:** Child User Name, Child User Type, Joined Date, Status
- **Row Interaction:** View only (no edit, no delete, no duplicate)

---

## Footer / Floating Actions
- [Left Side]: None
- [Right Side]: [Back to List Button]