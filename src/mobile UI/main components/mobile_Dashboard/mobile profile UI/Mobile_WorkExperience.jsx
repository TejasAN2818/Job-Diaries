import React, { useState } from 'react'
import Mobile_ProfileBottomSheet from './Mobile_ProfileBottomSheet'

import {
  EMPTY_EXPERIENCE,
} from '../../../../inputs/overall/Profile_Data'


function Mobile_WorkExperience({
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

    <Mobile_ProfileBottomSheet
      title="Work experience"
      onClose={onClose}
      onSave={onClose}
    >

      <div className="space-y-5">


        {/* =================================================
            INTRO
        ================================================= */}

        <div>

          <h3
            className="
              text-[15px]
              font-bold
              text-blue-900
            "
          >
            Work experience
          </h3>

          <p
            className="
              text-[11px]
              leading-[17px]
              text-blue-400
              mt-1
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
            className="profile-input"
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
              h-[44px]
              rounded-xl
              border
              border-dashed
              border-[#C8DCF7]
              bg-[#E4EFFF]
              text-[#2462AC]
              text-[12px]
              font-bold
              flex
              items-center
              justify-center
              gap-2
              active:scale-[0.98]
              transition-transform
            "
          >

            <span
              className="
                text-[18px]
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
                mb-3
              "
            >

              <div>

                <h3
                  className="
                    text-[14px]
                    font-bold
                    text-blue-900
                  "
                >
                  Added experience
                </h3>

                <p
                  className="
                    text-[10px]
                    text-blue-400
                    mt-1
                  "
                >
                  Your previous work experience
                </p>

              </div>


              <span
                className="
                  min-w-[28px]
                  h-[24px]
                  px-2
                  rounded-full
                  bg-[#E4EFFF]
                  text-[#2462AC]
                  text-[10px]
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

            <div className="space-y-2">

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
                        px-4
                        py-3
                      "
                    >

                      <div
                        className="
                          flex
                          items-start
                          justify-between
                          gap-3
                        "
                      >


                        {/* =================================================
                            EXPERIENCE INFO
                        ================================================= */}

                        <div
                          className="
                            flex
                            items-start
                            gap-3
                            min-w-0
                          "
                        >

                          {/* ICON */}

                          <div
                            className="
                              w-[38px]
                              h-[38px]
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
                                text-[12px]
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
                                text-[13px]
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
                                text-[10px]
                                text-blue-700
                                mt-[2px]
                                truncate
                              "
                            >
                              {experience.companyName ||
                                'Company not added'}
                            </p>


                            {experience.industry && (

                              <p
                                className="
                                  text-[10px]
                                  text-blue-400
                                  mt-[2px]
                                "
                              >
                                {experience.industry}
                              </p>

                            )}


                            {(experience.salary ||
                              experience.years) && (

                              <p
                                className="
                                  text-[10px]
                                  text-blue-400
                                  mt-[3px]
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
                              h-[30px]
                              px-3
                              rounded-full
                              bg-blue-100
                              text-blue-700
                              text-[9px]
                              font-semibold
                              active:scale-95
                              transition-transform
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
                              w-[30px]
                              h-[30px]
                              rounded-full
                              bg-red-50
                              text-red-500
                              text-[16px]
                              flex
                              items-center
                              justify-center
                              active:scale-90
                              transition-transform
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
              pt-2
              pb-4
            "
          >

            <p
              className="
                text-[10px]
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
            px-5
          "
        >

          <div
            className="
              w-full
              max-w-[340px]
              bg-white
              rounded-[24px]
              shadow-2xl
              p-5
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
                mb-5
              "
            >

              <div>

                <h3
                  className="
                    text-[16px]
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
                    text-[10px]
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
                  w-[34px]
                  h-[34px]
                  rounded-full
                  bg-blue-100
                  text-blue-700
                  text-[21px]
                  leading-none
                  flex
                  items-center
                  justify-center
                  active:scale-90
                  transition-transform
                "
              >
                ×
              </button>

            </div>


            {/* =================================================
                DESIGNATION
            ================================================= */}

            <div className="mb-4">

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
                className="profile-input"
                placeholder="Enter designation"
              />

            </div>


            {/* =================================================
                INDUSTRY
            ================================================= */}

            <div className="mb-4">

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
                className="profile-input"
                placeholder="Enter industry"
              />

            </div>


            {/* =================================================
                COMPANY NAME
            ================================================= */}

            <div className="mb-4">

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
                className="profile-input"
                placeholder="Enter company name"
              />

            </div>


            {/* =================================================
                SALARY
            ================================================= */}

            <div className="mb-4">

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
                className="profile-input"
                placeholder="Enter salary"
              />

            </div>


            {/* =================================================
                YEARS
            ================================================= */}

            <div className="mb-5">

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
                className="profile-input"
                placeholder="Enter years"
              />

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
                h-[44px]
                rounded-xl
                bg-[#2462AC]
                text-blue-900
                text-[12px]
                font-bold
                flex
                items-center
                justify-center
                active:scale-[0.98]
                transition-transform
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

    </Mobile_ProfileBottomSheet>
  )
}


export default Mobile_WorkExperience