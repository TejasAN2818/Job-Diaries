
import React, { useState } from 'react'

function Desktop_JobCard({ job, onJobClick, onApply }) {
  const [isApplied, setIsApplied] = useState(false)
  const [isApplying, setIsApplying] = useState(false)

  const handleApply = (e) => {
    e.stopPropagation()

    if (isApplied || isApplying) return

    setIsApplying(true)

    // Keep existing apply logic
    onApply?.(job)

    // Change button to Applied after one second
    setTimeout(() => {
      setIsApplying(false)
      setIsApplied(true)
    }, 1000)
  }

  return (
    <div
      onClick={() => onJobClick(job)}
      className="
        w-full bg-white rounded-[20px] p-4
        cursor-pointer border border-[#DCE8F8]
        shadow-[0_3px_12px_rgba(37,99,180,0.10)]
        hover:shadow-[0_6px_20px_rgba(37,99,180,0.18)]
        hover:border-[#B8D3F5]
        active:scale-[0.99]
        transition-all duration-200
      "
    >
      {/* TOP SECTION */}
      <div className="flex gap-4">
        {/* COMPANY LOGO */}
        <div className="relative shrink-0">
          <span
            className="
              absolute -top-2 -left-2 z-10
              bg-[#E3EEFF] text-[#245A9C]
              rounded-full px-3 py-[4px]
              text-[9px] font-medium whitespace-nowrap
            "
          >
            {job.postedDate}
          </span>

          <div
            className="
              w-[88px] h-[88px]
              bg-gradient-to-br from-[#EEF3FF] to-[#DFE9FF]
              rounded-[17px] flex items-center justify-center
              overflow-hidden border border-[#D5E4FA]
            "
          >
            {job.companyLogo ? (
              <img
                src={job.companyLogo}
                alt={job.companyName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center px-2">
                <p className="
                  text-[17px] font-extrabold text-[#102448]
                  leading-5 truncate
                ">
                  {job.companyName?.split(' ')[0]}
                </p>

                <p className="text-[10px] text-[#526789] mt-1">
                  company
                </p>
              </div>
            )}
          </div>
        </div>

        {/* JOB INFORMATION */}
        <div className="flex-1 min-w-0">
          <h2 className="
            text-[15px] font-extrabold text-[#102448]
            leading-[19px] line-clamp-2
          ">
            {job.jobTitle}
          </h2>

          <p className="
            mt-1 text-[11px] font-medium
            text-[#607493] truncate
          ">
            {job.companyName}
          </p>

          {/* SALARY */}
          <div className="
            mt-2 inline-flex max-w-full items-center
            rounded-lg bg-[#E4EFFF] px-3 py-1
          ">
            <span className="
              text-[15px] font-extrabold text-[#174F96]
              leading-5 truncate
            ">
              {job.salary}
            </span>
          </div>

          {/* EXPERIENCE + EMPLOYMENT TYPE */}
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="flex items-center gap-1.5 text-[11px] text-[#526789]">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="7" width="18" height="14" rx="2" />
                <path d="M8 7V4h8v3M3 12h18" />
              </svg>
              {job.workExperience}
            </span>

            <span className="text-[9px] text-[#A0B2CC]">•</span>

            <span className="flex items-center gap-1.5 text-[11px] text-[#526789]">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              {job.employmentType}
            </span>
          </div>

          {/* LOCATION */}
          <p className="
            mt-2 flex items-center gap-1.5
            text-[11px] font-bold text-[#102448] truncate
          ">
            <svg
              className="shrink-0 text-[#2474CC]"
              width="16"
              height="16"
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
      <div className="mt-3 flex items-center gap-3">
        {/* LOCATION BUTTON */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()

            if (job.googleMapLink) {
              window.open(
                job.googleMapLink,
                '_blank',
                'noopener,noreferrer'
              )
            }
          }}
          className="
            h-[36px] px-5 rounded-full
            border border-[#BBD5F8] bg-[#F4F8FF]
            text-[12px] font-bold text-[#102448]
            whitespace-nowrap inline-flex items-center
            justify-center gap-2
            shadow-[0_2px_6px_rgba(37,99,180,0.10)]
            hover:bg-[#E5F0FF] active:scale-95
            transition-all
          "
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-[#2474CC]"
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
          aria-label={isApplying ? 'Loading application' : isApplied ? 'Applied' : 'Apply'}
          className={`
            relative flex-1 h-[36px]
            rounded-full overflow-hidden
            text-[13px] font-bold text-white
            shadow-[0_3px_8px_rgba(37,99,180,0.22)]
            transition-all duration-300
            flex items-center justify-center gap-2
            active:scale-[0.98]
            disabled:cursor-default
            ${
              isApplied
                ? 'bg-green-800 shadow-none'
                : 'bg-gradient-to-r from-[#397BC8] to-[#2462AC] hover:from-[#2E70BB] hover:to-[#174F96]'
            }
          `}
        >
          {/* CIRCULAR LOADING RING */}
          {isApplying && (
            <span
              className="
                relative z-10
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

          {/* APPLY ICON + TEXT */}
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
                width="17"
                height="17"
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

      <style>{`
        @keyframes applyShine {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(100%);
          }
        }

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

export default Desktop_JobCard
