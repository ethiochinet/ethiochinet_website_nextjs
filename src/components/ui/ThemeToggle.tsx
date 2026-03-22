// 'use client';

// import { useState, useEffect } from 'react';
// import { useTheme } from 'next-themes';
// import { motion, AnimatePresence } from 'framer-motion';
// import { HiSun, HiMoon, HiComputerDesktop } from 'react-icons/hi';

// export default function ThemeToggle() {
//   const [mounted, setMounted] = useState(false);
//   const { theme, setTheme } = useTheme();
//   const [isOpen, setIsOpen] = useState(false);

//   // Prevent hydration mismatch
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return null;
//   }

//   const themes = [
//     { 
//       name: 'Light', 
//       value: 'light', 
//       icon: HiSun,
//       description: 'Bright and clean'
//     },
//     { 
//       name: 'Dark', 
//       value: 'dark', 
//       icon: HiMoon,
//       description: 'Easy on the eyes'
//     },
//     { 
//       name: 'System', 
//       value: 'system', 
//       icon: HiComputerDesktop,
//       description: 'Follows your system'
//     },
//   ];

//   const currentTheme = themes.find(t => t.value === theme) || themes[0];
//   const CurrentIcon = currentTheme.icon;

//   // Get theme color for icon
//   const getThemeColor = (themeValue: string) => {
//     switch(themeValue) {
//       case 'light':
//         return 'text-yellow-500';
//       case 'dark':
//         return 'text-indigo-400';
//       case 'system':
//         return 'text-teal-500';
//       default:
//         return 'text-gray-500';
//     }
//   };

//   return (
//     <div className="relative">
//       {/* Main toggle button */}
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => setIsOpen(!isOpen)}
//         className={`
//           relative p-2 rounded-lg transition-all duration-200
//           ${theme === 'dark' 
//             ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
//             : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
//           }
//           focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
//           dark:focus:ring-offset-gray-900
//         `}
//         aria-label="Toggle theme"
//       >
//         <CurrentIcon className={`w-5 h-5 ${getThemeColor(theme)}`} />
        
//         {/* Pulse dot indicator */}
//         <span className="absolute top-0 right-0 w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
//       </motion.button>

//       {/* Dropdown menu */}
//       <AnimatePresence>
//         {isOpen && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsOpen(false)}
//               className="fixed inset-0 z-40"
//             />

//             {/* Menu */}
//             <motion.div
//               initial={{ opacity: 0, y: -10, scale: 0.95 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: -10, scale: 0.95 }}
//               transition={{ duration: 0.15, ease: "easeOut" }}
//               className={`
//                 absolute right-0 mt-2 w-56 rounded-xl shadow-xl overflow-hidden z-50
//                 ${theme === 'dark'
//                   ? 'bg-gray-800 border border-gray-700'
//                   : 'bg-white border border-gray-200'
//                 }
//               `}
//             >
//               {/* Header */}
//               <div className={`
//                 px-4 py-3 border-b
//                 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}
//               `}>
//                 <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
//                   Theme preference
//                 </h3>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
//                   Choose your display theme
//                 </p>
//               </div>

//               {/* Theme options */}
//               <div className="p-2">
//                 {themes.map(({ name, value, icon: Icon, description }) => {
//                   const isActive = theme === value;
                  
//                   return (
//                     <motion.button
//                       key={value}
//                       whileHover={{ x: 4 }}
//                       onClick={() => {
//                         setTheme(value);
//                         setIsOpen(false);
//                       }}
//                       className={`
//                         w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg
//                         transition-all duration-200 group relative
//                         ${isActive
//                           ? theme === 'dark'
//                             ? 'bg-teal-900/30 text-teal-400'
//                             : 'bg-teal-50 text-teal-600'
//                           : theme === 'dark'
//                             ? 'hover:bg-gray-700 text-gray-300'
//                             : 'hover:bg-gray-50 text-gray-700'
//                         }
//                       `}
//                     >
//                       {/* Icon */}
//                       <div className={`
//                         relative flex items-center justify-center w-8 h-8 rounded-lg
//                         ${isActive
//                           ? theme === 'dark'
//                             ? 'bg-teal-900/50'
//                             : 'bg-teal-100'
//                           : theme === 'dark'
//                             ? 'bg-gray-700'
//                             : 'bg-gray-100'
//                         }
//                       `}>
//                         <Icon className={`
//                           w-4 h-4
//                           ${isActive
//                             ? theme === 'dark'
//                               ? 'text-teal-400'
//                               : 'text-teal-600'
//                             : theme === 'dark'
//                               ? 'text-gray-400'
//                               : 'text-gray-500'
//                           }
//                         `} />
                        
//                         {/* Active indicator dot */}
//                         {isActive && (
//                           <motion.span
//                             layoutId="activeTheme"
//                             className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-teal-500 rounded-full"
//                             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                           />
//                         )}
//                       </div>

//                       {/* Text */}
//                       <div className="flex-1 text-left">
//                         <p className={`
//                           text-sm font-medium
//                           ${isActive
//                             ? theme === 'dark'
//                               ? 'text-teal-400'
//                               : 'text-teal-600'
//                             : theme === 'dark'
//                               ? 'text-gray-200'
//                               : 'text-gray-900'
//                           }
//                         `}>
//                           {name}
//                         </p>
//                         <p className={`
//                           text-xs
//                           ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}
//                         `}>
//                           {description}
//                         </p>
//                       </div>

//                       {/* Checkmark for active */}
//                       {isActive && (
//                         <motion.div
//                           initial={{ scale: 0 }}
//                           animate={{ scale: 1 }}
//                           className={`
//                             w-5 h-5 rounded-full flex items-center justify-center
//                             ${theme === 'dark' ? 'bg-teal-400' : 'bg-teal-600'}
//                           `}
//                         >
//                           <svg 
//                             className="w-3 h-3 text-white" 
//                             fill="none" 
//                             viewBox="0 0 24 24" 
//                             stroke="currentColor"
//                           >
//                             <path 
//                               strokeLinecap="round" 
//                               strokeLinejoin="round" 
//                               strokeWidth={2.5} 
//                               d="M5 13l4 4L19 7" 
//                             />
//                           </svg>
//                         </motion.div>
//                       )}
//                     </motion.button>
//                   );
//                 })}
//               </div>

//               {/* Footer with current theme info */}
//               <div className={`
//                 px-4 py-2 border-t
//                 ${theme === 'dark' ? 'border-gray-700 bg-gray-900/50' : 'border-gray-100 bg-gray-50'}
//               `}>
//                 <div className="flex items-center justify-between">
//                   <span className="text-xs text-gray-500 dark:text-gray-400">
//                     Current: {currentTheme.name}
//                   </span>
//                   <span className="text-xs text-teal-600 dark:text-teal-400">
//                     {theme === 'system' 
//                       ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Dark' : 'Light')
//                       : ''
//                     }
//                   </span>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }