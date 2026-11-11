import React, {
  useEffect,
  useState,
} from 'react'

import {
  getProfileData,
} from '../../../inputs/overall/Profile_Storage'

import {
  getProfileCompletionPercentage,
} from '../../../inputs/overall/Profile_Completion_Percentage'


function Desktop_Dashboard_Profile_Previous({
  onViewProfile,
}) {

  const [profileData] = useState(
    () => getProfileData() || {}
  )


  // ============================================================
  // PROFILE COMPLETION %
  // ============================================================

  const profileCompletion =
    getProfileCompletionPercentage(
      profileData
    )


  // ============================================================
  // ANIMATED PROFILE COMPLETION
  // Starts from 0% and stops at actual completion %
  // ============================================================

  const [
    animatedCompletion,
    setAnimatedCompletion,
  ] = useState(0)


  useEffect(() => {

    const timer = setTimeout(() => {

      setAnimatedCompletion(
        profileCompletion
      )

    }, 150)

    return () => {
      clearTimeout(timer)
    }

  }, [
    profileCompletion,
  ])


  // ============================================================
  // GET VALUE
  // ============================================================

  const getValue = (
    value,
    fallback = 'Not added'
  ) => {

    if (
      value === undefined ||
      value === null ||
      String(value).trim() === ''
    ) {
      return fallback
    }

    return value
  }


  // ============================================================
  // CIRCULAR PROGRESS CALCULATION
  // ============================================================

  const circleSize = 104

  const circleRadius = 47

  const circumference =
    2 * Math.PI * circleRadius

  const progressOffset =
    circumference -
    (
      animatedCompletion / 100
    ) * circumference


  return (

    <aside
      className="
        w-full
        top-[145px]
      "
    >

      <div
        className="
          w-full
          bg-white
          rounded-[20px]
          border
          border-blue-100
          shadow-sm
          overflow-hidden
        "
      >

        {/* =====================================================
            PROFILE HEADER
        ===================================================== */}

        <div
          className="
            h-[88px]
            bg-[#2462AC]
            relative
          "
        >

          {/* =================================================
              PROFILE LOGO + PROGRESS RING
          ================================================= */}

          <div
            className="
              absolute
              left-1/2
              -translate-x-1/2
              top-[20px]
              w-[104px]
              h-[130px]
              flex
              items-center
              justify-start
              flex-col
              z-10
            "
          >

            {/* =================================================
                CIRCULAR PROGRESS
            ================================================= */}

            <svg
              width={circleSize}
              height={circleSize}
              viewBox="0 0 104 104"
              className="
                absolute
                top-0
                left-0
                rotate-90
              "
            >

              {/* =================================================
                  BACKGROUND RING
              ================================================= */}

              <circle
                cx="52"
                cy="52"
                r={circleRadius}
                fill="none"
                stroke="#C8DCF7"
                strokeWidth="4"
              />


              {/* =================================================
                  COMPLETION RING
              ================================================= */}

              <circle
                cx="52"
                cy="52"
                r={circleRadius}
                fill="none"
                stroke="#2474CC"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={progressOffset}
                className="
                  transition-all
                  duration-[1800ms]
                  ease-out
                "
              />

            </svg>


            {/* =================================================
                PROFILE IMAGE CIRCLE
            ================================================= */}

            <div
              className="
                absolute
                top-[8px]
                left-1/2
                -translate-x-1/2
                w-[88px]
                h-[88px]
                rounded-full
                bg-[#C8DCF7]
                flex
                items-center
                justify-center
                overflow-hidden
              "
            >

              {/* =================================================
                  PROFILE ICON
              ================================================= */}

              <div
                className="
                  relative
                  w-[58px]
                  h-[62px]
                "
              >

                {/* Head */}

                <div
                  className="
                    absolute
                    top-0
                    left-1/2
                    -translate-x-1/2
                    w-[28px]
                    h-[28px]
                    rounded-full
                    bg-white
                  "
                />


                {/* Body */}

                <div
                  className="
                    absolute
                    bottom-0
                    left-1/2
                    -translate-x-1/2
                    w-[58px]
                    h-[36px]
                    rounded-t-full
                    bg-white
                  "
                />

              </div>

            </div>


            {/* =================================================
                COMPLETION %
            ================================================= */}

            <div
              className="
                absolute
                top-[91px]
                left-1/2
                -translate-x-1/2
                px-1
                bg-white
                text-[#2462AC]
                text-[15px]
                leading-[18px]
                font-bold
                whitespace-nowrap
              "
            >
              {animatedCompletion}%
            </div>

          </div>

        </div>


        {/* =====================================================
            PROFILE CONTENT
        ===================================================== */}

        <div
          className="
            px-5
            pt-[58px]
            pb-5
          "
        >

          {/* =================================================
              NAME
          ================================================= */}

          <h2
            className="
              text-[18px]
              font-bold
              text-blue-900
              text-center
              truncate
            "
          >
            {
              getValue(
                profileData.name,
                'Your Name'
              )
            }
          </h2>


          {/* =================================================
              PHONE
          ================================================= */}

          <p
            className="
              mt-1
              text-[11px]
              text-blue-700
              text-center
              truncate
            "
          >
            {
              getValue(
                profileData.phoneNo,
                'Phone number not added'
              )
            }
          </p>


          {/* =================================================
              PROFILE DETAILS
          ================================================= */}

          <div
            className="
              mt-6
              space-y-4
            "
          >

            {/* =================================================
                DESIGNATION
            ================================================= */}

            <div>

              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-wide
                  text-blue-400
                "
              >
                Designation
              </p>

              <p
                className="
                  mt-1
                  text-[12px]
                  font-medium
                  text-blue-900
                  truncate
                "
              >
                {
                  getValue(
                    profileData.jobRole
                  )
                }
              </p>

            </div>


            {/* =================================================
                LOCATION
            ================================================= */}

            <div>

              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-wide
                  text-blue-400
                "
              >
                Location
              </p>

              <p
                className="
                  mt-1
                  text-[12px]
                  font-medium
                  text-blue-900
                  truncate
                "
              >
                📍 {
                  getValue(
                    profileData.currentLocation
                  )
                }
              </p>

            </div>


            {/* =================================================
                GENDER
            ================================================= */}

            <div>

              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-wide
                  text-blue-400
                "
              >
                Gender
              </p>

              <p
                className="
                  mt-1
                  text-[12px]
                  font-medium
                  text-blue-900
                  truncate
                "
              >
                {
                  getValue(
                    profileData.gender
                  )
                }
              </p>

            </div>

          </div>


          {/* =====================================================
              VIEW PROFILE BUTTON
          ===================================================== */}

          <button
            type="button"
            onClick={onViewProfile}
            className="
              mt-6
              w-full
              h-[40px]
              rounded-full
              bg-[#2462AC]
              text-[12px]
              font-bold
              text-blue-900
              hover:bg-[#2462AC]
              active:scale-[0.98]
              transition-all
            "
          >
            View Profile
          </button>

        </div>

      </div>

    </aside>
  )
}

export default Desktop_Dashboard_Profile_Previous