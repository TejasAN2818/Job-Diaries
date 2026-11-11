
import React, { useState } from 'react'
import Mobile_Header from './Mobile_Header'
import WEBSITE_CONFIG from '../../../inputs/overall/Website_Config'
import {
  sendJobPostToGoogleSheet,
} from '../../../inputs/overall/Post_Job_Google_Sheet_Action'

function Mobile_Post_Free_Job({ onBack, onMenuClick }) {
  const { website } = WEBSITE_CONFIG

  const [formData, setFormData] = useState({
    companyName: '',
    designation: '',
    salary: '',
    location: '',
    vacancy: '',
    contactPersonName: '',
    contactPersonNumber: '',
  })

  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    setError('')
  }

  // PHONE NUMBER
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10)

    setFormData((previous) => ({
      ...previous,
      contactPersonNumber: value,
    }))

    setError('')
  }

  // FORM SUBMISSION
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isSubmitting) return

    const companyName = formData.companyName.trim()
    const designation = formData.designation.trim()
    const salary = formData.salary.trim()
    const location = formData.location.trim()
    const vacancy = String(formData.vacancy).trim()
    const contactPersonName = formData.contactPersonName.trim()
    const contactPersonNumber = formData.contactPersonNumber.trim()

    if (!companyName) {
      setError('Please enter company name.')
      return
    }

    if (!designation) {
      setError('Please enter designation.')
      return
    }

    if (!salary) {
      setError('Please enter salary.')
      return
    }

    if (!location) {
      setError('Please enter job location.')
      return
    }

    if (!vacancy) {
      setError('Please enter number of vacancies.')
      return
    }

    if (Number(vacancy) < 1) {
      setError('Vacancy should be at least 1.')
      return
    }

    if (!contactPersonName) {
      setError('Please enter contact person name.')
      return
    }

    if (!contactPersonNumber) {
      setError('Please enter contact person number.')
      return
    }

    if (!/^[6-9]\d{9}$/.test(contactPersonNumber)) {
      setError('Please enter a valid 10-digit contact number.')
      return
    }

    const jobData = {
      companyName,
      designation,
      salary,
      location,
      vacancy: Number(vacancy),
      contactPersonName,
      contactPersonNumber,
    }

    setIsSubmitting(true)
    setError('')

    sendJobPostToGoogleSheet(jobData)
      .then((result) => {
        if (!result?.success) {
          console.error(
            'Background Google Sheet job post failed:',
            result?.error
          )
        } else {
          console.log('Job post successfully saved to Google Sheet.')
        }
      })
      .catch((error) => {
        console.error(
          'Background Google Sheet job post error:',
          error
        )
      })

    setTimeout(() => {
      setShowSuccess(true)

      setFormData({
        companyName: '',
        designation: '',
        salary: '',
        location: '',
        vacancy: '',
        contactPersonName: '',
        contactPersonNumber: '',
      })

      setIsSubmitting(false)
    }, 1800)
  }

  const inputClass = `
    w-full h-10 rounded-lg border border-blue-200
    bg-blue-50/80 px-3 text-[12px] font-medium
    text-blue-900 placeholder:text-blue-400
    outline-none transition-all duration-200
    hover:border-blue-300
    focus:border-blue-500 focus:bg-white
    focus:ring-2 focus:ring-blue-500/10
  `

  const labelClass = `
    mb-1.5 block text-[11px] font-bold
    tracking-wide text-blue-800
  `

  const fields = [
    {
      name: 'companyName',
      label: 'Company name',
      placeholder: 'Enter your company name',
      type: 'text',
    },
    {
      name: 'designation',
      label: 'Job designation',
      placeholder: 'e.g. Sales Executive',
      type: 'text',
    },
    {
      name: 'salary',
      label: 'Salary offered',
      placeholder: 'e.g. ₹20,000 - ₹30,000',
      type: 'text',
    },
    {
      name: 'location',
      label: 'Job location',
      placeholder: 'e.g. Whitefield, Bengaluru',
      type: 'text',
    },
    {
      name: 'vacancy',
      label: 'Number of openings',
      placeholder: 'e.g. 5',
      type: 'number',
    },
  ]

  // SUCCESS SCREEN
  if (showSuccess) {
    return (
      <div className="fixed inset-0 flex flex-col overflow-hidden bg-[#E4EFFF]">
        <Mobile_Header onMenuClick={onMenuClick} />

        <main className="absolute inset-x-0 bottom-0 top-[58px] overflow-y-auto px-4 py-5">
          <div className="flex min-h-[75vh] items-center justify-center">
            <div className="w-full max-w-md rounded-[22px] border border-blue-100 bg-white p-5 text-center shadow-[0_10px_35px_rgba(15,23,42,0.08)]">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                <svg
                  viewBox="0 0 24 24"
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m5 12 4 4L19 6" />
                </svg>
              </div>

              <p className="mt-4 text-[9px] font-extrabold uppercase tracking-[1.5px] text-green-600">
                Submission complete
              </p>

              <h2 className="mt-2 text-[19px] font-extrabold tracking-tight text-blue-950">
                Job posted successfully!
              </h2>

              <p className="mt-2 text-[12px] leading-5 text-blue-700">
                Thank you for choosing {website.name}. Our team will contact
                you regarding your job posting.
              </p>

              <div className="mt-5 rounded-xl border border-green-100 bg-green-50/70 p-3 text-left">
                <p className="text-[11px] font-bold text-blue-900">
                  What happens next?
                </p>

                <p className="mt-1 text-[11px] leading-5 text-blue-700">
                  Our team will review your job details and contact the
                  person provided.
                </p>
              </div>

              <button
                type="button"
                onClick={onBack}
                className="mt-5 h-10 w-full rounded-xl bg-gradient-to-r from-[#397BC8] to-[#2462AC] text-[12px] font-extrabold text-white shadow-sm transition active:scale-[0.99]"
              >
                ← Back to Jobs
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-[#E4EFFF]">
      <Mobile_Header onMenuClick={onMenuClick} />

      {/* SCROLLABLE FORM AREA */}
      <main className="absolute inset-x-0 bottom-0 top-[58px] overflow-y-auto overscroll-contain px-3 py-3 pb-[245px] sm:px-4">
        <div className="mx-auto w-full max-w-xl">

          {/* BACK BUTTON */}
          <div className="sticky top-0 z-30 mb-3 h-0">
            <button
              type="button"
              onClick={onBack}
              aria-label="Back to jobs"
              className="absolute left-0 top-1 flex h-8 items-center justify-center gap-1.5 rounded-lg border border-blue-400 bg-gradient-to-r from-blue-600 to-blue-500 px-3 text-[11px] font-bold text-white shadow-sm ring-1 ring-blue-100 transition active:scale-95"
            >
              <span className="text-base leading-none">←</span>
              Back
            </button>
          </div>

          {/* COMPACT HERO */}
          <section className="relative mb-4 mt-2 overflow-hidden rounded-[18px] bg-gradient-to-r from-[#E4EFFF] via-[#E4EFFF] to-[#E4EFFF] p-4 shadow-[0_5px_15px_rgba(15,23,42,0.05)]">
            <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full border-[18px] border-white/20" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-900/10 bg-white/70 px-2.5 py-1 text-[8px] font-extrabold uppercase tracking-wider text-blue-900">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                {website.name} Hiring
              </span>

              <h1 className="mt-3 text-[21px] font-black leading-tight tracking-tight text-blue-950">
                Great teams start with
                <span className="block">great hires.</span>
              </h1>

              <p className="mt-2 max-w-sm text-[11px] leading-[18px] text-blue-900/80">
                Share your vacancy details and connect with the right
                candidates. Posting a job is free.
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="rounded-md bg-blue-900 px-2.5 py-1.5 text-[9px] font-bold text-white">
                  ✓ Free job posting
                </span>

                <span className="rounded-md border border-blue-900/10 bg-white/60 px-2.5 py-1.5 text-[9px] font-bold text-blue-900">
                  Simple submission
                </span>
              </div>
            </div>
          </section>

          {/* FORM CARD */}
          <section className="overflow-hidden rounded-[18px] border border-blue-200/80 bg-white shadow-[0_3px_15px_rgba(15,23,42,0.04)]">
            <div className="border-b border-blue-100 px-3 py-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-[18px] w-[18px]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="4" y="7" width="16" height="13" rx="2" />
                    <path d="M9 7V4h6v3M4 12h16M10 12v2h4v-2" />
                  </svg>
                </div>

                <div>
                  <h2 className="text-[13px] font-extrabold text-blue-950">
                    Create your job listing
                  </h2>

                  <p className="mt-0.5 text-[10px] leading-4 text-blue-700">
                    Add the essential details candidates need.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-3">

              {/* JOB INFORMATION */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-100 text-[10px] font-extrabold text-blue-900">
                    1
                  </span>

                  <h3 className="text-[12px] font-extrabold text-blue-900">
                    Job information
                  </h3>
                </div>

                <div className="space-y-3">
                  {fields.map((field) => (
                    <div key={field.name} className="min-w-0">
                      <label htmlFor={field.name} className={labelClass}>
                        {field.label}
                        <span className="ml-1 text-red-500">*</span>
                      </label>

                      <input
                        id={field.name}
                        type={field.type}
                        name={field.name}
                        min={field.type === 'number' ? 1 : undefined}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className={inputClass}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* CONTACT INFORMATION */}
              <div className="mt-5 border-t border-blue-100 pt-4">
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-100 text-[10px] font-extrabold text-blue-900">
                    2
                  </span>

                  <div>
                    <h3 className="text-[12px] font-extrabold text-blue-900">
                      Hiring contact
                    </h3>

                    <p className="mt-0.5 text-[10px] leading-4 text-blue-700">
                      Who should our team contact?
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label htmlFor="contactPersonName" className={labelClass}>
                      Contact person
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <input
                      id="contactPersonName"
                      type="text"
                      name="contactPersonName"
                      value={formData.contactPersonName}
                      onChange={handleChange}
                      placeholder="Enter full name"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contactPersonNumber"
                      className={labelClass}
                    >
                      Mobile number
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <div className="flex h-10 overflow-hidden rounded-lg border border-blue-200 bg-blue-50/80 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/10">
                      <span className="flex items-center border-r border-blue-200 px-2.5 text-[11px] font-bold text-blue-700">
                        +91
                      </span>

                      <input
                        id="contactPersonNumber"
                        type="tel"
                        name="contactPersonNumber"
                        value={formData.contactPersonNumber}
                        onChange={handlePhoneChange}
                        placeholder="10-digit mobile number"
                        inputMode="numeric"
                        className="min-w-0 flex-1 bg-transparent px-3 text-[12px] font-medium text-blue-900 outline-none placeholder:text-blue-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ERROR */}
              {error && (
                <div
                  role="alert"
                  className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-[11px] font-medium leading-4 text-red-700"
                >
                  <span className="font-extrabold">!</span>
                  <span>{error}</span>
                </div>
              )}

              {/* SUBMIT */}
              <div className="mt-5 border-t border-blue-100 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2462AC] to-[#2462AC] px-4 text-[12px] font-extrabold text-white shadow-[0_4px_12px_rgba(37,99,180,0.18)] transition-all duration-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Submitting job...
                    </>
                  ) : (
                    <>
                      Publish Job Posting
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="mt-2 text-center text-[9px] leading-4 text-blue-400">
                  By submitting, you agree to share these details with the
                  {` ${website.name} `}team.
                </p>
              </div>
            </form>
          </section>

          <p className="pb-4 pt-5 text-center text-[9px] text-blue-400">
            {website.name} · Connecting talent with opportunity
          </p>
        </div>
      </main>

      {/* FIXED LIVE JOB PREVIEW */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-blue-200/80 bg-white/95 px-3 pt-2 pb-[max(8px,env(safe-area-inset-bottom))] shadow-[0_-5px_20px_rgba(15,23,42,0.10)] backdrop-blur-xl">
        <div className="mx-auto w-full max-w-xl">

          {/* PREVIEW HEADER */}
          <div className="mb-2 flex items-center justify-between">
            <div>
              <h3 className="text-[11px] font-extrabold text-blue-950">
                Live Job Preview
              </h3>

              <p className="mt-0.5 text-[9px] text-blue-700">
                Your job card updates as you type
              </p>
            </div>

            <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2 py-1 text-[9px] font-bold text-blue-700">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />
              LIVE
            </span>
          </div>

          {/* JOB CARD */}
          <div className="rounded-[16px] border border-blue-100 bg-white p-3 shadow-[0_3px_12px_rgba(15,23,42,0.05)]">

            {/* TOP SECTION */}
            <div className="flex min-w-0 gap-3">

              {/* COMPANY LOGO / INITIALS */}
              <div className="relative shrink-0">
                <span className="absolute -left-1 -top-1 z-10 max-w-[85px] truncate rounded-full bg-blue-100 px-2 py-[3px] text-[8px] font-semibold text-blue-900">
                  Just Posted
                </span>

                <div className="flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-[13px] border border-blue-200 bg-gradient-to-br from-blue-100 to-blue-100 px-1">
                  <span
                    className={`w-full truncate text-center text-[13px] font-extrabold transition-opacity duration-300 ${
                      formData.companyName.trim()
                        ? 'opacity-100 text-blue-950'
                        : 'opacity-35 text-blue-700'
                    }`}
                  >
                    {formData.companyName.trim()
                      ? formData.companyName.trim().split(/\s+/)[0]
                      : 'ABC'}
                  </span>
                </div>
              </div>

              {/* JOB INFORMATION */}
              <div className="min-w-0 flex-1">

                {/* DESIGNATION */}
                <h2
                  className={`line-clamp-2 break-words text-[13px] font-extrabold leading-[17px] transition-opacity duration-300 ${
                    formData.designation.trim()
                      ? 'opacity-100 text-blue-950'
                      : 'opacity-35 text-blue-700'
                  }`}
                >
                  {formData.designation.trim() || 'Job Designation'}
                </h2>

                {/* COMPANY NAME */}
                <p
                  className={`mt-1 truncate text-[10px] font-medium transition-opacity duration-300 ${
                    formData.companyName.trim()
                      ? 'opacity-100 text-blue-700'
                      : 'opacity-35 text-blue-400'
                  }`}
                >
                  {formData.companyName.trim() || 'Company Name'}
                </p>

                {/* SALARY */}
                <div
                  className={`mt-1.5 inline-flex max-w-full items-center rounded-lg bg-blue-50 px-2 py-1 transition-opacity duration-300 ${
                    formData.salary.trim() ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  <span
                    className={`truncate text-[12px] font-extrabold leading-4 ${
                      formData.salary.trim()
                        ? 'text-blue-800'
                        : 'text-blue-700'
                    }`}
                  >
                    {formData.salary.trim() || 'Salary not specified'}
                  </span>
                </div>

                {/* EXPERIENCE AND EMPLOYMENT TYPE */}
                <div className="mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[10px] text-blue-700">
                  <span className="inline-flex items-center gap-1 opacity-50">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="7" width="18" height="14" rx="2" />
                      <path d="M8 7V4h8v3M3 12h18" />
                    </svg>
                    Experience not specified
                  </span>

                  <span className="text-blue-300">•</span>

                  <span className="inline-flex items-center gap-1 opacity-50">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" />
                    </svg>
                    Full Time
                  </span>
                </div>

                {/* LOCATION */}
                <p
                  className={`mt-1.5 flex min-w-0 items-center gap-1 text-[10px] font-bold transition-opacity duration-300 ${
                    formData.location.trim()
                      ? 'opacity-100 text-blue-950'
                      : 'opacity-35 text-blue-700'
                  }`}
                >
                  <svg
                    className="shrink-0 text-red-500"
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2a8 8 0 0 0-8 8c0 5.4 8 12 8 12s8-6.6 8-12a8 8 0 0 0-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                  </svg>

                  <span className="truncate">
                    {formData.location.trim() || 'Job location'}
                  </span>
                </p>
              </div>
            </div>

            {/* ACTION BUTTONS — PREVIEW ONLY */}
            <div className="mt-3 flex items-center gap-2 border-t border-blue-100 pt-2.5">

              {/* LOCATION BUTTON */}
              <div className="inline-flex h-[34px] flex-1 items-center justify-center gap-1.5 rounded-full border border-blue-200 bg-blue-100 px-3 text-[10px] font-bold text-blue-950">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="shrink-0 text-blue-800"
                >
                  <path d="M12 2a8 8 0 0 0-8 8c0 5.4 8 12 8 12s8-6.6 8-12a8 8 0 0 0-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                </svg>
                Location
              </div>

              {/* APPLY BUTTON */}
              <div className="inline-flex h-[34px] flex-1 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 px-3 text-[11px] font-bold text-white shadow-[0_3px_8px_rgba(37,99,180,0.16)]">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22 2 2 10.5l8.1 3.4L13.5 22 22 2Z" />
                </svg>
                Apply
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mobile_Post_Free_Job
