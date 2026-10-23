# Mobile copy

Read with `references/core/copy.md`.

## Permission pre-prompts (before the system dialog)
- Benefit, then control: "Turn on notifications to know when your order ships. You can change this anytime."
- Buttons: "Turn on" and "Not now". Never "Allow" on your own sheet; it imitates the OS.
- iOS purpose strings (set via app.json): specific and honest, e.g. "Used to scan receipts you choose to add."

## Push notifications
- Title under about 40 characters, body under about 110. Lead with the specific thing: "Your 9:40 flight to Lisbon is boarding at B12."
- No clickbait, no ALL CAPS, at most one emoji. Group related notifications.
- Every push deep-links to the exact screen.

## Onboarding and empty states
- One sentence of value, one action: "No trips yet. Forward a booking email to add one."
- Buttons are specific verbs ("Add trip"), not "Get started" everywhere.

## Errors
- What happened, why if known, what to do: "Couldn't save. You're offline. We'll retry when you reconnect."
- Inline near the cause; keep the user's input.

## Conventions
- One verb per action across the app (pick "Delete" or "Remove", not both).
- Android uses sentence case throughout; iOS may title-case navigation titles only.
