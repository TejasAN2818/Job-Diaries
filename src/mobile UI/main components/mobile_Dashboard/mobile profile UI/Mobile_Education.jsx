import React, { useState } from 'react'
import Mobile_ProfileBottomSheet from './Mobile_ProfileBottomSheet'

import {
  EDUCATION_TYPES,
} from '../../../../inputs/overall/Profile_Data'


function Mobile_Education({
  profileData,
  setProfileData,
  onClose,
}) {

  // =====================================================
  // POPUP STATE
  // =====================================================

  const [showEducationPopup, setShowEducationPopup] =
    useState(false)

  // =====================================================
  // CURRENT EDUCATION TYPE
  // =====================================================

  const [selectedEducation, setSelectedEducation] =
    useState(null)

  // =====================================================
  // FORM STATE
  // =====================================================

  const [qualification, setQualification] =
    useState('')

  const [passoutYear, setPassoutYear] =
    useState('')

  const [marks, setMarks] =
    useState('')

  const [collegeLocation, setCollegeLocation] =
    useState('')


  // =====================================================
  // OPEN ADD POPUP
  // =====================================================

  const openAddPopup = (item) => {

    setSelectedEducation(item)

    setQualification('')
    setPassoutYear('')
    setMarks('')
    setCollegeLocation('')

    setShowEducationPopup(true)
  }


  // =====================================================
  // OPEN EDIT POPUP
  // =====================================================

  const openEditPopup = (
    item,
    data
  ) => {

    setSelectedEducation(item)

    setQualification(
      data?.[item.nameField] || ''
    )

    setPassoutYear(
      data?.passoutYear || ''
    )

    setMarks(
      data?.marks || ''
    )

    setCollegeLocation(
      data?.collegeLocation || ''
    )

    setShowEducationPopup(true)
  }


  // =====================================================
  // CLOSE POPUP
  // =====================================================

  const closeEducationPopup = () => {

    setShowEducationPopup(false)

    setSelectedEducation(null)

    setQualification('')
    setPassoutYear('')
    setMarks('')
    setCollegeLocation('')
  }


  // =====================================================
  // SAVE EDUCATION
  // =====================================================

  const saveEducation = () => {

    if (!selectedEducation) {
      return
    }

    const cleanQualification =
      qualification.trim()

    const cleanLocation =
      collegeLocation.trim()

    // Qualification is required
    if (!cleanQualification) {
      return
    }

    setProfileData(prev => ({
      ...prev,

      [selectedEducation.key]: {

        ...prev[selectedEducation.key],

        [selectedEducation.nameField]:
          cleanQualification,

        passoutYear:
          passoutYear,

        marks:
          marks,

        collegeLocation:
          cleanLocation,
      },
    }))

    closeEducationPopup()
  }


  // =====================================================
  // REMOVE EDUCATION
  // =====================================================

  const removeEducation = (item) => {

    setProfileData(prev => ({
      ...prev,

      [item.key]: {

        ...prev[item.key],

        [item.nameField]: '',

        passoutYear: '',

        marks: '',

        collegeLocation: '',
      },
    }))
  }


  // =====================================================
  // CHECK EDUCATION DATA
  // =====================================================

  const hasEducationData = (item) => {

    const data =
      profileData?.[item.key] || {}

    return Boolean(
      data?.[item.nameField] ||
      data?.passoutYear ||
      data?.marks ||
      data?.collegeLocation
    )
  }


  // =====================================================
  // COUNT ADDED EDUCATION
  // =====================================================

  const addedEducationCount =
    EDUCATION_TYPES.filter(item =>
      hasEducationData(item)
    ).length


  // =====================================================
  // RETURN
  // =====================================================

  return (

    <Mobile_ProfileBottomSheet
      title="Education"
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
            Education details
          </h3>

          <p
            className="
              text-[11px]
              leading-[17px]
              text-blue-400
              mt-1
            "
          >
            Add your educational qualifications
            and academic details.
          </p>

        </div>


        {/* =================================================
            EDUCATION SUMMARY
        ================================================= */}

        <div
          className="
            flex
            items-center
            justify-between
            bg-[#E4EFFF]
            border
            border-[#C8DCF7]
            rounded-2xl
            px-4
            py-3
          "
        >

          <div>

            <p
              className="
                text-[12px]
                font-bold
                text-blue-900
              "
            >
              Education
            </p>

            <p
              className="
                text-[10px]
                text-blue-400
                mt-[2px]
              "
            >
              Qualifications added
            </p>

          </div>


          <span
            className="
              min-w-[30px]
              h-[26px]
              px-2
              rounded-full
              bg-[#2462AC]
              text-blue-900
              text-[10px]
              font-bold
              flex
              items-center
              justify-center
            "
          >
            {addedEducationCount}/
            {EDUCATION_TYPES.length}
          </span>

        </div>


        {/* =================================================
            EDUCATION CARDS
        ================================================= */}

        <div className="space-y-2">

          {EDUCATION_TYPES.map(item => {

            const data =
              profileData?.[item.key] || {}

            const hasData =
              hasEducationData(item)


            return (

              <div
                key={item.key}
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
                    items-center
                    justify-between
                    gap-3
                  "
                >

                  {/* =================================================
                      EDUCATION INFO
                  ================================================= */}

                  <div
                    className="
                      flex
                      items-center
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
                          text-[10px]
                          font-bold
                          text-[#2462AC]
                        "
                      >
                        {item.icon}
                      </span>

                    </div>


                    {/* TEXT */}

                    <div className="min-w-0">

                      <p
                        className="
                          text-[13px]
                          font-bold
                          text-blue-900
                        "
                      >
                        {item.title}
                      </p>


                      {hasData ? (

                        <>

                          <p
                            className="
                              text-[10px]
                              text-blue-700
                              mt-[2px]
                              truncate
                            "
                          >
                            {data?.[item.nameField] ||
                              'Details added'}
                          </p>


                          {data?.passoutYear && (

                            <p
                              className="
                                text-[9px]
                                text-blue-400
                                mt-[2px]
                              "
                            >
                              Passout: {data.passoutYear}
                            </p>

                          )}

                        </>

                      ) : (

                        <p
                          className="
                            text-[9px]
                            text-blue-400
                            mt-[2px]
                          "
                        >
                          Not added yet
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

                    {/* ADD / EDIT */}

                    <button
                      type="button"
                      onClick={() =>
                        hasData
                          ? openEditPopup(
                              item,
                              data
                            )
                          : openAddPopup(item)
                      }
                      className="
                        h-[30px]
                        px-3
                        rounded-full
                        bg-[#2462AC]
                        text-blue-900
                        text-[9px]
                        font-bold
                        active:scale-95
                        transition-transform
                      "
                    >
                      {hasData
                        ? 'Edit'
                        : 'Add'}
                    </button>


                    {/* DELETE */}

                    {hasData && (

                      <button
                        type="button"
                        onClick={() =>
                          removeEducation(item)
                        }
                        aria-label={`Remove ${item.title}`}
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

                    )}

                  </div>

                </div>

              </div>

            )

          })}

        </div>


        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {addedEducationCount === 0 && (

          <div
            className="
              text-center
              pt-1
              pb-3
            "
          >

            <p
              className="
                text-[10px]
                text-blue-400
              "
            >
              Add your educational qualifications
              above.
            </p>

          </div>

        )}

      </div>


      {/* =====================================================
          ADD / EDIT EDUCATION POPUP
      ===================================================== */}

      {showEducationPopup && (

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
          onClick={closeEducationPopup}
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
            onClick={(e) =>
              e.stopPropagation()
            }
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
                  {selectedEducation
                    ? hasEducationData(
                        selectedEducation
                      )
                      ? `Edit ${selectedEducation.title}`
                      : `Add ${selectedEducation.title}`
                    : 'Education'}
                </h3>

                <p
                  className="
                    text-[10px]
                    text-blue-400
                    mt-1
                  "
                >
                  Enter your education details.
                </p>

              </div>


              {/* CLOSE */}

              <button
                type="button"
                onClick={closeEducationPopup}
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
                QUALIFICATION
            ================================================= */}

            <div className="mb-4">

              <label className="profile-label">
                Qualification
              </label>

              <input
                autoFocus
                value={qualification}
                onChange={(e) =>
                  setQualification(
                    e.target.value
                  )
                }
                className="profile-input"
                placeholder={
                  selectedEducation?.placeholder ||
                  'Enter qualification'
                }
              />

            </div>


            {/* =================================================
                PASSOUT YEAR
            ================================================= */}

            <div className="mb-4">

              <label className="profile-label">
                Passout year
              </label>

              <input
                type="number"
                value={passoutYear}
                onChange={(e) =>
                  setPassoutYear(
                    e.target.value
                  )
                }
                className="profile-input"
                placeholder="Enter passout year"
              />

            </div>


            {/* =================================================
                MARKS
            ================================================= */}

            <div className="mb-4">

              <label className="profile-label">
                Marks / Percentage
              </label>

              <input
                type="number"
                min="0"
                max="100"
                value={marks}
                onChange={(e) =>
                  setMarks(
                    e.target.value
                  )
                }
                className="profile-input"
                placeholder="Enter percentage"
              />

            </div>


            {/* =================================================
                COLLEGE / SCHOOL LOCATION
            ================================================= */}

            <div className="mb-5">

              <label className="profile-label">
                College / School location
              </label>

              <input
                value={collegeLocation}
                onChange={(e) =>
                  setCollegeLocation(
                    e.target.value
                  )
                }
                className="profile-input"
                placeholder="Enter location"
              />

            </div>


            {/* =================================================
                SAVE BUTTON
            ================================================= */}

            <button
              type="button"
              onClick={saveEducation}
              disabled={!qualification.trim()}
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
              {selectedEducation &&
              hasEducationData(
                selectedEducation
              )
                ? 'Update education'
                : 'Add education'}
            </button>

          </div>

        </div>

      )}

    </Mobile_ProfileBottomSheet>
  )
}


export default Mobile_Education