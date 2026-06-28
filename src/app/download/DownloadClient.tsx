'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import { HiQrcode } from 'react-icons/hi';
import { useTranslation } from '@/hooks/useTranslation';

export default function DownloadPage() {
  const { t } = useTranslation();

  const apps = [
    {
      id: 'owner',
      title: t('download.freightOwner.name'),
      subtitle: t('download.freightOwner.subtitle'),
      headerColor: 'bg-teal-600',
      dotColor: 'bg-teal-600',
      googlePlayColor: 'bg-teal-600 hover:bg-teal-700',
      image: '/images/image_owner-trans.png',
      imageAlt: 'Ethiochinet Freight Owner App',
      features: [
        t('download.freightOwner.features.f1'),
        t('download.freightOwner.features.f2'),
        t('download.freightOwner.features.f3'),
        t('download.freightOwner.features.f4'),
        t('download.freightOwner.features.f5'),
      ],
      appStoreHref: 'https://apps.apple.com/us/app/ethiochinet-freight-owner/id6741787980',
      googlePlayHref: 'https://play.google.com/store/apps/details?id=com.ethiochinet.ethiochinet',
      registerLabel: t('download.freightOwner.register'),
      registerHref: 'https://play.google.com/store/apps/details?id=com.ethiochinet.ethiochinet',
      registerColor: 'text-teal-600 border-teal-600 hover:bg-teal-50',
      qrLabel: t('download.freightOwner.label'),
      qrBorder: 'border-teal-200',
    },
    {
      id: 'driver',
      title: t('download.driver.name'),
      subtitle: t('download.driver.subtitle'),
      headerColor: 'bg-blue-600',
      dotColor: 'bg-blue-600',
      googlePlayColor: 'bg-blue-600 hover:bg-blue-700',
      image: '/images/image_driver-trans.png',
      imageAlt: 'Ethiochinet Driver App',
      features: [
        t('download.driver.features.f1'),
        t('download.driver.features.f2'),
        t('download.driver.features.f3'),
        t('download.driver.features.f4'),
        t('download.driver.features.f5'),
      ],
      appStoreHref: 'https://apps.apple.com/us/app/ethiochinet-driver/id6741788154',
      googlePlayHref: 'https://play.google.com/store/apps/details?id=com.ethiochinet.ethiochinet_driver',
      registerLabel: t('download.driver.register'),
      registerHref: 'https://play.google.com/store/apps/details?id=com.ethiochinet.ethiochinet_driver',
      registerColor: 'text-blue-600 border-blue-600 hover:bg-blue-50',
      qrLabel: t('download.driver.label'),
      qrBorder: 'border-blue-200',
    },
    {
      id: 'vehicle-owner',
      title: t('download.vehicleOwner.name'),
      subtitle: t('download.vehicleOwner.subtitle'),
      headerColor: 'bg-purple-600',
      dotColor: 'bg-purple-600',
      googlePlayColor: 'bg-purple-600 hover:bg-purple-700',
      image: '/images/vehilcleowner.png',
      imageAlt: 'Ethiochinet Vehicle Owner App',
      features: [
        t('download.vehicleOwner.features.f1'),
        t('download.vehicleOwner.features.f2'),
        t('download.vehicleOwner.features.f3'),
        t('download.vehicleOwner.features.f4'),
        t('download.vehicleOwner.features.f5'),
      ],
      appStoreHref: 'https://apps.apple.com/us/app/ethiochinet-vehicle-owner/id6775383998',
      googlePlayHref: 'https://play.google.com/store/apps/details?id=com.ethiochinet.ethiochinet_vehicleowner',
      registerLabel: t('download.vehicleOwner.register'),
      registerHref: 'https://play.google.com/store/apps/details?id=com.ethiochinet.ethiochinet_vehicleowner',
      registerColor: 'text-purple-600 border-purple-600 hover:bg-purple-50',
      qrLabel: t('download.vehicleOwner.label'),
      qrBorder: 'border-purple-200',
    },
  ];

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-4"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('download.pageTitle')}</h1>
          <p className="text-xl text-gray-600">{t('download.pageSubtitle')}</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
          {apps.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col"
            >
              <div className={`${app.headerColor} p-6 text-white`}>
                <h2 className="text-xl font-bold mb-1">{app.title}</h2>
                <p className="text-white/80 text-sm">{app.subtitle}</p>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-40 h-40">
                    <Image src={app.image} alt={app.imageAlt} fill className="object-contain" />
                  </div>
                </div>

                <div className="mb-6 flex-1">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                    {t('download.keyFeatures')}
                  </h3>
                  <ul className="space-y-2">
                    {app.features.map((feature, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className={`mt-1.5 w-2 h-2 flex-shrink-0 ${app.dotColor} rounded-full`}></span>
                        <span className="text-gray-700 text-sm leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  {app.appStoreHref && (
                    <a
                      href={app.appStoreHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-3 bg-gray-900 text-white px-6 py-3.5 rounded-xl hover:bg-gray-800 transition-all w-full"
                    >
                      <FaApple className="text-xl" />
                      <div className="text-left">
                        <div className="text-xs leading-none mb-0.5">{t('download.downloadOnThe')}</div>
                        <div className="text-sm font-semibold">{t('download.appStore')}</div>
                      </div>
                    </a>
                  )}

                  <a
                    href={app.googlePlayHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center space-x-3 text-white px-6 py-3.5 rounded-xl transition-all w-full ${app.googlePlayColor}`}
                  >
                    <FaGooglePlay className="text-xl" />
                    <div className="text-left">
                      <div className="text-xs leading-none mb-0.5">{t('download.getItOn')}</div>
                      <div className="text-sm font-semibold">{t('download.googlePlay')}</div>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('download.scanToDownload')}</h3>
          <p className="text-gray-600 mb-8">{t('download.scanSubtitle')}</p>
          <div className="flex flex-wrap justify-center gap-8">
            {apps.map((app) => (
              <div key={app.id} className={`bg-white p-4 rounded-2xl shadow-lg border-2 ${app.qrBorder}`}>
                <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                  <HiQrcode className="w-16 h-16 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-700">{app.qrLabel}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('download.alreadyHaveApp')}</h3>
          <p className="text-gray-600 mb-6">{t('download.jumpIn')}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            {apps.map((app) => (
              <a
                key={app.id}
                href={app.registerHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-6 py-3 bg-white rounded-lg border-2 font-medium transition-colors ${app.registerColor}`}
              >
                {app.registerLabel}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
