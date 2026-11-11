
import React, { useEffect, useState } from 'react'
import {
  getProfileCompletionPercentage,
} from '../../../../inputs/overall/Profile_Completion_Percentage'

function Desktop_ProfileHeader({
  profileData = {},
  setProfileData,
  onBack,
  onEdit,
}) {
  // =================================================
  // PROFILE COMPLETION %
  // =================================================

  const profileCompletion =
    getProfileCompletionPercentage(profileData)

  // =================================================
  // ANIMATED PROFILE COMPLETION
  // =================================================

  const [animatedCompletion, setAnimatedCompletion] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedCompletion(profileCompletion)
    }, 150)

    return () => clearTimeout(timer)
  }, [profileCompletion])

  // =================================================
  // CIRCULAR PROGRESS
  // =================================================

  const circleSize = 132
  const circleRadius = 59
  const circumference = 2 * Math.PI * circleRadius

  const progressOffset =
    circumference -
    (animatedCompletion / 100) * circumference

  // =================================================
  // EDIT POPUP STATE
  // =================================================

  const [showEditPopup, setShowEditPopup] = useState(false)

  const [editData, setEditData] = useState({
    name: profileData.name || '',
    phoneNo: profileData.phoneNo || '',
    currentLocation: profileData.currentLocation || '',
    jobRole: profileData.jobRole || '',
    gender: profileData.gender || '',
  })

  // =================================================
  // OPEN EDIT POPUP
  // =================================================

  const handleEdit = () => {
    setEditData({
      name: profileData.name || '',
      phoneNo: profileData.phoneNo || '',
      currentLocation: profileData.currentLocation || '',
      jobRole: profileData.jobRole || '',
      gender: profileData.gender || '',
    })

    setShowEditPopup(true)

    if (typeof onEdit === 'function') {
      onEdit()
    }
  }

  // =================================================
  // INPUT CHANGE
  // =================================================

  const handleChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  // =================================================
  // SAVE
  // =================================================

  const handleSave = () => {
    if (typeof setProfileData === 'function') {
      setProfileData(prev => ({
        ...prev,
        name: editData.name,
        phoneNo: editData.phoneNo,
        currentLocation: editData.currentLocation,
        jobRole: editData.jobRole,
        gender: editData.gender,
      }))
    }

    setShowEditPopup(false)
  }

  // =================================================
  // SHARED STYLES
  // =================================================

  const fieldLabelClass = `
    mb-2
    block
    text-[13px]
    font-bold
    tracking-[0.1px]
    text-blue-800
  `

  const fieldInputClass = `
    h-[48px]
    w-full
    rounded-xl
    border
    border-blue-200
    bg-blue-50
    px-4
    text-[14px]
    font-medium
    text-blue-900
    placeholder:font-normal
    placeholder:text-blue-400
    outline-none
    transition-all
    duration-200
    hover:border-blue-300
    focus:border-[#C8DCF7]
    focus:bg-white
    focus:ring-[3px]
    focus:ring-[#2462AC]/10
  `

  // =================================================
  // RETURN
  // =================================================

  return (
    <header className="w-full font-sans antialiased text-blue-900">

      {/* =================================================
          BACK BUTTON
      ================================================= */}

      <div className="mx-auto w-full max-w-[1200px] px-6 pt-5">
       
<button
  type="button"
  onClick={onBack}
  className="
    group
    fixed
    top-19
    left-6
    z-[200]
    inline-flex
    h-[38px]
    items-center
    gap-2
    rounded-full
    bg-[#2462AC]
    px-5
    text-[13px]
    font-bold
    tracking-[0.1px]
    text-white
    shadow-[0_4px_12px_rgba(37,99,180,0.18)]
    transition-all
    duration-200
    hover:-translate-y-0.5
    hover:bg-[#2462AC]
    hover:shadow-[0_7px_18px_rgba(37,99,180,0.25)]
    active:scale-95
  "
>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
    aria-hidden="true"
  >
    <path
      d="M19 12H5M12 19l-7-7 7-7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
  Back
</button>

      </div>

      {/* =================================================
          PROFILE INFORMATION
      ================================================= */}

      <div
        className="
          mx-auto
          mt-[14px]
          flex
          w-full
          max-w-[1200px]
          items-center
          rounded-[24px]
          border
          border-blue-100
          bg-white
          px-[28px]
          py-[24px]
          shadow-[0_12px_35px_rgba(15,23,42,0.06)]
          transition-shadow
          duration-300
          hover:shadow-[0_16px_42px_rgba(15,23,42,0.09)]
        "
        style={{ animation: 'profileHeaderIn 400ms ease-out' }}
      >

        {/* =================================================
            PROFILE PHOTO + COMPLETION RING
        ================================================= */}

        <div className="relative flex h-[145px] w-[132px] shrink-0 items-start justify-center">

          {/* PROGRESS RING */}

          <svg
            width={circleSize}
            height={circleSize}
            viewBox="0 0 132 132"
            className="absolute left-1/2 top-0 -translate-x-1/2 rotate-90"
            aria-label={`Profile ${animatedCompletion}% complete`}
            role="img"
          >
            <circle
              cx="66"
              cy="66"
              r={circleRadius}
              fill="none"
              stroke="#E4EFFF"
              strokeWidth="5"
            />

            <circle
              cx="66"
              cy="66"
              r={circleRadius}
              fill="none"
              stroke="#237bff"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={progressOffset}
              className="transition-all duration-[1800ms] ease-out"
              style={{
                filter: 'drop-shadow(0 2px 3px rgba(37,99,180,0.2))',
              }}
            />
          </svg>

          {/* PROFILE AVATAR */}

          <div
            className="
              absolute
              left-1/2
              top-[7px]
              flex
              h-[118px]
              w-[118px]
              -translate-x-1/2
              items-center
              justify-center
              overflow-hidden
              rounded-full
              border-[3px]
              border-white
              bg-gradient-to-br
              from-blue-200
              to-blue-300
              shadow-inner
            "
          >
            {/* HEAD */}

            <div
              className="
                absolute
                left-1/2
                top-[22px]
                h-[34px]
                w-[34px]
                -translate-x-1/2
                rounded-full
                bg-white
                shadow-sm
              "
            />

            {/* BODY */}

            <div
              className="
                absolute
                bottom-[12px]
                left-1/2
                h-[43px]
                w-[72px]
                -translate-x-1/2
                rounded-t-full
                bg-white
              "
            />
          </div>

          {/* COMPLETION % */}

          <div
            className="
              absolute
              left-1/2
              top-[119px]
              z-10
              -translate-x-1/2
              whitespace-nowrap
              rounded-full
              border
              border-blue-200
              bg-white
              px-2
              py-0.5
              text-[15px]
              font-extrabold
              leading-[20px]
              text-blue-700
              shadow-sm
            "
          >
            {animatedCompletion}%
          </div>
        </div>

        {/* =================================================
            PROFILE DETAILS
        ================================================= */}

        <div className="ml-[24px] min-w-0 flex-1">

          {/* NAME */}

          <h1
            className="
              truncate
              text-[27px]
              font-extrabold
              leading-[34px]
              tracking-[-0.7px]
              text-blue-950
            "
          >
            {profileData.name || 'Your Name'}
          </h1>

          {/* PHONE */}

          <p className="mt-1 truncate text-[16px] font-medium tracking-[0.1px] text-blue-700">
            {profileData.phoneNo || 'Phone Number'}
          </p>

          {/* DESIGNATION */}

          <div className="mt-[14px] flex min-w-0 items-center gap-2">
            <span className="shrink-0 text-[12px] font-bold uppercase tracking-[0.7px] text-blue-400">
              Designation
            </span>

            <span className="truncate text-[13px] font-semibold text-blue-900">
              {profileData.jobRole || 'Not added'}
            </span>
          </div>

          {/* LOCATION */}

          <div className="mt-[8px] flex min-w-0 items-center gap-2">
            <span className="shrink-0 text-[12px] font-bold uppercase tracking-[0.7px] text-blue-400">
              Location
            </span>

            <span className="truncate text-[13px] font-semibold text-blue-900">
              {profileData.currentLocation || 'Not added'}
            </span>
          </div>
        </div>

        {/* =================================================
            EDIT BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={handleEdit}
          aria-label="Edit profile"
          title="Edit profile"
          className="
            group
            ml-[24px]
            flex
            h-[46px]
            w-[46px]
            shrink-0
            items-center
            justify-center
            rounded-2xl
            border
            border-blue-200
            bg-white
            text-blue-800
            shadow-sm
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:border-[#C8DCF7]
            hover:bg-[#E4EFFF]
            hover:text-[#2462AC]
            hover:shadow-[0_8px_18px_rgba(37,99,180,0.12)]
            active:scale-90
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#2462AC]
            focus-visible:ring-offset-2
          "
        >
          <svg
            viewBox="0 0 24 24"
            className="h-[21px] w-[21px] transition-transform duration-200 group-hover:rotate-[-8deg]"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 20h9"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* =================================================
          EDIT PROFILE POPUP
      ================================================= */}

      {showEditPopup && (
        <div
          className="
            fixed
            inset-0
            z-[300]
            flex
            items-center
            justify-center
            bg-blue-950/55
            p-6
            backdrop-blur-[5px]
          "
          onClick={() => setShowEditPopup(false)}
          style={{ animation: 'profileOverlayIn 200ms ease-out' }}
        >
          <div
            className="
              w-full
              max-w-[620px]
              overflow-hidden
              rounded-[24px]
              border
              border-white/70
              bg-white
              shadow-[0_30px_90px_rgba(15,23,42,0.28)]
            "
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'profilePopupIn 300ms cubic-bezier(0.16,1,0.3,1)' }}
          >

            {/* POPUP HEADER */}

            <div
              className="
                relative
                flex
                items-center
                justify-between
                border-b
                border-blue-100
                bg-white
                px-[28px]
                py-[20px]
              "
            >
              <div className="absolute left-0 right-0 top-0 h-[4px] bg-gradient-to-r from-[#E4EFFF] via-[#E4EFFF] to-[#2462AC]" />

              <div>
                <h2 className="text-[22px] font-extrabold tracking-[-0.5px] text-blue-950">
                  Edit Profile
                </h2>

                <p className="mt-1 text-[13px] font-medium text-blue-700">
                  Update your basic information
                </p>
              </div>

              {/* CLOSE */}

              <button
                type="button"
                onClick={() => setShowEditPopup(false)}
                aria-label="Close edit profile"
                className="
                  flex
                  h-[38px]
                  w-[38px]
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-blue-200
                  bg-blue-50
                  text-[23px]
                  leading-none
                  text-blue-700
                  transition-all
                  duration-200
                  hover:rotate-90
                  hover:border-red-200
                  hover:bg-red-50
                  hover:text-red-600
                  active:scale-90
                "
              >
                ×
              </button>
            </div>

            {/* FORM */}

            <div
              className="
                max-h-[65vh]
                overflow-y-auto
                px-[28px]
                py-[24px]
                [scrollbar-width:thin]
                [scrollbar-color:#2462AC_#F1F5F9]
              "
            >
              <div className="grid grid-cols-2 gap-x-[18px] gap-y-[20px]">

                {/* NAME */}

                <div className="min-w-0">
                  <label className={fieldLabelClass}>
                    Name
                  </label>

                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      handleChange('name', e.target.value)
                    }
                    placeholder="Enter your name"
                    className={fieldInputClass}
                  />
                </div>

                {/* PHONE */}

                <div className="min-w-0">
                  <label className={fieldLabelClass}>
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    value={editData.phoneNo}
                    onChange={(e) =>
                      handleChange('phoneNo', e.target.value)
                    }
                    placeholder="Enter phone number"
                    className={fieldInputClass}
                  />
                </div>

                {/* LOCATION */}

                <div className="min-w-0">
                  <label className={fieldLabelClass}>
                    Location
                  </label>

                  <input
                    type="text"
                    value={editData.currentLocation}
                    onChange={(e) =>
                      handleChange('currentLocation', e.target.value)
                    }
                    placeholder="Enter current location"
                    className={fieldInputClass}
                  />
                </div>

                {/* DESIGNATION */}

                <div className="min-w-0">
                  <label className={fieldLabelClass}>
                    Designation
                  </label>

                  <input
                    type="text"
                    value={editData.jobRole}
                    onChange={(e) =>
                      handleChange('jobRole', e.target.value)
                    }
                    placeholder="Enter designation"
                    className={fieldInputClass}
                  />
                </div>

                {/* GENDER */}

                <div className="col-span-2">
                  <label className={fieldLabelClass}>
                    Gender
                  </label>

                  <div className="grid grid-cols-3 gap-[10px]">
                    {['Male', 'Female', 'Other'].map((gender) => {
                      const isSelected = editData.gender === gender

                      return (
                        <button
                          key={gender}
                          type="button"
                          onClick={() => handleChange('gender', gender)}
                          aria-pressed={isSelected}
                          className={`
                            flex
                            h-[46px]
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            border
                            text-[13px]
                            font-bold
                            transition-all
                            duration-200
                            active:scale-[0.98]
                            ${
                              isSelected
                                ? 'border-[#C8DCF7] bg-[#E4EFFF] text-[#2462AC] shadow-[0_0_0_2px_rgba(37,99,180,0.08)]'
                                : 'border-blue-200 bg-blue-50 text-blue-700 hover:border-blue-300 hover:bg-white'
                            }
                          `}
                        >
                          {isSelected && (
                            <svg
                              viewBox="0 0 20 20"
                              className="h-4 w-4"
                              fill="none"
                              aria-hidden="true"
                            >
                              <path
                                d="m4 10 4 4 8-8"
                                stroke="currentColor"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}

                          {gender}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* SAVE BUTTON */}

            <div className="border-t border-blue-100 bg-white px-[28px] pb-[24px] pt-[16px]">
              <button
                type="button"
                onClick={handleSave}
                className="
                  flex
                  h-[49px]
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-[#2462AC]
                  to-[#2462AC]
                  text-[14px]
                  font-extrabold
                  tracking-[0.2px]
                  text-white
                  shadow-[0_6px_16px_rgba(37,99,180,0.2)]
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:shadow-[0_9px_22px_rgba(37,99,180,0.28)]
                  active:scale-[0.98]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#2462AC]
                  focus-visible:ring-offset-2
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-[18px] w-[18px]"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="m5 12 4 4L19 6"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================
          ANIMATIONS
      ================================================= */}

      <style>{`
        @keyframes profileHeaderIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes profileOverlayIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes profilePopupIn {
          from {
            opacity: 0;
            transform: translateY(14px) scale(0.985);
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
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </header>
  )
}

export default Desktop_ProfileHeader
