
import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
} from 'react'

import Desktop_FilterPanel from './Desktop_FilterPanel'
import Job_Data from '../../../inputs/overall/Job_Data'

function Desktop_Filter({
  selectedFilters,
  setSelectedFilters,
}) {
  const [showFilterPanel, setShowFilterPanel] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)

  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
  })

  const dropdownRef = useRef(null)
  const filterBarRef = useRef(null)

  // ============================================================
  // FILTER OPTIONS — PRESERVED
  // ============================================================

  const locations = useMemo(() => [
    'All',
    ...new Set(Job_Data.map(job => job.location).filter(Boolean)),
  ], [])

  const categories = useMemo(() => [
    'All',
    ...new Set(Job_Data.map(job => job.category).filter(Boolean)),
  ], [])

  const workModes = useMemo(() => [
    'All',
    ...new Set(Job_Data.map(job => job.workMode).filter(Boolean)),
  ], [])

  const employmentTypes = useMemo(() => [
    'All',
    ...new Set(Job_Data.map(job => job.employmentType).filter(Boolean)),
  ], [])

  const shifts = useMemo(() => [
    'All',
    ...new Set(Job_Data.map(job => job.sfift).filter(Boolean)),
  ], [])

  const experiences = useMemo(() => [
    'All',
    ...new Set(Job_Data.map(job => job.workExperience).filter(Boolean)),
  ], [])

  const genders = useMemo(() => [
    'All',
    ...new Set(Job_Data.map(job => job.gender).filter(Boolean)),
  ], [])

  const activeFilterCount = Object.values(selectedFilters)
    .filter(value => value !== 'All').length

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
  // DROPDOWN POSITIONING
  // ============================================================

  const updateDropdownPosition = (filter) => {
    const button = filterBarRef.current?.querySelector(
      `[data-filter="${filter}"]`
    )

    if (!button) return

    const rect = button.getBoundingClientRect()
    const dropdownWidth = window.innerWidth * 0.15
    const screenPadding = window.innerWidth * 0.01

    let left = rect.left

    if (
      left + dropdownWidth >
      window.innerWidth - screenPadding
    ) {
      left =
        window.innerWidth -
        dropdownWidth -
        screenPadding
    }

    left = Math.max(screenPadding, left)

    setDropdownPosition({
      top: rect.bottom + window.innerHeight * 0.006,
      left,
    })
  }

  const toggleDropdown = (filter) => {
    if (openDropdown === filter) {
      setOpenDropdown(null)
      return
    }

    updateDropdownPosition(filter)
    setOpenDropdown(filter)
  }

  // ============================================================
  // KEEP DROPDOWN OPEN AND FOLLOW BUTTON DURING SCROLL
  // ============================================================

  useEffect(() => {
    if (!openDropdown) return

    const repositionDropdown = () => {
      updateDropdownPosition(openDropdown)
    }

    window.addEventListener(
      'scroll',
      repositionDropdown,
      true
    )

    window.addEventListener(
      'resize',
      repositionDropdown
    )

    return () => {
      window.removeEventListener(
        'scroll',
        repositionDropdown,
        true
      )

      window.removeEventListener(
        'resize',
        repositionDropdown
      )
    }
  }, [openDropdown])

  // ============================================================
  // CLOSE DROPDOWN ON OUTSIDE CLICK
  // ============================================================

  useEffect(() => {
    if (!openDropdown) return

    const handleOutsideClick = event => {
      const target = event.target

      if (dropdownRef.current?.contains(target)) return
      if (filterBarRef.current?.contains(target)) return

      setOpenDropdown(null)
    }

    document.addEventListener(
      'mousedown',
      handleOutsideClick
    )

    document.addEventListener(
      'touchstart',
      handleOutsideClick
    )

    return () => {
      document.removeEventListener(
        'mousedown',
        handleOutsideClick
      )

      document.removeEventListener(
        'touchstart',
        handleOutsideClick
      )
    }
  }, [openDropdown])

  const openFullFilterPanel = () => {
    setOpenDropdown(null)
    setShowFilterPanel(true)
  }

  // ============================================================
  // COMPACT FILTER BUTTON STYLE — PRESERVED
  // ============================================================

  const getButtonClass = filterName => {
    const isActive = selectedFilters[filterName] !== 'All'

    return `
      h-[5.5vh]
      shrink-0
      px-[0.65vw]
      rounded-xl
      text-[clamp(10px,0.68vw,13px)]
      font-semibold
      whitespace-nowrap
      transition-all
      duration-200
      flex
      items-center
      justify-center
      gap-[0.35vw]
      border
      shadow-[0_3px_8px_rgba(37,99,180,0.12)]
      ${
        isActive
          ? 'bg-[#DCEBFF] text-[#102448] border-[#B8D3F5]'
          : 'bg-white text-[#102448] border-[#D7E5F8] hover:border-[#8DB8EF] hover:bg-[#F1F7FF]'
      }
    `
  }

  const dropdownClass = `
    fixed
    z-[9999]
    bg-white
    border
    border-[#D5E4F7]
    rounded-xl
    shadow-[0_8px_24px_rgba(35,86,150,0.18)]
    p-2
    max-h-[30vh]
    overflow-y-auto
  `

  // ============================================================
  // ICONS
  // ============================================================

  const FilterIcon = ({ type, className = '' }) => {
    const common = {
      width: 17,
      height: 17,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2.2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      className: `shrink-0 ${className}`,
      'aria-hidden': true,
    }

    switch (type) {
      case 'date':
        return (
          <svg {...common}>
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M16 3v4M8 3v4M3 10h18M8 14h2M14 14h2M8 17h2" />
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

      case 'mode':
        return (
          <svg {...common}>
            <rect x="3" y="7" width="18" height="14" rx="2" />
            <path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2" />
          </svg>
        )

      case 'type':
        return (
          <svg {...common}>
            <path d="m12 3 9 5-9 5-9-5 9-5Z" />
            <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
          </svg>
        )

      case 'shift':
        return (
          <svg {...common}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
        )

      case 'department':
        return (
          <svg {...common}>
            <path d="M3 21h18M5 21V7h9v14M14 11h5v10M8 10h3M8 14h3M8 18h3M17 15h1M17 18h1" />
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
        w-3
        h-3
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
          min-h-9
          px-3
          py-2
          rounded-lg
          text-sm
          text-left
          whitespace-nowrap
          transition-colors
          ${
            isSelected
              ? 'bg-[#3478C5] text-white font-semibold'
              : 'text-[#172B4D] hover:bg-[#EAF3FF] hover:text-[#1D63B5]'
          }
        `}
      >
        {option}
      </button>
    )
  }

  const DropdownHeader = ({ children }) => (
    <div className="
      px-3
      pt-1
      pb-2
      text-xs
      font-bold
      text-[#7890B2]
      uppercase
      tracking-wide
    ">
      {children}
    </div>
  )

  // ============================================================
  // DROPDOWN RENDERING — SAME OPTIONS AND FILTER KEYS
  // ============================================================

  const renderDropdown = () => {
    if (!openDropdown) return null

    let title = ''
    let options = []
    let width = 'w-[15vw]'

    switch (openDropdown) {
      case 'datePosted':
        title = 'Date Posted'
        options = [
          'All',
          'Last 24 hours',
          'Last 3 days',
          'Last 7 days',
        ]
        width = 'w-[13vw]'
        break

      case 'location':
        title = 'Location'
        options = locations
        width = 'w-[15vw]'
        break

      case 'salary':
        title = 'Salary'
        options = [
          'All',
          'Below ₹15,000',
          '₹15,000 - ₹25,000',
          '₹25,000 - ₹40,000',
          'Above ₹40,000',
        ]
        width = 'w-[14vw]'
        break

      case 'workMode':
        title = 'Work Mode'
        options = workModes
        width = 'w-[13vw]'
        break

      case 'employmentType':
        title = 'Work Type'
        options = employmentTypes
        width = 'w-[13vw]'
        break

      case 'shift':
        title = 'Work Shift'
        options = shifts
        width = 'w-[12vw]'
        break

      case 'category':
        title = 'Department'
        options = categories
        width = 'w-[13vw]'
        break

      case 'experience':
        title = 'Experience'
        options = experiences
        width = 'w-[13.5vw]'
        break

      case 'gender':
        title = 'Gender'
        options = genders
        width = 'w-[12vw]'
        break

      default:
        return null
    }

    return (
      <div
        ref={dropdownRef}
        className={`${dropdownClass} ${width}`}
        style={{
          top: dropdownPosition.top,
          left: dropdownPosition.left,
        }}
      >
        <DropdownHeader>{title}</DropdownHeader>

        {options.map(option => (
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
  // FILTER BUTTON DEFINITIONS
  // ============================================================

  const filterButtons = [
    {
      key: 'datePosted',
      label: 'Date Posted',
      icon: 'date',
      color: 'text-[#2474CC]',
    },
    {
      key: 'location',
      label: 'Location',
      icon: 'location',
      color: 'text-[#2474CC]',
    },
    {
      key: 'salary',
      label: 'Salary',
      icon: 'salary',
      color: 'text-[#2474CC]',
    },
    {
      key: 'workMode',
      label: 'Work Mode',
      icon: 'mode',
      color: 'text-[#2474CC]',
    },
    {
      key: 'employmentType',
      label: 'Work Type',
      icon: 'type',
      color: 'text-[#2474CC]',
    },
    {
      key: 'shift',
      label: 'Shift',
      icon: 'shift',
      color: 'text-[#2474CC]',
    },
    {
      key: 'category',
      label: 'Department',
      icon: 'department',
      color: 'text-[#2474CC]',
    },
    {
      key: 'experience',
      label: 'Experience',
      icon: 'experience',
      color: 'text-[#2474CC]',
    },
    {
      key: 'gender',
      label: 'Gender',
      icon: 'gender',
      color: 'text-[#2474CC]',
    },
  ]

  // ============================================================
  // UI — ORIGINAL TOOLBAR WIDTH AND HEIGHT PRESERVED
  // ============================================================

  return (
    <>
      <div className="
        relative
        z-[60]
        w-full
        bg-gradient-to-b from-[#DCEBFF] to-[#C7DEFA]
        border-b
        border-[#AFCDF2]
        shadow-[0_3px_12px_rgba(39,101,174,0.12)]
      ">
        <div className="
          min-h-[8vh]
          w-[96%]
          mx-auto
          flex
          items-center
          gap-[0.55vw]
        ">
          {/* FILTERS BUTTON */}
          <button
            type="button"
            onClick={openFullFilterPanel}
            className="
              relative
              shrink-0
              h-[5.5vh]
              px-[0.85vw]
              rounded-xl
              bg-gradient-to-br
              from-white
              to-[#F2F7FF]
              text-[#102448]
              border
              border-[#C8DCF7]
              flex
              items-center
              justify-center
              gap-[0.4vw]
              text-[clamp(11px,0.72vw,13px)]
              font-bold
              shadow-[0_3px_8px_rgba(37,99,180,0.16)]
              hover:from-[#F5F9FF]
              hover:to-[#E5F0FF]
              active:scale-[0.98]
              transition-all
              duration-200
            "
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 4h18l-7 8v6l-4 2v-8L3 4Z"
                stroke="#2474CC"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span>Filters</span>

            {activeFilterCount > 0 && (
              <span className="
                min-w-4
                h-4
                px-1
                bg-[#3478C5]
                rounded-full
                text-[10px]
                font-extrabold
                flex
                items-center
                justify-center
                text-white
              ">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* NINE COMPACT FILTER DROPDOWNS */}
          <div
            ref={filterBarRef}
            className="
              flex-1
              min-w-0
              flex
              items-center
              gap-[0.4vw]
              overflow-x-auto
              scrollbar-hide
              py-[1vh]
            "
          >
            {filterButtons.map(filter => (
              <button
                key={filter.key}
                data-filter={filter.key}
                type="button"
                onClick={() => toggleDropdown(filter.key)}
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

        {renderDropdown()}
      </div>

      {/* FULL FILTER PANEL — PRESERVED */}
      {showFilterPanel && (
        <Desktop_FilterPanel
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

export default Desktop_Filter
