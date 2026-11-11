import React, { useEffect, useState } from 'react'

import Desktop_ProfileHeader from './Desktop_ProfileHeader'

import Desktop_ProfileCompletion from './Desktop_ProfileCompletion'

import Desktop_PersonalDetails from './Desktop_PersonalDetails'

import Desktop_CareerPreference from './Desktop_CareerPreference'

import Desktop_LanguagePreference from './Desktop_LanguagePreference'

import Desktop_WorkExperience from './Desktop_WorkExperience'

import Desktop_Education from './Desktop_Education'

import Desktop_ProfileCompletionPopup
  from './Desktop_ProfileCompletionPopup'

import {
  getProfileData,
  saveProfileData,
} from '../../../../inputs/overall/Profile_Storage'


// =========================================================
// PROFILE DASHBOARD
// =========================================================

function Desktop_Profile_Dashboard({
  onBack,
}) {


  // =====================================================
  // ACTIVE EDITOR
  // =====================================================

  const [
    activeEditor,
    setActiveEditor,
  ] = useState(null)


  // =====================================================
  // COMPLETION POPUP
  // =====================================================

  const [
    showCompletionPopup,
    setShowCompletionPopup,
  ] = useState(false)


  // =====================================================
  // GLOBAL PROFILE DATA
  // =====================================================

  const [
    profileData,
    setProfileData,
  ] = useState(
    () => getProfileData()
  )


  // =====================================================
  // SAVE PROFILE DATA
  // =====================================================

  useEffect(() => {

    saveProfileData(
      profileData
    )

  }, [profileData])


  // =====================================================
  // PROFILE COMPLETION
  // =====================================================

  const calculateCompletion = () => {

    const requiredFields = [

      // MAIN
      profileData.name,
      profileData.phoneNo,
      profileData.jobRole,
      profileData.currentLocation,
      profileData.gender,

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

    ]


    const filledFields =
      requiredFields.filter(
        value =>
          value !== null &&
          value !== undefined &&
          String(value).trim() !== ''
      ).length


    // 80% individual fields

    let percentage =
      (
        filledFields /
        requiredFields.length
      ) * 80


    // LANGUAGE = 10%

    if (
      profileData.languages &&
      profileData.languages.length > 0
    ) {

      percentage += 10

    }


    // EXPERIENCE = 5%

    const hasExperience =
      profileData.experience1?.designation ||
      profileData.experience1?.companyName ||
      profileData.experience2?.designation ||
      profileData.experience2?.companyName ||
      profileData.experience3?.designation ||
      profileData.experience3?.companyName


    if (hasExperience) {

      percentage += 5

    }


    // EDUCATION = 5%

    const hasEducation =
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


    if (hasEducation) {

      percentage += 5

    }


    return Math.min(
      100,
      Math.round(percentage)
    )
  }


  const completion =
    calculateCompletion()


  // =====================================================
  // COMPLETION CARD CLICK
  // =====================================================

  const handleCompletionCardClick = (
    section
  ) => {

    // OPEN COMPLETION POPUP

    if (
      section === 'completion'
    ) {

      setShowCompletionPopup(true)

      return
    }


    // OPEN NORMAL EDITOR

    setActiveEditor(section)
  }


  // =====================================================
  // CLOSE NORMAL EDITOR
  // =====================================================

  const closeEditor = () => {

    setActiveEditor(null)
  }


  // =====================================================
  // PERSONAL DETAILS
  // =====================================================

  if (
    activeEditor === 'personal'
  ) {

    return (
      <Desktop_PersonalDetails
        profileData={profileData}
        setProfileData={setProfileData}
        onClose={closeEditor}
      />
    )
  }


  // =====================================================
  // CAREER
  // =====================================================

  if (
    activeEditor === 'career'
  ) {

    return (
      <Desktop_CareerPreference
        profileData={profileData}
        setProfileData={setProfileData}
        onClose={closeEditor}
      />
    )
  }


  // =====================================================
  // LANGUAGE
  // =====================================================

  if (
    activeEditor === 'language'
  ) {

    return (
      <Desktop_LanguagePreference
        profileData={profileData}
        setProfileData={setProfileData}
        onClose={closeEditor}
      />
    )
  }


  // =====================================================
  // EXPERIENCE
  // =====================================================

  if (
    activeEditor === 'experience'
  ) {

    return (
      <Desktop_WorkExperience
        profileData={profileData}
        setProfileData={setProfileData}
        onClose={closeEditor}
      />
    )
  }


  // =====================================================
  // EDUCATION
  // =====================================================

  if (
    activeEditor === 'education'
  ) {

    return (
      <Desktop_Education
        profileData={profileData}
        setProfileData={setProfileData}
        onClose={closeEditor}
      />
    )
  }


  // =====================================================
  // DASHBOARD
  // =====================================================

  return (

    <div
      className="
        min-h-screen
        bg-[#E4EFFF]
        px-6
        lg:px-10
        pt-6
        pb-[50px]
      "
    >

      {/* =================================================
          PROFILE HEADER
      ================================================= */}

      <Desktop_ProfileHeader
        profileData={profileData}
        setProfileData={setProfileData}
        onBack={onBack}
      />


      {/* =================================================
          PROFILE COMPLETION
      ================================================= */}

      <div className="mt-5 max-w-[1100px] mx-auto">

        <Desktop_ProfileCompletion
          completion={completion}
          profileData={profileData}
          onCardClick={
            handleCompletionCardClick
          }
        />

      </div>


      {/* =================================================
          PROFILE COMPLETION POPUP
      ================================================= */}

      <Desktop_ProfileCompletionPopup
        open={showCompletionPopup}
        profileData={profileData}
        setProfileData={setProfileData}
        onClose={() =>
          setShowCompletionPopup(false)
        }
      />


      {/* =================================================
          PROFILE INFORMATION
      ================================================= */}

      <div
        className="
          mt-5
          max-w-[1100px]
          mx-auto
          space-y-5
        "
      >

        {/* =================================================
            PERSONAL DETAILS
        ================================================= */}

        <section
          className="
            bg-white
            rounded-[24px]
            px-6
            py-6
            shadow-sm
          "
        >

          <SectionHeader
            title="Personal details"
            onEdit={() =>
              setActiveEditor(
                'personal'
              )
            }
          />


          <div
            className="
              grid
              grid-cols-2
              lg:grid-cols-3
              gap-x-8
              gap-y-6
            "
          >

            <DisplayField
              label="Name"
              value={
                profileData.name
              }
            />

            <DisplayField
              label="Phone No"
              value={
                profileData.phoneNo
              }
            />

            <DisplayField
              label="Date of Birth"
              value={
                profileData.dateOfBirth
              }
            />

            <DisplayField
              label="Gender"
              value={
                profileData.gender
              }
            />

            <DisplayField
              label="Marital Status"
              value={
                profileData.maritalStatus
              }
            />

            <DisplayField
              label="Mail ID"
              value={
                profileData.emailId
              }
            />

          </div>

        </section>


        {/* =================================================
            CAREER PREFERENCE
        ================================================= */}

        <section
          className="
            bg-white
            rounded-[24px]
            px-6
            py-6
            shadow-sm
          "
        >

          <SectionHeader
            title="Career preference"
            onEdit={() =>
              setActiveEditor(
                'career'
              )
            }
          />


          <div
            className="
              grid
              grid-cols-2
              lg:grid-cols-3
              gap-x-8
              gap-y-6
            "
          >

            <DisplayField
              label="What salary are you looking for?"
              value={
                profileData.expectedSalary
                  ? `₹${profileData.expectedSalary}`
                  : ''
              }
            />

            <DisplayField
              label="Which location are you looking for?"
              value={
                profileData.preferredJobLocation
              }
            />

            <DisplayField
              label="What industry are you looking for?"
              value={
                profileData.preferredIndustry
              }
            />

            <DisplayField
              label="What designation are you looking for?"
              value={
                profileData.preferredDesignation
              }
            />

            <DisplayField
              label="Okay for field work?"
              value={
                profileData.fieldWork
              }
            />

          </div>

        </section>


        {/* =================================================
            LANGUAGE PREFERENCE
        ================================================= */}

        <section
          className="
            bg-white
            rounded-[24px]
            px-6
            py-6
            shadow-sm
          "
        >

          <SectionHeader
            title="Languages"
            onEdit={() =>
              setActiveEditor(
                'language'
              )
            }
          />


          <DisplayField
            label="What is your mother tongue?"
            value={
              profileData.motherLanguage
            }
          />


          <div className="mt-6">

            <p
              className="
                text-[11px]
                text-blue-400
                font-medium
              "
            >
              Languages known
            </p>


            {profileData.languages?.length > 0 ? (

              <div
                className="
                  mt-3
                  grid
                  grid-cols-2
                  lg:grid-cols-3
                  gap-3
                "
              >

                {profileData.languages.map(
                  (item, index) => (

                    <div
                      key={`${item.language}-${index}`}
                      className="
                        flex
                        items-center
                        justify-between
                        bg-blue-50
                        rounded-xl
                        px-4
                        py-3
                      "
                    >

                      <span
                        className="
                          text-[13px]
                          font-semibold
                          text-blue-900
                        "
                      >
                        {item.language}
                      </span>

                      <span
                        className="
                          text-[11px]
                          text-blue-700
                        "
                      >
                        {item.proficiency}
                      </span>

                    </div>

                  )
                )}

              </div>

            ) : (

              <p
                className="
                  mt-3
                  text-[12px]
                  text-blue-400
                "
              >
                No languages added
              </p>

            )}

          </div>

        </section>


        {/* =================================================
            WORK EXPERIENCE
        ================================================= */}

        <section
          className="
            bg-white
            rounded-[24px]
            px-6
            py-6
            shadow-sm
          "
        >

          <SectionHeader
            title="Work experience"
            onEdit={() =>
              setActiveEditor(
                'experience'
              )
            }
          />


          <DisplayField
            label="Total work experience"
            value={
              profileData.totalExperience
                ? `${profileData.totalExperience} years`
                : ''
            }
          />


          <div
            className="
              mt-5
              grid
              grid-cols-1
              lg:grid-cols-3
              gap-4
            "
          >

            {[
              profileData.experience1,
              profileData.experience2,
              profileData.experience3,
            ].map(
              (
                experience,
                index
              ) => {

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
                      bg-blue-50
                      rounded-xl
                      p-4
                    "
                  >

                    <p
                      className="
                        text-[12px]
                        font-bold
                        text-blue-900
                        mb-4
                      "
                    >
                      Experience {index + 1}
                    </p>


                    <div
                      className="
                        grid
                        grid-cols-2
                        gap-4
                      "
                    >

                      <DisplayField
                        label="Designation"
                        value={
                          experience.designation
                        }
                      />

                      <DisplayField
                        label="Industry"
                        value={
                          experience.industry
                        }
                      />

                      <DisplayField
                        label="Salary"
                        value={
                          experience.salary
                            ? `₹${experience.salary}`
                            : ''
                        }
                      />

                      <DisplayField
                        label="Years"
                        value={
                          experience.years
                        }
                      />

                      <DisplayField
                        label="Company Name"
                        value={
                          experience.companyName
                        }
                      />

                    </div>

                  </div>

                )
              }
            )}

          </div>

        </section>


        {/* =================================================
            EDUCATION
        ================================================= */}

        <section
          className="
            bg-white
            rounded-[24px]
            px-6
            py-6
            shadow-sm
          "
        >

          <SectionHeader
            title="Education"
            onEdit={() =>
              setActiveEditor(
                'education'
              )
            }
          />


          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-2
              gap-4
            "
          >

            <EducationDisplay
              title="10th"
              name={
                profileData.tenth?.qualification
              }
              passoutYear={
                profileData.tenth?.passoutYear
              }
              marks={
                profileData.tenth?.marks
              }
              location={
                profileData.tenth?.collegeLocation
              }
            />


            <EducationDisplay
              title="PUC"
              name={
                profileData.puc?.pucName
              }
              passoutYear={
                profileData.puc?.passoutYear
              }
              marks={
                profileData.puc?.marks
              }
              location={
                profileData.puc?.collegeLocation
              }
            />


            <EducationDisplay
              title="Diploma"
              name={
                profileData.diploma?.diplomaName
              }
              passoutYear={
                profileData.diploma?.passoutYear
              }
              marks={
                profileData.diploma?.marks
              }
              location={
                profileData.diploma?.collegeLocation
              }
            />


            <EducationDisplay
              title="Degree"
              name={
                profileData.degree?.degreeName
              }
              passoutYear={
                profileData.degree?.passoutYear
              }
              marks={
                profileData.degree?.marks
              }
              location={
                profileData.degree?.collegeLocation
              }
            />


            <EducationDisplay
              title="Masters"
              name={
                profileData.masters?.mastersName
              }
              passoutYear={
                profileData.masters?.passoutYear
              }
              marks={
                profileData.masters?.marks
              }
              location={
                profileData.masters?.collegeLocation
              }
            />

          </div>

        </section>

      </div>

    </div>
  )
}


