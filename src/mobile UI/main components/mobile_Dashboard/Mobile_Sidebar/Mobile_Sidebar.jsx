
import React from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion'

import {
  House,
  BriefcaseBusiness,
  ShieldCheck,
  Headset,
  Info,
  Code2,
  X,
  ChevronRight,
} from 'lucide-react'

import Mobile_Sidebar_Profile from './Mobile_Sidebar_Profile'

function Mobile_Sidebar({
  isOpen,
  onClose,
  onProfileClick,
  onHomeClick,
  onJobsClick,
  onPrivacyPolicyClick,
  onContactUsClick,
  onAboutClick,
  onDeveloperDetailsClick,
}) {
  const reduceMotion = useReducedMotion()

  const menuItems = [
    {
      label: 'Home',
      description: 'Explore your dashboard',
      icon: House,
      onClick: onHomeClick,
    },
    {
      label: 'Jobs',
      description: 'Discover opportunities',
      icon: BriefcaseBusiness,
      onClick: onJobsClick,
    },
    {
      label: 'Privacy policy',
      description: 'Your privacy and data',
      icon: ShieldCheck,
      onClick: onPrivacyPolicyClick,
    },
    {
      label: 'Contact us',
      description: 'Get help and support',
      icon: Headset,
      onClick: onContactUsClick,
    },
    {
      label: 'About',
      description: 'Learn about Work Station',
      icon: Info,
      onClick: onAboutClick,
    },
    {
      label: 'Developer Details',
      description: 'About the development team',
      icon: Code2,
      onClick: onDeveloperDetailsClick,
    },
  ]

  const handleMenuClick = (callback) => {
    onClose?.()
    callback?.()
  }

  const sidebarVariants = {
    hidden: {
      x: '-100%',
      opacity: 0.8,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: reduceMotion
        ? { duration: 0 }
        : {
            type: 'spring',
            stiffness: 320,
            damping: 32,
          },
    },
    exit: {
      x: '-100%',
      opacity: 0.8,
      transition: reduceMotion
        ? { duration: 0 }
        : {
            duration: 0.2,
            ease: 'easeInOut',
          },
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background overlay */}
          <motion.div
            key="mobile-sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.2,
            }}
            onClick={onClose}
            aria-hidden="true"
            className="
              fixed inset-0 z-[90]
              bg-blue-950/30
              backdrop-blur-[2px]
            "
          />

          {/* Mobile sidebar */}
          <motion.aside
            key="mobile-sidebar"
            id="mobile-sidebar"
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation menu"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="
              fixed inset-y-0 left-0 z-[100]
              flex w-[min(82vw,280px)] flex-col
              overflow-hidden
              border-r border-blue-200
              bg-[#E4EFFF]
              shadow-[8px_0_30px_rgba(15,23,42,0.16)]
            "
          >
            {/* Profile section */}
            <div className="relative shrink-0">
              <Mobile_Sidebar_Profile
                onClose={onClose}
                onProfileClick={onProfileClick}
              />

              {/* Close button */}
              <motion.button
                type="button"
                onClick={onClose}
                aria-label="Close sidebar"
                whileHover={
                  reduceMotion ? {} : { rotate: 90 }
                }
                whileTap={{ scale: 0.92 }}
                className="
                  absolute right-2 top-2 z-20
                  flex h-7 w-7 items-center justify-center
                  rounded-full border border-blue-200
                  bg-white/90 text-blue-700
                  shadow-sm transition-colors
                  hover:bg-blue-100 hover:text-blue-900
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-blue-200
                "
              >
                <X size={14} />
              </motion.button>
            </div>

            {/* Navigation heading */}
            <div className="shrink-0 px-4 pb-2 pt-4">
              <div className="flex items-center gap-2">
                <span
                  className="
                    h-3.5 w-[3px]
                    rounded-full bg-blue-100
                  "
                />

                <p
                  className="
                    text-[10px] font-bold uppercase
                    tracking-[1.4px] text-blue-700
                  "
                >
                  Navigation
                </p>
              </div>
            </div>

            {/* Navigation menu */}
            <nav
              aria-label="Sidebar navigation"
              className="
                min-h-0 flex-1
                overflow-y-auto overflow-x-hidden
                overscroll-contain
                px-2.5 pb-3
                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden
              "
            >
              <div className="space-y-0.5">
                {menuItems.map((item, index) => {
                  const Icon = item.icon

                  return (
                    <motion.button
                      key={item.label}
                      type="button"
                      onClick={() =>
                        handleMenuClick(item.onClick)
                      }
                      initial={{
                        opacity: 0,
                        x: reduceMotion ? 0 : -8,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.2,
                        delay: reduceMotion
                          ? 0
                          : 0.03 + index * 0.025,
                      }}
                      whileHover={
                        reduceMotion ? {} : { x: 2 }
                      }
                      whileTap={{ scale: 0.99 }}
                      className="
                        group relative flex min-h-[49px]
                        w-full items-center gap-2.5
                        overflow-hidden rounded-xl
                        px-2.5 py-1.5 text-left
                        transition-colors duration-150
                        hover:bg-blue-100/80
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-inset
                        focus-visible:ring-blue-200
                      "
                    >
                      {/* Hover indicator */}
                      <span
                        aria-hidden="true"
                        className="
                          absolute inset-y-2 left-0
                          w-[3px] rounded-full
                          bg-blue-100 opacity-0
                          transition-opacity
                          group-hover:opacity-100
                        "
                      />

                      {/* Menu icon */}
                      <span
                        className="
                          relative z-10
                          flex h-[34px] w-[34px]
                          shrink-0 items-center justify-center
                          rounded-[10px]
                          border border-blue-200/80
                          bg-white text-blue-700
                          transition-all duration-150
                          group-hover:border-blue-200
                          group-hover:bg-blue-100
                          group-hover:text-blue-950
                        "
                      >
                        <Icon
                          size={17}
                          strokeWidth={1.8}
                        />
                      </span>

                      {/* Menu label and description */}
                      <span className="relative z-10 min-w-0 flex-1">
                        <span
                          className="
                            block truncate text-[12px]
                            font-semibold leading-4
                            text-blue-900
                            group-hover:text-blue-950
                          "
                        >
                          {item.label}
                        </span>

                        <span
                          className="
                            mt-0.5 block truncate
                            text-[9px] font-normal
                            leading-3 text-blue-400
                            group-hover:text-blue-700
                          "
                        >
                          {item.description}
                        </span>
                      </span>

                      {/* Navigation arrow */}
                      <span
                        className="
                          flex h-5 w-5 shrink-0
                          items-center justify-center
                          rounded-full text-blue-400
                          opacity-0 transition-all duration-150
                          group-hover:bg-white
                          group-hover:text-blue-800
                          group-hover:opacity-100
                        "
                      >
                        <ChevronRight size={13} />
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </nav>

            {/* Footer */}
            <div
              className="
                shrink-0 border-t border-blue-200/70
                bg-white/80 px-4 py-2.5
              "
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-[10px] font-semibold text-blue-800">
                  Job Diaries
                </span>

                <span
                  className="
                    shrink-0 rounded-full
                    border border-blue-200
                    bg-blue-100 px-2 py-1
                    text-[8px] font-semibold uppercase
                    tracking-wide text-blue-700
                  "
                >
                  Job Portal
                </span>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default Mobile_Sidebar
