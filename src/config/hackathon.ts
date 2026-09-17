export interface HackathonTrack {
  id: string;
  name: string;
  badge: string;
  description: string;
  icon: string;
}

export interface RuleItem {
  number: number;
  title: string;
  content: string[];
  isImportant?: boolean;
}

export interface PrizeItem {
  position: string;
  title: string;
  amount: string;
  perks: string[];
  icon: string;
  highlight?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: "general" | "registration" | "edobase" | "rules";
}

export interface ScheduleMilestone {
  time: string;
  date: string;
  title: string;
  description: string;
  status: "upcoming" | "active" | "completed";
}

export const HACKATHON_CONFIG = {
  name: "Edothon",
  tagline: "Build the Future with Realtime Power",
  subtagline:
    "A premier 24-hour continuous online hackathon showcasing Edobase — the next-generation realtime backend platform. 24 hours of non-stop hacking, zero vendor lock-in, and ₹1,00,000+ in prizes.",
  
  dates: {
    startDate: process.env.NEXT_PUBLIC_HACKATHON_START_DATE || "2026-10-17T09:00:00+05:30",
    endDate: process.env.NEXT_PUBLIC_HACKATHON_END_DATE || "2026-10-18T09:00:00+05:30",
    registrationDeadline: "2026-10-15T23:59:59+05:30",
    durationHours: 24,
    formattedDuration: "24 Continuous Hours",
    formattedDates: "October 17, 9:00 AM IST → October 18, 9:00 AM IST",
  },

  registration: {
    feeINR: Number(process.env.NEXT_PUBLIC_REGISTRATION_FEE) || 200,
    minTeamSize: 2,
    maxTeamSize: 4,
    isRefundable: false,
    feeNote: "₹200 per team (non-refundable after successful registration)",
  },

  // Problem statement single configuration field
  // Set to null or string to reveal
  problemStatement: null as {
    title: string;
    releasedAt: string;
    description: string;
    tracks: { name: string; challenge: string }[];
  } | null,

  tracks: [
    {
      id: "realtime-apps",
      name: "Realtime Collaborative Apps",
      badge: "High Concurrency",
      description: "Collaborative whiteboards, live streaming engagement tools, multi-user documents, and instant gaming experiences powered by Edobase realtime websockets.",
      icon: "Zap",
    },
    {
      id: "ai-systems",
      name: "AI Agents & Autonomous Workflows",
      badge: "Intelligent Systems",
      description: "Build reactive multi-agent workflows, realtime retrieval-augmented backends, and autonomous assistants connected to Edobase event streams.",
      icon: "Cpu",
    },
    {
      id: "fintech-security",
      name: "FinTech & Enterprise Solutions",
      badge: "Zero Trust",
      description: "High-reliability transaction trackers, fraud monitoring dashboards, and encrypted ledger feeds with sub-10ms state propagation.",
      icon: "ShieldCheck",
    },
    {
      id: "open-innovation",
      name: "Open Innovation & DevTools",
      badge: "Community Choice",
      description: "Unleash wild ideas — developer productivity tools, smart IoT dashboards, healthcare alerts, or next-gen social platforms using Edobase.",
      icon: "Sparkles",
    },
  ] as HackathonTrack[],

  rules: [
    {
      number: 1,
      title: "Registration",
      content: [
        "Registration fee is ₹200 per team.",
        "The fee is non-refundable after successful registration.",
        "Each team must have 2–4 members.",
      ],
    },
    {
      number: 2,
      title: "Hackathon Duration",
      content: [
        "The hackathon will be conducted for 24 continuous hours.",
        "Teams must develop, complete, and submit their project within the given time.",
        "No prior development of the submitted project is allowed before the hackathon begins.",
      ],
    },
    {
      number: 3,
      title: "Tools & Technologies",
      content: [
        "Participants are free to use any programming language, framework, library, AI tool, API, platform, or development tool they are comfortable with.",
        "There are no restrictions on the technology stack.",
      ],
    },
    {
      number: 4,
      title: "Mandatory Hackathon Products",
      content: [
        "The products provided by the Hackathon organizers must be used meaningfully in the project.",
        "Teams may use other tools and technologies along with the provided products.",
      ],
    },
    {
      number: 5,
      title: "🚨 Mandatory Database Rule",
      isImportant: true,
      content: [
        "Teams must use ONLY the official database provided by the Hackathon organizers.",
        "Use of any external database, cloud database, local database, or alternative data-storage service is strictly prohibited.",
        "Failure to use the official database will result in AUTOMATIC DISQUALIFICATION.",
      ],
    },
    {
      number: 6,
      title: "Source Code & Git Repository",
      content: [
        "The complete project source code must be maintained in a Git repository and submitted to the organizers.",
        "If specified by the organizers, the repository must be published under the MIT License.",
      ],
    },
    {
      number: 7,
      title: "Code & Product Development",
      content: [
        "Code developed during the hackathon may be considered for future development, integration, or improvement of Edobase or its products, subject to terms communicated by the organizers.",
        "Teams must ensure that their submitted code is available for evaluation.",
      ],
    },
    {
      number: 8,
      title: "Originality",
      content: [
        "All projects must be original and developed during the hackathon.",
        "Plagiarism, copying, cheating, or submission of substantially pre-developed projects is strictly prohibited.",
        "Any violation may result in immediate disqualification.",
      ],
    },
    {
      number: 9,
      title: "Submission & Demo",
      content: [
        "Teams must submit their project before the 24-hour deadline.",
        "Each team must provide the required source code, project details, and Git repository.",
        "Teams must present their project and demonstrate a working prototype/demo to the judges.",
      ],
    },
    {
      number: 10,
      title: "Judging Criteria",
      content: [
        "Innovation & Creativity",
        "Technical Implementation",
        "Functionality",
        "Problem Solving & Impact",
        "UI/UX Design",
        "Meaningful Use of Hackathon Products & Official Database",
        "Presentation & Live Prototype Demo",
      ],
    },
    {
      number: 11,
      title: "Code of Conduct",
      content: [
        "Participants must maintain professional and respectful behavior throughout the event.",
        "Cheating, misconduct, harassment, or disruption of the event may lead to disqualification.",
      ],
    },
    {
      number: 12,
      title: "Judges' Decision",
      content: [
        "The decision of the judging panel will be final and binding.",
        "The organizers reserve the right to disqualify teams for violations of the rules.",
      ],
    },
  ] as RuleItem[],

  prizes: [
    {
      position: "1st Place",
      title: "Grand Champion",
      amount: "₹50,000",
      perks: [
        "Direct fast-track interview with Edobase core team",
        "1 Year Edobase Pro Enterprise Tier credits",
        "Exclusive Edothon Gold Champion Trophy & Swag Box",
        "Featured spotlight on Edobase developer showcase",
      ],
      icon: "Trophy",
      highlight: true,
    },
    {
      position: "2nd Place",
      title: "First Runner Up",
      amount: "₹30,000",
      perks: [
        "Edobase Silver Winner Plaque & Swag Kit",
        "6 Months Edobase Pro Tier credits",
        "Mentorship sessions with top cloud architects",
        "Verified digital winner certificate",
      ],
      icon: "Medal",
      highlight: false,
    },
    {
      position: "3rd Place",
      title: "Second Runner Up",
      amount: "₹15,000",
      perks: [
        "Edobase Bronze Winner Trophy",
        "3 Months Edobase Pro Tier credits",
        "Exclusive hacker swag kit & stickers",
        "Verified digital certificate",
      ],
      icon: "Award",
      highlight: false,
    },
    {
      position: "Special Award",
      title: "Best Use of Edobase",
      amount: "₹10,000",
      perks: [
        "Awarded for deepest integration of Edobase realtime websockets",
        "Edobase Innovator Trophy",
        "Full swag kit for all team members",
        "Dedicated blog article on Edobase official blog",
      ],
      icon: "Flame",
      highlight: false,
    },
  ] as PrizeItem[],

  participantPerks: [
    "Official Edothon Certificate of Participation for all active members",
    "₹5,000 worth of Edobase Cloud credits for 6 months",
    "Access to 24/7 technical mentors & Discord war room",
    "Exclusive discount codes for future partner hackathons and workshops",
  ],

  schedule: [
    {
      date: "Oct 1, 2026",
      time: "10:00 AM IST",
      title: "Registrations Open",
      description: "Team registrations go live online with ₹200/team fee.",
      status: "completed",
    },
    {
      date: "Oct 15, 2026",
      time: "11:59 PM IST",
      title: "Registrations Close",
      description: "Final team confirmation and database credentials dispatched.",
      status: "upcoming",
    },
    {
      date: "Oct 17, 2026",
      time: "08:30 AM IST",
      title: "Opening Ceremony",
      description: "Live keynote, platform walkthrough, and system access check.",
      status: "upcoming",
    },
    {
      date: "Oct 17, 2026",
      time: "09:00 AM IST",
      title: "🚀 Hackathon Kickoff & Problem Statement Unveiled",
      description: "The 24-hour countdown starts! Official problem statements published.",
      status: "upcoming",
    },
    {
      date: "Oct 17, 2026",
      time: "09:00 PM IST",
      title: "Mid-way Mentorship Review",
      description: "12-hour mark check-in with mentors in Discord voice channels.",
      status: "upcoming",
    },
    {
      date: "Oct 18, 2026",
      time: "09:00 AM IST",
      title: "🛑 24-Hour Hacking Ends & Submission Deadline",
      description: "Code freeze. Github repos and demo links must be submitted.",
      status: "upcoming",
    },
    {
      date: "Oct 18, 2026",
      time: "11:00 AM IST",
      title: "Live Judging & Demos",
      description: "Top shortlisted teams present live prototypes to judge panel.",
      status: "upcoming",
    },
    {
      date: "Oct 18, 2026",
      time: "05:00 PM IST",
      title: "Grand Award Ceremony & Results",
      description: "Winners announced, cash prizes and perks distributed live.",
      status: "upcoming",
    },
  ] as ScheduleMilestone[],

  faqs: [
    {
      category: "general",
      question: "Who is eligible to participate in Edothon?",
      answer: "Edothon is open to all developers, engineering students, self-taught coders, and tech enthusiasts globally. Anyone with a passion for building software can assemble a team and participate.",
    },
    {
      category: "registration",
      question: "What is the team size and registration fee?",
      answer: "Teams must consist of 2 to 4 members. The registration fee is ₹200 per team (not per member). Once paid, the fee is non-refundable as per official hackathon guidelines.",
    },
    {
      category: "edobase",
      question: "What is Edobase and why is it mandatory to use?",
      answer: "Edobase is an ultra-fast, modern realtime backend platform engineered as an open, developer-friendly alternative to Firebase. Edothon is designed to celebrate and stress-test Edobase's capabilities. Teams must use the official Edobase database instance provided by the organizers for storing their project data.",
    },
    {
      category: "rules",
      question: "Can we use React, Next.js, Flutter, or Python?",
      answer: "Yes! You can use any frontend library, mobile framework, AI model, or language (React, Vue, Next.js, Flutter, Svelte, Python, Rust, Go, etc.). The only strict requirement is that your application data layer connects to the official Edobase database.",
    },
    {
      category: "registration",
      question: "How does the payment and verification work?",
      answer: "After filling out the team registration form, you will be redirected to our Payee payment gateway to pay ₹200. Upon verified payment through server webhook, your team is assigned an official Registration ID (e.g., EDO-XXXX) and an instant confirmation email is sent.",
    },
    {
      category: "rules",
      question: "What happens if a team uses an external database like MongoDB or Supabase?",
      answer: "As clearly outlined in Rule #5 (Mandatory Database Rule), using any external database, cloud database, or alternative data-storage service will result in AUTOMATIC DISQUALIFICATION. Only the official Edobase instance provided by the organizers is permitted.",
    },
  ] as FAQItem[],

  contact: {
    supportEmail: "support@edothon.dev",
    organizerEmail: "organizers@edobase.io",
    discordUrl: "https://discord.gg/edothon",
    whatsappUrl: "https://chat.whatsapp.com/edothon-2026",
    githubUrl: "https://github.com/edobase",
    twitterUrl: "https://twitter.com/edobase_io",
  },
};
