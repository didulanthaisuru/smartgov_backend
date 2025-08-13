import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  FileText, 
  User, 
  Building2, 
  Award, 
  Clipboard,
  Shield,
  DollarSign,
  Truck,
  Home,
  MessageCircle,
  ArrowRight,
  Grid3X3,
  Star,
  TrendingUp,
  Menu,
  X,
  ChevronUp,
  ChevronDown,
  Globe,
  Bot,
  Clock,
  Filter,
  Heart,
  Phone,
  Mail
} from 'lucide-react';
import servicesHeroImage from '../assets/images/figma/services_hero_image.png';
import logoIcon from '../assets/images/figma/logo.png';

// Color Configuration - Sri Lankan Government Theme
const COLORS = {
  primary: {
    blue: '#1E40AF', // Deep blue for government feel
    orange: '#F97316', // Sri Lankan flag orange
    red: '#DC2626', // Sri Lankan flag red  
    green: '#059669', // Nature/prosperity green
  },
  secondary: {
    lightBlue: '#DBEAFE',
    lightOrange: '#FED7AA', 
    lightGreen: '#D1FAE5',
    lightRed: '#FEE2E2',
  },
  neutral: {
    gray50: '#F9FAFB',
    gray100: '#F3F4F6',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray600: '#4B5563',
    gray700: '#374151',
    gray900: '#111827',
  }
};

// Language Configuration
const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'si', name: 'සිංහල', flag: '🇱🇰' },
  { code: 'ta', name: 'தமிழ்', flag: '🇱🇰' }
];

// Animation Variants
const animations = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  slideInRight: {
    initial: { opacity: 0, x: 300 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 300 }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  }
};

