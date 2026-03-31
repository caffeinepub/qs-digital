# QS Digital — Job Listings Update

## Current State
The Online Job Apply service section has:
- GNM 2026 exam notification card (JobNotificationCard)
- GOV_JOBS array with 9 job listings (Indian Army, Navy, Apex Bank, SAI, Gauhati HC, LRA, NIC, PNRD, BSNL)
- GovJobCard component showing: category badge, title, org, posts, last date, Apply Now button, View Details button, WhatsApp strip
- JobDetailsModal with: dates, vacancies, eligibility, exam pattern, how to apply, Apply Now + WhatsApp buttons
- Each job has only one URL field: `applyUrl`

## Requested Changes (Diff)

### Add
- `notificationUrl` field to each job in GOV_JOBS (Official Notification PDF/page link)
- "Important Links" row in GovJobCard showing: "📄 Official Notification" link + "🔗 Apply Online" link (both as small text links or chips)
- New jobs: Assam Police AB/UB Constable 2026 (SLPRB), APSC CCE 2026, SSC CHSL 2026, RRB NTPC 2026 (RRB Guwahati), NHM Assam Staff Nurse/ANM 2026, SSC CGL 2026
- "View Notification" button in JobDetailsModal alongside Apply Now

### Modify
- GOV_JOBS: Replace NIC, BSNL, Apex Bank, SAI, Indian Navy entries with the new Assam-centric ones (keep LRA, Gauhati HC, Indian Army, PNRD; add Assam Police, APSC, SSC CHSL, RRB NTPC, NHM Assam, SSC CGL)
- GovJobCard: Add "Important Links" section showing notificationUrl and applyUrl as separate clickable links before the action buttons
- JobDetailsModal: Add "View Official Notification" button in the footer action buttons row
- All existing jobs: add `notificationUrl` field (can be same as applyUrl for jobs where they share one URL)

### Remove
- Indian Navy Agniveer SSR 2026
- Assam Co-operative Apex Bank Assistant 2026
- SAI Assistant Coach 2026
- NIC Scientist-B 2026
- BSNL Senior Executive Trainee 2026

## Implementation Plan
1. Update GOV_JOBS array:
   - Add `notificationUrl` to type/data for all entries
   - Keep: Indian Army Agniveer, LRA Assam, Gauhati HC MTS, PNRD Assam
   - Add new: Assam Police Constable (SLPRB), APSC CCE, SSC CHSL, RRB NTPC (RRB Guwahati), NHM Assam, SSC CGL
   - Total: ~10 jobs, Assam-focused first, then Central govt
2. Update GovJobCard:
   - Below the posts/last-date stats row, add an "Important Links" row with:
     - 📄 Official Notification → notificationUrl (small blue text link)
     - 🔗 Apply Online → applyUrl (small green text link)
   - Keep Apply Now button and View Details button as is
3. Update JobDetailsModal:
   - In the footer action buttons, add a third button: "📄 View Notification" linking to job.notificationUrl (outline style)
   - Or make it 3 buttons on larger screens, stacked on mobile
