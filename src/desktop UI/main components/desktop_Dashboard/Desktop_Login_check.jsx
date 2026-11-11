
import React, { useState } from 'react'

import {
  getProfileData,
  saveProfileData,
} from '../../../inputs/overall/Profile_Storage'

function Desktop_Login_check({ onComplete }) {
  const existingProfile = getProfileData()

  const [name, setName] = useState(existingProfile?.name || '')
  const [phoneNo, setPhoneNo] = useState(existingProfile?.phoneNo || '')
  const [currentLocation, setCurrentLocation] = useState(
    existingProfile?.currentLocation || ''
  )
  const [jobRole, setJobRole] = useState(existingProfile?.jobRole || '')
  const [gender, setGender] = useState(existingProfile?.gender || '')
  const [error, setError] = useState('')
  const [dodgeStep, setDodgeStep] = useState(0)
  const [buttonEscaped, setButtonEscaped] = useState(false)

  // ============================================================
  // REQUIRED FIELD VALIDATION
  // ============================================================

  const getMissingField = () => {
    if (!name.trim()) return 'Please enter your name.'
    if (!phoneNo.trim()) return 'Please enter your mobile number.'

    if (!currentLocation.trim()) {
      return 'Please enter your current location.'
    }

    return ''
  }

  // ============================================================
  // LOGIN BUTTON ANIMATION
  // ============================================================

  const handleButtonHover = () => {
    const missing = getMissingField()

    if (missing) {
      setError(missing)
      setButtonEscaped(true)
      setDodgeStep((previous) => (previous + 1) % 4)
    } else {
      setError('')
      setButtonEscaped(false)
    }
  }

  const dodgePositions = [
    { x: -18, y: -5 },
    { x: 18, y: 4 },
    { x: -12, y: 5 },
    { x: 12, y: -4 },
  ]

  const dodgePosition = dodgePositions[dodgeStep]

  const clearError = () => {
    setError('')
    setButtonEscaped(false)
  }

  // ============================================================
  // MOBILE NUMBER INPUT
  // Allows digits, + and spaces only.
  // Supports country codes such as +91 9876543210.
  // ============================================================

  const handlePhoneChange = (e) => {
    const numericValue = e.target.value.replace(/[^0-9+ ]/g, '')

    setPhoneNo(numericValue)
    clearError()
  }

  // ============================================================
  // SUBMIT — REQUIRED FIELD VALIDATION
  // ============================================================

  const handleSubmit = (e) => {
    e.preventDefault()

    const cleanName = name.trim()
    const cleanPhone = phoneNo.trim()
    const cleanLocation = currentLocation.trim()
    const cleanDesignation = jobRole.trim()

    if (!cleanName) {
      setError('Please enter your name.')
      setButtonEscaped(false)
      return
    }

    if (!cleanPhone) {
      setError('Please enter your mobile number.')
      setButtonEscaped(false)
      return
    }

    // Allow digits, spaces and one optional + at the beginning.
    if (!/^\+?[0-9 ]+$/.test(cleanPhone)) {
      setError('Please enter a valid mobile number.')
      setButtonEscaped(false)
      return
    }

    if (!currentLocation.trim()) {
      setError('Please enter your current location.')
      setButtonEscaped(false)
      return
    }

    const updatedProfile = {
      ...existingProfile,
      name: cleanName,
      phoneNo: cleanPhone,
      currentLocation: cleanLocation,
      jobRole: cleanDesignation,
      gender: gender || '',
    }

    const saved = saveProfileData(updatedProfile)

    if (!saved) {
      setError('Unable to save your details. Please try again.')
      return
    }

    setError('')
    setButtonEscaped(false)

    onComplete?.(updatedProfile)
  }

  // ============================================================
  // STYLES
  // ============================================================

  const inputClass = `
    h-[42px] w-full rounded-lg
    border border-white/15
    bg-white/[0.06]
    pl-10 pr-3
    text-[13px] text-white
    placeholder:text-blue-700
    outline-none
    transition-all duration-200
    hover:border-blue-300/40
    focus:border-blue-300
    focus:bg-white/[0.09]
    focus:ring-2 focus:ring-blue-400/15
  `

  const labelClass =
    'mb-1.5 block text-[12px] font-semibold text-blue-200'

  const iconClass = `
    pointer-events-none absolute left-3 top-1/2
    h-[17px] w-[17px] -translate-y-1/2
    text-blue-300
  `

  return (
    <div className="
      fixed inset-0 z-[1000]
      flex items-center justify-center
      overflow-y-auto
      bg-blue-900/20
      p-3 sm:p-5
    ">
      {/* Compact login card */}
      <div className="
        relative my-auto w-full max-w-[500px]
        overflow-hidden rounded-2xl
        border border-white/15
        bg-[#071719]/95
        shadow-[0_15px_45px_rgba(37,99,180,0.30)]
        animate-[loginAppear_0.35s_ease-out]
      ">
        {/* Top accent */}
        <div className="
          h-[3px] w-full
          bg-gradient-to-r
          from-blue-400 via-blue-300 to-blue-100
        " />

        <div className="px-5 py-4 sm:px-6 sm:py-5">

          {/* BRAND */}
          <div className="mb-4 flex items-center justify-center gap-2.5">
            <div className="
              flex h-9 w-9 items-center justify-center
              rounded-xl bg-blue-100 text-blue-900
              shadow-md shadow-blue-600/15
            ">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <rect
                  x="4" y="8" width="16" height="12" rx="2"
                  stroke="currentColor" strokeWidth="2"
                />
                <path
                  d="M9 8V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V8M4 12h16"
                  stroke="currentColor" strokeWidth="2"
                />
              </svg>
            </div>

            <h1 className="text-[19px] font-extrabold text-white">
              Job <span className="text-blue-700">Diaries</span>
            </h1>
          </div>

          {/* HEADING */}
          <div className="mb-5 text-center">
            <h2 className="text-[22px] font-extrabold tracking-tight text-white sm:text-[25px]">
              Please Fill the{' '}
              <span className="text-blue-700">Basic Details</span>
            </h2>

            <div className="
              mx-auto mt-2 h-[3px] w-12 rounded-full
              bg-blue-400 shadow-[0_0_12px_rgba(37,99,180,0.45)]
            " />
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">

              {/* NAME */}
              <div>
                <label className={labelClass}>
                  Full Name <span className="text-blue-700">*</span>
                </label>

                <div className="relative">
                  <svg viewBox="0 0 24 24" fill="none"
                    className={iconClass} aria-hidden="true">
                    <circle cx="12" cy="8" r="3.5"
                      stroke="currentColor" strokeWidth="1.7" />
                    <path d="M5 20a7 7 0 0 1 14 0"
                      stroke="currentColor" strokeWidth="1.7"
                      strokeLinecap="round" />
                  </svg>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                      clearError()
                    }}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* MOBILE NUMBER */}
              <div>
                <label className={labelClass}>
                  Mobile Number <span className="text-blue-700">*</span>
                </label>

                <div className="relative">
                  <svg viewBox="0 0 24 24" fill="none"
                    className={iconClass} aria-hidden="true">
                    <path
                      d="M7 3h3l2 5-2 2a15 15 0 0 0 4 4l2-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 5 5a2 2 0 0 1 2-2Z"
                      stroke="currentColor" strokeWidth="1.7"
                      strokeLinecap="round" strokeLinejoin="round"
                    />
                  </svg>

                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9+ ]*"
                    value={phoneNo}
                    onChange={handlePhoneChange}
                    placeholder="Enter mobile number"
                    autoComplete="tel"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* LOCATION */}
              <div>
                <label className={labelClass}>
                  Current Location <span className="text-blue-700">*</span>
                </label>

                <div className="relative">
                  <svg viewBox="0 0 24 24" fill="none"
                    className={iconClass} aria-hidden="true">
                    <path
                      d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
                      stroke="currentColor" strokeWidth="1.7"
                    />
                    <circle cx="12" cy="10" r="2.5"
                      stroke="currentColor" strokeWidth="1.7"
                    />
                  </svg>

                  <input
                    type="text"
                    value={currentLocation}
                    onChange={(e) => {
                      setCurrentLocation(e.target.value)
                      clearError()
                    }}
                    placeholder="City or area"
                    autoComplete="address-level2"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* DESIGNATION */}
              <div>
                <label className={labelClass}>
                  Designation
                  <span className="ml-1 text-[10px] text-blue-400">
                    (Optional)
                  </span>
                </label>

                <div className="relative">
                  <svg viewBox="0 0 24 24" fill="none"
                    className={iconClass} aria-hidden="true">
                    <rect x="3" y="7" width="18" height="13" rx="2"
                      stroke="currentColor" strokeWidth="1.7" />
                    <path
                      d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 12h18"
                      stroke="currentColor" strokeWidth="1.7"
                    />
                  </svg>

                  <input
                    type="text"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    placeholder="e.g. Sales Executive"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* GENDER */}
              <div className="sm:col-span-2">
                <label className={labelClass}>
                  Gender <span className="ml-1 text-[10px] text-blue-400">(Optional)</span>
                </label>

                <div className="relative">
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="
                      h-[40px] w-full appearance-none rounded-lg
                      border border-white/15 bg-[#102448]
                      px-3 text-[13px] text-white outline-none
                      transition focus:border-blue-300
                    "
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>

                  <svg viewBox="0 0 24 24" fill="none"
                    className="
                      pointer-events-none absolute right-3 top-1/2
                      h-4 w-4 -translate-y-1/2 text-blue-300
                    " aria-hidden="true">
                    <path d="m6 9 6 6 6-6"
                      stroke="currentColor" strokeWidth="1.8"
                      strokeLinecap="round" strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* VALIDATION MESSAGE */}
            <div className={`
              overflow-hidden text-center text-[11px] font-medium
              text-blue-700 transition-all duration-200
              ${error ? 'mt-3 max-h-10 opacity-100' : 'mt-0 max-h-0 opacity-0'}
            `}>
              {error || ' '}
            </div>

            {/* LOGIN BUTTON */}
            <div className="relative mt-4 flex min-h-[38px] justify-center">
              <button
                type="submit"
                onMouseEnter={handleButtonHover}
                onClick={(e) => {
                  const missing = getMissingField()

                  if (missing) {
                    e.preventDefault()
                    setError(missing)
                    setButtonEscaped(true)
                    setDodgeStep((previous) => (previous + 1) % 4)
                  }
                }}
                style={{
                  transform: buttonEscaped
                    ? `translate(${dodgePosition.x}px, ${dodgePosition.y}px)`
                    : 'translate(0, 0)',
                }}
                className="
                  group relative flex h-[34px] w-[120px]
                  items-center justify-center gap-2
                  overflow-hidden rounded-full
                  border border-blue-200/20
                  bg-[#E4EFFF]
                  text-[12px] font-semibold text-black
                  shadow-[0_0_12px_rgba(37,99,180,0.12)]
                  transition-[transform,box-shadow,background-color]
                  duration-200 ease-out
                  hover:bg-[#E4EFFF]
                  hover:shadow-[0_0_18px_rgba(37,99,180,0.25)]
                  active:scale-95
                  focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-blue-300
                "
              >
                <span className="
                  pointer-events-none absolute inset-0
                  -translate-x-full bg-gradient-to-r
                  from-transparent via-white/15 to-transparent
                  transition-transform duration-700
                  group-hover:translate-x-full
                " />

                <span className="relative">Login</span>

                <svg viewBox="0 0 24 24" fill="none"
                  className="
                    relative h-4 w-4
                    transition-transform duration-200
                    group-hover:translate-x-0.5
                  " aria-hidden="true">
                  <path d="M5 12h14m-6-6 6 6-6 6"
                    stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes loginAppear {
          from {
            opacity: 0;
            transform: translateY(8px) scale(0.99);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  )
}

export default Desktop_Login_check
