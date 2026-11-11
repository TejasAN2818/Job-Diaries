
import React from 'react'
import Desktop_Bottom_Navigation from '../Desktop_Bottom_Navigation'
import WEBSITE_CONFIG from '../../../../inputs/overall/Website_Config'

function Desktop_Sidebar_Home({
  onMenuClick,
  onJobsClick,
  onProfileClick,
}) {
  const websiteName = WEBSITE_CONFIG.website.name
  const websiteTagline = WEBSITE_CONFIG.website.tagline

  const steps = [
    {
      number: '01',
      title: 'Create Your Profile',
      description:
        'Add your basic details, experience, education, skills and job preferences.',
    },
    {
      number: '02',
      title: 'Explore Jobs',
      description:
        'Browse opportunities based on your preferred location, designation and requirements.',
    },
    {
      number: '03',
      title: 'Apply for Jobs',
      description:
        'Find opportunities that match your profile and apply directly.',
    },
    {
      number: '04',
      title: 'Connect with Employers',
      description:
        'Take the next step towards your career with relevant opportunities.',
    },
  ]

  const employerFeatures = [
    {
      title: 'Job Posting',
      description: 'Share available positions.',
      icon: '↗',
    },
    {
      title: 'Candidate Reach',
      description: 'Connect with suitable candidates.',
      icon: '◎',
    },
    {
      title: 'Better Matching',
      description: 'Find candidates by requirements.',
      icon: '◇',
    },
    {
      title: 'Simple Process',
      description: 'Keep hiring straightforward.',
      icon: '✓',
    },
  ]

  const seekerBenefits = [
    'Search for relevant jobs',
    'Maintain your profile',
    'Apply for suitable opportunities',
    'Discover new career opportunities',
  ]

  return (
    <div className="min-h-screen bg-[#F4F8FF] pb-20 font-sans text-[#102448]">

      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-[100] border-b border-blue-200/60 bg-[#E4EFFF]">
        <div className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between px-4 sm:px-6">

          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={onMenuClick}
              aria-label="Open menu"
              className="
                flex h-10 w-10 shrink-0 items-center justify-center
                rounded-xl bg-[#102448] text-white shadow-sm
                transition duration-200 hover:bg-[#102448]
                hover:shadow-md active:scale-95
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-blue-900 focus-visible:ring-offset-2
                focus-visible:ring-offset-blue-200
              "
            >
              <span className="flex flex-col gap-[5px]" aria-hidden="true">
                <span className="h-[2px] w-5 rounded-full bg-white" />
                <span className="h-[2px] w-5 rounded-full bg-white" />
                <span className="h-[2px] w-5 rounded-full bg-white" />
              </span>
            </button>

            <div className="min-w-0">
              <h1 className="truncate text-[20px] font-extrabold leading-tight tracking-tight text-blue-900 sm:text-[24px]">
                {websiteName}
              </h1>
              <p className="mt-0.5 text-[10px] font-medium text-blue-900/70 sm:text-[11px]">
                {websiteTagline}
              </p>
            </div>
          </div>

          <div className="ml-3 flex shrink-0 items-center gap-2">
            <span className="hidden rounded-full border border-blue-900/10 bg-blue-900 px-3 py-2 text-[11px] font-semibold text-white sm:inline-flex">
              Your next opportunity starts here
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-blue-900/10 bg-white text-base font-bold text-blue-900 sm:hidden">
              {websiteName.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      </header>

      {/* Main page */}
      <main className="mx-auto max-w-[1200px] px-4 pb-8 pt-[88px] sm:px-6 lg:px-8">

        {/* Welcome banner */}
        <section className="relative overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-sm">
          <div className="absolute right-0 top-0 h-full w-1.5 bg-[#E4EFFF]" />

          <div className="relative px-5 py-7 sm:px-8 sm:py-9">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-[#E4EFFF] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[1.2px] text-[#2462AC]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E4EFFF]" />
              Welcome to {websiteName}
            </span>

            <h2 className="mt-4 max-w-2xl text-[28px] font-extrabold leading-[1.15] tracking-tight text-[#102448] sm:text-[36px]">
              Find the right job.
              <br />
              <span className="text-[#2462AC]">Build your career.</span>
            </h2>

            <p className="mt-3 max-w-2xl text-[13px] leading-6 text-blue-700 sm:text-[14px]">
              Discover employment opportunities, explore suitable roles and
              connect with employers through a simple job-search experience.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onJobsClick}
                className="
                  inline-flex min-h-10 items-center justify-center gap-2
                  rounded-xl bg-[#2462AC] px-5 py-2.5
                  text-[12px] font-bold text-white
                  shadow-sm transition duration-200
                  hover:bg-[#2462AC] hover:shadow-md active:scale-[0.98]
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-blue-700 focus-visible:ring-offset-2
                "
              >
                Explore Jobs
                <span aria-hidden="true">→</span>
              </button>

              <span className="text-[11px] font-medium text-blue-700">
                Simple. Accessible. Career-focused.
              </span>
            </div>
          </div>
        </section>

        {/* About website */}
        <section className="mt-7 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">

          <article className="rounded-2xl border border-blue-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-2">
              <span className="h-5 w-1 rounded-full bg-[#E4EFFF]" />
              <p className="text-[10px] font-bold uppercase tracking-[1.3px] text-blue-700">
                About {websiteName}
              </p>
            </div>

            <h2 className="mt-3 text-[20px] font-bold leading-snug tracking-tight text-[#102448] sm:text-[23px]">
              Built to connect people with opportunities.
            </h2>

            <p className="mt-3 text-[12px] leading-6 text-blue-700 sm:text-[13px]">
              {websiteName} is a job-search platform created to make finding
              employment opportunities simple, fast and accessible for everyone.
            </p>

            <p className="mt-3 text-[12px] leading-6 text-blue-700 sm:text-[13px]">
              Candidates can discover relevant jobs based on designation,
              location, experience and other important job requirements.
            </p>
          </article>

          <article className="rounded-2xl border border-blue-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E4EFFF] text-lg text-[#2462AC]">
              ◎
            </div>

            <h2 className="mt-3 text-[17px] font-bold text-[#102448]">
              Our Purpose
            </h2>

            <p className="mt-2 text-[12px] leading-6 text-blue-700">
              Make the job-search process more straightforward by helping job
              seekers and employers find relevant opportunities in one place.
            </p>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-blue-100">
              <div className="h-full w-2/3 rounded-full bg-[#E4EFFF]" />
            </div>
            <p className="mt-2 text-[10px] font-medium text-blue-700">
              Connecting talent with opportunity
            </p>
          </article>
        </section>

        {/* How it works */}
        <section className="mt-8">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[1.3px] text-[#2462AC]">
                Getting started
              </p>
              <h2 className="mt-1 text-[21px] font-extrabold tracking-tight text-[#102448]">
                How {websiteName} Works
              </h2>
            </div>

            <span className="rounded-full border border-blue-200 bg-white px-3 py-1.5 text-[10px] font-semibold text-blue-700">
              4 simple steps
            </span>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => (
              <article
                key={step.number}
                className="
                  group rounded-2xl border border-blue-200/80
                  bg-white p-4 shadow-sm
                  transition duration-200
                  hover:-translate-y-0.5 hover:border-blue-200
                  hover:shadow-md
                "
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E4EFFF] text-[12px] font-extrabold text-[#2462AC] transition-colors group-hover:bg-[#E4EFFF]">
                    {step.number}
                  </span>
                  <span className="text-lg text-blue-300 transition-colors group-hover:text-[#2462AC]">
                    →
                  </span>
                </div>

                <h3 className="mt-4 text-[13px] font-bold text-[#102448]">
                  {step.title}
                </h3>

                <p className="mt-2 text-[11px] leading-[1.65] text-blue-700">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Job seekers */}
        <section className="mt-8 overflow-hidden rounded-2xl border border-blue-200 bg-[#E4EFFF]">
          <div className="grid gap-5 p-5 sm:p-6 md:grid-cols-[1fr_1fr] md:items-center">
            <div>
              <span className="inline-flex rounded-full border border-blue-200 bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#2462AC]">
                For job seekers
              </span>

              <h2 className="mt-3 text-[21px] font-extrabold tracking-tight text-[#102448]">
                Your next career move starts here.
              </h2>

              <p className="mt-2 text-[12px] leading-6 text-blue-700">
                Build your profile and explore jobs that match your experience,
                career goals and preferred location.
              </p>
            </div>

            <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
              {seekerBenefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#2462AC] text-[9px] font-bold text-white">
                    ✓
                  </span>
                  <span className="text-[11px] font-medium leading-5 text-blue-800">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Employers */}
        <section className="mt-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[1.3px] text-[#2462AC]">
              For employers
            </p>
            <h2 className="mt-1 text-[21px] font-extrabold tracking-tight text-[#102448]">
              Make hiring more accessible.
            </h2>
            <p className="mt-2 max-w-2xl text-[12px] leading-6 text-blue-700">
              Employers can share employment opportunities and reach candidates
              based on their requirements.
            </p>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {employerFeatures.map((feature) => (
              <article
                key={feature.title}
                className="
                  rounded-2xl border border-blue-200/80
                  bg-white p-4 shadow-sm
                  transition duration-200 hover:border-blue-200
                  hover:shadow-md
                "
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E4EFFF] text-[18px] font-semibold text-[#2462AC]">
                  {feature.icon}
                </span>

                <h3 className="mt-3 text-[13px] font-bold text-[#102448]">
                  {feature.title}
                </h3>

                <p className="mt-1.5 text-[11px] leading-5 text-blue-700">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Closing banner */}
        <section className="relative mt-8 overflow-hidden rounded-2xl bg-[#102448] p-5 text-white sm:p-7">
          <div className="absolute -right-8 -top-12 h-36 w-36 rounded-full bg-[#E4EFFF]/10" />
          <div className="absolute -bottom-14 right-20 h-28 w-28 rounded-full bg-[#2462AC]/20" />

          <div className="relative">
            <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#2462AC]">
              Start your journey
            </span>

            <h2 className="mt-2 max-w-xl text-[22px] font-extrabold leading-tight tracking-tight sm:text-[27px]">
              Find opportunities that move you forward.
            </h2>

            <p className="mt-2 max-w-2xl text-[12px] leading-6 text-blue-300">
              Explore available jobs, discover suitable roles and take the next
              step towards your career goals.
            </p>

            <button
              type="button"
              onClick={onJobsClick}
              className="
                mt-5 inline-flex min-h-10 items-center gap-2
                rounded-xl bg-[#E4EFFF] px-4 py-2.5
                text-[12px] font-bold text-blue-900
                transition duration-200
                hover:bg-[#E4EFFF] active:scale-[0.98]
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-blue-200 focus-visible:ring-offset-2
                focus-visible:ring-offset-[#102448]
              "
            >
              Browse Jobs
              <span aria-hidden="true">→</span>
            </button>
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

      {/* Existing bottom navigation */}
      <Desktop_Bottom_Navigation
        activeTab="home"
        onHomeClick={() => {}}
        onJobsClick={onJobsClick}
        onProfileClick={onProfileClick}
      />
    </div>
  )
}

export default Desktop_Sidebar_Home
