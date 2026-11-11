import React, { useState } from 'react'

import Desktop_ProfileBottomSheet from './Desktop_ProfileBottomSheet'

import {
  LANGUAGE_PROFICIENCY,
} from '../../../../inputs/overall/Profile_Data'


function Desktop_LanguagePreference({
  profileData,
  setProfileData,
  onClose,
}) {


  // =====================================================
  // POPUP STATE
  // =====================================================

  const [showLanguagePopup, setShowLanguagePopup] =
    useState(false)


  // =====================================================
  // LANGUAGE FORM STATE
  // =====================================================

  const [languageName, setLanguageName] =
    useState('')

  const [languageProficiency, setLanguageProficiency] =
    useState('')


  // =====================================================
  // EDIT STATE
  // =====================================================

  const [editingLanguage, setEditingLanguage] =
    useState(null)


  // =====================================================
  // MOTHER TONGUE
  // =====================================================

  const setMotherLanguage = (value) => {

    setProfileData(prev => ({
      ...prev,

      motherLanguage: value,
    }))
  }


  // =====================================================
  // OPEN ADD LANGUAGE POPUP
  // =====================================================

  const openAddLanguagePopup = () => {

    setEditingLanguage(null)

    setLanguageName('')
    setLanguageProficiency('')

    setShowLanguagePopup(true)
  }


  // =====================================================
  // CLOSE LANGUAGE POPUP
  // =====================================================

  const closeLanguagePopup = () => {

    setShowLanguagePopup(false)

    setEditingLanguage(null)

    setLanguageName('')
    setLanguageProficiency('')
  }


  // =====================================================
  // ADD / UPDATE LANGUAGE
  // =====================================================

  const saveLanguage = () => {

    const cleanLanguage =
      languageName.trim()


    // =================================================
    // VALIDATION
    // =================================================

    if (!cleanLanguage) {
      return
    }

    if (!languageProficiency) {
      return
    }


    setProfileData(prev => {

      const currentLanguages =
        Array.isArray(prev.languages)
          ? prev.languages
          : []


      // =================================================
      // EDIT EXISTING LANGUAGE
      // =================================================

      if (editingLanguage) {

        return {

          ...prev,

          languages:
            currentLanguages.map(item => {

              if (
                item.language === editingLanguage
              ) {

                return {

                  ...item,

                  language:
                    cleanLanguage,

                  proficiency:
                    languageProficiency,
                }
              }

              return item
            }),
        }
      }


      // =================================================
      // CHECK DUPLICATE LANGUAGE
      // =================================================

      const alreadyExists =
        currentLanguages.some(
          item =>
            item.language?.trim().toLowerCase() ===
            cleanLanguage.toLowerCase()
        )


      // =================================================
      // IF DUPLICATE
      // UPDATE ITS PROFICIENCY
      // =================================================

      if (alreadyExists) {

        return {

          ...prev,

          languages:
            currentLanguages.map(item => {

              if (
                item.language?.trim().toLowerCase() ===
                cleanLanguage.toLowerCase()
              ) {

                return {

                  ...item,

                  proficiency:
                    languageProficiency,
                }
              }

              return item
            }),
        }
      }


      // =================================================
      // ADD NEW LANGUAGE
      // =================================================

      return {

        ...prev,

        languages: [

          ...currentLanguages,

          {
            language:
              cleanLanguage,

            proficiency:
              languageProficiency,
          },

        ],
      }

    })


    // =================================================
    // CLOSE POPUP
    // =================================================

    closeLanguagePopup()
  }


  // =====================================================
  // EDIT LANGUAGE
  // =====================================================

  const editLanguage = (item) => {

    setEditingLanguage(
      item.language
    )

    setLanguageName(
      item.language || ''
    )

    setLanguageProficiency(
      item.proficiency || ''
    )

    setShowLanguagePopup(true)
  }


  // =====================================================
  // REMOVE LANGUAGE
  // =====================================================

  const removeLanguage = (language) => {

    setProfileData(prev => ({

      ...prev,

      languages:
        Array.isArray(prev.languages)

          ? prev.languages.filter(
              item =>
                item.language !== language
            )

          : [],

    }))
  }


  // =====================================================
  // RETURN
  // =====================================================

  return (

    <Desktop_ProfileBottomSheet
      title="Language preference"
      onClose={onClose}
      onSave={onClose}
    >

      <div className="space-y-6">


        {/* =================================================
            INTRO
        ================================================= */}

        <div>

          <h3
            className="
              text-[18px]
              font-bold
              text-blue-900
            "
          >
            Language preference
          </h3>

          <p
            className="
              text-[12px]
              leading-[18px]
              text-blue-400
              mt-1
            "
          >
            Add the languages you know and
            select your fluency level.
          </p>

        </div>


        {/* =================================================
            MOTHER TONGUE
        ================================================= */}

        <div>

          <label className="profile-label">
            Mother tongue
          </label>

          <input
            value={
              profileData?.motherLanguage || ''
            }
            onChange={(e) =>
              setMotherLanguage(
                e.target.value
              )
            }
            className="profile-input"
            placeholder="Enter your mother tongue"
          />

        </div>


        {/* =================================================
            ADD LANGUAGE BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={openAddLanguagePopup}
          className="
            w-full
            h-[48px]
            rounded-xl
            border
            border-dashed
            border-[#C8DCF7]
            bg-[#E4EFFF]
            text-[#2462AC]
            text-[13px]
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
              text-[20px]
              leading-none
              font-medium
            "
          >
            +
          </span>

          <span>
            Add language
          </span>

        </button>


        {/* =================================================
            ADDED LANGUAGES
        ================================================= */}

        {profileData?.languages?.length > 0 && (

          <div>


            {/* =================================================
                SECTION HEADER
            ================================================= */}

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
                    text-[16px]
                    font-bold
                    text-blue-900
                  "
                >
                  Added languages
                </h3>

                <p
                  className="
                    text-[11px]
                    text-blue-400
                    mt-1
                  "
                >
                  Your selected languages
                </p>

              </div>


              <span
                className="
                  min-w-[32px]
                  h-[26px]
                  px-2
                  rounded-full
                  bg-[#E4EFFF]
                  text-[#2462AC]
                  text-[11px]
                  font-bold
                  flex
                  items-center
                  justify-center
                "
              >
                {profileData.languages.length}
              </span>

            </div>


            {/* =================================================
                LANGUAGE CARDS
            ================================================= */}

            <div className="space-y-3">

              {profileData.languages.map(
                (item, index) => (

                  <div
                    key={`${item.language}-${index}`}
                    className="
                      bg-white
                      border
                      border-blue-200
                      rounded-2xl
                      px-5
                      py-4
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-4
                      "
                    >


                      {/* =================================================
                          LANGUAGE INFO
                      ================================================= */}

                      <div
                        className="
                          flex
                          items-center
                          gap-4
                          min-w-0
                        "
                      >


                        {/* LANGUAGE ICON */}

                        <div
                          className="
                            w-[46px]
                            h-[46px]
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
                              text-[15px]
                              font-bold
                              text-[#2462AC]
                            "
                          >
                            {item.language
                              ?.charAt(0)
                              ?.toUpperCase()}
                          </span>

                        </div>


                        {/* LANGUAGE TEXT */}

                        <div className="min-w-0">

                          <p
                            className="
                              text-[15px]
                              font-bold
                              text-blue-900
                              truncate
                            "
                          >
                            {item.language}
                          </p>

                          <p
                            className="
                              text-[11px]
                              text-blue-400
                              mt-[3px]
                            "
                          >
                            Fluency: {item.proficiency}
                          </p>

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
                            editLanguage(item)
                          }
                          className="
                            h-[34px]
                            px-4
                            rounded-full
                            bg-blue-100
                            text-blue-700
                            text-[10px]
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
                            removeLanguage(
                              item.language
                            )
                          }
                          aria-label={`Remove ${item.language}`}
                          className="
                            w-[34px]
                            h-[34px]
                            rounded-full
                            bg-red-50
                            text-red-500
                            text-[17px]
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
              )}

            </div>

          </div>

        )}


        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {(!profileData?.languages ||
          profileData.languages.length === 0) && (

          <div
            className="
              text-center
              pt-2
              pb-4
            "
          >

            <p
              className="
                text-[11px]
                text-blue-400
              "
            >
              No languages added yet
            </p>

          </div>

        )}

      </div>


      {/* =====================================================
          ADD / EDIT LANGUAGE POPUP
      ===================================================== */}

      {showLanguagePopup && (

        <div
          className="
            absolute
            inset-0
            z-[50]
            bg-blue-900/30
            flex
            items-center
            justify-center
            px-6
          "
          onClick={closeLanguagePopup}
        >

          <div
            className="
              w-full
              max-w-[520px]
              bg-white
              rounded-[24px]
              shadow-2xl
              p-7
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
                mb-6
              "
            >

              <div>

                <h3
                  className="
                    text-[19px]
                    font-bold
                    text-blue-900
                  "
                >
                  {editingLanguage
                    ? 'Edit language'
                    : 'Add language'}
                </h3>

                <p
                  className="
                    text-[11px]
                    text-blue-400
                    mt-1
                  "
                >
                  Enter the language and
                  select your fluency.
                </p>

              </div>


              {/* CLOSE */}

              <button
                type="button"
                onClick={closeLanguagePopup}
                aria-label="Close"
                className="
                  w-[38px]
                  h-[38px]
                  rounded-full
                  bg-blue-100
                  text-blue-700
                  text-[22px]
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


            {/* =================================================
                LANGUAGE INPUT
            ================================================= */}

            <div className="mb-5">

              <label className="profile-label">
                Language
              </label>

              <input
                autoFocus
                value={languageName}
                onChange={(e) =>
                  setLanguageName(
                    e.target.value
                  )
                }
                className="profile-input"
                placeholder="Enter language name"
              />

            </div>


            {/* =================================================
                FLUENCY DROPDOWN
            ================================================= */}

            <div className="mb-6">

              <label className="profile-label">
                Fluency
              </label>

              <select
                value={languageProficiency}
                onChange={(e) =>
                  setLanguageProficiency(
                    e.target.value
                  )
                }
                className="profile-input"
              >

                <option value="">
                  Select fluency
                </option>

                {LANGUAGE_PROFICIENCY.map(
                  level => (

                    <option
                      key={level}
                      value={level}
                    >
                      {level}
                    </option>

                  )
                )}

              </select>

            </div>


            {/* =================================================
                POPUP BUTTON
            ================================================= */}

            <button
              type="button"
              onClick={saveLanguage}
              disabled={
                !languageName.trim() ||
                !languageProficiency
              }
              className="
                w-full
                h-[48px]
                rounded-xl
                bg-[#2462AC]
                text-blue-900
                text-[13px]
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
              {editingLanguage
                ? 'Update language'
                : 'Add language'}
            </button>

          </div>

        </div>

      )}

    </Desktop_ProfileBottomSheet>
  )
}


export default Desktop_LanguagePreference