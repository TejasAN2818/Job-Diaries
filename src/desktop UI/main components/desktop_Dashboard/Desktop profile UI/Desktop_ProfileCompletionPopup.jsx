
import React, { useEffect, useMemo, useState } from 'react'
import {
  Check,
  CircleCheck,
  Sparkles,
  X,
} from 'lucide-react'

import Desktop_ProfileBottomSheet from './Desktop_ProfileBottomSheet'

import {
  PROFILE_COMPLETION_FIELDS,
} from '../../../../inputs/overall/profile_complition_logic'

function Desktop_ProfileCompletionPopup({
  open,
  profileData = {},
  setProfileData,
  onClose,
}) {
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [languageName, setLanguageName] = useState('')
  const [languageProficiency, setLanguageProficiency] = useState('')

  const rankedFields = useMemo(
    () => [...PROFILE_COMPLETION_FIELDS].sort(
      (a, b) => a.rank - b.rank
    ),
    []
  )

  const isCompletionItemCompleted = (item) => {
    if (!item) return false

    const value = profileData?.[item.field]

    if (item.type === 'languages') {
      return Array.isArray(value) && value.length > 0
    }

    if (
      item.type === 'experience' ||
      item.type === 'education'
    ) {
      if (!value || typeof value !== 'object') return false

      return Object.values(value).some(
        (fieldValue) =>
          fieldValue !== undefined &&
          fieldValue !== null &&
          String(fieldValue).trim() !== ''
      )
    }

    return (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ''
    )
  }

  const incompleteFields = useMemo(
    () => rankedFields.filter(
      (item) => !isCompletionItemCompleted(item)
    ),
    [rankedFields, profileData]
  )

  const currentItem = incompleteFields[currentItemIndex] || null

  const progress = useMemo(() => {
    const requiredFields = rankedFields.filter(
      (item) => item.required
    )

    if (!requiredFields.length) return 100

    const completedCount = requiredFields.filter(
      (item) => isCompletionItemCompleted(item)
    ).length

    return Math.round(
      (completedCount / requiredFields.length) * 100
    )
  }, [rankedFields, profileData])

  useEffect(() => {
    if (!open) return

    setCurrentItemIndex(0)
    setAnswer('')
    setLanguageName('')
    setLanguageProficiency('')
  }, [open])

  useEffect(() => {
    if (!currentItem) {
      setAnswer('')
      return
    }

    const { field, type } = currentItem

    if (
      type !== 'experience' &&
      type !== 'education' &&
      type !== 'languages'
    ) {
      setAnswer(profileData?.[field] || '')
      return
    }

    if (type === 'experience' || type === 'education') {
      setAnswer('')
      return
    }

    if (type === 'languages') {
      setLanguageName('')
      setLanguageProficiency(
        currentItem.proficiencyOptions?.[0] || ''
      )
    }
  }, [currentItem, profileData])

  const updateProfileField = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const updateNestedField = (parent, field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent] || {}),
        [field]: value,
      },
    }))
  }

  const hasAnswer = () => (
    answer !== undefined &&
    answer !== null &&
    String(answer).trim() !== ''
  )

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

  const getEducationFields = (educationType) => {
    if (educationType === 'tenth') {
      return [
        {
          field: 'qualification',
          question: 'What is your 10th qualification?',
          placeholder: 'Enter qualification',
          type: 'text',
        },
        {
          field: 'passoutYear',
          question: 'What is your 10th passout year?',
          placeholder: 'Enter passout year',
          type: 'number',
        },
        {
          field: 'marks',
          question: 'What are your 10th marks?',
          placeholder: 'Enter marks / percentage',
          type: 'text',
        },
        {
          field: 'collegeLocation',
          question: 'Where is your 10th school located?',
          placeholder: 'Enter school location',
          type: 'text',
        },
      ]
    }

    if (educationType === 'puc') {
      return [
        {
          field: 'pucName',
          question: 'What is your PUC name?',
          placeholder: 'Enter PUC name',
          type: 'text',
        },
        {
          field: 'passoutYear',
          question: 'What is your PUC passout year?',
          placeholder: 'Enter passout year',
          type: 'number',
        },
        {
          field: 'marks',
          question: 'What are your PUC marks?',
          placeholder: 'Enter marks / percentage',
          type: 'text',
        },
        {
          field: 'collegeLocation',
          question: 'Where is your PUC college located?',
          placeholder: 'Enter college location',
          type: 'text',
        },
      ]
    }

    if (educationType === 'diploma') {
      return [
        {
          field: 'diplomaName',
          question: 'What is your diploma name?',
          placeholder: 'Enter diploma name',
          type: 'text',
        },
        {
          field: 'passoutYear',
          question: 'What is your diploma passout year?',
          placeholder: 'Enter passout year',
          type: 'number',
        },
        {
          field: 'marks',
          question: 'What are your diploma marks?',
          placeholder: 'Enter marks / percentage',
          type: 'text',
        },
        {
          field: 'collegeLocation',
          question: 'Where is your diploma college located?',
          placeholder: 'Enter college location',
          type: 'text',
        },
      ]
    }

    if (educationType === 'degree') {
      return [
        {
          field: 'degreeName',
          question: 'What is your degree name?',
          placeholder: 'Enter degree name',
          type: 'text',
        },
        {
          field: 'passoutYear',
          question: 'What is your degree passout year?',
          placeholder: 'Enter passout year',
          type: 'number',
        },
        {
          field: 'marks',
          question: 'What are your degree marks?',
          placeholder: 'Enter marks / percentage',
          type: 'text',
        },
        {
          field: 'collegeLocation',
          question: 'Where is your degree college located?',
          placeholder: 'Enter college location',
          type: 'text',
        },
      ]
    }

    if (educationType === 'masters') {
      return [
        {
          field: 'mastersName',
          question: 'What is your masters name?',
          placeholder: 'Enter masters name',
          type: 'text',
        },
        {
          field: 'passoutYear',
          question: 'What is your masters passout year?',
          placeholder: 'Enter passout year',
          type: 'number',
        },
        {
          field: 'marks',
          question: 'What are your masters marks?',
          placeholder: 'Enter marks / percentage',
          type: 'text',
        },
        {
          field: 'collegeLocation',
          question: 'Where is your masters college located?',
          placeholder: 'Enter college location',
          type: 'text',
        },
      ]
    }

    return []
  }

  const getCurrentGroupField = () => {
    if (!currentItem) return null

    if (currentItem.type === 'experience') {
      const experience =
        profileData?.[currentItem.field] || {}

      return (
        experienceFields.find(
          (item) =>
            !experience?.[item.field] ||
            String(experience[item.field]).trim() === ''
        ) || null
      )
    }

    if (currentItem.type === 'education') {
      const education =
        profileData?.[currentItem.field] || {}

      const fields = getEducationFields(
        currentItem.educationType
      )

      return (
        fields.find(
          (item) =>
            !education?.[item.field] ||
            String(education[item.field]).trim() === ''
        ) || null
      )
    }

    return null
  }

  const currentGroupField = getCurrentGroupField()

  const getQuestion = () => {
    if (!currentItem) return ''

    if (
      currentItem.type === 'experience' ||
      currentItem.type === 'education'
    ) {
      return (
        currentGroupField?.question ||
        currentItem.question
      )
    }

    return currentItem.question
  }

  const getPlaceholder = () => {
    if (
      currentItem?.type === 'experience' ||
      currentItem?.type === 'education'
    ) {
      return currentGroupField?.placeholder || ''
    }

    return currentItem?.placeholder || ''
  }

  const getInputType = () => {
    if (
      currentItem?.type === 'experience' ||
      currentItem?.type === 'education'
    ) {
      return currentGroupField?.type || 'text'
    }

    return currentItem?.type || 'text'
  }

  const moveToNextRank = () => {
    setCurrentItemIndex((previous) => {
      const nextIndex = previous + 1

      if (nextIndex >= incompleteFields.length) {
        return previous
      }

      return nextIndex
    })
  }

  const handleContinue = () => {
    if (!currentItem) return

    // Languages
    if (currentItem.type === 'languages') {
      if (!languageName.trim()) return

      const newLanguage = {
        language: languageName.trim(),
        proficiency:
          languageProficiency ||
          currentItem.proficiencyOptions?.[0] ||
          'Manageable',
      }

      setProfileData((prev) => ({
        ...prev,
        languages: [
          ...(Array.isArray(prev.languages)
            ? prev.languages
            : []),
          newLanguage,
        ],
      }))

      setLanguageName('')
      setLanguageProficiency(
        currentItem.proficiencyOptions?.[0] || ''
      )

      return
    }

    // Experience
    if (currentItem.type === 'experience') {
      if (!currentGroupField) {
        moveToNextRank()
        return
      }

      if (!hasAnswer()) return

      updateNestedField(
        currentItem.field,
        currentGroupField.field,
        answer
      )

      setAnswer('')
      return
    }

    // Education
    if (currentItem.type === 'education') {
      if (!currentGroupField) {
        moveToNextRank()
        return
      }

      if (!hasAnswer()) return

      updateNestedField(
        currentItem.field,
        currentGroupField.field,
        answer
      )

      setAnswer('')
      return
    }

    // Normal fields
    if (!hasAnswer()) return

    updateProfileField(currentItem.field, answer)
    setAnswer('')
  }

  useEffect(() => {
    if (!currentItem) return

    if (
      currentItem.type === 'experience' ||
      currentItem.type === 'education'
    ) {
      const groupField = getCurrentGroupField()

      if (!groupField) {
        setCurrentItemIndex((previous) => previous + 1)
      }
    }
  }, [profileData, currentItem])

  if (!open) return null

  // Completion screen
  if (!currentItem) {
    return (
      <Desktop_ProfileBottomSheet
        title="Profile Complete"
        onClose={onClose}
      >
        <div className="flex min-h-[55vh] flex-col items-center justify-center px-8 text-center">
          <div className="relative flex h-[96px] w-[96px] items-center justify-center rounded-[30px] bg-gradient-to-br from-emerald-400 to-green-600 text-white shadow-[0_14px_35px_rgba(22,163,74,0.25)] animate-[popupIn_500ms_ease-out]">
            <div className="absolute inset-2 rounded-[24px] border border-white/30" />
            <CircleCheck size={48} strokeWidth={1.8} />
            <Sparkles
              size={20}
              className="absolute -right-2 -top-2 text-blue-600"
            />
          </div>

          <h2 className="mt-6 text-[28px] font-extrabold tracking-tight text-blue-900">
            Profile Complete!
          </h2>

          <p className="mt-2 max-w-[320px] text-[14px] leading-6 text-blue-700">
            Your profile is 100% complete. You are ready to make the most of your job search.
          </p>

          <button
            type="button"
            onClick={onClose}
            className="
              mt-7 inline-flex h-[48px] items-center justify-center gap-2
              rounded-[14px] bg-emerald-600 px-9
              text-[14px] font-bold text-white
              shadow-lg shadow-emerald-600/20
              transition-all duration-200
              hover:-translate-y-0.5 hover:bg-emerald-700
              hover:shadow-xl active:scale-[0.97]
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-emerald-600 focus-visible:ring-offset-2
            "
          >
            <Check size={18} />
            Done
          </button>
        </div>
      </Desktop_ProfileBottomSheet>
    )
  }

  const currentRank = currentItem.rank
  const inputType = getInputType()

  const inputClassName = `
    h-[52px] w-full rounded-[14px]
    border border-blue-200 bg-blue-50/80
    px-4 text-[14px] font-medium text-blue-900
    outline-none placeholder:font-normal placeholder:text-blue-400
    transition-all duration-200
    hover:border-blue-300
    focus:border-blue-500 focus:bg-white
    focus:ring-4 focus:ring-blue-500/10
  `

  return (
    <Desktop_ProfileBottomSheet
      title="Complete Your Profile"
      onClose={onClose}
    >
      <div className="font-sans text-blue-900">
        {/* Progress */}
        <div className="mb-7 rounded-[18px] border border-blue-100 bg-blue-50/80 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-[13px] font-bold text-blue-900">
                Your profile progress
              </p>
              <p className="mt-1 text-[11px] text-blue-700">
                Complete the steps to strengthen your profile
              </p>
            </div>

            <span className="shrink-0 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[13px] font-extrabold text-blue-700">
              {progress}%
            </span>
          </div>

          <div
            className="h-[8px] w-full overflow-hidden rounded-full bg-blue-200"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Profile completion"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-lime-400 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-100 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.5px] text-blue-900">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-100" />
            Step {currentRank}
          </span>

          <span className="text-[11px] font-medium text-blue-400">
            {currentItemIndex + 1} of {incompleteFields.length}
          </span>
        </div>

        {/* Question */}
        <h2 className="mb-6 text-[24px] font-extrabold leading-[1.35] tracking-[-0.6px] text-blue-900">
          {getQuestion()}
        </h2>

        {/* Languages */}
        {currentItem.type === 'languages' && (
          <div className="animate-[popupIn_250ms_ease-out]">
            <label className="mb-2 block text-[12px] font-bold text-blue-700">
              Language name
            </label>

            <input
              type="text"
              value={languageName}
              onChange={(e) => setLanguageName(e.target.value)}
              placeholder="Enter language"
              className={inputClassName}
            />

            <div className="mt-5">
              <p className="mb-3 text-[12px] font-bold text-blue-700">
                Proficiency level
              </p>

              <div className="grid grid-cols-3 gap-3">
                {(currentItem.proficiencyOptions || []).map(
                  (option) => {
                    const selected = languageProficiency === option

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setLanguageProficiency(option)}
                        className={`
                          min-h-[46px] rounded-[12px] border px-2
                          text-[11px] font-bold transition-all duration-200
                          hover:-translate-y-0.5 active:scale-[0.97]
                          ${
                            selected
                              ? 'border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/15'
                              : 'border-blue-200 bg-white text-blue-700 hover:border-blue-300 hover:bg-blue-50'
                          }
                        `}
                      >
                        {option}
                      </button>
                    )
                  }
                )}
              </div>
            </div>

            {profileData.languages?.length > 0 && (
              <div className="mt-6">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.5px] text-blue-400">
                  Added languages
                </p>

                <div className="space-y-2">
                  {profileData.languages.map((item, index) => (
                    <div
                      key={`${item.language}-${index}`}
                      className="flex items-center justify-between gap-3 rounded-[13px] border border-blue-100 bg-blue-50 px-4 py-3 transition-colors hover:border-blue-100 hover:bg-blue-50/50"
                    >
                      <span className="text-[13px] font-bold text-blue-900">
                        {item.language}
                      </span>

                      <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-blue-700 ring-1 ring-blue-200">
                        {item.proficiency}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Select */}
        {currentItem.type === 'select' && (
          <div className="space-y-3 animate-[popupIn_250ms_ease-out]">
            {(currentItem.options || []).map((option) => {
              const selected = answer === option

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setAnswer(option)}
                  className={`
                    flex min-h-[52px] w-full items-center justify-between
                    gap-3 rounded-[14px] border px-4 text-left
                    text-[14px] font-semibold transition-all duration-200
                    hover:-translate-y-0.5 active:scale-[0.99]
                    ${
                      selected
                        ? 'border-blue-500 bg-blue-50 text-blue-800 shadow-sm'
                        : 'border-blue-200 bg-white text-blue-800 hover:border-blue-300 hover:bg-blue-50'
                    }
                  `}
                >
                  <span>{option}</span>

                  {selected && (
                    <CircleCheck
                      size={20}
                      className="shrink-0 text-blue-600"
                    />
                  )}
                </button>
              )
            })}
          </div>
        )}

        {/* Text, number, date, email, telephone, experience, education */}
        {(
          currentItem.type === 'text' ||
          currentItem.type === 'tel' ||
          currentItem.type === 'email' ||
          currentItem.type === 'date' ||
          currentItem.type === 'number' ||
          currentItem.type === 'experience' ||
          currentItem.type === 'education'
        ) && (
          <div className="animate-[popupIn_250ms_ease-out]">
            <label className="mb-2 block text-[12px] font-bold text-blue-700">
              Your answer
            </label>

            <input
              type={inputType}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder={getPlaceholder()}
              className={inputClassName}
            />
          </div>
        )}

        {/* Continue */}
        <button
          type="button"
          onClick={handleContinue}
          className="
            mt-8 flex h-[52px] w-full items-center justify-center gap-2
            rounded-[14px] bg-gradient-to-r from-blue-600 to-blue-600
            text-[14px] font-extrabold text-white
            shadow-lg shadow-blue-600/20
            transition-all duration-200
            hover:-translate-y-0.5 hover:from-blue-700 hover:to-blue-700
            hover:shadow-xl active:scale-[0.98]
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-blue-600 focus-visible:ring-offset-2
          "
        >
          Save & Continue
          <Check size={18} />
        </button>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[11px] text-blue-400">
          <CircleCheck size={13} className="text-blue-500" />
          Your answer will be saved automatically.
        </p>
      </div>
    </Desktop_ProfileBottomSheet>
  )
}

export default Desktop_ProfileCompletionPopup
