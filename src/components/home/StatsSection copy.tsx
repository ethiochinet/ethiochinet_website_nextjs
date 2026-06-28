'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { 
  HiTruck, 
  HiDocumentText, 
  HiLocationMarker, 
  HiUserGroup,
  HiOutlineTruck,
  HiOutlineDocumentText,
  HiOutlineLocationMarker,
  HiOutlineUserGroup
} from 'react-icons/hi';

interface StatItem {
  icon: React.ElementType;
  iconOutlined: React.ElementType;
  label: string;
  value: number;
  suffix: string;
  color: string;
}

const stats: StatItem[] = [
  { 
    icon: HiTruck, 
    iconOutlined: HiOutlineTruck,
    label: 'Registered Drivers', 
    value: 1125, 
    suffix: '+',
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    icon: HiDocumentText, 
    iconOutlined: HiOutlineDocumentText,
    label: 'Freight Posted', 
    value: 610, 
    suffix: '+',
    color: 'from-green-500 to-emerald-500'
  },
  { 
    icon: HiLocationMarker, 
    iconOutlined: HiOutlineLocationMarker,
    label: 'Deliveries Completed', 
    value: 4900, 
    suffix: '+',
    color: 'from-purple-500 to-pink-500'
  },
  { 
    icon: HiUserGroup, 
    iconOutlined: HiOutlineUserGroup,
    label: 'Cities Served', 
    value: 15, 
    suffix: '',
    color: 'from-orange-500 to-red-500'
  },
];

// Counter Component with animation
const Counter = ({ value, suffix, duration = 2000 }: { value: number; suffix: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      const increment = end / (duration / 16); // 60fps
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="text-4xl lg:text-5xl font-bold text-white">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

// Animated background component
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated circles */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/10 rounded-full"
      />
      
      {/* Grid pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />
    </div>
  );
};

// Individual stat card component
const StatCard = ({ stat, index }: { stat: StatItem; index: number }) => {
  const Icon = stat.icon;
  const IconOutlined = stat.iconOutlined;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ 
        scale: 1.05,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group cursor-pointer"
    >
      {/* Gradient Background Card */}
      <div className="relative bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl p-8 shadow-xl overflow-hidden">
        <AnimatedBackground />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            animate={isHovered ? { 
              rotate: [0, -10, 10, -10, 0],
              scale: [1, 1.2, 1.2, 1.2, 1]
            } : {}}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-4"
          >
            <div className="relative">
              <IconOutlined className="w-16 h-16 text-white/30 absolute inset-0 animate-pulse" />
              <Icon className="w-16 h-16 text-white relative z-10" />
            </div>
          </motion.div>

          {/* Counter */}
          <div className="text-center">
            <Counter value={stat.value} suffix={stat.suffix} />
            
            {/* Label with animated underline */}
            <div className="relative inline-block mt-2">
              <span className="text-white/90 text-lg font-medium">
                {stat.label}
              </span>
              <motion.div
                animate={isHovered ? { width: '100%' } : { width: '0%' }}
                className="absolute bottom-0 left-0 h-0.5 bg-white"
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Decorative number */}
          <div className="absolute bottom-2 right-4 text-6xl font-bold text-white/10 select-none">
            {String(stat.value).charAt(0)}
          </div>
        </div>

        {/* Hover gradient overlay */}
        <motion.div
          animate={isHovered ? { opacity: 0.2 } : { opacity: 0 }}
          className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 transition-opacity duration-300`}
        />
      </div>
    </motion.div>
  );
};

// Main StatsSection component
export default function StatsSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-br from-gray-900 via-teal-900 to-gray-900 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.2"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ethiochinet by the <span className="text-teal-300">Numbers</span>
          </h2>
          <p className="text-xl text-teal-100">
            Growing faster than ever to serve you better
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          {/* <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-white/90">
              <span className="font-semibold">Real-time updates</span> — Stats refresh every minute
            </span>
          </div> */}
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-300 via-teal-500 to-teal-300 origin-left"
          style={{ transformOrigin: 'left' }}
        />
      </div>
    </section>
  );
}