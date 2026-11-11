import React, {
  useMemo,
} from 'react'


import Desktop_JobCard
  from './Desktop_JobCard'


import Desktop_JobProfileCompletionCard
  from './Desktop_JobProfileCompletionCard'


import {
  getProfileData,
} from '../../../inputs/overall/Profile_Storage'


import {
  PROFILE_COMPLETION_FIELDS,
} from '../../../inputs/overall/profile_complition_logic'



function Desktop_JobList({

  jobs = [],

  selectedFilters = {},

  onJobClick,

  onCompleteProfile,
    onApply,

}) {


  // =====================================================
  // FILTER JOBS
  // =====================================================

  const filteredJobs = useMemo(() => {

    return jobs.filter((job) => {


      // =================================================
      // DATE POSTED
      // =================================================

      let dateMatch = true

      const dateFilter =
        selectedFilters.datePosted || 'All'


      if (
        dateFilter !== 'All'
      ) {

        const postedDate =
          job.postedDate?.toLowerCase() || ''


        if (
          dateFilter ===
          'Last 24 hours'
        ) {

          dateMatch =
            postedDate === 'today' ||
            postedDate === '1 day ago'

        }


        else if (
          dateFilter ===
          'Last 3 days'
        ) {

          dateMatch =
            postedDate === 'today' ||
            postedDate === '1 day ago' ||
            postedDate === '2 days ago' ||
            postedDate === '3 days ago'

        }


        else if (
          dateFilter ===
          'Last 7 days'
        ) {

          dateMatch =
            postedDate === 'today' ||
            postedDate === '1 day ago' ||
            postedDate === '2 days ago' ||
            postedDate === '3 days ago' ||
            postedDate === '4 days ago' ||
            postedDate === '5 days ago' ||
            postedDate === '6 days ago' ||
            postedDate === '7 days ago'

        }

      }


      // =================================================
      // LOCATION
      // =================================================

      let locationMatch = true

      const locationFilter =
        selectedFilters.location || 'All'


      if (
        locationFilter !== 'All'
      ) {

        locationMatch =
          job.location?.toLowerCase() ===
          locationFilter.toLowerCase()

      }


      // =================================================
      // SALARY
      // =================================================

      let salaryMatch = true

      const salaryFilter =
        selectedFilters.salary || 'All'


      if (
        salaryFilter !== 'All'
      ) {

        const salaryNumbers =
          (job.salary || '')
            .replace(/,/g, '')
            .match(/\d+/g)
            ?.map(Number) || []


        const minSalary =
          salaryNumbers[0] || 0


        const maxSalary =
          salaryNumbers[1] ||
          minSalary


        if (
          salaryFilter ===
          'Below ₹15,000'
        ) {

          salaryMatch =
            minSalary < 15000

        }


        else if (
          salaryFilter ===
          '₹15,000 - ₹25,000'
        ) {

          salaryMatch =
            minSalary <= 25000 &&
            maxSalary >= 15000

        }


        else if (
          salaryFilter ===
          '₹25,000 - ₹40,000'
        ) {

          salaryMatch =
            minSalary <= 40000 &&
            maxSalary >= 25000

        }


        else if (
          salaryFilter ===
          'Above ₹40,000'
        ) {

          salaryMatch =
            maxSalary > 40000

        }

      }


      // =================================================
      // WORK MODE
      // =================================================

      let workModeMatch = true

      const workModeFilter =
        selectedFilters.workMode || 'All'


      if (
        workModeFilter !== 'All'
      ) {

        workModeMatch =
          job.workMode?.toLowerCase() ===
          workModeFilter.toLowerCase()

      }


      // =================================================
      // EMPLOYMENT TYPE
      // =================================================

      let employmentTypeMatch = true

      const employmentTypeFilter =
        selectedFilters.employmentType ||
        'All'


      if (
        employmentTypeFilter !== 'All'
      ) {

        employmentTypeMatch =
          job.employmentType?.toLowerCase() ===
          employmentTypeFilter.toLowerCase()

      }


      // =================================================
      // SHIFT
      // =================================================

      let shiftMatch = true

      const shiftFilter =
        selectedFilters.shift || 'All'


      if (
        shiftFilter !== 'All'
      ) {

        shiftMatch =
          job.sfift?.toLowerCase() ===
          shiftFilter.toLowerCase()

      }


      // =================================================
      // CATEGORY / DEPARTMENT
      // =================================================

      let categoryMatch = true

      const categoryFilter =
        selectedFilters.category || 'All'


      if (
        categoryFilter !== 'All'
      ) {

        categoryMatch =
          job.category?.toLowerCase() ===
          categoryFilter.toLowerCase()

      }


      // =================================================
      // EXPERIENCE
      // =================================================

      let experienceMatch = true

      const experienceFilter =
        selectedFilters.experience || 'All'


      if (
        experienceFilter !== 'All'
      ) {

        experienceMatch =
          job.workExperience?.toLowerCase() ===
          experienceFilter.toLowerCase()

      }


      // =================================================
      // GENDER
      // =================================================

      let genderMatch = true

      const genderFilter =
        selectedFilters.gender || 'All'


      if (
        genderFilter !== 'All'
      ) {

        genderMatch =
          job.gender?.toLowerCase() ===
          genderFilter.toLowerCase()

      }


      // =================================================
      // FINAL RESULT
      // =================================================

      return (

        dateMatch &&

        locationMatch &&

        salaryMatch &&

        workModeMatch &&

        employmentTypeMatch &&

        shiftMatch &&

        categoryMatch &&

        experienceMatch &&

        genderMatch

      )

    })

  }, [
    jobs,
    selectedFilters,
  ])



  // =====================================================
  // PROFILE QUESTIONS
  // =====================================================

  const profileQuestions = useMemo(() => {

    const profileData =
      getProfileData()


    const rankedFields = [

      ...PROFILE_COMPLETION_FIELDS,

    ].sort(

      (a, b) =>
        a.rank - b.rank

    )


    const isCompletionItemCompleted = (
      item
    ) => {

      if (!item) {
        return false
      }


      const value =
        profileData?.[item.field]


      // =================================================
      // LANGUAGES
      // =================================================

      if (
        item.type === 'languages'
      ) {

        return (

          Array.isArray(value) &&

          value.length > 0

        )

      }


      // =================================================
      // EXPERIENCE / EDUCATION
      // =================================================

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


      // =================================================
      // NORMAL FIELD
      // =================================================

      return (

        value !== undefined &&

        value !== null &&

        String(value).trim() !== ''

      )

    }


    return rankedFields.filter(

      item =>
        !isCompletionItemCompleted(item)

    )

  }, [])



  // =====================================================
  // RETURN
  // =====================================================

  return (

    <div
      className="
        w-full
        h-full
        min-h-0
        overflow-hidden
        pt-4
      "
    >

      {/* =================================================
          JOB LIST
      ================================================= */}

      <div
        className="
          w-full
          h-full
          min-h-0
          overflow-y-auto
          overflow-x-hidden
          overscroll-contain
          space-y-4
          pr-2
          scrollbar-hide
        "
      >

        {filteredJobs.map(
          (job, index) => (

            <React.Fragment
              key={job.id}
            >

              {/* ========================================
                  JOB CARD
              ======================================== */}

             

              <Desktop_JobCard
  job={job}
  onJobClick={onJobClick}
  onApply={onApply}
/>


              {/* ========================================
                  PROFILE COMPLETION CARD

                  SHOW ONLY AFTER JOB 2 AND JOB 5
              ======================================== */}

              {(index + 1 === 2 || index + 1 === 5) && (

                <Desktop_JobProfileCompletionCard

                  question={
                    profileQuestions[
                      index + 1 === 2 ? 0 : 1
                    ]
                  }

                  onGoToProfile={
                    onCompleteProfile
                  }

                />

              )}

            </React.Fragment>

          )

        )}


        {/* ================================================
            NO JOBS
        ================================================= */}

        {filteredJobs.length === 0 && (

          <div
            className="
              py-16
              text-center
              bg-white
              rounded-2xl
              border
              border-blue-100
            "
          >

            <p
              className="
                text-sm
                text-blue-700
              "
            >
              No jobs found
            </p>

          </div>

        )}

      </div>

    </div>

  )

}


export default Desktop_JobList