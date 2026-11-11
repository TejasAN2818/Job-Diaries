import React, { useState } from 'react'

function Mobile_JobDetails({ job, onBack, onApply }) {
  const [isApplied, setIsApplied] = useState(false)
  const [isApplying, setIsApplying] = useState(false)

  const handleApplyClick = () => {
    if (isApplied || isApplying) return

    setIsApplying(true)

    // Keep the existing application callback unchanged.
    onApply?.(job)

    // Match Mobile_JobCard: show the success state after one second.
    setTimeout(() => {
      setIsApplying(false)
      setIsApplied(true)
    }, 1000)
  }

  if (!job) return null

  return (
    <div className="h-screen bg-[#F4F8FF] font-sans text-blue-900 flex flex-col overflow-hidden">

      {/* =====================================================
          TOP COMPANY SECTION
      ===================================================== */}

      <div className="
        relative
        w-full
        h-[170px]
        shrink-0
        bg-gradient-to-r from-[#E4EFFF] via-[#E4EFFF] to-[#E4EFFF]
        flex
        items-center
        justify-center
      ">

        {/* Company Logo */}
        <div className="
          w-[142px]
          h-[132px]
          bg-white
          rounded-[22px] border border-white/80
          flex
          items-center
          justify-center
          p-3
          shadow-[0_8px_24px_rgba(15,23,42,0.12)]
        ">

          {job.companyLogo ? (

            <img
              src={job.companyLogo}
              alt={job.companyName}
              className="
                w-full
                h-full
                object-contain
                rounded-[12px]
              "
            />

          ) : (

            <div className="
              w-full
              h-full
              rounded-[18px]
              bg-gradient-to-br from-[#397BC8] to-[#2462AC]
              flex
              items-center
              justify-center
              px-2
            ">

              <span className="
                text-blue-900
                text-[18px]
                font-bold
                text-center
              ">
                {job.companyName || 'Company'}
              </span>

            </div>

          )}

        </div>


        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          className="
            absolute
            top-2
            left-2
            bg-blue-900
            text-white
            text-[12px]
            px-3
            py-1
            rounded-full
          "
        >
          ← Back
        </button>


        {/* Posted Date */}
        <span className="
          absolute
          top-2
          right-2
          bg-white
          rounded-full
          px-3
          py-1
          text-[10px]
          text-blue-800
        ">
          {job.postedDate}
        </span>

      </div>


      {/* =====================================================
          SCROLLABLE MAIN CONTENT
      ===================================================== */}

      <div className="
        flex-1
        overflow-y-auto
        px-3
        pb-28
        scrollbar-hide
      ">

        {/* =====================================================
            JOB TITLE
        ===================================================== */}

        <div className="mt-3">

          <h1 className="
            text-[22px] font-extrabold leading-7 tracking-tight text-blue-950
          ">
            {job.jobTitle}
          </h1>

          <p className="
            mt-1
            text-[12px]
            text-blue-700
          ">
            {job.companyName}
          </p>

        </div>


        {/* =====================================================
            LOCATION
        ===================================================== */}

        <div className="
          mt-3
          flex
          items-center
          gap-1
        ">

          <span className="text-red-500 text-[13px]">
            ●
          </span>

          <span className="
            text-[10px]
            font-medium
            text-blue-900
          ">
            {job.location}
          </span>

        </div>


        {/* =====================================================
            SALARY + EXPERIENCE
        ===================================================== */}

        <div className="
          mt-3
          bg-white
          border
          border-blue-100
          rounded-[14px]
          p-3
          flex
        ">

          {/* Salary */}
          <div className="
            w-1/2
            pr-2
            border-r
            border-blue-100
          ">

            <p className="
              text-[10px]
              text-blue-700
            ">
              Salary
            </p>

            <p className="
              mt-1
              text-[13px]
              font-bold
              text-blue-700
            ">
              {job.salary}
            </p>

          </div>


          {/* Experience */}
          <div className="w-1/2 pl-3">

            <p className="
              text-[10px]
              text-blue-700
            ">
              Experience
            </p>

            <p className="
              mt-1
              text-[12px]
              font-semibold
              text-blue-900
            ">
              {job.workExperience}
            </p>

          </div>

        </div>


        {/* =====================================================
            BASIC JOB INFORMATION
        ===================================================== */}

        <div className="
          mt-4
          bg-white
          rounded-[18px] border border-blue-100 shadow-[0_4px_16px_rgba(15,23,42,0.05)]
          p-4
        ">

          <h2 className="
            text-[14px] font-extrabold tracking-tight text-blue-900
            mb-3
          ">
            Job Information
          </h2>


          {/* Company */}
          <div className="
            flex
            justify-between
            gap-3
            py-1.5
            border-b
            border-blue-100
          ">

            <span className="text-[10px] font-medium text-blue-700">
              Company
            </span>

            <span className="
              text-[10px]
              font-semibold
              text-blue-900
              text-right
            ">
              {job.companyName}
            </span>

          </div>


          {/* Job Order */}
          <div className="
            flex
            justify-between
            gap-3
            py-1.5
            border-b
            border-blue-100
          ">

            <span className="text-[10px] font-medium text-blue-700">
              Job Order
            </span>

            <span className="
              text-[10px]
              font-semibold
              text-blue-900
            ">
              {job.jobOrder}
            </span>

          </div>


          {/* Fixed Salary */}
          <div className="
            flex
            justify-between
            gap-3
            py-1.5
            border-b
            border-blue-100
          ">

            <span className="text-[10px] font-medium text-blue-700">
              Fixed Salary
            </span>

            <span className="
              text-[10px]
              font-semibold
              text-blue-900
            ">
              {job.fixedSalary}
            </span>

          </div>


          {/* Incentives */}
          <div className="
            flex
            justify-between
            gap-3
            py-1.5
            border-b
            border-blue-100
          ">

            <span className="text-[10px] font-medium text-blue-700">
              Incentives
            </span>

            <span className="
              text-[10px]
              font-semibold
              text-blue-900
              text-right
            ">
              {job.incentives}
            </span>

          </div>


          {/* Working Days */}
          <div className="
            flex
            justify-between
            gap-3
            py-1.5
            border-b
            border-blue-100
          ">

            <span className="text-[10px] font-medium text-blue-700">
              Working Days
            </span>

            <span className="
              text-[10px]
              font-semibold
              text-blue-900
            ">
              {job.workingDays}
            </span>

          </div>


          {/* Office Timing */}
          <div className="
            flex
            justify-between
            gap-3
            py-1.5
            border-b
            border-blue-100
          ">

            <span className="text-[10px] font-medium text-blue-700">
              Office Timing
            </span>

            <span className="
              text-[10px]
              font-semibold
              text-blue-900
              text-right
            ">
              {job.officeTiming}
            </span>

          </div>


          {/* Shift */}
          <div className="
            flex
            justify-between
            gap-3
            py-1.5
            border-b
            border-blue-100
          ">

            <span className="text-[10px] font-medium text-blue-700">
              Shift
            </span>

            <span className="
              text-[10px]
              font-semibold
              text-blue-900
            ">
              {job.sfift}
            </span>

          </div>


          {/* Age */}
          <div className="
            flex
            justify-between
            gap-3
            py-1.5
            border-b
            border-blue-100
          ">

            <span className="text-[10px] font-medium text-blue-700">
              Age Limit
            </span>

            <span className="
              text-[10px]
              font-semibold
              text-blue-900
            ">
              {job.ageLimit}
            </span>

          </div>


          {/* Gender */}
          <div className="
            flex
            justify-between
            gap-3
            py-1.5
            border-b
            border-blue-100
          ">

            <span className="text-[10px] font-medium text-blue-700">
              Gender
            </span>

            <span className="
              text-[10px]
              font-semibold
              text-blue-900
            ">
              {job.gender}
            </span>

          </div>


          {/* Employment */}
          <div className="
            flex
            justify-between
            gap-3
            py-1.5
            border-b
            border-blue-100
          ">

            <span className="text-[10px] font-medium text-blue-700">
              Employment Type
            </span>

            <span className="
              text-[10px]
              font-semibold
              text-blue-900
            ">
              {job.employmentType}
            </span>

          </div>


          {/* Work Mode */}
          <div className="
            flex
            justify-between
            gap-3
            py-1.5
            border-b
            border-blue-100
          ">

            <span className="text-[10px] font-medium text-blue-700">
              Work Mode
            </span>

            <span className="
              text-[10px]
              font-semibold
              text-blue-900
            ">
              {job.workMode}
            </span>

          </div>


          {/* Openings */}
          <div className="
            flex
            justify-between
            gap-3
            py-1.5
            border-b
            border-blue-100
          ">

            <span className="text-[10px] font-medium text-blue-700">
              Number of Openings
            </span>

            <span className="
              text-[10px]
              font-semibold
              text-blue-900
            ">
              {job.numberOfOpenings}
            </span>

          </div>


          {/* Industry */}
          <div className="
            flex
            justify-between
            gap-3
            py-1.5
            border-b
            border-blue-100
          ">

            <span className="text-[10px] font-medium text-blue-700">
              Industry
            </span>

            <span className="
              text-[10px]
              font-semibold
              text-blue-900
              text-right
            ">
              {job.industryType}
            </span>

          </div>


          {/* Qualification */}
          <div className="
            flex
            justify-between
            gap-3
            py-1.5
          ">

            <span className="text-[10px] font-medium text-blue-700">
              Qualification
            </span>

            <span className="
              text-[10px]
              font-semibold
              text-blue-900
              text-right
            ">
              {job.educationQualification}
            </span>

          </div>

        </div>


        {/* =====================================================
            INCENTIVE DETAILS
        ===================================================== */}

        <div className="
          mt-3
          bg-white
          rounded-[18px] border border-blue-100 shadow-[0_4px_16px_rgba(15,23,42,0.05)]
          p-4
        ">

          <h2 className="
            text-[14px] font-extrabold tracking-tight text-blue-900
          ">
            Incentive Details
          </h2>

          <p className="
            mt-2
            text-[10px]
            leading-4
            text-blue-700
          ">
            {job.incentiveDetails}
          </p>

        </div>


        {/* =====================================================
            LANGUAGES
        ===================================================== */}

        <div className="
          mt-3
          bg-white
          rounded-[18px] border border-blue-100 shadow-[0_4px_16px_rgba(15,23,42,0.05)]
          p-4
        ">

          <h2 className="
            text-[14px] font-extrabold tracking-tight text-blue-900
          ">
            Languages Required
          </h2>

          <div className="
            mt-2
            flex
            flex-wrap
            gap-2
          ">

            {job.languagesRequired?.map((language, index) => (

              <span
                key={index}
                className="
                  px-3
                  py-1
                  rounded-full
                  bg-blue-100
                  text-[10px]
                  text-blue-700
                  font-medium
                "
              >
                {language}
              </span>

            ))}

          </div>

        </div>


        {/* =====================================================
            JOB DESCRIPTION
        ===================================================== */}

        <div className="
          mt-3
          bg-white
          rounded-[18px] border border-blue-100 shadow-[0_4px_16px_rgba(15,23,42,0.05)]
          p-4
        ">

          <h2 className="
            text-[14px] font-extrabold tracking-tight text-blue-900
          ">
            Job Description
          </h2>

          <p className="
            mt-2
            text-[10px]
            leading-4
            text-blue-700
          ">
            {job.shortDescription}
          </p>

        </div>


        {/* =====================================================
            REQUIREMENTS
        ===================================================== */}

        <div className="
          mt-3
          bg-white
          rounded-[18px] border border-blue-100 shadow-[0_4px_16px_rgba(15,23,42,0.05)]
          p-4
        ">

          <h2 className="
            text-[14px] font-extrabold tracking-tight text-blue-900
          ">
            Requirements
          </h2>

          <div className="mt-2 space-y-2">

            {job.requirements?.map((requirement, index) => (

              <div
                key={index}
                className="flex gap-2"
              >

                <span className="
                  text-blue-500
                  text-[10px]
                ">
                  ✓
                </span>

                <p className="
                  text-[10px]
                  leading-4
                  text-blue-700
                ">
                  {requirement}
                </p>

              </div>

            ))}

          </div>

        </div>


        {/* =====================================================
            ROLES & RESPONSIBILITIES
        ===================================================== */}

        <div className="
          mt-3
          bg-white
          rounded-[18px] border border-blue-100 shadow-[0_4px_16px_rgba(15,23,42,0.05)]
          p-4
        ">

          <h2 className="
            text-[14px] font-extrabold tracking-tight text-blue-900
          ">
            Roles & Responsibilities
          </h2>

          <div className="mt-2 space-y-2">

            {job.rolesAndResponsibilites?.map(
              (responsibility, index) => (

                <div
                  key={index}
                  className="flex gap-2"
                >

                  <span className="
                    text-blue-500
                    text-[10px]
                  ">
                    •
                  </span>

                  <p className="
                    text-[10px]
                    leading-4
                    text-blue-700
                  ">
                    {responsibility}
                  </p>

                </div>

              )
            )}

          </div>

        </div>


        {/* =====================================================
            REQUIRED SKILLS
        ===================================================== */}

        <div className="
          mt-3
          bg-white
          rounded-[18px] border border-blue-100 shadow-[0_4px_16px_rgba(15,23,42,0.05)]
          p-4
        ">

          <h2 className="
            text-[14px] font-extrabold tracking-tight text-blue-900
          ">
            Skills Required
          </h2>

          <div className="
            mt-2
            flex
            flex-wrap
            gap-2
          ">

            {job.requiredSkills?.map((skill, index) => (

              <span
                key={index}
                className="
                  px-3
                  py-1
                  rounded-full
                  bg-blue-100
                  text-[10px]
                  text-blue-700
                  font-medium
                "
              >
                {skill}
              </span>

            ))}

          </div>

        </div>


        {/* =====================================================
            BENEFITS
        ===================================================== */}

        <div className="
          mt-3
          bg-white
          rounded-[18px] border border-blue-100 shadow-[0_4px_16px_rgba(15,23,42,0.05)]
          p-4
        ">

          <h2 className="
            text-[14px] font-extrabold tracking-tight text-blue-900
          ">
            Benefits
          </h2>

          <div className="
            mt-2
            flex
            flex-wrap
            gap-2
          ">

            {job.benefits?.map((benefit, index) => (

              <span
                key={index}
                className="
                  px-3
                  py-1
                  rounded-full
                  bg-blue-50
                  text-[10px]
                  text-blue-800
                  font-medium
                "
              >
                {benefit}
              </span>

            ))}

          </div>

        </div>


        {/* =====================================================
            CATEGORY + POSTED
        ===================================================== */}

        <div className="
          mt-3
          bg-white
          rounded-[18px] border border-blue-100 shadow-[0_4px_16px_rgba(15,23,42,0.05)]
          p-4
        ">

          <div className="
            flex
            justify-between
            gap-3
          ">

            <div>

              <p className="
                text-[10px]
                text-blue-700
              ">
                Category
              </p>

              <p className="
                mt-1
                text-[10px]
                font-semibold
                text-blue-900
              ">
                {job.category}
              </p>

            </div>


            <div className="text-right">

              <p className="
                text-[10px]
                text-blue-700
              ">
                Posted
              </p>

              <p className="
                mt-1
                text-[10px]
                font-semibold
                text-blue-900
              ">
                {job.postedDate}
              </p>

            </div>

          </div>

        </div>


        


        {/* Bottom spacing for fixed buttons */}
        <div className="h-6" />

      </div>


      {/* =====================================================
          FIXED BOTTOM LOCATION + APPLY
      ===================================================== */}

      <div className="
        fixed
        bottom-0
        left-0
        right-0
        z-50
        bg-white/95 backdrop-blur-xl
        border-t
        border-blue-200
        px-3
        py-2
        shadow-[0_-8px_24px_rgba(15,23,42,0.10)]
      ">

        <div className="flex gap-2">

          {/* LOCATION BUTTON */}
          <button
            type="button"
            onClick={() => {

              if (job.googleMapLink) {
                window.open(
                  job.googleMapLink,
                  '_blank',
                  'noopener,noreferrer'
                )
              }

            }}
            className="
              flex-1
              h-[46px]
              rounded-full
              bg-gradient-to-r from-[#E4EFFF] to-[#E4EFFF]
              text-[13px]
              font-bold
              text-blue-950
              shadow-sm active:scale-[0.98]
              transition-transform
            "
          >
            📍 Location
          </button>


          {/* ANIMATED APPLY BUTTON — matches Mobile_JobCard */}
          <button
            type="button"
            onClick={handleApplyClick}
            disabled={isApplying || isApplied}
            aria-live="polite"
            aria-label={
              isApplying
                ? 'Loading application'
                : isApplied
                  ? 'Applied'
                  : 'Apply Now'
            }
            className={`
              relative flex-1 min-w-0
              h-[46px]
              rounded-full overflow-hidden
              text-[14px] font-extrabold
              inline-flex items-center justify-center gap-2
              shadow-[0_5px_14px_rgba(37,99,180,0.22)]
              transition-all duration-300
              active:scale-[0.98]
              disabled:cursor-default
              ${
                isApplied
                  ? 'bg-green-800 text-white shadow-none'
                  : 'bg-gradient-to-br from-[#397BC8] to-[#2462AC] text-white'
              }
            `}
          >
            {/* LOADING SPINNER */}
            {isApplying && (
              <span
                className="
                  h-[18px] w-[18px]
                  rounded-full
                  border-[2.5px]
                  border-white/30
                  border-t-white
                  animate-spin
                "
                role="status"
                aria-label="Loading"
              />
            )}

            {/* DEFAULT APPLY STATE */}
            {!isApplying && !isApplied && (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M22 2 2 10.5l8.1 3.4L13.5 22 22 2Z" />
                </svg>
                <span className="animate-[applyText_0.25s_ease-out]">
                  Apply Now
                </span>
              </>
            )}

            {/* SUCCESS STATE */}
            {isApplied && (
              <>
                <span className="animate-[applyText_0.25s_ease-out]">
                  Applied
                </span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-[applyCheck_0.3s_ease-out]"
                  aria-hidden="true"
                >
                  <path d="m5 12 4 4L19 6" />
                </svg>
              </>
            )}
          </button>

        </div>

      </div>

      <style>{`
        @keyframes applyText {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes applyCheck {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
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

export default Mobile_JobDetails