import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  Camera,
  Car,
  CheckCircle2,
  ChevronRight,
  Clock,
  Copy,
  CreditCard,
  ExternalLink,
  FileCheck,
  FileText,
  Fingerprint,
  Gift,
  GraduationCap,
  HeartHandshake,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Plane,
  RotateCcw,
  Search,
  Shield,
  ShoppingBag,
  Star,
  Train,
  Users,
  Vote,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { useState } from "react";
import { useGetReviews, useSubmitReview } from "./hooks/useQueries";
import type { Review } from "./hooks/useQueries";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Jobs", href: "#job-portal" },
  { label: "Products", href: "#products" },
  { label: "Partners", href: "#partners" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Reviews", href: "#reviews" },
];

// ─── JOB LISTINGS DATA ────────────────────────────────────────────────────────
type JobCategory = "job" | "exam" | "admission";
type JobStatus = "active" | "closed" | "upcoming";

interface JobListing {
  id: number;
  title: string;
  organization: string;
  category: JobCategory;
  vacancies: string;
  lastDate: string;
  applicationStart: string;
  status: JobStatus;
  isLatest: boolean;
  shortDescription: string;
  eligibility: { qualification: string; age: string };
  fee: { general: string; sc_st: string; pwd: string };
  casteRelaxation: string;
  importantDates: {
    applicationStart: string;
    lastDate: string;
    examDate: string;
    admitCard?: string;
  };
  selectionProcess: string;
  examPattern: string;
  officialAdLink: string;
  applyLink: string;
  additionalInfo?: string;
}

