import React, { useState } from 'react';
import { 
  ArrowRight, 
  TrendingUp, 
  Shield, 
  BarChart3, 
  CheckCircle,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  FileText,
  HelpCircle,
  Code,
  Activity
} from 'lucide-react';
import SupportPages from './SupportPages';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSupportPage, setShowSupportPage] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  if (showSupportPage) {
    return (
      <SupportPages 
        page={showSupportPage} 
        onBack={() => setShowSupportPage(null)} 
      />
    );
  }

  const features = [
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      title: "Free equity investments",
      description: "All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
      title: "Intraday and F&O trades",
      description: "Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades."
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Free direct MF",
      description: "All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges."
    }
  ];

  const stats = [
    { number: "1+ Crore", label: "Active clients" },
    { number: "15%", label: "Market share" },
    { number: "₹4+ Lakh Crores", label: "Assets under custody" },
    { number: "₹3,500+ Crores", label: "Average daily turnover" }
  ];

  const products = [
    {
      name: "Kite",
      description: "Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more.",
      image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1",
      features: ["Web & mobile", "Streaming market data", "Advanced charts", "Market depth"]
    },
    {
      name: "Console",
      description: "The central dashboard for your Zerodha account. Gain insights into your trades and investments with in-depth reports and visualisations.",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1",
      features: ["Portfolio tracker", "P&L analysis", "Detailed reports", "Tax reports"]
    },
    {
      name: "Coin",
      description: "Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices.",
      image: "https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1",
      features: ["Direct mutual funds", "Zero commission", "SIP & lump sum", "Goal planning"]
    }
  ];

  const pricingPlans = [
    {
      name: "Equity Delivery",
      price: "₹0",
      description: "All equity delivery investments",
      features: [
        "Zero brokerage on delivery trades",
        "No hidden charges",
        "Free demat account maintenance",
        "Unlimited trades"
      ],
      popular: true
    },
    {
      name: "Intraday & F&O",
      price: "₹20",
      description: "Per executed order",
      features: [
        "Flat ₹20 or 0.03% (whichever is lower)",
        "All segments included",
        "Advanced trading tools",
        "Real-time market data"
      ],
      popular: false
    },
    {
      name: "Currency & Commodity",
      price: "₹20",
      description: "Per executed order",
      features: [
        "Flat ₹20 or 0.03% (whichever is lower)",
        "MCX & CDS access",
        "Hedging strategies",
        "Professional tools"
      ],
      popular: false
    }
  ];

  const aboutStats = [
    { number: "2010", label: "Founded", description: "Started with a mission to democratize trading" },
    { number: "1+ Crore", label: "Active Clients", description: "Trusted by millions of traders and investors" },
    { number: "15%", label: "Market Share", description: "Leading discount broker in India" },
    { number: "₹4+ Lakh Crores", label: "AUC", description: "Assets under custody" }
  ];

  const supportServices = [
    {
      title: "24/7 Customer Support",
      description: "Round-the-clock assistance for all your trading needs",
      icon: <Phone className="w-8 h-8 text-blue-600" />,
      features: ["Phone support", "Email support", "Live chat", "WhatsApp support"]
    },
    {
      title: "Educational Resources",
      description: "Comprehensive learning materials for traders",
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      features: ["Trading guides", "Video tutorials", "Webinars", "Market analysis"]
    },
    {
      title: "Technical Support",
      description: "Expert help for platform and technical issues",
      icon: <Code className="w-8 h-8 text-blue-600" />,
      features: ["Platform troubleshooting", "API support", "Integration help", "Bug reports"]
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Active Trader",
      content: "Zerodha has revolutionized my trading experience. The platform is incredibly fast and reliable.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Long-term Investor",
      content: "Zero brokerage on equity delivery has saved me thousands. Best platform for long-term investing.",
      rating: 5
    },
    {
      name: "Amit Patel",
      role: "F&O Trader",
      content: "The advanced charting tools and market depth data give me the edge I need for F&O trading.",
      rating: 5
    }
  ];

  const supportLinks = [
    { title: "Support", icon: <HelpCircle className="w-5 h-5" />, page: "support" },
    { title: "Help Center", icon: <FileText className="w-5 h-5" />, page: "help" },
    { title: "API Documentation", icon: <Code className="w-5 h-5" />, page: "api" },
    { title: "Contact Support", icon: <Phone className="w-5 h-5" />, page: "contact" },
    { title: "System Status", icon: <Activity className="w-5 h-5" />, page: "status" },
    { title: "Privacy Policy", icon: <Shield className="w-5 h-5" />, page: "privacy" },
    { title: "Terms of Service", icon: <FileText className="w-5 h-5" />, page: "terms" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img 
                src="https://zerodha.com/static/images/logo.svg" 
                alt="Zerodha" 
                className="w-auto h-8"
              />
            </div>
            
            {/* Desktop Navigation */}
            <nav className="items-center hidden space-x-8 md:flex">
              <button 
                onClick={() => setExpandedSection(expandedSection === 'products' ? null : 'products')}
                className="text-gray-700 transition-colors hover:text-blue-600"
              >
                Products
              </button>
              <button 
                onClick={() => setExpandedSection(expandedSection === 'pricing' ? null : 'pricing')}
                className="text-gray-700 transition-colors hover:text-blue-600"
              >
                Pricing
              </button>
              <button 
                onClick={() => setExpandedSection(expandedSection === 'support' ? null : 'support')}
                className="text-gray-700 transition-colors hover:text-blue-600"
              >
                Support
              </button>
              <button 
                onClick={() => setExpandedSection(expandedSection === 'about' ? null : 'about')}
                className="text-gray-700 transition-colors hover:text-blue-600"
              >
                About
              </button>
              <button
                onClick={onGetStarted}
                className="px-6 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Get Started
              </button>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 rounded-md md:hidden hover:text-gray-900 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="py-4 border-t border-gray-200 md:hidden">
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={() => setExpandedSection(expandedSection === 'products' ? null : 'products')}
                  className="text-left text-gray-700 transition-colors hover:text-blue-600"
                >
                  Products
                </button>
                <button 
                  onClick={() => setExpandedSection(expandedSection === 'pricing' ? null : 'pricing')}
                  className="text-left text-gray-700 transition-colors hover:text-blue-600"
                >
                  Pricing
                </button>
                <button 
                  onClick={() => setExpandedSection(expandedSection === 'support' ? null : 'support')}
                  className="text-left text-gray-700 transition-colors hover:text-blue-600"
                >
                  Support
                </button>
                <button 
                  onClick={() => setExpandedSection(expandedSection === 'about' ? null : 'about')}
                  className="text-left text-gray-700 transition-colors hover:text-blue-600"
                >
                  About
                </button>
                <button
                  onClick={onGetStarted}
                  className="w-full px-6 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Expanded Sections */}
      {expandedSection && (
        <div className="bg-white border-b border-gray-200 shadow-lg">
          <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
            {expandedSection === 'products' && (
              <div>
                <h2 className="mb-6 text-2xl font-bold text-gray-900">Our Products</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="p-6 rounded-lg bg-gray-50">
                    <h3 className="mb-3 text-lg font-semibold">Kite</h3>
                    <p className="mb-4 text-gray-600">Ultra-fast flagship trading platform with streaming market data and advanced charts.</p>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Real-time market data</li>
                      <li>• Advanced charting tools</li>
                      <li>• Order management</li>
                      <li>• Portfolio tracking</li>
                    </ul>
                  </div>
                  <div className="p-6 rounded-lg bg-gray-50">
                    <h3 className="mb-3 text-lg font-semibold">Console</h3>
                    <p className="mb-4 text-gray-600">Central dashboard for your account with detailed reports and analytics.</p>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• P&L analysis</li>
                      <li>• Tax reports</li>
                      <li>• Holdings overview</li>
                      <li>• Transaction history</li>
                    </ul>
                  </div>
                  <div className="p-6 rounded-lg bg-gray-50">
                    <h3 className="mb-3 text-lg font-semibold">Coin</h3>
                    <p className="mb-4 text-gray-600">Direct mutual fund investments with zero commission.</p>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Direct mutual funds</li>
                      <li>• SIP automation</li>
                      <li>• Goal-based investing</li>
                      <li>• Tax-saving funds</li>
                    </ul>
                  </div>
                  <div className="p-6 rounded-lg bg-gray-50">
                    <h3 className="mb-3 text-lg font-semibold">Kite Connect API</h3>
                    <p className="mb-4 text-gray-600">Build trading applications with our comprehensive REST API.</p>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• REST API access</li>
                      <li>• WebSocket streaming</li>
                      <li>• Historical data</li>
                      <li>• Order placement</li>
                    </ul>
                  </div>
                  <div className="p-6 rounded-lg bg-gray-50">
                    <h3 className="mb-3 text-lg font-semibold">Varsity</h3>
                    <p className="mb-4 text-gray-600">Comprehensive educational platform for trading and investing.</p>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Trading modules</li>
                      <li>• Investment guides</li>
                      <li>• Market analysis</li>
                      <li>• Risk management</li>
                    </ul>
                  </div>
                  <div className="p-6 rounded-lg bg-gray-50">
                    <h3 className="mb-3 text-lg font-semibold">Sentinel</h3>
                    <p className="mb-4 text-gray-600">Advanced basket orders and GTT (Good Till Triggered) orders.</p>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Basket orders</li>
                      <li>• GTT orders</li>
                      <li>• SIP in stocks</li>
                      <li>• Smallcase investing</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {expandedSection === 'pricing' && (
              <div>
                <h2 className="mb-6 text-2xl font-bold text-gray-900">Transparent Pricing</h2>
                <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
                  {pricingPlans.map((plan, index) => (
                    <div key={index} className={`bg-white p-6 rounded-lg border-2 ${plan.popular ? 'border-blue-500' : 'border-gray-200'} relative`}>
                      {plan.popular && (
                        <div className="absolute transform -translate-x-1/2 -top-3 left-1/2">
                          <span className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-full">Most Popular</span>
                        </div>
                      )}
                      <div className="mb-4 text-center">
                        <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                        <div className="my-2 text-3xl font-bold text-blue-600">{plan.price}</div>
                        <p className="text-sm text-gray-600">{plan.description}</p>
                      </div>
                      <ul className="space-y-2">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="p-6 border border-blue-200 rounded-lg bg-blue-50">
                  <h3 className="mb-3 text-lg font-semibold text-blue-900">Additional Charges</h3>
                  <div className="grid grid-cols-1 gap-4 text-sm text-blue-800 md:grid-cols-2">
                    <div>
                      <p><strong>Account opening:</strong> Free</p>
                      <p><strong>Demat AMC:</strong> ₹300/year</p>
                      <p><strong>Equity delivery:</strong> Free</p>
                    </div>
                    <div>
                      <p><strong>Call & Trade:</strong> ₹50 per order</p>
                      <p><strong>SMS alerts:</strong> ₹3 per SMS</p>
                      <p><strong>Physical CMR:</strong> ₹20 per CMR</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {expandedSection === 'support' && (
              <div>
                <h2 className="mb-6 text-2xl font-bold text-gray-900">Support Services</h2>
                <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
                  {supportServices.map((service, index) => (
                    <div key={index} className="p-6 rounded-lg bg-gray-50">
                      <div className="mb-4">{service.icon}</div>
                      <h3 className="mb-3 text-lg font-semibold">{service.title}</h3>
                      <p className="mb-4 text-gray-600">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="p-6 bg-white border border-gray-200 rounded-lg">
                    <h3 className="mb-4 text-lg font-semibold">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 mr-3 text-blue-600" />
                        <span>+91 80 4040 2020</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 mr-3 text-blue-600" />
                        <span>support@zerodha.com</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-3 text-blue-600" />
                        <span>Mon-Fri: 9 AM - 6 PM</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-white border border-gray-200 rounded-lg">
                    <h3 className="mb-4 text-lg font-semibold">Quick Actions</h3>
                    <div className="space-y-3">
                      <button 
                        onClick={() => setShowSupportPage('support')}
                        className="w-full p-2 text-left transition-colors rounded hover:bg-gray-50"
                      >
                        Visit Support Center
                      </button>
                      <button 
                        onClick={() => setShowSupportPage('help')}
                        className="w-full p-2 text-left transition-colors rounded hover:bg-gray-50"
                      >
                        Browse Help Articles
                      </button>
                      <button 
                        onClick={() => setShowSupportPage('status')}
                        className="w-full p-2 text-left transition-colors rounded hover:bg-gray-50"
                      >
                        Check System Status
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {expandedSection === 'about' && (
              <div>
                <h2 className="mb-6 text-2xl font-bold text-gray-900">About Zerodha</h2>
                <div className="grid grid-cols-1 gap-8 mb-8 lg:grid-cols-2">
                  <div>
                    <h3 className="mb-4 text-xl font-semibold">Our Story</h3>
                    <div className="space-y-4 text-gray-600">
                      <p>
                        Founded in 2010, Zerodha has revolutionized the Indian financial markets by introducing 
                        discount brokerage and making trading accessible to millions of Indians.
                      </p>
                      <p>
                        We pioneered the concept of flat-fee pricing in India, eliminating the traditional 
                        percentage-based brokerage model that was eating into traders' profits.
                      </p>
                      <p>
                        Today, we're India's largest stock broker with over 1 crore active clients, 
                        contributing to more than 15% of all retail trading volumes in the country.
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-4 text-xl font-semibold">Our Mission</h3>
                    <div className="space-y-4 text-gray-600">
                      <p>
                        To democratize access to financial markets and make investing and trading 
                        affordable, transparent, and accessible to every Indian.
                      </p>
                      <p>
                        We believe in building technology that empowers individuals to take control 
                        of their financial future without the burden of high costs or complex processes.
                      </p>
                      <p>
                        Our commitment extends beyond just providing trading platforms - we educate, 
                        support, and guide our clients through their investment journey.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6 mb-8 md:grid-cols-4">
                  {aboutStats.map((stat, index) => (
                    <div key={index} className="p-6 text-center bg-white border border-gray-200 rounded-lg">
                      <div className="mb-2 text-2xl font-bold text-blue-600">{stat.number}</div>
                      <div className="mb-1 font-medium text-gray-900">{stat.label}</div>
                      <div className="text-sm text-gray-600">{stat.description}</div>
                    </div>
                  ))}
                </div>
                <div className="p-6 border border-blue-200 rounded-lg bg-blue-50">
                  <h3 className="mb-3 text-lg font-semibold text-blue-900">Leadership Team</h3>
                  <div className="grid grid-cols-1 gap-4 text-blue-800 md:grid-cols-2">
                    <div>
                      <p><strong>Nithin Kamath</strong> - Founder & CEO</p>
                      <p className="text-sm">Visionary leader driving innovation in fintech</p>
                    </div>
                    <div>
                      <p><strong>Nikhil Kamath</strong> - Co-founder & CIO</p>
                      <p className="text-sm">Investment strategist and market expert</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-6xl">
                Invest in everything
              </h1>
              <p className="mb-8 text-xl text-gray-600">
                Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.
              </p>
              <button
                onClick={onGetStarted}
                className="inline-flex items-center px-8 py-4 text-lg font-medium text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Sign up for free
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
                alt="Trading Platform"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute p-4 bg-white rounded-lg shadow-lg -bottom-6 -left-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">NIFTY 50</p>
                    <p className="text-lg font-bold text-green-600">+2.34%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Trust with confidence
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 text-3xl font-bold text-blue-600 lg:text-4xl">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Unbeatable pricing
            </h2>
            <p className="text-xl text-gray-600">
              We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="mb-4 text-xl font-bold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Technology
            </h2>
            <p className="text-xl text-gray-600">
              Sleek, modern, and intuitive trading platforms
            </p>
          </div>
          <div className="space-y-16">
            {products.map((product, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <h3 className="mb-4 text-2xl font-bold text-gray-900">{product.name}</h3>
                  <p className="mb-6 text-gray-600">{product.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {product.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setExpandedSection('products')}
                    className="inline-flex items-center mt-6 font-medium text-blue-600 transition-colors hover:text-blue-700"
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              What our customers say
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="mb-4 text-gray-600">"{testimonial.content}"</p>
                <div>
                  <p className="font-medium text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Open a Zerodha account
          </h2>
          <p className="mb-8 text-xl text-blue-100">
            Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.
          </p>
          <button
            onClick={onGetStarted}
            className="inline-flex items-center px-8 py-4 text-lg font-medium text-blue-600 transition-colors bg-white rounded-md hover:bg-gray-100"
          >
            Sign up for free
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white bg-gray-900">
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Company Info */}
            <div>
              <div className="flex items-center mb-4">
                <img 
                  src="https://zerodha.com/static/images/logo.svg" 
                  alt="Zerodha" 
                  className="w-auto h-8 filter brightness-0 invert"
                />
              </div>
              <p className="mb-4 text-gray-400">
                India's largest stock broker offering the lowest, most transparent charges and world-class technology.
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="flex items-center justify-center w-8 h-8 bg-blue-400 rounded-full">
                  <span className="text-sm font-bold">t</span>
                </div>
                <div className="flex items-center justify-center w-8 h-8 bg-blue-700 rounded-full">
                  <span className="text-sm font-bold">in</span>
                </div>
              </div>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">Support</h3>
              <ul className="space-y-3">
                {supportLinks.slice(0, 4).map((link, index) => (
                  <li key={index}>
                    <button 
                      onClick={() => setShowSupportPage(link.page)}
                      className="flex items-center w-full text-left text-gray-400 transition-colors hover:text-white"
                    >
                      {link.icon}
                      <span className="ml-2">{link.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">Legal</h3>
              <ul className="space-y-3">
                {supportLinks.slice(4).map((link, index) => (
                  <li key={index}>
                    <button 
                      onClick={() => setShowSupportPage(link.page)}
                      className="flex items-center w-full text-left text-gray-400 transition-colors hover:text-white"
                    >
                      {link.icon}
                      <span className="ml-2">{link.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-400">
                  <Phone className="w-5 h-5 mr-2" />
                  <span>+91 80 4040 2020</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Mail className="w-5 h-5 mr-2" />
                  <span>support@zerodha.com</span>
                </div>
                <div className="flex items-start text-gray-400">
                  <MapPin className="w-5 h-5 mt-1 mr-2" />
                  <span>
                    #153/154, 4th Cross, Dollars Colony,<br />
                    Opp. Clarence Public School,<br />
                    J.P Nagar 4th Phase,<br />
                    Bangalore - 560078
                  </span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="pt-8 mt-8 border-t border-gray-800">
            <div className="flex flex-col items-center justify-between md:flex-row">
              <p className="mb-4 text-sm text-gray-400 md:mb-0">
                © 2025 Zerodha Broking Ltd. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <button onClick={() => setShowSupportPage('privacy')} className="text-gray-400 transition-colors hover:text-white">Privacy</button>
                <button onClick={() => setShowSupportPage('terms')} className="text-gray-400 transition-colors hover:text-white">Terms</button>
                <button onClick={() => setShowSupportPage('creator')} className="text-gray-400 transition-colors hover:text-white">Disclosure</button>
              </div>
            </div>
            
            {/* Disclaimer */}
            <div className="mt-8 text-xs leading-relaxed text-gray-500">
              <p className="mb-2">
                Investments in securities market are subject to market risks; read all the related documents carefully before investing.
              </p>
              <p className="mb-2">
                Attention investors: 1) Stock brokers can accept securities as margins from clients only by way of pledge in the depository system w.e.f September 01, 2020. 2) Update your e-mail and phone number with your stock broker / depository participant and receive OTP directly from depository on your e-mail and/or mobile number to create pledge. 3) Check your securities / MF / bonds in the consolidated account statement issued by NSDL/CDSL every month.
              </p>
              <p>
                "Prevent unauthorised transactions in your account. Update your mobile numbers/email IDs with your stock brokers. Receive information of your transactions directly from Exchange on your mobile/email at the end of the day. Issued in the interest of investors. KYC is one time exercise while dealing in securities markets - once KYC is done through a SEBI registered intermediary (broker, DP, Mutual Fund etc.), you need not undergo the same process again when you approach another intermediary." Dear Investor, if you are subscribing to an IPO, there is no need to issue a cheque. Please write the Bank account number and sign the IPO application form to authorize your bank to make payment in case of allotment. In case of non allotment the funds will remain in your bank account. As a business we don't give stock tips, and have not authorized anyone to trade on behalf of others. If you find anyone claiming to be part of Zerodha and offering such services, please create a ticket here.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;