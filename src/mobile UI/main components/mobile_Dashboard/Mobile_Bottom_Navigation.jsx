import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  House,
  BriefcaseBusiness,
  UserRound,
  ArrowUpRight,
} from 'lucide-react'

function Mobile_Bottom_Navigation({
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
      aria-label="Mobile navigation"
      className="
        fixed bottom-0 left-0 right-0
        z-[200]
        px-3
        pb-[max(8px,env(safe-area-inset-bottom))]
        pt-2
        pointer-events-none
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          stiffness: 240,
          damping: 24,
        }}
        className="
          pointer-events-auto
          relative flex w-full items-center
          justify-between gap-1
          overflow-hidden
          rounded-[24px]
          border border-white/15
          bg-gradient-to-br
          from-[#142C4C]/[98%]
          via-[#0B1D35]/[98%]
          to-[#061225]/[98%]
          p-1.5
          shadow-[0_-4px_24px_rgba(3,12,28,0.16),0_10px_30px_rgba(3,12,28,0.28)]
          ring-1 ring-white/[0.06]
          backdrop-blur-2xl
        "
      >
        {/* Top glass reflection */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            inset-x-8 top-0 h-px
            bg-gradient-to-r
            from-transparent via-white/40 to-transparent
          "
        />

        {/* Ambient orange glow */}
        <motion.div
          aria-hidden="true"
          animate={{
            opacity: [0.08, 0.18, 0.08],
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
            h-28 w-28
            rounded-full
            bg-[#E4EFFF]/20
            blur-3xl
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
              whileTap={{ scale: 0.93 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 22,
              }}
              className={`
                relative isolate
                flex min-w-0 flex-1
                h-[54px]
                items-center justify-center
                gap-1.5
                overflow-hidden
                rounded-[18px]
                px-1
                outline-none
                focus-visible:ring-2
                focus-visible:ring-[#3478C5]
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[#0B1D35]
                ${
                  isActive
                    ? 'text-white'
                    : 'text-blue-300 active:text-white'
                }
              `}
            >
              {/* Animated active background */}
              {isActive && (
                <motion.span
                  layoutId="mobile-nav-active"
                  className="
                    absolute inset-0 -z-10
                    rounded-[18px]
                    border border-[#C8DCF7]/40
                    bg-gradient-to-br
                    from-[#3978C2]
                    via-[#6D98D0]
                    to-[#2462AC]
                    shadow-[0_4px_16px_rgba(37,99,180,0.28)]
                  "
                  transition={{
                    type: 'spring',
                    stiffness: 340,
                    damping: 28,
                  }}
                >
                  {/* Sliding light reflection */}
                  <motion.span
                    initial={{ x: '-120%', opacity: 0 }}
                    animate={{
                      x: '220%',
                      opacity: [0, 0.4, 0],
                    }}
                    transition={{
                      duration: 0.9,
                      ease: 'easeInOut',
                    }}
                    className="
                      absolute inset-y-0
                      w-8
                      -skew-x-[25deg]
                      bg-gradient-to-r
                      from-transparent
                      via-white/40
                      to-transparent
                    "
                  />
                </motion.span>
              )}

              {/* Navigation icon */}
              <motion.span
                animate={{
                  scale: isActive ? 1.08 : 1,
                  y: isActive ? -1 : 0,
                  rotate: isActive ? -3 : 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 350,
                  damping: 18,
                }}
                className="
                  relative flex shrink-0
                  items-center justify-center
                "
              >
                <Icon
                  size={21}
                  strokeWidth={isActive ? 2.6 : 2}
                />
              </motion.span>

              {/* Animated label */}
              <AnimatePresence initial={false} mode="wait">
                <motion.span
                  key={`${item.id}-${isActive}`}
                  initial={{
                    opacity: 0,
                    width: 0,
                    x: -4,
                  }}
                  animate={{
                    opacity: 1,
                    width: 'auto',
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    width: 0,
                    x: -4,
                  }}
                  transition={{ duration: 0.18 }}
                  className={`
                    overflow-hidden whitespace-nowrap
                    text-[11px]
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

              {/* Active arrow */}
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
                    transition={{ duration: 0.18 }}
                    className="
                      flex shrink-0
                      items-center justify-center
                      rounded-full
                      bg-white/20
                      p-[2px]
                    "
                  >
                    <ArrowUpRight
                      size={12}
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

export default Mobile_Bottom_Navigation