const JOB_LISTINGS: JobListing[] = [
  {
    id: 1,
    title: "SLPRB Assam Recruitment 2026 — SI, Constable, Fireman, Warder",
    organization: "State Level Police Recruitment Board (SLPRB), Assam",
    category: "job",
    vacancies: "5734 Posts",
    lastDate: "Check official site",
    applicationStart: "Feb 2026",
    status: "active",
    isLatest: true,
    shortDescription:
      "Mass recruitment for Sub-Inspector, Constable, Fireman, and Warder posts under SLPRB Assam.",
    eligibility: {
      qualification: "12th pass for Constable; Graduate for Sub-Inspector",
      age: "18–25 years (SC/ST/OBC relaxation applicable)",
    },
    fee: { general: "₹250", sc_st: "₹150", pwd: "₹0 (Exempt)" },
    casteRelaxation: "SC/ST: 5 years | OBC: 3 years | EWS: 5 years",
    importantDates: {
      applicationStart: "Feb 2026",
      lastDate: "Check official site",
      examDate: "To be announced",
      admitCard: "To be announced",
    },
    selectionProcess:
      "Written Test → Physical Efficiency Test (PET) / Physical Standard Test (PST) → Medical Examination",
    examPattern:
      "Written Test: Objective type questions covering General Knowledge, Reasoning, Mathematics, and English",
    officialAdLink: "https://slprbassam.in",
    applyLink: "https://slprbassam.in",
  },
  {
    id: 2,
    title: "Apex Bank Assistant Recruitment 2026 — 150 Posts",
    organization: "The Assam Co-operative Apex Bank Ltd.",
    category: "job",
    vacancies: "150 Posts",
    lastDate: "19 Apr 2026",
    applicationStart: "20 Mar 2026",
    status: "active",
    isLatest: true,
    shortDescription:
      "Apex Bank recruiting Assistants from graduates across Assam for its banking operations.",
    eligibility: {
      qualification: "Graduate in any discipline from a recognized university",
      age: "21–38 years",
    },
    fee: {
      general: "₹750",
      sc_st: "₹500 (SC/ST/PwD)",
      pwd: "₹500",
    },
    casteRelaxation: "SC/ST: 5 years | OBC: 3 years (as per Assam Govt. norms)",
    importantDates: {
      applicationStart: "20 Mar 2026",
      lastDate: "19 Apr 2026",
      examDate: "To be announced",
      admitCard: "To be announced",
    },
    selectionProcess: "Written Test → Interview",
    examPattern:
      "Objective type: English Language, Reasoning Ability, Quantitative Aptitude, General Awareness, Computer Knowledge",
    officialAdLink: "https://apexbankassam.com",
    applyLink: "https://apexbankassam.com",
  },
  {
    id: 3,
    title: "APSC CCE 2026 — Combined Competitive Exam (400+ Posts)",
    organization: "Assam Public Service Commission (APSC)",
    category: "job",
    vacancies: "400+ Posts",
    lastDate: "15 May 2026",
    applicationStart: "Mar 2026",
    status: "active",
    isLatest: true,
    shortDescription:
      "APSC Combined Competitive Exam 2026 for ACS, APS, Finance, Agriculture, Forest, and Revenue Services.",
    eligibility: {
      qualification:
        "Graduate in relevant discipline from a recognized university",
      age: "21–38 years (SC/ST/OBC relaxation as per Assam Govt rules)",
    },
    fee: {
      general: "₹270",
      sc_st: "₹170 (SC/ST/OBC/EWS/PwD)",
      pwd: "₹170",
    },
    casteRelaxation: "SC/ST: 5 years | OBC: 3 years | EWS: as per rules",
    importantDates: {
      applicationStart: "Mar 2026",
      lastDate: "15 May 2026",
      examDate: "July 2026 (Prelim)",
      admitCard: "Before exam",
    },
    selectionProcess:
      "Preliminary Exam → Main Exam (Descriptive) → Interview / Personality Test",
    examPattern:
      "Prelim: 2 papers — GS Paper I & II, 200 marks each, Objective type | Main: Descriptive papers",
    officialAdLink: "https://apsc.nic.in",
    applyLink: "https://apsc.nic.in",
  },
  {
    id: 4,
    title: "PNRD Assam Contractual Recruitment 2026 — 1508 Posts",
    organization: "Panchayat & Rural Development Dept., Govt. of Assam",
    category: "job",
    vacancies: "1508 Posts",
    lastDate: "Closed",
    applicationStart: "Feb 2026",
    status: "closed",
    isLatest: false,
    shortDescription:
      "Contractual recruitment for Cluster Resource Person, Data Entry Operator, and Block Coordinator posts.",
    eligibility: {
      qualification: "Graduate / 10+2 depending on post",
      age: "18–43 years",
    },
    fee: {
      general: "₹0 (No Fee)",
      sc_st: "₹0 (No Fee)",
      pwd: "₹0 (No Fee)",
    },
    casteRelaxation: "As per Assam Govt. norms",
    importantDates: {
      applicationStart: "Feb 2026",
      lastDate: "Passed (Closed)",
      examDate: "Result/Merit List Stage",
      admitCard: "N/A",
    },
    selectionProcess: "Merit-based on academic qualification + Interview",
    examPattern: "No written exam; merit-based selection",
    officialAdLink: "https://pnrd.assam.gov.in",
    applyLink: "https://pnrd.assam.gov.in",
  },
  {
    id: 5,
    title: "ADRE 3.0 — Grade III & IV Recruitment (5000+ Posts)",
    organization: "Assam Direct Recruitment Commission / SLRC, Govt. of Assam",
    category: "job",
    vacancies: "5000+ Posts",
    lastDate: "To be announced",
    applicationStart: "Mid-2026 (Expected)",
    status: "upcoming",
    isLatest: true,
    shortDescription:
      "Upcoming ADRE 3.0 mass recruitment for Grade III and Grade IV posts across multiple Assam Govt. departments.",
    eligibility: {
      qualification: "8th / 10th / 12th / Graduate as per post requirement",
      age: "18–40 years (relaxation as per Assam Govt. norms)",
    },
    fee: {
      general: "₹300 (Grade III) / ₹200 (Grade IV)",
      sc_st: "₹150 (SC/ST/PwD)",
      pwd: "₹150",
    },
    casteRelaxation: "SC/ST: 5 years | OBC: 3 years | EWS: 5 years",
    importantDates: {
      applicationStart: "Mid-2026 (Expected)",
      lastDate: "To be announced",
      examDate: "To be announced",
      admitCard: "To be announced",
    },
    selectionProcess: "Written MCQ Test → Merit List → Document Verification",
    examPattern:
      "MCQ-based written test; subject-wise pattern as per post category",
    officialAdLink: "https://slrcassam.in",
    applyLink: "https://slrcassam.in",
  },
  {
    id: 6,
    title: "NHM Assam Health Dept. Recruitment 2026 — Multiple Posts",
    organization: "National Health Mission (NHM), Assam",
    category: "job",
    vacancies: "Multiple",
    lastDate: "Check official site",
    applicationStart: "Rolling recruitment",
    status: "active",
    isLatest: false,
    shortDescription:
      "NHM Assam recruiting Staff Nurse, ANM, Lab Technician, Pharmacist, and Community Health Officer on a rolling basis.",
    eligibility: {
      qualification:
        "GNM / B.Sc Nursing / Diploma in relevant healthcare field",
      age: "18–43 years",
    },
    fee: {
      general: "₹0 (No Fee)",
      sc_st: "₹0 (No Fee)",
      pwd: "₹0 (No Fee)",
    },
    casteRelaxation: "As per Assam Govt. norms",
    importantDates: {
      applicationStart: "Rolling",
      lastDate: "Check official site",
      examDate: "As per recruitment cycle",
      admitCard: "As per recruitment cycle",
    },
    selectionProcess: "Merit-based + Document Verification",
    examPattern:
      "No written exam for most posts; merit-based on qualifications",
    officialAdLink: "https://nhm.assam.gov.in",
    applyLink: "https://nhm.assam.gov.in",
  },
  {
    id: 7,
    title: "SSC CHSL 2026 — 5000+ LDC, JSA, DEO, PA/SA Posts",
    organization: "Staff Selection Commission (SSC), Govt. of India",
    category: "job",
    vacancies: "5000+ Posts",
    lastDate: "May 2026 (Expected)",
    applicationStart: "30 Apr 2026 (Expected)",
    status: "upcoming",
    isLatest: true,
    shortDescription:
      "SSC CHSL 2026 recruitment for Lower Divisional Clerk, JSA, Data Entry Operator, Postal and Sorting Assistant posts across Central Govt. offices.",
    eligibility: {
      qualification: "12th pass from a recognized board",
      age: "18–27 years (SC/ST: +5 yrs, OBC: +3 yrs, PwD: +10 yrs)",
    },
    fee: {
      general: "₹100",
      sc_st: "₹0 (Female/SC/ST/PwD/Ex-Servicemen exempt)",
      pwd: "₹0",
    },
    casteRelaxation: "SC/ST: 5 years | OBC: 3 years | PwD: 10 years",
    importantDates: {
      applicationStart: "30 Apr 2026 (Expected)",
      lastDate: "May 2026 (Expected)",
      examDate: "July–Aug 2026",
      admitCard: "Before exam",
    },
    selectionProcess:
      "Tier-I (Computer Based Test) → Tier-II (CBT + Skill Test/Typing Test)",
    examPattern:
      "Tier-I: 100 questions, 200 marks — English Language, Reasoning, Quantitative Aptitude, General Knowledge; 60 mins",
    officialAdLink: "https://ssc.gov.in",
    applyLink: "https://ssc.gov.in",
  },
  {
    id: 8,
    title: "RRB Group D 2026 — 22,195 Railway Posts",
    organization:
      "Railway Recruitment Board (RRB), Ministry of Railways, Govt. of India",
    category: "job",
    vacancies: "22,195 Posts",
    lastDate: "To be announced",
    applicationStart: "To be announced",
    status: "upcoming",
    isLatest: true,
    shortDescription:
      "RRB Group D mass recruitment for Track Maintainer, Helper, and Assistant posts across Electrical, Mechanical, Signal & Telecom departments.",
    eligibility: {
      qualification:
        "10th pass + ITI (relevant trade) OR 10th pass with 2 years experience in relevant field",
      age: "18–36 years (relaxation for reserved categories)",
    },
    fee: {
      general: "₹500 (refundable on appearing in exam)",
      sc_st: "₹250 (Female/SC/ST/Minority/EBC — refundable)",
      pwd: "₹250 (refundable)",
    },
    casteRelaxation:
      "SC/ST: 5 years | OBC: 3 years | PwD: 10 years | Ex-Servicemen: as per rules",
    importantDates: {
      applicationStart: "To be announced",
      lastDate: "To be announced",
      examDate: "To be announced",
      admitCard: "To be announced",
    },
    selectionProcess:
      "Computer Based Test (CBT) → Physical Efficiency Test (PET) → Document Verification → Medical Examination",
    examPattern:
      "CBT: 100 questions, 100 marks — Mathematics, General Intelligence & Reasoning, General Science, General Awareness; 90 mins; Negative marking (1/3)",
    officialAdLink: "https://indianrailways.gov.in",
    applyLink: "https://rrbapply.gov.in",
  },
  {
    id: 9,
    title: "AFT Guwahati Recruitment 2026 — Assistant, Steno & MTS (15 Posts)",
    organization: "Armed Forces Tribunal (AFT) Regional Bench, Guwahati",
    category: "job",
    vacancies: "15 Posts",
    lastDate: "30 Apr 2026",
    applicationStart: "Mar 2026",
    status: "active",
    isLatest: true,
    shortDescription:
      "AFT Guwahati Regional Bench recruiting for Assistant, Stenographer Grade-C, and Multi-Tasking Staff posts.",
    eligibility: {
      qualification:
        "Graduate / 12th / 8th pass as per post; Stenographer requires 80 wpm shorthand + 40 wpm typing",
      age: "18–27 years (age relaxation for SC/ST/OBC/PwD)",
    },
    fee: {
      general: "₹0 (No Fee)",
      sc_st: "₹0 (No Fee)",
      pwd: "₹0 (No Fee)",
    },
    casteRelaxation: "SC/ST: 5 years | OBC: 3 years | PwD: 10 years",
    importantDates: {
      applicationStart: "Mar 2026",
      lastDate: "30 Apr 2026",
      examDate: "To be announced",
      admitCard: "To be announced",
    },
    selectionProcess:
      "Written Test → Skill Test (Typing/Shorthand for relevant posts) → Document Verification",
    examPattern:
      "Written Test: Objective + Descriptive; Skill test for Steno and Assistant posts",
    officialAdLink: "https://aftguwahati.gov.in",
    applyLink: "https://aftguwahati.gov.in",
  },
  {
    id: 10,
    title: "Gauhati High Court Recruitment 2026 — Grade III & IV Posts",
    organization: "Gauhati High Court, Assam",
    category: "job",
    vacancies: "Multiple",
    lastDate: "Check official site",
    applicationStart: "2026",
    status: "active",
    isLatest: false,
    shortDescription:
      "Gauhati High Court recruiting Junior Assistants, Stenographers, MTS, and Drivers across Grade III and IV posts.",
    eligibility: {
      qualification:
        "Graduate / 12th / 8th pass as per the specific post applied for",
      age: "18–38 years (relaxation for SC/ST/OBC as per Assam norms)",
    },
    fee: {
      general: "₹300",
      sc_st: "₹150 (SC/ST)",
      pwd: "Exempted / as per rules",
    },
    casteRelaxation: "SC/ST: 5 years | OBC: 3 years (as per Assam Govt. norms)",
    importantDates: {
      applicationStart: "2026",
      lastDate: "Check official site",
      examDate: "To be announced",
      admitCard: "To be announced",
    },
    selectionProcess:
      "Written Examination → Typing / Skill Test → Interview / Document Verification",
    examPattern:
      "Written exam: General Knowledge, English, Reasoning; followed by Skill/Typing test for relevant posts",
    officialAdLink: "https://ghconline.gov.in",
    applyLink: "https://ghconline.gov.in",
  },
  {
    id: 11,
    title: "NEET UG 2026 — National Medical Entrance Test",
    organization: "National Testing Agency (NTA), Govt. of India",
    category: "exam",
    vacancies: "N/A (Entrance Exam)",
    lastDate: "Mar 2026 (Application)",
    applicationStart: "Feb 2026",
    status: "active",
    isLatest: true,
    shortDescription:
      "NEET UG 2026 for admission to MBBS, BDS, BAMS, BSMS, BUMS, BHMS courses in medical colleges across India.",
    eligibility: {
      qualification:
        "10+2 with Physics, Chemistry, Biology/Biotechnology; minimum 50% marks (40% for SC/ST/PwD)",
      age: "17+ years as of 31 Dec 2026; no upper age limit",
    },
    fee: {
      general: "₹1700",
      sc_st: "₹1000 (SC/ST/PwD/Transgender)",
      pwd: "₹1000",
    },
    casteRelaxation:
      "5% mark relaxation for SC/ST/PwD candidates in eligibility criteria",
    importantDates: {
      applicationStart: "Feb 2026",
      lastDate: "Mar 2026",
      examDate: "04 May 2026",
      admitCard: "Apr 2026",
    },
    selectionProcess:
      "Single entrance test → Rank-based counselling (through MCC for Central/Deemed Universities; State counselling for State quota seats)",
    examPattern:
      "200 questions (attempt 180) — Physics (50), Chemistry (50), Botany (50), Zoology (50); 720 marks; 3 hours 20 mins; Negative marking: -1 per wrong answer",
    officialAdLink: "https://neet.nta.nic.in",
    applyLink: "https://neet.nta.nic.in",
  },
  {
    id: 12,
    title: "Assam CEE 2026 — Combined Entrance Exam for B.Tech / B.E.",
    organization: "Assam Science & Technology University (ASTU)",
    category: "exam",
    vacancies: "N/A (Entrance Exam)",
    lastDate: "Apr 2026",
    applicationStart: "Mar 2026",
    status: "active",
    isLatest: true,
    shortDescription:
      "Assam CEE 2026 for admission to B.Tech/B.E. programs in Govt. and Private engineering colleges across Assam.",
    eligibility: {
      qualification:
        "10+2 with Physics, Chemistry, Mathematics; minimum 45% for General, 40% for SC/ST",
      age: "17+ years; must be born on or before 31 Jul 2009",
    },
    fee: {
      general: "₹500",
      sc_st: "₹300 (SC/ST/PwD)",
      pwd: "₹300",
    },
    casteRelaxation:
      "SC/ST candidates get 5% mark relaxation in eligibility criteria",
    importantDates: {
      applicationStart: "Mar 2026",
      lastDate: "Apr 2026",
      examDate: "June 2026",
      admitCard: "May 2026",
    },
    selectionProcess:
      "Entrance Exam → Merit-based rank → Centralized Counselling for seat allotment",
    examPattern:
      "120 questions — Physics (40), Chemistry (40), Mathematics (40); 480 marks; 3 hours; Negative marking: -1 per wrong answer",
    officialAdLink: "https://astu.ac.in",
    applyLink: "https://astu.ac.in",
  },
  {
    id: 13,
    title: "PAT Assam 2026 — Polytechnic Admission Test",
    organization: "Directorate of Technical Education (DTE), Govt. of Assam",
    category: "exam",
    vacancies: "N/A (Entrance Exam)",
    lastDate: "Feb 2026",
    applicationStart: "Jan 2026",
    status: "active",
    isLatest: false,
    shortDescription:
      "Polytechnic Admission Test (PAT) 2026 for Diploma Engineering admissions in Govt. and Private Polytechnic colleges of Assam.",
    eligibility: {
      qualification:
        "10th pass with minimum 35% marks in Mathematics and Science",
      age: "14+ years; no upper age limit",
    },
    fee: {
      general: "₹400",
      sc_st: "₹200 (SC/ST)",
      pwd: "₹200",
    },
    casteRelaxation:
      "SC/ST candidates get fee concession and relaxation in merit criteria as per Assam rules",
    importantDates: {
      applicationStart: "Jan 2026",
      lastDate: "Feb 2026",
      examDate: "5 Jul 2026 or 24 Jul 2026",
      admitCard: "Before exam",
    },
    selectionProcess:
      "Entrance Exam → Merit list → Counselling for diploma college seat allotment",
    examPattern:
      "90 questions — Mathematics (35), Science (35), English (20); 90 marks; 2 hours; No negative marking",
    officialAdLink: "https://dte.assam.gov.in",
    applyLink: "https://dte.assam.gov.in",
  },
  {
    id: 14,
    title: "SSUHS GNM Entrance Examination 2026",
    organization:
      "Srimanta Sankaradeva University of Health Sciences (SSUHS), Assam",
    category: "admission",
    vacancies: "Multiple Seats (Govt. & Private Nursing Institutes)",
    lastDate: "30 May 2026",
    applicationStart: "10 Apr 2026",
    status: "active",
    isLatest: true,
    shortDescription:
      "SSUHS GNM Entrance 2026 for admission to General Nursing & Midwifery courses in Govt. and Private institutes of Assam for 2026-27 session.",
    eligibility: {
      qualification:
        "10+2 with English; minimum 40% aggregate marks (5% relaxation for SC/ST); PRC mandatory for Govt. institute seats",
      age: "Minimum 17 years as of 31 Dec 2026",
    },
    fee: {
      general:
        "Online payment via SSUHS portal (check official site for amount)",
      sc_st: "Online payment (check official site)",
      pwd: "PwD candidates with 40%+ disability are EXEMPT from fee",
    },
    casteRelaxation:
      "SC/ST: 5% mark relaxation in eligibility | PRC mandatory for Govt. institute seats",
    importantDates: {
      applicationStart: "10 Apr 2026",
      lastDate: "30 May 2026",
      examDate: "28 Jun 2026 (10:00 AM – 12:00 PM)",
      admitCard: "14 Jun 2026",
    },
    selectionProcess:
      "Entrance Exam → Merit-based rank → Counselling for institute allotment",
    examPattern:
      "100 marks OMR-based paper — English (50 marks), Mathematics (25 marks), General Science (25 marks); Questions in English & Assamese; NO negative marking. Helpdesk: 08048794953 | ssuhs.cee2026@gmail.com",
    officialAdLink: "https://ssuhs.ac.in",
    applyLink: "https://ssuhs.ac.in",
  },
  {
    id: 15,
    title: "SSUHS CEE 2026 — B.Sc Nursing, B.Pharm, D.Pharm & Allied Health",
    organization:
      "Srimanta Sankaradeva University of Health Sciences (SSUHS), Assam",
    category: "admission",
    vacancies: "Multiple Seats",
    lastDate: "Apr–May 2026",
    applicationStart: "Mar 2026",
    status: "active",
    isLatest: true,
    shortDescription:
      "SSUHS Common Entrance Examination 2026 for B.Sc Nursing, B.Pharm, D.Pharm, and Allied Health Sciences admissions for 2026-27 session.",
    eligibility: {
      qualification:
        "10+2 with PCB / PCM as per course; minimum 45% marks; Nursing requires Biology",
      age: "17+ years; as per course-specific requirements",
    },
    fee: {
      general:
        "Online payment via SSUHS portal (check official site for amount)",
      sc_st: "As per official notification",
      pwd: "As per official notification",
    },
    casteRelaxation:
      "SC/ST/OBC relaxation as per Assam Govt. norms | PRC may be required",
    importantDates: {
      applicationStart: "Mar 2026",
      lastDate: "Apr–May 2026",
      examDate: "June–July 2026",
      admitCard: "Before exam",
    },
    selectionProcess:
      "Entrance Exam → Merit-based counselling for course/institute allotment",
    examPattern:
      "Objective type entrance exam covering subjects relevant to the course applied (PCB/PCM); check official SSUHS notification for exact pattern",
    officialAdLink: "https://ssuhs.ac.in",
    applyLink: "https://ssuhs.ac.in",
  },
  {
    id: 16,
    title: "CUET UG 2026 — Central Universities Undergraduate Admission Test",
    organization: "National Testing Agency (NTA), Govt. of India",
    category: "admission",
    vacancies: "Seats in 250+ Universities",
    lastDate: "Mar 2026",
    applicationStart: "Feb 2026",
    status: "active",
    isLatest: true,
    shortDescription:
      "CUET UG 2026 for admission to undergraduate programs (BA, B.Sc, B.Com, etc.) in 250+ Central, State, and Private Universities.",
    eligibility: {
      qualification:
        "12th pass or appearing; no minimum marks required (individual university criteria may apply)",
      age: "No age limit specified; varies by university",
    },
    fee: {
      general: "₹650 (for 1–3 subjects); higher for additional subjects",
      sc_st: "Reduced fee for SC/ST/PwD; check official NTA site",
      pwd: "Reduced fee; check official NTA site",
    },
    casteRelaxation:
      "Relaxation varies by individual university; CUET score applies uniformly",
    importantDates: {
      applicationStart: "Feb 2026",
      lastDate: "Mar 2026",
      examDate: "May 2026",
      admitCard: "Apr–May 2026",
    },
    selectionProcess:
      "CUET Score → University-wise cut-off and counselling for seat allotment",
    examPattern:
      "Domain-specific subjects (chosen by student), Language tests, General Test; MCQ format; 200 questions total (varies by subject choice); Negative marking",
    officialAdLink: "https://cuet.nta.nic.in",
    applyLink: "https://cuet.nta.nic.in",
  },
  {
    id: 17,
    title: "Tezpur University B.Ed Admission 2026",
    organization: "Tezpur University (Central University of Assam)",
    category: "admission",
    vacancies: "Limited Seats",
    lastDate: "May 2026",
    applicationStart: "Apr 2026",
    status: "active",
    isLatest: false,
    shortDescription:
      "Tezpur University B.Ed (2-year) Admission 2026 — a Central University program for aspiring teachers through entrance-based selection.",
    eligibility: {
      qualification:
        "Graduate with at least 50% marks (45% for SC/ST/OBC/PwD); must have studied the teaching subject at UG level",
      age: "No specific age limit mentioned in general norms",
    },
    fee: {
      general: "₹500",
      sc_st: "₹250 (SC/ST/PwD)",
      pwd: "₹250",
    },
    casteRelaxation: "SC/ST: 5% mark relaxation | OBC/PwD: 5% mark relaxation",
    importantDates: {
      applicationStart: "Apr 2026",
      lastDate: "May 2026",
      examDate: "June 2026",
      admitCard: "Before exam",
    },
    selectionProcess:
      "Entrance Test → Merit list based on test score → Counselling → Admission",
    examPattern:
      "Entrance test covering Teaching Aptitude, Language Proficiency, Subject Knowledge, and General Awareness",
    officialAdLink: "https://tezu.ernet.in",
    applyLink: "https://tezu.ernet.in",
  },
];