const Services = () => {
  const navigate = useNavigate();
  
  // State Management
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Service Data with enhanced properties
  const serviceData = {
    recent: [
      {
        id: 1,
        name: 'Birth Certificate',
        nameTranslations: {
          en: 'Birth Certificate',
          si: 'උප්පැන්න සහතිකය',
          ta: 'பிறப்பு சான்றிதழ்'
        },
        description: 'Apply for new or duplicate birth certificate online',
        icon: FileText,
        category: 'certificates',
        priority: 'high',
        estimatedTime: '3-5 days',
        fee: 'LKR 500',
        rating: 4.8,
        completedApplications: 15420
      },
      {
        id: 2,
        name: 'National ID Card',
        nameTranslations: {
          en: 'National ID Card',
          si: 'ජාතික හැඳුනුම්පත',
          ta: 'தேசிய அடையாள அட்டை'
        },
        description: 'Apply for new NIC or replacement service',
        icon: User,
        category: 'certificates',
        priority: 'high',
        estimatedTime: '7-10 days',
        fee: 'LKR 1000',
        rating: 4.6,
        completedApplications: 28350
      },
      {
        id: 3,
        name: 'Business Registration',
        nameTranslations: {
          en: 'Business Registration',
          si: 'ව්‍යාපාර ලියාපදිංචිය',
          ta: 'வணிக பதிவு'
        },
        description: 'Register your new business with government',
        icon: Building2,
        category: 'registrations',
        priority: 'medium',
        estimatedTime: '10-15 days',
        fee: 'LKR 2500',
        rating: 4.4,
        completedApplications: 8920
      },
      {
        id: 4,
        name: 'Employment Services',
        nameTranslations: {
          en: 'Employment Services',
          si: 'රැකියා සේවා',
          ta: 'வேலைவாய்ப்பு சேவைகள்'
        },
        description: 'Government job applications and career services',
        icon: Building2,
        category: 'employment',
        priority: 'medium',
        estimatedTime: '30-45 days',
        fee: 'Free',
        rating: 4.2,
        completedApplications: 12450
      }
    ],
    popular: [
      {
        id: 5,
        name: 'Passport Services',
        nameTranslations: {
          en: 'Passport Services',
          si: 'ගමන් බලපත්‍ර සේවා',
          ta: 'கடவுச்சீட்டு சேவைகள்'
        },
        description: 'New passport application and renewals',
        icon: Shield,
        category: 'travel',
        priority: 'high',
        estimatedTime: '15-20 days',
        fee: 'LKR 3500',
        rating: 4.7,
        completedApplications: 45280
      },
      {
        id: 6,
        name: 'Driving License',
        nameTranslations: {
          en: 'Driving License',
          si: 'රියදුරු බලපත්‍රය',
          ta: 'ஓட்டுநர் உரிமம்'
        },
        description: 'Apply for new or renew driving license',
        icon: Shield,
        category: 'licenses',
        priority: 'medium',
        estimatedTime: '10-14 days',
        fee: 'LKR 1500',
        rating: 4.3,
        completedApplications: 22180
      }
    ],
    categories: [
      { id: 'all', name: 'All Services', icon: Grid3X3, count: 156 },
      { id: 'certificates', name: 'Certificates', icon: Award, count: 23 },
      { id: 'licenses', name: 'Licenses', icon: Shield, count: 18 },
      { id: 'permits', name: 'Permits', icon: Clipboard, count: 15 },
      { id: 'financial', name: 'Financial', icon: DollarSign, count: 12 },
      { id: 'travel', name: 'Travel', icon: Home, count: 8 },
      { id: 'employment', name: 'Employment', icon: Building2, count: 14 }
    ]
  };

  // Scroll handling for floating action button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle service clicks
  const handleServiceClick = (service) => {
    navigate(`/services/${service.id}/detail`);
  };

  // Filter services based on category and search
  const getFilteredServices = () => {
    let allServices = [...serviceData.recent, ...serviceData.popular];
    
    if (selectedCategory !== 'all') {
      allServices = allServices.filter(service => service.category === selectedCategory);
    }

    if (searchTerm) {
      allServices = allServices.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return allServices;
  };

  // Priority color mapping
  const getPriorityStyle = (priority) => {
    const styles = {
      high: 'bg-red-50 text-red-700 border-red-200',
      medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      low: 'bg-green-50 text-green-700 border-green-200'
    };
    return styles[priority] || styles.medium;
  };

  // Language translations
  const getTranslation = (service, field = 'name') => {
    if (field === 'name' && service.nameTranslations) {
      return service.nameTranslations[currentLanguage] || service.name;
    }
    return service[field];
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Header Component
  const ModernHeader = () => (
    <motion.header 
      className="bg-white shadow-lg border-b-4 border-blue-600 sticky top-0 z-40"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <img src={logoIcon} alt="Government Logo" className="h-8 w-8 md:h-10 md:w-10" />
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                SmartGov
              </h1>
              <p className="text-xs md:text-sm text-gray-600 hidden sm:block">
                Digital Government Services
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Services
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              About
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Contact
            </a>
          </nav>

          {/* Language Dropdown and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {LANGUAGES.find(lang => lang.code === currentLanguage)?.flag}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showLanguageDropdown && (
                  <motion.div
                    {...animations.scaleIn}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                  >
                    {LANGUAGES.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => {
                          setCurrentLanguage(language.code);
                          setShowLanguageDropdown(false);
                        }}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-lg">{language.flag}</span>
                        <span className="text-sm font-medium">{language.name}</span>
                        {currentLanguage === language.code && (
                          <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            {...animations.slideInRight}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-4">
              <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium py-2">
                Home
              </a>
              <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium py-2">
                Services
              </a>
              <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium py-2">
                About
              </a>
              <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium py-2">
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );

  // Service Card Component
  const ServiceCard = ({ service, featured = false }) => {
    const IconComponent = service.icon;
    
    return (
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => handleServiceClick(service)}
        className={`
          cursor-pointer rounded-2xl border-2 transition-all duration-300 group
          ${featured 
            ? 'bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 p-6' 
            : 'bg-white border-gray-200 p-4 hover:border-blue-300 hover:shadow-lg'
          }
        `}
      >
        {/* Card Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${featured ? 'bg-blue-100' : 'bg-orange-100'} group-hover:scale-110 transition-transform`}>
            <IconComponent className={`w-6 h-6 ${featured ? 'text-blue-600' : 'text-orange-600'}`} />
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityStyle(service.priority)}`}>
              {service.priority}
            </span>
            {service.rating && (
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-gray-600">{service.rating}</span>
              </div>
            )}
          </div>
        </div>

        {/* Card Content */}
        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {getTranslation(service, 'name')}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {service.description}
        </p>

        {/* Card Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {service.estimatedTime}
            </span>
            <span className="flex items-center">
              <DollarSign className="w-3 h-3 mr-1" />
              {service.fee}
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />
        </div>

        {/* Completion Stats */}
        {service.completedApplications && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              {service.completedApplications.toLocaleString()} completed applications
            </p>
          </div>
        )}
      </motion.div>
    );
  };

  // Category Button Component
  const CategoryButton = ({ category, isSelected }) => {
    const IconComponent = category.icon;
    
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setSelectedCategory(category.id)}
        className={`
          flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-300 min-w-[100px]
          ${isSelected
            ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
            : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300 hover:shadow-md'
          }
        `}
      >
        <IconComponent className={`w-6 h-6 mb-2 ${isSelected ? 'text-white' : 'text-blue-600'}`} />
        <span className="text-xs font-medium text-center">{category.name}</span>
        <span className={`text-xs mt-1 ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
          {category.count}
        </span>
      </motion.button>
    );
  };

  // Floating Action Button
  const FloatingActionButton = () => (
    <AnimatePresence>
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 transition-colors z-50"
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <ModernHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <motion.div 
          {...animations.fadeInUp}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Government Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access all government services online. Fast, secure, and convenient digital solutions for citizens.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          {...animations.fadeInUp}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          {/* Search Bar */}
          <div className="relative mb-6 max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-2xl focus:border-blue-500 focus:ring-0 text-lg placeholder-gray-500"
            />
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center"
            >
              <Filter className="h-5 w-5 text-gray-400 hover:text-blue-600 transition-colors" />
            </button>
          </div>

          {/* Category Filters */}
          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-4 min-w-max px-4">
              {serviceData.categories.map((category) => (
                <CategoryButton
                  key={category.id}
                  category={category}
                  isSelected={selectedCategory === category.id}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          {...animations.fadeInUp}
          transition={{ delay: 0.2 }}
          className="mb-8 rounded-3xl overflow-hidden shadow-2xl"
        >
          <img
            src={servicesHeroImage}
            alt="Government Services"
            className="w-full h-48 md:h-64 lg:h-80 object-cover"
          />
        </motion.div>

        {/* Recent Services */}
        <motion.section 
          {...animations.fadeInUp}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Recent Services
            </h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {serviceData.recent.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <ServiceCard service={service} featured={index === 0} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Popular Services */}
        <motion.section 
          {...animations.fadeInUp}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Popular Services
            </h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceData.popular.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Action Buttons */}
        <motion.section 
          {...animations.fadeInUp}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {/* AI Chat Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/chatbot')}
            className="bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-between group"
          >
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-2">Chat with AI Assistant</h3>
              <p className="text-orange-100">Get instant help with your queries</p>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-xl group-hover:scale-110 transition-transform">
              <Bot className="w-8 h-8" />
            </div>
          </motion.button>

          {/* Contact Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/contact-us')}
            className="bg-gradient-to-r from-green-400 to-green-500 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-between group"
          >
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-2">Contact Support</h3>
              <p className="text-green-100">Need help? We're here for you</p>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-xl group-hover:scale-110 transition-transform">
              <MessageCircle className="w-8 h-8" />
            </div>
          </motion.button>
        </motion.section>

        {/* Statistics Section */}
        <motion.section 
          {...animations.fadeInUp}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-3xl p-8 shadow-xl mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            Service Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">156,280</h3>
              <p className="text-gray-600">Services Completed</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">4.6</h3>
              <p className="text-gray-600">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">98%</h3>
              <p className="text-gray-600">Success Rate</p>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
};

export default Services;
