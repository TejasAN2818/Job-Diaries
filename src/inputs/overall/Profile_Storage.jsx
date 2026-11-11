// ============================================================
// PROFILE STORAGE
// ============================================================
// Central Local Storage configuration.
//
// This file contains:
// 1. Local Storage key
// 2. Save profile data
// 3. Fetch profile data
// 4. Update profile data
// 5. Clear profile data
//
// Profile structure remains inside Profile_Data.jsx.
// ============================================================

import {
  createProfileData,
} from './Profile_Data'


// ============================================================
// LOCAL STORAGE KEY
// ============================================================

export const PROFILE_STORAGE_KEY =
  'job_search_profile_data'


// ============================================================
// SAVE PROFILE DATA
// ============================================================

export const saveProfileData = (profileData) => {

  try {

    localStorage.setItem(
      PROFILE_STORAGE_KEY,
      JSON.stringify(profileData)
    )

    return true

  } catch (error) {

    console.error(
      'Failed to save profile data:',
      error
    )

    return false
  }
}


// ============================================================
// GET PROFILE DATA
// ============================================================

export const getProfileData = () => {

  try {

    const savedData =
      localStorage.getItem(
        PROFILE_STORAGE_KEY
      )

    // No saved profile
    if (!savedData) {

      return createProfileData()

    }


    const parsedData =
      JSON.parse(savedData)


    // Merge saved data with latest
    // profile structure

    return {
      ...createProfileData(),
      ...parsedData,

      experience1: {
        ...createProfileData().experience1,
        ...(parsedData.experience1 || {}),
      },

      experience2: {
        ...createProfileData().experience2,
        ...(parsedData.experience2 || {}),
      },

      experience3: {
        ...createProfileData().experience3,
        ...(parsedData.experience3 || {}),
      },

      tenth: {
        ...createProfileData().tenth,
        ...(parsedData.tenth || {}),
      },

      puc: {
        ...createProfileData().puc,
        ...(parsedData.puc || {}),
      },

      diploma: {
        ...createProfileData().diploma,
        ...(parsedData.diploma || {}),
      },

      degree: {
        ...createProfileData().degree,
        ...(parsedData.degree || {}),
      },

      masters: {
        ...createProfileData().masters,
        ...(parsedData.masters || {}),
      },

      languages: Array.isArray(parsedData.languages)
        ? parsedData.languages
        : [],
    }

  } catch (error) {

    console.error(
      'Failed to fetch profile data:',
      error
    )

    return createProfileData()
  }
}


// ============================================================
// UPDATE PROFILE DATA
// ============================================================
//
// Updates only the changed fields while preserving
// the existing Local Storage data.
//

export const updateProfileData = (updates) => {

  try {

    const currentData =
      getProfileData()


    const updatedData = {

      ...currentData,

      ...updates,

    }


    saveProfileData(updatedData)


    return updatedData

  } catch (error) {

    console.error(
      'Failed to update profile data:',
      error
    )

    return getProfileData()
  }
}


// ============================================================
// CLEAR PROFILE DATA
// ============================================================

export const clearProfileData = () => {

  try {

    localStorage.removeItem(
      PROFILE_STORAGE_KEY
    )

    return true

  } catch (error) {

    console.error(
      'Failed to clear profile data:',
      error
    )

    return false
  }
}