
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

function Desktop_ProfileCompletion({
  profileData = {},
  onCardClick,
}) {
  const profileCompletion =
    getProfileCompletionPercentage(profileData)

  // Personal
  const hasPersonalDetails = !!(
    profileData.dateOfBirth ||
    profileData.maritalStatus ||
    profileData.emailId
  )

  // Career
  const hasCareerPreference = !!(
    profileData.expectedSalary ||
    profileData.preferredJobLocation ||
    profileData.preferredIndustry ||
    profileData.preferredDesignation ||
    profileData.fieldWork
  )

  // Language
  const hasLanguages = !!(
    profileData.motherLanguage ||
    profileData.languages?.length > 0
  )

  // Experience
  const hasExperience = !!(
    profileData.totalExperience ||
    profileData.experience1?.designation ||
    profileData.experience1?.companyName ||
    profileData.experience2?.designation ||
    profileData.experience2?.companyName ||
    profileData.experience3?.designation ||
    profileData.experience3?.companyName
  )

  // Education
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

  // Missing details
  const getMissingDetails = () => {
    let missing = 0

    const fields = [
      profileData.dateOfBirth,
      profileData.maritalStatus,
      profileData.emailId,

      profileData.expectedSalary,
      profileData.preferredJobLocation,
      profileData.preferredIndustry,
      profileData.preferredDesignation,
      profileData.fieldWork,

      profileData.motherLanguage,
      profileData.totalExperience,

      profileData.tenth?.qualification,
      profileData.tenth?.passoutYear,
      profileData.tenth?.marks,
      profileData.tenth?.collegeLocation,

      profileData.puc?.pucName,
      profileData.puc?.passoutYear,
      profileData.puc?.marks,
      profileData.puc?.collegeLocation,

      profileData.diploma?.diplomaName,
      profileData.diploma?.passoutYear,
      profileData.diploma?.marks,
      profileData.diploma?.collegeLocation,

      profileData.degree?.degreeName,
      profileData.degree?.passoutYear,
      profileData.degree?.marks,
      profileData.degree?.collegeLocation,

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

  // Icons based on card title
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

    const { Icon, color, bg, border } = iconConfig

    return (
      <div
        className={`
          flex h-[66px] w-[66px] items-center justify-center
          rounded-[20px] border ${border} ${bg}
          shadow-sm transition-all duration-300
          group-hover:scale-110 group-hover:shadow-md
        `}
      >
        <Icon
          size={32}
          strokeWidth={1.8}
          className={`${color} transition-transform duration-300 group-hover:-rotate-3`}
        />
      </div>
    )
  }

  // Profile completion card
  const CompletionCard = () => (
    <button
      type="button"
      onClick={() => onCardClick?.('completion')}
      className="
        group relative flex h-[165px] w-[205px] shrink-0
        flex-col items-center justify-center overflow-hidden
        rounded-[22px] border border-blue-200/80
        bg-gradient-to-br from-blue-400 via-blue-400 to-blue-500
        shadow-[0_5px_16px_rgba(37,99,180,0.12)]
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(37,99,180,0.22)]
        active:scale-[0.97]
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-blue-600 focus-visible:ring-offset-2
      "
    >
      <div className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full bg-white/15 transition-transform duration-500 group-hover:scale-150" />

      <div className="relative flex h-[82px] w-[82px] flex-col items-center justify-center rounded-full border-[3px] border-white/90 bg-white shadow-md transition-transform duration-300 group-hover:rotate-3">
        <span className="text-[21px] font-extrabold leading-[23px] tracking-tight text-blue-900">
          {profileCompletion}%
        </span>

        <span className="mt-0.5 text-[10px] font-semibold leading-3 text-blue-700">
          profile
        </span>

        <span className="text-[10px] font-semibold leading-3 text-blue-700">
          completion
        </span>
      </div>

      <span className="relative mt-[10px] max-w-[185px] truncate rounded-full border border-white/70 bg-white/90 px-[12px] py-[6px] text-[10px] font-bold leading-[11px] text-blue-800 shadow-sm">
        {missingDetails > 0
          ? `${missingDetails} details missing`
          : 'Profile complete'}
      </span>
    </button>
  )

  // Reusable section card
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
        group relative flex h-[165px] w-[205px] shrink-0
        flex-col items-center justify-center overflow-hidden
        rounded-[22px] border border-blue-100
        bg-gradient-to-br from-white via-white to-blue-50
        shadow-[0_4px_14px_rgba(15,23,42,0.05)]
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:border-blue-300
        hover:shadow-[0_12px_25px_rgba(15,23,42,0.10)]
        active:scale-[0.97]
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-blue-600 focus-visible:ring-offset-2
      "
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[4px] origin-left scale-x-0 bg-gradient-to-r from-blue-500 to-blue-400 transition-transform duration-300 group-hover:scale-x-100" />

      <ProfileIcon title={title} />

      <span className="mt-[8px] max-w-[190px] px-[5px] text-center text-[12px] font-bold leading-[15px] tracking-[-0.2px] text-blue-900">
        {title}
      </span>

      <span
        className={`
          mt-[10px] max-w-[190px] truncate rounded-full
          border px-[12px] py-[6px] text-[10px] font-bold
          leading-[11px] transition-all duration-300
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

  return (
    <section className="w-full min-w-0 font-sans">
      <h2 className="mb-[12px] px-[5px] text-[20px] font-extrabold leading-[26px] tracking-[-0.6px] text-blue-900">
        Complete your profile
        <span className="ml-1 text-blue-600">&gt;</span>
      </h2>

      {/* Horizontal card list with visible scrollbar */}
      <div
        className="
          flex w-full min-w-0 gap-5
          overflow-x-auto overflow-y-hidden
          px-2 pt-2 pb-4
          snap-x snap-proximity rounded-xl
          scroll-smooth overscroll-x-contain
          [scrollbar-width:thin]
          [scrollbar-color:#2462AC_#C8DCF7]
          [&::-webkit-scrollbar]:h-2
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
        <div className="shrink-0 snap-start">
          <CompletionCard />
        </div>

        <div className="shrink-0 snap-start">
          <ProfileCard
            title="Personal details"
            buttonText="Update details"
            section="personal"
            completed={hasPersonalDetails}
          />
        </div>

        <div className="shrink-0 snap-start">
          <ProfileCard
            title="Career preference"
            buttonText="Update prepared job"
            section="career"
            completed={hasCareerPreference}
          />
        </div>

        <div className="shrink-0 snap-start">
          <ProfileCard
            title="Language preference"
            buttonText="Update languages"
            section="language"
            completed={hasLanguages}
          />
        </div>

        <div className="shrink-0 snap-start">
          <ProfileCard
            title="Work experience"
            buttonText="Update your experience"
            section="experience"
            completed={hasExperience}
          />
        </div>

        <div className="shrink-0 snap-start">
          <ProfileCard
            title="Education"
            buttonText="Update education"
            section="education"
            completed={hasEducation}
          />
        </div>
      </div>
    </section>
  )
}

export default Desktop_ProfileCompletion
