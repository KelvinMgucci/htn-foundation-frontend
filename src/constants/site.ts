import {
  Activity,
  BookOpen,
  Droplets,
  HeartPulse,
  Microscope,
  ShieldPlus,
  Stethoscope,
  Users,
} from "lucide-react";

import cliniciansImage from "@/assets/clinicians.jpg";
import healthEducationImage from "@/assets/health-education.jpg";
import heroCommunityHealthImage from "@/assets/hero-community-health.jpg";
import medicalCampImage from "@/assets/medical-camp.jpg";

export const ORG = {
  name: "HTN Foundation",
  legalName: "Health to the Needs Foundation",
  tagline: "Healthy, Empowered, Resilient Communities",
  address: {
    street: "Bagara Road, Plot 14",
    city: "Babati",
    region: "Manyara",
    country: "Tanzania",
  },
  phone: "+255 27 000 0000",
  email: "info@htnfoundation.org",
  hours: "Monday – Friday, 08:00 – 17:00 EAT",
} as const;

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Programs", to: "/programs" },
  { label: "Partnerships", to: "/partnerships" },
  { label: "Contact", to: "/contact" },
] as const;

export const IMPACT_STATS = [
  {
    value: 48600,
    suffix: "+",
    label: "People reached",
    note: "Across community outreach and clinic referrals",
  },
  {
    value: 134,
    suffix: "",
    label: "Medical camps",
    note: "Delivered with district health authorities",
  },
  {
    value: 27,
    suffix: "",
    label: "Partner institutions",
    note: "Hospitals, universities and civil society",
  },
  {
    value: 9,
    suffix: "",
    label: "Regions served",
    note: "Manyara and neighbouring regions",
  },
] as const;

export const IMPACT_FOOTNOTE =
  "*Impact statistics are based on internal programme data and district health records, verified by independent audits where applicable.";

