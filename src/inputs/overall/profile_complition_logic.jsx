import {
  PROFILE_FIELDS,
  GENDER_OPTIONS,
  LANGUAGE_PROFICIENCY,
  MARITAL_STATUS,
  FIELD_WORK_OPTIONS,
} from './Profile_Data'


export const PROFILE_COMPLETION_FIELDS = [

  {
    rank: 1,
    field: PROFILE_FIELDS.NAME,
    section: 'main',
    question: 'What is your name?',
    type: 'text',
    placeholder: 'Enter your full name',
    required: true,
  },

  {
    rank: 2,
    field: PROFILE_FIELDS.PHONE_NO,
    section: 'main',
    question: 'What is your phone number?',
    type: 'tel',
    placeholder: 'Enter your phone number',
    required: true,
  },

  {
    rank: 3,
    field: PROFILE_FIELDS.CURRENT_LOCATION,
    section: 'main',
    question: 'Where are you currently located?',
    type: 'text',
    placeholder: 'Enter your current location',
    required: true,
  },

  {
    rank: 4,
    field: PROFILE_FIELDS.GENDER,
    section: 'main',
    question: 'What is your gender?',
    type: 'select',
    options: GENDER_OPTIONS,
    required: true,
  },

  {
    rank: 5,
    field: PROFILE_FIELDS.JOB_ROLE,
    section: 'main',
    question: 'What is your current designation?',
    type: 'text',
    placeholder: 'Enter your designation',
    required: true,
  },

  {
    rank: 6,
    field: PROFILE_FIELDS.EXPECTED_SALARY,
    section: 'career',
    question: 'What is your expected salary?',
    type: 'text',
    placeholder: 'Enter expected salary',
    required: true,
  },

  {
    rank: 7,
    field: PROFILE_FIELDS.LANGUAGES,
    section: 'language',
    question: 'Which languages do you know?',
    type: 'languages',
    proficiencyOptions: LANGUAGE_PROFICIENCY,
    required: true,
  },

  {
    rank: 8,
    field: PROFILE_FIELDS.TOTAL_EXPERIENCE,
    section: 'experience',
    question: 'How much total work experience do you have?',
    type: 'text',
    placeholder: 'Example: 2 years',
    required: true,
  },

  {
    rank: 9,
    field: PROFILE_FIELDS.PREFERRED_JOB_LOCATION,
    section: 'career',
    question: 'Where do you prefer to work?',
    type: 'text',
    placeholder: 'Enter preferred job location',
    required: true,
  },

  {
    rank: 10,
    field: PROFILE_FIELDS.PREFERRED_DESIGNATION,
    section: 'career',
    question: 'Which designation are you looking for?',
    type: 'text',
    placeholder: 'Enter preferred designation',
    required: true,
  },

  {
    rank: 11,
    field: PROFILE_FIELDS.FIELD_WORK,
    section: 'career',
    question: 'Are you comfortable with field work?',
    type: 'select',
    options: FIELD_WORK_OPTIONS,
    required: true,
  },

  // ==========================================================
  // EXPERIENCE 1
  // ==========================================================

  {
    rank: 12,
    field: PROFILE_FIELDS.EXPERIENCE_1,
    section: 'experience',
    question: 'Tell us about your first work experience.',
    type: 'experience',
    required: true,
  },

  // ==========================================================
  // DEGREE
  // ==========================================================

  {
    rank: 13,
    field: PROFILE_FIELDS.DEGREE,
    section: 'education',
    question: 'Tell us about your degree.',
    type: 'education',
    educationType: 'degree',
    required: true,
  },

  {
    rank: 14,
    field: PROFILE_FIELDS.DATE_OF_BIRTH,
    section: 'personal',
    question: 'What is your date of birth?',
    type: 'date',
    placeholder: 'Select your date of birth',
    required: true,
  },

  {
    rank: 15,
    field: PROFILE_FIELDS.MARITAL_STATUS,
    section: 'personal',
    question: 'What is your marital status?',
    type: 'select',
    options: MARITAL_STATUS,
    required: true,
  },

  {
    rank: 16,
    field: PROFILE_FIELDS.MOTHER_LANGUAGE,
    section: 'language',
    question: 'What is your mother language?',
    type: 'text',
    placeholder: 'Enter your mother language',
    required: true,
  },

  {
    rank: 17,
    field: PROFILE_FIELDS.PREFERRED_INDUSTRY,
    section: 'career',
    question: 'Which industry do you prefer?',
    type: 'text',
    placeholder: 'Enter preferred industry',
    required: true,
  },

  {
    rank: 18,
    field: PROFILE_FIELDS.EMAIL_ID,
    section: 'personal',
    question: 'What is your email address?',
    type: 'email',
    placeholder: 'Enter your email address',
    required: true,
  },

  // ==========================================================
  // 10TH
  // ==========================================================

  {
    rank: 19,
    field: PROFILE_FIELDS.TENTH,
    section: 'education',
    question: 'Tell us about your 10th education.',
    type: 'education',
    educationType: 'tenth',
    required: true,
  },

  // ==========================================================
  // PUC
  // ==========================================================

  {
    rank: 20,
    field: PROFILE_FIELDS.PUC,
    section: 'education',
    question: 'Tell us about your PUC education.',
    type: 'education',
    educationType: 'puc',
    required: false,
  },

  // ==========================================================
  // DIPLOMA
  // ==========================================================

  {
    rank: 21,
    field: PROFILE_FIELDS.DIPLOMA,
    section: 'education',
    question: 'Tell us about your diploma.',
    type: 'education',
    educationType: 'diploma',
    required: false,
  },

  // ==========================================================
  // MASTERS
  // ==========================================================

  {
    rank: 22,
    field: PROFILE_FIELDS.MASTERS,
    section: 'education',
    question: 'Tell us about your masters education.',
    type: 'education',
    educationType: 'masters',
    required: false,
  },

]