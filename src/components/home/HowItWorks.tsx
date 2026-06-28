'use client';

import { motion } from 'framer-motion';
import { HiDownload, HiUserCircle, HiDocumentText, HiTruck, HiLocationMarker, HiCash, HiIdentification, HiClipboardList } from 'react-icons/hi';
import { useTranslation } from '@/hooks/useTranslation';

type Step = { icon: React.ElementType; title: string; description: string };

interface StepListProps {
  steps: Step[];
  color: 'teal' | 'blue' | 'purple';
}

function StepList({ steps, color }: StepListProps) {
  const colorMap = {
    teal: { bg: 'bg-teal-100', icon: 'text-teal-600', badge: 'bg-teal-600', border: 'border-teal-100' },
    blue: { bg: 'bg-blue-100', icon: 'text-blue-600', badge: 'bg-blue-600', border: 'border-blue-100' },
    purple: { bg: 'bg-purple-100', icon: 'text-purple-600', badge: 'bg-purple-600', border: 'border-purple-100' },
  };
  const c = colorMap[color];

  return (
    <div className="space-y-5">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            viewport={{ once: true }}
            className="flex items-start space-x-4"
          >
            <div className={`flex-shrink-0 w-10 h-10 ${c.bg} rounded-xl flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${c.icon}`} />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className={`flex items-center justify-center w-5 h-5 ${c.badge} text-white rounded-full text-xs font-bold`}>
                  {index + 1}
                </span>
                <h4 className="font-semibold text-gray-900 text-sm">{step.title}</h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed ml-7">{step.description}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function HowItWorks() {
  const { t } = useTranslation();

  const stepsForOwners: Step[] = [
    { icon: HiDownload, title: t('howItWorks.freightOwner.step1Title'), description: t('howItWorks.freightOwner.step1Desc') },
    { icon: HiUserCircle, title: t('howItWorks.freightOwner.step2Title'), description: t('howItWorks.freightOwner.step2Desc') },
    { icon: HiDocumentText, title: t('howItWorks.freightOwner.step3Title'), description: t('howItWorks.freightOwner.step3Desc') },
    { icon: HiTruck, title: t('howItWorks.freightOwner.step4Title'), description: t('howItWorks.freightOwner.step4Desc') },
    { icon: HiLocationMarker, title: t('howItWorks.freightOwner.step5Title'), description: t('howItWorks.freightOwner.step5Desc') },
  ];

  const stepsForDrivers: Step[] = [
    { icon: HiDownload, title: t('howItWorks.driver.step1Title'), description: t('howItWorks.driver.step1Desc') },
    { icon: HiCash, title: t('howItWorks.driver.step2Title'), description: t('howItWorks.driver.step2Desc') },
    { icon: HiDocumentText, title: t('howItWorks.driver.step3Title'), description: t('howItWorks.driver.step3Desc') },
    { icon: HiTruck, title: t('howItWorks.driver.step4Title'), description: t('howItWorks.driver.step4Desc') },
    { icon: HiLocationMarker, title: t('howItWorks.driver.step5Title'), description: t('howItWorks.driver.step5Desc') },
  ];

  const stepsForVehicleOwners: Step[] = [
    { icon: HiDownload, title: t('howItWorks.vehicleOwner.step1Title'), description: t('howItWorks.vehicleOwner.step1Desc') },
    { icon: HiIdentification, title: t('howItWorks.vehicleOwner.step2Title'), description: t('howItWorks.vehicleOwner.step2Desc') },
    { icon: HiUserCircle, title: t('howItWorks.vehicleOwner.step3Title'), description: t('howItWorks.vehicleOwner.step3Desc') },
    { icon: HiClipboardList, title: t('howItWorks.vehicleOwner.step4Title'), description: t('howItWorks.vehicleOwner.step4Desc') },
    { icon: HiLocationMarker, title: t('howItWorks.vehicleOwner.step5Title'), description: t('howItWorks.vehicleOwner.step5Desc') },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('howItWorks.title')}</h2>
          <p className="text-xl text-gray-600">{t('howItWorks.subtitle')}</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Freight Owners */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-teal-500"
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                <HiDocumentText className="w-5 h-5 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-teal-600">{t('howItWorks.freightOwner.title')}</h3>
            </div>
            <StepList steps={stepsForOwners} color="teal" />
          </motion.div>

          {/* Drivers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-blue-500"
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <HiTruck className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-600">{t('howItWorks.driver.title')}</h3>
            </div>
            <StepList steps={stepsForDrivers} color="blue" />
          </motion.div>

          {/* Vehicle Owners */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-purple-500"
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <HiIdentification className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-purple-600">{t('howItWorks.vehicleOwner.title')}</h3>
            </div>
            <StepList steps={stepsForVehicleOwners} color="purple" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
