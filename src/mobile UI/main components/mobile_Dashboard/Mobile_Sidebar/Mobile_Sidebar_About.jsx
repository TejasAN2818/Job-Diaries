
import React from 'react'
import Mobile_Bottom_Navigation from '../Mobile_Bottom_Navigation'
import WEBSITE_CONFIG from '../../../../inputs/overall/Website_Config'

function Mobile_Sidebar_About({
  onMenuClick,
  onHomeClick,
  onJobsClick,
  onProfileClick,
}) {
  const { website } = WEBSITE_CONFIG

  const sections = [
    {
      number: '01',
      title: 'Our Purpose',
      description:
        'Our goal is to make the job-searching process simple, convenient and accessible for job seekers.',
      icon: '◎',
    },
    {
      number: '02',
      title: 'Job Opportunities',
      description:
        'Users can explore job opportunities based on designation, location, salary, experience and other available job requirements.',
      icon: '↗',
    },
    {
      number: '03',
      title: 'For Job Seekers',
      description:
        `${website.name} helps candidates discover relevant jobs and submit applications to available opportunities.`,
      icon: '✓',
    },
    {
      number: '04',
      title: 'Our Vision',
      description:
        'We aim to create a simple and useful platform that connects job seekers with employment opportunities.',
      icon: '◇',
    },
  ]

  return (
    <div className="min-h-screen w-full bg-[#F4F8FF] pb-24 font-sans text-[#102448]">

      {/* HEADER */}
      <header className="fixed inset-x-0 top-0 z-[100] border-b border-blue-200/60 bg-[#E4EFFF]">
        <div className="flex h-[58px] items-center justify-between px-3">

          {/* MENU AND WEBSITE BRANDING */}
          <div className="flex min-w-0 items-center gap-2.5">
            <button
              type="button"
              onClick={onMenuClick}
              aria-label="Open menu"
              className="
                flex h-9 w-9 shrink-0 flex-col items-center
                justify-center gap-[4px] rounded-xl bg-[#102448]
                shadow-sm transition duration-200
                hover:bg-blue-900 active:scale-95
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
                {website.name}
              </h1>

              <p className="mt-0.5 truncate text-[9px] font-medium text-blue-900/70">
                {website.tagline}
              </p>
            </div>
          </div>

          {/* POST JOBS */}
          <button
            type="button"
            onClick={onJobsClick}
            className="
              flex shrink-0 items-center gap-1.5 rounded-full
              bg-blue-900 px-2.5 py-2 text-[10px] font-bold text-white
              shadow-sm transition duration-200
              hover:bg-blue-900 active:scale-95
            "
          >
            Post Jobs

            <span className="rounded-full bg-[#E4EFFF] px-2 py-1 text-[9px] font-extrabold leading-none text-blue-900">
              Free
            </span>
          </button>
        </div>
      </header>

      {/* ABOUT CONTENT */}
      <main className="mx-auto w-full max-w-[600px] px-4 pb-6 pt-[76px]">

        {/* INTRODUCTION */}
        <section className="overflow-hidden rounded-2xl border border-blue-200/80 bg-white shadow-sm">
          <div className="h-1.5 bg-[#E4EFFF]" />

          <div className="p-4">
            <div className="flex items-center gap-2">
              <span className="h-5 w-1 rounded-full bg-[#2462AC]" />

              <p className="text-[9px] font-bold uppercase tracking-[1.2px] text-blue-700">
                Get to know us
              </p>
            </div>

            <h2 className="mt-3 text-[26px] font-extrabold leading-tight tracking-tight text-[#102448]">
              About {website.name}
            </h2>

            <p className="mt-3 text-[12px] leading-[1.8] text-blue-700">
              {website.name} is a job-search platform designed to help job
              seekers discover employment opportunities and connect with
              suitable employers.
            </p>

            <div className="mt-4 inline-flex max-w-full items-center gap-2 rounded-full border border-blue-200 bg-[#E4EFFF] px-3 py-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#2462AC]" />

              <span className="text-[10px] font-semibold leading-4 text-blue-800">
                {website.tagline}
              </span>
            </div>
          </div>
        </section>

        {/* ABOUT SECTIONS */}
        <section className="mt-6">

          {/* SECTION HEADING */}
          <div className="mb-4">
            <p className="text-[9px] font-bold uppercase tracking-[1.2px] text-[#2462AC]">
              What we stand for
            </p>

            <h2 className="mt-1.5 text-[20px] font-extrabold leading-tight tracking-tight text-[#102448]">
              Our platform, our purpose
            </h2>

            <p className="mt-2 text-[12px] leading-[1.8] text-blue-700">
              Learn more about our purpose and how the platform supports job
              seekers in exploring available opportunities.
            </p>
          </div>

          {/* PURPOSE CARDS */}
          <div className="grid grid-cols-1 gap-3">
            {sections.map((section) => (
              <article
                key={section.number}
                className="
                  group rounded-2xl border border-blue-200/80
                  bg-white p-4 shadow-sm
                  transition duration-200
                  hover:border-blue-200 hover:shadow-md
                  active:scale-[0.99]
                "
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="
                    flex h-11 w-11 shrink-0 items-center
                    justify-center rounded-xl bg-[#E4EFFF]
                    text-[20px] font-semibold text-[#2462AC]
                    transition-colors duration-200
                    group-hover:bg-[#E4EFFF]
                  ">
                    {section.icon}
                  </span>

                  <span className="pt-1 text-[10px] font-bold tracking-wide text-blue-300">
                    {section.number}
                  </span>
                </div>

                <h3 className="mt-4 text-[14px] font-bold text-[#102448]">
                  {section.title}
                </h3>

                <p className="mt-2 text-[12px] leading-[1.8] text-blue-700">
                  {section.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* CLOSING SECTION */}
        <section className="relative mt-6 overflow-hidden rounded-2xl bg-[#102448] p-5 text-white">

          {/* BACKGROUND DECORATIONS */}
          <div className="pointer-events-none absolute -right-8 -top-10 h-36 w-36 rounded-full bg-[#E4EFFF]/10" />

          <div className="pointer-events-none absolute -bottom-12 right-12 h-28 w-28 rounded-full bg-[#2462AC]/20" />

          <div className="relative">
            <span className="text-[9px] font-bold uppercase tracking-[1.3px] text-[#2462AC]">
              Our commitment
            </span>

            <h2 className="mt-3 text-[21px] font-extrabold leading-tight tracking-tight text-white">
              Connecting people with better opportunities.
            </h2>

            <p className="mt-3 text-[12px] leading-[1.8] text-blue-300">
              We aim to provide a simple and useful platform where job seekers
              can explore roles that match their preferences and career goals.
            </p>

            <button
              type="button"
              onClick={onJobsClick}
              className="
                mt-5 inline-flex min-h-10 items-center gap-2
                rounded-xl bg-[#E4EFFF] px-4 py-2.5
                text-[12px] font-bold text-blue-900
                transition duration-200 hover:bg-[#E4EFFF]
                active:scale-[0.98]
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-blue-200 focus-visible:ring-offset-2
                focus-visible:ring-offset-[#102448]
              "
            >
              Explore Jobs
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-7 border-t border-blue-200 py-5 text-center">
          <h3 className="text-[14px] font-extrabold tracking-tight text-[#102448]">
            {website.name}
          </h3>

          <p className="mt-1 text-[11px] text-blue-700">
            {website.tagline}
          </p>

          <p className="mt-3 text-[10px] leading-5 text-blue-400">
            © {new Date().getFullYear()} {website.name}. All rights reserved.
          </p>
        </footer>

      </main>

      {/* EXISTING BOTTOM NAVIGATION */}
      <Mobile_Bottom_Navigation
        activeTab=""
        onHomeClick={onHomeClick}
        onJobsClick={onJobsClick}
        onProfileClick={onProfileClick}
      />

    </div>
  )
}

export default Mobile_Sidebar_About
