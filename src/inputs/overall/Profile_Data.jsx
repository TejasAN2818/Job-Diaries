// ============================================================
// PROFILE DATA
// ============================================================
// Central profile configuration.
//
// This file contains:
// 1. Initial profile data
// 2. Profile field names
// 3. Education types
// 4. Helper functions
//
// ============================================================


// ============================================================
// EMPTY EXPERIENCE OBJECT
// ============================================================

export const EMPTY_EXPERIENCE = {
  designation: '',
  industry: '',
  salary: '',
  years: '',
  companyName: '',
}


// ============================================================
// EMPTY EDUCATION OBJECTS
// ============================================================

export const EMPTY_TENTH = {
  qualification: '10th',
  passoutYear: '',
  marks: '',
  collegeLocation: '',
}


export const EMPTY_PUC = {
  pucName: '',
  passoutYear: '',
  marks: '',
  collegeLocation: '',
}


export const EMPTY_DIPLOMA = {
  diplomaName: '',
  passoutYear: '',
  marks: '',
  collegeLocation: '',
}


export const EMPTY_DEGREE = {
  degreeName: '',
  passoutYear: '',
  marks: '',
  collegeLocation: '',
}


export const EMPTY_MASTERS = {
  mastersName: '',
  passoutYear: '',
  marks: '',
  collegeLocation: '',
}


// ============================================================
// INITIAL PROFILE DATA
// ============================================================

export const INITIAL_PROFILE_DATA = {

  // ==========================================================
  // MAIN DETAILS
  // ==========================================================

  name: '',

  phoneNo: '',

  jobRole: '',

  currentLocation: '',

  gender: '',


  // ==========================================================
  // PERSONAL DETAILS
  // ==========================================================

  dateOfBirth: '',

  maritalStatus: '',

  emailId: '',


  // ==========================================================
  // CAREER PREFERENCE
  // ==========================================================

  expectedSalary: '',

  preferredJobLocation: '',

  preferredIndustry: '',

  preferredDesignation: '',

  fieldWork: '',


  // ==========================================================
  // LANGUAGE PREFERENCE
  // ==========================================================

  motherLanguage: '',

  languages: [],


  // ==========================================================
  // WORK EXPERIENCE
  // ==========================================================

  totalExperience: '',

  experience1: {
    ...EMPTY_EXPERIENCE,
  },

  experience2: {
    ...EMPTY_EXPERIENCE,
  },

  experience3: {
    ...EMPTY_EXPERIENCE,
  },


  // ==========================================================
  // EDUCATION
  // ==========================================================

  tenth: {
    ...EMPTY_TENTH,
  },

  puc: {
    ...EMPTY_PUC,
  },

  diploma: {
    ...EMPTY_DIPLOMA,
  },

  degree: {
    ...EMPTY_DEGREE,
  },

  masters: {
    ...EMPTY_MASTERS,
  },

}


// ============================================================
// CREATE NEW PROFILE DATA
// ============================================================
// Always use this when creating a new profile.
//
// ============================================================

export const createProfileData = () => ({

  // ==========================================================
  // MAIN DETAILS
  // ==========================================================

  name: '',
  phoneNo: '',
  jobRole: '',
  currentLocation: '',
  gender: '',


  // ==========================================================
  // PERSONAL DETAILS
  // ==========================================================

  dateOfBirth: '',
  maritalStatus: '',
  emailId: '',


  // ==========================================================
  // CAREER PREFERENCE
  // ==========================================================

  expectedSalary: '',
  preferredJobLocation: '',
  preferredIndustry: '',
  preferredDesignation: '',
  fieldWork: '',


  // ==========================================================
  // LANGUAGE
  // ==========================================================

  motherLanguage: '',
  languages: [],


  // ==========================================================
  // WORK EXPERIENCE
  // ==========================================================

  totalExperience: '',

  experience1: {
    ...EMPTY_EXPERIENCE,
  },

  experience2: {
    ...EMPTY_EXPERIENCE,
  },

  experience3: {
    ...EMPTY_EXPERIENCE,
  },


  // ==========================================================
  // EDUCATION
  // ==========================================================

  tenth: {
    ...EMPTY_TENTH,
  },

  puc: {
    ...EMPTY_PUC,
  },

  diploma: {
    ...EMPTY_DIPLOMA,
  },

  degree: {
    ...EMPTY_DEGREE,
  },

  masters: {
    ...EMPTY_MASTERS,
  },

})


