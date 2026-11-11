import React, {
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  getProfileData,
  saveProfileData,
} from '../../../inputs/overall/Profile_Storage'

import {
  PROFILE_COMPLETION_FIELDS,
} from '../../../inputs/overall/profile_complition_logic'

import {
  getProfileCompletionPercentage,
} from '../../../inputs/overall/Profile_Completion_Percentage'


function Mobile_JobProfileCompletionCard({
  question,
  onGoToProfile,
}) {


  // ============================================================
  // PROFILE DATA
  // ============================================================

  const [profileData, setProfileData] =
    useState(() => getProfileData())


  // ============================================================
  // CURRENT QUESTION
  // ============================================================

  const [currentQuestion, setCurrentQuestion] =
    useState(question || null)


  // ============================================================
  // ANSWER
  // ============================================================

  const [answer, setAnswer] =
    useState('')


  // ============================================================
  // LANGUAGE
  // ============================================================

  const [languageName, setLanguageName] =
    useState('')


  const [languageProficiency, setLanguageProficiency] =
    useState('')


  // ============================================================
  // RANKED FIELDS
  // ============================================================

  const rankedFields = useMemo(() => {

    return [
      ...PROFILE_COMPLETION_FIELDS,
    ].sort(
      (a, b) =>
        a.rank - b.rank
    )

  }, [])


  // ============================================================
  // CHECK COMPLETION
  // ============================================================

  const isCompletionItemCompleted = (
    item,
    data = profileData
  ) => {

    if (!item) {
      return false
    }


    const value =
      data?.[item.field]


    // ==========================================================
    // LANGUAGES
    // ==========================================================

    if (
      item.type === 'languages'
    ) {

      return (
        Array.isArray(value) &&
        value.length > 0
      )

    }


    // ==========================================================
    // EXPERIENCE / EDUCATION
    // ==========================================================

    if (
      item.type === 'experience' ||
      item.type === 'education'
    ) {

      if (
        !value ||
        typeof value !== 'object'
      ) {

        return false

      }


      return Object.values(value).some(
        fieldValue => {

          return (
            fieldValue !== undefined &&
            fieldValue !== null &&
            String(fieldValue).trim() !== ''
          )

        }
      )

    }


    // ==========================================================
    // NORMAL FIELD
    // ==========================================================

    return (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ''
    )

  }


  // ============================================================
  // ALL INCOMPLETE QUESTIONS
  // ============================================================

  const incompleteQuestions = useMemo(() => {

    return rankedFields.filter(
      item =>
        !isCompletionItemCompleted(item)
    )

  }, [
    rankedFields,
    profileData,
  ])


  // ============================================================
  // EXPERIENCE FIELDS
  // ============================================================

  const experienceFields = [

    {
      field: 'designation',
      question: 'What was your designation?',
      placeholder: 'Enter designation',
      type: 'text',
    },

    {
      field: 'industry',
      question: 'Which industry did you work in?',
      placeholder: 'Enter industry',
      type: 'text',
    },

    {
      field: 'salary',
      question: 'What was your salary?',
      placeholder: 'Enter salary',
      type: 'number',
    },

    {
      field: 'years',
      question: 'How many years did you work?',
      placeholder: 'Enter years',
      type: 'number',
    },

    {
      field: 'companyName',
      question: 'What was the company name?',
      placeholder: 'Enter company name',
      type: 'text',
    },

  ]


  // ============================================================
  // EDUCATION FIELDS
  // ============================================================

  const getEducationFields = (
    educationType
  ) => {

    if (
      educationType === 'tenth'
    ) {

      return [

        {
          field: 'qualification',
          question:
            'What is your 10th qualification?',
          placeholder:
            'Enter qualification',
          type: 'text',
        },

        {
          field: 'passoutYear',
          question:
            'What is your 10th passout year?',
          placeholder:
            'Enter passout year',
          type: 'number',
        },

        {
          field: 'marks',
          question:
            'What are your 10th marks?',
          placeholder:
            'Enter marks / percentage',
          type: 'text',
        },

        {
          field: 'collegeLocation',
          question:
            'Where is your 10th school located?',
          placeholder:
            'Enter school location',
          type: 'text',
        },

      ]

    }


    if (
      educationType === 'puc'
    ) {

      return [

        {
          field: 'pucName',
          question:
            'What is your PUC name?',
          placeholder:
            'Enter PUC name',
          type: 'text',
        },

        {
          field: 'passoutYear',
          question:
            'What is your PUC passout year?',
          placeholder:
            'Enter passout year',
          type: 'number',
        },

        {
          field: 'marks',
          question:
            'What are your PUC marks?',
          placeholder:
            'Enter marks / percentage',
          type: 'text',
        },

        {
          field: 'collegeLocation',
          question:
            'Where is your PUC college located?',
          placeholder:
            'Enter college location',
          type: 'text',
        },

      ]

    }


    if (
      educationType === 'diploma'
    ) {

      return [

        {
          field: 'diplomaName',
          question:
            'What is your diploma name?',
          placeholder:
            'Enter diploma name',
          type: 'text',
        },

        {
          field: 'passoutYear',
          question:
            'What is your diploma passout year?',
          placeholder:
            'Enter passout year',
          type: 'number',
        },

        {
          field: 'marks',
          question:
            'What are your diploma marks?',
          placeholder:
            'Enter marks / percentage',
          type: 'text',
        },

        {
          field: 'collegeLocation',
          question:
            'Where is your diploma college located?',
          placeholder:
            'Enter college location',
          type: 'text',
        },

      ]

    }


    if (
      educationType === 'degree'
    ) {

      return [

        {
          field: 'degreeName',
          question:
            'What is your degree name?',
          placeholder:
            'Enter degree name',
          type: 'text',
        },

        {
          field: 'passoutYear',
          question:
            'What is your degree passout year?',
          placeholder:
            'Enter passout year',
          type: 'number',
        },

        {
          field: 'marks',
          question:
            'What are your degree marks?',
          placeholder:
            'Enter marks / percentage',
          type: 'text',
        },

        {
          field: 'collegeLocation',
          question:
            'Where is your degree college located?',
          placeholder:
            'Enter college location',
          type: 'text',
        },

      ]

    }


    if (
      educationType === 'masters'
    ) {

      return [

        {
          field: 'mastersName',
          question:
            'What is your masters name?',
          placeholder:
            'Enter masters name',
          type: 'text',
        },

        {
          field: 'passoutYear',
          question:
            'What is your masters passout year?',
          placeholder:
            'Enter passout year',
          type: 'number',
        },

        {
          field: 'marks',
          question:
            'What are your masters marks?',
          placeholder:
            'Enter marks / percentage',
          type: 'text',
        },

        {
          field: 'collegeLocation',
          question:
            'Where is your masters college located?',
          placeholder:
            'Enter college location',
          type: 'text',
        },

      ]

    }


    return []

  }


  // ============================================================
  // CURRENT GROUP FIELD
  // ============================================================

  const currentGroupField = useMemo(() => {

    if (!currentQuestion) {
      return null
    }


    // ==========================================================
    // EXPERIENCE
    // ==========================================================

    if (
      currentQuestion.type ===
      'experience'
    ) {

      const experience =
        profileData?.[
          currentQuestion.field
        ] || {}


      return (
        experienceFields.find(
          item =>
            !experience?.[
              item.field
            ] ||
            String(
              experience[
                item.field
              ]
            ).trim() === ''
        ) || null
      )

    }


    // ==========================================================
    // EDUCATION
    // ==========================================================

    if (
      currentQuestion.type ===
      'education'
    ) {

      const education =
        profileData?.[
          currentQuestion.field
        ] || {}


      const fields =
        getEducationFields(
          currentQuestion.educationType
        )


      return (
        fields.find(
          item =>
            !education?.[
              item.field
            ] ||
            String(
              education[
                item.field
              ]
            ).trim() === ''
        ) || null
      )

    }


    return null

  }, [
    currentQuestion,
    profileData,
  ])


  // ============================================================
  // QUESTION TEXT
  // ============================================================

  const questionText = useMemo(() => {

    if (!currentQuestion) {
      return ''
    }


    if (
      currentQuestion.type ===
        'experience' ||
      currentQuestion.type ===
        'education'
    ) {

      return (
        currentGroupField?.question ||
        currentQuestion.question
      )

    }


    return currentQuestion.question

  }, [
    currentQuestion,
    currentGroupField,
  ])


  // ============================================================
  // INPUT TYPE
  // ============================================================

  const inputType = useMemo(() => {

    if (!currentQuestion) {
      return 'text'
    }


    if (
      currentQuestion.type ===
        'experience' ||
      currentQuestion.type ===
        'education'
    ) {

      return (
        currentGroupField?.type ||
        'text'
      )

    }


    return currentQuestion.type

  }, [
    currentQuestion,
    currentGroupField,
  ])


  // ============================================================
  // PLACEHOLDER
  // ============================================================

  const placeholder = useMemo(() => {

    if (!currentQuestion) {
      return ''
    }


    if (
      currentQuestion.type ===
        'experience' ||
      currentQuestion.type ===
        'education'
    ) {

      return (
        currentGroupField?.placeholder ||
        ''
      )

    }


    return (
      currentQuestion.placeholder ||
      ''
    )

  }, [
    currentQuestion,
    currentGroupField,
  ])


  // ============================================================
  // RESET / LOAD ANSWER WHEN QUESTION CHANGES
  // ============================================================

  useEffect(() => {

    setAnswer('')

    setLanguageName('')

    if (
      currentQuestion?.type ===
      'languages'
    ) {

      setLanguageProficiency(
        currentQuestion
          .proficiencyOptions?.[0] ||
        'Manageable'
      )

    } else {

      setLanguageProficiency('')

    }

  }, [
    currentQuestion,
  ])


  // ============================================================
  // PROFILE COMPLETION %
  // ============================================================

  // ============================================================
// PROFILE COMPLETION %
// ============================================================

const profileCompletion =
  getProfileCompletionPercentage(
    profileData
  )


  // ============================================================
  // MOVE TO NEXT QUESTION
  // ============================================================

  const moveToNextQuestion = (
    updatedProfile
  ) => {

    const nextIncomplete =
      rankedFields.filter(
        item =>
          !isCompletionItemCompleted(
            item,
            updatedProfile
          )
      )


    if (!nextIncomplete.length) {

      setCurrentQuestion(null)

      return

    }


    // ==========================================================
    // FIND QUESTION AFTER CURRENT QUESTION
    // ==========================================================

    const currentRank =
      currentQuestion?.rank || 0


    const nextQuestion =
      nextIncomplete.find(
        item =>
          item.rank > currentRank
      )


    // ==========================================================
    // IF THERE IS A NEXT RANK
    // ==========================================================

    if (nextQuestion) {

      setCurrentQuestion(
        nextQuestion
      )

      return

    }


    // ==========================================================
    // FALLBACK
    // ==========================================================

    setCurrentQuestion(
      nextIncomplete[0]
    )

  }


  // ============================================================
  // CONTINUE
  // ============================================================

  const handleContinue = () => {

    if (!currentQuestion) {
      return
    }


    // ==========================================================
    // LANGUAGE
    // ==========================================================

    if (
      currentQuestion.type ===
      'languages'
    ) {

      if (
        !languageName.trim()
      ) {
        return
      }


      const newLanguage = {

        language:
          languageName.trim(),

        proficiency:
          languageProficiency ||
          currentQuestion
            .proficiencyOptions?.[0] ||
          'Manageable',

      }


      const updatedProfile = {

        ...profileData,

        languages: [

          ...(
            Array.isArray(
              profileData.languages
            )
              ? profileData.languages
              : []
          ),

          newLanguage,

        ],

      }


      saveProfileData(
        updatedProfile
      )

      setProfileData(
        updatedProfile
      )


      // MOVE QUESTION
      moveToNextQuestion(
        updatedProfile
      )


      return

    }


    // ==========================================================
    // EXPERIENCE / EDUCATION
    // ==========================================================

    if (
      currentQuestion.type ===
        'experience' ||
      currentQuestion.type ===
        'education'
    ) {

      if (!currentGroupField) {
        return
      }


      if (
        !answer.trim()
      ) {
        return
      }


      const updatedProfile = {

        ...profileData,

        [currentQuestion.field]: {

          ...(
            profileData[
              currentQuestion.field
            ] || {}
          ),

          [currentGroupField.field]:
            answer.trim(),

        },

      }


      saveProfileData(
        updatedProfile
      )

      setProfileData(
        updatedProfile
      )


      // MOVE QUESTION
      moveToNextQuestion(
        updatedProfile
      )


      return

    }


    // ==========================================================
    // NORMAL FIELD
    // ==========================================================

    if (
      !answer.trim()
    ) {
      return
    }


    const updatedProfile = {

      ...profileData,

      [currentQuestion.field]:
        answer.trim(),

    }


    saveProfileData(
      updatedProfile
    )

    setProfileData(
      updatedProfile
    )


    // MOVE QUESTION
    moveToNextQuestion(
      updatedProfile
    )

  }


  // ============================================================
  // PROFILE COMPLETE
  // ============================================================

  if (!currentQuestion) {

    return (

      <div
        className="
          w-full
          min-h-[171px]
          rounded-[20px]
          bg-gradient-to-br from-[#397BC8] via-[#397BC8] to-[#2462AC]
          p-[3px]
          shadow-[0_8px_24px_rgba(37,99,180,0.12)]
        "
      >

        <div
          className="
            h-full
            min-h-[155px]
            rounded-[17px]
            border border-white/80
            bg-white
            px-3 py-4 sm:px-5
            flex
            flex-col
            justify-center
            items-center
            text-center
          "
        >

          <div
            className="
              w-[42px]
              h-[42px]
              rounded-full
              bg-gradient-to-br from-blue-300 to-blue-500
              border-2 border-white
              ring-2 ring-blue-100
              shadow-sm
              flex
              items-center
              justify-center
              text-[20px]
              font-bold
              text-white
            "
          >
            ✓
          </div>


          <p
            className="
              mt-2
              text-[14px]
              font-extrabold
              text-blue-900
            "
          >
            Profile Complete
          </p>


          <p
            className="
              mt-1
              text-[9px]
              text-blue-700
            "
          >
            Your profile is 100% complete.
          </p>

        </div>

      </div>

    )

  }


  // ============================================================
  // RETURN
  // ============================================================

  return (

    <div
      className="
        w-full
        min-h-[171px]
        rounded-[20px]
        bg-gradient-to-br from-[#397BC8] via-[#397BC8] to-[#2462AC]
        p-[3px]
        shadow-[0_8px_24px_rgba(37,99,180,0.12)]
      "
    >

      <div
        className="
          min-h-[155px]
          rounded-[17px]
          border border-white/80
          bg-white
          px-3 py-3.5 sm:px-5 sm:py-4
        "
      >

        {/* ====================================================
            TOP
        ==================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          <div className="min-w-0">

            <p
              className="
                text-[9px]
                font-bold
                text-blue-600
                uppercase
                tracking-[0.14em]
              "
            >
              Complete your profile
            </p>


            <h3
              className="
                mt-[1px]
                text-[14px]
                font-extrabold
                tracking-tight
                text-blue-950
              "
            >
              Profile question
            </h3>

          </div>


          {/* COMPLETION */}

          <div
            className="
              shrink-0
              w-[42px]
              h-[42px]
              rounded-full
              bg-gradient-to-br from-blue-300 to-blue-500
              border-2 border-white
              ring-2 ring-blue-100
              shadow-sm
              flex
              items-center
              justify-center
              text-[10px]
              font-extrabold
              text-white
            "
          >
            {profileCompletion}%
          </div>

        </div>


        {/* ====================================================
            QUESTION
        ==================================================== */}

        <div
          className="
            mt-3
            rounded-xl
            border border-blue-100
            bg-blue-50/90
            px-2.5 py-2
            flex
            items-center
            gap-2
          "
        >

          <div
            className="
              shrink-0
              w-[27px]
              h-[27px]
              rounded-full
              bg-blue-950
              ring-2 ring-blue-100
              text-white
              flex
              items-center
              justify-center
              text-[9px]
              font-extrabold
            "
          >
            {currentQuestion.rank}
          </div>


          <p
            className="
              text-[11px]
              leading-[15px]
              font-bold
              text-blue-900
              line-clamp-2
            "
          >
            {questionText}
          </p>

        </div>


        {/* ====================================================
            TEXT / NUMBER / DATE / EMAIL / TEL
        ==================================================== */}

        {(
          currentQuestion.type ===
            'text' ||
          currentQuestion.type ===
            'number' ||
          currentQuestion.type ===
            'date' ||
          currentQuestion.type ===
            'email' ||
          currentQuestion.type ===
            'tel' ||
          currentQuestion.type ===
            'experience' ||
          currentQuestion.type ===
            'education'
        ) && (

          <input
            type={inputType}
            value={answer}
            onChange={(e) =>
              setAnswer(
                e.target.value
              )
            }
            placeholder={placeholder}
            className="
              mt-2
              w-full
              h-[36px]
              rounded-xl
              border border-blue-200
              bg-blue-50/80
              px-3
              text-[11px]
              text-blue-900
              outline-none
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
            "
          />

        )}


        {/* ====================================================
            SELECT
        ==================================================== */}

        {currentQuestion.type ===
          'select' && (

          <div
            className="
              mt-2
              flex
              gap-1
              overflow-x-auto
              scrollbar-hide
            "
          >

            {(
              currentQuestion.options ||
              []
            ).map(
              option => (

                <button
                  key={option}
                  type="button"
                  onClick={() =>
                    setAnswer(option)
                  }
                  className={`
                    shrink-0
                    h-[32px]
                    px-3.5
                    rounded-full
                    border
                    text-[10px]
                    font-semibold
                    transition-all duration-200 active:scale-95
                    ${
                      answer === option
                        ? 'bg-gradient-to-r from-blue-300 to-blue-400 border-blue-400 text-blue-950 shadow-sm'
                        : 'bg-white border-blue-200 text-blue-700 hover:border-blue-300'
                    }
                  `}
                >
                  {option}
                </button>

              )
            )}

          </div>

        )}


        {/*====================================================
            LANGUAGE
        ====================================================*/}

        {currentQuestion.type ===
          'languages' && (

          <div
            className="
              mt-2
              flex
              gap-1
            "
          >

            <input
              type="text"
              value={languageName}
              onChange={(e) =>
                setLanguageName(
                  e.target.value
                )
              }
              placeholder="Language"
              className="
                flex-1
                min-w-0
                h-[36px]
                rounded-xl
                border border-blue-200
                bg-blue-50/80
                px-2.5
                text-[11px]
                outline-none
                focus:border-blue-500
                focus:ring-2 focus:ring-blue-100
              "
            />


            <select
              value={
                languageProficiency
              }
              onChange={(e) =>
                setLanguageProficiency(
                  e.target.value
                )
              }
              className="
                w-[112px]
                shrink-0
                h-[36px]
                rounded-xl
                border border-blue-200
                bg-blue-50/80
                px-2
                text-[10px]
                outline-none
                focus:border-blue-500
                focus:ring-2 focus:ring-blue-100
              "
            >

              {(
                currentQuestion
                  .proficiencyOptions ||
                []
              ).map(
                option => (

                  <option
                    key={option}
                    value={option}
                  >
                    {option}
                  </option>

                )
              )}

            </select>

          </div>

        )}


        {/* ====================================================
            BOTTOM ACTIONS
        ==================================================== */}

        <div
          className="
            mt-3
            flex
            items-center
            gap-2
          "
        >

          <button
            type="button"
            onClick={
              handleContinue
            }
            className="
              flex-1
              h-[35px]
              rounded-full
              bg-gradient-to-r from-blue-300 via-blue-400 to-blue-400
              text-[11px]
              font-extrabold
              text-blue-950
              shadow-sm
              transition-all duration-200
              hover:shadow-md
              active:scale-[0.98]
            "
          >
            Save & Continue
          </button>


          <button
            type="button"
            onClick={(e) => {

              e.stopPropagation()

              onGoToProfile?.()

            }}
            className="
              h-[35px]
              px-3.5
              rounded-full
              border border-blue-900
              bg-blue-950
              text-white
              text-[10px]
              font-bold
              shadow-sm
              transition-all duration-200
              hover:bg-blue-900
              active:scale-[0.98]
              whitespace-nowrap
            "
          >
            Go to Profile
          </button>

        </div>

      </div>

    </div>

  )

}


export default Mobile_JobProfileCompletionCard