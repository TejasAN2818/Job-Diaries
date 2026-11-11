import React, { useState } from 'react'

import Desktop_ProfileBottomSheet from './Desktop_ProfileBottomSheet'

import {
  EMPTY_EXPERIENCE,
} from '../../../../inputs/overall/Profile_Data'


function Desktop_WorkExperience({
  profileData,
  setProfileData,
  onClose,
}) {

  // =====================================================
  // POPUP STATE
  // =====================================================

  const [showExperiencePopup, setShowExperiencePopup] =
    useState(false)


  // =====================================================
  // FORM STATE
  // =====================================================

  const [designation, setDesignation] =
    useState('')

  const [industry, setIndustry] =
    useState('')

  const [salary, setSalary] =
    useState('')

  const [years, setYears] =
    useState('')

  const [companyName, setCompanyName] =
    useState('')


  // =====================================================
  // EDIT STATE
  // =====================================================

  const [editingExperience, setEditingExperience] =
    useState(null)


  // =====================================================
  // GET EXISTING EXPERIENCES
  // =====================================================

  const experiences = [
    profileData?.experience1,
    profileData?.experience2,
    profileData?.experience3,
  ]


  // =====================================================
  // OPEN ADD EXPERIENCE POPUP
  // =====================================================

  const openAddExperiencePopup = () => {

    setEditingExperience(null)

    setDesignation('')
    setIndustry('')
    setSalary('')
    setYears('')
    setCompanyName('')

    setShowExperiencePopup(true)
  }


  // =====================================================
  // CLOSE EXPERIENCE POPUP
  // =====================================================

  const closeExperiencePopup = () => {

    setShowExperiencePopup(false)
    setEditingExperience(null)
    setDesignation('')
    setIndustry('')
    setSalary('')
    setYears('')
    setCompanyName('')
  }


  // =====================================================
  // FIND NEXT AVAILABLE EXPERIENCE
  // =====================================================

  const getNextExperienceKey = (currentProfile) => {

    if (
      !currentProfile?.experience1?.designation &&
      !currentProfile?.experience1?.companyName &&
      !currentProfile?.experience1?.industry &&
      !currentProfile?.experience1?.salary &&
      !currentProfile?.experience1?.years
    ) {
      return 'experience1'
    }


    if (
      !currentProfile?.experience2?.designation &&
      !currentProfile?.experience2?.companyName &&
      !currentProfile?.experience2?.industry &&
      !currentProfile?.experience2?.salary &&
      !currentProfile?.experience2?.years
    ) {
      return 'experience2'
    }


    if (
      !currentProfile?.experience3?.designation &&
      !currentProfile?.experience3?.companyName &&
      !currentProfile?.experience3?.industry &&
      !currentProfile?.experience3?.salary &&
      !currentProfile?.experience3?.years
    ) {
      return 'experience3'
    }


    return null
  }


  // =====================================================
  // SAVE EXPERIENCE
  // =====================================================

  const saveExperience = () => {

    const cleanDesignation =
      designation.trim()

    const cleanIndustry =
      industry.trim()

    const cleanCompanyName =
      companyName.trim()


    // =================================================
    // DESIGNATION REQUIRED
    // =================================================

    if (!cleanDesignation) {
      return
    }


    // =================================================
    // COMPANY REQUIRED
    // =================================================

    if (!cleanCompanyName) {
      return
    }


    setProfileData(prev => {

      // =================================================
      // EDIT EXISTING EXPERIENCE
      // =================================================

      if (editingExperience) {

        return {
          ...prev,

          [editingExperience]: {
            ...prev[editingExperience],

            designation:
              cleanDesignation,

            industry:
              cleanIndustry,

            salary:
              salary,

            years:
              years,

            companyName:
              cleanCompanyName,
          },
        }
      }


      // =================================================
      // FIND NEXT EXPERIENCE SLOT
      // =================================================

      const nextKey =
        getNextExperienceKey(prev)


      // =================================================
      // MAXIMUM 3 EXPERIENCES
      // =================================================

      if (!nextKey) {
        return prev
      }


      // =================================================
      // ADD EXPERIENCE
      // =================================================

      return {
        ...prev,

        [nextKey]: {
          ...EMPTY_EXPERIENCE,

          designation:
            cleanDesignation,

          industry:
            cleanIndustry,

          salary:
            salary,

          years:
            years,

          companyName:
            cleanCompanyName,
        },
      }

    })


    // =================================================
    // CLOSE POPUP
    // =================================================

    closeExperiencePopup()
  }


  // =====================================================
  // EDIT EXPERIENCE
  // =====================================================

  const editExperience = (
    experience,
    index
  ) => {

    setEditingExperience(
      `experience${index + 1}`
    )

    setDesignation(
      experience?.designation || ''
    )

    setIndustry(
      experience?.industry || ''
    )

    setSalary(
      experience?.salary || ''
    )

    setYears(
      experience?.years || ''
    )

    setCompanyName(
      experience?.companyName || ''
    )

    setShowExperiencePopup(true)
  }


  // =====================================================
  // REMOVE EXPERIENCE
  // =====================================================

  const removeExperience = (index) => {

    const key =
      `experience${index + 1}`


    setProfileData(prev => ({

      ...prev,

      [key]: {
        ...EMPTY_EXPERIENCE,
      },

    }))
  }


  // =====================================================
  // UPDATE TOTAL EXPERIENCE
  // =====================================================

  const updateTotalExperience = (value) => {

    setProfileData(prev => ({

      ...prev,

      totalExperience:
        value,

    }))
  }


  // =====================================================
  // CHECK WHETHER ANY EXPERIENCE EXISTS
  // =====================================================

  const hasAnyExperience =
    experiences.some(experience =>
      experience?.designation ||
      experience?.industry ||
      experience?.salary ||
      experience?.years ||
      experience?.companyName
    )


  // =====================================================
  // CHECK MAX EXPERIENCE
  // =====================================================

  const hasMaximumExperiences =
    experiences.every(experience =>
      experience?.designation ||
      experience?.industry ||
      experience?.salary ||
      experience?.years ||
      experience?.companyName
    )


  // =====================================================
  // RETURN
  // =====================================================

  return (

    <Desktop_ProfileBottomSheet
      title="Work experience"
      onClose={onClose}
      onSave={onClose}
    >

      <div className="space-y-7">

        {/* =================================================
            INTRO
        ================================================= */}

        <div>

          <h3
            className="
              text-[20px]
              font-bold
              text-blue-900
            "
          >
            Work experience
          </h3>

          <p
            className="
              text-[13px]
              leading-[20px]
              text-blue-400
              mt-2
              max-w-[650px]
            "
          >
            Add your previous work experience
            to help employers understand your
            career background.
          </p>

        </div>


        {/* =================================================
            TOTAL EXPERIENCE
        ================================================= */}

        <div>

          <label className="profile-label">
            Total work experience
          </label>

          <input
            type="number"
            min="0"
            step="0.1"
            value={
              profileData?.totalExperience || ''
            }
            onChange={(e) =>
              updateTotalExperience(
                e.target.value
              )
            }
            className="
              profile-input
              h-[48px]
            "
            placeholder="Enter total experience in years"
          />

        </div>


        {/* =================================================
            ADD EXPERIENCE BUTTON
        ================================================= */}

        {!hasMaximumExperiences && (

          <button
            type="button"
            onClick={openAddExperiencePopup}
            className="
              w-full
              h-[50px]
              rounded-xl
              border
              border-dashed
              border-[#C8DCF7]
              bg-[#E4EFFF]
              text-[#2462AC]
              text-[14px]
              font-bold
              flex
              items-center
              justify-center
              gap-2
              hover:bg-[#E4EFFF]
              active:scale-[0.98]
              transition-all
            "
          >

            <span
              className="
                text-[22px]
                leading-none
                font-medium
              "
            >
              +
            </span>

            <span>
              Add work experience
            </span>

          </button>

        )}


        {/* =================================================
            ADDED EXPERIENCE
        ================================================= */}

        {hasAnyExperience && (

          <div>

            {/* SECTION HEADER */}

            <div
              className="
                flex
                items-center
                justify-between
                mb-4
              "
            >

              <div>

                <h3
                  className="
                    text-[17px]
                    font-bold
                    text-blue-900
                  "
                >
                  Added experience
                </h3>

                <p
                  className="
                    text-[12px]
                    text-blue-400
                    mt-1
                  "
                >
                  Your previous work experience
                </p>

              </div>


              <span
                className="
                  min-w-[34px]
                  h-[28px]
                  px-3
                  rounded-full
                  bg-[#E4EFFF]
                  text-[#2462AC]
                  text-[12px]
                  font-bold
                  flex
                  items-center
                  justify-center
                "
              >
                {
                  experiences.filter(experience =>
                    experience?.designation ||
                    experience?.industry ||
                    experience?.salary ||
                    experience?.years ||
                    experience?.companyName
                  ).length
                }
              </span>

            </div>


            {/* EXPERIENCE CARDS */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

              {experiences.map(
                (experience, index) => {

                  const hasData =
                    experience?.designation ||
                    experience?.industry ||
                    experience?.salary ||
                    experience?.years ||
                    experience?.companyName


                  if (!hasData) {
                    return null
                  }


                  return (

                    <div
                      key={index}
                      className="
                        bg-white
                        border
                        border-blue-200
                        rounded-2xl
                        px-5
                        py-5
                        shadow-sm
                      "
                    >

                      <div
                        className="
                          flex
                          items-start
                          justify-between
                          gap-4
                        "
                      >

                        {/* =================================================
                            EXPERIENCE INFO
                        ================================================= */}

                        <div
                          className="
                            flex
                            items-start
                            gap-4
                            min-w-0
                          "
                        >

                          {/* ICON */}

                          <div
                            className="
                              w-[48px]
                              h-[48px]
                              rounded-full
                              bg-[#E4EFFF]
                              flex
                              items-center
                              justify-center
                              shrink-0
                            "
                          >

                            <span
                              className="
                                text-[14px]
                                font-bold
                                text-[#2462AC]
                              "
                            >
                              {index + 1}
                            </span>

                          </div>


                          {/* DETAILS */}

                          <div
                            className="
                              min-w-0
                            "
                          >

                            <p
                              className="
                                text-[16px]
                                font-bold
                                text-blue-900
                                truncate
                              "
                            >
                              {experience.designation ||
                                'Designation not added'}
                            </p>


                            <p
                              className="
                                text-[12px]
                                text-blue-700
                                mt-[4px]
                                truncate
                              "
                            >
                              {experience.companyName ||
                                'Company not added'}
                            </p>


                            {experience.industry && (

                              <p
                                className="
                                  text-[12px]
                                  text-blue-400
                                  mt-[4px]
                                "
                              >
                                {experience.industry}
                              </p>

                            )}


                            {(experience.salary ||
                              experience.years) && (

                              <p
                                className="
                                  text-[12px]
                                  text-blue-400
                                  mt-[5px]
                                "
                              >

                                {experience.salary
                                  ? `₹${experience.salary}`
                                  : ''}

                                {experience.salary &&
                                  experience.years
                                  ? '  •  '
                                  : ''}

                                {experience.years
                                  ? `${experience.years} years`
                                  : ''}

                              </p>

                            )}

                          </div>

                        </div>


                        {/* =================================================
                            ACTIONS
                        ================================================= */}

                        <div
                          className="
                            flex
                            items-center
                            gap-2
                            shrink-0
                          "
                        >

                          {/* EDIT */}

                          <button
                            type="button"
                            onClick={() =>
                              editExperience(
                                experience,
                                index
                              )
                            }
                            className="
                              h-[34px]
                              px-4
                              rounded-full
                              bg-blue-100
                              text-blue-700
                              text-[11px]
                              font-semibold
                              hover:bg-blue-200
                              active:scale-95
                              transition-all
                            "
                          >
                            Edit
                          </button>


                          {/* DELETE */}

                          <button
                            type="button"
                            onClick={() =>
                              removeExperience(
                                index
                              )
                            }
                            aria-label="Remove experience"
                            className="
                              w-[34px]
                              h-[34px]
                              rounded-full
                              bg-red-50
                              text-red-500
                              text-[18px]
                              flex
                              items-center
                              justify-center
                              hover:bg-red-100
                              active:scale-90
                              transition-all
                            "
                          >
                            ×
                          </button>

                        </div>

                      </div>

                    </div>

                  )

                }
              )}

            </div>

          </div>

        )}


        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {!hasAnyExperience && (

          <div
            className="
              text-center
              pt-3
              pb-5
            "
          >

            <p
              className="
                text-[12px]
                text-blue-400
              "
            >
              No work experience added yet
            </p>

          </div>

        )}

      </div>


      {/* =====================================================
          ADD / EDIT EXPERIENCE POPUP
      ===================================================== */}

      {showExperiencePopup && (

        <div
          className="
            absolute
            inset-0
            z-[50]
            bg-blue-900/30
            flex
            items-center
            justify-center
            p-6
          "
        >

          <div
            className="
              w-full
              max-w-[620px]
              bg-white
              rounded-[24px]
              shadow-2xl
              p-7
            "
          >

            {/* =================================================
                POPUP HEADER
            ================================================= */}

            <div
              className="
                flex
                items-center
                justify-between
                mb-6
              "
            >

              <div>

                <h3
                  className="
                    text-[21px]
                    font-bold
                    text-blue-900
                  "
                >
                  {editingExperience
                    ? 'Edit work experience'
                    : 'Add work experience'}
                </h3>

                <p
                  className="
                    text-[12px]
                    text-blue-400
                    mt-1
                  "
                >
                  Enter your work details
                  below.
                </p>

              </div>


              {/* CLOSE */}

              <button
                type="button"
                onClick={closeExperiencePopup}
                aria-label="Close"
                className="
                  w-[38px]
                  h-[38px]
                  rounded-full
                  bg-blue-100
                  text-blue-700
                  text-[23px]
                  leading-none
                  flex
                  items-center
                  justify-center
                  hover:bg-blue-200
                  active:scale-90
                  transition-all
                "
              >
                ×
              </button>

            </div>


            <div className="grid grid-cols-2 gap-x-5">

              {/* =================================================
                  DESIGNATION
              ================================================= */}

              <div className="mb-5">

                <label className="profile-label">
                  Designation
                </label>

                <input
                  autoFocus
                  value={designation}
                  onChange={(e) =>
                    setDesignation(
                      e.target.value
                    )
                  }
                  className="
                    profile-input
                    h-[48px]
                  "
                  placeholder="Enter designation"
                />

              </div>


              {/* =================================================
                  INDUSTRY
              ================================================= */}

              <div className="mb-5">

                <label className="profile-label">
                  Industry
                </label>

                <input
                  value={industry}
                  onChange={(e) =>
                    setIndustry(
                      e.target.value
                    )
                  }
                  className="
                    profile-input
                    h-[48px]
                  "
                  placeholder="Enter industry"
                />

              </div>


              {/* =================================================
                  COMPANY NAME
              ================================================= */}

              <div className="mb-5">

                <label className="profile-label">
                  Company name
                </label>

                <input
                  value={companyName}
                  onChange={(e) =>
                    setCompanyName(
                      e.target.value
                    )
                  }
                  className="
                    profile-input
                    h-[48px]
                  "
                  placeholder="Enter company name"
                />

              </div>


              {/* =================================================
                  SALARY
              ================================================= */}

              <div className="mb-5">

                <label className="profile-label">
                  Salary
                </label>

                <input
                  type="number"
                  min="0"
                  value={salary}
                  onChange={(e) =>
                    setSalary(
                      e.target.value
                    )
                  }
                  className="
                    profile-input
                    h-[48px]
                  "
                  placeholder="Enter salary"
                />

              </div>


              {/* =================================================
                  YEARS
              ================================================= */}

              <div className="mb-6">

                <label className="profile-label">
                  Years worked
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={years}
                  onChange={(e) =>
                    setYears(
                      e.target.value
                    )
                  }
                  className="
                    profile-input
                    h-[48px]
                  "
                  placeholder="Enter years"
                />

              </div>

            </div>


            {/* =================================================
                SAVE EXPERIENCE
            ================================================= */}

            <button
              type="button"
              onClick={saveExperience}
              disabled={
                !designation.trim() ||
                !companyName.trim()
              }
              className="
                w-full
                h-[48px]
                rounded-xl
                bg-[#2462AC]
                text-blue-900
                text-[14px]
                font-bold
                flex
                items-center
                justify-center
                hover:bg-[#2462AC]
                active:scale-[0.98]
                transition-all
                disabled:opacity-40
                disabled:active:scale-100
              "
            >
              {editingExperience
                ? 'Update experience'
                : 'Add experience'}
            </button>

          </div>

        </div>

      )}

    </Desktop_ProfileBottomSheet>
  )
}


export default Desktop_WorkExperience