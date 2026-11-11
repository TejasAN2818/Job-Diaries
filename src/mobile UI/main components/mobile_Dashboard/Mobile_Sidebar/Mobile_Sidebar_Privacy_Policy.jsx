
import React from 'react'
import {
  ShieldCheck,
  LockKeyhole,
  FileText,
  Users,
  Shield,
  UserCheck,
  RefreshCw,
  Info,
} from 'lucide-react'

import Mobile_Bottom_Navigation from '../Mobile_Bottom_Navigation'
import WEBSITE_CONFIG from '../../../../inputs/overall/Website_Config'

function Mobile_Sidebar_Privacy_Policy({
  onMenuClick,
  onHomeClick,
  onJobsClick,
  onProfileClick,
}) {
  const websiteName = WEBSITE_CONFIG.website.name
  const websiteTagline = WEBSITE_CONFIG.website.tagline
  const websiteInitial = websiteName.charAt(0).toUpperCase()

  const policySections = [
    {
      number: '01',
      title: 'Information We Collect',
      description:
        'We may collect information that you provide when using our website, including your name, phone number, location, employment information and other details submitted through our job application forms.',
      icon: Users,
    },
    {
      number: '02',
      title: 'How We Use Your Information',
      description:
        'Information may be used to provide job search services, process applications, communicate with users and improve our services.',
      icon: FileText,
    },
    {
      number: '03',
      title: 'Information Sharing',
      description:
        'Information may be shared with relevant employers or recruitment partners when necessary for recruitment and employment-related purposes.',
      icon: Users,
    },
    {
      number: '04',
      title: 'Data Security',
      description:
        'We take reasonable measures to protect the information provided by users from unauthorized access, misuse or disclosure.',
      icon: Shield,
    },
    {
      number: '05',
      title: 'User Responsibility',
      description:
        'Users are responsible for ensuring that the information submitted through our website is accurate and up to date.',
      icon: UserCheck,
    },
    {
      number: '06',
      title: 'Policy Updates',
      description:
        'We may update this Privacy Policy from time to time. Any changes will be reflected on this page.',
      icon: RefreshCw,
    },
  ]

  return (
    <div className="min-h-screen w-full bg-[#F4F8FF] pb-24 font-sans text-[#102448]">

      {/* =====================================================
          FIXED MOBILE HEADER
      ===================================================== */}

      <header className="fixed inset-x-0 top-0 z-[100] border-b border-blue-200/60 bg-[#E4EFFF]">
        <div className="flex h-[58px] items-center justify-between px-3">

          {/* Logo and menu */}
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={onMenuClick}
              aria-label="Open menu"
              className="
                flex h-9 w-9 shrink-0 flex-col
                items-center justify-center gap-[4px]
                rounded-xl bg-[#102448] text-white shadow-sm
                transition duration-200 hover:bg-[#102448]
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
              <h1 className="truncate text-[17px] font-extrabold leading-tight tracking-tight text-blue-900">
                {websiteName}
              </h1>

              <p className="mt-0.5 text-[9px] font-medium text-blue-900/70">
                {websiteTagline}
              </p>
            </div>
          </div>

          {/* Post Jobs */}
          <button
            type="button"
            className="
              flex shrink-0 items-center gap-1.5
              rounded-full bg-[#102448]
              px-2.5 py-1.5 text-[10px] font-bold text-white
              shadow-sm transition duration-200
              hover:bg-blue-900 active:scale-95
            "
          >
            Post Jobs

            <span className="rounded-full bg-[#E4EFFF] px-1.5 py-0.5 text-[9px] font-extrabold text-blue-900">
              Free
            </span>
          </button>
        </div>
      </header>

      {/* =====================================================
          PRIVACY POLICY CONTENT
      ===================================================== */}

      <main className="mx-auto w-full max-w-[650px] px-3 pb-8 pt-[72px]">

        {/* =====================================================
            PAGE HEADING
        ===================================================== */}

        <section className="overflow-hidden rounded-2xl border border-blue-200/80 bg-white shadow-sm">
          <div className="h-1.5 bg-[#E4EFFF]" />

          <div className="p-4">
            <div className="flex items-center gap-2">
              <span className="h-5 w-1 rounded-full bg-[#2462AC]" />

              <p className="text-[9px] font-bold uppercase tracking-[1.2px] text-blue-700">
                {websiteName} · Policies
              </p>
            </div>

            <h2 className="mt-3 text-[25px] font-extrabold leading-tight tracking-tight text-[#102448]">
              Privacy Policy
            </h2>

            <p className="mt-3 text-[12px] leading-[1.8] text-blue-700">
              Your privacy is important to us. This Privacy Policy explains
              how {websiteName} collects, uses and protects your information.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-[9px] font-semibold text-blue-800">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                Privacy information
              </span>

              <span className="rounded-full border border-blue-200 bg-[#E4EFFF] px-2.5 py-1.5 text-[9px] font-semibold text-[#2462AC]">
                6 policy sections
              </span>
            </div>
          </div>
        </section>

        {/* =====================================================
            POLICY INTRODUCTION
        ===================================================== */}

        <section className="mt-4 rounded-2xl border border-blue-200/80 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E4EFFF] text-[#2462AC]">
              <LockKeyhole size={18} />
            </div>

            <h3 className="text-[15px] font-bold text-[#102448]">
              About this policy
            </h3>
          </div>

          <p className="mt-3 text-[12px] leading-[1.8] text-blue-700">
            This policy describes how information submitted through {websiteName}
            may be handled when you use our job-search platform.
            Please review the sections below to understand our stated
            information practices.
          </p>
        </section>

        {/* =====================================================
            POLICY SECTIONS
        ===================================================== */}

        <section className="mt-6">
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-[1.3px] text-[#2462AC]">
              Policy details
            </p>

            <h3 className="mt-1 text-[20px] font-extrabold tracking-tight text-[#102448]">
              Your information, explained
            </h3>
          </div>

          <div className="space-y-3">
            {policySections.map((section) => {
              const Icon = section.icon

              return (
                <article
                  key={section.number}
                  className="
                    group rounded-2xl
                    border border-blue-200/80
                    bg-white p-4 shadow-sm
                    transition duration-200
                    hover:border-blue-200 hover:shadow-md
                  "
                >
                  <div className="flex items-start gap-3">

                    {/* Section number */}
                    <div
                      className="
                        flex h-9 w-9 shrink-0
                        items-center justify-center
                        rounded-xl bg-[#E4EFFF]
                        text-[10px] font-extrabold
                        text-[#2462AC]
                        transition-colors
                        group-hover:bg-[#E4EFFF]
                      "
                    >
                      {section.number}
                    </div>

                    {/* Section content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start gap-2">
                        <h4 className="min-w-0 flex-1 text-[13px] font-bold leading-5 text-[#102448]">
                          {section.title}
                        </h4>

                        <Icon
                          size={16}
                          strokeWidth={1.7}
                          className="mt-0.5 shrink-0 text-[#2462AC]"
                        />
                      </div>

                      <p className="mt-2 text-[12px] leading-[1.8] text-blue-700">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* =====================================================
            CLOSING NOTE
        ===================================================== */}

        <section className="mt-5 overflow-hidden rounded-2xl border border-blue-200 bg-[#E4EFFF] p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E4EFFF] text-blue-900">
              <Info size={19} />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-[13px] font-bold text-[#102448]">
                Please review this policy
              </h3>

              <p className="mt-2 text-[12px] leading-[1.8] text-blue-700">
                Please review these details carefully when using {websiteName}.
                Any updates to this policy will be reflected on this page.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <footer className="mt-7 border-t border-blue-200 py-5 text-center">
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-[#E4EFFF] text-sm font-extrabold text-blue-900">
            {websiteInitial}
          </div>

          <h3 className="mt-2 text-[14px] font-extrabold tracking-tight text-[#102448]">
            {websiteName}
          </h3>

          <p className="mt-1 text-[11px] leading-5 text-blue-700">
            {websiteTagline}
          </p>

          <p className="mt-3 text-[10px] text-blue-400">
            © {new Date().getFullYear()} {websiteName}. All rights reserved.
          </p>
        </footer>
      </main>

      {/* =====================================================
          EXISTING MOBILE BOTTOM NAVIGATION
      ===================================================== */}

      <Mobile_Bottom_Navigation
        activeTab=""
        onHomeClick={onHomeClick}
        onJobsClick={onJobsClick}
        onProfileClick={onProfileClick}
      />
    </div>
  )
}

export default Mobile_Sidebar_Privacy_Policy
