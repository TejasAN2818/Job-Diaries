
import React from 'react'
import WEBSITE_CONFIG from '../../../inputs/overall/Website_Config'

function Desktop_Header({
  onMenuClick,
  onPostJobClick,
  onProfileClick,
}) {
  return (
    <header className="
      relative
      w-full
      bg-gradient-to-r
      from-[#3978C2]
      via-[#6D98D0]
      to-[#3978C2]
      border-b
      border-[#8BB5E8]
      shadow-[0_3px_12px_rgba(30,90,160,0.20)]
      overflow-hidden
    ">
      {/* Decorative background */}
      <div className="
        absolute
        inset-y-0
        right-[18%]
        w-[13%]
        bg-[#B9D7FF]/30
        -skew-x-[42deg]
        pointer-events-none
      " />

      <div className="
        relative
        z-10
        w-[96%]
        mx-auto
        h-[8vh]
        min-h-[60px]
        max-h-[80px]
        flex
        items-center
        justify-between
      ">

        {/* LEFT SECTION */}
        <div className="
          w-[40%]
          flex
          items-center
          gap-3
        ">

          {/* MENU BUTTON */}
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Menu"
            className="
              w-10
              h-10
              shrink-0
              bg-white/15
              rounded-xl
              flex
              flex-col
              items-center
              justify-center
              gap-[5px]
              shadow-md
              hover:bg-white/25
              hover:scale-105
              active:scale-95
              transition-all
              duration-200
            "
          >
            <span className="w-[18px] h-[2.5px] bg-white rounded-full" />
            <span className="w-[18px] h-[2.5px] bg-white rounded-full" />
            <span className="w-[18px] h-[2.5px] bg-white rounded-full" />
          </button>

          {/* WEBSITE NAME */}
          <div className="min-w-0 leading-tight">
            <h1 className="
              text-[clamp(20px,2vw,36px)]
              font-extrabold
              text-white
              tracking-tight
              whitespace-nowrap
            ">
              {WEBSITE_CONFIG.website.name}
            </h1>

            <p className="
              mt-0.5
              text-[clamp(10px,0.85vw,14px)]
              font-medium
              text-white/95
              tracking-wide
            ">
              {WEBSITE_CONFIG.website.tagline}
            </p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="
          w-[40%]
          flex
          items-center
          justify-end
          gap-3
        ">

          {/* POST JOBS BUTTON */}
          <button
            type="button"
            onClick={onPostJobClick}
            className="
              min-h-10
              flex
              items-center
              justify-center
              gap-3
              bg-white
              text-[#102448]
              rounded-full
              px-4
              py-2
              text-[clamp(11px,0.9vw,14px)]
              font-bold
              shadow-[0_4px_12px_rgba(20,60,120,0.18)]
              hover:bg-[#EFF6FF]
              hover:-translate-y-0.5
              active:scale-95
              transition-all
              duration-200
              whitespace-nowrap
            "
          >
            <span>Post Jobs</span>

            <span className="
              bg-[#E4EFFF]
              text-[#102448]
              rounded-full
              px-3
              py-1
              text-[clamp(10px,0.75vw,13px)]
              font-extrabold
              leading-none
            ">
              Free
            </span>
          </button>

          {/* PROFILE BUTTON */}
          <button
            type="button"
            onClick={onProfileClick}
            aria-label="Profile"
            className="
              w-10
              h-10
              shrink-0
              bg-white
              text-[#245A9C]
              rounded-full
              flex
              items-center
              justify-center
              shadow-[0_3px_12px_rgba(20,60,120,0.25)]
              hover:bg-[#EAF3FF]
              hover:scale-105
              active:scale-95
              transition-all
              duration-200
            "
          >
            <span className="text-[19px] leading-none">
              👤
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Desktop_Header
