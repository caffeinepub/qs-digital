import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Briefcase,
  Building2,
  Camera,
  Car,
  Clock,
  Copy,
  CreditCard,
  FileCheck,
  FileText,
  Fingerprint,
  Gift,
  HeartHandshake,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Plane,
  RotateCcw,
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
  { label: "Products", href: "#products" },
  { label: "Partners", href: "#partners" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Reviews", href: "#reviews" },
];

const SERVICES = [
  {
    icon: <Car className="w-8 h-8" />,
    title: "Vehicle Insurance",
    description: "Renew or apply for vehicle insurance quickly",
    image: "/assets/generated/service-vehicle-insurance.dim_800x600.jpg",
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Driving Licence",
    description: "Apply for new or renew your driving licence",
    image: "/assets/generated/service-driving-licence.dim_800x600.jpg",
  },
  {
    icon: <RotateCcw className="w-8 h-8" />,
    title: "RC Renew",
    description: "Hassle-free RC renewal assistance",
    image: "/assets/generated/service-rc-renewal.dim_800x600.jpg",
  },
  {
    icon: <CreditCard className="w-8 h-8" />,
    title: "PAN Card Apply",
    description: "Apply for PAN card with ease",
    image: "/assets/generated/service-pan-card.dim_800x600.jpg",
  },
  {
    icon: <Building2 className="w-8 h-8" />,
    title: "Banking",
    description: "Banking assistance and services",
    image: "/assets/generated/service-banking.dim_800x600.jpg",
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: "Online Job Apply",
    description: "Get help applying for jobs online",
    image: "/assets/generated/service-online-job-apply.dim_800x600.jpg",
  },
  {
    icon: <Plane className="w-8 h-8" />,
    title: "Flight Ticket Booking",
    description: "Book domestic and international flights",
    image: "/assets/generated/service-flight-ticket.dim_800x600.jpg",
  },
  {
    icon: <Train className="w-8 h-8" />,
    title: "Indian Train Ticket Booking",
    description: "Book IRCTC train tickets easily",
    image: "/assets/generated/service-train-ticket.dim_800x600.jpg",
  },
  {
    icon: <Camera className="w-8 h-8" />,
    title: "Photo Shop",
    description: "Passport, ID and studio photo printing services",
    image: "/assets/generated/service-photo-shop.dim_800x600.jpg",
  },
  {
    icon: <Copy className="w-8 h-8" />,
    title: "Photostate / Photocopy",
    description: "Fast and affordable document photocopying",
    image: "/assets/generated/service-photocopy.dim_800x600.jpg",
  },
  {
    icon: <FileCheck className="w-8 h-8" />,
    title: "Caste Certificate Apply",
    description: "Apply for your official caste certificate",
    image: "/assets/generated/service-caste-certificate.dim_800x600.jpg",
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Birth Certificate",
    description: "Apply for birth certificate easily",
    image: "/assets/generated/service-birth-certificate.dim_800x600.jpg",
  },
  {
    icon: <Fingerprint className="w-8 h-8" />,
    title: "Aadhaar Card Apply",
    description: "New Aadhaar card enrollment assistance",
    image: "/assets/generated/service-aadhaar-apply.dim_800x600.jpg",
  },
  {
    icon: <Fingerprint className="w-8 h-8" />,
    title: "Aadhaar Card Correction",
    description: "Update and correct your Aadhaar card details",
    image: "/assets/generated/service-aadhaar-correction.dim_800x600.jpg",
  },
  {
    icon: <Vote className="w-8 h-8" />,
    title: "Voter ID Apply Online",
    description: "Apply for new Voter ID card online quickly and easily",
    image: "/assets/generated/service-voter-id-apply.dim_800x600.jpg",
  },
  {
    icon: <FileCheck className="w-8 h-8" />,
    title: "Voter ID Correction",
    description: "Update and correct your Voter ID card details online",
    image: "/assets/generated/service-voter-id-correction.dim_800x600.jpg",
  },
  {
    icon: <CreditCard className="w-8 h-8" />,
    title: "PVC ID Card Printing",
    description:
      "Print durable PVC cards for Aadhaar, PAN, Voter ID, and all government IDs",
    image: "/assets/generated/service-pvc-card-print.dim_800x600.jpg",
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

const JOB_NOTIFICATIONS = [
  {
    id: "gnm-2026",
    badge: "🏥 Nursing Admission",
    isNew: true,
    title: "SSUHS GNM Entrance Examination 2026",
    subtitle: "Srimanta Sankaradeva University of Health Sciences",
    description:
      "Official notification for admission into GNM Nursing courses in Government and Private institutes across Assam for 2026-27 session.",
    dates: [
      { label: "Application Opens", value: "April 10, 2026" },
      { label: "Last Date to Apply", value: "May 30, 2026" },
      { label: "Admit Card Download", value: "June 14, 2026" },
      {
        label: "Entrance Exam Date",
        value: "June 28, 2026 (Sunday) 10:00 AM – 12:00 PM",
      },
    ],
    eligibility: [
      { label: "Age", value: "Minimum 17 years as of Dec 31, 2026" },
      {
        label: "Education",
        value: "10+2 with English, minimum 40% aggregate marks",
      },
      {
        label: "Relaxation",
        value: "5% marks relaxation for SC/ST candidates",
      },
      {
        label: "Residency",
        value: "PRC mandatory for Govt. Institute admissions",
      },
    ],
    examPattern: [
      { subject: "English", marks: 50 },
      { subject: "Mathematics", marks: 25 },
      { subject: "General Science", marks: 25 },
    ],
    examNote:
      "OMR-based paper. Questions in English and Assamese. NO negative marking.",
    howToApply: {
      website: "www.ssuhs.ac.in",
      fees: "Online payment gateway",
      exemption:
        "PwD (Divyang) candidates with 40%+ disability are exempt from fees",
      helpdesk: "08048794953",
      email: "ssuhs.cee2026@gmail.com",
    },
    applyUrl: "https://ssuhs.ac.in",
    whatsappMsg:
      "Hi, I need help applying for the SSUHS GNM Entrance Exam 2026. Please assist me.",
  },
];

const GOV_JOBS = [
  {
    id: "indian-army-agniveer-2026",
    category: "Defence",
    categoryColor: "bg-green-100 text-green-800",
    isUrgent: true,
    title: "Indian Army Agniveer Recruitment 2026",
    organization: "Indian Army",
    posts: "Multiple Vacancies",
    lastDate: "01 Apr 2026",
    applyUrl: "https://joinindianarmy.nic.in",
    whatsappMsg: "Hi, I need help applying for the Indian Army Agniveer 2026.",
    details: {
      eligibility:
        "Age: 17.5–21 years. Education: Class 10th pass with 45% marks (33% for CEE exempt). Must be Indian citizen.",
      vacancy: "Multiple Vacancies — Varies by regiment and trade",
      applyStart: "As per official notification",
      lastDate: "01 Apr 2026",
      examPattern:
        "CEE (Common Entrance Exam) — 100 marks. Physical and Medical fitness test required.",
      howToApply:
        "Register and apply online at joinindianarmy.nic.in. Fill form, upload documents, pay fee online.",
    },
  },
  {
    id: "indian-navy-ssr-2026",
    category: "Defence",
    categoryColor: "bg-blue-100 text-blue-800",
    isUrgent: true,
    title: "Indian Navy Agniveer SSR 2026 (01/2027 & 02/2027 Batch)",
    organization: "Indian Navy",
    posts: "Multiple Vacancies",
    lastDate: "06 Apr 2026",
    applyUrl: "https://www.joinindiannavy.gov.in",
    whatsappMsg:
      "Hi, I need help applying for the Indian Navy Agniveer SSR 2026.",
    details: {
      eligibility:
        "Age: 17–21 years. Education: 10+2 with Math & Physics (and one of Chemistry/Biology/Computer Science). Minimum 50% aggregate.",
      vacancy: "Multiple Vacancies — 01/2027 and 02/2027 Batch",
      applyStart: "Check official website",
      lastDate: "06 Apr 2026",
      examPattern:
        "Computer-Based Exam — Science, Math, English, General Awareness. Physical Fitness Test & Medical.",
      howToApply:
        "Apply online at joinindiannavy.gov.in. Shortlisted candidates called for exam.",
    },
  },
  {
    id: "apex-bank-assistant-2026",
    category: "Banking",
    categoryColor: "bg-yellow-100 text-yellow-800",
    isUrgent: false,
    title: "Assam Co-operative Apex Bank Assistant Recruitment 2026",
    organization: "Assam Co-operative Apex Bank Limited",
    posts: "150 Posts",
    lastDate: "19 Apr 2026",
    applyUrl: "https://www.assamapexbank.in",
    whatsappMsg:
      "Hi, I need help applying for the Assam Apex Bank Assistant Recruitment 2026.",
    details: {
      eligibility:
        "Age: 18–38 years (relaxation for SC/ST/OBC). Education: Graduate in any discipline. Basic computer knowledge required.",
      vacancy: "150 Posts — Assistant (Clerical)",
      applyStart: "Check official website",
      lastDate: "19 Apr 2026",
      examPattern:
        "Written test + Interview. Subjects: Reasoning, Quantitative Aptitude, English, General Awareness, Banking.",
      howToApply:
        "Apply online at assamapexbank.in. Pay application fee via online gateway.",
    },
  },
  {
    id: "sai-coach-2026",
    category: "Sports / Central Govt",
    categoryColor: "bg-orange-100 text-orange-800",
    isUrgent: false,
    title: "Sports Authority of India Assistant Coach Recruitment 2026",
    organization: "Sports Authority of India (SAI)",
    posts: "323 Posts",
    lastDate: "21 Apr 2026",
    applyUrl: "https://sportsauthorityofindia.nic.in",
    whatsappMsg:
      "Hi, I need help applying for the SAI Assistant Coach Recruitment 2026.",
    details: {
      eligibility:
        "Age: 18–35 years. Education: Sports-related degree or National/International level sports achievement. Experience preferred.",
      vacancy: "323 Posts — Assistant Coach (various sports disciplines)",
      applyStart: "Check official website",
      lastDate: "21 Apr 2026",
      examPattern: "Document verification, practical test, and interview.",
      howToApply:
        "Apply online at sportsauthorityofindia.nic.in. Upload certificates and sports credentials.",
    },
  },
  {
    id: "gauhati-hc-mts-2026",
    category: "Judiciary / Assam",
    categoryColor: "bg-purple-100 text-purple-800",
    isUrgent: false,
    title: "Gauhati High Court MTS & Computer Assistant Recruitment 2026",
    organization: "Gauhati High Court",
    posts: "28 Posts",
    lastDate: "Exam: 26 Apr 2026",
    applyUrl: "https://www.ghconline.gov.in",
    whatsappMsg:
      "Hi, I need help with the Gauhati High Court MTS/Computer Assistant 2026 recruitment.",
    details: {
      eligibility:
        "Age: 18–40 years. MTS: Class 8 pass minimum. Computer Assistant: Graduate with computer diploma.",
      vacancy: "28 Posts — MTS & Computer Assistant",
      applyStart: "Applications closed; Exam on 26 Apr 2026",
      lastDate: "Exam: 26 Apr 2026",
      examPattern:
        "Written exam on 26 April 2026. MTS: General Knowledge, Reasoning. Computer Asst: Computer knowledge, English.",
      howToApply:
        "Applications closed. Download admit card from ghconline.gov.in.",
    },
  },
  {
    id: "lra-assam-2026",
    category: "State Govt / Assam",
    categoryColor: "bg-teal-100 text-teal-800",
    isUrgent: false,
    title: "Land Records Assistant (LRA) Recruitment 2026",
    organization: "Directorate of Land Records & Surveys, Assam",
    posts: "552 Posts",
    lastDate: "30 Apr 2026",
    applyUrl: "https://sebaonline.org",
    whatsappMsg: "Hi, I need help applying for the LRA Assam Recruitment 2026.",
    details: {
      eligibility:
        "Age: 18–38 years (relaxation for SC/ST/OBC/MOBC). Education: Higher Secondary (10+2) pass. Must be Assam domicile.",
      vacancy: "552 Posts — Land Records Assistant across Assam districts",
      applyStart: "Check sebaonline.org",
      lastDate: "30 Apr 2026",
      examPattern:
        "Written exam by SEBA — Assamese/Bengali/Bodo language, General Knowledge, Math, and English.",
      howToApply:
        "Apply online at sebaonline.org. Pay fee via online payment or bank challan.",
    },
  },
  {
    id: "nic-scientist-2026",
    category: "Central Govt / IT",
    categoryColor: "bg-indigo-100 text-indigo-800",
    isUrgent: false,
    title:
      "National Informatics Centre Scientist-B & Technical Assistant Recruitment 2026",
    organization: "National Informatics Centre (NIC), Govt. of India",
    posts: "619 Posts",
    lastDate: "To be updated",
    applyUrl: "https://www.nic.in",
    whatsappMsg:
      "Hi, I need help applying for the NIC Scientist-B Recruitment 2026.",
    details: {
      eligibility:
        "Age: 18–30 years (relaxation applicable). Education: B.E./B.Tech in CS/IT/ECE or MCA/M.Sc. in relevant field.",
      vacancy: "619 Posts — Scientist-B & Technical Assistant",
      applyStart: "To be notified",
      lastDate: "To be updated",
      examPattern:
        "CBT (Computer Based Test) — Technical subjects + General Aptitude. Interview for shortlisted candidates.",
      howToApply:
        "Apply online at nic.in when notified. Watch official website for updates.",
    },
  },
  {
    id: "pnrd-assam-2026",
    category: "State Govt / Assam",
    categoryColor: "bg-lime-100 text-lime-800",
    isUrgent: false,
    title: "PNRD Assam Recruitment 2026",
    organization: "Panchayat & Rural Development Dept., Assam",
    posts: "1508 Posts",
    lastDate: "To be updated",
    applyUrl: "https://pnrdassam.nic.in",
    whatsappMsg:
      "Hi, I need help applying for the PNRD Assam Recruitment 2026.",
    details: {
      eligibility:
        "Varies by post. Generally: 18–38 years. Education: Class 8 to Graduate depending on position. Assam domicile required.",
      vacancy:
        "1508 Posts — Various positions across Panchayat & Rural Development",
      applyStart: "To be notified",
      lastDate: "To be updated",
      examPattern:
        "Written exam/interview as per post. Details in official notification.",
      howToApply:
        "Apply online at pnrdassam.nic.in. Follow official notification instructions.",
    },
  },
  {
    id: "bsnl-set-2026",
    category: "Central Govt / Telecom",
    categoryColor: "bg-red-100 text-red-800",
    isUrgent: false,
    title: "BSNL Senior Executive Trainee (E2) Recruitment 2026",
    organization: "Bharat Sanchar Nigam Limited (BSNL)",
    posts: "120 Posts",
    lastDate: "To be updated",
    applyUrl: "https://externalbsnl.tdil.in",
    whatsappMsg:
      "Hi, I need help applying for the BSNL Senior Executive Trainee 2026.",
    details: {
      eligibility:
        "Age: 18–30 years. Education: B.E./B.Tech in relevant engineering discipline (ECE, CSE, EEE, Civil, etc.).",
      vacancy:
        "120 Posts — Senior Executive Trainee (E2) in various disciplines",
      applyStart: "To be notified",
      lastDate: "To be updated",
      examPattern:
        "Online exam — Technical subjects (120 marks) + General Ability (30 marks). Total 150 marks, 2.5 hours.",
      howToApply:
        "Apply online at externalbsnl.tdil.in when notified. Merit-based selection.",
    },
  },
];

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
              <div
                className="flex flex-col gap-4"
                data-ocid="reviews.loading_state"
              >
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-blue-100 p-6 animate-pulse"
                  >
                    <div className="flex gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200" />
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                        <div className="h-3 bg-gray-100 rounded w-1/4" />
                      </div>
                    </div>
                    <div className="h-3 bg-gray-100 rounded w-full mb-2" />
                    <div className="h-3 bg-gray-100 rounded w-3/4" />
                  </div>
                ))}
              </div>
            ) : sorted.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl border border-dashed border-blue-200 p-12 text-center flex flex-col items-center gap-3"
                data-ocid="reviews.empty_state"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: "#EFF6FF" }}
                >
                  <Star className="w-7 h-7 text-[#0B4F8F]" />
                </div>
                <div className="font-bold text-[#0B4F8F]">No reviews yet</div>
                <p className="text-gray-500 text-sm">
                  Be the first to share your experience with QS DIGITAL!
                </p>
              </motion.div>
            ) : (
              <div
                className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-1"
                data-ocid="reviews.list"
              >
                {sorted.map((review, idx) => (
                  <ReviewCard
                    key={String(review.id)}
                    review={review}
                    index={idx}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function JobDetailsModal({
  job,
  onClose,
}: {
  job: (typeof GOV_JOBS)[0];
  onClose: () => void;
}) {
  const d = job.details;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      data-ocid="job.details.modal"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.22 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 px-6 py-5 rounded-t-2xl"
          style={{
            background: "linear-gradient(135deg, #0B4F8F 0%, #0EA5A5 100%)",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
            data-ocid="job.details.close_button"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/20 text-white">
              {job.category}
            </span>
            {job.isUrgent && (
              <span className="text-xs font-bold bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full">
                ⚡ URGENT
              </span>
            )}
          </div>
          <h3 className="text-white font-extrabold text-lg leading-snug pr-10">
            {job.title}
          </h3>
          <p className="text-blue-100 text-sm mt-1">{job.organization}</p>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-5">
          {/* Dates row */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">📅</span>
                <span className="text-blue-700 font-bold text-sm uppercase tracking-wide">
                  Important Dates
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex flex-col gap-0.5">
                  <span className="text-gray-400 text-xs font-medium">
                    Apply Start
                  </span>
                  <span className="text-gray-800 text-sm font-semibold">
                    {d.applyStart}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-gray-400 text-xs font-medium">
                    Last Date to Apply
                  </span>
                  <span
                    className={`text-sm font-bold ${job.isUrgent ? "text-red-600" : "text-gray-800"}`}
                  >
                    {d.lastDate}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">👥</span>
                <span className="text-amber-700 font-bold text-sm uppercase tracking-wide">
                  Vacancies
                </span>
              </div>
              <p className="text-gray-800 text-sm font-semibold leading-relaxed">
                {d.vacancy}
              </p>
            </div>
          </div>

          {/* Eligibility */}
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🎓</span>
              <span className="text-green-700 font-bold text-sm uppercase tracking-wide">
                Eligibility Criteria
              </span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {d.eligibility}
            </p>
          </div>

          {/* Exam Pattern (only if not empty) */}
          {d.examPattern && (
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">📝</span>
                <span className="text-purple-700 font-bold text-sm uppercase tracking-wide">
                  Exam Pattern
                </span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                {d.examPattern}
              </p>
            </div>
          )}

          {/* How to Apply */}
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🔗</span>
              <span className="text-orange-700 font-bold text-sm uppercase tracking-wide">
                How to Apply
              </span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {d.howToApply}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <a
              href={job.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              data-ocid="job.details.apply_button"
            >
              Apply Now →
            </a>
            <a
              href={`https://wa.me/916000134640?text=${encodeURIComponent(job.whatsappMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              data-ocid="job.details.whatsapp_button"
            >
              <MessageCircle className="w-4 h-4" />
              Get Help on WhatsApp
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function GovJobCard({
  job,
  onViewDetails,
}: {
  job: (typeof GOV_JOBS)[0];
  onViewDetails: (job: (typeof GOV_JOBS)[0]) => void;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 p-4">
        <div className="flex-1 min-w-0">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${job.categoryColor}`}
            >
              {job.category}
            </span>
            {job.isUrgent && (
              <span className="text-xs font-bold bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse">
                ⚡ URGENT
              </span>
            )}
          </div>
          {/* Title */}
          <h4 className="text-gray-900 font-bold text-sm leading-snug mb-1">
            {job.title}
          </h4>
          <p className="text-gray-500 text-xs mb-2">{job.organization}</p>
          {/* Stats */}
          <div className="flex flex-wrap gap-4">
            <div>
              <span className="text-gray-400 text-xs">Total Posts: </span>
              <span className="text-gray-800 text-xs font-semibold">
                {job.posts}
              </span>
            </div>
            <div>
              <span className="text-gray-400 text-xs">Last Date: </span>
              <span
                className={`text-xs font-bold ${job.isUrgent ? "text-red-600" : "text-gray-800"}`}
              >
                {job.lastDate}
              </span>
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex flex-row sm:flex-col gap-2 flex-shrink-0">
          <a
            href={job.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors"
            data-ocid="job.card.apply_button"
          >
            Apply Now →
          </a>
          <button
            type="button"
            onClick={() => onViewDetails(job)}
            className="inline-flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-3 py-2 rounded-lg transition-colors border border-gray-200"
            data-ocid="job.card.open_modal_button"
          >
            View Details
          </button>
        </div>
      </div>
      {/* WhatsApp help strip */}
      <div className="px-4 py-2.5 bg-green-50 border-t border-green-100 flex items-center justify-between gap-2">
        <span className="text-green-800 text-xs">
          Need help applying? Contact us on WhatsApp
        </span>
        <a
          href={`https://wa.me/916000134640?text=${encodeURIComponent(job.whatsappMsg)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex-shrink-0"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}

function JobNotificationCard({
  notification,
}: {
  notification: (typeof JOB_NOTIFICATIONS)[0];
}) {
  return (
    <div className="rounded-2xl overflow-hidden border-2 border-blue-200 shadow-xl bg-white w-full">
      {/* Header */}
      <div
        className="relative px-6 py-5"
        style={{
          background: "linear-gradient(135deg, #0B4F8F 0%, #0EA5A5 100%)",
        }}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-white/90 text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                {notification.badge}
              </span>
              {notification.isNew && (
                <span className="text-xs font-bold bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full animate-pulse">
                  ✨ NEW
                </span>
              )}
            </div>
            <h3 className="text-white text-xl font-bold leading-tight mb-1">
              {notification.title}
            </h3>
            <p className="text-blue-100 text-sm font-medium mb-2">
              {notification.subtitle}
            </p>
            <p className="text-blue-50/80 text-sm leading-relaxed">
              {notification.description}
            </p>
          </div>
          <a
            href={notification.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold px-5 py-3 rounded-xl transition-all hover:shadow-lg hover:scale-105 text-sm"
            data-ocid="job.apply.button"
          >
            Apply Now →
          </a>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
        {/* Important Dates */}
        <div className="p-5 border-b border-gray-100">
          <h4 className="flex items-center gap-2 text-blue-700 font-bold text-sm mb-3 uppercase tracking-wide">
            <span>📅</span> Important Dates
          </h4>
          <div className="space-y-2">
            {notification.dates.map((d) => (
              <div
                key={d.label}
                className="flex flex-col sm:flex-row sm:items-start gap-0.5 sm:gap-2"
              >
                <span className="text-gray-500 text-xs font-medium min-w-[120px] flex-shrink-0">
                  {d.label}:
                </span>
                <span className="text-gray-800 text-xs font-semibold">
                  {d.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Eligibility */}
        <div className="p-5 border-b border-gray-100">
          <h4 className="flex items-center gap-2 text-green-700 font-bold text-sm mb-3 uppercase tracking-wide">
            <span>🎓</span> Eligibility Criteria
          </h4>
          <div className="space-y-2">
            {notification.eligibility.map((e) => (
              <div
                key={e.label}
                className="flex flex-col sm:flex-row sm:items-start gap-0.5 sm:gap-2"
              >
                <span className="text-gray-500 text-xs font-medium min-w-[80px] flex-shrink-0">
                  {e.label}:
                </span>
                <span className="text-gray-800 text-xs font-semibold">
                  {e.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Exam Pattern */}
        <div className="p-5 border-b sm:border-b-0 border-gray-100">
          <h4 className="flex items-center gap-2 text-purple-700 font-bold text-sm mb-3 uppercase tracking-wide">
            <span>📝</span> Exam Pattern
          </h4>
          <div className="space-y-1 mb-2">
            {notification.examPattern.map((ep) => (
              <div
                key={ep.subject}
                className="flex items-center justify-between bg-purple-50 rounded-lg px-3 py-1.5"
              >
                <span className="text-gray-700 text-xs font-medium">
                  {ep.subject}
                </span>
                <span className="text-purple-700 font-bold text-xs">
                  {ep.marks} Marks
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between bg-purple-100 rounded-lg px-3 py-1.5 border border-purple-200">
              <span className="text-purple-800 text-xs font-bold">Total</span>
              <span className="text-purple-800 font-bold text-xs">
                100 Marks
              </span>
            </div>
          </div>
          <p className="text-gray-500 text-xs italic">
            {notification.examNote}
          </p>
        </div>

        {/* How to Apply */}
        <div className="p-5">
          <h4 className="flex items-center gap-2 text-orange-700 font-bold text-sm mb-3 uppercase tracking-wide">
            <span>🔗</span> How to Apply
          </h4>
          <div className="space-y-1.5">
            <div className="flex items-start gap-2">
              <span className="text-gray-500 text-xs font-medium w-20 flex-shrink-0">
                Website:
              </span>
              <a
                href={notification.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-xs font-semibold"
              >
                {notification.howToApply.website}
              </a>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-500 text-xs font-medium w-20 flex-shrink-0">
                Fees:
              </span>
              <span className="text-gray-800 text-xs">
                {notification.howToApply.fees}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-500 text-xs font-medium w-20 flex-shrink-0">
                Exemption:
              </span>
              <span className="text-gray-800 text-xs">
                {notification.howToApply.exemption}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-500 text-xs font-medium w-20 flex-shrink-0">
                Helpdesk:
              </span>
              <a
                href={`tel:${notification.howToApply.helpdesk}`}
                className="text-blue-600 hover:underline text-xs font-semibold"
              >
                {notification.howToApply.helpdesk}
              </a>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-500 text-xs font-medium w-20 flex-shrink-0">
                Email:
              </span>
              <a
                href={`mailto:${notification.howToApply.email}`}
                className="text-blue-600 hover:underline text-xs font-semibold break-all"
              >
                {notification.howToApply.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Footer */}
      <div className="px-5 py-4 bg-green-50 border-t border-green-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <p className="text-green-800 text-sm font-semibold">
            Need help with your application?
          </p>
          <p className="text-green-600 text-xs">
            Our team will guide you through the entire process.
          </p>
        </div>
        <a
          href={`https://wa.me/916000134640?text=${encodeURIComponent(notification.whatsappMsg)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-5 py-2.5 rounded-xl transition-all hover:shadow-md text-sm"
          data-ocid="job.whatsapp.button"
        >
          <MessageCircle className="w-4 h-4" />
          Get Help Applying
        </a>
      </div>
    </div>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showJobNotifications, setShowJobNotifications] = useState(false);
  const [selectedJob, setSelectedJob] = useState<(typeof GOV_JOBS)[0] | null>(
    null,
  );

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
                    className="group bg-white rounded-xl border border-blue-100 overflow-hidden flex flex-col hover:border-[#0EA5A5] hover:shadow-card hover:scale-[1.02] transition-all duration-300"
                  >
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
                      {service.title === "Online Job Apply" && (
                        <button
                          type="button"
                          onClick={() => setShowJobNotifications((p) => !p)}
                          data-ocid="job.notifications.toggle"
                          className="mt-1 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors self-start"
                        >
                          {showJobNotifications
                            ? "🔼 Hide Jobs & Notices"
                            : `📋 View Jobs & Notices (${JOB_NOTIFICATIONS.length + GOV_JOBS.length})`}
                        </button>
                      )}
                    </div>
                  </motion.div>
                  {service.title === "Online Job Apply" &&
                    showJobNotifications && (
                      <div className="col-span-1 sm:col-span-2 lg:col-span-4 mt-2">
                        <AnimatePresence>
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                          >
                            {/* Exam Notices Section */}
                            <div>
                              <div className="flex items-center gap-3 mb-4">
                                <span className="text-blue-700 font-bold text-sm uppercase tracking-wide">
                                  📢 Exam Notices
                                </span>
                                <div className="flex-1 h-px bg-blue-200" />
                              </div>
                              {JOB_NOTIFICATIONS.map((notif) => (
                                <JobNotificationCard
                                  key={notif.id}
                                  notification={notif}
                                />
                              ))}
                            </div>

                            {/* Latest Government Jobs Section */}
                            <div>
                              <div className="flex items-center gap-3 mb-4">
                                <span className="text-gray-700 font-bold text-sm uppercase tracking-wide">
                                  💼 Latest Government Jobs
                                </span>
                                <div className="flex-1 h-px bg-gray-200" />
                              </div>
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                {GOV_JOBS.map((job) => (
                                  <GovJobCard
                                    key={job.id}
                                    job={job}
                                    onViewDetails={(j) => setSelectedJob(j)}
                                  />
                                ))}
                              </div>
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

      {/* ===== JOB DETAILS MODAL ===== */}
      <AnimatePresence>
        {selectedJob && (
          <JobDetailsModal
            job={selectedJob}
            onClose={() => setSelectedJob(null)}
          />
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
