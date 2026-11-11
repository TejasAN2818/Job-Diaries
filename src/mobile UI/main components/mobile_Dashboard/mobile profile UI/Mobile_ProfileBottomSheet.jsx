
import React from 'react'
import { X } from 'lucide-react'

function Mobile_ProfileBottomSheet({
  title,
  onClose,
  children,
  onSave,
}) {
  return (
    <div
      className="
        fixed
        inset-0
        z-[500]
        flex
        items-end
        justify-center
        bg-blue-950/50
        backdrop-blur-[3px]
        animate-[profileOverlayIn_250ms_ease-out]
      "
      onClick={onClose}
      style={{
        animation: 'profileOverlayIn 250ms ease-out',
      }}
    >
      {/* =================================================
          MOBILE BOTTOM SHEET
      ================================================= */}

      <div
        className="
          relative
          flex
          flex-col
          w-full
          h-[80dvh]
          max-h-[800px]
          min-h-[55dvh]
          overflow-hidden
          rounded-t-[26px]
          border
          border-white/80
          bg-[#F4F8FF]
          shadow-[0_-15px_60px_rgba(15,23,42,0.20)]
          animate-[profileSheetIn_350ms_cubic-bezier(0.16,1,0.3,1)]
        "
        onClick={(e) => e.stopPropagation()}
        style={{
          animation:
            'profileSheetIn 350ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* =================================================
            TOP ACCENT
        ================================================= */}

        <div
          className="
            absolute
            top-0
            left-0
            right-0
            z-20
            h-[4px]
            bg-gradient-to-r
            from-[#E4EFFF]
            via-[#E4EFFF]
            to-[#2462AC]
          "
        />

        {/* =================================================
            DRAG HANDLE
        ================================================= */}

        <div
          className="
            flex
            justify-center
            pt-3
            pb-2
            shrink-0
            bg-white
          "
        >
          <div
            className="
              w-[42px]
              h-[5px]
              rounded-full
              bg-blue-300
            "
          />
        </div>

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            relative
            flex
            items-center
            justify-between
            gap-3
            px-5
            py-3.5
            bg-white
            border-b
            border-blue-200/80
            shrink-0
          "
        >
          {/* TITLE */}

          <h2
            className="
              min-w-0
              flex-1
              truncate
              pr-1
              text-[18px]
              font-extrabold
              tracking-[-0.45px]
              leading-tight
              text-blue-950
            "
          >
            {title}
          </h2>

          {/* =================================================
              ACTION BUTTONS
          ================================================= */}

          <div
            className="
              flex
              items-center
              gap-2
              shrink-0
            "
          >
            {/* SAVE */}

            {onSave && (
              <button
                type="button"
                onClick={onSave}
                aria-label="Save"
                className="
                  inline-flex
                  h-[39px]
                  items-center
                  justify-center
                  px-5
                  rounded-full
                  bg-[#2462AC]
                  text-blue-950
                  text-[13px]
                  font-extrabold
                  shadow-[0_4px_12px_rgba(37,99,180,0.20)]
                  hover:bg-[#2462AC]
                  active:scale-95
                  transition-all
                  duration-200
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#2462AC]
                  focus-visible:ring-offset-2
                "
              >
                Save
              </button>
            )}

            {/* CLOSE */}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="
                group
                flex
                items-center
                justify-center
                w-[39px]
                h-[39px]
                rounded-full
                bg-blue-100
                border
                border-blue-200/80
                text-blue-700
                hover:bg-red-50
                hover:border-red-200
                hover:text-red-600
                active:scale-90
                transition-all
                duration-200
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-blue-400
              "
            >
              <X
                size={19}
                strokeWidth={2.2}
                className="
                  transition-transform
                  duration-200
                  group-hover:rotate-90
                "
              />
            </button>
          </div>
        </div>

        {/* =================================================
            SCROLLABLE CONTENT
        ================================================= */}

        <div
          className="
            flex-1
            min-h-0
            overflow-y-auto
            overscroll-contain
            px-5
            py-5
            text-blue-900
            [scrollbar-width:thin]
            [scrollbar-color:#2462AC_#E9EEF2]
            [&::-webkit-scrollbar]:w-[4px]
            [&::-webkit-scrollbar-track]:bg-blue-100
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-[#2462AC]
            [&::-webkit-scrollbar-thumb:hover]:bg-[#2462AC]
          "
        >
          {children}
        </div>
      </div>

      {/* =================================================
          ANIMATIONS
      ================================================= */}

      <style>{`
        @keyframes profileOverlayIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes profileSheetIn {
          from {
            opacity: 0;
            transform: translateY(35px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .profile-sheet-animation {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}

export default Mobile_ProfileBottomSheet
