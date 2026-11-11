import React from 'react'
import Desktop_ProfileBottomSheet from './Desktop_ProfileBottomSheet'

import {
  FIELD_WORK_OPTIONS,
} from '../../../../inputs/overall/Profile_Data'


function Desktop_CareerPreference({
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

    <Desktop_ProfileBottomSheet
      title="Career preference"
      onClose={onClose}
      onSave={onClose}
    >

      <div className="space-y-6">

        {/* =================================================
            EXPECTED SALARY
        ================================================= */}

        <div>

          <label className="profile-label">
            What salary are you looking for?
          </label>

          <input
            type="number"
            min="0"
            value={
              profileData?.expectedSalary || ''
            }
            onChange={(e) =>
              handleChange(
                'expectedSalary',
                e.target.value
              )
            }
            className="profile-input"
            placeholder="Expected salary"
            inputMode="numeric"
          />

        </div>


        {/* =================================================
            PREFERRED LOCATION
        ================================================= */}

        <div>

          <label className="profile-label">
            Which location are you looking for?
          </label>

          <input
            type="text"
            value={
              profileData?.preferredJobLocation || ''
            }
            onChange={(e) =>
              handleChange(
                'preferredJobLocation',
                e.target.value
              )
            }
            className="profile-input"
            placeholder="Preferred location"
          />

        </div>


        {/* =================================================
            PREFERRED INDUSTRY
        ================================================= */}

        <div>

          <label className="profile-label">
            What industry are you looking for?
          </label>

          <input
            type="text"
            value={
              profileData?.preferredIndustry || ''
            }
            onChange={(e) =>
              handleChange(
                'preferredIndustry',
                e.target.value
              )
            }
            className="profile-input"
            placeholder="Preferred industry"
          />

        </div>


        {/* =================================================
            PREFERRED DESIGNATION
        ================================================= */}

        <div>

          <label className="profile-label">
            What designation are you looking for?
          </label>

          <input
            type="text"
            value={
              profileData?.preferredDesignation || ''
            }
            onChange={(e) =>
              handleChange(
                'preferredDesignation',
                e.target.value
              )
            }
            className="profile-input"
            placeholder="Preferred designation"
          />

        </div>


        {/* =================================================
            FIELD WORK
        ================================================= */}

        <div>

          <label className="profile-label">
            Are you okay with field work?
          </label>

          <select
            value={
              profileData?.fieldWork || ''
            }
            onChange={(e) =>
              handleChange(
                'fieldWork',
                e.target.value
              )
            }
            className="profile-input"
          >

            <option value="">
              Select
            </option>

            {FIELD_WORK_OPTIONS.map(option => (

              <option
                key={option}
                value={option}
              >
                {option}
              </option>

            ))}

          </select>

        </div>


        {/* =================================================
            INFORMATION NOTE
        ================================================= */}

        <div
          className="
            mt-3
            rounded-2xl
            border
            border-[#C8DCF7]
            bg-[#E4EFFF]
            px-5
            py-4
          "
        >

          <div
            className="
              flex
              items-start
              gap-3
            "
          >

            <div
              className="
                w-[30px]
                h-[30px]
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
                  text-[13px]
                  font-bold
                  text-blue-900
                "
              >
                i
              </span>

            </div>


            <p
              className="
                text-[12px]
                leading-[18px]
                text-blue-700
              "
            >
              Add your job preferences so we
              can understand the type of
              opportunities you are looking for.
            </p>

          </div>

        </div>

      </div>

    </Desktop_ProfileBottomSheet>
  )
}


export default Desktop_CareerPreference