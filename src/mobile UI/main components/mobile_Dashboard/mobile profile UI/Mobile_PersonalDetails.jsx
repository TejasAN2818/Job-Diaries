import React from 'react'
import Mobile_ProfileBottomSheet from './Mobile_ProfileBottomSheet'

import {
  MARITAL_STATUS,
  GENDER_OPTIONS,
} from '../../../../inputs/overall/Profile_Data'


function Mobile_PersonalDetails({
  profileData,
  setProfileData,
  onClose,
}) {

  // =====================================================
  // HANDLE FIELD CHANGE
  // =====================================================

  const handleChange = (field, value) => {

    setProfileData(prev => ({
      ...prev,

      [field]: value,
    }))
  }


  // =====================================================
  // RETURN
  // =====================================================

  return (

    <Mobile_ProfileBottomSheet
      title="Personal details"
      onClose={onClose}
      onSave={onClose}
    >

      <div className="space-y-4">

        {/* =================================================
            NAME
        ================================================= */}

        <div>

          <label className="profile-label">
            Name
          </label>

          <input
            type="text"
            value={
              profileData?.name || ''
            }
            onChange={(e) =>
              handleChange(
                'name',
                e.target.value
              )
            }
            className="profile-input"
            placeholder="Enter name"
            autoComplete="name"
          />

        </div>


        {/* =================================================
            DATE OF BIRTH
        ================================================= */}

        <div>

          <label className="profile-label">
            Date of birth
          </label>

          <input
            type="date"
            value={
              profileData?.dateOfBirth || ''
            }
            onChange={(e) =>
              handleChange(
                'dateOfBirth',
                e.target.value
              )
            }
            className="profile-input"
          />

        </div>


        {/* =================================================
            MARITAL STATUS
        ================================================= */}

        <div>

          <label className="profile-label">
            Marital status
          </label>

          <select
            value={
              profileData?.maritalStatus || ''
            }
            onChange={(e) =>
              handleChange(
                'maritalStatus',
                e.target.value
              )
            }
            className="profile-input"
          >

            <option value="">
              Select marital status
            </option>

            {MARITAL_STATUS.map(status => (

              <option
                key={status}
                value={status}
              >
                {status}
              </option>

            ))}

          </select>

        </div>


        {/* =================================================
            PHONE NUMBER
        ================================================= */}

        <div>

          <label className="profile-label">
            Phone no
          </label>

          <input
            type="tel"
            value={
              profileData?.phoneNo || ''
            }
            onChange={(e) =>
              handleChange(
                'phoneNo',
                e.target.value
              )
            }
            className="profile-input"
            placeholder="Enter phone number"
            inputMode="numeric"
            autoComplete="tel"
          />

        </div>


        {/* =================================================
            GENDER
        ================================================= */}

        <div>

          <label className="profile-label">
            Gender
          </label>

          <select
            value={
              profileData?.gender || ''
            }
            onChange={(e) =>
              handleChange(
                'gender',
                e.target.value
              )
            }
            className="profile-input"
          >

            <option value="">
              Select gender
            </option>

            {GENDER_OPTIONS.map(gender => (

              <option
                key={gender}
                value={gender}
              >
                {gender}
              </option>

            ))}

          </select>

        </div>


        {/* =================================================
            EMAIL
        ================================================= */}

        <div>

          <label className="profile-label">
            Mail ID
          </label>

          <input
            type="email"
            value={
              profileData?.emailId || ''
            }
            onChange={(e) =>
              handleChange(
                'emailId',
                e.target.value
              )
            }
            className="profile-input"
            placeholder="Enter email"
            autoComplete="email"
            inputMode="email"
          />

        </div>


        {/* =================================================
            INFORMATION NOTE
        ================================================= */}

        <div
          className="
            mt-2
            rounded-2xl
            border
            border-[#C8DCF7]
            bg-[#E4EFFF]
            px-4
            py-3
          "
        >

          <div
            className="
              flex
              items-start
              gap-2
            "
          >

            <div
              className="
                w-[24px]
                h-[24px]
                rounded-full
                bg-[#2462AC]
                flex
                items-center
                justify-center
                shrink-0
              "
            >

              <span
                className="
                  text-[11px]
                  font-bold
                  text-blue-900
                "
              >
                i
              </span>

            </div>


            <p
              className="
                text-[10px]
                leading-[16px]
                text-blue-700
              "
            >
              Keep your personal details
              accurate so employers can
              contact you easily.
            </p>

          </div>

        </div>

      </div>

    </Mobile_ProfileBottomSheet>
  )
}


export default Mobile_PersonalDetails