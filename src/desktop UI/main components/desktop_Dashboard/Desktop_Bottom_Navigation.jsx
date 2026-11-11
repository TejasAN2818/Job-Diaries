
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  House,
  BriefcaseBusiness,
  UserRound,
  ArrowUpRight,
} from 'lucide-react'

function Desktop_Bottom_Navigation({
  activeTab = 'home',
  onHomeClick,
  onJobsClick,
  onProfileClick,
}) {
  const navigationItems = [
    {
      id: 'home',
      label: 'Home',
      icon: House,
      onClick: onHomeClick,
    },
    {
      id: 'jobs',
      label: 'Jobs',
      icon: BriefcaseBusiness,
      onClick: onJobsClick,
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: UserRound,
      onClick: onProfileClick,
    },
  ]

  return (
    <nav
      aria-label="Main navigation"
      className="
        fixed bottom-5 left-1/2 -translate-x-1/2
        z-[200]
        w-[min(560px,calc(100%-32px))]
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 220,
          damping: 23,
        }}
        className="
          relative flex w-full items-center
          justify-between gap-2
          overflow-hidden
          rounded-[26px]
          border border-white/15
          bg-gradient-to-br
          from-[#142C4C]/95
          via-[#0B1D35]/95
          to-[#061225]/95
          p-2
          shadow-[0_16px_45px_rgba(3,12,28,0.38)]
          ring-1 ring-white/[0.06]
          backdrop-blur-2xl
        "
      >
        {/* Glass reflection */}
        <div
          className="
            pointer-events-none absolute inset-x-8 top-0
            h-px bg-gradient-to-r
            from-transparent via-white/50 to-transparent
          "
        />

        {/* Ambient orange glow */}
        <motion.div
          aria-hidden="true"
          animate={{
            opacity: [0.12, 0.24, 0.12],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="
            pointer-events-none absolute
            -right-8 -top-12
            h-32 w-32 rounded-full
            bg-[#E4EFFF]/20 blur-3xl
          "
        />

        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <motion.button
              key={item.id}
              type="button"
              onClick={item.onClick}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              whileHover={{ y: -2, scale: 1.025 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: 'spring',
                stiffness: 380,
                damping: 23,
              }}
              className={`
                relative isolate flex min-w-0 flex-1
                h-[50px] items-center justify-center
                gap-2 overflow-hidden
                rounded-[19px] px-2 sm:px-4
                outline-none
                focus-visible:ring-2
                focus-visible:ring-[#3478C5]
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[#0B1D35]
                ${
                  isActive
                    ? 'text-white'
                    : 'text-blue-300 hover:text-white'
                }
              `}
            >
              {/* Sliding orange active highlight */}
              {isActive && (
                <motion.span
                  layoutId="desktop-nav-active"
                  className="
                    absolute inset-0 -z-10
                    rounded-[19px]
                    border border-[#C8DCF7]/40
                    bg-gradient-to-br
                    from-[#3978C2]
                    via-[#6D98D0]
                    to-[#2462AC]
                    shadow-[0_5px_22px_rgba(37,99,180,0.32)]
                  "
                  transition={{
                    type: 'spring',
                    stiffness: 340,
                    damping: 29,
                  }}
                >
                  {/* Moving light reflection */}
                  <motion.span
                    initial={{ x: '-120%', opacity: 0 }}
                    animate={{
                      x: '220%',
                      opacity: [0, 0.45, 0],
                    }}
                    transition={{
                      duration: 1.1,
                      ease: 'easeInOut',
                    }}
                    className="
                      absolute inset-y-0 w-10
                      -skew-x-[25deg]
                      bg-gradient-to-r
                      from-transparent via-white/40 to-transparent
                    "
                  />
                </motion.span>
              )}

              {/* Icon */}
              <motion.span
                animate={{
                  scale: isActive ? 1.1 : 1,
                  rotate: isActive ? -5 : 0,
                  y: isActive ? -1 : 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 350,
                  damping: 17,
                }}
                className="relative flex shrink-0 items-center justify-center"
              >
                <Icon
                  size={21}
                  strokeWidth={isActive ? 2.6 : 2}
                />
              </motion.span>

              {/* Expanding label */}
              <AnimatePresence initial={false} mode="wait">
                <motion.span
                  key={`${item.id}-${isActive}`}
                  initial={{
                    opacity: 0,
                    width: 0,
                    x: -5,
                  }}
                  animate={{
                    opacity: 1,
                    width: 'auto',
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    width: 0,
                    x: -5,
                  }}
                  transition={{ duration: 0.2 }}
                  className={`
                    overflow-hidden whitespace-nowrap
                    text-[13px] sm:text-[14px]
                    ${
                      isActive
                        ? 'font-extrabold tracking-wide'
                        : 'font-semibold'
                    }
                  `}
                >
                  {item.label}
                </motion.span>
              </AnimatePresence>

              {/* Orange active arrow */}
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    initial={{
                      opacity: 0,
                      scale: 0.5,
                      rotate: -35,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.5,
                      rotate: -35,
                    }}
                    transition={{ duration: 0.2 }}
                    className="
                      flex shrink-0 items-center
                      justify-center rounded-full
                      bg-white/20 p-[3px]
                    "
                  >
                    <ArrowUpRight
                      size={14}
                      strokeWidth={2.7}
                    />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          )
        })}
      </motion.div>
    </nav>
  )
}

export default Desktop_Bottom_Navigation
