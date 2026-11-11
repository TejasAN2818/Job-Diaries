
import React, { useState } from 'react'
import Desktop_Header from './Desktop_Header'
import WEBSITE_CONFIG from '../../../inputs/overall/Website_Config'
import {
  sendJobPostToGoogleSheet,
} from '../../../inputs/overall/Post_Job_Google_Sheet_Action'

function Desktop_Post_Free_Job({ onBack, onMenuClick }) {
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
    const value = e.target.value
      .replace(/\D/g, '')
      .slice(0, 10)

    setFormData((previous) => ({
      ...previous,
      contactPersonNumber: value,
    }))

    setError('')
  }

  // SUBMIT — EXISTING VALIDATION AND GOOGLE SHEETS LOGIC
  const handleSubmit = async (e) => {
    e.preventDefault()

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
          console.log(
            'Job post successfully saved to Google Sheet.'
          )
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
    w-full h-12 rounded-xl border border-blue-200
    bg-blue-50/80 px-4 text-[13px] font-medium
    text-blue-900 placeholder:text-blue-400
    outline-none transition-all duration-200
    hover:border-blue-300
    focus:border-blue-500 focus:bg-white
    focus:ring-4 focus:ring-blue-500/10
  `

  const labelClass = `
    mb-2 block text-[12px] font-bold
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
    {
      name: 'contactPersonName',
      label: 'Contact person',
      placeholder: 'Who should candidates contact?',
      type: 'text',
    },
  ]

  // SUCCESS SCREEN
  if (showSuccess) {
    return (
      <div className="fixed inset-0 flex flex-col overflow-hidden bg-[#E4EFFF]">
        <Desktop_Header onMenuClick={onMenuClick} />

        <main className="flex-1 overflow-y-auto px-4 py-8 sm:px-8">
          <div className="flex min-h-[75vh] items-center justify-center">
            <div className="w-full max-w-[520px] rounded-[28px] border border-blue-100 bg-white p-8 text-center shadow-[0_15px_50px_rgba(15,23,42,0.08)] sm:p-12">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-green-50 text-green-600">
                <svg
                  viewBox="0 0 24 24"
                  className="h-10 w-10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m5 12 4 4L19 6" />
                </svg>
              </div>

              <p className="mt-6 text-[11px] font-extrabold uppercase tracking-[2px] text-green-600">
                Submission complete
              </p>

              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-blue-950">
                Job posted successfully!
              </h2>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-blue-700">
                Thank you for choosing {website.name}. Our team
                will contact you regarding your job posting.
              </p>

              <div className="mt-7 rounded-2xl border border-green-100 bg-green-50/70 p-4 text-left">
                <p className="text-xs font-bold text-blue-900">
                  What happens next?
                </p>

                <p className="mt-1 text-xs leading-5 text-blue-700">
                  Our team will review your job details and
                  contact the person provided.
                </p>
              </div>

              <button
                type="button"
                onClick={onBack}
                className="mt-7 h-12 w-full rounded-xl bg-gradient-to-r from-[#397BC8] to-[#2462AC] text-sm font-extrabold text-white shadow-sm transition hover:brightness-105 active:scale-[0.99]"
              >
                Back to Jobs
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-[#E4EFFF]">
      <Desktop_Header onMenuClick={onMenuClick} />

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[1320px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

          {/* STICKY BACK BUTTON */}
          <div className="sticky top-0 z-30 h-0">
            <button
              type="button"
              onClick={onBack}
              aria-label="Back to jobs"
              className="
                absolute left-0 top-3
                flex h-10 items-center justify-center gap-2
                rounded-xl border border-blue-400
                bg-gradient-to-r from-blue-600 to-blue-500
                px-4 text-sm font-bold text-white
                shadow-[0_4px_18px_rgba(37,99,180,0.35)]
                ring-2 ring-blue-100
                transition-all duration-200
                hover:-translate-y-0.5 hover:from-blue-700
                hover:to-blue-600
                hover:shadow-[0_6px_22px_rgba(37,99,180,0.45)]
                active:scale-95
              "
            >
              <span className="text-xl leading-none">←</span>
              <span>Back</span>
            </button>
          </div>

          {/* HERO BANNER */}
          <section className="relative mb-6 overflow-hidden rounded-[24px] bg-gradient-to-r from-[#E4EFFF] via-[#E4EFFF] to-[#E4EFFF] p-6 sm:p-8 lg:p-9">
            <div className="pointer-events-none absolute -right-8 -top-20 h-64 w-64 rounded-full border-[36px] border-white/20" />
            <div className="pointer-events-none absolute right-36 top-12 h-24 w-24 rounded-full bg-white/15" />

            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-900/10 bg-white/70 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-blue-900">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                {website.name} Hiring
              </span>

              <h2 className="mt-4 max-w-xl text-2xl font-black leading-tight tracking-tight text-blue-950 sm:text-3xl lg:text-[36px]">
                Great teams start with
                <span className="block">great hires.</span>
              </h2>

              <p className="mt-3 max-w-lg text-xs leading-6 text-blue-900/80 sm:text-sm">
                Share your vacancy details and connect with
                the right candidates. Posting a job is free.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-lg bg-blue-900 px-3 py-2 text-[11px] font-bold text-white">
                  ✓ Free job posting
                </span>

                <span className="rounded-lg border border-blue-900/10 bg-white/60 px-3 py-2 text-[11px] font-bold text-blue-900">
                  Simple submission
                </span>
              </div>
            </div>
          </section>

          {/* CONTENT LAYOUT */}
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_310px]">

            {/* JOB POSTING PANEL */}
            <section className="min-w-0 overflow-hidden rounded-[22px] border border-blue-200/80 bg-white shadow-[0_5px_24px_rgba(15,23,42,0.04)]">

              {/* PANEL HEADING */}
              <div className="border-b border-blue-100 px-5 py-5 sm:px-7">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
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
                    <h2 className="text-base font-extrabold text-blue-950 sm:text-lg">
                      Create your job listing
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-blue-700">
                      Add the essential details candidates need to know.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-5 sm:p-7">

                {/* JOB INFORMATION */}
                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-[11px] font-extrabold text-blue-900">
                      1
                    </span>

                    <h3 className="text-sm font-extrabold text-blue-900">
                      Job information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-2">
                    {fields.slice(0, 5).map((field) => (
                      <div key={field.name} className="mb-5 min-w-0">
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
                <div className="mt-2 border-t border-blue-100 pt-6">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-[11px] font-extrabold text-blue-900">
                      2
                    </span>

                    <div>
                      <h3 className="text-sm font-extrabold text-blue-900">
                        Hiring contact
                      </h3>

                      <p className="mt-0.5 text-[11px] text-blue-700">
                        Who should our team contact about this vacancy?
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-2">
                    <div className="mb-5 min-w-0">
                      <label
                        htmlFor="contactPersonName"
                        className={labelClass}
                      >
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

                    <div className="mb-5 min-w-0">
                      <label
                        htmlFor="contactPersonNumber"
                        className={labelClass}
                      >
                        Mobile number
                        <span className="ml-1 text-red-500">*</span>
                      </label>

                      <div className="flex h-12 overflow-hidden rounded-xl border border-blue-200 bg-blue-50/80 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">
                        <span className="flex items-center border-r border-blue-200 px-3 text-xs font-bold text-blue-700">
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
                          className="min-w-0 flex-1 bg-transparent px-3 text-[13px] font-medium text-blue-900 outline-none placeholder:text-blue-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ERROR */}
                {error && (
                  <div className="mb-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium leading-5 text-red-700">
                    <span className="font-extrabold">!</span>
                    <span>{error}</span>
                  </div>
                )}

                {/* SUBMIT */}
                <div className="mt-2 border-t border-blue-100 pt-5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2462AC] to-[#2462AC] px-5 text-sm font-extrabold text-white shadow-[0_5px_14px_rgba(37,99,180,0.20)] transition-all duration-200 hover:brightness-105 hover:shadow-[0_7px_18px_rgba(37,99,180,0.25)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Submitting job...
                      </>
                    ) : (
                      <>
                        Publish Job Posting
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4"
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

                  <p className="mt-3 text-center text-[10px] leading-5 text-blue-400">
                    By submitting, you agree to share these details
                    with the {website.name} team.
                  </p>
                </div>
              </form>
            </section>

            {/* RIGHT SIDE: LIVE JOB PREVIEW */}
            <aside className="space-y-4 lg:sticky lg:top-5">

              {/* PREVIEW HEADING */}
              <div className="flex items-center justify-between px-1">
                <div>
                  <h3 className="text-sm font-extrabold text-blue-900">
                    Job card preview
                  </h3>

                  <p className="mt-1 text-[11px] text-blue-700">
                    This is how your job will appear
                  </p>
                </div>

                <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-extrabold text-blue-700">
                  LIVE
                </span>
              </div>

              {/* MATCHING DESKTOP JOBCARD */}
              <div className="
                w-full rounded-[20px] border border-blue-100
                bg-white p-4
                shadow-[0_3px_12px_rgba(15,23,42,0.04)]
              ">

                {/* TOP SECTION */}
                <div className="flex gap-4">

                  {/* COMPANY LOGO */}
                  <div className="relative shrink-0">

                    {/* POSTED DATE */}
                    <span className="
                      absolute -left-2 -top-2 z-10
                      whitespace-nowrap rounded-full bg-blue-100
                      px-3 py-[4px] text-[9px] font-medium text-blue-900
                    ">
                      Just now
                    </span>

                    {/* LOGO CONTAINER */}
                    <div className="
                      flex h-[88px] w-[88px] items-center
                      justify-center overflow-hidden rounded-[17px]
                      border border-blue-200 bg-gradient-to-br
                      from-blue-100 to-blue-100
                    ">
                      <div className="w-full px-2 text-center">
                        <p className="
                          truncate text-[17px] font-extrabold
                          leading-5 text-blue-950
                        ">
                          {formData.companyName.trim()
                            ? formData.companyName.trim().split(' ')[0]
                            : 'ABC'}
                        </p>

                        <p className="mt-1 text-[10px] text-blue-900">
                          company
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* JOB INFORMATION */}
                  <div className="min-w-0 flex-1">

                    {/* JOB TITLE */}
                    <h2 className="
                      line-clamp-2 break-words text-[15px]
                      font-extrabold leading-[19px] text-blue-950
                    ">
                      {formData.designation.trim() || 'Job Designation'}
                    </h2>

                    {/* COMPANY NAME */}
                    <p className="mt-1 truncate text-[11px] font-medium text-blue-700">
                      {formData.companyName.trim() || 'Company Name'}
                    </p>

                    {/* SALARY */}
                    <div className="
                      mt-2 inline-flex max-w-full items-center
                      rounded-lg bg-blue-50 px-3 py-1
                    ">
                      <span className="truncate text-[15px] font-extrabold leading-5 text-blue-800">
                        {formData.salary.trim() || 'Salary not specified'}
                      </span>
                    </div>

                    {/* EXPERIENCE + EMPLOYMENT TYPE */}
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="flex items-center gap-1.5 text-[11px] text-blue-700">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <rect x="3" y="7" width="18" height="14" rx="2" />
                          <path d="M8 7V4h8v3M3 12h18" />
                        </svg>

                        Experience not specified
                      </span>

                      <span className="text-[9px] text-blue-400">•</span>

                      <span className="flex items-center gap-1.5 text-[11px] text-blue-700">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 7v5l3 2" />
                        </svg>

                        Employment type not specified
                      </span>
                    </div>

                    {/* LOCATION */}
                    <p className="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-blue-950">
                      <svg
                        className="shrink-0 text-red-500"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M12 2a8 8 0 0 0-8 8c0 5.4 8 12 8 12s8-6.6 8-12a8 8 0 0 0-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                      </svg>

                      <span className="break-words">
                        {formData.location.trim() || 'Job location'}
                      </span>
                    </p>
                  </div>
                </div>

                {/* BOTTOM BUTTONS */}
                <div className="mt-3 flex items-center gap-3">

                  {/* LOCATION BUTTON */}
                  <button
                    type="button"
                    disabled
                    className="
                      inline-flex h-[36px] shrink-0 items-center
                      justify-center gap-2 whitespace-nowrap
                      rounded-full border border-blue-200
                      bg-blue-100 px-4 text-[12px] font-bold
                      text-blue-950 opacity-100
                    "
                  >
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-blue-800"
                      aria-hidden="true"
                    >
                      <path d="M12 2a8 8 0 0 0-8 8c0 5.4 8 12 8 12s8-6.6 8-12a8 8 0 0 0-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                    </svg>

                    Location
                  </button>

                  {/* APPLY BUTTON */}
                  <button
                    type="button"
                    disabled
                    className="
                      flex h-[36px] min-w-0 flex-1 items-center
                      justify-center gap-2 rounded-full
                      bg-gradient-to-r from-blue-500 to-blue-700
                      text-[13px] font-bold text-white opacity-100
                      shadow-[0_3px_8px_rgba(37,99,180,0.16)]
                    "
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M22 2 2 10.5l8.1 3.4L13.5 22 22 2Zm-9.7 10.1-1.4 1.4" />
                    </svg>

                    Apply
                  </button>
                </div>

                {/* VACANCIES */}
                <div className="mt-3 border-t border-dashed border-blue-100 pt-3">
                  <p className="text-[10px] text-blue-400">
                    Number of openings
                  </p>

                  <p className="mt-1 text-xs font-bold text-blue-800">
                    {formData.vacancy || 'Not specified'}
                    {Number(formData.vacancy) === 1 ? ' vacancy' : ' vacancies'}
                  </p>
                </div>
              </div>

              {/* PREVIEW NOTE */}
              <div className="rounded-xl border border-blue-200 bg-blue-100/80 px-4 py-3">
                <p className="text-[11px] font-bold text-blue-900">
                  <span className="mr-1 text-blue-700">✓</span>
                  Preview updates automatically
                </p>

                <p className="mt-1 text-[10px] leading-4 text-blue-700">
                  Your company, designation, salary and location appear
                  here as you enter them.
                </p>
              </div>

            </aside>
          </div>

          <p className="pb-4 pt-6 text-center text-[10px] text-blue-400">
            {website.name} · Connecting talent with opportunity
          </p>
        </div>
      </main>
    </div>
  )
}

export default Desktop_Post_Free_Job
