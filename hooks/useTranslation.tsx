"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "fr" | "en" | "ar"

interface TranslationContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isRTL: boolean
}

const translations = {
  fr: {
    // Navigation
    home: "Accueil",
    pricing: "Tarifs",
    testimonials: "Avis clients",
    contact: "Contact",
    download: "Télécharger",

    // Hero Section
    heroTitle: "Espada — Des applications puissantes, au service de vos besoins",
    heroSlogan: "Optimisez, Automatisez, Dominez.",
    heroDescription:
      "Découvrez notre arsenal d'applications desktop conçues pour vous donner l'avantage décisif dans votre domaine.",
    downloadNow: "Télécharger maintenant",

    // Applications Section
    ourApps: "Nos Applications",
    appsDescription: "Un arsenal complet d'outils professionnels pour dominer votre marché.",
    learnMore: "En savoir plus",

    // Applications
    pingOptimizer: "Optimiseur de Ping",
    pingOptimizerDesc: "Réduisez votre latence et dominez vos parties en ligne avec notre optimiseur révolutionnaire.",
    pharmacyManager: "Gestionnaire de Pharmacie",
    pharmacyManagerDesc: "Solution complète pour automatiser votre pharmacie et maximiser vos profits.",
    iptvPanel: "Panel IPTV Pro",
    iptvPanelDesc: "Interface de gestion ultime pour vos services IPTV avec contrôle total.",
    invoicing: "Facturation Express",
    invoicingDesc: "Créez et gérez vos factures à la vitesse de l'éclair avec style professionnel.",

    // Features
    latencyReduction: "Réduction latence -50%",
    realTimeMonitoring: "Monitoring temps réel",
    autoOptimization: "Optimisation automatique",
    smartInventory: "Gestion stock intelligente",
    automatedBilling: "Facturation automatisée",
    advancedReports: "Rapports avancés",
    professionalDashboard: "Dashboard professionnel",
    multiUserManagement: "Gestion multi-utilisateurs",
    realTimeAnalytics: "Analytics en temps réel",
    premiumTemplates: "Templates premium",
    autoExport: "Export automatique",
    smartPaymentTracking: "Suivi paiements intelligent",

    // Pricing Section
    pricingTitle: "Tarifs",
    pricingDescription: "Choisissez votre niveau de domination. Chaque formule vous donne l'avantage.",
    mostPopular: "LE PLUS POPULAIRE",
    free: "Gratuit",
    pro: "Pro",
    enterprise: "Entreprise",
    month: "/mois",
    startFree: "Commencer gratuitement",
    chooseOffer: "Choisir cette offre",

    // Features
    oneAppIncluded: "1 application incluse",
    communitySupport: "Support communautaire",
    basicUpdates: "Mises à jour de base",
    fullDocumentation: "Documentation complète",
    allApps: "Toutes les applications",
    prioritySupport: "Support prioritaire 24/7",
    autoUpdates: "Mises à jour automatiques",
    advancedCustomization: "Personnalisation avancée",
    apiIntegrations: "Intégrations API",
    detailedReports: "Rapports détaillés",
    multiUserLicense: "Licence multi-utilisateurs",
    dedicatedSupport: "Support dédié premium",
    onSiteDeployment: "Déploiement sur site",
    customTraining: "Formation personnalisée",
    guaranteedSLA: "SLA garanti 99.9%",
    customDevelopment: "Développement sur mesure",

    // Testimonials Section
    clientReviews: "Avis Clients",
    testimonialsDescription: "Découvrez pourquoi nos clients dominent leur marché avec Espada.",

    // Testimonials
    testimonial1Name: "Alexandre Moreau",
    testimonial1Role: "CEO",
    testimonial1Company: "TechFlow",
    testimonial1Content:
      "Espada a révolutionné notre workflow. Leurs applications sont puissantes, intuitives et nous font gagner des heures chaque jour.",

    testimonial2Name: "Sarah Dubois",
    testimonial2Role: "Pharmacienne",
    testimonial2Company: "Pharmacie Centrale",
    testimonial2Content:
      "Le gestionnaire de pharmacie d'Espada est un game-changer. Notre productivité a augmenté de 300% depuis son installation.",

    testimonial3Name: "Marc Laurent",
    testimonial3Role: "Directeur Technique",
    testimonial3Company: "StreamPro",
    testimonial3Content:
      "Panel IPTV Pro nous donne un contrôle total sur nos services. Interface magnifique et performances exceptionnelles.",

    // Contact Section
    contactTitle: "Contact",
    contactDescription: "Prêt à dominer votre marché ? Contactez-nous dès maintenant.",
    sendMessage: "Envoyez-nous un message",
    yourName: "Votre nom",
    yourEmail: "Votre email",
    yourMessage: "Votre message",
    sendMessageBtn: "Envoyer le message",
    contactInfo: "Informations de contact",
    followUs: "Suivez-nous",

    // Footer
    footerDescription: "Des applications desktop puissantes pour dominer votre marché.",
    navigation: "Navigation",
    applications: "Applications",
    support: "Support",
    documentation: "Documentation",
    faq: "FAQ",
    technicalSupport: "Support technique",
    copyright: "© 2025 Espada. Tous droits réservés.",
  },

  en: {
    // Navigation
    home: "Home",
    pricing: "Pricing",
    testimonials: "Testimonials",
    contact: "Contact",
    download: "Download",

    // Hero Section
    heroTitle: "Espada — Powerful applications at your service",
    heroSlogan: "Optimize, Automate, Dominate.",
    heroDescription:
      "Discover our arsenal of desktop applications designed to give you the decisive advantage in your field.",
    downloadNow: "Download now",

    // Applications Section
    ourApps: "Our Applications",
    appsDescription: "A complete arsenal of professional tools to dominate your market.",
    learnMore: "Learn more",

    // Applications
    pingOptimizer: "Ping Optimizer",
    pingOptimizerDesc: "Reduce your latency and dominate your online games with our revolutionary optimizer.",
    pharmacyManager: "Pharmacy Manager",
    pharmacyManagerDesc: "Complete solution to automate your pharmacy and maximize your profits.",
    iptvPanel: "IPTV Pro Panel",
    iptvPanelDesc: "Ultimate management interface for your IPTV services with total control.",
    invoicing: "Express Invoicing",
    invoicingDesc: "Create and manage your invoices at lightning speed with professional style.",

    // Features
    latencyReduction: "Latency reduction -50%",
    realTimeMonitoring: "Real-time monitoring",
    autoOptimization: "Automatic optimization",
    smartInventory: "Smart inventory management",
    automatedBilling: "Automated billing",
    advancedReports: "Advanced reports",
    professionalDashboard: "Professional dashboard",
    multiUserManagement: "Multi-user management",
    realTimeAnalytics: "Real-time analytics",
    premiumTemplates: "Premium templates",
    autoExport: "Automatic export",
    smartPaymentTracking: "Smart payment tracking",

    // Pricing Section
    pricingTitle: "Pricing",
    pricingDescription: "Choose your level of domination. Each plan gives you the advantage.",
    mostPopular: "MOST POPULAR",
    free: "Free",
    pro: "Pro",
    enterprise: "Enterprise",
    month: "/month",
    startFree: "Start free",
    chooseOffer: "Choose this offer",

    // Features
    oneAppIncluded: "1 application included",
    communitySupport: "Community support",
    basicUpdates: "Basic updates",
    fullDocumentation: "Full documentation",
    allApps: "All applications",
    prioritySupport: "Priority support 24/7",
    autoUpdates: "Automatic updates",
    advancedCustomization: "Advanced customization",
    apiIntegrations: "API integrations",
    detailedReports: "Detailed reports",
    multiUserLicense: "Multi-user license",
    dedicatedSupport: "Premium dedicated support",
    onSiteDeployment: "On-site deployment",
    customTraining: "Custom training",
    guaranteedSLA: "Guaranteed SLA 99.9%",
    customDevelopment: "Custom development",

    // Testimonials Section
    clientReviews: "Client Reviews",
    testimonialsDescription: "Discover why our clients dominate their market with Espada.",

    // Testimonials
    testimonial1Name: "Alexander Morgan",
    testimonial1Role: "CEO",
    testimonial1Company: "TechFlow",
    testimonial1Content:
      "Espada revolutionized our workflow. Their applications are powerful, intuitive and save us hours every day.",

    testimonial2Name: "Sarah Davis",
    testimonial2Role: "Pharmacist",
    testimonial2Company: "Central Pharmacy",
    testimonial2Content:
      "Espada's pharmacy manager is a game-changer. Our productivity has increased by 300% since installation.",

    testimonial3Name: "Mark Lawrence",
    testimonial3Role: "Technical Director",
    testimonial3Company: "StreamPro",
    testimonial3Content:
      "IPTV Pro Panel gives us total control over our services. Beautiful interface and exceptional performance.",

    // Contact Section
    contactTitle: "Contact",
    contactDescription: "Ready to dominate your market? Contact us now.",
    sendMessage: "Send us a message",
    yourName: "Your name",
    yourEmail: "Your email",
    yourMessage: "Your message",
    sendMessageBtn: "Send message",
    contactInfo: "Contact information",
    followUs: "Follow us",

    // Footer
    footerDescription: "Powerful desktop applications to dominate your market.",
    navigation: "Navigation",
    applications: "Applications",
    support: "Support",
    documentation: "Documentation",
    faq: "FAQ",
    technicalSupport: "Technical support",
    copyright: "© 2025 Espada. All rights reserved.",
  },

  ar: {
    // Navigation
    home: "الرئيسية",
    pricing: "الأسعار",
    testimonials: "آراء العملاء",
    contact: "اتصل بنا",
    download: "تحميل",

    // Hero Section
    heroTitle: "إسبادا — تطبيقات قوية في خدمتك",
    heroSlogan: "حسّن، أتمت، هيمن.",
    heroDescription: "اكتشف ترسانة تطبيقات سطح المكتب المصممة لمنحك الميزة الحاسمة في مجالك.",
    downloadNow: "حمل الآن",

    // Applications Section
    ourApps: "تطبيقاتنا",
    appsDescription: "ترسانة كاملة من الأدوات المهنية للهيمنة على السوق.",
    learnMore: "اعرف المزيد",

    // Applications
    pingOptimizer: "محسن البينغ",
    pingOptimizerDesc: "قلل من زمن الاستجابة وهيمن على ألعابك الإلكترونية مع محسننا الثوري.",
    pharmacyManager: "مدير الصيدلية",
    pharmacyManagerDesc: "حل شامل لأتمتة صيدليتك وزيادة أرباحك إلى الحد الأقصى.",
    iptvPanel: "لوحة IPTV برو",
    iptvPanelDesc: "واجهة إدارة متقدمة لخدمات IPTV مع تحكم كامل.",
    invoicing: "الفوترة السريعة",
    invoicingDesc: "أنشئ وأدر فواتيرك بسرعة البرق مع أسلوب مهني.",

    // Features
    latencyReduction: "تقليل زمن الاستجابة -50%",
    realTimeMonitoring: "مراقبة في الوقت الفعلي",
    autoOptimization: "تحسين تلقائي",
    smartInventory: "إدارة مخزون ذكية",
    automatedBilling: "فوترة آلية",
    advancedReports: "تقارير متقدمة",
    professionalDashboard: "لوحة تحكم مهنية",
    multiUserManagement: "إدارة متعددة المستخدمين",
    realTimeAnalytics: "تحليلات في الوقت الفعلي",
    premiumTemplates: "قوالب مميزة",
    autoExport: "تصدير تلقائي",
    smartPaymentTracking: "تتبع ذكي للمدفوعات",

    // Pricing Section
    pricingTitle: "الأسعار",
    pricingDescription: "اختر مستوى هيمنتك. كل خطة تمنحك الميزة.",
    mostPopular: "الأكثر شعبية",
    free: "مجاني",
    pro: "محترف",
    enterprise: "مؤسسي",
    month: "/شهر",
    startFree: "ابدأ مجاناً",
    chooseOffer: "اختر هذا العرض",

    // Features
    oneAppIncluded: "تطبيق واحد مشمول",
    communitySupport: "دعم المجتمع",
    basicUpdates: "تحديثات أساسية",
    fullDocumentation: "وثائق كاملة",
    allApps: "جميع التطبيقات",
    prioritySupport: "دعم أولوية 24/7",
    autoUpdates: "تحديثات تلقائية",
    advancedCustomization: "تخصيص متقدم",
    apiIntegrations: "تكاملات API",
    detailedReports: "تقارير مفصلة",
    multiUserLicense: "ترخيص متعدد المستخدمين",
    dedicatedSupport: "دعم مخصص مميز",
    onSiteDeployment: "نشر في الموقع",
    customTraining: "تدريب مخصص",
    guaranteedSLA: "SLA مضمون 99.9%",
    customDevelopment: "تطوير مخصص",

    // Testimonials Section
    clientReviews: "آراء العملاء",
    testimonialsDescription: "اكتشف لماذا يهيمن عملاؤنا على السوق مع إسبادا.",

    // Testimonials
    testimonial1Name: "أحمد محمد",
    testimonial1Role: "الرئيس التنفيذي",
    testimonial1Company: "تك فلو",
    testimonial1Content: "إسبادا ثورت سير عملنا. تطبيقاتهم قوية وبديهية وتوفر لنا ساعات كل يوم.",

    testimonial2Name: "فاطمة أحمد",
    testimonial2Role: "صيدلانية",
    testimonial2Company: "الصيدلية المركزية",
    testimonial2Content: "مدير الصيدلية من إسبادا غيّر قواعد اللعبة. زادت إنتاجيتنا بنسبة 300% منذ التثبيت.",

    testimonial3Name: "محمد علي",
    testimonial3Role: "المدير التقني",
    testimonial3Company: "ستريم برو",
    testimonial3Content: "لوحة IPTV برو تمنحنا تحكماً كاملاً في خدماتنا. واجهة جميلة وأداء استثنائي.",

    // Contact Section
    contactTitle: "اتصل بنا",
    contactDescription: "مستعد للهيمنة على السوق؟ اتصل بنا الآن.",
    sendMessage: "أرسل لنا رسالة",
    yourName: "اسمك",
    yourEmail: "بريدك الإلكتروني",
    yourMessage: "رسالتك",
    sendMessageBtn: "إرسال الرسالة",
    contactInfo: "معلومات الاتصال",
    followUs: "تابعنا",

    // Footer
    footerDescription: "تطبيقات سطح مكتب قوية للهيمنة على السوق.",
    navigation: "التنقل",
    applications: "التطبيقات",
    support: "الدعم",
    documentation: "الوثائق",
    faq: "الأسئلة الشائعة",
    technicalSupport: "الدعم التقني",
    copyright: "© 2025 إسبادا. جميع الحقوق محفوظة.",
  },
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr")

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  const isRTL = language === "ar"

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t, isRTL }}>
      <div dir={isRTL ? "rtl" : "ltr"} className={isRTL ? "font-arabic" : ""}>
        {children}
      </div>
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}