export const PROGRAMS = [
  {
    number: "01",
    slug: "community-outreach",
    title: "Community Outreach",
    description:
      "Village-level screening, referral and follow-up delivered with trained community health workers in hard-to-reach wards.",
    overview:
      "Community outreach is the front door to every other programme we run. Teams of trained community health workers walk ward by ward, screening households, flagging danger signs early and linking people to the nearest facility that can help — with a follow-up visit to confirm the referral was completed.",
    icon: Users,
    image: heroCommunityHealthImage,
    stat: { value: 48600, suffix: "+", label: "People reached" },
    activities: [
      "Door-to-door household screening led by trained community health workers.",
      "Triage and referral to the nearest capable facility, with transport coordination where needed.",
      "Follow-up visits to confirm referrals were completed and care continued.",
      "Monthly ward-level data review with local health committees.",
    ],
    outcomes: [
      "Health issues caught earlier, before they need emergency care.",
      "Fewer households dropping out between referral and treatment.",
      "A trusted, local point of contact for health questions between clinic visits.",
    ],
  },
  {
    number: "02",
    slug: "health-education",
    title: "Health Education",
    description:
      "Practical, locally adapted health literacy sessions covering nutrition, maternal health, hygiene and early care-seeking.",
    overview:
      "Health education sessions are designed with — not just for — the communities that attend them. Content is adapted to local language, diet and custom, and delivered in schools, markets and village halls so that practical knowledge reaches people where they already gather.",
    icon: BookOpen,
    image: healthEducationImage,
    stat: { value: 134, suffix: "", label: "Sessions delivered" },
    activities: [
      "Facilitated sessions on nutrition, maternal health and hygiene in village halls and schools.",
      "Locally adapted materials, translated and reviewed with ward health committees.",
      "Peer educator training so knowledge keeps spreading between visits.",
      "Pre- and post-session knowledge checks to measure what actually lands.",
    ],
    outcomes: [
      "Earlier recognition of warning signs during pregnancy and childhood illness.",
      "Improved household hygiene and nutrition practices.",
      "A growing network of peer educators sustaining outreach between visits.",
    ],
  },
  {
    number: "03",
    slug: "medical-camps",
    title: "Medical Camps",
    description:
      "Multi-day clinical camps offering consultations, diagnostics and medicines in partnership with district hospitals.",
    overview:
      "Medical camps bring a full clinical team — physicians, nurses and diagnostics — to communities that would otherwise face a full day's travel for basic care. Each camp is planned jointly with district hospitals so cases that need follow-up are handed off cleanly rather than left at the tent.",
    icon: HeartPulse,
    image: medicalCampImage,
    stat: { value: 27, suffix: "", label: "Partner institutions" },
    activities: [
      "Multi-day clinical camps offering consultations, basic diagnostics and medicines.",
      "Joint planning with district hospitals on caseload, staffing and referral capacity.",
      "On-site record-keeping so every consultation feeds the national reporting format.",
      "Scheduled follow-up camps in the same wards to track chronic cases.",
    ],
    outcomes: [
      "Reduced travel burden for households seeking basic clinical care.",
      "Cleaner handoff of complex cases into the district hospital system.",
      "A documented caseload district health authorities can plan around.",
    ],
  },
  {
    number: "04",
    slug: "emergency-care-support",
    title: "Emergency Care Support",
    description:
      "Referral transport coordination, first-response training and essential supplies for facilities under acute pressure.",
    overview:
      "When a facility is under acute pressure — a disease outbreak, a mass-casualty event, a supply shortfall — this programme supplies the transport, training and materials needed to keep referral pathways open until normal capacity is restored.",
    icon: Activity,
    image: cliniciansImage,
    stat: { value: 9, suffix: "", label: "Regions served" },
    activities: [
      "Referral transport coordination between wards and district or regional hospitals.",
      "First-response training for community health workers and facility staff.",
      "Pre-positioned emergency supplies at facilities identified as high-risk.",
      "After-action reviews with district health management following each response.",
    ],
    outcomes: [
      "Shorter time between an emergency and the patient reaching definitive care.",
      "Facility staff better prepared to stabilise patients before transfer.",
      "Supply gaps identified and closed before the next acute event.",
    ],
  },
  {
    number: "05",
    slug: "ncd-prevention",
    title: "NCD Prevention",
    description:
      "Screening and long-term management support for hypertension, diabetes and other non-communicable conditions.",
    overview:
      "Non-communicable disease is a slower-moving crisis that rural health systems are often not resourced to manage over the long term. This programme pairs community screening with the medication access and follow-up support that hypertension and diabetes management actually require.",
    icon: Stethoscope,
    image: cliniciansImage,
    stat: { value: 48600, suffix: "+", label: "People screened" },
    activities: [
      "Community-based screening for hypertension, diabetes and related risk factors.",
      "Registration of confirmed cases into a local follow-up register.",
      "Coordinated medication supply so patients aren't forced to travel for refills.",
      "Lifestyle counselling delivered alongside clinical follow-up.",
    ],
    outcomes: [
      "More people diagnosed before a preventable complication occurs.",
      "Fewer treatment interruptions caused by travel or medication stock-outs.",
      "A standing register district health teams can use for long-term planning.",
    ],
  },
  {
    number: "06",
    slug: "infectious-disease-control",
    title: "Infectious Disease Control",
    description:
      "Community case detection, treatment adherence support and prevention campaigns aligned to national guidelines.",
    overview:
      "Infectious disease control depends on speed: finding cases early, keeping patients on treatment and stopping onward transmission. This programme runs case detection and adherence support in the community, aligned throughout to national treatment guidelines.",
    icon: ShieldPlus,
    image: medicalCampImage,
    stat: { value: 134, suffix: "", label: "Camps and campaigns" },
    activities: [
      "Community-based case detection for priority infectious diseases.",
      "Treatment adherence support through home visits and reminder systems.",
      "Prevention campaigns run alongside district and national health programmes.",
      "Contact tracing and follow-up for confirmed cases where indicated.",
    ],
    outcomes: [
      "Cases identified and started on treatment sooner.",
      "Higher treatment completion rates through sustained adherence support.",
      "Reduced onward transmission within affected wards.",
    ],
  },
  {
    number: "07",
    slug: "wash",
    title: "WASH",
    description:
      "Water, sanitation and hygiene improvements in schools and health facilities, with community maintenance committees.",
    overview:
      "Clean water and functioning sanitation are preventive healthcare in their own right. This programme improves WASH infrastructure in schools and health facilities and, critically, sets up the community maintenance committees that keep it working after installation.",
    icon: Droplets,
    image: healthEducationImage,
    stat: { value: 9, suffix: "", label: "Regions served" },
    activities: [
      "Water and sanitation infrastructure improvements in schools and health facilities.",
      "Formation and training of community maintenance committees for every site.",
      "Hygiene promotion delivered alongside infrastructure handover.",
      "Routine facility audits to catch maintenance issues before they become failures.",
    ],
    outcomes: [
      "Fewer facility closures caused by broken water or sanitation systems.",
      "Lower rates of preventable infection linked to poor sanitation.",
      "Local ownership of infrastructure that outlasts the installation phase.",
    ],
  },
  {
    number: "08",
    slug: "research-training",
    title: "Research & Training",
    description:
      "Operational research, data systems and continuing professional development for frontline health personnel.",
    overview:
      "Every other programme depends on this one: reliable data and well-trained frontline staff. Research & Training runs the operational studies and continuing professional development that let us know what's working — and give district partners evidence they can act on.",
    icon: Microscope,
    image: cliniciansImage,
    stat: { value: 27, suffix: "", label: "Partner institutions" },
    activities: [
      "Operational research conducted jointly with academic partners.",
      "Data systems and monitoring tools supporting every other programme.",
      "Continuing professional development for community health workers and facility staff.",
      "Annual findings shared publicly with partners, funders and district authorities.",
    ],
    outcomes: [
      "Programme decisions grounded in local data rather than assumption.",
      "A frontline workforce with growing clinical and reporting capability.",
      "Published findings that strengthen the case for continued district investment.",
    ],
  },
] as const;

