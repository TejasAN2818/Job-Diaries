// ============================================================
// PROFILE COMPLETION PERCENTAGE
// ============================================================
//
// Central calculation for overall profile completion.
//
// This file:
// 1. Checks filled profile fields
// 2. Calculates overall profile completion percentage
//
// It does NOT:
// - Save profile data
// - Modify profile data
// - Calculate individual section percentages
//
// ============================================================


// ============================================================
// CHECK VALUE
// ============================================================

const isFilled = (value) => {

  // Empty values
  if (
    value === undefined ||
    value === null ||
    value === ''
  ) {
    return false
  }


  // Array
  if (Array.isArray(value)) {
    return value.length > 0
  }


  // Object
  if (
    typeof value === 'object'
  ) {

    return Object.values(value).some(
      fieldValue =>
        isFilled(fieldValue)
    )

  }


  // Normal value
  return String(value).trim() !== ''

}


// ============================================================
// MAIN DETAILS
// ============================================================

const MAIN_FIELDS = [
  'name',
  'phoneNo',
  'jobRole',
  'currentLocation',
  'gender',
]


// ============================================================
// PERSONAL DETAILS
// ============================================================

const PERSONAL_FIELDS = [
  'dateOfBirth',
  'maritalStatus',
  'emailId',
]


// ============================================================
// CAREER PREFERENCE
// ============================================================

const CAREER_FIELDS = [
  'expectedSalary',
  'preferredJobLocation',
  'preferredIndustry',
  'preferredDesignation',
  'fieldWork',
]


// ============================================================
// LANGUAGE PREFERENCE
// ============================================================

const LANGUAGE_FIELDS = [
  'motherLanguage',
  'languages',
]


// ============================================================
// EXPERIENCE
// ============================================================

const EXPERIENCE_GROUPS = [
  'experience1',
  'experience2',
  'experience3',
]


const EXPERIENCE_FIELDS = [
  'designation',
  'industry',
  'salary',
  'years',
  'companyName',
]


// ============================================================
// EDUCATION
// ============================================================

const EDUCATION_GROUPS = [
  'tenth',
  'puc',
  'diploma',
  'degree',
  'masters',
]


const EDUCATION_FIELDS = {

  tenth: [
    'qualification',
    'passoutYear',
    'marks',
    'collegeLocation',
  ],

  puc: [
    'pucName',
    'passoutYear',
    'marks',
    'collegeLocation',
  ],

  diploma: [
    'diplomaName',
    'passoutYear',
    'marks',
    'collegeLocation',
  ],

  degree: [
    'degreeName',
    'passoutYear',
    'marks',
    'collegeLocation',
  ],

  masters: [
    'mastersName',
    'passoutYear',
    'marks',
    'collegeLocation',
  ],

}


// ============================================================
// CALCULATE OVERALL PROFILE COMPLETION
// ============================================================

export const getProfileCompletionPercentage = (
  profileData
) => {

  let totalFields = 0

  let completedFields = 0


  // ==========================================================
  // MAIN DETAILS
  // ==========================================================

  MAIN_FIELDS.forEach(
    field => {

      totalFields += 1

      if (
        isFilled(
          profileData?.[field]
        )
      ) {

        completedFields += 1

      }

    }
  )


  // ==========================================================
  // PERSONAL DETAILS
  // ==========================================================

  PERSONAL_FIELDS.forEach(
    field => {

      totalFields += 1

      if (
        isFilled(
          profileData?.[field]
        )
      ) {

        completedFields += 1

      }

    }
  )


  // ==========================================================
  // CAREER PREFERENCE
  // ==========================================================

  CAREER_FIELDS.forEach(
    field => {

      totalFields += 1

      if (
        isFilled(
          profileData?.[field]
        )
      ) {

        completedFields += 1

      }

    }
  )


  // ==========================================================
  // LANGUAGE PREFERENCE
  // ==========================================================

  LANGUAGE_FIELDS.forEach(
    field => {

      totalFields += 1

      if (
        isFilled(
          profileData?.[field]
        )
      ) {

        completedFields += 1

      }

    }
  )


  // ==========================================================
  // TOTAL EXPERIENCE
  // ==========================================================

  totalFields += 1

  if (
    isFilled(
      profileData?.totalExperience
    )
  ) {

    completedFields += 1

  }


  // ==========================================================
  // EXPERIENCE 1 / 2 / 3
  // ==========================================================

  EXPERIENCE_GROUPS.forEach(
    group => {

      EXPERIENCE_FIELDS.forEach(
        field => {

          totalFields += 1

          if (
            isFilled(
              profileData?.[group]?.[field]
            )
          ) {

            completedFields += 1

          }

        }
      )

    }
  )


  // ==========================================================
  // EDUCATION
  // ==========================================================

  EDUCATION_GROUPS.forEach(
    group => {

      const fields =
        EDUCATION_FIELDS[group] || []


      fields.forEach(
        field => {

          totalFields += 1

          if (
            isFilled(
              profileData?.[group]?.[field]
            )
          ) {

            completedFields += 1

          }

        }
      )

    }
  )


  // ==========================================================
  // FINAL PERCENTAGE
  // ==========================================================

  if (!totalFields) {
    return 0
  }


  return Math.round(
    (
      completedFields /
      totalFields
    ) * 100
  )

}


// ============================================================
// DEFAULT EXPORT
// ============================================================

export default getProfileCompletionPercentage