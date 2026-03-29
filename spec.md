# QS Digital — Reviews Feature

## Current State
A single-page website for QS Digital with Hero, Services, About, and Contact sections. The backend is an empty Motoko actor. No review/feedback functionality exists.

## Requested Changes (Diff)

### Add
- Backend: `submitReview(name, rating, comment)` to store reviews on-chain
- Backend: `getReviews()` to return all submitted reviews (publicly readable)
- Frontend: New "Reviews" section between Contact and Footer
  - Star rating input (1–5)
  - Name field
  - Written review / comment textarea
  - Submit button with loading/success states
  - Display all submitted reviews as cards (name, stars, comment, date)
- Navigation link "Reviews" added to NAV_LINKS

### Modify
- `src/backend/main.mo` — add review storage and query/update methods
- `src/frontend/src/App.tsx` — add Reviews section and nav link

### Remove
- Nothing removed

## Implementation Plan
1. Generate Motoko backend with Review type, stable storage, submitReview update, getReviews query
2. Update frontend App.tsx to add Reviews section with form + display
3. Wire frontend to backend using useActor hook
