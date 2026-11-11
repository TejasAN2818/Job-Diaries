
import React from 'react'

import {
  UserRound,
  BriefcaseBusiness,
  Languages,
  GraduationCap,
  ClipboardCheck,
} from 'lucide-react'

import {
  getProfileCompletionPercentage,
} from '../../../../inputs/overall/Profile_Completion_Percentage'


function Mobile_ProfileCompletion({
  profileData = {},
  onCardClick,
}) {

  // =====================================================
  // PROFILE COMPLETION
  // =====================================================

  const profileCompletion =
    getProfileCompletionPercentage(profileData)


  // =====================================================
  // PERSONAL
  // =====================================================

  const hasPersonalDetails = !!(
    profileData.dateOfBirth ||
    profileData.maritalStatus ||
    profileData.emailId
  )


  // =====================================================
  // CAREER
  // =====================================================

  const hasCareerPreference = !!(
    profileData.expectedSalary ||
    profileData.preferredJobLocation ||
    profileData.preferredIndustry ||
    profileData.preferredDesignation ||
    profileData.fieldWork
  )


  // =====================================================
  // LANGUAGE
  // =====================================================

  const hasLanguages = !!(
    profileData.motherLanguage ||
    profileData.languages?.length > 0
  )


  // =====================================================
  // EXPERIENCE
  // =====================================================

  const hasExperience = !!(
    profileData.totalExperience ||
    profileData.experience1?.designation ||
    profileData.experience1?.companyName ||
    profileData.experience2?.designation ||
    profileData.experience2?.companyName ||
    profileData.experience3?.designation ||
    profileData.experience3?.companyName
  )


  // =====================================================
  // EDUCATION
  // =====================================================

  const hasEducation = !!(
    profileData.tenth?.qualification ||
    profileData.tenth?.passoutYear ||
    profileData.tenth?.marks ||
    profileData.tenth?.collegeLocation ||

    profileData.puc?.pucName ||
    profileData.puc?.passoutYear ||
    profileData.puc?.marks ||
    profileData.puc?.collegeLocation ||

    profileData.diploma?.diplomaName ||
    profileData.diploma?.passoutYear ||
    profileData.diploma?.marks ||
    profileData.diploma?.collegeLocation ||

    profileData.degree?.degreeName ||
    profileData.degree?.passoutYear ||
    profileData.degree?.marks ||
    profileData.degree?.collegeLocation ||

    profileData.masters?.mastersName ||
    profileData.masters?.passoutYear ||
    profileData.masters?.marks ||
    profileData.masters?.collegeLocation
  )


  // =====================================================
  // MISSING DETAILS
  // =====================================================

  const getMissingDetails = () => {

    let missing = 0

    const fields = [

      // PERSONAL
      profileData.dateOfBirth,
      profileData.maritalStatus,
      profileData.emailId,

      // CAREER
      profileData.expectedSalary,
      profileData.preferredJobLocation,
      profileData.preferredIndustry,
      profileData.preferredDesignation,
      profileData.fieldWork,

      // LANGUAGE
      profileData.motherLanguage,

      // EXPERIENCE
      profileData.totalExperience,

      // 10TH
      profileData.tenth?.qualification,
      profileData.tenth?.passoutYear,
      profileData.tenth?.marks,
      profileData.tenth?.collegeLocation,

      // PUC
      profileData.puc?.pucName,
      profileData.puc?.passoutYear,
      profileData.puc?.marks,
      profileData.puc?.collegeLocation,

      // DIPLOMA
      profileData.diploma?.diplomaName,
      profileData.diploma?.passoutYear,
      profileData.diploma?.marks,
      profileData.diploma?.collegeLocation,

      // DEGREE
      profileData.degree?.degreeName,
      profileData.degree?.passoutYear,
      profileData.degree?.marks,
      profileData.degree?.collegeLocation,

      // MASTERS
      profileData.masters?.mastersName,
      profileData.masters?.passoutYear,
      profileData.masters?.marks,
      profileData.masters?.collegeLocation,

    ]

    fields.forEach((value) => {

      if (
        value === undefined ||
        value === null ||
        String(value).trim() === ''
      ) {
        missing += 1
      }

    })

    if (!profileData.languages?.length) {
      missing += 1
    }

    return missing
  }


  const missingDetails = getMissingDetails()


  // =====================================================
  // ICON CONFIGURATION
  // =====================================================

  const ProfileIcon = ({ title }) => {

    const normalizedTitle = title.toLowerCase()

    const iconConfig = normalizedTitle.includes('personal')
      ? {
          Icon: UserRound,
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          border: 'border-blue-100',
        }
      : normalizedTitle.includes('career')
        ? {
            Icon: BriefcaseBusiness,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            border: 'border-blue-100',
          }
        : normalizedTitle.includes('language')
          ? {
              Icon: Languages,
              color: 'text-blue-700',
              bg: 'bg-blue-100',
              border: 'border-blue-200',
            }
          : normalizedTitle.includes('experience')
            ? {
                Icon: BriefcaseBusiness,
                color: 'text-blue-600',
                bg: 'bg-blue-50',
                border: 'border-blue-100',
              }
            : normalizedTitle.includes('education')
              ? {
                  Icon: GraduationCap,
                  color: 'text-blue-600',
                  bg: 'bg-blue-50',
                  border: 'border-blue-100',
                }
              : {
                  Icon: ClipboardCheck,
                  color: 'text-blue-600',
                  bg: 'bg-blue-50',
                  border: 'border-blue-100',
                }

    const {
      Icon,
      color,
      bg,
      border,
    } = iconConfig

    return (

      <div
        className={`
          flex
          h-[44px]
          w-[44px]
          items-center
          justify-center
          rounded-[13px]
          border
          ${border}
          ${bg}
          shadow-sm
          transition-all
          duration-300
          group-hover:scale-105
          group-hover:shadow-md
        `}
      >

        <Icon
          size={22}
          strokeWidth={1.8}
          className={`
            ${color}
            transition-transform
            duration-300
            group-hover:-rotate-3
          `}
        />

      </div>
    )
  }


  // =====================================================
  // COMPLETION CARD
  // =====================================================

  const CompletionCard = () => (

    <button
      type="button"
      onClick={() => onCardClick?.('completion')}
      className="
        group
        relative
        flex
        h-[140px]
        w-[132px]
        shrink-0
        snap-start
        flex-col
        items-center
        justify-center
        overflow-hidden
        rounded-[17px]
        border
        border-blue-200/80
        bg-gradient-to-br
        from-blue-400
        via-blue-400
        to-blue-500
        shadow-[0_5px_16px_rgba(37,99,180,0.12)]
        transition-all
        duration-300
        active:scale-[0.97]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-blue-600
        focus-visible:ring-offset-2
      "
    >

      {/* Decorative background */}

      <div
        className="
          pointer-events-none
          absolute
          -right-7
          -top-8
          h-[65px]
          w-[65px]
          rounded-full
          bg-white/15
          transition-transform
          duration-500
          group-hover:scale-150
        "
      />


      {/* Completion percentage */}

      <div
        className="
          relative
          flex
          h-[62px]
          w-[62px]
          flex-col
          items-center
          justify-center
          rounded-full
          border-[3px]
          border-white/90
          bg-white
          shadow-md
          transition-transform
          duration-300
          group-hover:rotate-3
        "
      >

        <span
          className="
            text-[18px]
            font-extrabold
            leading-[21px]
            tracking-tight
            text-blue-900
          "
        >
          {profileCompletion}%
        </span>

        <span
          className="
            mt-[1px]
            text-[8px]
            font-semibold
            leading-[10px]
            text-blue-700
          "
        >
          profile
        </span>

        <span
          className="
            text-[8px]
            font-semibold
            leading-[10px]
            text-blue-700
          "
        >
          completion
        </span>

      </div>


      {/* Completion status */}

      <span
        className="
          relative
          mt-[8px]
          max-w-[122px]
          truncate
          rounded-full
          border
          border-white/70
          bg-white/90
          px-[8px]
          py-[5px]
          text-[8px]
          font-bold
          leading-[10px]
          text-blue-800
          shadow-sm
        "
      >
        {missingDetails > 0
          ? `${missingDetails} details missing`
          : 'Profile complete'}
      </span>

    </button>
  )


  // =====================================================
  // NORMAL PROFILE CARD
  // =====================================================

  const ProfileCard = ({
    title,
    buttonText,
    section,
    completed,
  }) => (

    <button
      type="button"
      onClick={() => onCardClick?.(section)}
      className="
        group
        relative
        flex
        h-[140px]
        w-[132px]
        shrink-0
        snap-start
        flex-col
        items-center
        justify-center
        overflow-hidden
        rounded-[17px]
        border
        border-blue-100
        bg-gradient-to-br
        from-white
        via-white
        to-blue-50
        shadow-[0_4px_14px_rgba(15,23,42,0.05)]
        transition-all
        duration-300
        active:scale-[0.97]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-blue-600
        focus-visible:ring-offset-2
      "
    >

      {/* Top accent */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-[3px]
          origin-left
          scale-x-0
          bg-gradient-to-r
          from-blue-500
          to-blue-400
          transition-transform
          duration-300
          group-hover:scale-x-100
        "
      />


      {/* Category icon */}

      <ProfileIcon title={title} />


      {/* Category title */}

      <span
        className="
          mt-[7px]
          min-h-[26px]
          max-w-[122px]
          px-[4px]
          text-center
          text-[10px]
          font-bold
          leading-[13px]
          tracking-[-0.2px]
          text-blue-900
        "
      >
        {title}
      </span>


      {/* Status badge */}

      <span
        className={`
          mt-[5px]
          max-w-[122px]
          truncate
          rounded-full
          border
          px-[8px]
          py-[5px]
          text-[8px]
          font-bold
          leading-[10px]
          transition-all
          duration-300
          ${
            completed
              ? 'border-blue-200 bg-blue-50 text-blue-700 group-hover:bg-blue-100'
              : 'border-blue-200 bg-blue-100 text-blue-900 group-hover:border-blue-200 group-hover:bg-blue-100'
          }
        `}
      >
        {completed ? 'Update details' : buttonText}
      </span>

    </button>
  )


  // =====================================================
  // RETURN
  // =====================================================

  return (

    <section className="w-full min-w-0 font-sans">

      {/* Heading */}

      <div className="mb-[8px] flex items-center justify-between px-[5px]">

        <h2
          className="
            text-[17px]
            font-extrabold
            leading-[22px]
            tracking-[-0.5px]
            text-blue-900
          "
        >
          Complete your profile
          <span className="ml-1 text-blue-600">
            &gt;
          </span>
        </h2>

      </div>


      {/* Horizontal card list */}

      <div
        className="
          flex
          w-full
          min-w-0
          snap-x
          snap-proximity
          gap-[8px]
          overflow-x-auto
          overflow-y-hidden
          rounded-xl
          px-[5px]
          pt-[4px]
          pb-[10px]
          scroll-smooth
          overscroll-x-contain
          [scrollbar-width:thin]
          [scrollbar-color:#2462AC_#C8DCF7]
          [&::-webkit-scrollbar]:h-1.5
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-blue-200
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-blue-600
          [&::-webkit-scrollbar-thumb:hover]:bg-blue-700
        "
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >

        {/* COMPLETION */}

        <CompletionCard />


        {/* PERSONAL */}

        <ProfileCard
          title="Personal details"
          buttonText="Update details"
          section="personal"
          completed={hasPersonalDetails}
        />


        {/* CAREER */}

        <ProfileCard
          title="Career preference"
          buttonText="Update prepared job"
          section="career"
          completed={hasCareerPreference}
        />


        {/* LANGUAGE */}

        <ProfileCard
          title="Language preference"
          buttonText="Update languages"
          section="language"
          completed={hasLanguages}
        />


        {/* EXPERIENCE */}

        <ProfileCard
          title="Work experience"
          buttonText="Update your experience"
          section="experience"
          completed={hasExperience}
        />


        {/* EDUCATION */}

        <ProfileCard
          title="Education"
          buttonText="Update education"
          section="education"
          completed={hasEducation}
        />

      </div>

    </section>
  )
}


export default Mobile_ProfileCompletion
