// src/app/page.tsx
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import HowItWorks from '@/components/home/HowItWorks';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import StatsSection from '@/components/home/StatsSection';
import PartnersSection from '@/components/home/PartnersSection';
import BlogSection from '@/components/home/BlogSection';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <HowItWorks />
      <StatsSection />
      <TestimonialsSection />
      <PartnersSection />
      <BlogSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </>
  );
}