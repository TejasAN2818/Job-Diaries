
import React from 'react'
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Compass,
  FileText,
  Search,
  ShieldCheck,
  Target,
  Users,
  Zap,
} from 'lucide-react'

import ownerImage from '../../../../images/owner_image/owner image.jpg'
import Mobile_Bottom_Navigation from '../Mobile_Bottom_Navigation'
import WEBSITE_CONFIG from '../../../../inputs/overall/Website_Config'

function Mobile_Sidebar_Home({
  onMenuClick,
  onJobsClick,
  onProfileClick,
}) {
  const websiteName = WEBSITE_CONFIG.website.name
  const websiteTagline = WEBSITE_CONFIG.website.tagline
  const websiteInitial = websiteName.charAt(0).toUpperCase()

  const steps = [
    {
      number: '01',
      title: 'Create Your Profile',
      description:
        'Add your basic details, experience, education, skills and job preferences.',
      icon: Users,
    },
    {
      number: '02',
      title: 'Explore Jobs',
      description:
        'Discover opportunities based on your preferred location and designation.',
      icon: Search,
    },
    {
      number: '03',
      title: 'Apply for Jobs',
      description:
        'Find suitable opportunities and apply directly.',
      icon: FileText,
    },
    {
      number: '04',
      title: 'Connect with Employers',
      description:
        'Take the next step towards your career goals.',
      icon: BriefcaseBusiness,
    },
  ]

  const seekerBenefits = [
    'Search for relevant jobs',
    'Maintain your profile',
    'Apply for suitable opportunities',
    'Discover new career opportunities',
  ]

  const employerFeatures = [
    {
      title: 'Job Posting',
      description: 'Share available positions.',
      icon: ArrowRight,
    },
    {
      title: 'Candidate Reach',
      description: 'Connect with suitable candidates.',
      icon: Users,
    },
    {
      title: 'Better Matching',
      description: 'Find candidates by requirements.',
      icon: Target,
    },
    {
      title: 'Simple Process',
      description: 'Keep hiring straightforward.',
      icon: Zap,
    },
  ]

  return (
    <div className="min-h-screen w-full bg-[#F4F8FF] pb-24 font-sans text-[#102448]">

      {/* =====================================================
          FIXED MOBILE HEADER
      ===================================================== */}

      <header className="fixed inset-x-0 top-0 z-[100] border-b border-blue-200/60 bg-[#E4EFFF] shadow-sm">
        <div className="flex h-[58px] items-center justify-between px-3">

          {/* Logo and menu */}
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={onMenuClick}
              aria-label="Open menu"
              className="
                flex h-9 w-9 shrink-0 items-center justify-center
                rounded-xl bg-[#102448] text-white shadow-sm
                transition duration-200
                hover:bg-[#102448] active:scale-95
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-blue-900 focus-visible:ring-offset-2
                focus-visible:ring-offset-blue-200
              "
            >
              <span
                className="flex flex-col gap-[4px]"
                aria-hidden="true"
              >
                <span className="h-[2px] w-5 rounded-full bg-white" />
                <span className="h-[2px] w-5 rounded-full bg-white" />
                <span className="h-[2px] w-5 rounded-full bg-white" />
              </span>
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

          {/* Brand mark */}
          <div className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-blue-900/10 bg-white text-sm font-extrabold text-blue-900 shadow-sm">
            {websiteInitial}
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="mx-auto w-full max-w-[600px] px-3 pb-8 pt-[70px]">

        {/* =====================================================
            FOUNDER IMAGE
        ===================================================== */}

        <section className="relative overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-sm">
          <img
            src={ownerImage}
            alt={`${websiteName} Founder`}
            className="
              block aspect-[16/9] w-full
              object-cover
            "
          />

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-blue-900/65 via-blue-900/20 to-transparent px-4 pb-3 pt-10">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E4EFFF]" />
              Welcome to {websiteName}
            </span>
          </div>
        </section>

        {/* =====================================================
            WELCOME BANNER
        ===================================================== */}

        <section className="relative mt-4 overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-sm">
          <div className="absolute right-0 top-0 h-full w-1 bg-[#E4EFFF]" />

          <div className="px-4 py-5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-[#E4EFFF] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[1px] text-[#2462AC]">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-100" />
              Your career starts here
            </span>

            <h2 className="mt-3 text-[26px] font-extrabold leading-[1.16] tracking-tight text-[#102448]">
              Find the right job.
              <br />
              <span className="text-[#2462AC]">
                Build your career.
              </span>
            </h2>

            <p className="mt-3 text-[12px] leading-[1.8] text-blue-700">
              Discover employment opportunities, explore suitable
              roles and connect with employers through a simple
              job-search experience.
            </p>

            <button
              type="button"
              onClick={onJobsClick}
              className="
                mt-4 inline-flex min-h-10 w-full
                items-center justify-center gap-2
                rounded-xl bg-[#2462AC] px-4 py-2.5
                text-[12px] font-bold text-white
                shadow-sm transition duration-200
                hover:bg-[#2462AC] hover:shadow-md
                active:scale-[0.98]
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-blue-700 focus-visible:ring-offset-2
              "
            >
              Explore Jobs
              <ArrowRight size={15} />
            </button>

            <p className="mt-2 text-center text-[10px] font-medium text-blue-700">
              Simple. Accessible. Career-focused.
            </p>
          </div>
        </section>

        {/* =====================================================
            ABOUT WEBSITE
        ===================================================== */}

        <section className="mt-6">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-5 w-1 rounded-full bg-[#E4EFFF]" />
            <p className="text-[10px] font-bold uppercase tracking-[1.3px] text-blue-700">
              About {websiteName}
            </p>
          </div>

          <article className="rounded-2xl border border-blue-200/80 bg-white p-4 shadow-sm">
            <h2 className="text-[19px] font-extrabold leading-snug tracking-tight text-[#102448]">
              Built to connect people with opportunities.
            </h2>

            <p className="mt-3 text-[12px] leading-[1.8] text-blue-700">
              {websiteName} is a job-search platform created to make
              finding employment opportunities simple, fast and
              accessible for everyone.
            </p>

            <p className="mt-3 text-[12px] leading-[1.8] text-blue-700">
              Candidates can discover relevant jobs based on
              designation, location, experience and other important
              job requirements.
            </p>
          </article>
        </section>

        {/* =====================================================
            OUR PURPOSE
        ===================================================== */}

        <section className="mt-4">
          <article className="rounded-2xl border border-blue-200 bg-[#E4EFFF] p-4 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E4EFFF] text-[#2462AC]">
              <Compass size={21} />
            </div>

            <h2 className="mt-3 text-[17px] font-extrabold text-[#102448]">
              Our Purpose
            </h2>

            <p className="mt-2 text-[12px] leading-[1.8] text-blue-700">
              Make the job-search process more straightforward by
              helping job seekers and employers find relevant
              opportunities in one place.
            </p>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white">
              <div className="h-full w-2/3 rounded-full bg-[#E4EFFF]" />
            </div>

            <p className="mt-2 text-[10px] font-medium text-blue-700">
              Connecting talent with opportunity
            </p>
          </article>
        </section>

        {/* =====================================================
            HOW WEBSITE WORKS
        ===================================================== */}

        <section className="mt-7">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[1.3px] text-[#2462AC]">
              Getting started
            </p>

            <h2 className="mt-1 text-[21px] font-extrabold tracking-tight text-[#102448]">
              How {websiteName} Works
            </h2>

            <p className="mt-1 text-[11px] text-blue-700">
              Four simple steps to get started.
            </p>
          </div>

          <div className="mt-4 space-y-3">
            {steps.map((step) => {
              const Icon = step.icon

              return (
                <article
                  key={step.number}
                  className="
                    group flex gap-3 rounded-2xl
                    border border-blue-200/80 bg-white
                    p-3.5 shadow-sm
                    transition duration-200
                    hover:border-blue-200 hover:shadow-md
                  "
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E4EFFF] text-[#2462AC] transition-colors group-hover:bg-[#E4EFFF]">
                    <Icon size={19} strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-[13px] font-bold leading-5 text-[#102448]">
                        {step.title}
                      </h3>

                      <span className="shrink-0 text-[10px] font-extrabold tracking-wide text-blue-300">
                        {step.number}
                      </span>
                    </div>

                    <p className="mt-1.5 text-[11px] leading-[1.7] text-blue-700">
                      {step.description}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* =====================================================
            FOR JOB SEEKERS
        ===================================================== */}

        <section className="mt-7 overflow-hidden rounded-2xl border border-blue-200 bg-[#E4EFFF]">
          <div className="p-4">
            <span className="inline-flex rounded-full border border-blue-200 bg-white/80 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-[#2462AC]">
              For job seekers
            </span>

            <h2 className="mt-3 text-[20px] font-extrabold leading-snug tracking-tight text-[#102448]">
              Your next career move starts here.
            </h2>

            <p className="mt-2 text-[12px] leading-[1.8] text-blue-700">
              Build your profile and explore jobs that match your
              experience, career goals and preferred location.
            </p>

            <div className="mt-4 space-y-3">
              {seekerBenefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2462AC] text-white">
                    <Check size={12} strokeWidth={3} />
                  </span>

                  <span className="text-[12px] font-medium leading-5 text-blue-800">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={onJobsClick}
              className="
                mt-5 inline-flex min-h-10 w-full
                items-center justify-center gap-2
                rounded-xl bg-[#102448] px-4 py-2.5
                text-[12px] font-bold text-white
                transition duration-200
                hover:bg-[#102448] active:scale-[0.98]
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-blue-900 focus-visible:ring-offset-2
              "
            >
              Browse Available Jobs
              <ArrowRight size={15} />
            </button>
          </div>
        </section>

        {/* =====================================================
            FOR EMPLOYERS
        ===================================================== */}

        <section className="mt-7">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[1.3px] text-[#2462AC]">
              For employers
            </p>

            <h2 className="mt-1 text-[21px] font-extrabold tracking-tight text-[#102448]">
              Make Hiring Accessible
            </h2>

            <p className="mt-2 text-[12px] leading-[1.8] text-blue-700">
              Share employment opportunities and connect with
              candidates based on your requirements.
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2.5">
            {employerFeatures.map((feature) => {
              const Icon = feature.icon

              return (
                <article
                  key={feature.title}
                  className="
                    rounded-2xl border border-blue-200/80
                    bg-white p-3 shadow-sm
                    transition duration-200
                    hover:border-blue-200 hover:shadow-md
                  "
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E4EFFF] text-[#2462AC]">
                    <Icon size={18} strokeWidth={1.8} />
                  </div>

                  <h3 className="mt-3 text-[12px] font-bold leading-5 text-[#102448]">
                    {feature.title}
                  </h3>

                  <p className="mt-1.5 text-[10px] leading-[1.7] text-blue-700">
                    {feature.description}
                  </p>
                </article>
              )
            })}
          </div>
        </section>

        {/* =====================================================
            CLOSING BANNER
        ===================================================== */}

        <section className="relative mt-7 overflow-hidden rounded-2xl bg-[#102448] p-5 text-white shadow-sm">
          <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-[#E4EFFF]/10" />

          <div className="pointer-events-none absolute -bottom-12 right-16 h-24 w-24 rounded-full bg-[#2462AC]/20" />

          <div className="relative">
            <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#2462AC]">
              Start your journey
            </span>

            <h2 className="mt-2 text-[22px] font-extrabold leading-tight tracking-tight">
              Find opportunities that move you forward.
            </h2>

            <p className="mt-3 text-[12px] leading-[1.8] text-blue-300">
              Explore available jobs, discover suitable roles and
              take the next step towards your career goals.
            </p>

            <button
              type="button"
              onClick={onJobsClick}
              className="
                mt-5 inline-flex min-h-10 w-full
                items-center justify-center gap-2
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
              <ArrowRight size={15} />
            </button>
          </div>
        </section>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <footer className="mt-7 border-t border-blue-200 py-5 text-center">
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-[#E4EFFF] text-sm font-extrabold text-blue-900">
            {websiteInitial}
          </div>

          <h3 className="mt-2 text-[15px] font-extrabold tracking-tight text-[#102448]">
            {websiteName}
          </h3>

          <p className="mt-1 text-[11px] leading-5 text-blue-700">
            {websiteTagline}
          </p>

          <div className="mt-3 flex items-center justify-center gap-1.5 text-[9px] text-blue-400">
            <ShieldCheck size={12} />
            <span>
              © {new Date().getFullYear()} {websiteName}. All rights reserved.
            </span>
          </div>
        </footer>
      </main>

      {/* =====================================================
          EXISTING MOBILE BOTTOM NAVIGATION
      ===================================================== */}

      <Mobile_Bottom_Navigation
        activeTab="home"
        onHomeClick={() => {}}
        onJobsClick={onJobsClick}
        onProfileClick={onProfileClick}
      />
    </div>
  )
}

export default Mobile_Sidebar_Home
