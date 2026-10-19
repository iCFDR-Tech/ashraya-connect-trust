import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Heart,
  Users,
  BookOpen,
  Sprout,
  Stethoscope,
  HandHeart,
  Check,
  Copy,
  ArrowRight,
  Menu,
  X,
  ExternalLink,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Calendar,
  Award,
  Send,
  Info,
  ChevronRight,
  Globe,
  Building2,
  Clock
} from 'lucide-react';

/**
 * Custom SVG Emblem recreated from the uploaded Ashraya Connect Trust Logo:
 * Features an interlocking 'A' and 'C' monogram with a leaf motif in a blue-to-teal gradient.
 */
const AshrayaLogo = ({ className = "w-12 h-12", showText = true, darkText = true }) => (
  <div className="flex items-center gap-3 select-none group">
    <div className={`relative flex-shrink-0 ${className} transition-transform duration-300 group-hover:scale-105`}>
      <svg viewBox="0 0 120 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
        <defs>
          <linearGradient id="ashrayaGradPrimary" x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
          <linearGradient id="ashrayaGradTeal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="50%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#0d9488" />
          </linearGradient>
          <linearGradient id="ashrayaSwoosh" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="50%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>

        {/* Top C Arc behind/interlocking with A */}
        <path
          d="M 66 24 C 80 18, 96 22, 105 32 L 96 41 C 89 33, 77 31, 67 36 Z"
          fill="url(#ashrayaGradTeal)"
        />

        {/* Main 'A' Structure */}
        <path
          d="M 55 8 L 24 85 L 49 85 L 55 72 L 39 72 L 55 31 L 78 85 L 91 85 L 55 8 Z"
          fill="url(#ashrayaGradPrimary)"
        />

        {/* Inner Diamond / Triangle accent inside A */}
        <polygon points="55,40 49,54 57,59 61,51" fill="#38bdf8" />

        {/* Interlocking Wave / Infinity C Swoosh across A */}
        <path
          d="M 22 72 C 16 50, 38 34, 62 49 C 76 58, 86 92, 107 72 L 100 63 C 86 78, 76 47, 60 39 C 34 25, 8 44, 15 74 Z"
          fill="url(#ashrayaSwoosh)"
          stroke="#ffffff"
          strokeWidth="1.5"
        />

        {/* Leaf Motif on the right of the monogram */}
        <path
          d="M 85 57 C 87 43, 100 39, 112 38 C 110 52, 101 62, 85 57 Z"
          fill="url(#ashrayaGradTeal)"
        />
        {/* Leaf Vein cutout */}
        <path
          d="M 86 56 Q 97 50 105 43"
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    </div>

    {showText && (
      <div className="flex flex-col">
        <span
          className={`font-extrabold tracking-wider text-lg sm:text-xl leading-none ${
            darkText
              ? "bg-gradient-to-r from-blue-800 via-sky-600 to-teal-600 bg-clip-text text-transparent"
              : "text-white"
          }`}
        >
          ASHRAYA
        </span>
        <span
          className={`text-[10px] sm:text-xs font-semibold tracking-[0.22em] mt-1 ${
            darkText ? "text-slate-600" : "text-sky-200"
          }`}
        >
          CONNECT TRUST
        </span>
      </div>
    )}
  </div>
);

