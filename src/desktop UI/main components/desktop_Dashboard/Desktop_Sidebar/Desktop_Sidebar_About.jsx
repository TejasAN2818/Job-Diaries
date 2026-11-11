
import React from 'react'
import Desktop_Bottom_Navigation from '../Desktop_Bottom_Navigation'
import WEBSITE_CONFIG from '../../../../inputs/overall/Website_Config'

function Desktop_Sidebar_About({
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
    <div className="min-h-screen bg-[#F4F8FF] pb-20 font-sans text-[#102448]">

      {/* HEADER */}
      <header className="fixed inset-x-0 top-0 z-[100] border-b border-blue-200/60 bg-[#E4EFFF]">
        <div className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Menu and website branding */}
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={onMenuClick}
              aria-label="Open menu"
              className="
                flex h-10 w-10 shrink-0 flex-col items-center
                justify-center gap-[5px] rounded-xl bg-[#102448]
                shadow-sm transition duration-200
                hover:bg-blue-900 hover:shadow-md active:scale-95
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
                {website.name}
              </h1>
              <p className="mt-0.5 text-[10px] font-medium text-blue-900/70 sm:text-[11px]">
                {website.tagline}
              </p>
            </div>
          </div>

          {/* Post Jobs */}
          <button
            type="button"
            onClick={onJobsClick}
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

      {/* ABOUT CONTENT */}
      <main className="mx-auto max-w-[1200px] px-4 pb-8 pt-[88px] sm:px-6 lg:px-8">

        {/* Introduction */}
        <section className="overflow-hidden rounded-2xl border border-blue-200/80 bg-white shadow-sm">
          <div className="h-1.5 bg-[#E4EFFF]" />

          <div className="p-5 sm:p-7">
            <div className="flex items-center gap-2">
              <span className="h-5 w-1 rounded-full bg-[#2462AC]" />
              <p className="text-[10px] font-bold uppercase tracking-[1.3px] text-blue-700">
                Get to know us
              </p>
            </div>

            <h2 className="mt-3 text-[27px] font-extrabold leading-tight tracking-tight text-[#102448] sm:text-[32px]">
              About {website.name}
            </h2>

            <p className="mt-3 max-w-3xl text-[12px] leading-6 text-blue-700 sm:text-[13px]">
              {website.name} is a job-search platform designed to help job
              seekers discover employment opportunities and connect with
              suitable employers.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-[#E4EFFF] px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2462AC]" />
              <span className="text-[10px] font-semibold text-blue-800">
                {website.tagline}
              </span>
            </div>
          </div>
        </section>

        {/* About sections */}
        <section className="mt-7">
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-[1.3px] text-[#2462AC]">
              What we stand for
            </p>
            <h2 className="mt-1 text-[21px] font-extrabold tracking-tight text-[#102448]">
              Our platform, our purpose
            </h2>
            <p className="mt-2 max-w-2xl text-[12px] leading-6 text-blue-700">
              Learn more about our purpose and how the platform supports job
              seekers in exploring available opportunities.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {sections.map((section) => (
              <article
                key={section.number}
                className="
                  group rounded-2xl border border-blue-200/80
                  bg-white p-5 shadow-sm
                  transition duration-200
                  hover:-translate-y-0.5 hover:border-blue-200
                  hover:shadow-md
                "
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="
                    flex h-10 w-10 shrink-0 items-center
                    justify-center rounded-xl bg-[#E4EFFF]
                    text-[19px] font-semibold text-[#2462AC]
                    transition-colors group-hover:bg-[#E4EFFF]
                  ">
                    {section.icon}
                  </span>

                  <span className="text-[10px] font-bold tracking-wide text-blue-300">
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

        {/* Closing section */}
        <section className="relative mt-7 overflow-hidden rounded-2xl bg-[#102448] p-5 text-white sm:p-7">
          <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full bg-[#E4EFFF]/10" />
          <div className="absolute -bottom-12 right-20 h-28 w-28 rounded-full bg-[#2462AC]/20" />

          <div className="relative">
            <span className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#2462AC]">
              Our commitment
            </span>

            <h2 className="mt-3 max-w-xl text-[21px] font-extrabold leading-tight tracking-tight sm:text-[25px]">
              Connecting people with better opportunities.
            </h2>

            <p className="mt-3 max-w-2xl text-[12px] leading-6 text-blue-300">
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
        <footer className="mt-8 border-t border-blue-200 py-5 text-center">
          <h3 className="text-[14px] font-extrabold tracking-tight text-[#102448]">
            {website.name}
          </h3>

          <p className="mt-1 text-[11px] text-blue-700">
            {website.tagline}
          </p>

          <p className="mt-3 text-[10px] text-blue-400">
            © {new Date().getFullYear()} {website.name}. All rights reserved.
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

export default Desktop_Sidebar_About
