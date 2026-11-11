
import React, { useState } from 'react'

import {
  getProfileData,
  saveProfileData,
} from '../../../inputs/overall/Profile_Storage'

function Mobile_Login_check({ onComplete }) {
  const existingProfile = getProfileData()

  const [name, setName] = useState(existingProfile?.name || '')
  const [phoneNo, setPhoneNo] = useState(existingProfile?.phoneNo || '')
  const [currentLocation, setCurrentLocation] = useState(
    existingProfile?.currentLocation || ''
  )
  const [jobRole, setJobRole] = useState(existingProfile?.jobRole || '')
  const [gender, setGender] = useState(existingProfile?.gender || '')
  const [error, setError] = useState('')

  const genderOptions = ['Male', 'Female', 'Other']

  // ============================================================
  // MOBILE NUMBER INPUT
  // Accepts any text, numbers, country codes and special characters.
  // No length or format restriction.
  // ============================================================

  const handlePhoneChange = (e) => {
    setPhoneNo(e.target.value)
    setError('')
  }

  // ============================================================
  // SUBMIT — REQUIRED FIELDS ONLY
  // ============================================================

  const handleSubmit = (e) => {
    e.preventDefault()

    const cleanName = name.trim()
    const cleanPhone = phoneNo.trim()
    const cleanLocation = currentLocation.trim()
    const cleanDesignation = jobRole.trim()

    if (!cleanName) {
      setError('Please enter your name.')
      return
    }

    if (!cleanPhone) {
      setError('Please enter your mobile number.')
      return
    }

    if (!cleanLocation) {
      setError('Please enter your current location.')
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
    onComplete?.(updatedProfile)
  }

  // ============================================================
  // STYLES
  // ============================================================

  const inputClass = `
    h-[30px] w-full rounded-md
    border border-white/15
    bg-white/[0.06]
    pl-8 pr-2
    text-[10px] font-medium text-white
    placeholder:text-blue-700
    outline-none
    transition-all duration-200
    focus:border-blue-300
    focus:bg-white/[0.09]
    focus:ring-1 focus:ring-blue-400/20
  `

  const labelClass =
    'mb-[3px] block text-[9px] font-semibold text-blue-200'

  const iconClass = `
    pointer-events-none absolute left-2 top-1/2
    h-[13px] w-[13px] -translate-y-1/2
    text-blue-300
  `

  return (
    <div className="
      fixed inset-0 z-[1000]
      flex items-center justify-center
      overflow-hidden
      bg-blue-900/30
      px-2 py-2
    ">
      {/* FIXED SIZE POPUP: 320px x 450px */}
      <div className="
        relative flex h-[450px] w-full max-w-[320px]
        shrink-0 flex-col overflow-hidden
        rounded-[18px]
        border border-white/15
        bg-[#071719]/[0.98]
        shadow-[0_12px_35px_rgba(37,99,180,0.30)]
        animate-[loginAppear_0.3s_ease-out]
      ">
        {/* TOP ACCENT */}
        <div className="
          h-[3px] shrink-0 w-full
          bg-gradient-to-r
          from-blue-400 via-blue-300 to-black-400
        " />

        {/* COMPACT CONTENT */}
        <div className="flex min-h-0 flex-1 flex-col px-4 py-2">

          {/* BRAND */}
          <div className="mb-2 flex shrink-0 items-center justify-center gap-1.5">
            <div className="
              flex h-6 w-6 items-center justify-center
              rounded-md bg-blue-100 text-blue-900
            ">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-[14px] w-[14px]"
                aria-hidden="true"
              >
                <rect
                  x="4" y="8" width="16" height="12" rx="2"
                  stroke="currentColor" strokeWidth="2"
                />
                <path
                  d="M9 8V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V8M4 12h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h1 className="text-[13px] font-extrabold tracking-tight text-white">
              Job <span className="text-blue-700">Diaries</span>
            </h1>
          </div>

          {/* SMALL HEADING */}
          <div className="mb-2 shrink-0 text-center">
            <h2 className="text-[14px] font-extrabold leading-[17px] text-white">
              Please Enter the{' '}
              <span className="text-blue-700">Basic Details</span>
            </h2>

            <p className="mt-1 text-[9px] leading-3 text-blue-400">
              Find opportunities that match you.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex min-h-0 flex-1 flex-col"
          >

            {/* NAME */}
            <div className="mb-2 shrink-0">
              <label className={labelClass}>
                Full Name <span className="text-blue-700">*</span>
              </label>

              <div className="relative">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className={iconClass}
                  aria-hidden="true"
                >
                  <circle
                    cx="12" cy="8" r="3.5"
                    stroke="currentColor" strokeWidth="1.7"
                  />
                  <path
                    d="M5 20a7 7 0 0 1 14 0"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    setError('')
                  }}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  className={inputClass}
                />
              </div>
            </div>

            {/* MOBILE NUMBER */}
            <div className="mb-2 shrink-0">
              <label className={labelClass}>
                Mobile Number <span className="text-blue-700">*</span>
              </label>

              <div className="relative">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className={iconClass}
                  aria-hidden="true"
                >
                  <path
                    d="M7 3h3l2 5-2 2a15 15 0 0 0 4 4l2-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 5 5a2 2 0 0 1-2-2Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <input
                  type="text"
                  inputMode="text"
                  value={phoneNo}
                  onChange={handlePhoneChange}
                  placeholder="Enter mobile number"
                  autoComplete="tel"
                  className={inputClass}
                />
              </div>
            </div>

            {/* CURRENT LOCATION */}
            <div className="mb-2 shrink-0">
              <label className={labelClass}>
                Current Location <span className="text-blue-700">*</span>
              </label>

              <div className="relative">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className={iconClass}
                  aria-hidden="true"
                >
                  <path
                    d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <circle
                    cx="12" cy="10" r="2.5"
                    stroke="currentColor" strokeWidth="1.7"
                  />
                </svg>

                <input
                  type="text"
                  value={currentLocation}
                  onChange={(e) => {
                    setCurrentLocation(e.target.value)
                    setError('')
                  }}
                  placeholder="City or area"
                  autoComplete="address-level2"
                  className={inputClass}
                />
              </div>
            </div>

            {/* DESIGNATION */}
            <div className="mb-2 shrink-0">
              <label className={labelClass}>
                Designation
                <span className="ml-1 text-[8px] font-normal text-blue-400">
                  (Optional)
                </span>
              </label>

              <div className="relative">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className={iconClass}
                  aria-hidden="true"
                >
                  <rect
                    x="3" y="7" width="18" height="13" rx="2"
                    stroke="currentColor" strokeWidth="1.7"
                  />
                  <path
                    d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 12h18"
                    stroke="currentColor" strokeWidth="1.7"
                  />
                </svg>

                <input
                  type="text"
                  value={jobRole}
                  onChange={(e) => {
                    setJobRole(e.target.value)
                    setError('')
                  }}
                  placeholder="e.g. Sales Executive"
                  autoComplete="organization-title"
                  className={inputClass}
                />
              </div>
            </div>

            {/* GENDER */}
            <div className="mb-2 shrink-0">
              <label className={labelClass}>
                Gender
                <span className="ml-1 text-[8px] font-normal text-blue-400">
                  (Optional)
                </span>
              </label>

              <div className="grid grid-cols-3 gap-2">
                {genderOptions.map((option) => {
                  const selected = gender === option

                  return (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => {
                        setGender(option)
                        setError('')
                      }}
                      className={`
                        flex h-[26px] items-center justify-center gap-1
                        rounded-md border
                        text-[9px] font-bold
                        transition-all duration-200
                        active:scale-[0.97]
                        ${
                          selected
                            ? 'border-blue-200 bg-blue-100 text-blue-950'
                            : 'border-white/10 bg-white/[0.04] text-blue-300 hover:border-blue-300/40'
                        }
                      `}
                    >
                      {selected && (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-3 w-3"
                          aria-hidden="true"
                        >
                          <path
                            d="m5 12 4 4L19 6"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                      {option}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div
                role="alert"
                aria-live="polite"
                className="mb-1 shrink-0 rounded-md border border-red-400/20 bg-red-400/[0.08] px-2 py-1 text-[9px] leading-3 text-red-300"
              >
                {error}
              </div>
            )}

            {/* CONTINUE BUTTON */}
            <button
              type="submit"
              className="
                group relative mt-auto flex h-[32px] w-full
                shrink-0 items-center justify-center gap-2
                overflow-hidden rounded-lg
                border border-blue-200/20
                bg-[#E4EFFF]
                text-[10px] font-extrabold text-black
                transition-all duration-200
                hover:bg-[#E4EFFF]
                active:scale-[0.99]
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-blue-300
              "
            >
              <span className="
                pointer-events-none absolute inset-0
                -translate-x-full bg-gradient-to-r
                from-transparent via-white/10 to-transparent
                transition-transform duration-700
                group-hover:translate-x-full
              " />

              <span className="relative">Login</span>

              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="relative h-3 w-3 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path
                  d="M5 12h14m-6-6 6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* FOOTER */}
            <p className="mt-1 shrink-0 text-center text-[8px] text-blue-700">
              <span className="text-blue-700">*</span> Required fields
            </p>
          </form>
        </div>
      </div>

      {/* ANIMATION */}
      <style>{`
        @keyframes loginAppear {
          from {
            opacity: 0;
            transform: translateY(6px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  )
}

export default Mobile_Login_check
