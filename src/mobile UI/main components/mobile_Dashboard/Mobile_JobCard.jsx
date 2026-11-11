import React, { useState } from 'react'

function Mobile_JobCard({ job, onJobClick, onApply }) {
  const [isApplied, setIsApplied] = useState(false)
  const [isApplying, setIsApplying] = useState(false)

  const handleApply = (e) => {
    e.stopPropagation()

    if (isApplied || isApplying) return

    setIsApplying(true)

    // Preserve existing apply logic
    onApply?.(job)

    // Show Applied after one second
    setTimeout(() => {
      setIsApplying(false)
      setIsApplied(true)
    }, 1000)
  }

  const handleLocation = (e) => {
    e.stopPropagation()

    if (job.googleMapLink) {
      window.open(
        job.googleMapLink,
        '_blank',
        'noopener,noreferrer'
      )
    }
  }

  return (
    <div
      onClick={() => onJobClick?.(job)}
      className="
        w-full min-w-0
        bg-white
        rounded-[18px]
        p-3
        cursor-pointer
        border border-blue-100
        shadow-[0_3px_12px_rgba(15,23,42,0.04)]
        hover:border-blue-200
        hover:shadow-[0_5px_16px_rgba(15,23,42,0.07)]
        active:scale-[0.99]
        transition-all duration-200
      "
    >
      {/* TOP SECTION */}
      <div className="flex gap-3 min-w-0">

        {/* COMPANY LOGO */}
        <div className="relative shrink-0">

          <span
            className="
              absolute -top-1.5 -left-1.5 z-10
              max-w-[90px]
              bg-blue-100 text-blue-900
              rounded-full
              px-2 py-[3px]
              text-[8px] font-semibold
              whitespace-nowrap truncate
            "
          >
            {job.postedDate}
          </span>

          <div
            className="
              w-[72px] h-[72px]
              bg-gradient-to-br from-blue-100 to-blue-100
              rounded-[15px]
              flex items-center justify-center
              overflow-hidden
              border border-blue-200
            "
          >
            {job.companyLogo ? (
              <img
                src={job.companyLogo}
                alt={job.companyName || 'Company logo'}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center px-1 min-w-0">
                <p className="
                  text-[14px] font-extrabold text-blue-950
                  leading-4 truncate
                ">
                  {job.companyName?.split(' ')[0]}
                </p>

                <p className="text-[9px] text-blue-900 mt-1">
                  company
                </p>
              </div>
            )}
          </div>
        </div>

        {/* JOB INFORMATION */}
        <div className="flex-1 min-w-0">

          <h2 className="
            text-[13px] font-extrabold text-blue-950
            leading-[17px]
            line-clamp-2
            break-words
          ">
            {job.jobTitle}
          </h2>

          <p className="
            mt-1 text-[10px] font-medium
            text-blue-700 truncate
          ">
            {job.companyName}
          </p>

          {/* SALARY */}
          <div className="
            mt-1.5 inline-flex max-w-full
            items-center
            rounded-lg bg-blue-50
            px-2.5 py-1
          ">
            <span className="
              text-[13px] font-extrabold text-blue-800
              leading-4 truncate
            ">
              {job.salary}
            </span>
          </div>

          {/* EXPERIENCE + EMPLOYMENT TYPE */}
          <div className="
            flex flex-wrap items-center
            gap-x-1.5 gap-y-1 mt-1.5
          ">
            <span className="
              flex items-center gap-1
              text-[10px] text-blue-700
              min-w-0
            ">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
                aria-hidden="true"
              >
                <rect x="3" y="7" width="18" height="14" rx="2" />
                <path d="M8 7V4h8v3M3 12h18" />
              </svg>

              <span className="truncate">{job.workExperience}</span>
            </span>

            <span className="text-[9px] text-blue-400">•</span>

            <span className="
              flex items-center gap-1
              text-[10px] text-blue-700
              min-w-0
            ">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>

              <span className="truncate">{job.employmentType}</span>
            </span>
          </div>

          {/* LOCATION */}
          <p className="
            mt-1.5 flex items-center gap-1
            text-[10px] font-bold text-blue-950
            min-w-0
          ">
            <svg
              className="shrink-0 text-red-500"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2a8 8 0 0 0-8 8c0 5.4 8 12 8 12s8-6.6 8-12a8 8 0 0 0-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
            </svg>

            <span className="truncate">{job.location}</span>
          </p>
        </div>
      </div>

      

      {/* BOTTOM BUTTONS */}
      <div className="mt-3 flex items-center gap-2">

        {/* LOCATION BUTTON */}
        <button
          type="button"
          onClick={handleLocation}
          className="
            h-[36px] px-3
            rounded-full
            border border-blue-200
            bg-blue-100
            text-[11px] font-bold text-blue-950
            whitespace-nowrap
            inline-flex items-center justify-center gap-1.5
            hover:bg-blue-100
            active:scale-95
            transition-all
          "
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-blue-800 shrink-0"
            aria-hidden="true"
          >
            <path d="M12 2a8 8 0 0 0-8 8c0 5.4 8 12 8 12s8-6.6 8-12a8 8 0 0 0-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
          </svg>

          Location
        </button>

        {/* ANIMATED APPLY BUTTON */}
        <button
          type="button"
          onClick={handleApply}
          disabled={isApplying || isApplied}
          aria-live="polite"
          aria-label={
            isApplying
              ? 'Loading application'
              : isApplied
                ? 'Applied'
                : 'Apply'
          }
          className={`
            relative flex-1 min-w-0
            h-[36px]
            rounded-full overflow-hidden
            text-[12px] font-bold
            shadow-[0_3px_8px_rgba(37,99,180,0.16)]
            transition-all duration-300
            inline-flex items-center justify-center gap-1.5
            active:scale-[0.98]
            disabled:cursor-default
            ${
              isApplied
                ? 'bg-green-800 text-white shadow-none'
                : 'bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800'
            }
          `}
        >
          {/* LOADING SPINNER */}
          {isApplying && (
            <span
              className="
                relative z-10
                h-[17px] w-[17px]
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

          {/* APPLY STATE */}
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
                Apply
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
                width="16"
                height="16"
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

      {/* ANIMATIONS */}
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

export default Mobile_JobCard
