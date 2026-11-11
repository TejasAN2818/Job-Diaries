import React, {
  useEffect,
  useRef,
  useState,
} from 'react'

import Desktop_Header
  from './Desktop_Header'

import Desktop_Post_Free_Job
  from './Desktop_Post_Free_Job'

import Desktop_Filter
  from './Desktop_Filter'

import Desktop_FilterPanel
  from './Desktop_FilterPanel'

import Desktop_JobList
  from './Desktop_JobList'

import Desktop_Sidebar
  from './Desktop_Sidebar/Desktop_Sidebar'

import Desktop_Sidebar_Home
  from './Desktop_Sidebar/Desktop_Sidebar_Home'

import Desktop_Profile_Dashboard
  from './Desktop profile UI/Desktop_Profile_Dashboard'

import Desktop_Dashboard_Profile_Previous
  from './desktop_dashboard_profile_prviou'

import Desktop_JobDetails
  from './Desktop_JobDetails'

import Job_Data
  from '../../../inputs/overall/Job_Data'

import Desktop_Bottom_Navigation
  from './Desktop_Bottom_Navigation'

import Desktop_Sidebar_Privacy_Policy
  from './Desktop_Sidebar/Desktop_Sidebar_Privacy_Policy'

import Desktop_Sidebar_Contact_Us
  from './Desktop_Sidebar/Desktop_Sidebar_Contact_Us'

import Desktop_Sidebar_About
  from './Desktop_Sidebar/Desktop_Sidebar_About'

import Desktop_Sidebar_Developer_Details
  from './Desktop_Sidebar/Desktop_Sidebar_Developer_Details'

import Desktop_Login_check
  from './Desktop_Login_check'

import {
  getProfileData,
} from '../../../inputs/overall/Profile_Storage'



import {
  autoSyncProfileToGoogleSheet,
  syncProfileToGoogleSheet,
  sendJobApplicationToGoogleSheet,
} from '../../../inputs/overall/Google_Sheet_Action'

import WEBSITE_CONFIG from '../../../inputs/overall/Website_Config'

