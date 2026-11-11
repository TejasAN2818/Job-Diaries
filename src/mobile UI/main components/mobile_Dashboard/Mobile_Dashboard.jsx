import React, {
  useEffect,
  useRef,
  useState,
} from 'react'

import Mobile_Header
  from './Mobile_Header'

import Mobile_Post_Free_Job
  from './Mobile_Post_Free_Job'

import Mobile_Filter
  from './Mobile_Filter'

import Mobile_JobList
  from './Mobile_JobList'

import Mobile_Sidebar
  from './Mobile_Sidebar/Mobile_Sidebar'

import Mobile_Sidebar_Home
  from './Mobile_Sidebar/Mobile_Sidebar_Home'

import Mobile_Profile_Dashboard
  from './mobile profile UI/Mobile_Profile_Dashboard'

import Mobile_JobDetails
  from './Mobile_JobDetails'

import Job_Data
  from '../../../inputs/overall/Job_Data'

import Mobile_Bottom_Navigation
  from './Mobile_Bottom_Navigation'

import Mobile_Sidebar_Privacy_Policy
  from './Mobile_Sidebar/Mobile_Sidebar_Privacy_Policy'

import Mobile_Sidebar_Contact_Us
  from './Mobile_Sidebar/Mobile_Sidebar_Contact_Us'

import Mobile_Sidebar_About
  from './Mobile_Sidebar/Mobile_Sidebar_About'

import Mobile_Sidebar_Developer_Details
  from './Mobile_Sidebar/Mobile_Sidebar_Developer_Details'

import Mobile_Login_check
  from './Mobile_Login_check'

import {
  getProfileData,
} from '../../../inputs/overall/Profile_Storage'

import {
  autoSyncProfileToGoogleSheet,
  syncProfileToGoogleSheet,
  sendJobApplicationToGoogleSheet,
} from '../../../inputs/overall/Google_Sheet_Action'

import WEBSITE_CONFIG from '../../../inputs/overall/Website_Config'