const SERVICES = [
  {
    icon: <Car className="w-8 h-8" />,
    title: "Vehicle Insurance",
    fee: 0,
    description: "Renew or apply for vehicle insurance quickly",
    image: "/assets/generated/service-vehicle-insurance.dim_800x600.jpg",
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Driving Licence",
    fee: 0,
    description: "Apply for new or renew your driving licence",
    image: "/assets/generated/service-driving-licence.dim_800x600.jpg",
  },
  {
    icon: <RotateCcw className="w-8 h-8" />,
    title: "RC Renew",
    fee: 0,
    description: "Hassle-free RC renewal assistance",
    image: "/assets/generated/service-rc-renewal.dim_800x600.jpg",
  },
  {
    icon: <CreditCard className="w-8 h-8" />,
    title: "PAN Card Apply",
    fee: 250,
    description: "Apply for PAN card with ease",
    image: "/assets/generated/service-pan-card.dim_800x600.jpg",
  },
  {
    icon: <Building2 className="w-8 h-8" />,
    title: "Banking",
    fee: 0,
    description: "Banking assistance and services",
    image: "/assets/generated/service-banking.dim_800x600.jpg",
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: "Online Job Apply",
    fee: 150,
    description: "Get help applying for jobs online",
    image: "/assets/generated/service-online-job-apply.dim_800x600.jpg",
  },
  {
    icon: <Plane className="w-8 h-8" />,
    title: "Flight Ticket Booking",
    fee: 0,
    description: "Book domestic and international flights",
    image: "/assets/generated/service-flight-ticket.dim_800x600.jpg",
  },
  {
    icon: <Train className="w-8 h-8" />,
    title: "Indian Train Ticket Booking",
    fee: 0,
    description: "Book IRCTC train tickets easily",
    image: "/assets/generated/service-train-ticket.dim_800x600.jpg",
  },
  {
    icon: <Camera className="w-8 h-8" />,
    title: "Photo Shop",
    fee: 0,
    description: "Passport, ID and studio photo printing services",
    image: "/assets/generated/service-photo-shop.dim_800x600.jpg",
  },
  {
    icon: <Copy className="w-8 h-8" />,
    title: "Photostate / Photocopy",
    fee: 0,
    description: "Fast and affordable document photocopying",
    image: "/assets/generated/service-photocopy.dim_800x600.jpg",
  },
  {
    icon: <FileCheck className="w-8 h-8" />,
    title: "Caste Certificate Apply",
    fee: 350,
    description: "Apply for your official caste certificate",
    image: "/assets/generated/service-caste-certificate.dim_800x600.jpg",
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Birth Certificate",
    fee: 0,
    description: "Apply for birth certificate easily",
    image: "/assets/generated/service-birth-certificate.dim_800x600.jpg",
  },
  {
    icon: <Fingerprint className="w-8 h-8" />,
    title: "Aadhaar Card Apply",
    fee: 250,
    description: "New Aadhaar card enrollment assistance",
    image: "/assets/generated/service-aadhaar-apply.dim_800x600.jpg",
  },
  {
    icon: <Fingerprint className="w-8 h-8" />,
    title: "Aadhaar Card Correction",
    fee: 250,
    description: "Update and correct your Aadhaar card details",
    image: "/assets/generated/service-aadhaar-correction.dim_800x600.jpg",
  },
  {
    icon: <Vote className="w-8 h-8" />,
    title: "Voter ID Apply Online",
    fee: 120,
    description: "Apply for new Voter ID card online quickly and easily",
    image: "/assets/generated/service-voter-id-apply.dim_800x600.jpg",
  },
  {
    icon: <FileCheck className="w-8 h-8" />,
    title: "Voter ID Correction",
    fee: 100,
    description: "Update and correct your Voter ID card details online",
    image: "/assets/generated/service-voter-id-correction.dim_800x600.jpg",
  },
  {
    icon: <CreditCard className="w-8 h-8" />,
    title: "PVC ID Card Printing",
    fee: 100,
    description:
      "Print durable PVC cards for Aadhaar, PAN, Voter ID, and all government IDs",
    image: "/assets/generated/service-pvc-card-print.dim_800x600.jpg",
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Passport Apply",
    fee: 0,
    description: "Apply for your passport online with expert guidance",
    image: "/assets/generated/service-passport-apply.dim_800x600.jpg",
  },
];

const PRODUCTS = [
  {
    category: "Daily Use Electricals & Electronics",
    items: [
      {
        title: "Electrical Items",
        description:
          "LED bulbs, extension cords, switches, chargers, fans and more daily use electrical items",
        image: "/assets/generated/product-electricals.dim_800x600.jpg",
      },
      {
        title: "Electronics & Accessories",
        description:
          "Mobile accessories, earphones, LED lights, small home appliances and more",
        image: "/assets/generated/product-electronics.dim_800x600.jpg",
      },
    ],
  },
  {
    category: "Gift Items",
    items: [
      {
        title: "Birthday Gifts",
        description:
          "Beautiful gift hampers, chocolates, greeting cards and decorative items for birthdays",
        image: "/assets/generated/product-birthday-gift.dim_800x600.jpg",
      },
      {
        title: "Marriage Gifts",
        description:
          "Elegant wedding gift sets, traditional gift hampers and luxury gift items for weddings",
        image: "/assets/generated/product-marriage-gift.dim_800x600.jpg",
      },
    ],
  },
];

const FEATURES = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Fast Service",
    description: "Quick turnaround for all digital services",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure & Reliable",
    description: "Your data handled with utmost security",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Expert Assistance",
    description: "Experienced staff to guide you every step",
  },
  {
    icon: <HeartHandshake className="w-6 h-6" />,
    title: "Local Support",
    description: "Trusted community service center in Dimakuchi",
  },
];

const WHATSAPP_URL = "https://wa.me/916000134640";
const FACEBOOK_URL = "https://www.facebook.com/share/1CbTMFPtXe/";
const INSTAGRAM_URL = "https://www.instagram.com/hafij__hq";

const BANKING_SUB_SERVICES = [
  {
    id: 1,
    title: "ATM Withdrawal",
    description:
      "Withdraw cash from any ATM using your debit card quickly and securely. We assist you with the process and ensure smooth transactions at all bank ATMs.",
    whatsappMsg: "Hi, I am interested in ATM Withdrawal service at QS DIGITAL.",
  },
  {
    id: 2,
    title: "Withdrawal With Aadhaar",
    description:
      "Withdraw money directly using your Aadhaar number and fingerprint — no debit card needed. This is a biometric-based cash withdrawal service available at our center.",
    whatsappMsg:
      "Hi, I am interested in Aadhaar-based Withdrawal service at QS DIGITAL.",
  },
  {
    id: 3,
    title: "DMT – Domestic Money Transfer",
    description:
      "Send money instantly to any bank account across India using cash deposit at our center. Ideal for migrant workers and families who need fast, reliable remittance services.",
    whatsappMsg:
      "Hi, I am interested in DMT (Domestic Money Transfer) service at QS DIGITAL.",
  },
  {
    id: 4,
    title: "Aadhaar Seeding With Bank Account",
    description:
      "Link your Aadhaar number to your bank account to receive DBT (Direct Benefit Transfer) payments and government scheme benefits directly into your account.",
    whatsappMsg:
      "Hi, I am interested in Aadhaar Seeding With Bank Account service at QS DIGITAL.",
  },
];

// ─── JOB PORTAL HELPERS ───────────────────────────────────────────────────────
const CATEGORY_STYLES: Record<
  JobCategory,
  { label: string; bg: string; text: string; icon: React.ReactNode }
> = {
  job: {
    label: "Job",
    bg: "bg-blue-100",
    text: "text-blue-800",
    icon: <Briefcase className="w-3 h-3" />,
  },
  exam: {
    label: "Exam",
    bg: "bg-amber-100",
    text: "text-amber-800",
    icon: <GraduationCap className="w-3 h-3" />,
  },
  admission: {
    label: "Admission",
    bg: "bg-green-100",
    text: "text-green-800",
    icon: <BookOpen className="w-3 h-3" />,
  },
};

const WATERMARK_POSITIONS = [
  { top: "5%", left: "2%", opacity: 0.09, id: "wc1" },
  { top: "5%", left: "48%", opacity: 0.09, id: "wc2" },
  { top: "38%", left: "18%", opacity: 0.09, id: "wc3" },
  { top: "38%", left: "60%", opacity: 0.09, id: "wc4" },
  { top: "72%", left: "5%", opacity: 0.09, id: "wc5" },
  { top: "72%", left: "50%", opacity: 0.09, id: "wc6" },
];

const WATERMARK_POSITIONS_DETAIL = [
  { top: "6%", left: "5%", opacity: 0.09, id: "wd1" },
  { top: "6%", left: "40%", opacity: 0.09, id: "wd2" },
  { top: "6%", left: "72%", opacity: 0.09, id: "wd3" },
  { top: "35%", left: "15%", opacity: 0.09, id: "wd4" },
  { top: "35%", left: "60%", opacity: 0.09, id: "wd5" },
  { top: "65%", left: "5%", opacity: 0.09, id: "wd6" },
  { top: "65%", left: "50%", opacity: 0.09, id: "wd7" },
];

