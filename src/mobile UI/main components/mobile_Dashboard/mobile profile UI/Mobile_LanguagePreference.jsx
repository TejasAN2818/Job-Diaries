import React, { useState } from 'react'
import Mobile_ProfileBottomSheet from './Mobile_ProfileBottomSheet'

import {
  LANGUAGE_PROFICIENCY,
} from '../../../../inputs/overall/Profile_Data'


function Mobile_LanguagePreference({
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

    <Mobile_ProfileBottomSheet
      title="Language preference"
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
            Language preference
          </h3>

          <p
            className="
              text-[11px]
              leading-[17px]
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
                  Added languages
                </h3>

                <p
                  className="
                    text-[10px]
                    text-blue-400
                    mt-1
                  "
                >
                  Your selected languages
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
                {profileData.languages.length}
              </span>

            </div>


            {/* =================================================
                LANGUAGE CARDS
            ================================================= */}

            <div className="space-y-2">

              {profileData.languages.map(
                (item, index) => (

                  <div
                    key={`${item.language}-${index}`}
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
                          LANGUAGE INFO
                      ================================================= */}

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                          min-w-0
                        "
                      >

                        {/* LANGUAGE ICON */}

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
                              text-[13px]
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
                              text-[13px]
                              font-bold
                              text-blue-900
                              truncate
                            "
                          >
                            {item.language}
                          </p>

                          <p
                            className="
                              text-[10px]
                              text-blue-400
                              mt-[2px]
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
                            removeLanguage(
                              item.language
                            )
                          }
                          aria-label={`Remove ${item.language}`}
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
                text-[10px]
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
            px-5
          "
          onClick={closeLanguagePopup}
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
                  {editingLanguage
                    ? 'Edit language'
                    : 'Add language'}
                </h3>

                <p
                  className="
                    text-[10px]
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
                LANGUAGE INPUT
            ================================================= */}

            <div className="mb-4">

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

            <div className="mb-5">

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
              {editingLanguage
                ? 'Update language'
                : 'Add language'}
            </button>

          </div>

        </div>

      )}

    </Mobile_ProfileBottomSheet>
  )
}


export default Mobile_LanguagePreference