function Mobile_Dashboard() {


  // ============================================================
  // SIDEBAR
  // ============================================================

  const [sidebarOpen, setSidebarOpen] =
    useState(false)


  // ============================================================
  // PROFILE
  // ============================================================

  const [showProfile, setShowProfile] =
    useState(false)


  // ============================================================
  // HOME
  // ============================================================

  const [showHome, setShowHome] =
    useState(false)


  // ============================================================
  // SELECTED JOB
  // ============================================================

  const [selectedJob, setSelectedJob] =
    useState(null)


    const [pendingApplicationJob, setPendingApplicationJob] =
  useState(null)


  // ============================================================
  // OTHER PAGES
  // ============================================================

  const [showPrivacyPolicy, setShowPrivacyPolicy] =
    useState(false)

  const [showContactUs, setShowContactUs] =
    useState(false)

  const [showAbout, setShowAbout] =
    useState(false)

  const [showDeveloperDetails, setShowDeveloperDetails] =
    useState(false)


  // ============================================================
  // INITIAL LOGIN CHECK
  // ============================================================

  const [showLoginCheck, setShowLoginCheck] =
    useState(false)

  // ============================================================
  // post job
  // ============================================================


  const [showPostFreeJob, setShowPostFreeJob] =
    useState(false)


  // ============================================================
  // GOOGLE SHEET SYNC GUARD
  // ============================================================
  //
  // Prevents the automatic profile sync from being
  // started more than once during this dashboard
  // initialization.
  //
  // This is especially important when React StrictMode
  // runs effects more than once during development.
  //
  // ============================================================

  const profileSyncStarted =
    useRef(false)


  // ============================================================
  // INITIAL PROFILE CHECK
  // ============================================================

  useEffect(() => {

    // ----------------------------------------------------------
    // PREVENT DUPLICATE INITIAL SYNC
    // ----------------------------------------------------------

    if (profileSyncStarted.current) {
      return
    }

    profileSyncStarted.current = true


    // ----------------------------------------------------------
    // GET PROFILE
    // ----------------------------------------------------------

    const profileData =
      getProfileData()


    // ----------------------------------------------------------
    // CHECK REQUIRED PROFILE FIELDS
    // ----------------------------------------------------------

    const hasName =
      String(
        profileData?.name || ''
      ).trim() !== ''


    const hasPhone =
      String(
        profileData?.phoneNo || ''
      ).trim() !== ''


    const hasLocation =
      String(
        profileData?.currentLocation || ''
      ).trim() !== ''


    // ==========================================================
    // FIRST VISIT
    // ==========================================================

    if (
      !hasName ||
      !hasPhone ||
      !hasLocation
    ) {

      setShowLoginCheck(true)

      return
    }


    // ==========================================================
    // EXISTING PROFILE
    // ==========================================================
    //
    // Profile already exists.
    //
    // Do NOT show login form.
    //
    // Automatically synchronize the saved profile
    // with Google Sheet.
    //
    // The useRef above guarantees this automatic
    // synchronization starts only once.
    //
    // ==========================================================

    setShowLoginCheck(false)


    autoSyncProfileToGoogleSheet(
      getProfileData
    )
      .then((result) => {

        if (
          result?.success
        ) {

          console.log(
            'Saved profile automatically synchronized with Google Sheet.'
          )

        } else if (
          !result?.skipped
        ) {

          console.error(
            'Automatic Google Sheet profile sync failed:',
            result?.error
          )

        }

      })
      .catch((error) => {

        console.error(
          'Automatic Google Sheet profile sync error:',
          error
        )

      })


  }, [])


  // ============================================================
  // FILTER STATE
  // ============================================================

  const [selectedFilters, setSelectedFilters] =
    useState({

      datePosted: 'All',

      location: 'All',

      salary: 'All',

      workMode: 'All',

      employmentType: 'All',

      shift: 'All',

      category: 'All',

      experience: 'All',

      gender: 'All',

    })


  // ============================================================
  // HOME MENU
  // ============================================================

  const handleHomeMenuClick = () => {

    setShowHome(false)

    setSidebarOpen(true)

  }


  // ============================================================
  // LOGIN CHECK COMPLETE
  // ============================================================
  //
  // Mobile_Login_check:
  //
  // 1. Saves profile to Local Storage
  // 2. Passes updatedProfile here
  //
  // Dashboard:
  //
  // 3. Sends updatedProfile to Google Sheet
  // 4. Closes login form
  //
  // ============================================================



  const submitJobApplication = async (
  job,
  profileData = getProfileData()
) => {
  if (!job) return

  const applicationData = {
    profile: profileData,
    job: job,
    companyId: job.companyId || '',
    jobJd: job.jobJd || '',
    websiteName: WEBSITE_CONFIG.website.name,
  }

  console.log(
    'Application data sent from React to Google Sheet:',
    applicationData
  )

  try {
    const result =
      await sendJobApplicationToGoogleSheet(applicationData)

    if (result?.success) {
      console.log('Job application submitted successfully.')
    } else {
      console.error(
        'Job application submission failed:',
        result?.error
      )
    }
  } catch (error) {
    console.error('Job application error:', error)
  }
}

const handleApplyClick = async (job) => {
  const profileData = getProfileData()

  const hasName =
    String(profileData?.name || '').trim() !== ''

  const hasPhone =
    String(profileData?.phoneNo || '').trim() !== ''

  const hasLocation =
    String(profileData?.currentLocation || '').trim() !== ''

  if (!hasName || !hasPhone || !hasLocation) {
    setPendingApplicationJob(job)
    setShowLoginCheck(true)
    return
  }

  await submitJobApplication(job, profileData)
}

  const handleLoginCheckComplete = async (
    updatedProfile
  ) => {

    setShowLoginCheck(false)


    if (!updatedProfile) {

      return
    }


    try {

      const result =
        await syncProfileToGoogleSheet(
          updatedProfile
        )


      if (
        result?.success
      ) {

        console.log(
          'Profile successfully synchronized with Google Sheet.'
        )

      } else {

        console.error(
          'Profile Google Sheet synchronization failed:',
          result?.error
        )

      }

    } catch (error) {

      console.error(
        'Profile Google Sheet synchronization error:',
        error
      )

    }

    const jobToApply = pendingApplicationJob

if (jobToApply) {
  setPendingApplicationJob(null)

  await submitJobApplication(
    jobToApply,
    updatedProfile
  )
}

  }


  // ============================================================
  // SHOW HOME PAGE
  // ============================================================

  if (showHome) {

    return (

      <div className="min-h-screen bg-gradient-to-b from-[#F4F8FF] to-[#DCEBFF]">

        <Mobile_Sidebar_Home

          onMenuClick={
            handleHomeMenuClick
          }


          onJobsClick={() => {

            setShowHome(false)

            setShowProfile(false)

            setSelectedJob(null)

          }}


          onProfileClick={() => {

            setShowHome(false)

            setShowProfile(true)

            setSelectedJob(null)

          }}

        />


        {showLoginCheck && (

          <Mobile_Login_check

            onComplete={
              handleLoginCheckComplete
            }

          />

        )}

      </div>

    )
  }


  // ============================================================
  // SHOW PRIVACY POLICY PAGE
  // ============================================================

  if (showPrivacyPolicy) {

    return (

      <div className="min-h-screen bg-gradient-to-b from-[#F4F8FF] to-[#DCEBFF]">

        <Mobile_Sidebar_Privacy_Policy

          onMenuClick={() => {

            setShowPrivacyPolicy(false)

            setSidebarOpen(true)

          }}


          onHomeClick={() => {

            setShowPrivacyPolicy(false)

            setShowHome(true)

            setShowProfile(false)

            setSelectedJob(null)

          }}


          onJobsClick={() => {

            setShowPrivacyPolicy(false)

            setShowHome(false)

            setShowProfile(false)

            setSelectedJob(null)

          }}


          onProfileClick={() => {

            setShowPrivacyPolicy(false)

            setShowHome(false)

            setShowProfile(true)

            setSelectedJob(null)

          }}

        />


        {showLoginCheck && (

          <Mobile_Login_check

            onComplete={
              handleLoginCheckComplete
            }

          />

        )}

      </div>

    )
  }


  // ============================================================
  // SHOW CONTACT US PAGE
  // ============================================================

  if (showContactUs) {

    return (

      <div className="min-h-screen bg-gradient-to-b from-[#F4F8FF] to-[#DCEBFF]">

        <Mobile_Sidebar_Contact_Us

          onMenuClick={() => {

            setShowContactUs(false)

            setSidebarOpen(true)

          }}


          onHomeClick={() => {

            setShowContactUs(false)

            setShowHome(true)

            setShowProfile(false)

            setSelectedJob(null)

          }}


          onJobsClick={() => {

            setShowContactUs(false)

            setShowHome(false)

            setShowProfile(false)

            setSelectedJob(null)

          }}


          onProfileClick={() => {

            setShowContactUs(false)

            setShowHome(false)

            setShowProfile(true)

            setSelectedJob(null)

          }}

        />


        {showLoginCheck && (

          <Mobile_Login_check

            onComplete={
              handleLoginCheckComplete
            }

          />

        )}

      </div>

    )
  }


  // ============================================================
  // SHOW ABOUT PAGE
  // ============================================================

  if (showAbout) {

    return (

      <div className="min-h-screen bg-gradient-to-b from-[#F4F8FF] to-[#DCEBFF]">

        <Mobile_Sidebar_About

          onMenuClick={() => {

            setShowAbout(false)

            setSidebarOpen(true)

          }}


          onHomeClick={() => {

            setShowAbout(false)

            setShowHome(true)

            setShowProfile(false)

            setSelectedJob(null)

          }}


          onJobsClick={() => {

            setShowAbout(false)

            setShowHome(false)

            setShowProfile(false)

            setSelectedJob(null)

          }}


          onProfileClick={() => {

            setShowAbout(false)
            setShowHome(false)

            setShowProfile(true)

            setSelectedJob(null)

          }}

        />


        {showLoginCheck && (

          <Mobile_Login_check

            onComplete={
              handleLoginCheckComplete
            }

          />

        )}

      </div>

    )
  }


  // ============================================================
  // SHOW DEVELOPER DETAILS PAGE
  // ============================================================

  if (showDeveloperDetails) {

    return (

      <div className="min-h-screen bg-gradient-to-b from-[#F4F8FF] to-[#DCEBFF]">

        <Mobile_Sidebar_Developer_Details

          onMenuClick={() => {

            setShowDeveloperDetails(false)

            setSidebarOpen(true)

          }}


          onHomeClick={() => {

            setShowDeveloperDetails(false)

            setShowHome(true)

            setShowProfile(false)

            setSelectedJob(null)

          }}


          onJobsClick={() => {

            setShowDeveloperDetails(false)

            setShowHome(false)

            setShowProfile(false)

            setSelectedJob(null)

          }}


          onProfileClick={() => {

            setShowDeveloperDetails(false)

            setShowHome(false)

            setShowProfile(true)

            setSelectedJob(null)

          }}

        />


        {showLoginCheck && (

          <Mobile_Login_check

            onComplete={
              handleLoginCheckComplete
            }

          />

        )}

      </div>

    )
  }


  // ============================================================
  // SHOW PROFILE PAGE
  // ============================================================

  if (showProfile) {

    return (

      <div className="min-h-screen bg-gradient-to-b from-[#F4F8FF] to-[#DCEBFF]">

        <Mobile_Profile_Dashboard

          onBack={() =>
            setShowProfile(false)
          }

        />


        {showLoginCheck && (

          <Mobile_Login_check

            onComplete={
              handleLoginCheckComplete
            }

          />

        )}

      </div>

    )
  }


  // ============================================================
  // JOB DETAILS PAGE
  // ============================================================

  if (selectedJob) {

    return (

      <div className="min-h-screen bg-gradient-to-b from-[#F4F8FF] to-[#DCEBFF]">
<Mobile_JobDetails
  job={selectedJob}
  onBack={() =>
    setSelectedJob(null)
  }
  onApply={handleApplyClick}
/>


        {showLoginCheck && (

          <Mobile_Login_check

            onComplete={
              handleLoginCheckComplete
            }

          />

        )}

      </div>

    )
  }

  // ============================================================
  // SHOW POST FREE JOB PAGE
  // ============================================================

  if (showPostFreeJob) {

    return (

      <div className="min-h-screen bg-gradient-to-b from-[#F4F8FF] to-[#DCEBFF]">

        <Mobile_Post_Free_Job

          onBack={() => {
            setShowPostFreeJob(false)
          }}

          onMenuClick={() => {
            setShowPostFreeJob(false)
            setSidebarOpen(true)
          }}

        />

      </div>

    )
  }


  // ============================================================
  // MAIN DASHBOARD
  // ============================================================

  return (

    <div className="min-h-screen bg-gradient-to-b from-[#F4F8FF] to-[#DCEBFF]">


      {/* ====================================================== */}
      {/* HEADER */}
      {/* ====================================================== */}

      <Mobile_Header
  onMenuClick={() =>
    setSidebarOpen(true)
  }

  onPostJobClick={() => {
    setSidebarOpen(false)
    setShowHome(false)
    setShowProfile(false)
    setShowPrivacyPolicy(false)
    setShowContactUs(false)
    setShowAbout(false)
    setShowDeveloperDetails(false)
    setSelectedJob(null)
    setShowPostFreeJob(true)
  }}

  onProfileClick={() => {
    setSidebarOpen(false)
    setShowHome(false)
    setShowProfile(true)
    setShowPrivacyPolicy(false)
    setShowContactUs(false)
    setShowAbout(false)
    setShowDeveloperDetails(false)
    setSelectedJob(null)
    setShowPostFreeJob(false)
  }}
/>

      {/* ====================================================== */}
      {/* SIDEBAR */}
      {/* ====================================================== */}

      <Mobile_Sidebar

        isOpen={sidebarOpen}

        onClose={() =>
          setSidebarOpen(false)
        }


        onPrivacyPolicyClick={() => {

          setSidebarOpen(false)

          setShowHome(false)

          setShowProfile(false)

          setShowPrivacyPolicy(true)

          setShowContactUs(false)

          setShowAbout(false)

          setShowDeveloperDetails(false)

          setSelectedJob(null)

        }}


        onContactUsClick={() => {

          setSidebarOpen(false)

          setShowHome(false)

          setShowProfile(false)

          setShowPrivacyPolicy(false)

          setShowContactUs(true)

          setShowAbout(false)

          setShowDeveloperDetails(false)

          setSelectedJob(null)

        }}


        onAboutClick={() => {

          setSidebarOpen(false)

          setShowHome(false)

          setShowProfile(false)

          setShowPrivacyPolicy(false)

          setShowContactUs(false)

          setShowAbout(true)

          setShowDeveloperDetails(false)

          setSelectedJob(null)

        }}


        onDeveloperDetailsClick={() => {

          setSidebarOpen(false)

          setShowHome(false)

          setShowProfile(false)

          setShowPrivacyPolicy(false)

          setShowContactUs(false)

          setShowAbout(false)

          setShowDeveloperDetails(true)

          setSelectedJob(null)

        }}


        onProfileClick={() => {

          setSidebarOpen(false)

          setShowHome(false)

          setShowProfile(true)

          setSelectedJob(null)

        }}


        onHomeClick={() => {

          setSidebarOpen(false)

          setShowHome(true)

          setShowProfile(false)

          setSelectedJob(null)

        }}


        onJobsClick={() => {

          setSidebarOpen(false)

          setShowHome(false)

          setShowProfile(false)

          setSelectedJob(null)

        }}

      />


      {/* ====================================================== */}
      {/* FILTERS */}
      {/* ====================================================== */}

      <Mobile_Filter

        selectedFilters={
          selectedFilters
        }

        setSelectedFilters={
          setSelectedFilters
        }

      />


      {/* ====================================================== */}
      {/* JOB LIST */}
      {/* ====================================================== */}

      <main className="px-5 py-2">

     <Mobile_JobList
  jobs={Job_Data}
  selectedFilters={selectedFilters}
  onJobClick={(job) =>
    setSelectedJob(job)
  }
  onApply={handleApplyClick}
  onCompleteProfile={() => {
    setSidebarOpen(false)
    setShowHome(false)
    setShowProfile(true)
    setSelectedJob(null)
  }}
/>

      </main>


      {/* ====================================================== */}
      {/* LOGIN CHECK */}
      {/* ====================================================== */}

      {showLoginCheck && (

        <Mobile_Login_check

          onComplete={
            handleLoginCheckComplete
          }

        />

      )}

    </div>

  )
}


export default Mobile_Dashboard