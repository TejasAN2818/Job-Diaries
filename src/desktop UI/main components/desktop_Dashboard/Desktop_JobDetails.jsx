import React, { useState } from 'react'


function Desktop_JobDetails({ job, onBack, onApply }) {

  const [isScrolled, setIsScrolled] = useState(false)
  const [isApplied, setIsApplied] = useState(false)
  const [isApplying, setIsApplying] = useState(false)

  if (!job) return null

  const handleLocationClick = () => {
    if (job.googleMapLink) {
      window.open(
        job.googleMapLink,
        '_blank',
        'noopener,noreferrer'
      )
    }
  }

 const handleApplyClick = () => {
  if (isApplied || isApplying) return

  setIsApplying(true)

  // Preserve the existing apply callback.
  onApply?.(job)

  // Show the success state after one second.
  setTimeout(() => {
    setIsApplying(false)
    setIsApplied(true)
  }, 1000)
}

  const handleScroll = (e) => {
    setIsScrolled(e.currentTarget.scrollTop > 80)
  }

  return (

    <div className="h-full bg-gradient-to-b from-[#F4F8FF] to-[#DCEBFF] flex flex-col overflow-hidden text-blue-900">

      {/* =====================================================
          FIXED BACK BUTTON
      ===================================================== */}

      <button
        type="button"
        onClick={onBack}
        aria-label="Back to Jobs"
        className="
          fixed
          top-[88px]
          left-2
          z-50
          w-[52px]
          h-[42px]
          rounded-r-2xl
          bg-gradient-to-br from-[#397BC8] to-[#2462AC]
          border border-white/80
          shadow-[0_6px_18px_rgba(37,99,180,0.18)]
          flex
          flex-col
          items-center
          justify-center
          text-blue-950
          hover:brightness-105
          hover:scale-105
          hover:shadow-[0_6px_16px_rgba(37,99,180,0.22)]
          active:scale-95
          transition-all
        "
      >
        <span className="
          text-[23px]
          font-bold
          leading-[20px]
        ">
          ←
        </span>

        <span className="
          mt-0.5
          text-[10px]
          font-extrabold
          leading-3
        ">
          Back
        </span>
      </button>


      {/* =====================================================
          SCROLLABLE CONTENT
      ===================================================== */}

      <main
        className="flex-1 overflow-y-auto"
        onScroll={handleScroll}
      >

        <div
          className="
            max-w-[1180px]
            mx-auto
            px-6
            py-6
            pb-10
          "
        >

          {/* =================================================
              FULL JOB HEADER
          ================================================= */}

          <section
            className="
              bg-white
              border
              border-blue-200/80
              rounded-[22px]
              p-6
              shadow-[0_5px_22px_rgba(15,23,42,0.045)]
            "
          >

            <div className="flex items-center gap-4">

              {/* Company Logo */}

              <div
                className="
                  w-[82px]
                  h-[82px]
                  shrink-0
                  rounded-[18px]
                  border
                  border-blue-100
                  bg-gradient-to-br from-[#E4EFFF] to-[#E4EFFF]
                  shadow-sm
                  overflow-hidden
                  flex
                  items-center
                  justify-center
                "
              >

                {job.companyLogo ? (

                  <img
                    src={job.companyLogo}
                    alt={job.companyName}
                    className="
                      w-full
                      h-full
                      object-contain
                      p-2
                    "
                  />

                ) : (

                  <div
                    className="
                      w-full
                      h-full
                      bg-[#2462AC]
                      flex
                      items-center
                      justify-center
                      px-2
                    "
                  >
                    <span
                      className="
                        text-[15px]
                        font-bold
                        text-blue-900
                        text-center
                        leading-4
                      "
                    >
                      {job.companyName || 'Company'}
                    </span>
                  </div>

                )}

              </div>


              {/* Job Information */}

              <div className="flex-1 min-w-0">

                <h1
                  className="
                    text-[25px]
                    font-extrabold
                    leading-8
                    tracking-tight
                    text-blue-950
                  "
                >
                  {job.jobTitle}
                </h1>

                <p
                  className="
                    mt-1
                    text-[14px]
                    font-medium
                    text-blue-700
                  "
                >
                  {job.companyName}
                </p>

                <div
                  className="
                    mt-2
                    flex
                    items-center
                    gap-4
                    flex-wrap
                  "
                >

                  <span className="text-[12px] text-blue-700">
                    {job.location}
                  </span>

                  <span className="text-blue-300">
                    •
                  </span>

                  <span className="text-[12px] text-blue-700">
                    {job.employmentType}
                  </span>

                  <span className="text-blue-300">
                    •
                  </span>

                  <span className="text-[12px] text-blue-700">
                    {job.workMode}
                  </span>

                  <span className="text-blue-300">
                    •
                  </span>

                  <span className="text-[12px] text-blue-700">
                    Posted {job.postedDate}
                  </span>

                </div>

              </div>

            </div>


            {/* =================================================
                QUICK HIGHLIGHTS
            ================================================= */}

            <div
              className="
                mt-5
                pt-4
                border-t
                border-blue-100
                grid
                grid-cols-5
              "
            >

              <div className="border-r border-blue-100 px-4 first:pl-0">

                <p className="text-[10px] font-medium uppercase tracking-wide text-blue-400">
                  Salary
                </p>

                <p
                  className="
                    mt-1
                    text-[14px]
                    font-extrabold
                    text-blue-700
                  "
                >
                  {job.salary}
                </p>

              </div>


              <div className="border-r border-blue-100 px-4">

                <p className="text-[10px] font-medium uppercase tracking-wide text-blue-400">
                  Experience
                </p>

                <p className="mt-1 text-[12px] font-semibold text-blue-800">
                  {job.workExperience}
                </p>

              </div>


              <div className="border-r border-blue-100 px-4">

                <p className="text-[10px] font-medium uppercase tracking-wide text-blue-400">
                  Shift
                </p>

                <p className="mt-1 text-[12px] font-semibold text-blue-800">
                  {job.sfift}
                </p>

              </div>


              <div className="border-r border-blue-100 px-4">

                <p className="text-[10px] font-medium uppercase tracking-wide text-blue-400">
                  Openings
                </p>

                <p className="mt-1 text-[12px] font-semibold text-blue-800">
                  {job.numberOfOpenings}
                </p>

              </div>


              <div className="px-4">

                <p className="text-[10px] font-medium uppercase tracking-wide text-blue-400">
                  Qualification
                </p>

                <p className="mt-1 text-[12px] font-semibold text-blue-800 truncate">
                  {job.educationQualification}
                </p>

              </div>

            </div>

          </section>


          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <div
            className="
              mt-4
              grid
              grid-cols-[minmax(0,1fr)_280px]
              gap-4
              items-start
            "
          >

            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <div
              className="
                bg-white
                border
                border-blue-200/80
                rounded-[20px]
                overflow-hidden
                shadow-[0_4px_18px_rgba(15,23,42,0.035)]
              "
            >

              {/* =================================================
                  JOB DESCRIPTION
              ================================================= */}

              <section className="px-6 py-6">

                <h2
                  className="
                    text-[16px]
                    font-extrabold
                    tracking-tight
                    text-blue-900
                  "
                >
                  Job Description
                </h2>

                <p
                  className="
                    mt-3
                    text-[13px]
                    leading-6
                    text-blue-700
                    whitespace-pre-line
                  "
                >
                  {job.shortDescription}
                </p>

              </section>


              <div className="border-t border-blue-100" />


              {/* =================================================
                  JOB DETAILS
              ================================================= */}

              <section className="px-6 py-6">

                <h2
                  className="
                    text-[16px]
                    font-extrabold
                    tracking-tight
                    text-blue-900
                  "
                >
                  Job Details
                </h2>


                <div
                  className="
                    mt-4
                    grid
                    grid-cols-3
                    gap-x-8
                    gap-y-4
                  "
                >

                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wide text-blue-400">
                      Industry
                    </p>

                    <p className="mt-1 text-[12px] font-semibold text-blue-800">
                      {job.industryType}
                    </p>
                  </div>


                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wide text-blue-400">
                      Job Type
                    </p>

                    <p className="mt-1 text-[12px] font-semibold text-blue-800">
                      {job.employmentType}
                    </p>
                  </div>


                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wide text-blue-400">
                      Work Mode
                    </p>

                    <p className="mt-1 text-[12px] font-semibold text-blue-800">
                      {job.workMode}
                    </p>
                  </div>


                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wide text-blue-400">
                      Working Days
                    </p>

                    <p className="mt-1 text-[12px] font-semibold text-blue-800">
                      {job.workingDays}
                    </p>
                  </div>


                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wide text-blue-400">
                      Office Timing
                    </p>

                    <p className="mt-1 text-[12px] font-semibold text-blue-800">
                      {job.officeTiming}
                    </p>
                  </div>


                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wide text-blue-400">
                      Gender
                    </p>

                    <p className="mt-1 text-[12px] font-semibold text-blue-800">
                      {job.gender}
                    </p>
                  </div>


                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wide text-blue-400">
                      Age Limit
                    </p>

                    <p className="mt-1 text-[12px] font-semibold text-blue-800">
                      {job.ageLimit}
                    </p>
                  </div>


                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wide text-blue-400">
                      Incentives
                    </p>

                    <p className="mt-1 text-[12px] font-semibold text-blue-800">
                      {job.incentives}
                    </p>
                  </div>


                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wide text-blue-400">
                      Fixed Salary
                    </p>

                    <p className="mt-1 text-[12px] font-semibold text-blue-800">
                      {job.fixedSalary}
                    </p>
                  </div>

                </div>

              </section>


              <div className="border-t border-blue-100" />


              {/* =================================================
                  REQUIREMENTS
              ================================================= */}

              <section className="px-6 py-6">

                <h2
                  className="
                    text-[16px]
                    font-extrabold
                    tracking-tight
                    text-blue-900
                  "
                >
                  Requirements
                </h2>

                <div className="mt-3 space-y-2">

                  {job.requirements?.map(
                    (requirement, index) => (

                      <div
                        key={index}
                        className="flex items-start gap-2"
                      >

                        <span
                          className="
                            mt-[7px]
                            w-[5px]
                            h-[5px]
                            shrink-0
                            rounded-full
                            bg-[#2462AC]
                          "
                        />

                        <p
                          className="
                            text-[12px]
                            leading-5
                            text-blue-700
                          "
                        >
                          {requirement}
                        </p>

                      </div>

                    )
                  )}

                </div>

              </section>


              <div className="border-t border-blue-100" />


              {/* =================================================
                  ROLES & RESPONSIBILITIES
              ================================================= */}

              <section className="px-6 py-6">

                <h2
                  className="
                    text-[16px]
                    font-extrabold
                    tracking-tight
                    text-blue-900
                  "
                >
                  Roles & Responsibilities
                </h2>

                <div className="mt-3 space-y-2">

                  {job.rolesAndResponsibilites?.map(
                    (responsibility, index) => (

                      <div
                        key={index}
                        className="flex items-start gap-2"
                      >

                        <span
                          className="
                            mt-[7px]
                            w-[5px]
                            h-[5px]
                            shrink-0
                            rounded-full
                            bg-[#2462AC]
                          "
                        />

                        <p
                          className="
                            text-[12px]
                            leading-5
                            text-blue-700
                          "
                        >
                          {responsibility}
                        </p>

                      </div>

                    )
                  )}

                </div>

              </section>


              <div className="border-t border-blue-100" />


              {/* =================================================
                  SKILLS / LANGUAGES / BENEFITS
              ================================================= */}

              <section className="px-6 py-6">

                <div className="grid grid-cols-3 gap-6">

                  {/* Skills */}

                  <div>

                    <h3
                      className="
                        text-[13px]
                        font-bold
                        text-blue-900
                      "
                    >
                      Skills
                    </h3>

                    <div className="mt-3 flex flex-wrap gap-1.5">

                      {job.requiredSkills?.map(
                        (skill, index) => (

                          <span
                            key={index}
                            className="
                              px-2.5
                              py-1
                              rounded-full
                              bg-[#E4EFFF]
                              border
                              border-[#C8DCF7]
                              text-[10px]
                              text-blue-800
                            "
                          >
                            {skill}
                          </span>

                        )
                      )}

                    </div>

                  </div>


                  {/* Languages */}

                  <div>

                    <h3
                      className="
                        text-[13px]
                        font-bold
                        text-blue-900
                      "
                    >
                      Languages
                    </h3>

                    <div className="mt-3 flex flex-wrap gap-1.5">

                      {job.languagesRequired?.map(
                        (language, index) => (

                          <span
                            key={index}
                            className="
                              px-2.5
                              py-1
                              rounded-full
                              bg-blue-50
                              border
                              border-blue-200
                              text-[10px]
                              text-blue-800
                            "
                          >
                            {language}
                          </span>

                        )
                      )}

                    </div>

                  </div>


                  {/* Benefits */}

                  <div>

                    <h3
                      className="
                        text-[13px]
                        font-bold
                        text-blue-900
                      "
                    >
                      Benefits
                    </h3>

                    <div className="mt-3 space-y-1.5">

                      {job.benefits?.map(
                        (benefit, index) => (

                          <p
                            key={index}
                            className="
                              text-[11px]
                              leading-4
                              text-blue-700
                            "
                          >
                            • {benefit}
                          </p>

                        )
                      )}

                    </div>

                  </div>

                </div>

              </section>


              <div className="border-t border-blue-100" />


              {/* =================================================
                  INCENTIVE DETAILS
              ================================================= */}

              <section className="px-6 py-6">

                <h2
                  className="
                    text-[16px]
                    font-extrabold
                    tracking-tight
                    text-blue-900
                  "
                >
                  Incentive Details
                </h2>

                <p
                  className="
                    mt-3
                    text-[13px]
                    leading-6
                    text-blue-700
                    whitespace-pre-line
                  "
                >
                  {job.incentiveDetails}
                </p>

              </section>

            </div>


            {/* =================================================
                RIGHT STICKY PANEL
            ================================================= */}

            <aside
              className="
                sticky
                top-5
                self-start
              "
            >

              {/* =================================================
                  COMPACT JOB HEADER
                  ONLY VISIBLE AFTER SCROLL
              ================================================= */}

 {/* =================================================
    COMPACT JOB HEADER
    ONLY VISIBLE AFTER SCROLL
================================================= */}

<div
  className={`
    overflow-hidden
    transition-all
    duration-300
    ease-in-out
    ${
      isScrolled
        ? 'max-h-[175px] opacity-100 mb-3'
        : 'max-h-0 opacity-0 mb-0'
    }
  `}
>
  <div
    className="
      h-[125px]
      bg-white
      border
      border-blue-200/80
      rounded-[18px]
      px-5
      py-4
      shadow-[0_5px_18px_rgba(15,23,42,0.06)]
      flex
      items-center
    "
  >

    <div className="flex items-center gap-4 w-full">

      {/* =================================================
          COMPANY LOGO
      ================================================= */}

      <div
        className="
          w-[72px]
          h-[72px]
          shrink-0
          rounded-[14px]
          overflow-hidden
          bg-[#2462AC]
          flex
          items-center
          justify-center
          border
          border-blue-200
        "
      >

        {job.companyLogo ? (

          <img
            src={job.companyLogo}
            alt={job.companyName}
            className="
              w-full
              h-full
              object-contain
              p-2
            "
          />

        ) : (

          <span
            className="
              px-2
              text-[11px]
              font-bold
              text-blue-900
              text-center
              leading-4
              line-clamp-3
            "
          >
            {job.companyName || 'Company'}
          </span>

        )}

      </div>


      {/* =================================================
          JOB INFORMATION
      ================================================= */}

      <div className="flex-1 min-w-0">

        {/* Job Title */}

        <h3
          className="
            text-[8px]
            font-bold
            text-blue-900
            leading-5
            line-clamp-2
          "
        >
          {job.jobTitle}
        </h3>


        {/* Company */}

        <p
          className="
            mt-1
            text-[10px]
            text-blue-700
            truncate
          "
        >
          {job.companyName}
        </p>


        {/* Location */}

        <div className="flex items-center gap-1.5 mt-2">

         <span className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide text-blue-400">
  📍
</span>

         

          <span
            className="
              text-[10px]
              font-medium
              text-blue-800
              truncate
            "
          >
            {job.location}
          </span>

        </div>


        {/* Salary */}

        <div className="flex items-center gap-1.5 mt-1">
          <span>

          </span>

          <span className="text-[10px] font-medium uppercase tracking-wide text-blue-400">
             ₹
          </span>

          

          <span
            className="
              text-[10px]
              font-semibold
              text-[#2462AC]
              whitespace-nowrap
            "
          >
            {job.salary}
          </span>

        </div>

      </div>



      

    </div>

  </div>

</div>

              {/* =================================================
                  ACTION PANEL
              ================================================= */}

              <div
                className="
                  bg-white
                  border
                  border-blue-200/80
                  rounded-[20px]
                  p-5
                  shadow-[0_5px_20px_rgba(15,23,42,0.05)]
                "
              >

                {/* Apply */}

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
                    relative
                    flex
                    w-full
                    h-[44px]
                    items-center
                    justify-center
                    gap-2
                    overflow-hidden
                    rounded-xl
                    text-[13px]
                    font-extrabold
                    text-blue-950
                    shadow-[0_4px_12px_rgba(37,99,180,0.20)]
                    transition-all
                    duration-300
                    active:scale-[0.98]
                    disabled:cursor-default
                    ${
                      isApplied
                        ? 'bg-green-800 text-white shadow-none'
                        : 'bg-gradient-to-r from-[#397BC8] to-[#2462AC] hover:brightness-105'
                    }
                  `}
                >
                  {/* CIRCULAR LOADING RING */}
                  {isApplying && (
                    <span
                      className="
                        h-[18px]
                        w-[18px]
                        rounded-full
                        border-[2.5px]
                        border-blue-950/25
                        border-t-blue-950
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
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M22 2 2 10.5l8.1 3.4L13.5 22 22 2Z" />
                      </svg>
                      <span>Apply Now</span>
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


                {/* Location */}

                <button
                  type="button"
                  onClick={handleLocationClick}
                  className="
                    mt-2
                    w-full
                    h-[42px]
                    rounded-xl
                    border
                    border-blue-200
                    bg-blue-50/50
                    text-[12px]
                    font-bold
                    text-blue-800
                    hover:bg-blue-50
                    active:scale-[0.98]
                    transition-all
                  "
                >
                  View Location
                </button>


                {/* Location Information */}

                <div
                  className="
                    mt-4
                    pt-4
                    border-t
                    border-blue-100
                  "
                >

                  <p className="text-[10px] font-medium uppercase tracking-wide text-blue-400">
                    Location
                  </p>

                  <p className="mt-1 text-[12px] font-semibold text-blue-800">
                    {job.location}
                  </p>

                </div>

              </div>

            </aside>

          </div>

        </div>

      </main>

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

export default Desktop_JobDetails