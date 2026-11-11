
import React, { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  UserRound,
  MapPin,
  Phone,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react'

import { getProfileData } from '../../../../inputs/overall/Profile_Storage'
import { getProfileCompletionPercentage } from '../../../../inputs/overall/Profile_Completion_Percentage'

function Mobile_Sidebar_Profile({
  onClose,
  onProfileClick,
}) {
  const reduceMotion = useReducedMotion()
  const profileData = getProfileData()

  // Profile details
  const name = String(profileData?.name || '').trim()
  const phoneNo = String(profileData?.phoneNo || '').trim()
  const currentLocation = String(
    profileData?.currentLocation || ''
  ).trim()

  // Profile completion
  const profileCompletion = Math.min(
    100,
    Math.max(
      0,
      Number(getProfileCompletionPercentage(profileData)) || 0
    )
  )

  // Animated completion percentage
  const [animatedCompletion, setAnimatedCompletion] = useState(0)

  useEffect(() => {
    if (reduceMotion) {
      setAnimatedCompletion(profileCompletion)
      return
    }

    const timer = setTimeout(() => {
      setAnimatedCompletion(profileCompletion)
    }, 150)

    return () => clearTimeout(timer)
  }, [profileCompletion, reduceMotion])

  // Circular progress calculation
  const circleRadius = 31
  const circumference = 2 * Math.PI * circleRadius

  const progressOffset =
    circumference -
    (animatedCompletion / 100) * circumference

  // Open profile page
  const handleProfileClick = () => {
    onClose?.()
    onProfileClick?.()
  }

  return (
    <motion.button
      type="button"
      onClick={handleProfileClick}
      whileHover={
        reduceMotion
          ? undefined
          : { backgroundColor: '#3478C5' }
      }
      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
      transition={{ duration: 0.2 }}
      aria-label="Open your profile"
      className="
        group relative flex h-[96px] w-full
        items-center gap-2.5 overflow-hidden
        border-b border-blue-200/70
        bg-gradient-to-br from-[#E4EFFF]
        via-[#E4EFFF] to-[#E4EFFF]
        px-3 text-left
        outline-none
        focus-visible:ring-2
        focus-visible:ring-inset
        focus-visible:ring-blue-200
      "
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-7 -top-8 h-20 w-20
          rounded-full bg-white/30 blur-2xl
        "
      />

      {/* Avatar and progress ring */}
      <div className="relative z-10 h-[74px] w-[74px] shrink-0">
        <svg
          width="74"
          height="74"
          viewBox="0 0 72 72"
          className="absolute inset-0 rotate-90"
          aria-hidden="true"
        >
          {/* Background ring */}
          <circle
            cx="36"
            cy="36"
            r={circleRadius}
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity="0.9"
            strokeWidth="3"
          />

          {/* Animated progress ring */}
          <motion.circle
            cx="36"
            cy="36"
            r={circleRadius}
            fill="none"
            stroke="#258FFF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={false}
            animate={{ strokeDashoffset: progressOffset }}
            transition={{
              duration: reduceMotion ? 0 : 1.2,
              ease: 'easeOut',
            }}
          />
        </svg>

        {/* Avatar */}
        <div
          className="
            absolute left-1/2 top-1/2
            flex h-[58px] w-[58px]
            -translate-x-1/2 -translate-y-1/2
            items-center justify-center
            rounded-full border-2 border-white
            bg-gradient-to-br from-[#F4F8FF] to-[#DCE5EF]
            text-[#173B68] shadow-sm
            transition-transform duration-200
            group-hover:scale-[1.03]
          "
        >
          <UserRound size={27} strokeWidth={1.6} />
        </div>

        {/* Completion percentage */}
        <span
          className="
            absolute -bottom-0.5 left-1/2
            -translate-x-1/2 whitespace-nowrap
            rounded-full border border-white
            bg-[#173B68] px-1.5 py-[2px]
            text-[9px] font-bold leading-tight
            text-white shadow-sm
          "
        >
          {animatedCompletion}%
        </span>
      </div>

      {/* User details */}
      <div className="relative z-10 min-w-0 flex-1">
        <h2 className="truncate text-[12px] font-bold text-blue-900">
          {name || 'Welcome, User'}
        </h2>

        {/* Phone number */}
        <div className="mt-1 flex min-w-0 items-center gap-1 text-blue-800">
          <Phone size={11} className="shrink-0" />
          <span className="truncate text-[10px] font-medium">
            {phoneNo || 'Mobile number not added'}
          </span>
        </div>

        {/* Location */}
        <div className="mt-0.5 flex min-w-0 items-center gap-1 text-blue-800">
          <MapPin size={11} className="shrink-0" />
          <span className="truncate text-[10px] font-medium">
            {currentLocation || 'Location not added'}
          </span>
        </div>

        {/* Profile action */}
        <div className="mt-1.5">
          <motion.span
            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
            className="
              inline-flex max-w-full items-center gap-1
              rounded-md bg-[#173B68]
              px-2 py-1 text-[9px] font-semibold
              text-white shadow-sm
              transition-colors duration-200
              group-hover:bg-[#0B2545]
            "
          >
            <Sparkles
              size={10}
              className="shrink-0 text-[#2462AC]"
            />

            <span className="truncate">
              {animatedCompletion >= 100
                ? 'Profile completed'
                : 'Complete your profile'}
            </span>

            <motion.span
              animate={{
                x: reduceMotion ? 0 : [0, 2, 0],
              }}
              transition={{
                duration: 1.3,
                repeat: reduceMotion ? 0 : Infinity,
                ease: 'easeInOut',
              }}
              className="flex shrink-0 text-[#2462AC]"
            >
              <ArrowUpRight size={11} />
            </motion.span>
          </motion.span>
        </div>
      </div>
    </motion.button>
  )
}

export default Mobile_Sidebar_Profile
