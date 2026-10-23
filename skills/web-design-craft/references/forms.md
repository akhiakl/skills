# Forms

## Structure
- Visible `<label for>` on every field. Placeholders are examples, never labels.
- Group related fields with `<fieldset>` and `<legend>` (address, payment, radio groups).
- One column on mobile and usually on desktop. Short paired fields (city, postcode) may share a row.
- Mark optional fields, not required ones, when most are required.

## Inputs
- Correct `type` (`email`, `tel`, `url`, `number` only for true quantities), `inputmode`, `autocomplete` tokens (`given-name`, `email`, `street-address`, `one-time-code`, `cc-number`), `enterkeyhint`.
- Font size at least 16px on mobile so iOS does not zoom. Targets at least 44px tall on touch.
- Never block paste. Password fields allow managers and offer show/hide.
- Dates: native picker or three labeled fields for birthdays. Never force a calendar for a known date.

## Validation
- Validate on blur for format, on submit for everything. Do not show errors while the user is still typing the first time.
- Error text sits next to the field, linked with `aria-describedby`, and the field gets `aria-invalid="true"`.
- On submit with errors: focus the first invalid field, or an error summary at the top with links to each field for long forms.
- Errors say what is wrong and how to fix it: "Enter a date after 1 Jan 2026", not "Invalid input".
- Keep entered values after errors and after server failures.

## Submit
- Button label names the outcome: "Create account", "Pay ₹2,499".
- Disable only while submitting, show progress ("Creating account…"), and prevent double submit.
- Success: confirm what happened and what is next. Failure: keep data, explain, offer retry.

## Multi-step
- Show step count and names. Allow going back without data loss. Save progress for long flows.
- Ask the easy, committing questions first. Put payment last.