// ============================================================
// PROFILE FIELD NAMES
// ============================================================

export const PROFILE_FIELDS = {

  // Main
  NAME: 'name',
  PHONE_NO: 'phoneNo',
  JOB_ROLE: 'jobRole',
  CURRENT_LOCATION: 'currentLocation',
  GENDER: 'gender',

  // Personal
  DATE_OF_BIRTH: 'dateOfBirth',
  MARITAL_STATUS: 'maritalStatus',
  EMAIL_ID: 'emailId',

  // Career
  EXPECTED_SALARY: 'expectedSalary',
  PREFERRED_JOB_LOCATION: 'preferredJobLocation',
  PREFERRED_INDUSTRY: 'preferredIndustry',
  PREFERRED_DESIGNATION: 'preferredDesignation',
  FIELD_WORK: 'fieldWork',

  // Language
  MOTHER_LANGUAGE: 'motherLanguage',
  LANGUAGES: 'languages',

  // Experience
  TOTAL_EXPERIENCE: 'totalExperience',
  EXPERIENCE_1: 'experience1',
  EXPERIENCE_2: 'experience2',
  EXPERIENCE_3: 'experience3',

  // Education
  TENTH: 'tenth',
  PUC: 'puc',
  DIPLOMA: 'diploma',
  DEGREE: 'degree',
  MASTERS: 'masters',

}


// ============================================================
// EDUCATION TYPES
// ============================================================

export const EDUCATION_TYPES = [

  {
    key: 'tenth',
    title: '10th',
    nameField: 'qualification',
    placeholder: 'Enter qualification',
    icon: '10',
  },

  {
    key: 'puc',
    title: 'PUC',
    nameField: 'pucName',
    placeholder: 'Enter PUC name',
    icon: 'PUC',
  },

  {
    key: 'diploma',
    title: 'Diploma',
    nameField: 'diplomaName',
    placeholder: 'Enter diploma name',
    icon: 'D',
  },

  {
    key: 'degree',
    title: 'Degree',
    nameField: 'degreeName',
    placeholder: 'Enter degree name',
    icon: 'DG',
  },

  {
    key: 'masters',
    title: 'Masters',
    nameField: 'mastersName',
    placeholder: 'Enter masters name',
    icon: 'M',
  },

]


// ============================================================
// LANGUAGE PROFICIENCY
// ============================================================

export const LANGUAGE_PROFICIENCY = [
  'Fluent',
  'Manageable',
  'Understand',
]


// ============================================================
// MARITAL STATUS
// ============================================================

export const MARITAL_STATUS = [
  'Single',
  'Married',
  'Divorced',
  'Widowed',
]


// ============================================================
// GENDER OPTIONS
// ============================================================

export const GENDER_OPTIONS = [
  'Male',
  'Female',
  'Other',
]


// ============================================================
// FIELD WORK OPTIONS
// ============================================================

export const FIELD_WORK_OPTIONS = [
  'Yes',
  'No',
]


// ============================================================
// PROFILE SECTION NAMES
// ============================================================

export const PROFILE_SECTIONS = {

  MAIN: 'main',

  PERSONAL: 'personal',

  CAREER: 'career',

  LANGUAGE: 'language',

  EXPERIENCE: 'experience',

  EDUCATION: 'education',

}


// ============================================================
// PROFILE SECTION LABELS
// ============================================================

export const PROFILE_SECTION_LABELS = {

  main: 'Main details',

  personal: 'Personal details',

  career: 'Career preference',

  language: 'Language preference',

  experience: 'Work experience',

  education: 'Education',

}