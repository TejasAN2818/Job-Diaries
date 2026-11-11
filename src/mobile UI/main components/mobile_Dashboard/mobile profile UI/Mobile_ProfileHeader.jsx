
import React, {
  useEffect,
  useState,
} from 'react'

import {
  getProfileCompletionPercentage,
} from '../../../../inputs/overall/Profile_Completion_Percentage'


function Mobile_ProfileHeader({

  profileData = {},

  setProfileData,

  onBack,

  onEdit,

}) {


  // =================================================
  // PROFILE COMPLETION %
  // =================================================

  const profileCompletion =
    getProfileCompletionPercentage(
      profileData
    )


  // =================================================
  // ANIMATED PROFILE COMPLETION
  // =================================================

  const [
    animatedCompletion,
    setAnimatedCompletion,
  ] = useState(0)


  useEffect(() => {

    const timer = setTimeout(() => {

      setAnimatedCompletion(
        profileCompletion
      )

    }, 150)

    return () => {
      clearTimeout(timer)
    }

  }, [
    profileCompletion,
  ])


  // =================================================
  // CIRCULAR PROGRESS
  // =================================================

  const circleSize = 96

  const circleRadius = 42

  const circumference =
    2 * Math.PI * circleRadius

  const progressOffset =
    circumference -
    (
      animatedCompletion / 100
    ) * circumference


  // =================================================
  // EDIT POPUP STATE
  // =================================================

  const [
    showEditPopup,
    setShowEditPopup,
  ] = useState(false)


  const [
    editData,
    setEditData,
  ] = useState({

    name:
      profileData.name || '',

    phoneNo:
      profileData.phoneNo || '',

    currentLocation:
      profileData.currentLocation || '',

    jobRole:
      profileData.jobRole || '',

    gender:
      profileData.gender || '',

  })


  // =================================================
  // OPEN EDIT POPUP
  // =================================================

  const handleEdit = () => {

    setEditData({

      name:
        profileData.name || '',

      phoneNo:
        profileData.phoneNo || '',

      currentLocation:
        profileData.currentLocation || '',

      jobRole:
        profileData.jobRole || '',

      gender:
        profileData.gender || '',

    })


    setShowEditPopup(true)


    if (
      typeof onEdit === 'function'
    ) {
      onEdit()
    }

  }


  // =================================================
  // INPUT CHANGE
  // =================================================

  const handleChange = (
    field,
    value
  ) => {

    setEditData(prev => ({

      ...prev,

      [field]: value,

    }))

  }


  // =================================================
  // SAVE
  // =================================================

  const handleSave = () => {

    if (
      typeof setProfileData === 'function'
    ) {

      setProfileData(prev => ({

        ...prev,

        name:
          editData.name,

        phoneNo:
          editData.phoneNo,

        currentLocation:
          editData.currentLocation,

        jobRole:
          editData.jobRole,

        gender:
          editData.gender,

      }))

    }


    setShowEditPopup(false)

  }


  return (

    <header className="w-full">


      {/* =================================================
          STICKY BACK BUTTON
      ================================================= */}

      <button
        type="button"
        onClick={onBack}
        className="
          fixed
          left-3
          top-3
          z-[250]
          inline-flex
          items-center
          justify-center
          h-[36px]
          px-[15px]
          rounded-full
          border
          border-white/70
          bg-gradient-to-r
          from-[#397BC8]
          to-[#2462AC]
          text-white
          text-[13px]
          font-semibold
          leading-none
          shadow-lg
          shadow-blue-900/20
          ring-1
          ring-blue-900/5
          backdrop-blur-sm
          active:scale-95
          hover:shadow-xl
          transition-all
          duration-200
        "
      >

        <span
          className="
            mr-[6px]
            text-[17px]
            leading-none
            font-bold
          "
        >
          &larr;
        </span>

        Back

      </button>


      {/* =================================================
          PROFILE INFORMATION
      ================================================= */}

      <div
        className="
          mt-[40px]
          flex
          items-center
          px-[14px]
        "
      >


        {/* =================================================
            PROFILE PHOTO + COMPLETION RING
        ================================================= */}

        <div
          className="
            relative
            w-[100px]
            h-[112px]
            shrink-0
            flex
            items-start
            justify-center
          "
        >


          {/* =================================================
              COMPLETION RING
          ================================================= */}

          <svg
            width={circleSize}
            height={circleSize}
            viewBox="0 0 96 96"
            className="
              absolute
              top-0
              left-1/2
              -translate-x-1/2
              rotate-90
            "
          >

            <circle
              cx="48"
              cy="48"
              r={circleRadius}
              fill="none"
              stroke="#C8DCF7"
              strokeWidth="3"
            />


            <circle
              cx="48"
              cy="48"
              r={circleRadius}
              fill="none"
              stroke="#2474CC"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={progressOffset}
              className="
                transition-all
                duration-[1800ms]
                ease-out
              "
            />

          </svg>


          {/* =================================================
              PROFILE PHOTO
          ================================================= */}

          <div
            className="
              absolute
              top-[7px]
              left-1/2
              -translate-x-1/2
              w-[86px]
              h-[86px]
              rounded-full
              bg-[#C8DCF7]
              flex
              items-center
              justify-center
              overflow-hidden
            "
          >

            <div
              className="
                absolute
                top-[16px]
                left-1/2
                -translate-x-1/2
                w-[25px]
                h-[25px]
                rounded-full
                bg-white
              "
            />


            <div
              className="
                absolute
                bottom-[9px]
                left-1/2
                -translate-x-1/2
                w-[52px]
                h-[31px]
                rounded-t-full
                bg-white
              "
            />

          </div>


          {/* =================================================
              COMPLETION %
          ================================================= */}

          <div
            className="
              absolute
              top-[88px]
              left-1/2
              -translate-x-1/2
              px-1
              bg-white
              text-[#3511ff]
              text-[13px]
              leading-[17px]
              font-bold
              whitespace-nowrap
              z-10
            "
          >
            {animatedCompletion}%
          </div>

        </div>


        {/* =================================================
            DETAILS
        ================================================= */}

        <div
          className="
            ml-[16px]
            min-w-0
            flex-1
          "
        >

          <h1
            className="
              truncate
              text-[21px]
              leading-[22px]
              font-bold
              text-blue-900
            "
          >
            {profileData.name || 'Your Name'}
          </h1>


          <p
            className="
              mt-[1px]
              truncate
              text-[17px]
              leading-[19px]
              font-medium
              text-blue-900
            "
          >
            {profileData.phoneNo || 'Phone Number'}
          </p>


          <div
            className="
              mt-[5px]
              flex
              items-center
              min-w-0
            "
          >

            <span
              className="
                shrink-0
                text-[10px]
                leading-[12px]
                text-blue-800
              "
            >
              Designation:
            </span>

            <span
              className="
                ml-[7px]
                truncate
                text-[10px]
                leading-[12px]
                text-blue-900
              "
            >
              {profileData.jobRole || 'Not added'}
            </span>

          </div>


          <div
            className="
              mt-[3px]
              flex
              items-center
              min-w-0
            "
          >

            <span
              className="
                shrink-0
                text-[10px]
                leading-[12px]
                text-blue-800
              "
            >
              Location:
            </span>

            <span
              className="
                ml-[7px]
                truncate
                text-[10px]
                leading-[12px]
                text-blue-900
              "
            >
              {profileData.currentLocation || 'Not added'}
            </span>

          </div>

        </div>


        {/* =================================================
            ATTRACTIVE EDIT BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={handleEdit}
          aria-label="Edit profile"
          title="Edit profile"
          className="
            ml-[8px]
            shrink-0
            w-[40px]
            h-[40px]
            rounded-full
            border
            border-white/80
            bg-gradient-to-br
            from-[#397BC8]
            via-[#397BC8]
            to-[#2462AC]
            flex
            items-center
            justify-center
            text-white
            shadow-md
            shadow-blue-600/25
            ring-2
            ring-blue-100
            hover:shadow-lg
            hover:shadow-blue-600/30
            active:scale-90
            active:rotate-[-4deg]
            transition-all
            duration-200
          "
        >

          <svg
            viewBox="0 0 32 32"
            className="w-[23px] h-[23px] drop-shadow-sm"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >

            <rect
              x="4"
              y="7"
              width="18"
              height="19"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.8"
            />

            <path
              d="M8 12H18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            <path
              d="M8 16H15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            <path
              d="M8 20H13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            <path
              d="
                M18.5 22.5
                L20 17.8
                L26.2 11.6
                L29 14.4
                L22.8 20.6
                L18.5 22.5Z
              "
              fill="white"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />

            <path
              d="M24.8 13L27.6 15.8"
              stroke="currentColor"
              strokeWidth="1.5"
            />

          </svg>

        </button>

      </div>


      {/* =================================================
          EDIT PROFILE POPUP
      ================================================= */}

      {showEditPopup && (

        <div
          className="
            fixed
            inset-0
            z-[300]
            flex
            items-end
            justify-center
            bg-blue-900/40
            px-[10px]
            pb-[10px]
          "
        >

          <div
            className="
              w-full
              max-w-[500px]
              rounded-[24px]
              bg-white
              shadow-2xl
              overflow-hidden
              animate-profile-slide-up
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
                px-[18px]
                py-[15px]
                border-b
                border-blue-100
              "
            >

              <div>

                <h2
                  className="
                    text-[18px]
                    font-bold
                    text-blue-900
                  "
                >
                  Edit Profile
                </h2>

                <p
                  className="
                    mt-[2px]
                    text-[11px]
                    text-blue-700
                  "
                >
                  Update your basic information
                </p>

              </div>


              <button
                type="button"
                onClick={() =>
                  setShowEditPopup(false)
                }
                className="
                  w-[32px]
                  h-[32px]
                  rounded-full
                  bg-blue-100
                  flex
                  items-center
                  justify-center
                  text-blue-800
                  text-[18px]
                  active:scale-90
                  transition-transform
                "
              >
                ×
              </button>

            </div>


            {/* FORM */}

            <div
              className="
                max-h-[65vh]
                overflow-y-auto
                px-[18px]
                py-[16px]
              "
            >

              <div className="mb-[13px]">

                <label
                  className="
                    block
                    mb-[5px]
                    text-[12px]
                    font-semibold
                    text-blue-800
                  "
                >
                  Name
                </label>

                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) =>
                    handleChange(
                      'name',
                      e.target.value
                    )
                  }
                  placeholder="Enter your name"
                  className="
                    w-full
                    h-[43px]
                    rounded-[11px]
                    border
                    border-blue-200
                    bg-blue-50
                    px-[12px]
                    text-[13px]
                    text-blue-900
                    outline-none
                    focus:border-[#C8DCF7]
                    focus:bg-white
                  "
                />

              </div>


              <div className="mb-[13px]">

                <label
                  className="
                    block
                    mb-[5px]
                    text-[12px]
                    font-semibold
                    text-blue-800
                  "
                >
                  Phone Number
                </label>

                <input
                  type="tel"
                  value={editData.phoneNo}
                  onChange={(e) =>
                    handleChange(
                      'phoneNo',
                      e.target.value
                    )
                  }
                  placeholder="Enter phone number"
                  className="
                    w-full
                    h-[43px]
                    rounded-[11px]
                    border
                    border-blue-200
                    bg-blue-50
                    px-[12px]
                    text-[13px]
                    text-blue-900
                    outline-none
                    focus:border-[#C8DCF7]
                    focus:bg-white
                  "
                />

              </div>


              <div className="mb-[13px]">

                <label
                  className="
                    block
                    mb-[5px]
                    text-[12px]
                    font-semibold
                    text-blue-800
                  "
                >
                  Location
                </label>

                <input
                  type="text"
                  value={editData.currentLocation}
                  onChange={(e) =>
                    handleChange(
                      'currentLocation',
                      e.target.value
                    )
                  }
                  placeholder="Enter current location"
                  className="
                    w-full
                    h-[43px]
                    rounded-[11px]
                    border
                    border-blue-200
                    bg-blue-50
                    px-[12px]
                    text-[13px]
                    text-blue-900
                    outline-none
                    focus:border-[#C8DCF7]
                    focus:bg-white
                  "
                />

              </div>


              <div className="mb-[13px]">

                <label
                  className="
                    block
                    mb-[5px]
                    text-[12px]
                    font-semibold
                    text-blue-800
                  "
                >
                  Designation
                </label>

                <input
                  type="text"
                  value={editData.jobRole}
                  onChange={(e) =>
                    handleChange(
                      'jobRole',
                      e.target.value
                    )
                  }
                  placeholder="Enter designation"
                  className="
                    w-full
                    h-[43px]
                    rounded-[11px]
                    border
                    border-blue-200
                    bg-blue-50
                    px-[12px]
                    text-[13px]
                    text-blue-900
                    outline-none
                    focus:border-[#C8DCF7]
                    focus:bg-white
                  "
                />

              </div>


              <div className="mb-[5px]">

                <label
                  className="
                    block
                    mb-[7px]
                    text-[12px]
                    font-semibold
                    text-blue-800
                  "
                >
                  Gender
                </label>

                <div
                  className="
                    grid
                    grid-cols-3
                    gap-[8px]
                  "
                >

                  {[
                    'Male',
                    'Female',
                    'Other',
                  ].map((gender) => (

                    <button
                      key={gender}
                      type="button"
                      onClick={() =>
                        handleChange(
                          'gender',
                          gender
                        )
                      }
                      className={`
                        h-[40px]
                        rounded-[10px]
                        border
                        text-[12px]
                        font-medium
                        transition-all
                        ${
                          editData.gender === gender
                            ? 'border-[#C8DCF7] bg-[#2462AC] text-blue-900'
                            : 'border-blue-200 bg-blue-50 text-blue-700'
                        }
                      `}
                    >
                      {gender}
                    </button>

                  ))}

                </div>

              </div>

            </div>


            {/* SAVE BUTTON */}

            <div
              className="
                px-[18px]
                pb-[18px]
                pt-[8px]
                bg-white
                border-t
                border-blue-100
              "
            >

              <button
                type="button"
                onClick={handleSave}
                className="
                  w-full
                  h-[45px]
                  rounded-[12px]
                  bg-[#2462AC]
                  text-blue-900
                  text-[14px]
                  font-bold
                  active:scale-[0.98]
                  transition-transform
                "
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>

      )}

    </header>

  )
}

export default Mobile_ProfileHeader
