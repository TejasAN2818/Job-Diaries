
import React from 'react'

function Desktop_ProfileBottomSheet({
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
        items-center
        justify-center
        p-6
        bg-blue-950/55
        backdrop-blur-[5px]
        animate-[fadeIn_0.25s_ease-out]
      "
      onClick={onClose}
      style={{
        animation: 'profileOverlayIn 250ms ease-out',
      }}
    >
      {/* =================================================
          DESKTOP MODAL
      ================================================= */}

      <div
        className="
          relative
          flex
          flex-col
          w-full
          max-w-[850px]
          h-[80vh]
          max-h-[800px]
          overflow-hidden
          rounded-[28px]
          bg-[#F4F8FF]
          border
          border-white/80
          shadow-[0_30px_100px_rgba(15,23,42,0.28)]
        "
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: 'profileModalIn 350ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            relative
            flex
            items-center
            justify-between
            gap-4
            px-7
            py-5
            bg-white
            border-b
            border-blue-200/80
            shrink-0
          "
        >
          {/* Brand accent */}

          <div
            className="
              absolute
              top-0
              left-0
              right-0
              h-[4px]
              bg-gradient-to-r
              from-[#E4EFFF]
              via-[#E4EFFF]
              to-[#2462AC]
            "
          />

          <h2
            className="
              min-w-0
              truncate
              pr-4
              text-[21px]
              font-extrabold
              tracking-[-0.6px]
              text-blue-950
              leading-tight
            "
          >
            {title}
          </h2>

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div
            className="
              flex
              items-center
              gap-3
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
                  h-[42px]
                  px-6
                  rounded-full
                  bg-[#2462AC]
                  text-blue-950
                  text-[14px]
                  font-bold
                  tracking-[0.1px]
                  shadow-[0_4px_12px_rgba(37,99,180,0.22)]
                  hover:bg-[#2462AC]
                  hover:shadow-[0_7px_18px_rgba(37,99,180,0.32)]
                  hover:-translate-y-[1px]
                  active:scale-95
                  transition-all
                  duration-200
                  ease-out
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
                w-[42px]
                h-[42px]
                rounded-full
                bg-blue-100
                border
                border-blue-200/80
                text-blue-700
                text-[25px]
                leading-none
                hover:bg-red-50
                hover:border-red-200
                hover:text-red-600
                hover:rotate-90
                active:scale-90
                transition-all
                duration-200
                ease-out
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-blue-400
              "
            >
              ×
            </button>
          </div>
        </div>

        {/* =================================================
            SCROLLABLE FORM AREA
        ================================================= */}

        <div
          className="
            flex-1
            min-h-0
            overflow-y-auto
            px-7
            py-7
            overscroll-contain
            text-blue-900
            [scrollbar-width:thin]
            [scrollbar-color:#2462AC_#E9EEF2]
            [&::-webkit-scrollbar]:w-[7px]
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
          MODAL ANIMATIONS
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

        @keyframes profileModalIn {
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
          .profile-modal-animation {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}

export default Desktop_ProfileBottomSheet
