export const WA_NUMBER = '919790425908'
export const PHONE = '+91 75500 69612'
export const EMAIL = 'meenu@pragmaticnutritionist.com'
export const ADDRESS = 'Five Furlong Road, Guindy, Chennai- 600032'
export const HPR_ID = '99-1467-6526-4626'
export const MAJOR_LOCATIONS = 'Chennai, Bengaluru, Hyderabad, Mumbai, Delhi NCR, Pune, Coimbatore, Kochi, Trivandrum, Madurai, Trichy, Salem, UK, Canada, Australia, New Zealand and Ireland'

export const wa = (t = 'Hi Meenu, I would like to consult with you.') =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t)}`

const c = (label, to, blurb) => ({ label, to, blurb })

// Single source of truth: drives the menu, footer, routes and placeholder pages.
export const MENU = [
  { label: 'Home', to: '/' },
  {
    label: 'Gut Health',
    to: '/gut-health',
    blurb: 'Personal plans for everyday digestive problems.',
    children: [
      c('IBS & Bloating', '/gut-health/ibs-bloating', 'Calm IBS and bloating with food-first plans.'),
      c('Acidity & GERD', '/gut-health/acidity-gerd', 'Reduce acidity and reflux without giving up food you love.'),
      c('Constipation & Digestion', '/gut-health/constipation-digestion', 'Get digestion regular and comfortable.'),
      c('SIBO & Gluten Intolerance', '/gut-health/sibo-gluten-intolerance', 'Diagnosis-aware plans for SIBO and gluten issues.')
    ]
  },
  {
    label: 'Sports Nutrition',
    to: '/sports-nutrition',
    blurb: 'Fuel, performance and recovery for athletes.',
    children: [
      c('Youth & Teen Athletes', '/sports-nutrition/youth-teen-athletes', 'Growth-safe nutrition for young athletes.'),
      c('Competitive Athletes', '/sports-nutrition/competitive-athletes', 'Training, match-day and recovery nutrition.')
    ]
  },
  {
    label: 'More Care',
    to: '/more-care',
    blurb: 'Nutrition support for specific health needs.',
    children: [
      c('Child & Teen Nutrition (with ADHD)', '/more-care/child-teen-nutrition', 'Nutrition for growing kids, including ADHD.'),
      c('Diabetes', '/more-care/diabetes', 'Steady blood sugar with practical Indian meals.'),
      c('PCOS', '/more-care/pcos', 'Hormone-friendly eating for PCOS.'),
      c('Weight Loss', '/more-care/weight-loss', 'Sustainable weight loss without crash diets.')
    ]
  },
  { label: 'Programs & Pricing', to: '/programs-pricing', blurb: 'Nutrition plans and the Signature Program.' },
  { label: 'Results', to: '/results', kind: 'results', blurb: 'Real client progress. Results vary from person to person.' },
  { label: 'About', to: '/about', blurb: 'Meet Meenu Balaji, M.H.Sc (Food Science & Nutrition).' },
  { label: 'Blog', to: '/blog', blurb: 'Articles on gut health, sports nutrition and clinical dietetics.' }
]

export const EXTRA = [
  c('FAQ', '/faq', 'Answers to common questions.'),
  c('Free Gut Health Checker', '/gut-health-checker', 'Answer five questions and get your gut score.'),
  c('Book a Call', '/book-a-call', 'Book your free discovery call.'),
  c('Contact Us', '/contact', 'Get in touch with Pragmatic Nutrition.'),
  c('Terms & Conditions', '/terms', 'Terms and conditions for Pragmatic Nutrition.'),
  c('Privacy Policy', '/privacy', 'Privacy policy and data protection.'),
  c('Refund Policy', '/refund', 'Refund and cancellation policy.'),
  c('Nutrition Plans', '/nutrition-plans', 'Personalized nutrition plans and consultation tiers.'),
  {
    label: 'Academy',
    to: '/academy',
    blurb: 'Training and certificate courses for nutritionists.',
    children: [
      c('Courses & Masterclasses', '/academy/courses-masterclasses', 'Learn clinical dietetics from a practising nutritionist.'),
      c('Build Your Private Practice', '/academy/build-your-private-practice', 'Start, scale and manage your private nutrition practice.'),
      c('Certificate Courses', '/academy/certificate-courses', 'Online certificate courses for nutrition professionals.')
    ]
  }
]
EXTRA[0].kind = 'faq'
EXTRA[1].kind = 'checker'

// Flat list of every routable page (with its parent for breadcrumbs).
export const PAGES = [...MENU, ...EXTRA]
  .flatMap((m) => [m, ...(m.children || []).map((k) => ({ ...k, parent: m }))])
  .filter((p) => p.to !== '/')

export const HERO = {
  gut: {
    badge: 'GUT HEALTH & CLINICAL NUTRITION',
    h: 'Meenu Balaji-Best Online Nutritionist in India for Gut Health and Sports Nutrition',
    sub: 'From Gut recovery to peak performance: personalised plans built on real clinical expertise',
    p: 'No generic charts, no extreme diets. A nutrition plan built around Indian food, your symptoms, and your goals.',
    img: 'Photo: Clinical Gut Health Consultation',
    cta: 'Talk to A Nutritionist',
    waCta: 'Whatsapp Meenu',
    to: '/gut-health-checker'
  },
  sports: {
    badge: 'ELITE & YOUTH SPORTS NUTRITION',
    h: 'Leading Nutritionist in India for Gut Health & Sports Nutrition',
    sub: 'From Gut recovery to peak performance: personalised plans built on real clinical expertise',
    p: 'Nutrition support for athletes competing at National & International events. Training nutrition, match-day fuelling, recovery, and growth-safe youth athlete protocols.',
    img: 'Photo: Elite Athlete Performance Fuelling',
    cta: 'Talk to A Nutritionist',
    waCta: 'Whatsapp Meenu',
    to: '/sports-nutrition'
  }
}

export const ATHLETES = [
  {
    name: 'SAI AMEYA',
    sport: 'Jiu-Jitsu',
    tag: 'Gold & Silver Medalist',
    achievements: 'Gold medal, IBJJF, Kuala Lumpur International Open • Silver at AJP, Saudi Arabia',
    icon: '🥋'
  },
  {
    name: 'CHARITA PHANINDRANATH',
    sport: 'Swimming',
    tag: 'National Record Holder',
    achievements: 'U17 National record holder - 50m Freestyle (26.04s) • Asian Age Group Championship 2026 - 4th place, 50m freestyle',
    icon: '🏊'
  },
  {
    name: 'AAHANA SINGH',
    sport: 'Squash',
    tag: 'Junior Champion',
    achievements: 'GU17 Champion — Bengal Junior Open 2026',
    icon: '🎾'
  },
  {
    name: 'DHAIRYA SAMAHITA NAVEEN',
    sport: 'UIPM-Pentathlon',
    tag: 'International Silver Medalist',
    achievements: '2025 Silver Medal holder at the International Championship',
    icon: '🤺'
  }
]

export const CORE_AREAS = [
  {
    id: 'gut-health',
    title: 'Gut Health Nutrition',
    subtitle: 'Digestive Recovery & Clinical Care',
    desc: "Understand what's driving your symptoms and build a sustainable nutrition program. Digestive enzymes, acidity, GERD, IBS, bloating, constipation, SIBO & gluten intolerance.",
    linkText: 'EXPLORE GUT HEALTH',
    to: '/gut-health',
    icon: '🌱',
    badge: 'ROOT-CAUSE PROTOCOLS'
  },
  {
    id: 'sports-nutrition',
    title: 'Sports Nutrition',
    subtitle: 'Youth & Elite Athletic Performance',
    desc: 'Youth athletes, competitive athletes, training nutrition, recovery, match-day fuelling, and tournament preparation.',
    linkText: 'EXPLORE SPORTS NUTRITION',
    to: '/sports-nutrition',
    icon: '⚡',
    badge: 'PODIUM-PROVEN'
  }
]

export const QUIZ = [
  ['How often do you feel bloated?', ['Rarely', 'Once or twice a week', 'Most days']],
  ['How often do you get acidity or heartburn?', ['Rarely', 'A few times a month', 'Weekly or more']],
  ['How regular are your bowel movements?', ['Every day, comfortable', 'Sometimes irregular', 'Often constipated or loose']],
  ['Do certain foods trigger discomfort?', ['No', 'A few foods', 'Many foods, hard to predict']],
  ['How is your energy after meals?', ['Steady', 'Sometimes sluggish', 'Often tired or heavy']]
]

export const RESULTS = [
  {
    t: 'Sports Nutrition',
    name: 'Vijay Vallabh',
    role: 'Wellington Sports Medicine, New Zealand',
    rating: 5,
    big: 'Adolescent athletic performance frameworks',
    quote: 'Meenu is a highly competent nutritionist, who has the ability to convey complex information into education material that patients can understand and will endeavour to comply with. We were very impressed with her depth of knowledge in adolescent nutrition and its direct relation to athletic performance. We have applied her frameworks with great effect in our adolescent population.',
    p: 'Wellington Sports Medicine, New Zealand'
  },
  {
    t: 'Weight Loss',
    name: 'Ankit',
    role: 'Media Design Professional, Chennai',
    rating: 5,
    big: 'Lost 14 kg in 12 weeks',
    quote: 'I lost 14 kg in 12 weeks. As a working professional, I eat out every day. But Meenu gave me practical strategies that actually worked. I would recommend her to anyone wanting real, sustainable weight loss.',
    p: 'Media Design Professional, Chennai'
  },
  {
    t: 'Gut Health',
    name: 'Shobha Manoharan',
    role: 'Chennai',
    rating: 5,
    big: 'Acidity & severe gut issues resolved',
    quote: 'Consulted Meenu for severe acidity and gut issues. She gave a tailor-made 12-week plan around my preferences, the changes were minimal but the results were remarkable. Worth every rupee.',
    p: 'Tailor-made 12-week gut plan, Chennai'
  },
  {
    t: 'PCOS',
    name: 'Amirtha',
    role: 'Software Professional, Bengaluru',
    rating: 5,
    big: 'PCOS symptoms improved in 5–6 weeks',
    quote: 'My PCOS symptoms improved in just 5–6 weeks. No more migraines. My menstrual health is better, acne reduced, and the plan was completely flexible around my life. My food cravings reduced too.',
    p: 'Software Professional, Bengaluru'
  },
  {
    t: 'Diabetes',
    name: 'Prabhakaran',
    role: 'Trichy',
    rating: 5,
    big: 'HbA1c reduced from 7.1 to 6.8 in 4 weeks',
    quote: "HbA1C reduced from 7.1 to 6.8 in just 4 weeks. I joined the 3 months diabetes plan with Meenu. I'm very happy with the results. The diet was simple and easy.",
    p: '3 Months Diabetes Plan, Trichy'
  },
  {
    t: 'Sports Nutrition',
    name: 'Dr. Smriti',
    role: 'Homeopathy Doctor, Bangalore',
    rating: 5,
    big: 'National Gold & PB improved from 27.8s to 27.02s',
    quote: "Meenu has been a constant guide and a major contributor to Charitha's national gold. Her nutrition strategy helped improve Charitha's PB from 27.8s to 27.02s, outperforming Olympic-level swimmers.",
    p: 'National Gold Swimmer Nutrition Strategy'
  }
]

export const WHY_PRAGMATIC = [
  {
    title: 'Symptom-led, not template-led',
    desc: 'Your symptoms tell us where to start. Bloating, fatigue, irregular cycles, poor focus. We trace these back to root causes, not just manage them on the surface.',
    icon: '🔍'
  },
  {
    title: 'Behaviour coaching that actually holds',
    desc: 'We work on habits, triggers, routines, and real-life constraints that determine whether nutrition works long term, not just what looks good on paper.',
    icon: '🤝'
  },
  {
    title: 'Results that show up in daily life',
    desc: 'Most clients notice measurable improvement in digestion, energy, metabolic markers, or symptom stability within 8–12 weeks when plans are followed consistently.',
    icon: '📈'
  },
  {
    title: 'Global clinical perspective, Indian execution',
    desc: 'With clinical practice across India, the UK, and New Zealand, we apply international standards using practical Indian foods and real-world lifestyles.',
    icon: '🌍'
  }
]

export const DIAGNOSTICS = [
  {
    title: 'Blood & metabolic panels',
    desc: 'Thyroid, hormones, insulin resistance, vitamin deficiencies — reviewed and translated into your nutrition protocol.',
    icon: '🩸'
  },
  {
    title: 'Gut microbiome analysis',
    desc: 'A detailed map of your gut bacteria used to personalise your digestive and immune health plan.',
    icon: '🦠'
  },
  {
    title: 'DNA nutrition testing',
    desc: 'Understand how your genes influence metabolism, food sensitivities, and how your body absorbs key nutrients.',
    icon: '🧬'
  },
  {
    title: 'Functional nutrition tests',
    desc: "Advanced markers for inflammation, micronutrient status, and organ function — for when standard tests don't tell the full story.",
    icon: '🧪'
  }
]

export const DIAGNOSTIC_TAGS = [
  'Gut & IBS',
  'PCOS & hormones',
  'Thyroid & metabolism',
  'Type 2 diabetes',
  'Sports performance',
  'Child & ADHD nutrition',
  'Weight management'
]

export const STEPS = [
  [
    'Book a Free call',
    'Schedule a free 15 minute video call with us.'
  ],
  [
    'Health Assessment & Root Cause Analysis',
    'We understand your health goals, medical history and suggest the right nutrition program for you (12/24 weeks or Annual plan).'
  ],
  [
    'Sign up & get started',
    'Get a detailed, tailored plan covering exactly what to eat, when, and why, no generic charts. With periodic reviews and chat support.'
  ]
]

export const FAQ = [
  [
    'Do I need to give up my favourite foods?',
    'No generic charts, no extreme diets. Plans are built around Indian home food, and foods are removed only when they are a proven trigger for you.'
  ],
  [
    'Are consultations available online?',
    'Yes. Online consultations are available across India and internationally via video calls and continuous WhatsApp check-ins.'
  ],
  [
    'How soon will I see measurable results?',
    'Most clients notice measurable improvement in digestion, energy, metabolic markers, or symptom stability within 8–12 weeks when plans are followed consistently. Results vary from person to person.'
  ],
  [
    'Do you provide nutrition coaching for youth and teen athletes?',
    'Yes. We specialize in growth-safe nutrition for young athletes, competitive match-day fuelling, recovery, and peak performance.'
  ],
  [
    'Is diagnostic testing mandatory?',
    'Diagnostic testing (blood panels, gut microbiome analysis, SIBO breath tests) is optional and coordinated with certified diagnostic labs based on individual assessment.'
  ]
]

export const GOALS = ['Gut Health', 'Sports Nutrition', 'PCOS', 'Weight Loss', 'Diabetes', 'Child & Teen Nutrition']

export const MEDICAL_DISCLAIMER =
  'Medical Disclaimer: The information provided on this website is for educational purposes only and is not intended to diagnose, treat, cure, or prevent any disease. It is meant to assist you in making informed dietary and lifestyle changes. Always consult with a qualified healthcare professional, such as your doctor before making any significant changes to your diet or lifestyle, especially if you have any underlying health conditions or are taking medication.'

export const RESULTS_DISCLAIMER =
  'Results are based on client self-reported goal achievement and vary between individuals.'

export const FOOTER_NAV = [
  {
    title: 'QUICK LINKS',
    links: [
      { label: 'About Meenu', to: '/about' },
      { label: 'Nutrition Plans', to: '/nutrition-plans' },
      { label: 'Blog', to: '/blog' },
      { label: 'Courses & Masterclasses', to: '/academy/courses-masterclasses' },
      { label: 'Contact Us', to: '/contact' }
    ]
  },
  {
    title: 'CLINICAL SERVICES',
    links: [
      { label: 'Gut Health Nutrition', to: '/gut-health' },
      { label: 'Sports Nutrition', to: '/sports-nutrition' },
      { label: 'Child & Teen Nutrition', to: '/more-care/child-teen-nutrition' },
      { label: 'Diabetes & PCOS Plan', to: '/more-care/pcos' },
      { label: 'Weight Management', to: '/more-care/weight-loss' },
      { label: 'Free Gut Assessment', to: '/gut-health-checker' }
    ]
  }
]

export const LEGAL_LINKS = [
  { label: 'Terms & Conditions', to: '/terms' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Refund Policy', to: '/refund' }
]

export const SOCIAL_LINKS = [
  { label: 'YouTube', kind: 'youtube', url: 'https://www.youtube.com/@pragmaticnutritionist' },
  { label: 'WhatsApp', kind: 'whatsapp', url: 'https://wa.me/919790425908' },
  { label: 'Instagram', kind: 'instagram', url: 'https://www.instagram.com/pragmaticnutritionist/' },
  { label: 'Facebook', kind: 'facebook', url: 'https://www.facebook.com/pragmaticnutritionist/' },
  { label: 'LinkedIn', kind: 'linkedin', url: 'https://www.linkedin.com/in/meenu-balaji/' },
  { label: 'Pinterest', kind: 'pinterest', url: 'https://www.pinterest.com/pragmaticnutritionist/' }
]