function Desktop_Dashboard() {
  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false)

  const [
    showProfile,
    setShowProfile,
  ] = useState(false)

  const [
    showHome,
    setShowHome,
  ] = useState(false)

  const [
    selectedJob,
    setSelectedJob,
  ] = useState(null)

  const [
  pendingApplicationJob,
  setPendingApplicationJob,
] = useState(null)

  const [
    showPrivacyPolicy,
    setShowPrivacyPolicy,
  ] = useState(false)

  const [
    showContactUs,
    setShowContactUs,
  ] = useState(false)

  const [
    showAbout,
    setShowAbout,
  ] = useState(false)

  const [
    showDeveloperDetails,
    setShowDeveloperDetails,
  ] = useState(false)

  const [
    showLoginCheck,
    setShowLoginCheck,
  ] = useState(false)

  const [
    showPostFreeJob,
    setShowPostFreeJob,
  ] = useState(false)

  const profileSyncStarted =
    useRef(false)

  useEffect(() => {
    if (profileSyncStarted.current) {
      return
    }

    profileSyncStarted.current = true

    const profileData =
      getProfileData()

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

    if (
      !hasName ||
      !hasPhone ||
      !hasLocation
    ) {
      setShowLoginCheck(true)
      return
    }

    setShowLoginCheck(false)

    autoSyncProfileToGoogleSheet(
      getProfileData
    )
      .then(result => {
        if (result?.success) {
          console.log(
            'Saved profile automatically synchronized with Google Sheet.'
          )
        } else if (!result?.skipped) {
          console.error(
            'Automatic Google Sheet profile sync failed:',
            result?.error
          )
        }
      })
      .catch(error => {
        console.error(
          'Automatic Google Sheet profile sync error:',
          error
        )
      })
  }, [])

  const [
    selectedFilters,
    setSelectedFilters,
  ] = useState({
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

  const uniqueValues = key => {
    return [
      'All',
      ...new Set(
        Job_Data
          .map(
            job => job?.[key]
          )
          .filter(
            value =>
              value !== undefined &&
              value !== null &&
              String(value).trim() !== ''
          )
      ),
    ]
  }

  const filterLocations =
    uniqueValues('location')

  const filterCategories =
    uniqueValues('category')

  const filterWorkModes =
    uniqueValues('workMode')

  const filterEmploymentTypes =
    uniqueValues('employmentType')

  const filterShifts =
    uniqueValues('sfift')

  const filterExperiences =
    uniqueValues('workExperience')

  const filterGenders =
    uniqueValues('gender')

  const handleFilterChange = (
    filterName,
    value
  ) => {
    setSelectedFilters(
      previous => ({
        ...previous,
        [filterName]: value,
      })
    )
  }

  const handleClearFilters = () => {
    setSelectedFilters({
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
  }

  const handleHomeMenuClick = () => {
    setShowHome(false)
    setSidebarOpen(true)
  }

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

      if (result?.success) {
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
  await submitJobApplication(jobToApply, updatedProfile)
}
  }

 const handleHeaderMenuClick = () => {
  // Close Job Details first
  setSelectedJob(null)

  // Then open Sidebar
  setSidebarOpen(true)
}

  const handleHeaderPostJobClick = () => {
    setSidebarOpen(false)
    setShowHome(false)
    setShowProfile(false)
    setShowPrivacyPolicy(false)
    setShowContactUs(false)
    setShowAbout(false)
    setShowDeveloperDetails(false)
    setSelectedJob(null)
    setShowPostFreeJob(true)
  }

  const handleHeaderProfileClick = () => {
    setSidebarOpen(false)
    setShowHome(false)
    setShowProfile(true)
    setShowPrivacyPolicy(false)
    setShowContactUs(false)
    setShowAbout(false)
    setShowDeveloperDetails(false)
    setSelectedJob(null)
    setShowPostFreeJob(false)
  }

  const renderDesktopHeader = () => (
    <Desktop_Header
      onMenuClick={
        handleHeaderMenuClick
      }
      onPostJobClick={
        handleHeaderPostJobClick
      }
      onProfileClick={
        handleHeaderProfileClick
      }
    />
  )

  if (showHome) {
    return (
      <div
        className="
          min-h-screen
          bg-gradient-to-b from-[#F4F8FF] to-[#DCEBFF]
        "
      >
        {renderDesktopHeader()}

        <Desktop_Sidebar_Home
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
          <Desktop_Login_check
            onComplete={
              handleLoginCheckComplete
            }
          />
        )}
      </div>
    )
  }

  if (showPrivacyPolicy) {
    return (
      <div
        className="
          min-h-screen
          bg-gradient-to-b from-[#F4F8FF] to-[#DCEBFF]
        "
      >
        {renderDesktopHeader()}

        <Desktop_Sidebar_Privacy_Policy
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
          <Desktop_Login_check
            onComplete={
              handleLoginCheckComplete
            }
          />
        )}
      </div>
    )
  }

  if (showContactUs) {
    return (
      <div
        className="
          min-h-screen
          bg-gradient-to-b from-[#F4F8FF] to-[#DCEBFF]
        "
      >
        {renderDesktopHeader()}

        <Desktop_Sidebar_Contact_Us
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
          <Desktop_Login_check
            onComplete={
              handleLoginCheckComplete
            }
          />
        )}
      </div>
    )
  }

  if (showAbout) {
    return (
      <div
        className="
          min-h-screen
          bg-gradient-to-b from-[#F4F8FF] to-[#DCEBFF]
        "
      >
        {renderDesktopHeader()}

        <Desktop_Sidebar_About
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
          <Desktop_Login_check
            onComplete={
              handleLoginCheckComplete
            }
          />
        )}
      </div>
    )
  }

  if (showDeveloperDetails) {
    return (
      <div
        className="
          min-h-screen
          bg-gradient-to-b from-[#F4F8FF] to-[#DCEBFF]
        "
      >
        {renderDesktopHeader()}

        <Desktop_Sidebar_Developer_Details
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
          <Desktop_Login_check
            onComplete={
              handleLoginCheckComplete
            }
          />
        )}
      </div>
    )
  }

  
