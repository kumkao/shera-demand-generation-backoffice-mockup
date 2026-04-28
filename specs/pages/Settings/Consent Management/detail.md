## Page Profile
- **Page Title:** Consent Details
- **Layout:** Single Column Centered
- **Primary Action:** Save Consent
- **Secondary Action:** Cancel

---

## Section 1: Consent Metadata
*Description: Define consent identity and scope by user type.*

| Field Label | Input Type | Requirement | Placeholder/Value |
| :--- | :--- | :--- | :--- |
| Consent Title | Text | Required | e.g., PDPA Consent 2026 |
| User Type | Select | Required | Agent / Sub-agent / End-user |
| Consent Version | Text | Required | e.g., v1.0.0 (Must be unique per selected User Type) |
| Status | Toggle | Required | Active / Inactive |

---

## Section 2: Consent Content
*Use this section to compose and format consent text.*

- **Content Editor:** WYSIWYG Rich Text Editor | Required
- **Supported Formatting:** Heading, Bold, Italic, Underline, Ordered List, Unordered List, Link
- **Preview:** Inline preview from the same editor content

---

## Section 3: Validation Rules & Audit
- **Unique Version Rule:** On create, Consent Version must be unique within the selected User Type.
- **Single Active Rule:** Only one Active consent is allowed for each User Type (Agent, Sub-agent, End-user).
- **Activation Behavior:** If Status is set to Active and another Active consent exists for the same User Type, system auto-deactivates the previous one after confirmation.
- **Created By:** [System Label]
- **Last Modified:** [Timestamp]

---

## Footer / Floating Actions
- [Left Side]: None
- [Right Side]: [Cancel Button] [Save Consent Button (Primary Style)]