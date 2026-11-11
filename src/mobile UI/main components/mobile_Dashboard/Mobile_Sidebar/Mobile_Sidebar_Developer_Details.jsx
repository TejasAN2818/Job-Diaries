
import React from 'react'
import Mobile_Bottom_Navigation from '../Mobile_Bottom_Navigation'
import WEBSITE_CONFIG from '../../../../inputs/overall/Website_Config'

function Mobile_Sidebar_Developer_Details({
  onMenuClick,
  onHomeClick,
  onJobsClick,
  onProfileClick,
}) {
  const { website } = WEBSITE_CONFIG

  const technologies = [
    {
      name: 'React.js',
      category: 'Frontend',
      logo: 'https://cdn.simpleicons.org/react/149ECA',
      color: '#EAF8FF',
    },
    {
      name: 'Spring Boot',
      category: 'Backend',
      logo: 'https://cdn.simpleicons.org/springboot/6DB33F',
      color: '#E4EFFF',
    },
    {
      name: 'Java',
      category: 'Programming',
      logo: 'https://cdn.simpleicons.org/openjdk/437291',
      color: '#EEF3FA',
    },
    {
      name: 'JavaScript',
      category: 'Programming',
      logo: 'https://cdn.simpleicons.org/javascript/D6B800',
      color: '#E4EFFF',
    },
    {
      name: 'MongoDB',
      category: 'Database',
      logo: 'https://cdn.simpleicons.org/mongodb/47A248',
      color: '#E4EFFF',
    },
  ]

  const projectDetails = [
    { label: 'Frontend', value: 'React.js' },
    { label: 'Backend', value: 'Spring Boot' },
    { label: 'Languages', value: 'Java & JavaScript' },
    { label: 'Database', value: 'MongoDB' },
  ]

  return (
    <div className="min-h-screen w-full bg-[#F4F8FF] pb-24 font-sans text-[#102448]">

      {/* TECHNOLOGY CAROUSEL ANIMATION */}
      <style>{`
        @keyframes technology-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .technology-track {
          width: max-content;
          animation: technology-marquee 25s linear infinite;
          will-change: transform;
        }

        .technology-window:active .technology-track {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .technology-track {
            animation: none;
          }
        }
      `}</style>

      {/* HEADER */}
      <header className="fixed inset-x-0 top-0 z-[100] border-b border-blue-200/50 bg-[#E4EFFF]">
        <div className="flex h-[58px] items-center justify-between px-3">

          {/* MENU AND BRANDING */}
          <div className="flex min-w-0 items-center gap-2.5">
            <button
              type="button"
              onClick={onMenuClick}
              aria-label="Open menu"
              className="
                flex h-9 w-9 shrink-0 flex-col items-center
                justify-center gap-[4px] rounded-xl bg-[#102448]
                transition duration-200 hover:bg-blue-900
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
              <h1 className="truncate text-[17px] font-extrabold tracking-tight text-[#102448]">
                {website.name}
              </h1>
              <p className="truncate text-[9px] font-medium text-blue-900/65">
                {website.tagline}
              </p>
            </div>
          </div>

          {/* EXPLORE JOBS */}
          <button
            type="button"
            onClick={onJobsClick}
            className="
              flex shrink-0 items-center gap-1.5 rounded-xl
              bg-[#102448] px-3 py-2.5 text-[10px]
              font-bold text-white transition duration-200
              hover:bg-blue-900 active:scale-95
            "
          >
            Explore Jobs
            <span className="text-[#2462AC]" aria-hidden="true">↗</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="mx-auto w-full max-w-[600px] px-4 pb-6 pt-[74px]">

        {/* PAGE INTRODUCTION */}
        <section className="relative overflow-hidden rounded-2xl border border-blue-200 bg-white p-4 shadow-sm">

          <div className="absolute right-0 top-0 h-1 w-28 rounded-bl-full bg-[#2462AC]" />

          <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[1.3px] text-[#2462AC]">
            <span className="h-2 w-2 rounded-full bg-[#2462AC]" />
            About the creator
          </div>

          <h2 className="mt-3 text-[26px] font-extrabold leading-tight tracking-tight text-[#102448]">
            Developer <span className="text-[#2462AC]">Profile</span>
          </h2>

          <p className="mt-2 text-[12px] leading-[1.8] text-blue-700">
            The developer behind {website.name}, focused on building
            simple, useful, and accessible job-search experiences.
          </p>
        </section>

        {/* DEVELOPER PROFILE */}
        <section className="mt-4 flex flex-col gap-4">

          {/* PROFILE CARD */}
          <article className="rounded-2xl border border-blue-200 bg-white p-4 shadow-sm">

            <div className="flex items-center gap-3">
              <div className="
                flex h-[66px] w-[66px] shrink-0 items-center
                justify-center rounded-2xl bg-[#E4EFFF]
                text-[23px] font-black text-[#102448]
              ">
                TA
              </div>

              <div className="min-w-0">
                <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-blue-800">
                  Developer
                </span>

                <h3 className="mt-2 text-[20px] font-extrabold leading-tight tracking-tight text-[#102448]">
                  Tejas A N
                </h3>

                <p className="mt-1 text-[11px] text-blue-700">
                  Full-Stack Web Developer
                </p>
              </div>
            </div>

            <div className="my-5 border-t border-blue-100" />

            {/* EMAIL */}
            <a
              href="mailto:tejastejas2828@gmail.com"
              className="
                group flex min-w-0 items-center gap-3 rounded-xl
                border border-blue-100 p-3 transition
                hover:border-blue-200 hover:bg-blue-50/50
              "
            >
              <span className="
                flex h-10 w-10 shrink-0 items-center
                justify-center rounded-xl bg-[#E4EFFF]
                text-[17px] font-bold text-[#2462AC]
              ">
                @
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[10px] text-blue-400">
                  Email address
                </span>
                <span className="mt-1 block break-all text-[12px] font-semibold text-[#102448] group-hover:text-[#2462AC]">
                  tejastejas2818@gmail.com
                </span>
              </span>

              <span className="shrink-0 text-sm text-blue-400 transition group-hover:translate-x-0.5 group-hover:text-[#2462AC]">
                ↗
              </span>
            </a>

            {/* CONTACT NUMBER */}
            <a
              href="tel:+919591362918"
              className="
                group mt-3 flex min-w-0 items-center gap-3
                rounded-xl border border-blue-100 p-3
                transition hover:border-blue-200
                hover:bg-blue-100/50
              "
            >
              <span className="
                flex h-10 w-10 shrink-0 items-center
                justify-center rounded-xl bg-[#E4EFFF]
                text-[17px] text-[#2462AC]
              ">
                ☎
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[10px] text-blue-400">
                  Contact number
                </span>
                <span className="mt-1 block text-[12px] font-semibold text-[#102448]">
                  +91 9591362918
                </span>
              </span>

              <span className="shrink-0 text-sm text-blue-400 transition group-hover:text-[#2462AC]">
                ↗
              </span>
            </a>

            {/* LIVE WEBSITE */}
            <a
              href="https://wonderweb-technologies.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group mt-3 flex min-w-0 items-center gap-3
                rounded-xl border border-blue-100 p-3
                transition hover:border-blue-200
                hover:bg-blue-50/50
              "
            >
              <span className="
                flex h-10 w-10 shrink-0 items-center
                justify-center rounded-xl bg-[#E4EFFF]
                text-lg text-[#2462AC]
              ">
                ↗
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[10px] text-blue-400">
                  Live website
                </span>
                <span className="mt-1 block break-all text-[12px] font-semibold text-[#102448] group-hover:text-[#2462AC]">
                  wonderweb-technologies.vercel.app
                </span>
              </span>
            </a>
          </article>

          {/* PROJECT OVERVIEW */}
          <article className="flex flex-col rounded-2xl border border-blue-200 bg-white p-4 shadow-sm">

            <div className="flex items-center gap-3">
              <div className="
                flex h-11 w-11 shrink-0 items-center
                justify-center rounded-xl bg-[#102448]
                text-[16px] font-bold text-[#2462AC]
              ">
                {'</>'}
              </div>

              <div className="min-w-0">
                <h3 className="text-[16px] font-extrabold text-[#102448]">
                  About the Project
                </h3>
                <p className="mt-1 text-[11px] text-blue-700">
                  Designed for easier job discovery
                </p>
              </div>
            </div>

            <p className="mt-4 text-[12px] leading-6 text-blue-700">
              {website.name} connects job seekers with employment
              opportunities through a straightforward interface.
              The application combines modern frontend development,
              backend services, and database technology.
            </p>

            {/* PROJECT TECHNOLOGY SUMMARY */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              {projectDetails.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl bg-[#F4F8FF] p-3 transition hover:bg-[#E4EFFF]"
                >
                  <p className="text-[10px] font-medium text-blue-700">
                    {item.label}
                  </p>
                  <p className="mt-1.5 break-words text-[12px] font-bold text-[#102448]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* PROJECT HIGHLIGHT */}
            <div className="mt-5 rounded-xl bg-[#102448] p-4">
              <div className="flex items-center gap-3">
                <div className="
                  flex h-9 w-9 shrink-0 items-center
                  justify-center rounded-lg bg-[#E4EFFF]
                  text-lg text-blue-900
                ">
                  ✓
                </div>

                <div>
                  <p className="text-[12px] font-bold text-white">
                    Built for better job discovery
                  </p>
                  <p className="mt-1 text-[10px] leading-5 text-blue-300">
                    A simple experience with practical functionality.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </section>

        {/* TECHNOLOGY CAROUSEL */}
        <section className="mt-5 overflow-hidden rounded-2xl border border-blue-200 bg-white py-5 shadow-sm">

          <div className="flex items-start justify-between gap-2 px-4">
            <div className="min-w-0">
              <p className="text-[9px] font-bold uppercase tracking-[1.3px] text-[#2462AC]">
                My development toolkit
              </p>

              <h2 className="mt-1 text-[20px] font-extrabold leading-tight tracking-tight text-[#102448]">
                Technologies I Use
              </h2>
            </div>

            <span className="shrink-0 rounded-full bg-[#E4EFFF] px-2.5 py-1.5 text-[9px] font-bold text-[#2462AC]">
              05 Technologies
            </span>
          </div>

          <div className="technology-window mt-5 overflow-hidden">
            <div className="technology-track flex gap-3 px-3">
              {[...technologies, ...technologies].map((technology, index) => (
                <article
                  key={`${technology.name}-${index}`}
                  aria-hidden={index >= technologies.length ? 'true' : undefined}
                  className="
                    flex w-[180px] shrink-0 items-center gap-3
                    rounded-xl border border-blue-100 bg-white p-3
                    transition hover:border-blue-200
                    hover:bg-[#E4EFFF]
                  "
                >
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: technology.color }}
                  >
                    <img
                      src={technology.logo}
                      alt={index < technologies.length ? `${technology.name} logo` : ''}
                      loading="lazy"
                      className="h-7 w-7 object-contain"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-[12px] font-extrabold text-[#102448]">
                      {technology.name}
                    </h3>
                    <p className="mt-1 text-[10px] font-medium text-blue-700">
                      {technology.category}
                    </p>
                    <span className="mt-2 block h-1 w-8 rounded-full bg-[#2462AC]" />
                  </div>
                </article>
              ))}
            </div>
          </div>

          <p className="mt-4 px-4 text-[10px] leading-5 text-blue-400">
            Touch and hold the technology cards to pause the animation.
          </p>
        </section>

        {/* CALL TO ACTION */}
        <section className="mt-5 flex flex-col gap-4 rounded-2xl bg-[#102448] p-5">

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[1.4px] text-[#2462AC]">
              {website.name}
            </p>

            <h2 className="mt-2 text-[20px] font-extrabold leading-tight tracking-tight text-white">
              Connecting people with opportunities.
            </h2>

            <p className="mt-2 text-[11px] leading-5 text-blue-300">
              Find opportunities and take the next step in your career.
            </p>
          </div>

          <button
            type="button"
            onClick={onJobsClick}
            className="
              inline-flex min-h-11 w-full items-center
              justify-center gap-2 rounded-xl bg-[#E4EFFF]
              px-5 py-3 text-[12px] font-bold text-blue-900
              transition hover:bg-[#E4EFFF]
              active:scale-[0.98]
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-blue-200
            "
          >
            Explore Jobs
            <span aria-hidden="true">→</span>
          </button>
        </section>

        {/* FOOTER */}
        <footer className="mt-7 border-t border-blue-200 py-5 text-center">
          <p className="text-[12px] font-bold text-[#102448]">
            {website.name}
          </p>

          <p className="mt-1 text-[10px] text-blue-700">
            {website.tagline}
          </p>

          <p className="mt-2 text-[10px] leading-5 text-blue-400">
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

export default Mobile_Sidebar_Developer_Details