export default function App() {
  // Navigation & UI State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeAboutTab, setActiveAboutTab] = useState('mission');
  const [copiedField, setCopiedField] = useState(null);
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [selectedProgramModal, setSelectedProgramModal] = useState(null);
  const [activeGalleryFilter, setActiveGalleryFilter] = useState('All');

  // Contact & Volunteer Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    purpose: 'Volunteer with Us',
    initiative: 'General Community Support',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // Official Contact Information Constants
  const TRUST_INFO = {
    name: "Ashraya Connect Trust",
    phoneDisplay: "+91 884 019 6558",
    phoneRaw: "+918840196558",
    whatsappNumber: "918840196558",
    email: "ashrayaconnecttrust@gmail.com",
    addressLine1: "C 24/18-2A, Piplani Katra",
    addressLine2: "Kabir Chaura, Varanasi - 221001",
    stateCountry: "Uttar Pradesh, India",
    fullAddress: "C 24/18-2A, Piplani Katra, Kabir Chaura, Varanasi - 221001"
  };

  // Copy helper
  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2500);
  };

  // Smooth scroll to section
  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Pre-fill form when user selects an initiative
  const handleVolunteerForInitiative = (initiativeTitle) => {
    setSelectedProgramModal(null);
    setFormData((prev) => ({
      ...prev,
      purpose: 'Volunteer with Us',
      initiative: initiativeTitle
    }));
    scrollToSection('contact');
  };

  // Form Submission Handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setFormError('Please enter your name and phone number so we can reach you.');
      return;
    }
    setFormError('');
    setFormSubmitted(true);
  };

  // Direct WhatsApp & Email launchers from form data
  const openWhatsAppWithForm = () => {
    const text = `Namaste Ashraya Connect Trust,%0A%0A*Name:* ${encodeURIComponent(formData.name)}%0A*Phone:* ${encodeURIComponent(formData.phone)}%0A*Email:* ${encodeURIComponent(formData.email || 'N/A')}%0A*Purpose:* ${encodeURIComponent(formData.purpose)}%0A*Focus Area:* ${encodeURIComponent(formData.initiative)}%0A*Message:* ${encodeURIComponent(formData.message || 'I would like to connect with the trust.')}`;
    window.open(`https://wa.me/${TRUST_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  const openMailClientWithForm = () => {
    const subject = encodeURIComponent(`[${formData.purpose}] Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Namaste Ashraya Connect Trust,\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email || 'Not provided'}\nPurpose: ${formData.purpose}\nInitiative: ${formData.initiative}\n\nMessage:\n${formData.message || 'I would like to connect and learn more.'}\n\nWarm regards,\n${formData.name}`
    );
    window.location.href = `mailto:${TRUST_INFO.email}?subject=${subject}&body=${body}`;
  };

  // Programs / Initiatives Data
  const initiatives = [
    {
      id: 'education',
      title: 'Education & Youth Skill Development',
      category: 'Education',
      icon: BookOpen,
      color: 'from-blue-600 to-sky-500',
      lightBg: 'bg-blue-50 text-blue-700 border-blue-100',
      shortDesc: 'Bridging learning gaps for underprivileged children and equipping youth in Varanasi with digital and vocational skills.',
      highlights: [
        'After-school remedial classes and mentorship in local wards',
        'Distribution of books, stationery kits, and learning materials',
        'Digital literacy and spoken communication workshops for youth'
      ],
      impactMetric: '140+ Students Supported'
    },
    {
      id: 'healthcare',
      title: 'Healthcare & Hygiene Awareness',
      category: 'Health',
      icon: Stethoscope,
      color: 'from-sky-500 to-cyan-500',
      lightBg: 'bg-sky-50 text-sky-700 border-sky-100',
      shortDesc: 'Organizing preventive health checkup camps, maternal care awareness, and sanitation drives around Kabir Chaura and nearby neighborhoods.',
      highlights: [
        'Free general health, eye, and blood-pressure screening camps',
        'Menstrual hygiene awareness and sanitary kit distribution',
        'Connecting needy patients with local hospital support systems'
      ],
      impactMetric: '10+ Health Camps Organized'
    },
    {
      id: 'environment',
      title: 'Green Kashi & Environmental Care',
      category: 'Environment',
      icon: Sprout,
      color: 'from-teal-600 to-emerald-500',
      lightBg: 'bg-teal-50 text-teal-700 border-teal-100',
      shortDesc: 'Rooted in the leaf symbol of our emblem—promoting urban plantation, plastic-free neighborhoods, and clean ghat awareness.',
      highlights: [
        'Community tree plantation and sapling care drives',
        'Zero-waste and cloth-bag promotion in local markets',
        'Cleanliness and water conservation awareness campaigns'
      ],
      impactMetric: '200+ Saplings Planted'
    },
    {
      id: 'welfare',
      title: 'Community Shelter & Livelihood Support',
      category: 'Welfare',
      icon: HandHeart,
      color: 'from-indigo-600 to-blue-600',
      lightBg: 'bg-indigo-50 text-indigo-700 border-indigo-100',
      shortDesc: 'Living up to our name "Ashraya" (Shelter/Support) by aiding vulnerable families, senior citizens, and daily-wage earners.',
      highlights: [
        'Winter blanket drives and dry ration support for vulnerable families',
        'Self-help group (SHG) guidance and micro-livelihood counseling',
        'Emergency relief and social security scheme facilitation'
      ],
      impactMetric: '110+ Families Assisted'
    }
  ];

  // Community Highlights / Gallery Cards
  const communityStories = [
    {
      title: "Back-to-School Stationery Drive",
      location: "Kabir Chaura, Varanasi",
      category: "Education",
      date: "Recent Initiative",
      desc: "Equipped 120+ young learners with school bags, notebooks, and geometry sets to encourage uninterrupted schooling.",
      gradient: "from-blue-600/90 to-sky-700/90"
    },
    {
      title: "Preventive Health & Eye Checkup Camp",
      location: "Piplani Katra Ward",
      category: "Health",
      date: "Community Camp",
      desc: "Over 180 senior citizens and residents received free consultations, blood sugar checks, and essential health guidance.",
      gradient: "from-sky-600/90 to-teal-700/90"
    },
    {
      title: "Monsoon Sapling & Clean Neighborhood Drive",
      location: "Varanasi Urban Wards",
      category: "Environment",
      date: "Green Kashi",
      desc: "Volunteers and local youth came together to plant native shade trees and distribute reusable cotton bags.",
      gradient: "from-teal-600/90 to-emerald-700/90"
    },
    {
      title: "Winter Warmth & Ration Distribution",
      location: "Varanasi",
      category: "Welfare",
      date: "Seasonal Relief",
      desc: "Providing warm blankets and nutritional support packages to elderly citizens and street-side workers during peak winter.",
      gradient: "from-indigo-700/90 to-blue-800/90"
    }
  ];

  const filteredStories = activeGalleryFilter === 'All'
    ? communityStories
    : communityStories.filter(s => s.category === activeGalleryFilter);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-sky-500 selection:text-white">
      {/* Top Quick-Contact Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sky-300 font-medium">
            <MapPin className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
            <span>C 24/18-2A, Piplani Katra, Kabir Chaura, Varanasi - 221001</span>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href={`tel:${TRUST_INFO.phoneRaw}`}
              className="flex items-center gap-1.5 hover:text-sky-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span>{TRUST_INFO.phoneDisplay}</span>
            </a>
            <a
              href={`mailto:${TRUST_INFO.email}`}
              className="hidden sm:flex items-center gap-1.5 hover:text-teal-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-teal-400" />
              <span>{TRUST_INFO.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="text-left focus:outline-none"
            aria-label="Ashraya Connect Trust Home"
          >
            <AshrayaLogo className="w-12 h-12" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button onClick={() => scrollToSection('home')} className="hover:text-blue-700 transition-colors">Home</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-blue-700 transition-colors">About Us</button>
            <button onClick={() => scrollToSection('initiatives')} className="hover:text-blue-700 transition-colors">Our Initiatives</button>
            <button onClick={() => scrollToSection('impact')} className="hover:text-blue-700 transition-colors">Impact</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-blue-700 transition-colors">Contact Us</button>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scrollToSection('contact')}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              Volunteer
            </button>
            <button
              onClick={() => setDonateModalOpen(true)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-700 via-sky-600 to-teal-600 hover:from-blue-800 hover:to-teal-700 shadow-md shadow-sky-500/20 flex items-center gap-2 transition-all"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>Support Us</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
            <div className="flex flex-col space-y-1">
              {[
                { label: 'Home', id: 'home' },
                { label: 'About Us', id: 'about' },
                { label: 'Our Initiatives', id: 'initiatives' },
                { label: 'Community Impact', id: 'impact' },
                { label: 'Contact & Location', id: 'contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-sky-50 hover:text-blue-700 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-3">
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full py-2.5 rounded-xl text-sm font-semibold text-blue-700 bg-blue-50 text-center"
              >
                Join as Volunteer
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setDonateModalOpen(true);
                }}
                className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-700 to-teal-600 flex items-center justify-center gap-1.5"
              >
                <Heart className="w-4 h-4 fill-current" />
                <span>Support Us</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
        {/* Decorative background glows matching logo gradient */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Hero Text Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs sm:text-sm font-medium">
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span>Serving Communities from the Heart of Varanasi</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Connecting Hearts,{' '}
                <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
                  Creating Ashraya
                </span>{' '}
                for Every Life.
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                <strong className="text-white font-semibold">Ashraya Connect Trust</strong> is a community-driven social welfare organization headquartered in Kabir Chaura, Varanasi. We bridge compassionate citizens with grassroots initiatives in education, preventive healthcare, environmental sustainability, and livelihood support.
              </p>

              {/* Hero Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-6 py-3.5 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-sky-400 to-teal-400 hover:from-sky-300 hover:to-teal-300 shadow-lg shadow-sky-500/25 flex items-center gap-2 transition-all"
                >
                  <span>Get Involved</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollToSection('initiatives')}
                  className="px-6 py-3.5 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-sm transition-all"
                >
                  Explore Our Work
                </button>
              </div>

              {/* Direct Contact Pill Strip */}
              {/* <div className="pt-6 grid sm:grid-cols-2 gap-3 max-w-xl">
                <a
                  href={`tel:${TRUST_INFO.phoneRaw}`}
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Direct Helpline</div>
                    <div className="text-sm font-bold text-white">{TRUST_INFO.phoneDisplay}</div>
                  </div>
                </a>

                <a
                  href={`mailto:${TRUST_INFO.email}`}
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-slate-400">Official Email</div>
                    <div className="text-sm font-bold text-white truncate">{TRUST_INFO.email}</div>
                  </div>
                </a>
              </div> */}
            </div>

            {/* Hero Right Feature Card (Logo Showcase + Trust Highlights) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-slate-700/80 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
                <div className="flex flex-col items-center text-center pb-6 border-b border-slate-700/80">
                  <div className="w-28 h-28 rounded-2xl bg-slate-950/90 border border-slate-800 flex items-center justify-center p-4 shadow-inner mb-4">
                    <AshrayaLogo className="w-20 h-20" showText={false} />
                  </div>
                  <h2 className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
                    ASHRAYA CONNECT TRUST
                  </h2>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mt-1">
                    Empowered Community • Sustainable Future
                  </p>
                </div>

                {/* Core Pillars Mini Grid */}
                <div className="grid grid-cols-2 gap-3 my-6">
                  <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <BookOpen className="w-5 h-5 text-sky-400 mb-1.5" />
                    <div className="text-sm font-semibold text-white">Child Education</div>
                    <div className="text-xs text-slate-400">Learning & literacy kits</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <Stethoscope className="w-5 h-5 text-cyan-400 mb-1.5" />
                    <div className="text-sm font-semibold text-white">Health Camps</div>
                    <div className="text-xs text-slate-400">Preventive local care</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <Sprout className="w-5 h-5 text-teal-400 mb-1.5" />
                    <div className="text-sm font-semibold text-white">Green Initiatives</div>
                    <div className="text-xs text-slate-400">Plantation & clean wards</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <HandHeart className="w-5 h-5 text-blue-400 mb-1.5" />
                    <div className="text-sm font-semibold text-white">Social Ashraya</div>
                    <div className="text-xs text-slate-400">Dignity & relief drives</div>
                  </div>
                </div>

                {/* Location Footer Inside Hero Card */}
                <div className="rounded-xl bg-sky-950/50 border border-sky-800/50 p-4 flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-200 leading-relaxed">
                    <span className="font-semibold text-white block mb-0.5">Registered Office Address:</span>
                    C 24/18-2A, Piplani Katra, Kabir Chaura, Varanasi - 221001, Uttar Pradesh
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT STATS BANNER */}
      <section id="impact" className="relative z-20 -mt-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/70 border border-slate-100 p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Lives Positively Touched', value: '1,500+', icon: Users, accent: 'text-blue-600 bg-blue-50' },
            { label: 'Community Drives & Camps', value: '65+', icon: Calendar, accent: 'text-sky-600 bg-sky-50' },
            { label: 'Dedicated Volunteers', value: '120+', icon: Heart, accent: 'text-teal-600 bg-teal-50' },
            { label: 'Varanasi Wards Reached', value: '18+', icon: MapPin, accent: 'text-indigo-600 bg-indigo-50' }
          ].map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div key={idx} className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${stat.accent}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-slate-500 font-medium">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section id="about" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Story & Interactive Tabs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <span>About Ashraya Connect Trust</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              Rooted in Seva, Guided by Compassion in{' '}
              <span className="text-blue-700">Varanasi</span>.
            </h2>

            <p className="text-slate-600 leading-relaxed">
              The word <strong className="text-slate-900">“Ashraya”</strong> means shelter, support, and refuge—while <strong className="text-slate-900">“Connect”</strong> signifies our belief that meaningful change happens when caring individuals unite with grassroots needs. Located at Piplani Katra, Kabir Chaura, our trust works closely with local families, youth, and community elders to build self-reliant neighborhoods.
            </p>

            {/* Interactive Mission / Vision / Roots Tabs */}
            <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-sm">
              <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl">
                {[
                  { id: 'mission', label: 'Our Mission' },
                  { id: 'vision', label: 'Our Vision' },
                  { id: 'roots', label: 'Varanasi Roots' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveAboutTab(tab.id)}
                    className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                      activeAboutTab === tab.id
                        ? 'bg-white text-blue-700 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-5 sm:p-6">
                {activeAboutTab === 'mission' && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-blue-600" />
                      <span>Empowering Vulnerable Communities with Dignity</span>
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      Our mission is to create accessible pathways to quality education, primary healthcare awareness, environmental stewardship, and social security for underserved households in Varanasi—ensuring nobody is left without support in times of need.
                    </p>
                  </div>
                )}

                {activeAboutTab === 'vision' && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-teal-600" />
                      <span>An Inclusive, Green & Self-Reliant Society</span>
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      Just as our interlocking 'A' and 'C' emblem blends human connection with a thriving green leaf, we envision neighborhoods where every child learns, every elder receives care, and community growth goes hand-in-hand with ecological balance.
                    </p>
                  </div>
                )}

                {activeAboutTab === 'roots' && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-sky-600" />
                      <span>Serving from Kabir Chaura, Varanasi</span>
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      Operating from <strong className="text-slate-800">C 24/18-2A, Piplani Katra, Kabir Chaura, Varanasi - 221001</strong>, we draw inspiration from the timeless spirit of harmony and service of Kabir Chaura to reach urban wards and surrounding villages.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Core Values Grid */}
          <div className="lg:col-span-5 grid sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Compassion First',
                desc: 'Approaching every individual and family with empathy, respect, and dignity.',
                icon: Heart,
                color: 'bg-blue-50 text-blue-700 border-blue-100'
              },
              {
                title: 'Community Connection',
                desc: 'Bridging volunteers, professionals, and donors directly with local initiatives.',
                icon: Users,
                color: 'bg-sky-50 text-sky-700 border-sky-100'
              },
              {
                title: 'Green Sustainability',
                desc: 'Promoting eco-friendly practices, tree plantation, and clean neighborhoods.',
                icon: Sprout,
                color: 'bg-teal-50 text-teal-700 border-teal-100'
              },
              {
                title: 'Complete Transparency',
                desc: 'Ensuring every contribution and volunteer hour creates measurable grassroots impact.',
                icon: Award,
                color: 'bg-indigo-50 text-indigo-700 border-indigo-100'
              }
            ].map((val, i) => {
              const IconComp = val.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${val.color}`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base mb-1.5">{val.title}</h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{val.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OUR INITIATIVES SECTION */}
      <section id="initiatives" className="py-16 sm:py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider mb-3">
              <span>Our Core Programs</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              How Ashraya Connect Trust Serves
            </h2>
            <p className="text-slate-600 mt-3 text-base sm:text-lg">
              We focus on four interconnected pillars of community welfare to create lasting social and environmental progress across Varanasi.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {initiatives.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.id}
                  className="group rounded-2xl bg-slate-50/70 hover:bg-white border border-slate-200/90 hover:border-sky-300 p-6 sm:p-8 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-md`}>
                        <IconComp className="w-7 h-7" />
                      </div>
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${item.lightBg}`}>
                        {item.impactMetric}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base mt-2.5 leading-relaxed">
                      {item.shortDesc}
                    </p>

                    <ul className="mt-5 space-y-2.5 border-t border-slate-200/70 pt-4">
                      {item.highlights.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                          <Check className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => handleVolunteerForInitiative(item.title)}
                      className="text-sm font-semibold text-blue-700 hover:text-blue-800 inline-flex items-center gap-1.5"
                    >
                      <span>Volunteer for this cause</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setSelectedProgramModal(item)}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-200/70 hover:bg-slate-200 text-slate-700 transition-colors"
                    >
                      Program Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* RECENT COMMUNITY HIGHLIGHTS / GALLERY */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Field Action in Varanasi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Community Drives & Stories
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {['All', 'Education', 'Health', 'Environment', 'Welfare'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveGalleryFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeGalleryFilter === cat
                    ? 'bg-blue-700 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredStories.map((story, index) => (
            <div
              key={index}
              className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className={`h-36 bg-gradient-to-br ${story.gradient} p-5 flex flex-col justify-between text-white relative overflow-hidden`}>
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                      {story.category}
                    </span>
                    <span className="text-sky-100">{story.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-sky-100">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{story.location}</span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-slate-900 text-base mb-2">{story.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{story.desc}</p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2">
                <button
                  onClick={() => handleVolunteerForInitiative(story.title)}
                  className="w-full py-2 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  Participate in Next Drive
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT & VOLUNTEER REGISTRATION SECTION */}
      <section id="contact" className="py-16 sm:py-24 bg-gradient-to-b from-slate-100 to-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
              <span>Reach Out to Us</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Connect With Ashraya Connect Trust
            </h2>
            <p className="text-slate-600 mt-3 text-base sm:text-lg">
              Visit our office in Kabir Chaura, Varanasi, give us a call, or send us a message to volunteer, partner, or request community support.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Complete Contact Cards */}
            <div className="lg:col-span-5 space-y-5">
              {/* Address Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                      Registered Office Address
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                      Ashraya Connect Trust
                    </h3>
                    <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                      C 24/18-2A, Piplani Katra,<br />
                      Kabir Chaura, Varanasi - 221001<br />
                      Uttar Pradesh, India
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => handleCopy(TRUST_INFO.fullAddress, 'address')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                      >
                        {copiedField === 'address' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Address Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Address</span>
                          </>
                        )}
                      </button>

                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          'C 24/18-2A, Piplani Katra, Kabir Chaura, Varanasi - 221001'
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors"
                      >
                        <span>Open in Google Maps</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                      Contact Number
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                      <a href={`tel:${TRUST_INFO.phoneRaw}`} className="hover:text-blue-700 transition-colors">
                        {TRUST_INFO.phoneDisplay}
                      </a>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Available for calls & WhatsApp inquiries (Mon – Sat, 9:00 AM – 7:00 PM)
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <a
                        href={`tel:${TRUST_INFO.phoneRaw}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Now</span>
                      </a>

                      <a
                        href={`https://wa.me/${TRUST_INFO.whatsappNumber}?text=${encodeURIComponent(
                          'Namaste Ashraya Connect Trust, I would like to connect with you.'
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>

                      <button
                        onClick={() => handleCopy(TRUST_INFO.phoneDisplay, 'phone')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                      >
                        {copiedField === 'phone' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                      Official Email Address
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 break-all">
                      <a href={`mailto:${TRUST_INFO.email}`} className="hover:text-teal-700 transition-colors">
                        {TRUST_INFO.email}
                      </a>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      For partnerships, CSR inquiries, volunteering & documentation
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <a
                        href={`mailto:${TRUST_INFO.email}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Send Email</span>
                      </a>

                      <button
                        onClick={() => handleCopy(TRUST_INFO.email, 'email')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                      >
                        {copiedField === 'email' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Email Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Email</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Inquiry & Volunteer Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-lg">
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-900">
                      Send a Message or Join Us
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Fill in your details below to connect with our team in Varanasi.
                    </p>
                  </div>
                  <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-teal-500 text-white items-center justify-center shadow-md">
                    <Send className="w-5 h-5" />
                  </div>
                </div>

                {formSubmitted ? (
                  <div className="rounded-2xl bg-gradient-to-br from-teal-50 via-sky-50 to-blue-50 border border-teal-200 p-6 sm:p-8 text-center space-y-5">
                    <div className="w-16 h-16 rounded-full bg-teal-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-teal-600/20">
                      <Check className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-extrabold text-slate-900">
                        Thank You, {formData.name}!
                      </h4>
                      <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-md mx-auto">
                        Your message regarding <strong className="text-slate-800">{formData.purpose}</strong> ({formData.initiative}) is ready. Since this is a direct frontend portal, you can instantly send it via WhatsApp or Email below:
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <button
                        onClick={openWhatsAppWithForm}
                        className="px-5 py-3 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md flex items-center gap-2 transition-all"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>Send via WhatsApp (+91 884 019 6558)</span>
                      </button>

                      <button
                        onClick={openMailClientWithForm}
                        className="px-5 py-3 rounded-xl font-semibold text-white bg-blue-700 hover:bg-blue-800 shadow-md flex items-center gap-2 transition-all"
                      >
                        <Mail className="w-5 h-5" />
                        <span>Send via Email Client</span>
                      </button>
                    </div>

                    <div className="pt-4 border-t border-teal-200/60">
                      <button
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormData({
                            name: '',
                            phone: '',
                            email: '',
                            purpose: 'Volunteer with Us',
                            initiative: 'General Community Support',
                            message: ''
                          });
                        }}
                        className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline"
                      >
                        Submit another inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    {formError && (
                      <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-medium">
                        {formError}
                      </div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., Rahul Sharma"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g., +91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                          How Would You Like to Connect?
                        </label>
                        <select
                          value={formData.purpose}
                          onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm bg-white transition-all"
                        >
                          <option value="Volunteer with Us">Volunteer with Us</option>
                          <option value="Support / Donate Materials">Support / Donate Materials</option>
                          <option value="NGO / CSR Partnership">NGO / CSR Partnership</option>
                          <option value="Request Community Assistance">Request Community Assistance</option>
                          <option value="General Inquiry">General Inquiry</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Preferred Initiative / Focus Area
                      </label>
                      <select
                        value={formData.initiative}
                        onChange={(e) => setFormData({ ...formData, initiative: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm bg-white transition-all"
                      >
                        <option value="General Community Support">General Community Support</option>
                        <option value="Education & Youth Skill Development">Education & Youth Skill Development</option>
                        <option value="Healthcare & Hygiene Awareness">Healthcare & Hygiene Awareness</option>
                        <option value="Green Kashi & Environmental Care">Green Kashi & Environmental Care</option>
                        <option value="Community Shelter & Livelihood Support">Community Shelter & Livelihood Support</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Your Message
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Share how you would like to get involved or any questions you have..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm transition-all resize-none"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <p className="text-xs text-slate-500">
                        Or call us directly at <strong className="text-slate-700">{TRUST_INFO.phoneDisplay}</strong>
                      </p>

                      <button
                        type="submit"
                        className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-700 via-sky-600 to-teal-600 hover:from-blue-800 hover:to-teal-700 shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 transition-all"
                      >
                        <span>Continue to Send</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid md:grid-cols-12 gap-10 pb-10 border-b border-slate-800/80">
            {/* Brand Column */}
            <div className="md:col-span-5 space-y-4">
              <AshrayaLogo className="w-12 h-12" darkText={false} />
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                Dedicated to fostering compassionate community connections, youth education, preventive healthcare, and sustainable development in Varanasi.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <a
                  href={`tel:${TRUST_INFO.phoneRaw}`}
                  className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-sky-400 flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{TRUST_INFO.phoneDisplay}</span>
                </a>
                <a
                  href={`mailto:${TRUST_INFO.email}`}
                  className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-teal-400 flex items-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Us</span>
                </a>
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Quick Links
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li>
                  <button onClick={() => scrollToSection('home')} className="hover:text-sky-400 transition-colors">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('about')} className="hover:text-sky-400 transition-colors">
                    About the Trust
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('initiatives')} className="hover:text-sky-400 transition-colors">
                    Our Initiatives
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('impact')} className="hover:text-sky-400 transition-colors">
                    Community Impact
                  </button>
                </li>
                <li>
                  <button onClick={() => setDonateModalOpen(true)} className="hover:text-teal-400 transition-colors">
                    Support & Contribute
                  </button>
                </li>
              </ul>
            </div>

            {/* Official Address & Contact Details */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Official Contact & Address
              </h4>
              <div className="space-y-3 text-sm text-slate-400">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-teal-400 flex-shrink-0 mt-1" />
                  <span>
                    C 24/18-2A, Piplani Katra,<br />
                    Kabir Chaura, Varanasi - 221001,<br />
                    Uttar Pradesh, India
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <a href={`tel:${TRUST_INFO.phoneRaw}`} className="hover:text-white transition-colors">
                    {TRUST_INFO.phoneDisplay}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <a href={`mailto:${TRUST_INFO.email}`} className="hover:text-white transition-colors break-all">
                    {TRUST_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} Ashraya Connect Trust, Varanasi. All rights reserved.</p>
            <p className="flex items-center gap-1">
              {/* <span>Built with</span>
              <Heart className="w-3.5 h-3.5 text-teal-400 fill-current" />
              <span>for Community Welfare in Kashi</span> */}
            </p>
          </div>
        </div>
      </footer>

      {/* SUPPORT / DONATE MODAL */}
      {donateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative">
            <button
              onClick={() => setDonateModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-teal-500 text-white flex items-center justify-center shadow-md">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Support Ashraya Connect Trust
                </h3>
                <p className="text-xs text-slate-500">
                  Empowering grassroot lives across Varanasi
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-5">
              You can support our community drives through direct bank/UPI contribution, or by donating educational stationery, books, medicines, and winter relief materials at our Kabir Chaura office.
            </p>

            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-3 mb-6 text-xs sm:text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Trust Name:</span>
                <span className="font-bold text-slate-900">Ashraya Connect Trust</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Helpline / Coordination:</span>
                <span className="font-bold text-blue-700">{TRUST_INFO.phoneDisplay}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Email for Receipts:</span>
                <span className="font-semibold text-slate-800">{TRUST_INFO.email}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 text-xs text-slate-600">
                <strong className="text-slate-800">Drop-off / Office Address:</strong> C 24/18-2A, Piplani Katra, Kabir Chaura, Varanasi - 221001
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <a
                href={`https://wa.me/${TRUST_INFO.whatsappNumber}?text=${encodeURIComponent(
                  'Namaste Ashraya Connect Trust, I would like to support/donate towards your community initiatives. Please share the contribution details.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Connect on WhatsApp</span>
              </a>
              <a
                href={`tel:${TRUST_INFO.phoneRaw}`}
                className="py-3 px-4 rounded-xl font-semibold text-white bg-blue-700 hover:bg-blue-800 text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call {TRUST_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* PROGRAM DETAILS MODAL */}
      {selectedProgramModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative">
            <button
              onClick={() => setSelectedProgramModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border mb-3 ${selectedProgramModal.lightBg}`}>
              {selectedProgramModal.impactMetric}
            </span>

            <h3 className="text-2xl font-extrabold text-slate-900">
              {selectedProgramModal.title}
            </h3>

            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              {selectedProgramModal.shortDesc}
            </p>

            <div className="mt-5 bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Key Activities in Varanasi
              </div>
              {selectedProgramModal.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <Check className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedProgramModal(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => handleVolunteerForInitiative(selectedProgramModal.title)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-700 to-teal-600 hover:from-blue-800 hover:to-teal-700 shadow-md"
              >
                Volunteer for this Program
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}