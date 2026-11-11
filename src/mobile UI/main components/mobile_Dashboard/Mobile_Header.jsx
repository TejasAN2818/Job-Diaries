
import React from 'react'
import WEBSITE_CONFIG from '../../../inputs/overall/Website_Config'

function Mobile_Header({
  onMenuClick,
  onPostJobClick,
  onProfileClick,
}) {
  return (
    <header
      className="
        relative
        w-full
        bg-gradient-to-r
        from-[#3978C2]
        via-[#6D98D0]
        to-[#3978C2]
        border-b
        border-[#8BB5E8]
        shadow-sm
        overflow-hidden
      "
    >
      {/* Decorative Background */}
      <div
        className="
          absolute
          inset-y-0
          right-[18%]
          w-[15%]
          bg-[#B9D7FF]/30
          -skew-x-[42deg]
          pointer-events-none
        "
      />

      {/* Header Content */}
      <div
        className="
          relative
          z-10
          w-full
          min-h-[60px]
          px-3
          flex
          items-center
          justify-between
          gap-2
        "
      >
        {/* LEFT SECTION */}
        <div
          className="
            min-w-0
            flex
            flex-1
            items-center
            gap-2
          "
        >
          {/* MENU BUTTON */}
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Menu"
            className="
              w-9
              h-9
              shrink-0
              bg-white/15
              rounded-xl
              flex
              flex-col
              items-center
              justify-center
              gap-[4px]
              shadow-md
              hover:bg-white/25
              active:scale-95
              transition-all
              duration-200
            "
          >
            <span className="w-[17px] h-[2px] bg-white rounded-full" />
            <span className="w-[17px] h-[2px] bg-white rounded-full" />
            <span className="w-[17px] h-[2px] bg-white rounded-full" />
          </button>

          {/* WEBSITE NAME */}
          <div className="min-w-0 leading-tight">
            <h1
              className="
                text-[clamp(14px,4vw,18px)]
                font-extrabold
                text-white
                tracking-tight
                whitespace-nowrap
              "
            >
              {WEBSITE_CONFIG.website.name}
            </h1>

            <p
              className="
                mt-[3px]
                text-[clamp(7px,2vw,9px)]
                font-semibold
                text-white/95
                tracking-wide
                whitespace-nowrap
              "
            >
              {WEBSITE_CONFIG.website.tagline}
            </p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div
          className="
            shrink-0
            flex
            items-center
            justify-end
            gap-2
          "
        >
          {/* POST JOBS BUTTON */}
          <button
            type="button"
            onClick={onPostJobClick}
            className="
              min-h-9
              flex
              items-center
              justify-center
              gap-1.5
              bg-white
              text-[#102448]
              rounded-full
              px-2.5
              py-1.5
              text-[clamp(9px,2.5vw,11px)]
              font-bold
              shadow-md
              hover:bg-[#EFF6FF]
              active:scale-95
              transition-all
              duration-200
              whitespace-nowrap
            "
          >
            <span>Post Jobs</span>

            <span
              className="
                bg-blue-100
                text-blue-900
                rounded-full
                px-1.5
                py-1
                text-[9px]
                font-extrabold
                leading-none
              "
            >
              Free
            </span>
          </button>

          {/* PROFILE BUTTON */}
          <button
            type="button"
            onClick={onProfileClick}
            aria-label="Profile"
            className="
              w-9
              h-9
              shrink-0
              bg-white
              text-[#245A9C]
              rounded-full
              flex
              items-center
              justify-center
              shadow-md
              hover:bg-[#EAF3FF]
              active:scale-95
              transition-all
              duration-200
            "
          >
            <span className="text-[17px] leading-none">
              👤
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Mobile_Header