export const VALUES = [
  {
    title: "Compassion",
    description:
      "We meet every person with dignity, patience and respect for their circumstances.",
  },
  {
    title: "Integrity",
    description:
      "We hold ourselves to honest reporting, ethical practice and responsible stewardship.",
  },
  {
    title: "Excellence",
    description:
      "We apply clinical and programmatic standards that stand up to independent review.",
  },
  {
    title: "Equity",
    description:
      "We prioritise communities that national health systems reach last.",
  },
  {
    title: "Accountability",
    description:
      "We publish what we do, what it costs and what changed as a result.",
  },
  {
    title: "Innovation",
    description:
      "We test practical improvements and adopt what the evidence supports.",
  },
  {
    title: "Teamwork",
    description: "We work through partnership rather than parallel structures.",
  },
] as const;

export const OBJECTIVES = [
  "Expand equitable access to primary healthcare in underserved wards of Manyara Region.",
  "Strengthen prevention and early detection of communicable and non-communicable diseases.",
  "Build the capacity of community health workers and frontline facility staff.",
  "Improve water, sanitation and hygiene standards in schools and health facilities.",
  "Generate reliable programme data to inform local and national health planning.",
  "Sustain long-term partnerships with government, academic and civil society institutions.",
] as const;

export const TIMELINE = [
  {
    year: "2016",
    title: "Foundation established",
    description:
      "Registered in Babati with a volunteer clinical team and a single outreach ward.",
  },
  {
    year: "2018",
    title: "First district partnership",
    description:
      "Formal collaboration with district health authorities to co-deliver medical camps.",
  },
  {
    year: "2020",
    title: "Emergency response capability",
    description:
      "Rapid-response supply and referral support during regional health pressures.",
  },
  {
    year: "2022",
    title: "Research and data unit",
    description:
      "Introduced structured monitoring, evaluation and operational research practice.",
  },
  {
    year: "2024",
    title: "Regional expansion",
    description:
      "Programmes extended to neighbouring regions with university and NGO partners.",
  },
] as const;

export const LEADERSHIP = [
  {
    name: "Dr. A. Mwakalinga",
    role: "Executive Director",
    bio: "Public health physician with two decades of district health system experience.",
  },
  {
    name: "N. Kileo",
    role: "Director of Programmes",
    bio: "Leads outreach design, delivery quality and community engagement.",
  },
  {
    name: "Dr. S. Massawe",
    role: "Clinical Lead",
    bio: "Oversees clinical standards, camp protocols and referral pathways.",
  },
  {
    name: "J. Bura",
    role: "Finance & Compliance",
    bio: "Responsible for financial controls, grant reporting and audit readiness.",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Their teams arrive prepared, work through our district structures and leave behind records we can actually use for planning.",
    name: "District Medical Officer",
    org: "Manyara Region",
  },
  {
    quote:
      "The screening programme identified my hypertension early. I now collect my medication locally instead of travelling for a day.",
    name: "Community member",
    org: "Babati District",
  },
  {
    quote:
      "A rigorous, transparent partner. Reporting is timely and the operational research is genuinely useful to our faculty.",
    name: "Faculty of Public Health",
    org: "Partner university",
  },
] as const;

export const PARTNER_CATEGORIES = [
  {
    title: "Government",
    description:
      "District and regional health authorities, national programmes and local government.",
  },
  {
    title: "Hospitals",
    description:
      "Referral and district hospitals supporting clinical delivery and specialist care.",
  },
  {
    title: "Universities",
    description:
      "Academic partners for research, evaluation and student field placements.",
  },
  {
    title: "NGOs",
    description:
      "Implementing organisations coordinating complementary community services.",
  },
  {
    title: "Corporate Partners",
    description:
      "Companies contributing funding, logistics, equipment and employee expertise.",
  },
  {
    title: "Donors",
    description:
      "Foundations, bilateral funders and philanthropists financing multi-year programmes.",
  },
  {
    title: "Community Organizations",
    description:
      "Ward committees, faith groups and cooperatives rooted in the communities we serve.",
  },
] as const;

export const PARTNER_LOGOS = [
  "Manyara Regional Health",
  "Babati District Council",
  "Nkoaranga Referral",
  "Muhimbili Faculty",
  "Tanzania Health Trust",
  "Savanna Diagnostics",
] as const;
