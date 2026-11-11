
import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
} from 'react'

import Mobile_FilterPanel from './Mobile_FilterPanel'
import Job_Data from '../../../inputs/overall/Job_Data'

function Mobile_Filter({ selectedFilters, setSelectedFilters }) {
  const [showFilterPanel, setShowFilterPanel] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)

  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
  })

  const dropdownRef = useRef(null)
  const filterBarRef = useRef(null)

  // ============================================================
  // FILTER OPTIONS — EXISTING DATA FIELDS PRESERVED
  // ============================================================

  const locations = useMemo(
    () => [
      'All',
      ...new Set(Job_Data.map(job => job.location).filter(Boolean)),
    ],
    []
  )

  const categories = useMemo(
    () => [
      'All',
      ...new Set(Job_Data.map(job => job.category).filter(Boolean)),
    ],
    []
  )

  const workModes = useMemo(
    () => [
      'All',
      ...new Set(Job_Data.map(job => job.workMode).filter(Boolean)),
    ],
    []
  )

  const employmentTypes = useMemo(
    () => [
      'All',
      ...new Set(Job_Data.map(job => job.employmentType).filter(Boolean)),
    ],
    []
  )

  const shifts = useMemo(
    () => [
      'All',
      ...new Set(Job_Data.map(job => job.sfift).filter(Boolean)),
    ],
    []
  )

  const experiences = useMemo(
    () => [
      'All',
      ...new Set(Job_Data.map(job => job.workExperience).filter(Boolean)),
    ],
    []
  )

  const genders = useMemo(
    () => [
      'All',
      ...new Set(Job_Data.map(job => job.gender).filter(Boolean)),
    ],
    []
  )

  const activeFilterCount = Object.values(selectedFilters).filter(
    value => value !== 'All'
  ).length

  // ============================================================
  // FILTER ACTIONS — PRESERVED
  // ============================================================

  const handleFilterChange = (filterName, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterName]: value,
    }))

    setOpenDropdown(null)
  }

  const handleClearFilters = () => {
    setSelectedFilters({
      datePosted: 'All',
      location: 'All',
      salary: 'All',
      workMode: 'All',
      employmentType: 'All',
      shift: 'All',
      category: 'All',
      experience: 'All',
      gender: 'All',
    })

    setOpenDropdown(null)
  }

  // ============================================================
  // DROPDOWN POSITIONING — MOBILE FRIENDLY
  // ============================================================

  const toggleDropdown = (filter, event) => {
    if (openDropdown === filter) {
      setOpenDropdown(null)
      return
    }

    const button = event.currentTarget
    const rect = button.getBoundingClientRect()

    const dropdownWidth = Math.min(220, window.innerWidth - 16)
    const screenPadding = 8
    const dropdownGap = 5

    let left = rect.left

    if (left + dropdownWidth > window.innerWidth - screenPadding) {
      left = window.innerWidth - dropdownWidth - screenPadding
    }

    left = Math.max(screenPadding, left)

    setDropdownPosition({
      top: rect.bottom + dropdownGap,
      left,
    })

    setOpenDropdown(filter)
  }

  // ============================================================
  // CLOSE DROPDOWN ON SCROLL OR TOUCH MOVEMENT
  // ============================================================

  useEffect(() => {
    if (!openDropdown) return

    const closeDropdown = () => {
      setOpenDropdown(null)
    }

    window.addEventListener('scroll', closeDropdown, true)

    window.addEventListener('touchmove', closeDropdown, {
      passive: true,
    })

    window.addEventListener('wheel', closeDropdown, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', closeDropdown, true)
      window.removeEventListener('touchmove', closeDropdown)
      window.removeEventListener('wheel', closeDropdown)
    }
  }, [openDropdown])

  // ============================================================
  // CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  // ============================================================

  useEffect(() => {
    if (!openDropdown) return

    const handleOutsideClick = event => {
      const target = event.target

      if (dropdownRef.current?.contains(target)) return
      if (filterBarRef.current?.contains(target)) return

      setOpenDropdown(null)
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick)
    }
  }, [openDropdown])

  // ============================================================
  // OPEN FULL FILTER PANEL
  // ============================================================

  const openFullFilterPanel = () => {
    setOpenDropdown(null)
    setShowFilterPanel(true)
  }

  // ============================================================
  // FILTER DEFINITIONS — SAME FILTER KEYS
  // ============================================================

  const filterButtons = [
    {
      key: 'datePosted',
      label: 'Date Posted',
      icon: 'calendar',
      color: 'text-blue-700',
    },
    {
      key: 'location',
      label: 'Location',
      icon: 'location',
      color: 'text-blue-700',
    },
    {
      key: 'salary',
      label: 'Salary',
      icon: 'salary',
      color: 'text-blue-700',
    },
    {
      key: 'workMode',
      label: 'Work Mode',
      icon: 'work',
      color: 'text-blue-700',
    },
    {
      key: 'employmentType',
      label: 'Work Type',
      icon: 'type',
      color: 'text-blue-700',
    },
    {
      key: 'shift',
      label: 'Shift',
      icon: 'clock',
      color: 'text-blue-800',
    },
    {
      key: 'category',
      label: 'Department',
      icon: 'department',
      color: 'text-blue-700',
    },
    {
      key: 'experience',
      label: 'Experience',
      icon: 'experience',
      color: 'text-blue-700',
    },
    {
      key: 'gender',
      label: 'Gender',
      icon: 'gender',
      color: 'text-blue-700',
    },
  ]

  // ============================================================
  // DROPDOWN CONFIGURATION
  // ============================================================

  const dropdownConfig = {
    datePosted: {
      title: 'Date Posted',
      options: ['All', 'Last 24 hours', 'Last 3 days', 'Last 7 days'],
      width: 175,
    },
    location: {
      title: 'Location',
      options: locations,
      width: 200,
    },
    salary: {
      title: 'Salary',
      options: [
        'All',
        'Below ₹15,000',
        '₹15,000 - ₹25,000',
        '₹25,000 - ₹40,000',
        'Above ₹40,000',
      ],
      width: 200,
    },
    workMode: {
      title: 'Work Mode',
      options: workModes,
      width: 180,
    },
    employmentType: {
      title: 'Work Type',
      options: employmentTypes,
      width: 180,
    },
    shift: {
      title: 'Work Shift',
      options: shifts,
      width: 170,
    },
    category: {
      title: 'Department',
      options: categories,
      width: 180,
    },
    experience: {
      title: 'Experience',
      options: experiences,
      width: 185,
    },
    gender: {
      title: 'Gender',
      options: genders,
      width: 160,
    },
  }

  // ============================================================
  // ICONS
  // ============================================================

  const FilterIcon = ({ type, className = '' }) => {
    const common = {
      width: 15,
      height: 15,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      className: `shrink-0 ${className}`,
      'aria-hidden': true,
    }

    switch (type) {
      case 'calendar':
        return (
          <svg {...common}>
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M16 3v4M8 3v4M3 10h18" />
          </svg>
        )

      case 'location':
        return (
          <svg {...common}>
            <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
        )

      case 'salary':
        return (
          <svg {...common}>
            <path d="M6 6h12M6 10h12M9 6c5 0 5 7 0 7H6l8 7" />
          </svg>
        )

      case 'work':
        return (
          <svg {...common}>
            <rect x="3" y="7" width="18" height="14" rx="2" />
            <path d="M8 7V4h8v3M3 12h18" />
          </svg>
        )

      case 'type':
        return (
          <svg {...common}>
            <path d="m12 3 9 5-9 5-9-5 9-5Z" />
            <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
          </svg>
        )

      case 'clock':
        return (
          <svg {...common}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
        )

      case 'department':
        return (
          <svg {...common}>
            <path d="M3 21h18M5 21V7h9v14M14 11h5v10M8 10h3M8 14h3M8 18h3" />
          </svg>
        )

      case 'experience':
        return (
          <svg {...common}>
            <path d="M4 20V13M10 20V9M16 20V5M22 20V2" />
            <path d="m3 9 6-4 5 1 7-5" />
          </svg>
        )

      case 'gender':
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

  const ChevronIcon = ({ isOpen }) => (
    <svg
      className={`
        w-3.5
        h-3.5
        shrink-0
        transition-transform
        duration-200
        ${isOpen ? 'rotate-180' : ''}
      `}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m5 7.5 5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  // ============================================================
  // MOBILE FILTER BUTTON STYLE
  // MATCHES DESKTOP COLORS, SIZED FOR TOUCH
  // ============================================================

  const getButtonClass = filterName => {
    const isActive = selectedFilters[filterName] !== 'All'

    return `
      h-[36px]
      shrink-0
      px-3
      rounded-xl
      text-[11px]
      font-semibold
      whitespace-nowrap
      transition-all
      duration-200
      active:scale-[0.97]
      flex
      items-center
      justify-center
      gap-1.5
      border
      shadow-[0_2px_5px_rgba(15,23,42,0.05)]
      ${
        isActive
          ? 'bg-blue-100 text-blue-900 border-blue-300'
          : 'bg-white text-blue-900 border-blue-200 hover:border-blue-300 hover:bg-blue-50/40'
      }
    `
  }

  const dropdownClass = `
    fixed
    z-[9999]
    bg-white
    border
    border-blue-200
    rounded-xl
    shadow-[0_8px_24px_rgba(37,99,180,0.14)]
    p-2
    max-h-[min(260px,40vh)]
    overflow-y-auto
  `

  // ============================================================
  // DROPDOWN OPTIONS
  // ============================================================

  const DropdownOption = ({ filterName, option }) => {
    const isSelected = selectedFilters[filterName] === option

    return (
      <button
        type="button"
        onClick={() => handleFilterChange(filterName, option)}
        className={`
          w-full
          min-h-[34px]
          px-3
          py-2
          rounded-lg
          text-[12px]
          leading-4
          text-left
          whitespace-normal
          transition-all
          active:scale-[0.98]
          ${
            isSelected
              ? 'bg-blue-700 text-white font-semibold'
              : 'text-blue-800 hover:bg-blue-100 hover:text-blue-800'
          }
        `}
      >
        {option}
      </button>
    )
  }

  const DropdownHeader = ({ children }) => (
    <div
      className="
        px-3
        pt-1
        pb-2
        text-[10px]
        font-bold
        text-blue-400
        uppercase
        tracking-wide
      "
    >
      {children}
    </div>
  )

  // ============================================================
  // RENDER ACTIVE DROPDOWN
  // ============================================================

  const renderDropdown = () => {
    if (!openDropdown) return null

    const config = dropdownConfig[openDropdown]

    if (!config) return null

    const dropdownWidth = Math.min(
      config.width,
      window.innerWidth - 16
    )

    return (
      <div
        ref={dropdownRef}
        className={dropdownClass}
        style={{
          top: dropdownPosition.top,
          left: dropdownPosition.left,
          width: dropdownWidth,
        }}
      >
        <DropdownHeader>{config.title}</DropdownHeader>

        {config.options.map(option => (
          <DropdownOption
            key={option}
            filterName={openDropdown}
            option={option}
          />
        ))}
      </div>
    )
  }

  // ============================================================
  // MAIN MOBILE UI
  // ============================================================

  return (
    <>
      <div
        className="
          relative
          z-[60]
          w-full
          bg-white
          border-b
          border-blue-200
          shadow-[0_3px_12px_rgba(37,99,180,0.04)]
        "
      >
        {/* FILTER TOOLBAR */}
        <div
          className="
            h-[54px]
            w-full
            flex
            items-center
            bg-white
          "
        >
          {/* FIXED FILTERS BUTTON */}
          <div
            className="
              shrink-0
              w-[52px]
              h-full
              flex
              items-center
              justify-center
              bg-white
              z-[70]
              border-r
              border-blue-100
            "
          >
            <button
              type="button"
              onClick={openFullFilterPanel}
              aria-label="Open all filters"
              className="
                relative
                w-[36px]
                h-[36px]
                shrink-0
                rounded-xl
                bg-gradient-to-br
                from-blue-600
                to-blue-800
                text-white
                flex
                items-center
                justify-center
                shadow-[0_3px_8px_rgba(37,99,180,0.20)]
                hover:from-blue-700
                hover:to-blue-900
                active:scale-95
                transition-all
                duration-200
              "
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 4h18l-7 8v6l-4 2v-8L3 4Z"
                  stroke="#2462AC"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {activeFilterCount > 0 && (
                <span
                  className="
                    absolute
                    -top-1.5
                    -right-1.5
                    min-w-[18px]
                    h-[18px]
                    px-1
                    bg-blue-100
                    rounded-full
                    text-[10px]
                    font-extrabold
                    flex
                    items-center
                    justify-center
                    text-blue-900
                    border
                    border-white
                    shadow-sm
                  "
                >
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* HORIZONTAL SCROLLABLE FILTER BUTTONS */}
          <div
            ref={filterBarRef}
            className="
              flex-1
              min-w-0
              h-[54px]
              px-2
              flex
              items-center
              gap-2
              overflow-x-auto
              scrollbar-hide
              overscroll-x-contain
            "
          >
            {filterButtons.map(filter => (
              <button
                key={filter.key}
                data-filter={filter.key}
                type="button"
                onClick={event => toggleDropdown(filter.key, event)}
                aria-expanded={openDropdown === filter.key}
                className={getButtonClass(filter.key)}
              >
                <FilterIcon
                  type={filter.icon}
                  className={filter.color}
                />

                <span>{filter.label}</span>

                <ChevronIcon
                  isOpen={openDropdown === filter.key}
                />
              </button>
            ))}
          </div>
        </div>

        {/* DROPDOWN — OUTSIDE THE SCROLLABLE TOOLBAR */}
        {renderDropdown()}
      </div>

      {/* FULL MOBILE FILTER PANEL */}
      {showFilterPanel && (
        <Mobile_FilterPanel
          onClose={() => {
            setOpenDropdown(null)
            setShowFilterPanel(false)
          }}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          onClear={handleClearFilters}
          locations={locations}
          categories={categories}
          workModes={workModes}
          employmentTypes={employmentTypes}
          shifts={shifts}
          experiences={experiences}
          genders={genders}
        />
      )}
    </>
  )
}

export default Mobile_Filter