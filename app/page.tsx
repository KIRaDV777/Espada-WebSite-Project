"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { LanguageSelector } from "@/components/LanguageSelector"
import { useTranslation } from "@/hooks/useTranslation"
import {
  Download,
  Zap,
  Shield,
  Tv,
  FileText,
  Check,
  Star,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Youtube,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Settings,
} from "lucide-react"
import Link from "next/link"

export default function EspadaLanding() {
  const { t, isRTL } = useTranslation()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const applications = [
    {
      title: t("pingOptimizer"),
      description: t("pingOptimizerDesc"),
      icon: <Zap className="h-8 w-8" />,
      features: [t("latencyReduction"), t("realTimeMonitoring"), t("autoOptimization")],
    },
    {
      title: t("pharmacyManager"),
      description: t("pharmacyManagerDesc"),
      icon: <Shield className="h-8 w-8" />,
      features: [t("smartInventory"), t("automatedBilling"), t("advancedReports")],
    },
    {
      title: t("iptvPanel"),
      description: t("iptvPanelDesc"),
      icon: <Tv className="h-8 w-8" />,
      features: [t("professionalDashboard"), t("multiUserManagement"), t("realTimeAnalytics")],
    },
    {
      title: t("invoicing"),
      description: t("invoicingDesc"),
      icon: <FileText className="h-8 w-8" />,
      features: [t("premiumTemplates"), t("autoExport"), t("smartPaymentTracking")],
    },
  ]

  const pricingPlans = [
    {
      name: t("free"),
      price: "0€",
      period: t("month"),
      features: [t("oneAppIncluded"), t("communitySupport"), t("basicUpdates"), t("fullDocumentation")],
      buttonText: t("startFree"),
      popular: false,
    },
    {
      name: t("pro"),
      price: "39€",
      period: t("month"),
      features: [
        t("allApps"),
        t("prioritySupport"),
        t("autoUpdates"),
        t("advancedCustomization"),
        t("apiIntegrations"),
        t("detailedReports"),
      ],
      buttonText: t("chooseOffer"),
      popular: true,
    },
    {
      name: t("enterprise"),
      price: "129€",
      period: t("month"),
      features: [
        t("multiUserLicense"),
        t("dedicatedSupport"),
        t("onSiteDeployment"),
        t("customTraining"),
        t("guaranteedSLA"),
        t("customDevelopment"),
      ],
      buttonText: t("chooseOffer"),
      popular: false,
    },
  ]

  const testimonials = [
    {
      name: t("testimonial1Name"),
      role: t("testimonial1Role"),
      company: t("testimonial1Company"),
      content: t("testimonial1Content"),
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: t("testimonial2Name"),
      role: t("testimonial2Role"),
      company: t("testimonial2Company"),
      content: t("testimonial2Content"),
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: t("testimonial3Name"),
      role: t("testimonial3Role"),
      company: t("testimonial3Company"),
      content: t("testimonial3Content"),
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-[#121212]/95 backdrop-blur-sm border-b border-[#e50914]/20 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className={`flex items-center space-x-3 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
              <div className="text-3xl">😈</div>
              <div className="text-2xl font-bold text-[#e50914]">Espada</div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("accueil")}
                className="text-white hover:text-[#e50914] transition-colors duration-300"
              >
                {t("home")}
              </button>
              <button
                onClick={() => scrollToSection("tarifs")}
                className="text-white hover:text-[#e50914] transition-colors duration-300"
              >
                {t("pricing")}
              </button>
              <button
                onClick={() => scrollToSection("avis-clients")}
                className="text-white hover:text-[#e50914] transition-colors duration-300"
              >
                {t("testimonials")}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-white hover:text-[#e50914] transition-colors duration-300"
              >
                {t("contact")}
              </button>
            </div>

            <div className={`flex items-center space-x-4 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
              <LanguageSelector />
              <Link href="/admin">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#e50914]/50 text-[#e50914] hover:bg-[#e50914]/20 bg-transparent"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Admin
                </Button>
              </Link>
              <Button className="hidden md:flex bg-[#ff6b00] hover:bg-[#ff6b00]/80 text-white font-semibold px-6 py-2 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#ff6b00]/50 items-center justify-center">
                <Download className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                {t("download")}
              </Button>

              {/* Mobile Menu Button */}
              <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </nav>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-[#e50914]/20">
              <div className="flex flex-col space-y-4 mt-4">
                <button
                  onClick={() => scrollToSection("accueil")}
                  className={`text-white hover:text-[#e50914] transition-colors duration-300 ${isRTL ? "text-right" : "text-left"}`}
                >
                  {t("home")}
                </button>
                <button
                  onClick={() => scrollToSection("tarifs")}
                  className={`text-white hover:text-[#e50914] transition-colors duration-300 ${isRTL ? "text-right" : "text-left"}`}
                >
                  {t("pricing")}
                </button>
                <button
                  onClick={() => scrollToSection("avis-clients")}
                  className={`text-white hover:text-[#e50914] transition-colors duration-300 ${isRTL ? "text-right" : "text-left"}`}
                >
                  {t("testimonials")}
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className={`text-white hover:text-[#e50914] transition-colors duration-300 ${isRTL ? "text-right" : "text-left"}`}
                >
                  {t("contact")}
                </button>
                <Link href="/admin">
                  <Button
                    variant="outline"
                    className="w-full border-[#e50914] text-[#e50914] hover:bg-[#e50914] hover:text-white bg-transparent"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Admin Panel
                  </Button>
                </Link>
                <Button className="bg-[#ff6b00] hover:bg-[#ff6b00]/80 text-white font-semibold w-full">
                  <Download className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                  {t("download")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="accueil" className="pt-24 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#e50914] via-[#ff6b00] to-[#e50914] bg-clip-text text-transparent animate-pulse">
              {t("heroTitle")}
            </h1>
            <p className="text-2xl md:text-3xl text-[#ff6b00] font-semibold mb-8 tracking-wide">{t("heroSlogan")}</p>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">{t("heroDescription")}</p>
            <Button
              size="lg"
              className="bg-[#e50914] hover:bg-[#e50914]/80 text-white px-12 py-6 text-xl font-bold transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-[#e50914]/50 border-2 border-[#e50914] hover:border-[#ff6b00]"
            >
              <Download className={`h-6 w-6 ${isRTL ? "ml-3" : "mr-3"}`} />
              {t("downloadNow")}
            </Button>
          </div>
          <div className="mt-16">
            <img
              src="/placeholder.svg?height=500&width=900&text=Desktop+Applications+Dashboard"
              alt="Applications Espada en action"
              className="mx-auto rounded-2xl shadow-2xl border-2 border-[#e50914]/30 hover:border-[#ff6b00]/50 transition-all duration-500"
            />
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#121212] to-black">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#e50914]">{t("ourApps")}</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t("appsDescription")}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {applications.map((app, index) => (
              <Card
                key={index}
                className="bg-black/50 border-[#e50914]/30 hover:border-[#ff6b00] transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#e50914]/20"
              >
                <CardHeader>
                  <div className="text-[#e50914] mb-4">{app.icon}</div>
                  <CardTitle className="text-white text-xl">{app.title}</CardTitle>
                  <CardDescription className="text-gray-300">{app.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {app.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className={`flex items-center text-sm text-gray-300 ${isRTL ? "flex-row-reverse" : ""}`}
                      >
                        <Check className={`h-4 w-4 text-[#ff6b00] ${isRTL ? "ml-2" : "mr-2"}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-[#e50914] text-[#e50914] hover:bg-[#e50914] hover:text-white bg-transparent transition-all duration-300"
                  >
                    {t("learnMore")}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="tarifs" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#e50914]">{t("pricingTitle")}</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t("pricingDescription")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative bg-black/50 border-[#e50914]/30 hover:border-[#ff6b00] transition-all duration-300 ${
                  plan.popular ? "ring-2 ring-[#ff6b00] transform scale-105 shadow-2xl shadow-[#ff6b00]/20" : ""
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#ff6b00] text-black font-bold px-4 py-1">
                    {t("mostPopular")}
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-[#e50914]">
                    {plan.price}
                    <span className="text-lg text-gray-400">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className={`flex items-center text-gray-300 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <Check className={`h-5 w-5 text-[#ff6b00] ${isRTL ? "ml-3" : "mr-3"}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full font-bold transition-all duration-300 transform hover:scale-105 ${
                      plan.popular
                        ? "bg-[#ff6b00] hover:bg-[#ff6b00]/80 text-black shadow-lg hover:shadow-[#ff6b00]/50"
                        : "bg-[#e50914] hover:bg-[#e50914]/80 text-white"
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="avis-clients" className="py-20 px-4 bg-gradient-to-b from-black to-[#121212]">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#e50914]">{t("clientReviews")}</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t("testimonialsDescription")}</p>
          </div>
          <div className="max-w-4xl mx-auto relative">
            <Card className="bg-black/50 border-[#e50914]/30">
              <CardContent className="p-8">
                <div className={`flex items-center mb-6 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <img
                    src={testimonials[currentTestimonial].avatar || "/placeholder.svg"}
                    alt={testimonials[currentTestimonial].name}
                    className={`w-16 h-16 rounded-full border-2 border-[#ff6b00] ${isRTL ? "ml-4" : "mr-4"}`}
                  />
                  <div className={isRTL ? "text-right" : ""}>
                    <h4 className="text-xl font-semibold text-white">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-[#ff6b00]">
                      {testimonials[currentTestimonial].role} - {testimonials[currentTestimonial].company}
                    </p>
                  </div>
                </div>
                <div className={`flex mb-4 space-x-1 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-[#ff6b00] fill-current" />
                  ))}
                </div>
                <p className={`text-lg text-gray-300 italic ${isRTL ? "text-right" : ""}`}>
                  "{testimonials[currentTestimonial].content}"
                </p>
              </CardContent>
            </Card>
            <Button
              variant="outline"
              size="icon"
              className={`absolute top-1/2 transform -translate-y-1/2 bg-black/50 border-[#e50914] hover:bg-[#e50914] hover:border-[#ff6b00] ${
                isRTL ? "right-2 -mr-2" : "left-2 -ml-2"
              }`}
              onClick={isRTL ? nextTestimonial : prevTestimonial}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={`absolute top-1/2 transform -translate-y-1/2 bg-black/50 border-[#e50914] hover:bg-[#e50914] hover:border-[#ff6b00] ${
                isRTL ? "left-2 -ml-2" : "right-2 -mr-2"
              }`}
              onClick={isRTL ? prevTestimonial : nextTestimonial}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#e50914]">{t("contactTitle")}</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t("contactDescription")}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="bg-black/50 border-[#e50914]/30">
              <CardHeader>
                <CardTitle className="text-white text-2xl">{t("sendMessage")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder={t("yourName")}
                  className="bg-[#121212] border-[#e50914]/50 text-white placeholder-gray-400 focus:border-[#ff6b00]"
                />
                <Input
                  type="email"
                  placeholder={t("yourEmail")}
                  className="bg-[#121212] border-[#e50914]/50 text-white placeholder-gray-400 focus:border-[#ff6b00]"
                />
                <Textarea
                  placeholder={t("yourMessage")}
                  rows={5}
                  className="bg-[#121212] border-[#e50914]/50 text-white placeholder-gray-400 focus:border-[#ff6b00]"
                />
                <Button className="w-full bg-[#e50914] hover:bg-[#e50914]/80 text-white font-bold transform hover:scale-105 transition-all duration-300">
                  {t("sendMessageBtn")}
                </Button>
              </CardContent>
            </Card>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-[#e50914]">{t("contactInfo")}</h3>
                <div className="space-y-4">
                  <div className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}>
                    <Mail className={`h-5 w-5 text-[#ff6b00] ${isRTL ? "ml-3" : "mr-3"}`} />
                    <span className="text-gray-300">contact@espada.pro</span>
                  </div>
                  <div className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}>
                    <Phone className={`h-5 w-5 text-[#ff6b00] ${isRTL ? "ml-3" : "mr-3"}`} />
                    <span className="text-gray-300">+33 1 23 45 67 89</span>
                  </div>
                  <div className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}>
                    <MapPin className={`h-5 w-5 text-[#ff6b00] ${isRTL ? "ml-3" : "mr-3"}`} />
                    <span className="text-gray-300">Paris, France</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-[#e50914]">{t("followUs")}</h3>
                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-[#e50914] hover:bg-[#e50914] hover:border-[#ff6b00] bg-transparent transition-all duration-300"
                  >
                    <Instagram className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-[#e50914] hover:bg-[#e50914] hover:border-[#ff6b00] bg-transparent transition-all duration-300"
                  >
                    <Youtube className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-[#e50914] hover:bg-[#e50914] hover:border-[#ff6b00] bg-transparent transition-all duration-300"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-[#e50914]/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className={`flex items-center space-x-3 mb-4 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
                <div className="text-3xl">😈</div>
                <div className="text-2xl font-bold text-[#e50914]">Espada</div>
              </div>
              <p className="text-gray-400">{t("footerDescription")}</p>
            </div>
            <div>
              <h4 className="text-[#e50914] font-semibold mb-4 text-lg">{t("navigation")}</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection("accueil")}
                    className="text-gray-400 hover:text-[#ff6b00] transition-colors duration-300"
                  >
                    {t("home")}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("tarifs")}
                    className="text-gray-400 hover:text-[#ff6b00] transition-colors duration-300"
                  >
                    {t("pricing")}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("avis-clients")}
                    className="text-gray-400 hover:text-[#ff6b00] transition-colors duration-300"
                  >
                    {t("testimonials")}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="text-gray-400 hover:text-[#ff6b00] transition-colors duration-300"
                  >
                    {t("contact")}
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#e50914] font-semibold mb-4 text-lg">{t("applications")}</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#ff6b00] transition-colors duration-300">
                    {t("pingOptimizer")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#ff6b00] transition-colors duration-300">
                    {t("pharmacyManager")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#ff6b00] transition-colors duration-300">
                    {t("iptvPanel")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#ff6b00] transition-colors duration-300">
                    {t("invoicing")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#e50914] font-semibold mb-4 text-lg">{t("support")}</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#ff6b00] transition-colors duration-300">
                    {t("documentation")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#ff6b00] transition-colors duration-300">
                    {t("faq")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#ff6b00] transition-colors duration-300">
                    {t("technicalSupport")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#e50914]/30 mt-8 pt-8 text-center">
            <p className="text-gray-400">{t("copyright")}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