if (showProfile) {
  return (
    <div
      className="
        h-screen
        bg-gradient-to-b from-[#F4F8FF] to-[#DCEBFF]
        flex
        flex-col
        overflow-hidden
      "
    >
      {/* Fixed header area */}
      <div className="shrink-0 z-50">
        {renderDesktopHeader()}
      </div>

      {/* Only the profile content scrolls */}
      <main
        className="
          flex-1
          min-h-0
          overflow-y-auto
          overflow-x-hidden
          overscroll-contain
        "
      >
        <Desktop_Profile_Dashboard
          onBack={() => setShowProfile(false)}
        />
      </main>

      {showLoginCheck && (
        <Desktop_Login_check
          onComplete={handleLoginCheckComplete}
        />
      )}
    </div>
  )
}


  if (selectedJob) {
  return (
    <div
      className="
        h-screen
        bg-gradient-to-b from-[#F4F8FF] to-[#DCEBFF]
        flex
        flex-col
        overflow-hidden
      "
    >

      {/* =================================================
          FIXED HEADER
      ================================================= */}

      <div className="shrink-0 z-50">
        {renderDesktopHeader()}
      </div>


      {/* =================================================
          JOB DETAILS
          ONLY THIS AREA SCROLLS
      ================================================= */}

      <div
        className="
          flex-1
          min-h-0
          overflow-hidden
        "
      >

        <Desktop_JobDetails
          job={selectedJob}
          onBack={() =>
            setSelectedJob(null)
          }

           onApply={handleApplyClick}
        />

      </div>


      {/* =================================================
          LOGIN CHECK
      ================================================= */}

      {showLoginCheck && (
        <Desktop_Login_check
          onComplete={
            handleLoginCheckComplete
          }
        />
      )}

    </div>
  )
}

  if (showPostFreeJob) {
    return (
      <div
        className="
          min-h-screen
          bg-gradient-to-b from-[#F4F8FF] to-[#DCEBFF]
        "
      >
        {renderDesktopHeader()}

        <Desktop_Post_Free_Job
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

  return (
    <div
      className="
        h-screen
        bg-blue-100
        flex
        flex-col
        overflow-hidden
      "
    >
      {renderDesktopHeader()}

      <Desktop_Sidebar
        isOpen={
          sidebarOpen
        }
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

      <Desktop_Filter
        selectedFilters={
          selectedFilters
        }
        setSelectedFilters={
          setSelectedFilters
        }
      />

      <div
        className="
          w-full
          flex-1
          min-h-0
          overflow-hidden
        "
      >
        <div
          className="
            w-[96%]
            max-w-none
            mx-auto
            h-full
            min-h-0
            grid
            grid-cols-[20%_minmax(0,1fr)_20%]
            gap-4
            xl:gap-5
            items-stretch
          "
        >
          <aside
            className="
              w-full
              min-w-0
              sticky
              top-[145px]
              h-[calc(100vh-125px)]
            "
          >
            <Desktop_FilterPanel
              embedded={true}
              selectedFilters={
                selectedFilters
              }
              onFilterChange={
                handleFilterChange
              }
              onClear={
                handleClearFilters
              }
              locations={
                filterLocations
              }
              categories={
                filterCategories
              }
              workModes={
                filterWorkModes
              }
              employmentTypes={
                filterEmploymentTypes
              }
              shifts={
                filterShifts
              }
              experiences={
                filterExperiences
              }
              genders={
                filterGenders
              }
            />
          </aside>

          <main
            className="
              w-full
              min-w-0
              min-h-0
              h-full
              overflow-hidden
            "
          >
          <Desktop_JobList
  jobs={Job_Data}
  selectedFilters={selectedFilters}
  onJobClick={job => {
    setSelectedJob(job)
  }}
  onApply={handleApplyClick}
  onCompleteProfile={() => {
    setSidebarOpen(false)
    setShowHome(false)
    setShowProfile(true)
    setSelectedJob(null)
  }}
/>
          </main>

          <div
            className="
              w-full
              min-w-0
               flex
               pt-5
    flex-col
    justify-start

            "
          >
            <Desktop_Dashboard_Profile_Previous
              onViewProfile={() => {
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
          </div>
        </div>
      </div>

      {showLoginCheck && (
        <Desktop_Login_check
          onComplete={
            handleLoginCheckComplete
          }
        />
      )}
    </div>
  )
}

export default Desktop_Dashboard