function JobWatermark({
  positions,
}: { positions: typeof WATERMARK_POSITIONS }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ userSelect: "none", zIndex: 0 }}
    >
      {positions.map((pos) => (
        <span
          key={pos.id}
          className="absolute text-sm font-black whitespace-nowrap text-blue-900"
          style={{
            top: pos.top,
            left: pos.left,
            opacity: pos.opacity,
            transform: "rotate(-25deg)",
            letterSpacing: "0.12em",
          }}
        >
          QS DIGITAL
        </span>
      ))}
    </div>
  );
}

function JobCard({
  job,
  onView,
}: {
  job: JobListing;
  onView: (job: JobListing) => void;
}) {
  const cat = CATEGORY_STYLES[job.category];
  const isClosed = job.status === "closed";
  const isUpcoming = job.status === "upcoming";

  return (
    <div className="relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 flex flex-col overflow-hidden">
      <JobWatermark positions={WATERMARK_POSITIONS} />

      {/* Status banner */}
      {isClosed && (
        <div className="absolute top-0 left-0 right-0 bg-red-600 text-white text-xs font-bold text-center py-1 z-10 tracking-wider">
          APPLICATION CLOSED
        </div>
      )}
      {isUpcoming && (
        <div className="absolute top-0 left-0 right-0 bg-amber-500 text-white text-xs font-bold text-center py-1 z-10 tracking-wider">
          COMING SOON
        </div>
      )}

      <div
        className={`relative z-10 p-5 flex flex-col gap-3 flex-1 ${isClosed || isUpcoming ? "pt-8" : ""}`}
      >
        {/* Category + Latest badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${cat.bg} ${cat.text}`}
          >
            {cat.icon}
            {cat.label}
          </span>
          {job.isLatest && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
              LATEST
            </span>
          )}
        </div>

        {/* Title + Org */}
        <div>
          <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 line-clamp-2">
            {job.title}
          </h3>
          <p className="text-gray-500 text-xs flex items-center gap-1 line-clamp-1">
            <Building2 className="w-3 h-3 flex-shrink-0" />
            {job.organization}
          </p>
        </div>

        {/* Vacancies + Last date */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Users className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
            <span className="font-semibold">{job.vacancies}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Calendar className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
            <span
              className={`font-semibold ${isClosed ? "text-red-600" : "text-gray-700"}`}
            >
              Last Date: {job.lastDate}
            </span>
          </div>
        </div>

        {/* Short description */}
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
          {job.shortDescription}
        </p>

        {/* CTA */}
        <button
          type="button"
          onClick={() => onView(job)}
          data-ocid={`job-portal.card.${job.id}.view_button`}
          className="mt-auto inline-flex items-center gap-1.5 bg-[#0B4F8F] hover:bg-[#0E6AAE] text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors self-start"
        >
          View Details
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function JobDetailPage({
  job,
  onBack,
}: {
  job: JobListing;
  onBack: () => void;
}) {
  const cat = CATEGORY_STYLES[job.category];

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed inset-0 z-50 bg-gray-50 overflow-y-auto"
      data-ocid="job-portal.detail_page"
    >
      {/* Watermarks for detail page */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
        style={{ userSelect: "none", zIndex: 0 }}
      >
        {WATERMARK_POSITIONS_DETAIL.map((pos) => (
          <span
            key={pos.id}
            className="absolute text-xl font-black whitespace-nowrap text-blue-900"
            style={{
              top: pos.top,
              left: pos.left,
              opacity: pos.opacity,
              transform: "rotate(-25deg)",
              letterSpacing: "0.15em",
            }}
          >
            QS DIGITAL
          </span>
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-6">
        {/* Back button */}
        <button
          type="button"
          onClick={onBack}
          data-ocid="job-portal.detail_page.back_button"
          className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0B4F8F] hover:text-[#0EA5A5] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Jobs
        </button>

        {/* Header card */}
        <div
          className="rounded-2xl p-6 mb-6 text-white relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0B4F8F 0%, #0EA5A5 100%)",
          }}
        >
          <div className="flex items-start gap-3 mb-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white/20 text-white">
              {cat.icon}
              {cat.label}
            </span>
            {job.isLatest && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-400/90 text-white rounded-full text-xs font-bold">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                LATEST
              </span>
            )}
            {job.status === "closed" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500/90 text-white rounded-full text-xs font-bold">
                CLOSED
              </span>
            )}
            {job.status === "upcoming" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-400/90 text-white rounded-full text-xs font-bold">
                UPCOMING
              </span>
            )}
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-white leading-tight mb-2">
            {job.title}
          </h1>
          <p className="text-blue-100 text-sm font-medium flex items-center gap-1.5">
            <Building2 className="w-4 h-4" />
            {job.organization}
          </p>

          {/* Quick stats */}
          <div className="mt-5 flex flex-wrap gap-4">
            <div className="bg-white/15 rounded-xl px-4 py-3 flex flex-col gap-0.5">
              <span className="text-blue-200 text-xs font-semibold uppercase tracking-wide">
                Vacancies
              </span>
              <span className="text-white font-extrabold text-base">
                {job.vacancies}
              </span>
            </div>
            <div className="bg-white/15 rounded-xl px-4 py-3 flex flex-col gap-0.5">
              <span className="text-blue-200 text-xs font-semibold uppercase tracking-wide">
                Last Date
              </span>
              <span className="text-white font-extrabold text-base">
                {job.lastDate}
              </span>
            </div>
            <div className="bg-white/15 rounded-xl px-4 py-3 flex flex-col gap-0.5">
              <span className="text-blue-200 text-xs font-semibold uppercase tracking-wide">
                Apply Start
              </span>
              <span className="text-white font-extrabold text-base">
                {job.applicationStart}
              </span>
            </div>
          </div>
        </div>

        {/* Detail sections */}
        <div className="flex flex-col gap-5">
          {/* Eligibility */}
          <DetailSection
            icon={<CheckCircle2 className="w-5 h-5 text-green-600" />}
            title="Eligibility Criteria"
            bgColor="bg-green-50"
            borderColor="border-green-200"
          >
            <InfoRow
              label="Educational Qualification"
              value={job.eligibility.qualification}
            />
            <InfoRow label="Age Limit" value={job.eligibility.age} />
          </DetailSection>

          {/* Application Fee */}
          <DetailSection
            icon={<CreditCard className="w-5 h-5 text-blue-600" />}
            title="Application Fee"
            bgColor="bg-blue-50"
            borderColor="border-blue-200"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="text-left px-3 py-2 font-bold text-blue-900 rounded-tl-lg">
                      Category
                    </th>
                    <th className="text-left px-3 py-2 font-bold text-blue-900 rounded-tr-lg">
                      Fee
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-blue-100">
                    <td className="px-3 py-2 text-gray-700">
                      General / OBC / EWS
                    </td>
                    <td className="px-3 py-2 font-semibold text-gray-900">
                      {job.fee.general}
                    </td>
                  </tr>
                  <tr className="border-t border-blue-100 bg-white">
                    <td className="px-3 py-2 text-gray-700">SC / ST</td>
                    <td className="px-3 py-2 font-semibold text-gray-900">
                      {job.fee.sc_st}
                    </td>
                  </tr>
                  <tr className="border-t border-blue-100">
                    <td className="px-3 py-2 text-gray-700">PwD (Divyang)</td>
                    <td className="px-3 py-2 font-semibold text-gray-900">
                      {job.fee.pwd}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </DetailSection>

          {/* Caste Relaxation */}
          <DetailSection
            icon={<Users className="w-5 h-5 text-purple-600" />}
            title="Caste / Category Relaxation"
            bgColor="bg-purple-50"
            borderColor="border-purple-200"
          >
            <p className="text-gray-700 text-sm leading-relaxed">
              {job.casteRelaxation}
            </p>
          </DetailSection>

          {/* Important Dates */}
          <DetailSection
            icon={<Calendar className="w-5 h-5 text-orange-600" />}
            title="Important Dates"
            bgColor="bg-orange-50"
            borderColor="border-orange-200"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-orange-100">
                    <th className="text-left px-3 py-2 font-bold text-orange-900 rounded-tl-lg">
                      Event
                    </th>
                    <th className="text-left px-3 py-2 font-bold text-orange-900 rounded-tr-lg">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      event: "Application Start Date",
                      date: job.importantDates.applicationStart,
                    },
                    {
                      event: "Last Date to Apply",
                      date: job.importantDates.lastDate,
                    },
                    {
                      event: "Exam / Test Date",
                      date: job.importantDates.examDate,
                    },
                    ...(job.importantDates.admitCard
                      ? [
                          {
                            event: "Admit Card Download",
                            date: job.importantDates.admitCard,
                          },
                        ]
                      : []),
                  ].map((row, i) => (
                    <tr
                      key={row.event}
                      className={`border-t border-orange-100 ${i % 2 === 0 ? "" : "bg-white"}`}
                    >
                      <td className="px-3 py-2 text-gray-700">{row.event}</td>
                      <td className="px-3 py-2 font-semibold text-gray-900">
                        {row.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DetailSection>

          {/* Selection Process */}
          <DetailSection
            icon={<CheckCircle2 className="w-5 h-5 text-teal-600" />}
            title="Selection Process"
            bgColor="bg-teal-50"
            borderColor="border-teal-200"
          >
            <p className="text-gray-700 text-sm leading-relaxed">
              {job.selectionProcess}
            </p>
          </DetailSection>

          {/* Exam Pattern */}
          {job.examPattern && (
            <DetailSection
              icon={<FileText className="w-5 h-5 text-indigo-600" />}
              title="Exam Pattern / Syllabus"
              bgColor="bg-indigo-50"
              borderColor="border-indigo-200"
            >
              <p className="text-gray-700 text-sm leading-relaxed">
                {job.examPattern}
              </p>
            </DetailSection>
          )}

          {/* Official Ad + Apply Now */}
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <a
              href={job.officialAdLink}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid={`job-portal.detail_page.official_ad.${job.id}`}
              className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-[#0B4F8F] text-[#0B4F8F] hover:bg-[#0B4F8F] hover:text-white font-bold px-5 py-3.5 rounded-xl transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Official Advertisement
            </a>
            <a
              href={job.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid={`job-portal.detail_page.apply_now.${job.id}`}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-extrabold px-5 py-3.5 rounded-xl transition-colors text-sm"
            >
              <ChevronRight className="w-4 h-4" />
              Apply Now — Official Website
            </a>
          </div>

          {/* Back button bottom */}
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#0B4F8F] transition-colors mt-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Jobs
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function DetailSection({
  icon,
  title,
  bgColor,
  borderColor,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  bgColor: string;
  borderColor: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-xl border ${borderColor} ${bgColor} overflow-hidden`}
    >
      <div
        className={`px-4 py-3 border-b ${borderColor} flex items-center gap-2`}
      >
        {icon}
        <span className="font-bold text-gray-800 text-sm">{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-0.5 mb-3 last:mb-0">
      <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
        {label}
      </span>
      <span className="text-sm text-gray-800 leading-relaxed">{value}</span>
    </div>
  );
}

function JobPortalSection({
  onViewJob,
}: {
  onViewJob: (job: JobListing) => void;
}) {
  const [jobCategory, setJobCategory] = useState<"all" | JobCategory>("all");
  const [jobSearch, setJobSearch] = useState("");
  const [jobsVisible, setJobsVisible] = useState(9);

  const filtered = JOB_LISTINGS.filter((j) => {
    const matchCat = jobCategory === "all" || j.category === jobCategory;
    const q = jobSearch.toLowerCase();
    const matchSearch =
      !q ||
      j.title.toLowerCase().includes(q) ||
      j.organization.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const visible = filtered.slice(0, jobsVisible);

  const filterTabs: {
    key: "all" | JobCategory;
    label: string;
    count: number;
  }[] = [
    { key: "all", label: "All", count: JOB_LISTINGS.length },
    {
      key: "job",
      label: "Jobs",
      count: JOB_LISTINGS.filter((j) => j.category === "job").length,
    },
    {
      key: "exam",
      label: "Exams",
      count: JOB_LISTINGS.filter((j) => j.category === "exam").length,
    },
    {
      key: "admission",
      label: "Admissions",
      count: JOB_LISTINGS.filter((j) => j.category === "admission").length,
    },
  ];

  return (
    <section
      id="job-portal"
      className="py-16 md:py-24"
      style={{ background: "#F3F6FA" }}
      data-ocid="job-portal.section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="text-[#0EA5A5] font-bold uppercase tracking-widest text-sm">
            Sarkari Naukri
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B4F8F] mt-2 mb-4">
            Online Job Portal
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Latest Jobs, Exam Notices, and Admission Notifications for Assam
            &amp; Central Govt. — Apply directly through the official
            organization website.
          </p>
          <div className="inline-flex items-center gap-2 mt-4 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-4 py-2 rounded-full">
            <AlertCircle className="w-3.5 h-3.5" />
            All Apply Now links go directly to official government websites only
          </div>
        </motion.div>

        {/* Search + Filters */}
        <div className="flex flex-col gap-4 mb-8">
          {/* Search bar */}
          <div className="relative max-w-xl mx-auto w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={jobSearch}
              onChange={(e) => {
                setJobSearch(e.target.value);
                setJobsVisible(9);
              }}
              placeholder="Search by job title or organization..."
              data-ocid="job-portal.search_input"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B4F8F] focus:border-[#0B4F8F] shadow-sm"
            />
          </div>

          {/* Category filter tabs */}
          <div
            className="flex flex-wrap justify-center gap-2"
            data-ocid="job-portal.category_filter"
          >
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => {
                  setJobCategory(tab.key);
                  setJobsVisible(9);
                }}
                data-ocid={`job-portal.filter.${tab.key}`}
                className={[
                  "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all",
                  jobCategory === tab.key
                    ? "bg-[#0B4F8F] text-white shadow-md"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-[#0B4F8F] hover:text-[#0B4F8F]",
                ].join(" ")}
              >
                {tab.label}
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                    jobCategory === tab.key
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-500 mb-6 text-center">
          Showing{" "}
          <span className="font-bold text-[#0B4F8F]">{visible.length}</span> of{" "}
          <span className="font-bold text-[#0B4F8F]">{filtered.length}</span>{" "}
          listings
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div
            className="text-center py-16 text-gray-400"
            data-ocid="job-portal.empty_state"
          >
            <Search className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p className="font-semibold">No listings found</p>
            <p className="text-sm mt-1">Try a different search or category</p>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="job-portal.list"
          >
            {visible.map((job, idx) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                data-ocid={`job-portal.card.${job.id}`}
              >
                <JobCard job={job} onView={onViewJob} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Load More */}
        {jobsVisible < filtered.length && (
          <div className="text-center mt-10">
            <button
              type="button"
              onClick={() => setJobsVisible((v) => v + 9)}
              data-ocid="job-portal.load_more_button"
              className="inline-flex items-center gap-2 bg-[#0B4F8F] hover:bg-[#0E6AAE] text-white font-bold px-8 py-3 rounded-xl transition-colors shadow-md"
            >
              Load More Listings
            </button>
          </div>
        )}

        {/* Disclaimer */}
        <p className="text-center text-xs text-gray-400 mt-10 max-w-2xl mx-auto">
          * All information is sourced from official government notifications.
          Always verify details from the official organization website before
          applying. QS DIGITAL assists with the online application process —
          visit our center at Budlapara Chowk, Dimakuchi for help.
        </p>
      </div>
    </section>
  );
}

function scrollTo(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange?: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  const interactive = !!onChange;
  return (
    <div className="flex gap-1" role={interactive ? "radiogroup" : undefined}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={interactive ? "button" : undefined}
          aria-label={interactive ? `${star} star` : undefined}
          disabled={!interactive}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => interactive && setHovered(star)}
          onMouseLeave={() => interactive && setHovered(0)}
          className={[
            "transition-all",
            interactive
              ? "cursor-pointer hover:scale-110 active:scale-95"
              : "cursor-default",
          ].join(" ")}
        >
          <Star
            className="w-7 h-7"
            fill={star <= (hovered || value) ? "#F59E0B" : "none"}
            stroke={star <= (hovered || value) ? "#F59E0B" : "#D1D5DB"}
          />
        </button>
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const date = new Date(Number(review.timestamp / 1_000_000n));
  const formatted = date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      data-ocid={`reviews.item.${index + 1}`}
      className="bg-white rounded-2xl border border-blue-100 p-6 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #0B4F8F, #0EA5A5)",
            }}
          >
            {review.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-bold text-[#0B4F8F] text-sm">
              {review.name}
            </div>
            <div className="text-gray-400 text-xs">{formatted}</div>
          </div>
        </div>
        <StarRating value={Number(review.rating)} />
      </div>
      {review.comment && (
        <p className="text-gray-600 text-sm leading-relaxed">
          {review.comment}
        </p>
      )}
    </motion.div>
  );
}

const SEED_REVIEWS: import("./hooks/useQueries").Review[] = [
  {
    id: -1n,
    name: "Raju Ahmed",
    rating: 5n,
    comment:
      "QS DIGITAL is the best digital service center in Dimakuchi! Got my Aadhaar card corrected within a day. Very fast and professional service.",
    timestamp: 1760486400000000000n,
  },
  {
    id: -2n,
    name: "Priya Sharma",
    rating: 5n,
    comment:
      "Excellent experience getting my PAN card applied here. The staff explained everything clearly and the process was very smooth. Highly recommended!",
    timestamp: 1762041600000000000n,
  },
  {
    id: -3n,
    name: "Mohammed Hussain",
    rating: 5n,
    comment:
      "Got my vehicle insurance renewed at QS DIGITAL. Very trustworthy and they gave me the best price. Will definitely come back!",
    timestamp: 1763596800000000000n,
  },
  {
    id: -4n,
    name: "Sunita Das",
    rating: 4n,
    comment:
      "Good service for train ticket booking. The staff was helpful and patient. The shop is clean and well-maintained. A great asset to our community!",
    timestamp: 1765152000000000000n,
  },
  {
    id: -5n,
    name: "Bikash Borah",
    rating: 5n,
    comment:
      "I applied for my driving licence through QS DIGITAL. The process was simple and they handled all the paperwork. Very satisfied with the service!",
    timestamp: 1766620800000000000n,
  },
  {
    id: -6n,
    name: "Fatima Begum",
    rating: 5n,
    comment:
      "Bought an LED bulb and extension board here. The prices are reasonable and the products are good quality. Also love their digital services!",
    timestamp: 1768003200000000000n,
  },
  {
    id: -7n,
    name: "Rohit Kalita",
    rating: 5n,
    comment:
      "QS DIGITAL helped me get my caste certificate online. Saved me so many trips to government offices. Super efficient and reliable!",
    timestamp: 1769558400000000000n,
  },
  {
    id: -8n,
    name: "Anjali Singh",
    rating: 4n,
    comment:
      "Got my birth certificate applied here. The team was knowledgeable and friendly. Quick turnaround time. Very happy with the service!",
    timestamp: 1771027200000000000n,
  },
  {
    id: -9n,
    name: "Imran Sheikh",
    rating: 5n,
    comment:
      "Best place for all digital services in this area! Flight ticket booking done in minutes. The owner is very professional and helpful. 100% recommended!",
    timestamp: 1772323200000000000n,
  },
  {
    id: -10n,
    name: "Meena Gogoi",
    rating: 5n,
    comment:
      "Got my PVC voter ID card printed here. It looks amazing and the quality is excellent. QS DIGITAL truly offers top-notch service at affordable prices!",
    timestamp: 1773792000000000000n,
  },
  {
    id: -11n,
    name: "Aman Thakur",
    rating: 5n,
    comment:
      "Voter ID correction done quickly and hassle-free. Staff is very cooperative and knows their work well. This shop is a blessing for our locality!",
    timestamp: 1774396800000000000n,
  },
  {
    id: -12n,
    name: "Deepika Narzary",
    rating: 5n,
    comment:
      "Great experience overall! Got my RC renewed and the photocopy work done at the same time. One-stop shop for everything digital. Love QS DIGITAL!",
    timestamp: 1774656000000000000n,
  },
];

function ReviewsSection() {
  const { data: reviews = [], isLoading } = useGetReviews();
  const {
    mutateAsync: submitReview,
    isPending,
    isActorReady,
  } = useSubmitReview();

  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const allReviews = [...SEED_REVIEWS, ...reviews];
  const sorted = [...allReviews].sort((a, b) =>
    Number(b.timestamp) > Number(a.timestamp) ? 1 : -1,
  );
  const avgRating =
    allReviews.reduce((sum, r) => sum + Number(r.rating), 0) /
    allReviews.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (rating === 0) {
      setError("Please select a star rating.");
      return;
    }
    if (!comment.trim()) {
      setError("Please write a comment.");
      return;
    }
    try {
      await submitReview({
        name: name.trim(),
        rating,
        comment: comment.trim(),
      });
      setSubmitted(true);
      setName("");
      setRating(0);
      setComment("");
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      id="reviews"
      className="py-16 md:py-24"
      style={{ background: "#F3F6FA" }}
      data-ocid="reviews.section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-[#0EA5A5] font-bold uppercase tracking-widest text-sm">
            Customer Feedback
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B4F8F] mt-2 mb-4">
            Reviews & Ratings
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Share your experience with QS DIGITAL and help others know what to
            expect.
          </p>
          {allReviews.length > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 bg-white rounded-full px-5 py-2 border border-amber-200 shadow-sm">
              <StarRating value={Math.round(avgRating)} />
              <span className="font-extrabold text-[#0B4F8F] text-lg">
                {avgRating.toFixed(1)}
              </span>
              <span className="text-gray-400 text-sm">
                ({allReviews.length} review{allReviews.length !== 1 ? "s" : ""})
              </span>
            </div>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* ===== SUBMIT FORM ===== */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
              <div
                className="px-6 py-5"
                style={{
                  background: "linear-gradient(135deg, #0B4F8F, #0EA5A5)",
                }}
              >
                <h3 className="text-xl font-extrabold text-white">
                  Write a Review
                </h3>
                <p className="text-blue-100 text-sm mt-1">
                  Your feedback helps us serve you better
                </p>
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-4 py-8 text-center"
                      data-ocid="reviews.success_state"
                    >
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center text-white text-3xl"
                        style={{
                          background:
                            "linear-gradient(135deg, #0EA5A5, #0B4F8F)",
                        }}
                      >
                        ✓
                      </div>
                      <div>
                        <div className="font-extrabold text-[#0B4F8F] text-lg mb-1">
                          Thank you for your review!
                        </div>
                        <p className="text-gray-500 text-sm">
                          Your feedback has been submitted and is now visible to
                          other customers.
                        </p>
                      </div>
                      <Button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="mt-2 bg-[#0B4F8F] hover:bg-[#0E6AAE] text-white"
                        data-ocid="reviews.submit_button"
                      >
                        Write Another Review
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-5"
                      data-ocid="reviews.modal"
                    >
                      <div className="flex flex-col gap-1.5">
                        <Label
                          htmlFor="review-name"
                          className="font-semibold text-gray-700"
                        >
                          Your Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="review-name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Raju Ahmed"
                          className="border-gray-200 focus:border-[#0EA5A5] focus:ring-[#0EA5A5]"
                          data-ocid="reviews.input"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <Label className="font-semibold text-gray-700">
                          Star Rating <span className="text-red-500">*</span>
                        </Label>
                        <div className="flex items-center gap-3">
                          <StarRating value={rating} onChange={setRating} />
                          {rating > 0 && (
                            <span className="text-sm text-gray-500">
                              {
                                [
                                  "Poor",
                                  "Fair",
                                  "Good",
                                  "Very Good",
                                  "Excellent",
                                ][rating - 1]
                              }
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <Label
                          htmlFor="review-comment"
                          className="font-semibold text-gray-700"
                        >
                          Your Comment <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="review-comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Share your experience with QS DIGITAL..."
                          rows={4}
                          className="border-gray-200 focus:border-[#0EA5A5] focus:ring-[#0EA5A5] resize-none"
                          data-ocid="reviews.textarea"
                        />
                      </div>

                      {error && (
                        <div
                          className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg"
                          data-ocid="reviews.error_state"
                        >
                          {error}
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={isPending || !isActorReady}
                        className="w-full bg-[#0B4F8F] hover:bg-[#0E6AAE] text-white font-bold py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                        data-ocid="reviews.submit_button"
                      >
                        {!isActorReady ? (
                          "Connecting..."
                        ) : isPending ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            Submitting...
                          </span>
                        ) : (
                          "Submit Review"
                        )}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* ===== REVIEWS LIST ===== */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <span className="w-8 h-8 border-4 border-[#0B4F8F]/20 border-t-[#0B4F8F] rounded-full animate-spin" />
              </div>
            ) : (
              sorted.map((review, idx) => (
                <ReviewCard
                  key={String(review.id)}
                  review={review}
                  index={idx}
                />
              ))
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showBankingServices, setShowBankingServices] = useState(false);
  const [showPassportDocs, setShowPassportDocs] = useState(false);
  const [showVoterIdDocs, setShowVoterIdDocs] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [selectedBankingService, setSelectedBankingService] = useState<
    (typeof BANKING_SUB_SERVICES)[0] | null
  >(null);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    scrollTo(href);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ===== HEADER ===== */}
      <header
        className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100"
        data-ocid="header.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              type="button"
              onClick={() => handleNavClick("#home")}
              className="flex items-center gap-2 flex-shrink-0 focus:outline-none"
              aria-label="Go to top"
            >
              <img
                src="/assets/generated/qs-digital-logo-transparent.dim_400x120.png"
                alt="QS DIGITAL"
                className="h-10 w-auto"
              />
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  type="button"
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  data-ocid={`nav.${link.label.toLowerCase().replace(/ /g, "_")}.link`}
                  className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#0B4F8F] hover:bg-blue-50 rounded-md transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="header.whatsapp.button"
                className="ml-2 flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#1ebe5d] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <a
                href="tel:6000134640"
                data-ocid="header.phone.button"
                className="ml-2 flex items-center gap-2 bg-[#0B4F8F] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#0E6AAE] transition-colors"
              >
                <Phone className="w-4 h-4" />
                6000134640
              </a>
            </nav>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileOpen((v) => !v)}
              data-ocid="header.menu.toggle"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
              data-ocid="header.mobile.panel"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <button
                    type="button"
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left px-4 py-3 text-sm font-semibold text-gray-700 hover:text-[#0B4F8F] hover:bg-blue-50 rounded-md transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 mt-2 bg-[#25D366] text-white px-4 py-3 rounded-md text-sm font-semibold"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp: 6000134640
                </a>
                <a
                  href="tel:6000134640"
                  className="flex items-center gap-2 mt-1 bg-[#0B4F8F] text-white px-4 py-3 rounded-md text-sm font-semibold"
                >
                  <Phone className="w-4 h-4" />
                  Call: 6000134640
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ===== HERO ===== */}
        <section
          id="home"
          className="relative overflow-hidden"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-bg.dim_1920x900.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          data-ocid="hero.section"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(11,79,143,0.75) 0%, rgba(14,106,174,0.65) 50%, rgba(14,165,165,0.60) 100%)",
            }}
          />
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
            style={{
              background: "radial-gradient(circle, #10B6C7, transparent 70%)",
              transform: "translate(30%, -30%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10"
            style={{
              background: "radial-gradient(circle, #0EA5A5, transparent 70%)",
              transform: "translate(-30%, 30%)",
            }}
          />

          {/* QS DIGITAL watermark */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
            aria-hidden="true"
          >
            <span
              className="text-white font-black uppercase tracking-widest whitespace-nowrap"
              style={{
                fontSize: "clamp(4rem, 18vw, 18rem)",
                opacity: 0.06,
                letterSpacing: "0.15em",
                userSelect: "none",
              }}
            >
              QS DIGITAL
            </span>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
                  Trusted Digital Services — Dimakuchi, Assam
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                  Welcome to{" "}
                  <span style={{ color: "#F59E0B" }}>QS DIGITAL</span>
                </h1>
                <p className="text-xl md:text-2xl font-semibold text-blue-100 mb-4">
                  Your One-Stop Solution for Digital &amp; Lifestyle Services
                </p>
                <p className="text-base md:text-lg text-blue-100/90 mb-8 max-w-2xl leading-relaxed">
                  From government paperwork to electronics and gifts — we make
                  every service fast, easy, and accessible for the people of
                  Budlapara Chowk, Dimakuchi.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => handleNavClick("#services")}
                    data-ocid="hero.explore.primary_button"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md font-bold text-white text-base transition-all hover:scale-105 active:scale-95 shadow-lg"
                    style={{ background: "#F59E0B" }}
                  >
                    Explore Services
                  </button>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="hero.whatsapp.button"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md font-bold text-white text-base transition-all hover:scale-105 active:scale-95 shadow-lg"
                    style={{ background: "#25D366" }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp Us
                  </a>
                  <a
                    href="tel:6000134640"
                    data-ocid="hero.contact.secondary_button"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md font-bold text-white text-base border-2 border-white/50 hover:bg-white/10 transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    Call Us Now
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="relative" aria-hidden="true">
            <svg
              viewBox="0 0 1440 60"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
              preserveAspectRatio="none"
              style={{ height: 60, display: "block" }}
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z"
                fill="white"
              />
            </svg>
          </div>
          {/* Assamese pride text - bottom right of hero */}
          <div
            className="absolute bottom-16 right-6 md:right-10 text-right pointer-events-none select-none"
            aria-hidden="true"
          >
            <p
              className="text-xl md:text-2xl font-extrabold"
              style={{
                color: "#FFD700",
                textShadow: "1px 1px 4px rgba(0,0,0,0.6)",
              }}
            >
              জয় আই অসম
            </p>
            <p
              className="text-xl md:text-2xl font-extrabold"
              style={{
                color: "#FFD700",
                textShadow: "1px 1px 4px rgba(0,0,0,0.6)",
              }}
            >
              জয় জুবিন দা
            </p>
          </div>
        </section>

        {/* ===== INTRODUCTION ===== */}
        <section
          id="introduction"
          className="py-16 md:py-20 bg-white"
          data-ocid="intro.section"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-14"
            >
              <span className="text-[#0EA5A5] font-bold uppercase tracking-widest text-sm">
                About QS DIGITAL
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B4F8F] mt-3 mb-6 leading-tight">
                We Make Digital Services{" "}
                <span style={{ color: "#F59E0B" }}>Simple for Everyone</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                At <strong className="text-[#0B4F8F]">QS DIGITAL</strong>, we
                believe that navigating official paperwork and finding quality
                products should never be a hassle. Located at the heart of
                Budlapara Chowk, Dimakuchi, we are dedicated to providing fast,
                reliable, and professional assistance for all your digital and
                personal needs.
              </p>
              <p className="text-gray-500 text-base leading-relaxed">
                Whether you are securing your vehicle with insurance, applying
                for a government certificate, booking a flight, or looking for
                the perfect gift — we handle every task with care, speed, and a
                smile.
              </p>
            </motion.div>

            {/* Why Choose Us pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Zap className="w-7 h-7" />,
                  title: "Fast & Efficient",
                  desc: "We respect your time. Most services are completed on the same day — no long waits.",
                },
                {
                  icon: <Shield className="w-7 h-7" />,
                  title: "Safe & Trustworthy",
                  desc: "Your personal data and documents are handled with strict confidentiality and care.",
                },
                {
                  icon: <Users className="w-7 h-7" />,
                  title: "Expert Guidance",
                  desc: "Our experienced staff walk you through every step so you never feel confused.",
                },
                {
                  icon: <HeartHandshake className="w-7 h-7" />,
                  title: "Community First",
                  desc: "We are a proud local business serving the community of Dimakuchi since day one.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center p-6 rounded-2xl border border-blue-100 bg-[#F3F6FA] hover:border-[#0EA5A5] hover:shadow-md transition-all duration-300"
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 text-white"
                    style={{
                      background: "linear-gradient(135deg, #0B4F8F, #0EA5A5)",
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-[#0B4F8F] text-base mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SERVICES ===== */}
        <section
          id="services"
          className="py-16 md:py-24 bg-white"
          data-ocid="services.section"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <span className="text-[#0EA5A5] font-bold uppercase tracking-widest text-sm">
                What We Offer
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B4F8F] mt-2 mb-4">
                Our Core Services
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Everything you need in one place. Visit us at Budlapara Chowk,
                Dimakuchi for fast and reliable digital assistance.
              </p>
            </motion.div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              data-ocid="services.list"
            >
              {SERVICES.map((service, idx) => (
                <React.Fragment key={service.title}>
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.07 }}
                    data-ocid={`services.item.${idx + 1}`}
                    className="group relative bg-white rounded-xl border border-blue-100 overflow-hidden flex flex-col hover:border-[#0EA5A5] hover:shadow-card hover:scale-[1.02] transition-all duration-300"
                  >
                    {/* QS DIGITAL watermark on service card */}
                    <div
                      className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl z-10"
                      aria-hidden="true"
                      style={{ userSelect: "none" }}
                    >
                      {[
                        { top: "8%", left: "3%", opacity: 0.4, id: "wm1" },
                        { top: "8%", left: "52%", opacity: 0.35, id: "wm2" },
                        { top: "42%", left: "10%", opacity: 0.35, id: "wm3" },
                        { top: "42%", left: "58%", opacity: 0.35, id: "wm4" },
                        { top: "75%", left: "3%", opacity: 0.35, id: "wm5" },
                        { top: "75%", left: "52%", opacity: 0.35, id: "wm6" },
                      ].map((pos) => (
                        <span
                          key={pos.id}
                          className="absolute text-xs font-black whitespace-nowrap"
                          style={{
                            top: pos.top,
                            left: pos.left,
                            opacity: pos.opacity,
                            letterSpacing: "0.12em",
                            transform: "rotate(-28deg)",
                            color: "#1e40af",
                            background: "rgba(219,234,254,0.70)",
                            padding: "1px 5px",
                            borderRadius: "3px",
                          }}
                        >
                          QS DIGITAL
                        </span>
                      ))}
                    </div>
                    <div className="h-[180px] overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex flex-col gap-3 flex-1">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-[#0B4F8F] group-hover:bg-[#0B4F8F] group-hover:text-white transition-all flex-shrink-0"
                          style={{ background: "#EFF6FF" }}
                        >
                          {service.icon}
                        </div>
                        <h3 className="font-bold text-[#0B4F8F] text-base leading-tight">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {service.description}
                      </p>
                      <a
                        href={`https://wa.me/916000134640?text=${encodeURIComponent(`Hi, I am interested in ${service.title}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-ocid={`services.item.${idx + 1}.button`}
                        className="mt-auto inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors self-start"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Enquire on WhatsApp
                      </a>
                      {service.title === "Passport Apply" && (
                        <button
                          type="button"
                          onClick={() => setShowPassportDocs(true)}
                          data-ocid="passport.docs.button"
                          className="mt-1 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors self-start"
                        >
                          <BookOpen className="w-4 h-4" />
                          View Required Documents
                        </button>
                      )}
                      {(service.title === "Voter ID Apply Online" ||
                        service.title === "Voter ID Correction") && (
                        <button
                          type="button"
                          onClick={() => setShowVoterIdDocs(true)}
                          data-ocid="voterid.docs.button"
                          className="mt-1 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors self-start"
                        >
                          <BookOpen className="w-4 h-4" />
                          View Required Documents
                        </button>
                      )}
                      {service.title === "Banking" && (
                        <button
                          type="button"
                          onClick={() => setShowBankingServices((p) => !p)}
                          data-ocid="banking.services.toggle"
                          className="mt-1 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors self-start"
                        >
                          {showBankingServices
                            ? "🔼 Hide Banking Services"
                            : `🏦 View Banking Services (${BANKING_SUB_SERVICES.length})`}
                        </button>
                      )}
                    </div>
                  </motion.div>
                  {service.title === "Banking" && showBankingServices && (
                    <div className="col-span-1 sm:col-span-2 lg:col-span-4 mt-2">
                      <AnimatePresence>
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-blue-700 font-bold text-sm uppercase tracking-wide">
                              🏦 Banking Sub-Services
                            </span>
                            <div className="flex-1 h-px bg-blue-200" />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {BANKING_SUB_SERVICES.map((sub) => (
                              <div
                                key={sub.id}
                                className="bg-white rounded-xl border border-blue-100 p-4 flex flex-col gap-3 hover:border-[#0EA5A5] hover:shadow-md transition-all duration-300"
                                data-ocid={`banking.item.${sub.id}`}
                              >
                                <h4 className="font-bold text-[#0B4F8F] text-sm">
                                  {sub.title}
                                </h4>
                                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                                  {sub.description}
                                </p>
                                <div className="flex flex-col gap-2 mt-auto">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setSelectedBankingService(sub)
                                    }
                                    data-ocid={`banking.item.${sub.id}.button`}
                                    className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors"
                                  >
                                    📋 View Details
                                  </button>
                                  <a
                                    href={`https://wa.me/916000134640?text=${encodeURIComponent(sub.whatsappMsg)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-ocid={`banking.item.${sub.id}.whatsapp`}
                                    className="inline-flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors"
                                  >
                                    <MessageCircle className="w-3 h-3" />
                                    Enquire on WhatsApp
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* ===== JOB PORTAL ===== */}
        <JobPortalSection onViewJob={(job) => setSelectedJob(job)} />

        {/* ===== PRODUCTS ===== */}
        <section
          id="products"
          className="py-16 md:py-24 bg-gray-50"
          data-ocid="products.section"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <span className="text-[#0EA5A5] font-bold uppercase tracking-widest text-sm">
                Shop With Us
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B4F8F] mt-2 mb-4">
                Our Products
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Find daily use electricals, electronics, and thoughtful gift
                items at QS DIGITAL.
              </p>
            </motion.div>

            {PRODUCTS.map((group) => (
              <div key={group.category} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <ShoppingBag className="w-6 h-6 text-[#0EA5A5]" />
                  <h3 className="text-xl font-bold text-[#0B4F8F]">
                    {group.category}
                  </h3>
                </div>
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                  data-ocid="products.list"
                >
                  {group.items.map((product, idx) => (
                    <motion.div
                      key={product.title}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.08 }}
                      data-ocid={`products.item.${idx + 1}`}
                      className="group bg-white rounded-xl border border-blue-100 overflow-hidden flex flex-col hover:border-[#0EA5A5] hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5 flex flex-col gap-3 flex-1">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-[#0B4F8F] flex-shrink-0"
                            style={{ background: "#EFF6FF" }}
                          >
                            <Gift className="w-5 h-5" />
                          </div>
                          <h4 className="font-bold text-[#0B4F8F] text-base leading-tight">
                            {product.title}
                          </h4>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed flex-1">
                          {product.description}
                        </p>
                        <a
                          href={WHATSAPP_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-ocid="products.button"
                          className="mt-auto inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors self-start"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Enquire on WhatsApp
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== PARTNERS ===== */}
        <section
          id="partners"
          className="py-16 md:py-20 bg-white"
          data-ocid="partners.section"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-3">
                Our Trusted Partners
              </h2>
              <div className="mx-auto mb-4 h-1 w-16 rounded-full bg-[#2563EB]" />
              <p className="text-gray-500 max-w-xl mx-auto text-base">
                We are proud to be associated with these trusted brands,
                insurance companies, and government initiatives.
              </p>
            </motion.div>

            {/* Government & Digital */}
            <div className="mb-10" data-ocid="partners.list">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-[#2563EB] mb-4 text-center">
                Government & Digital
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                {[
                  {
                    name: "CSC",
                    img: "/assets/generated/logo-csc-transparent.dim_300x150.png",
                  },
                  {
                    name: "Digital India",
                    img: "/assets/generated/logo-digital-india-transparent.dim_300x150.png",
                  },
                  {
                    name: "Make in India",
                    img: "/assets/generated/logo-make-in-india-transparent.dim_300x150.png",
                  },
                  {
                    name: "Govt. India",
                    img: "/assets/generated/logo-govt-india.png",
                  },
                ].map((partner, idx) => (
                  <motion.div
                    key={partner.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="flex flex-col items-center justify-center gap-2 rounded-xl border border-blue-100 bg-blue-50/40 p-4 shadow-sm transition-shadow hover:shadow-md"
                    data-ocid={`partners.item.${idx + 1}`}
                  >
                    <img
                      src={partner.img}
                      alt={`${partner.name} logo`}
                      className="h-14 w-auto object-contain mx-auto"
                    />
                    <span className="text-xs text-gray-500 font-medium text-center">
                      {partner.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Insurance */}
            <div className="mb-10">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-[#2563EB] mb-4 text-center">
                Insurance Partners
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                {[
                  {
                    name: "Bajaj Allianz",
                    img: "/assets/generated/partner-bajaj-allianz-transparent.dim_200x120.png",
                  },
                  {
                    name: "LIC",
                    img: "/assets/generated/partner-lic-transparent.dim_200x120.png",
                  },
                  {
                    name: "New India Assurance",
                    img: "/assets/generated/partner-new-india-assurance-transparent.dim_200x120.png",
                  },
                  {
                    name: "National Insurance",
                    img: "/assets/generated/partner-national-insurance-transparent.dim_200x120.png",
                  },
                ].map((partner, idx) => (
                  <motion.div
                    key={partner.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="flex flex-col items-center justify-center gap-2 rounded-xl border border-green-100 bg-green-50/40 p-4 shadow-sm transition-shadow hover:shadow-md"
                    data-ocid={`partners.item.${idx + 5}`}
                  >
                    <img
                      src={partner.img}
                      alt={`${partner.name} logo`}
                      className="h-14 w-auto object-contain mx-auto"
                    />
                    <span className="text-xs text-gray-500 font-medium text-center">
                      {partner.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Electricals */}
            <div className="mb-10">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-[#2563EB] mb-4 text-center">
                Electricals & Electronics
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-5">
                {[
                  {
                    name: "ANCHOR",
                    img: "/assets/generated/logo-anchor-transparent.dim_300x150.png",
                  },
                  {
                    name: "AMRON",
                    img: "/assets/generated/logo-amron-transparent.dim_300x150.png",
                  },
                  {
                    name: "LUMINOUS",
                    img: "/assets/generated/logo-luminous-transparent.dim_300x150.png",
                  },
                  { name: "Orient", img: "/assets/generated/logo-orient.png" },
                  {
                    name: "Polycab",
                    img: "/assets/generated/partner-polycab-transparent.dim_200x120.png",
                  },
                  {
                    name: "Bajaj Electricals",
                    img: "/assets/generated/partner-bajaj-electricals-transparent.dim_200x120.png",
                  },
                  {
                    name: "Finolex",
                    img: "/assets/generated/partner-finolex-transparent.dim_200x120.png",
                  },
                ].map((partner, idx) => (
                  <motion.div
                    key={partner.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="flex flex-col items-center justify-center gap-2 rounded-xl border border-orange-100 bg-orange-50/30 p-4 shadow-sm transition-shadow hover:shadow-md"
                    data-ocid={`partners.item.${idx + 9}`}
                  >
                    <img
                      src={partner.img}
                      alt={`${partner.name} logo`}
                      className="h-14 w-auto object-contain mx-auto"
                    />
                    <span className="text-xs text-gray-500 font-medium text-center">
                      {partner.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Gifts */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-[#2563EB] mb-4 text-center">
                Gift & Lifestyle Brands
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 max-w-sm mx-auto gap-5">
                {[
                  {
                    name: "FNP (Ferns N Petals)",
                    img: "/assets/generated/partner-fnp-transparent.dim_200x120.png",
                  },
                  {
                    name: "Archies",
                    img: "/assets/generated/partner-archies-transparent.dim_200x120.png",
                  },
                ].map((partner, idx) => (
                  <motion.div
                    key={partner.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="flex flex-col items-center justify-center gap-2 rounded-xl border border-pink-100 bg-pink-50/30 p-4 shadow-sm transition-shadow hover:shadow-md"
                    data-ocid={`partners.item.${idx + 16}`}
                  >
                    <img
                      src={partner.img}
                      alt={`${partner.name} logo`}
                      className="h-14 w-auto object-contain mx-auto"
                    />
                    <span className="text-xs text-gray-500 font-medium text-center">
                      {partner.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== ABOUT / WHY CHOOSE ===== */}
        <section
          id="about"
          className="py-16 md:py-24"
          style={{ background: "#F3F6FA" }}
          data-ocid="about.section"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-[#0EA5A5] font-bold uppercase tracking-widest text-sm">
                  Why Us
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B4F8F] mt-2 mb-4">
                  Why Choose QS DIGITAL?
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  We are a trusted local digital service center serving the
                  people of Dimakuchi and surrounding areas. With experienced
                  staff and a commitment to quality, we make complex government
                  and online services easy for everyone.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {FEATURES.map((f, idx) => (
                    <div
                      key={f.title}
                      data-ocid={`about.feature.item.${idx + 1}`}
                      className="flex gap-4 items-start"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "#E0F0FF", color: "#0B4F8F" }}
                      >
                        {f.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 mb-0.5">
                          {f.title}
                        </h4>
                        <p className="text-gray-500 text-sm">{f.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <div className="bg-white rounded-2xl shadow-card border border-blue-100 overflow-hidden">
                  <div
                    className="px-6 py-5"
                    style={{
                      background: "linear-gradient(135deg, #0B4F8F, #0EA5A5)",
                    }}
                  >
                    <h3 className="text-xl font-extrabold text-white">
                      About Us
                    </h3>
                    <p className="text-blue-100 text-sm mt-1">
                      Your neighborhood digital services hub
                    </p>
                  </div>
                  <div className="p-6 flex flex-col gap-5">
                    <div>
                      <div className="text-2xl font-extrabold text-[#0B4F8F] mb-1">
                        QS DIGITAL
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        QS DIGITAL provides comprehensive digital and government
                        services to the community of Dimakuchi, Udalguri. We are
                        dedicated to making digital services accessible to every
                        citizen — quickly, affordably, and reliably.
                      </p>
                    </div>
                    <div className="border-t border-gray-100 pt-5 flex flex-col gap-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-[#0EA5A5] flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-gray-800 text-sm">
                            Address
                          </div>
                          <div className="text-gray-500 text-sm leading-relaxed">
                            Budlapara Chowk, Dimakuchi
                            <br />
                            Udalguri, BTAD, Assam — 784526
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-[#0EA5A5] flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-gray-800 text-sm">
                            Phone
                          </div>
                          <a
                            href="tel:6000134640"
                            className="text-[#0B4F8F] font-bold text-sm hover:text-[#0EA5A5] transition-colors"
                          >
                            6000134640
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MessageCircle className="w-5 h-5 text-[#25D366] flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-gray-800 text-sm">
                            WhatsApp
                          </div>
                          <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#25D366] font-bold text-sm hover:text-[#1ebe5d] transition-colors"
                          >
                            6000134640
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-[#F59E0B] flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-gray-800 text-sm">
                            Hours
                          </div>
                          <div className="text-gray-600 text-sm font-medium">
                            7:30 AM – 8:00 PM, All Days
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== CONTACT ===== */}
        <section
          id="contact"
          className="py-16 md:py-24 bg-white"
          data-ocid="contact.section"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <span className="text-[#0EA5A5] font-bold uppercase tracking-widest text-sm">
                Reach Us
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B4F8F] mt-2 mb-4">
                Get in Touch
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                We're here to help. Drop by our shop, call us, or message us on
                WhatsApp — we'd love to assist you.
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="bg-gradient-to-br from-[#0B4F8F] to-[#0E6AAE] rounded-2xl p-8 text-white flex flex-col items-center text-center gap-4"
                  data-ocid="contact.phone.card"
                >
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-200 font-semibold uppercase tracking-wider mb-1">
                      Call Us
                    </div>
                    <a
                      href="tel:6000134640"
                      className="text-xl font-extrabold text-white hover:text-yellow-300 transition-colors"
                      data-ocid="contact.phone.link"
                    >
                      6000134640
                    </a>
                    <div className="text-blue-200 text-sm mt-1">
                      7:30 AM – 8:00 PM
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.08 }}
                  className="bg-gradient-to-br from-[#25D366] to-[#1ebe5d] rounded-2xl p-8 text-white flex flex-col items-center text-center gap-4"
                  data-ocid="contact.whatsapp.card"
                >
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-green-100 font-semibold uppercase tracking-wider mb-1">
                      WhatsApp
                    </div>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl font-extrabold text-white hover:text-yellow-300 transition-colors"
                      data-ocid="contact.whatsapp.link"
                    >
                      6000134640
                    </a>
                    <div className="text-green-100 text-sm mt-1">
                      Chat with us anytime
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.16 }}
                  className="bg-gradient-to-br from-[#0EA5A5] to-[#10B6C7] rounded-2xl p-8 text-white flex flex-col items-center text-center gap-4"
                  data-ocid="contact.address.card"
                >
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-teal-100 font-semibold uppercase tracking-wider mb-1">
                      Visit Us
                    </div>
                    <div className="text-lg font-extrabold text-white">
                      QS DIGITAL
                    </div>
                    <address className="not-italic text-teal-100 text-sm mt-1 leading-relaxed">
                      Budlapara Chowk, Dimakuchi
                      <br />
                      Udalguri, BTAD
                      <br />
                      Assam — 784526
                    </address>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.24 }}
                  className="bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-2xl p-8 text-white flex flex-col items-center text-center gap-4"
                  data-ocid="contact.hours.card"
                >
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-amber-100 font-semibold uppercase tracking-wider mb-1">
                      Business Hours
                    </div>
                    <div className="text-xl font-extrabold text-white">
                      7:30 AM – 8:00 PM
                    </div>
                    <div className="text-amber-100 text-sm mt-1">
                      Mon – Sun (All Days)
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.32 }}
                  className="bg-gradient-to-br from-[#6D28D9] to-[#5B21B6] rounded-2xl p-8 text-white flex flex-col items-center text-center gap-4"
                  data-ocid="contact.email.card"
                >
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-purple-200 font-semibold uppercase tracking-wider mb-1">
                      Email Us
                    </div>
                    <a
                      href="mailto:qsdigital.electronics@gmail.com"
                      className="text-sm font-extrabold text-white hover:text-yellow-300 transition-colors break-all"
                      data-ocid="contact.email.link"
                    >
                      qsdigital.electronics@gmail.com
                    </a>
                    <div className="text-purple-200 text-sm mt-1">
                      We reply promptly
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mt-6">
                <motion.a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="rounded-xl p-3 px-5 flex flex-row items-center gap-3 text-white cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(135deg, #1877F2 0%, #0d5fcc 100%)",
                  }}
                  data-ocid="contact.facebook.button"
                >
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                      aria-label="Facebook"
                    >
                      <title>Facebook</title>
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold">Facebook</span>
                </motion.a>
                <motion.a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="rounded-xl p-3 px-5 flex flex-row items-center gap-3 text-white cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(135deg, #E1306C 0%, #833AB4 100%)",
                  }}
                  data-ocid="contact.instagram.button"
                >
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                      aria-label="Instagram"
                    >
                      <title>Instagram</title>
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold">
                    Follow @hafij__hq
                  </span>
                </motion.a>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="mt-8"
                data-ocid="contact.map.section"
              >
                <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100 h-[250px] md:h-[350px]">
                  <iframe
                    title="QS DIGITAL Location"
                    src="https://maps.google.com/maps?q=Qs+Digital+%26+Electronics,+Budlapara+Chariali,+Dimakuchi,+Assam+784526&output=embed&hl=en"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
                <div className="text-center mt-3">
                  <a
                    href="https://maps.app.goo.gl/SY8pjY8RwSQYLd6k9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0EA5A5] hover:text-[#0B4F8F] transition-colors"
                    data-ocid="contact.map.link"
                  >
                    <MapPin className="w-4 h-4" />
                    View on Google Maps →
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8 bg-gray-50 rounded-2xl border border-gray-100 p-6"
              >
                <div className="text-center mb-4">
                  <span className="font-bold text-[#0B4F8F]">
                    Services Available at QS DIGITAL
                  </span>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {SERVICES.map((s) => (
                    <span
                      key={s.title}
                      className="px-3 py-1.5 bg-white border border-[#0EA5A5]/30 text-[#0B4F8F] text-xs font-semibold rounded-full"
                    >
                      {s.title}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== REVIEWS ===== */}
        <ReviewsSection />
      </main>

      {/* ===== JOB DETAIL PAGE OVERLAY ===== */}
      <AnimatePresence>
        {selectedJob && (
          <JobDetailPage
            job={selectedJob}
            onBack={() => setSelectedJob(null)}
          />
        )}
      </AnimatePresence>

      {/* ===== BANKING SUB-SERVICE MODAL ===== */}
      <AnimatePresence>
        {selectedBankingService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setSelectedBankingService(null)}
            data-ocid="banking.modal"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedBankingService(null)}
                data-ocid="banking.modal.close_button"
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl mb-3">
                  🏦
                </div>
                <h3 className="text-xl font-bold text-[#0B4F8F] mb-2">
                  {selectedBankingService.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {selectedBankingService.description}
                </p>
              </div>
              <a
                href={`https://wa.me/916000134640?text=${encodeURIComponent(selectedBankingService.whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="banking.modal.whatsapp"
                className="w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Enquire on WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== PASSPORT DOCUMENTS MODAL ===== */}
      <AnimatePresence>
        {showPassportDocs && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowPassportDocs(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowPassportDocs(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl mb-3">
                  🛂
                </div>
                <h3 className="text-xl font-bold text-[#0B4F8F] mb-1">
                  Passport Apply
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  Documents required for passport application
                </p>
                <ul className="space-y-2">
                  {[
                    "Aadhaar Card (Original + Photocopy)",
                    "PAN Card (Original + Photocopy)",
                    "Voter ID Card (Original + Photocopy)",
                    "NRC Final Draft / NRC Certificate",
                    "Voter List (1996 / 1971 / 2005 / 2025 — Any Electoral Roll Copy)",
                    "Land Record Documents (Jamabandi / Patta)",
                    "Gaon Burha Certificate (Village Head Certificate)",
                    "Birth Certificate",
                    "School Certificate / Marksheet (Class 10th)",
                    "6 Copy Recent Passport Size Photo (White Background)",
                  ].map((doc) => (
                    <li
                      key={doc}
                      className="flex items-start gap-3 p-2 rounded-lg bg-blue-50"
                    >
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span className="text-gray-700 text-sm">{doc}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-400 mt-4">
                  * Bring all originals along with photocopies. Additional
                  documents may be required based on applicant type.
                </p>
              </div>
              <a
                href={`https://wa.me/916000134640?text=${encodeURIComponent("Hi, I am interested in Passport Apply")}`}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="passport.docs.whatsapp.button"
                className="w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Enquire on WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== VOTER ID DOCS MODAL ===== */}
      <AnimatePresence>
        {showVoterIdDocs && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowVoterIdDocs(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowVoterIdDocs(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl mb-3">
                  🗳️
                </div>
                <h3 className="text-xl font-bold text-[#0B4F8F] mb-1">
                  Voter ID — Required Documents
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  Please bring the following documents for Voter ID Apply /
                  Correction
                </p>
                <ul className="space-y-2">
                  {[
                    "Aadhaar Card (DOB & Address Proof)",
                    "Photo — 1 Copy (Recent Passport Size)",
                    "Mobile Number Linked with Aadhaar Card",
                  ].map((doc) => (
                    <li
                      key={doc}
                      className="flex items-start gap-3 p-2 rounded-lg bg-blue-50"
                    >
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span className="text-gray-700 text-sm">{doc}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-400 mt-4">
                  * Bring originals along with photocopies. Additional documents
                  may be required based on your application type.
                </p>
              </div>
              <a
                href={`https://wa.me/916000134640?text=${encodeURIComponent("Hi, I am interested in Voter ID Apply / Correction")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Enquire on WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="bg-[#1F2937] text-gray-300" data-ocid="footer.section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="text-xl font-extrabold text-white mb-2">
                QS DIGITAL
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Your trusted digital service partner in Dimakuchi, Assam. Fast,
                secure, and reliable services for every citizen.
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="tel:6000134640"
                  className="inline-flex items-center gap-2 text-sm text-[#10B6C7] hover:text-white transition-colors font-semibold"
                >
                  <Phone className="w-4 h-4" />
                  6000134640
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#25D366] hover:text-white transition-colors font-semibold"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp: 6000134640
                </a>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm hover:text-white transition-colors font-semibold"
                  style={{ color: "#1877F2" }}
                  data-ocid="footer.facebook.link"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                    aria-label="Facebook"
                  >
                    <title>Facebook</title>
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook Page
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm hover:text-white transition-colors font-semibold"
                  style={{ color: "#E1306C" }}
                  data-ocid="footer.instagram.link"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                    aria-label="Instagram"
                  >
                    <title>Instagram</title>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  @hafij__hq
                </a>
                <div className="inline-flex items-center gap-2 text-sm text-amber-400 font-semibold">
                  <Clock className="w-4 h-4" />
                  7:30 AM – 8:00 PM, All Days
                </div>
              </div>
            </div>

            <div>
              <div className="font-bold text-white mb-4 uppercase tracking-wider text-xs">
                Quick Links
              </div>
              <ul className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() => handleNavClick(link.href)}
                      data-ocid={`footer.${link.label.toLowerCase().replace(/ /g, "_")}.link`}
                      className="text-gray-400 hover:text-white text-sm transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-bold text-white mb-4 uppercase tracking-wider text-xs">
                Our Services
              </div>
              <ul className="flex flex-col gap-2">
                {SERVICES.map((s) => (
                  <li key={s.title}>
                    <button
                      type="button"
                      onClick={() => handleNavClick("#services")}
                      className="text-gray-400 hover:text-white text-sm transition-colors text-left"
                    >
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-500">
            <div>
              © {new Date().getFullYear()} QS DIGITAL. All rights reserved.
            </div>
            <div>
              Built with ♥ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.hostname : "",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#10B6C7] hover:text-white transition-colors"
              >
                caffeine.ai
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
