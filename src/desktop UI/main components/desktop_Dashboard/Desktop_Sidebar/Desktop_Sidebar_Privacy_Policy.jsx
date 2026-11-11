
import React from 'react'
import Desktop_Bottom_Navigation from '../Desktop_Bottom_Navigation'
import WEBSITE_CONFIG from '../../../../inputs/overall/Website_Config'

function Desktop_Sidebar_Privacy_Policy({
  onMenuClick,
  onHomeClick,
  onJobsClick,
  onProfileClick,
}) {
  const websiteName = WEBSITE_CONFIG.website.name
  const websiteTagline = WEBSITE_CONFIG.website.tagline

  const policySections = [
    {
      number: '01',
      title: 'Information We Collect',
      description:
        'We may collect information that you provide when using our website, including your name, phone number, location, employment information and other details submitted through our job application forms.',
    },
    {
      number: '02',
      title: 'How We Use Your Information',
      description:
        'Information may be used to provide job search services, process applications, communicate with users and improve our services.',
    },
    {
      number: '03',
      title: 'Information Sharing',
      description:
        'Information may be shared with relevant employers or recruitment partners when necessary for recruitment and employment-related purposes.',
    },
    {
      number: '04',
      title: 'Data Security',
      description:
        'We take reasonable measures to protect the information provided by users from unauthorized access, misuse or disclosure.',
    },
    {
      number: '05',
      title: 'User Responsibility',
      description:
        'Users are responsible for ensuring that the information submitted through our website is accurate and up to date.',
    },
    {
      number: '06',
      title: 'Policy Updates',
      description:
        'We may update this Privacy Policy from time to time. Any changes will be reflected on this page.',
    },
  ]

  return (
    <div className="min-h-screen bg-[#F4F8FF] pb-20 font-sans text-[#102448]">

      {/* HEADER */}
      <header className="fixed inset-x-0 top-0 z-[100] border-b border-blue-200/60 bg-[#E4EFFF]">
        <div className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo and menu */}
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={onMenuClick}
              aria-label="Open menu"
              className="
                flex h-10 w-10 shrink-0 flex-col items-center
                justify-center gap-[5px] rounded-xl bg-[#102448]
                shadow-sm transition duration-200
                hover:bg-[#102448] hover:shadow-md
                active:scale-95
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-blue-900 focus-visible:ring-offset-2
                focus-visible:ring-offset-blue-200
              "
            >
              <span className="h-[2px] w-5 rounded-full bg-white" />
              <span className="h-[2px] w-5 rounded-full bg-white" />
              <span className="h-[2px] w-5 rounded-full bg-white" />
            </button>

            <div className="min-w-0">
              <h1 className="truncate text-[20px] font-extrabold leading-tight tracking-tight text-blue-900 sm:text-[23px]">
                {websiteName}
              </h1>
              <p className="mt-0.5 text-[10px] font-medium text-blue-900/70 sm:text-[11px]">
                {websiteTagline}
              </p>
            </div>
          </div>

          {/* Post jobs */}
          <button
            type="button"
            className="
              flex shrink-0 items-center gap-2 rounded-full
              bg-blue-900 px-3.5 py-2 text-[11px] font-bold text-white
              shadow-sm transition duration-200
              hover:bg-blue-900 hover:shadow-md active:scale-95
              sm:px-5 sm:text-[12px]
            "
          >
            Post Jobs
            <span className="rounded-full bg-[#E4EFFF] px-2.5 py-1 text-[9px] font-extrabold text-blue-900 sm:text-[10px]">
              Free
            </span>
          </button>
        </div>
      </header>

      {/* PRIVACY POLICY CONTENT */}
      <main className="mx-auto max-w-[1200px] px-4 pb-8 pt-[88px] sm:px-6 lg:px-8">

        {/* Page heading */}
        <section className="overflow-hidden rounded-2xl border border-blue-200/80 bg-white shadow-sm">
          <div className="h-1.5 bg-[#E4EFFF]" />

          <div className="p-5 sm:p-7">
            <div className="flex items-center gap-2">
              <span className="h-5 w-1 rounded-full bg-[#2462AC]" />
              <p className="text-[10px] font-bold uppercase tracking-[1.3px] text-blue-700">
                {websiteName} · Policies
              </p>
            </div>

            <h2 className="mt-3 text-[26px] font-extrabold leading-tight tracking-tight text-[#102448] sm:text-[32px]">
              Privacy Policy
            </h2>

            <p className="mt-3 max-w-3xl text-[12px] leading-6 text-blue-700 sm:text-[13px]">
              Your privacy is important to us. This Privacy Policy explains
              how {websiteName} collects, uses and protects your information.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-[10px] font-semibold text-blue-800">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                Privacy information
              </span>

              <span className="rounded-full border border-blue-200 bg-[#E4EFFF] px-3 py-1.5 text-[10px] font-semibold text-[#2462AC]">
                6 policy sections
              </span>
            </div>
          </div>
        </section>

        {/* Policy introduction */}
        <section className="mt-5 rounded-2xl border border-blue-200/80 bg-white p-5 shadow-sm sm:p-6">
          <h3 className="text-[15px] font-bold text-[#102448]">
            About this policy
          </h3>

          <p className="mt-2 text-[12px] leading-6 text-blue-700 sm:text-[13px]">
            This policy describes how information submitted through {websiteName}
            may be handled when you use our job-search platform.
            Please review the sections below to understand our stated
            information practices.
          </p>
        </section>

        {/* Policy sections */}
        <section className="mt-7">
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-[1.3px] text-[#2462AC]">
              Policy details
            </p>
            <h3 className="mt-1 text-[20px] font-extrabold tracking-tight text-[#102448]">
              Your information, explained
            </h3>
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            {policySections.map((section) => (
              <article
                key={section.number}
                className="
                  group rounded-2xl border border-blue-200/80
                  bg-white p-4 shadow-sm
                  transition duration-200
                  hover:border-blue-200 hover:shadow-md
                  sm:p-5
                "
              >
                <div className="flex items-start gap-3">
                  <div
                    className="
                      flex h-9 w-9 shrink-0 items-center justify-center
                      rounded-xl bg-[#E4EFFF] text-[11px] font-extrabold
                      text-[#2462AC] transition-colors
                      group-hover:bg-[#E4EFFF]
                    "
                  >
                    {section.number}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="text-[13px] font-bold leading-5 text-[#102448] sm:text-[14px]">
                      {section.title}
                    </h4>

                    <p className="mt-2 text-[12px] leading-[1.8] text-blue-700">
                      {section.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Closing note */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-blue-200 bg-[#E4EFFF] p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E4EFFF] text-[17px] font-bold text-blue-900">
              i
            </div>

            <div>
              <h3 className="text-[13px] font-bold text-[#102448]">
                Please review this policy
              </h3>

              <p className="mt-1.5 text-[12px] leading-6 text-blue-700">
                Please review these details carefully when using {websiteName}.
                Any updates to this policy will be reflected on this page.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-8 border-t border-blue-200 py-5 text-center">
          <h3 className="text-[14px] font-extrabold tracking-tight text-[#102448]">
            {websiteName}
          </h3>

          <p className="mt-1 text-[11px] text-blue-700">
            {websiteTagline}
          </p>

          <p className="mt-3 text-[10px] text-blue-400">
            © {new Date().getFullYear()} {websiteName}. All rights reserved.
          </p>
        </footer>
      </main>

      {/* EXISTING BOTTOM NAVIGATION */}
      <Desktop_Bottom_Navigation
        activeTab=""
        onHomeClick={onHomeClick}
        onJobsClick={onJobsClick}
        onProfileClick={onProfileClick}
      />
    </div>
  )
}

export default Desktop_Sidebar_Privacy_Policy
