# QS Digital

## Current State
Online Job Apply section has 15 job listings (GOV_JOBS array in App.tsx). Each has a View Details modal with eligibility, vacancy, dates, exam pattern, how-to-apply. Apply Now links to official sites.

## Requested Changes (Diff)

### Add
- SSB Constable Recruitment 2026 – 827 Posts (Last Date: 20 Apr 2026) – official site: ssb.gov.in
- Punjab & Sind Bank LBO Recruitment 2026 – 1000 Posts (50 in Assam) (Last Date: 20 Apr 2026) – official site: punjabandsindbank.co.in
- "View Official Advertisement" link inside each modal (links to official PDF advertisement URL)

### Modify
- Apex Bank: fix fee to ₹750 (current data had wrong fee), add official ad PDF link
- LRA Assam: update with full exam pattern (negative marking 0.25, subject-wise breakdown), full caste details, official ad PDF link
- PNRD: update with category-wise vacancies, full selection process
- Indian Army Agniveer: update last date to reflect 10 Apr 2026 (extended), add full details
- ASSEB JAA: last date was 04 Apr (passed) – mark isUrgent: false, update status
- All existing modals: add fee structure, caste/age relaxation table, original advertisement PDF link

### Remove
- Nothing removed

## Implementation Plan
1. Update GOV_JOBS array in App.tsx with 2 new entries (SSB, Punjab & Sind Bank) and updated details for existing ones
2. Add `advertisementUrl` field to each job entry (official PDF link)
3. In GovJobCard modal, add "Official Advertisement" button/link row alongside Apply Now
4. Add fee and caste relaxation fields to details object
5. Display fee table and caste relaxation in modal in structured format