// =========================================================
// SECTION HEADER
// =========================================================

function SectionHeader({
  title,
  onEdit,
}) {

  return (

    <div
      className="
        flex
        items-center
        justify-between
        mb-5
      "
    >

      <h2
        className="
          text-[18px]
          font-bold
          text-blue-900
        "
      >
        {title}
      </h2>


      <button
        type="button"
        onClick={onEdit}
        className="
          w-[34px]
          h-[34px]
          flex
          items-center
          justify-center
          text-blue-900
          rounded-lg
          hover:bg-blue-100
          active:scale-90
          transition-all
        "
        aria-label={`Edit ${title}`}
      >

        <span className="text-[20px]">
          ✎
        </span>

      </button>

    </div>
  )
}


// =========================================================
// DISPLAY FIELD
// =========================================================

function DisplayField({
  label,
  value,
}) {

  return (

    <div className="min-w-0">

      <p
        className="
          text-[10px]
          leading-[14px]
          text-blue-400
          font-medium
        "
      >
        {label}
      </p>


      <p
        className="
          mt-1
          text-[14px]
          leading-5
          text-blue-900
          font-semibold
          break-words
        "
      >
        {value || 'Not added'}
      </p>

    </div>
  )
}


// =========================================================
// EDUCATION DISPLAY
// =========================================================

function EducationDisplay({
  title,
  name,
  passoutYear,
  marks,
  location,
}) {

  const hasData =
    name ||
    passoutYear ||
    marks ||
    location


  if (!hasData) {
    return null
  }


  return (

    <div
      className="
        bg-blue-50
        rounded-xl
        p-4
      "
    >

      <p
        className="
          text-[12px]
          font-bold
          text-blue-900
          mb-3
        "
      >
        {title}
      </p>


      <div
        className="
          grid
          grid-cols-2
          gap-4
        "
      >

        <DisplayField
          label="Qualification"
          value={name}
        />

        <DisplayField
          label="Passout year"
          value={passoutYear}
        />

        <DisplayField
          label="Marks / Percentage"
          value={marks}
        />

        <DisplayField
          label="College / School"
          value={location}
        />

      </div>

    </div>
  )
}


export default Desktop_Profile_Dashboard