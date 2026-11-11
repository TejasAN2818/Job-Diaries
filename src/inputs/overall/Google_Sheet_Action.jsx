
// ============================================================
// GOOGLE SHEET ACTION
// ============================================================
//
// Central Google Sheet configuration.
//
// This file contains:
// 1. Google Apps Script URL
// 2. Send data to Google Sheet
// 3. Profile validation
// 4. Profile synchronization
// 5. Automatic profile synchronization
// 6. Job application synchronization
// 7. Job post synchronization
//
// ============================================================


// ============================================================
// GOOGLE APPS SCRIPT URL
// ============================================================


import WEBSITE_CONFIG from './Website_Config'

export const GOOGLE_SHEET_API_URL =
  'https://script.google.com/macros/s/AKfycbyGZ4_2w5pm4__7ZnLwAndDx6hUmjUp9HnjC_nQcKTc5wJ1dfoj08TtwYEgE6a4xikd_Q/exec'


// ============================================================
// SEND DATA TO GOOGLE SHEET
// ============================================================

export const sendToGoogleSheet = async (data) => {
  try {
    if (
      !GOOGLE_SHEET_API_URL ||
      GOOGLE_SHEET_API_URL ===
      'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL'
    ) {
      throw new Error(
        'Google Apps Script URL is not configured.'
      )
    }

    console.log(
      'Data sent from React to Google Sheet:',
      data
    )

    const response = await fetch(
      GOOGLE_SHEET_API_URL,
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'text/plain;charset=utf-8',
        },

        body: JSON.stringify(data),
      }
    )

    if (!response.ok) {
      throw new Error(
        `Google Sheet request failed: ${response.status}`
      )
    }

    const result = await response.text()

    console.log(
      'Google Sheet response:',
      result
    )

    return {
      success: true,
      data: result,
    }

  } catch (error) {
    console.error(
      'Failed to send data to Google Sheet:',
      error
    )

    return {
      success: false,
      error: error.message,
    }
  }
}


// ============================================================
// CHECK PROFILE FOR GOOGLE SHEET
// ============================================================
//
// Required fields:
// - Name
// - Phone number
// - Current location
//
// ============================================================

export const isProfileReadyForGoogleSheet = (
  profileData
) => {
  if (!profileData) {
    return false
  }

  const name =
    String(
      profileData?.name || ''
    ).trim()

  const phoneNo =
    String(
      profileData?.phoneNo || ''
    ).trim()

  const currentLocation =
    String(
      profileData?.currentLocation || ''
    ).trim()

  return (
    name !== '' &&
    phoneNo !== '' &&
    currentLocation !== ''
  )
}


// ============================================================
// SYNC PROFILE TO GOOGLE SHEET
// ============================================================
//
// Sends the COMPLETE profile.
//
// Google Apps Script uses phoneNo as the unique identifier.
//
// Existing phone:
//     UPDATE existing row
//
// New phone:
//     CREATE new row
//
// ============================================================

export const syncProfileToGoogleSheet = async (
  profileData
) => {
  if (
    !isProfileReadyForGoogleSheet(profileData)
  ) {
    return {
      success: false,
      error: 'Profile is missing required details.',
    }
  }

  return sendToGoogleSheet({
    action: 'profile_sync',
    profile: profileData,
    websiteName: WEBSITE_CONFIG.website.name,
  })
}


// ============================================================
// AUTOMATIC PROFILE SYNC
// ============================================================
//
// Reads the saved Local Storage profile and sends
// the complete profile to Google Sheet.
//
// This should be called when the website opens.
//
// ============================================================

export const autoSyncProfileToGoogleSheet = async (
  getProfileData
) => {
  try {
    const profileData =
      getProfileData()

    if (
      !isProfileReadyForGoogleSheet(
        profileData
      )
    ) {
      return {
        success: false,
        skipped: true,
        error:
          'Profile is not complete.',
      }
    }

    return await syncProfileToGoogleSheet(
      profileData
    )

  } catch (error) {
    console.error(
      'Automatic profile sync failed:',
      error
    )

    return {
      success: false,
      error: error.message,
    }
  }
}


// ============================================================
// SEND JOB APPLICATION
// ============================================================
//
// Additional application fields:
// - companyId
// - jobJd
// - websiteName
//
// Existing application data is preserved.
//
// ============================================================


export const sendJobApplicationToGoogleSheet = async (
  applicationData
) => {
  const {
    companyId,
    jobJd,
    ...remainingData
  } = applicationData || {}

  const payload = {
    action: 'job_application',

    ...remainingData,

    // Always read the name from Website_Config.jsx
    websiteName: WEBSITE_CONFIG.website.name,

    companyId: companyId || '',

    jobJd: jobJd || '',
  }

  console.log(
    'Job application payload:',
    payload
  )

  return sendToGoogleSheet(payload)
}



// ============================================================
// SEND JOB POST
// ============================================================

export const sendJobPostToGoogleSheet = async (
  jobData
) => {
  return sendToGoogleSheet({
    action: 'job_post',
    ...jobData,
  })
}
