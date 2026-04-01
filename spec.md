# QS Digital

## Current State
The Online Job Apply section has 17 job listings. Each job card has a "View Details" button that opens a modal (JobDetailsModal) with full job info. The modal is rendered at the App level using `selectedJob` state. Job cards (GovJobCard) have no watermark styling.

## Requested Changes (Diff)

### Add
- A dedicated `JobDetailPage` component that renders full job details as an in-app page (not modal) — shown when "View Details" is clicked.
- A `JobWatermark` SVG/CSS watermark overlay on each `GovJobCard` that shows "QS DIGITAL" 2–3 times diagonally, very faint (opacity ~0.06), not obstructing readability.
- `currentJobPage` state in App to track which job's detail page is open (null = list view, job object = detail page).

### Modify
- `GovJobCard` — change `onViewDetails` button to navigate to the dedicated page instead of modal.
- App state — add `currentJobPage` state; keep `selectedJob` for any legacy use or remove it in favour of `currentJobPage`.
- The job section rendering — when `currentJobPage` is set, render `JobDetailPage` instead of the job list.

### Remove
- `JobDetailsModal` can be kept for fallback, but the "View Details" button now navigates to the new page instead.

## Implementation Plan
1. Add `JobWatermark` overlay div inside `GovJobCard` — positioned absolute, repeating diagonal "QS DIGITAL" text 3 times, opacity 0.06, pointer-events none.
2. Create `JobDetailPage` component with same content as `JobDetailsModal` but rendered as a full-width page with a back button at the top.
3. Add `currentJobPage` state to App; wire `GovJobCard` `onViewDetails` to set it.
4. In the job section render: if `currentJobPage` is set, show `JobDetailPage`; otherwise show the list.
5. Remove the modal trigger for View Details (keep modal code in case needed elsewhere or remove cleanly).
