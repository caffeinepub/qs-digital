import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Briefcase,
  Building2,
  Car,
  Clock,
  CreditCard,
  FileText,
  HeartHandshake,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Plane,
  RotateCcw,
  Shield,
  Star,
  Train,
  Users,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useGetReviews, useSubmitReview } from "./hooks/useQueries";
import type { Review } from "./hooks/useQueries";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Reviews", href: "#reviews" },
];

const SERVICES = [
  {
    icon: <Car className="w-8 h-8" />,
    title: "Vehicle Insurance",
    description: "Renew or apply for vehicle insurance quickly",
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Driving Licence",
    description: "Apply for new or renew your driving licence",
  },
  {
    icon: <RotateCcw className="w-8 h-8" />,
    title: "RC Renew",
    description: "Hassle-free RC renewal assistance",
  },
  {
    icon: <CreditCard className="w-8 h-8" />,
    title: "PAN Card Apply",
    description: "Apply for PAN card with ease",
  },
  {
    icon: <Building2 className="w-8 h-8" />,
    title: "Banking",
    description: "Banking assistance and services",
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: "Online Job Apply",
    description: "Get help applying for jobs online",
  },
  {
    icon: <Plane className="w-8 h-8" />,
    title: "Flight Ticket Booking",
    description: "Book domestic and international flights",
  },
  {
    icon: <Train className="w-8 h-8" />,
    title: "Indian Train Ticket Booking",
    description: "Book IRCTC train tickets easily",
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

function ReviewsSection() {
  const { data: reviews = [], isLoading } = useGetReviews();
  const { mutateAsync: submitReview, isPending } = useSubmitReview();

  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const sorted = [...reviews].reverse();
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length
      : 0;

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
          {reviews.length > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 bg-white rounded-full px-5 py-2 border border-amber-200 shadow-sm">
              <StarRating value={Math.round(avgRating)} />
              <span className="font-extrabold text-[#0B4F8F] text-lg">
                {avgRating.toFixed(1)}
              </span>
              <span className="text-gray-400 text-sm">
                ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
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
                        disabled={isPending}
                        className="w-full bg-[#0B4F8F] hover:bg-[#0E6AAE] text-white font-bold py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                        data-ocid="reviews.submit_button"
                      >
                        {isPending ? (
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

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

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
            background:
              "linear-gradient(135deg, #0B4F8F 0%, #0E6AAE 50%, #0EA5A5 100%)",
          }}
          data-ocid="hero.section"
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url('/assets/generated/qs-digital-hero-bg.dim_1200x600.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
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
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                  Your Trusted{" "}
                  <span style={{ color: "#F59E0B" }}>Digital Services</span>{" "}
                  Partner
                </h1>
                <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl leading-relaxed">
                  QS DIGITAL is your one-stop digital service center in
                  Budlapara Chowk, Dimakuchi. From vehicle insurance and PAN
                  card applications to train and flight bookings — we handle it
                  all, fast and reliably.
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
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.07 }}
                  data-ocid={`services.item.${idx + 1}`}
                  className="group bg-white rounded-xl border border-blue-100 p-6 flex flex-col gap-4 hover:border-[#0EA5A5] hover:shadow-card transition-all"
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-[#0B4F8F] group-hover:bg-[#0B4F8F] group-hover:text-white transition-all"
                    style={{ background: "#EFF6FF" }}
                  >
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0B4F8F] text-base mb-1">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNavClick("#contact")}
                    className="mt-auto text-sm font-bold text-[#0EA5A5] hover:text-[#0B4F8F] transition-colors flex items-center gap-1 text-left"
                  >
                    Learn More →
                  </button>
                </motion.div>
              ))}
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
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* ===== FOOTER ===== */}
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
