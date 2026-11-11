
import React, { useState } from 'react'

function Desktop_FilterPanel({
  onClose,
  onFocus,
  selectedFilters,
  onFilterChange,
  onClear,
  locations = [],
  categories = [],
  workModes = [],
  employmentTypes = [],
  shifts = [],
  experiences = [],
  genders = [],
  embedded = false,
}) {
  const [activeFilter, setActiveFilter] = useState('Date Posted')

  const filters = [
    'Date Posted',
    'Location',
    'Salary',
    'Work Mode',
    'Work Type',
    'Work Shift',
    'Department',
    'Experience',
    'Gender',
  ]

  const dateOptions = [
    'All',
    'Last 24 hours',
    'Last 3 days',
    'Last 7 days',
  ]

  const salaryOptions = [
    'All',
    'Below ₹15,000',
    '₹15,000 - ₹25,000',
    '₹25,000 - ₹40,000',
    'Above ₹40,000',
  ]

  const experienceOptions = [
    'All',
    ...experiences.filter(Boolean),
  ].filter(
    (value, index, array) =>
      array.indexOf(value) === index
  )

  // ============================================================
  // APPLY FILTERS — ORIGINAL LOGIC PRESERVED
  // ============================================================

  const handleApply = () => {
    if (onClose) {
      onClose()
    }
  }

  // ============================================================
  // FILTER ICONS — VISUAL ONLY
  // ============================================================

  const FilterIcon = ({ filter, size = 17 }) => {
    const common = {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      className: 'shrink-0',
      'aria-hidden': true,
    }

    switch (filter) {
      case 'Date Posted':
        return (
          <svg {...common}>
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M16 3v4M8 3v4M3 10h18" />
            <path d="M8 14h2M14 14h2M8 17h2" />
          </svg>
        )

      case 'Location':
        return (
          <svg {...common}>
            <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
        )

      case 'Salary':
        return (
          <svg {...common}>
            <path d="M6 6h12M6 10h12M9 6c5 0 5 7 0 7H6l8 7" />
          </svg>
        )

      case 'Work Mode':
        return (
          <svg {...common}>
            <rect x="3" y="7" width="18" height="14" rx="2" />
            <path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2" />
          </svg>
        )

      case 'Work Type':
        return (
          <svg {...common}>
            <path d="m12 3 9 5-9 5-9-5 9-5Z" />
            <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
          </svg>
        )

      case 'Work Shift':
        return (
          <svg {...common}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
        )

      case 'Department':
        return (
          <svg {...common}>
            <path d="M3 21h18M5 21V7h9v14M14 11h5v10" />
            <path d="M8 10h3M8 14h3M8 18h3M17 15h1M17 18h1" />
          </svg>
        )

      case 'Experience':
        return (
          <svg {...common}>
            <path d="M4 20V13M10 20V9M16 20V5M22 20V2" />
            <path d="m3 9 6-4 5 1 7-5" />
          </svg>
        )

      case 'Gender':
        return (
          <svg {...common}>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21v-2a8 8 0 0 1 16 0v2Z" />
          </svg>
        )

      default:
        return null
    }
  }

  const getIconColor = filter => {
    switch (filter) {
      case 'Date Posted':
      case 'Department':
        return 'text-[#246BC3]'
      case 'Salary':
        return 'text-[#246BC3]'
      case 'Location':
      case 'Work Mode':
      case 'Experience':
      case 'Gender':
        return 'text-[#246BC3]'
      case 'Work Type':
        return 'text-[#246BC3]'
      default:
        return 'text-[#536B91]'
    }
  }

  // ============================================================
  // RADIO OPTION — FONT AND CONTROL SIZES PRESERVED
  // ============================================================

  const FilterOption = ({
    name,
    value,
    checked,
    onChange,
  }) => (
    <label
      className="
        flex
        items-center
        gap-1.5
        min-h-[30px]
        py-0.5
        px-1
        rounded-md
        cursor-pointer
        hover:bg-[#EAF3FF]
        transition-colors
      "
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="
          appearance-none
          shrink-0
          w-[13px]
          h-[13px]
          rounded-full
          border
          border-[#A9BFDE]
          checked:border-[#2474CC]
          checked:bg-[#2474CC]
          cursor-pointer
        "
      />

      <span
        className="
          min-w-0
          text-[9px]
          text-[#102448]
          leading-3
          break-words
        "
      >
        {value}
      </span>
    </label>
  )

  // ============================================================
  // FILTER CONTENT
  // ============================================================

  const FilterHeading = ({ children }) => (
    <h3
      className="
        text-[11px]
        font-bold
        text-[#102448]
        mb-2
      "
    >
      {children}
    </h3>
  )

  const renderOptions = (
    title,
    filterKey,
    options
  ) => (
    <div>
      <FilterHeading>{title}</FilterHeading>

      <div className="space-y-0">
        {options.map(option => (
          <FilterOption
            key={option}
            name={filterKey}
            value={option}
            checked={selectedFilters?.[filterKey] === option}
            onChange={() =>
              onFilterChange(filterKey, option)
            }
          />
        ))}
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeFilter) {
      case 'Date Posted':
        return renderOptions(
          'Date Posted',
          'datePosted',
          dateOptions
        )

      case 'Location':
        return renderOptions(
          'Location',
          'location',
          locations
        )

      case 'Salary':
        return renderOptions(
          'Salary',
          'salary',
          salaryOptions
        )

      case 'Work Mode':
        return renderOptions(
          'Work Mode',
          'workMode',
          workModes
        )

      case 'Work Type':
        return renderOptions(
          'Work Type',
          'employmentType',
          employmentTypes
        )

      case 'Work Shift':
        return renderOptions(
          'Work Shift',
          'shift',
          shifts
        )

      case 'Department':
        return renderOptions(
          'Department',
          'category',
          categories
        )

      case 'Experience':
        return renderOptions(
          'Experience',
          'experience',
          experienceOptions
        )

      case 'Gender':
        return renderOptions(
          'Gender',
          'gender',
          genders
        )

      default:
        return null
    }
  }

  // ============================================================
  // PANEL UI — DIMENSIONS AND FONT SIZES PRESERVED
  // ============================================================

  return (
    <>
      {!embedded && (
        <div
          className="
            fixed
            inset-0
            z-40
            bg-[#0D2855]/40
            backdrop-blur-[2px]
          "
          onClick={onClose}
        />
      )}

      <div
        className={`
          ${
            embedded
              ? `
                relative
                w-full
                h-full
                min-h-0
                bg-[#F9FBFF]
                rounded-[16px]
                border
                border-[#D6E5F8]
                shadow-[0_4px_18px_rgba(36,91,166,0.13)]
                overflow-hidden
                flex
                flex-col
              `
              : `
                fixed
                top-1/2
                left-1/2
                -translate-x-1/2
                -translate-y-1/2
                z-50
                w-[760px]
                max-w-[90vw]
                h-[620px]
                max-h-[85vh]
                bg-[#F9FBFF]
                rounded-2xl
                shadow-[0_20px_50px_rgba(28,75,145,0.24)]
                overflow-hidden
                flex
                flex-col
              `
          }
        `}
        onPointerDown={() => {
          if (onFocus) {
            onFocus()
          }
        }}
      >
        {/* HEADER */}
        <div
          className="
            shrink-0
            h-[44px]
            px-2
            border-b
            border-[#D6E5F8]
            flex
            items-center
            justify-between
            bg-[#F9FBFF]
          "
        >
          <div
            className="
              flex
              items-center
              gap-1.5
              min-w-0
            "
          >
            <div
              className="
                w-6
                h-6
                rounded-md
                bg-[#DCEBFF]
                border
                border-[#B9D5F7]
                shrink-0
                flex
                items-center
                justify-center
                shadow-sm
              "
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 5H20L14 12V18L10 20V12L4 5Z"
                  fill="#246BC3"
                />
              </svg>
            </div>

            <h2
              className="
                text-[11px]
                font-bold
                text-[#0D1B3A]
              "
            >
              Filters
            </h2>
          </div>

          {!embedded && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close filters"
              className="
                w-6
                h-6
                rounded-full
                bg-[#EAF3FF]
                flex
                items-center
                justify-center
                text-[15px]
                text-[#536B91]
                hover:bg-[#DCEBFF]
                active:scale-95
                transition-colors
              "
            >
              ×
            </button>
          )}
        </div>

        {/* FILTER NAVIGATION AND OPTIONS */}
        <div
          className="
            flex
            flex-1
            min-h-0
            overflow-hidden
          "
        >
          {/* LEFT FILTER MENU */}
          <div
            className="
              w-[75px]
              min-w-[75px]
              shrink-0
              bg-[#F2F7FF]
              border-r
              border-[#D6E5F8]
              overflow-y-auto
              scrollbar-hide
            "
          >
            <div className="py-1">
              {filters.map(filter => {
                const isActive = activeFilter === filter

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`
                      relative
                      w-full
                      min-h-[38px]
                      px-1
                      text-center
                      text-[8px]
                      leading-3
                      font-semibold
                      transition-colors
                      ${
                        isActive
                          ? 'bg-[#DCEBFF] text-[#0D1B3A]'
                          : 'text-[#536B91] hover:bg-[#EAF3FF]/70'
                      }
                    `}
                  >
                    {isActive && (
                      <span
                        className="
                          absolute
                          left-0
                          top-1/2
                          -translate-y-1/2
                          w-[3px]
                          h-[20px]
                          bg-[#3478C5]
                          rounded-r-full
                        "
                      />
                    )}

                    <span className="
                      flex
                      flex-col
                      items-center
                      justify-center
                      gap-1
                    ">
                      <span className={getIconColor(filter)}>
                        <FilterIcon filter={filter} size={15} />
                      </span>

                      <span>{filter}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* RIGHT OPTIONS AREA */}
          <div
            className="
              flex-1
              min-w-0
              min-h-0
              bg-[#F9FBFF]
              overflow-y-auto
              scrollbar-hide
              px-2
              py-3
            "
          >
            <div className="w-full min-w-0">
              {renderContent()}
            </div>
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div
          className="
            shrink-0
            h-[48px]
            px-2
            border-t
            border-[#D6E5F8]
            bg-[#F9FBFF]
            flex
            items-center
            justify-center
            gap-1.5
          "
        >
          <button
            type="button"
            onClick={onClear}
            className="
              flex-1
              h-[30px]
              rounded-md
              border
              border-[#B9D5F7]
              bg-[#F9FBFF]
              text-[9px]
              font-semibold
              text-[#102448]
              hover:bg-[#EAF3FF]
              hover:border-[#8BB8EE]
              active:scale-[0.98]
              transition-all
            "
          >
            Clear
          </button>

          <button
            type="button"
            onClick={handleApply}
            className="
              flex-1
              h-[30px]
              rounded-md
              bg-[#3478C5]
              text-[9px]
              font-bold
              text-white
              shadow-sm
              hover:bg-[#2867B2]
              active:scale-[0.98]
              transition-all
            "
          >
            Apply
          </button>
        </div>
      </div>
    </>
  )
}

export default Desktop_FilterPanel
