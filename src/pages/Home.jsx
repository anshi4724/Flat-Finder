import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProperty } from '../context/PropertyContext';
import HeroSection from '../components/ui/HeroSection';
import PropertyCard from '../components/property/PropertyCard';
import { motion } from 'framer-motion';
import { 
  HiArrowRight, HiShieldCheck, HiSearch, 
  HiCurrencyRupee, HiChatAlt2, HiLightningBolt,
  HiMap, HiCheckCircle, HiHome, HiOfficeBuilding,
  HiAcademicCap, HiSparkles, HiFilter, HiClock,
  HiChip, HiDesktopComputer, HiStar, HiQuestionMarkCircle,
  HiChevronLeft, HiChevronRight
} from 'react-icons/hi';

const Home = () => {
  const { featuredProperties, fetchFeatured, selectedCity, selectedType } = useProperty();
  const [currentSlide, setCurrentSlide] = useState(0);

  const displayProperties = featuredProperties || [];

  useEffect(() => {
    // Always fetch featured properties on mount
    fetchFeatured();
  }, []); // Removed dependencies to prevent infinite loops

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(displayProperties.length / 3));
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(timer);
  }, [displayProperties.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(displayProperties.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(displayProperties.length / 3)) % Math.ceil(displayProperties.length / 3));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const categories = [
    { name: 'Apartments', icon: HiOfficeBuilding, color: 'indigo' },
    { name: 'Villas', icon: HiHome, color: 'emerald' },
    { name: 'PG / Hostel', icon: HiAcademicCap, color: 'violet' },
    { name: 'Studio Flats', icon: HiDesktopComputer, color: 'fuchsia' }
  ];

  const features = [
    {
      icon: HiShieldCheck,
      title: 'Verified Listings',
      description: 'for trusted property search'
    },
    {
      icon: HiFilter,
      title: 'Advanced Filters',
      description: 'for quick and accurate results'
    },
    {
      icon: HiChatAlt2,
      title: 'Real-time Chat',
      description: 'to connect with property owners'
    },
    {
      icon: HiChip,
      title: 'AI-powered Recommendations',
      description: 'for smart suggestions'
    },
    {
      icon: HiLightningBolt,
      title: 'User-friendly Interface',
      description: 'with fast performance'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Search Properties',
      description: 'Enter your preferred location, budget, and property type'
    },
    {
      number: '02',
      title: 'Explore Listings',
      description: 'Browse through verified properties with detailed information'
    },
    {
      number: '03',
      title: 'Connect & Chat',
      description: 'Contact property owners directly using chat feature'
    },
    {
      number: '04',
      title: 'Finalize Your Choice',
      description: 'Select the best property that suits your needs'
    }
  ];

  const testimonials = [
    {
      text: "FlatFinder made my house search so easy. I found a perfect flat within days!",
      author: "Ankit Sharma",
      avatar: "https://i.pravatar.cc/100?img=1"
    },
    {
      text: "The filters and chat feature saved a lot of time. Highly recommended!",
      author: "Priya Verma",
      avatar: "https://i.pravatar.cc/100?img=2"
    },
    {
      text: "User-friendly interface and accurate listings. Great experience overall.",
      author: "Rahul Mehta",
      avatar: "https://i.pravatar.cc/100?img=3"
    }
  ];

  return (
    <div className="bg-gray-50 dark:bg-[#030712] text-slate-900 dark:text-white transition-colors duration-300">
      <HeroSection />

      <section className="py-20 lg:py-32 bg-white dark:bg-transparent transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-6">
              🏡 Featured Properties
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
              Featured Properties ✨
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Explore our handpicked premium listings curated based on prime locations, modern amenities, and user preferences to help you find the perfect home faster.
            </p>
          </motion.div>

          {displayProperties.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-12 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-3xl border border-indigo-100 dark:border-indigo-500/20"
            >
              <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">No Featured Properties Found</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">Check back later or explore all properties.</p>
              <Link to="/explore" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all">
                Explore Now <HiArrowRight />
              </Link>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
            <div className="bg-white dark:bg-[#030712] rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none p-8 lg:p-12 border border-slate-100 dark:border-white/10">
              {/* Slider Container */}
              <div className="relative overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {Array.from({ length: Math.ceil(displayProperties.length / 3) }).map((_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayProperties
                          .slice(slideIndex * 3, slideIndex * 3 + 3)
                          .map((property) => (
                            <PropertyCard key={property._id} property={property} />
                          ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:bg-white hover:shadow-lg transition-all duration-300 z-10"
                >
                  <HiChevronLeft className="text-xl" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:bg-white hover:shadow-lg transition-all duration-300 z-10"
                >
                  <HiChevronRight className="text-xl" />
                </button>

                {/* Slide Indicators */}
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: Math.ceil(displayProperties.length / 3) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide 
                          ? 'bg-indigo-600 scale-110' 
                          : 'bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          )}

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              to="/explore"
              className="group inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-1"
            >
              View All Properties
              <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-gray-50 dark:bg-transparent transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
              Browse by Category
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Find the perfect property type that matches your lifestyle and needs
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {categories.map((category, index) => (
              <motion.div 
                key={category.name}
                variants={itemVariants}
                whileHover={{ 
                  y: -12, 
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-white/5 dark:via-white/5 dark:to-white/5 rounded-3xl p-10 shadow-xl shadow-indigo-200/30 dark:shadow-none border border-indigo-100 dark:border-white/10 hover:shadow-2xl hover:shadow-indigo-300/40 dark:hover:border-indigo-500/50 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating Particles Effect */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-indigo-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-700" style={{ animationDelay: '0.1s' }}></div>
                <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-purple-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-700" style={{ animationDelay: '0.3s' }}></div>
                <div className="absolute top-6 right-12 w-1 h-1 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-700" style={{ animationDelay: '0.5s' }}></div>

                {/* Icon Container */}
                <div className="relative z-10 w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-indigo-500/30 group-hover:shadow-xl group-hover:shadow-purple-500/40">
                  <category.icon className="text-white text-3xl group-hover:scale-110 transition-transform duration-300" />
                  
                  {/* Icon Glow Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-400 to-purple-500 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-base group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300 leading-relaxed">
                    Explore premium {category.name.toLowerCase()}
                  </p>
                </div>

                {/* Hover Border Glow */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-indigo-200 transition-all duration-500"></div>
                
                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-indigo-100 to-transparent rounded-bl-3xl rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-white dark:bg-[#030712] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
              Why Choose <span className="text-indigo-600 dark:text-indigo-400">FlatFinder?</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              We've redesigned the flat-hunting experience to be seamless, secure, and lightning-fast
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative bg-white dark:bg-white/5 rounded-2xl p-8 shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/10 hover:shadow-xl hover:shadow-indigo-200/60 dark:hover:border-indigo-500/50 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
                
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-gray-50 dark:bg-transparent transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
              How It <span className="text-indigo-600 dark:text-indigo-400">Works</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Simple steps to find your dream home in no time
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {steps.map((step, index) => (
              <motion.div 
                key={step.number}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative text-center bg-white dark:bg-white/5 rounded-2xl p-8 shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/10 hover:shadow-xl hover:shadow-indigo-200/60 transition-all duration-300"
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white shadow-lg shadow-indigo-500/25 group-hover:scale-110 transition-transform duration-300">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-indigo-200 to-transparent"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{step.description}</p>
                
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-white dark:bg-[#030712] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
              What Our Users <span className="text-indigo-600 dark:text-indigo-400">Say</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Real stories from satisfied customers who found their perfect homes
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.author}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative bg-white dark:bg-white/5 rounded-2xl p-8 shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/10 hover:shadow-xl hover:shadow-indigo-200/60 transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <HiStar key={i} className="text-yellow-400 text-xl" />
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6 text-lg">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full border-2 border-indigo-200 dark:border-indigo-500/30 shadow-md"
                  />
                  <div>
                    <div className="text-slate-900 dark:text-white font-bold">{testimonial.author}</div>
                    <div className="text-slate-500 dark:text-slate-400 text-sm">Verified Customer</div>
                  </div>
                </div>
                
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-32 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Start your journey to find <br /> your dream home today
            </h2>
            <p className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who found their perfect homes with FlatFinder
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/signup"
                className="group inline-flex items-center justify-center gap-3 bg-white text-indigo-600 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 hover:shadow-xl hover:shadow-white/25 transition-all duration-300 hover:-translate-y-1"
              >
                Get Started
                <HiArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/explore"
                className="inline-flex items-center justify-center px-10 py-4 bg-transparent border-2 border-white text-white rounded-2xl font-bold text-lg hover:bg-white hover:text-indigo-600 transition-all duration-300 hover:-translate-y-1"
              >
                Browse Properties
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;