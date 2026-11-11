
import React from 'react'
import Desktop_Bottom_Navigation from '../Desktop_Bottom_Navigation'
import WEBSITE_CONFIG from '../../../../inputs/overall/Website_Config'

function Desktop_Sidebar_Developer_Details({
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

  return (
    <div className="min-h-screen bg-[#F4F8FF] pb-24 font-sans text-[#102448]">
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

        .technology-track:hover {
          animation-play-state: paused;
        }

        .technology-window:hover .technology-track {
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
        <div className="mx-auto flex h-[64px] max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={onMenuClick}
              aria-label="Open menu"
              className="flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-[5px] rounded-xl bg-[#102448] transition hover:bg-blue-900 active:scale-95"
            >
              <span className="h-[2px] w-5 rounded-full bg-white" />
              <span className="h-[2px] w-5 rounded-full bg-white" />
              <span className="h-[2px] w-5 rounded-full bg-white" />
            </button>

            <div className="min-w-0">
              <h1 className="truncate text-[19px] font-extrabold tracking-tight text-[#102448] sm:text-[22px]">
                {website.name}
              </h1>
              <p className="text-[10px] text-blue-900/65 sm:text-[11px]">
                {website.tagline}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onJobsClick}
            className="flex shrink-0 items-center gap-2 rounded-xl bg-[#102448] px-3.5 py-2.5 text-[11px] font-bold text-white transition hover:bg-blue-900 active:scale-95 sm:px-5 sm:text-xs"
          >
            Explore Jobs
            <span className="text-[#2462AC]">↗</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-4 pb-8 pt-[84px] sm:px-6 lg:px-8">

        {/* PAGE INTRO */}
        <section className="relative overflow-hidden rounded-2xl border border-blue-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="absolute right-0 top-0 h-1 w-36 rounded-bl-full bg-[#2462AC]" />

          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[1.5px] text-[#2462AC]">
            <span className="h-2 w-2 rounded-full bg-[#2462AC]" />
            About the creator
          </div>

          <h2 className="mt-3 text-[27px] font-extrabold tracking-tight text-[#102448] sm:text-[35px]">
            Developer <span className="text-[#2462AC]">Profile</span>
          </h2>

          <p className="mt-2 max-w-xl text-[12px] leading-6 text-blue-700 sm:text-[13px]">
            The developer behind {website.name}, focused on building
            simple, useful, and accessible job-search experiences.
          </p>
        </section>

        {/* PROFILE AND OVERVIEW */}
        <section className="mt-4 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">

          {/* PROFILE CARD */}
          <article className="rounded-2xl border border-blue-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-2xl bg-[#E4EFFF] text-[23px] font-black text-[#102448]">
                TA
              </div>

              <div className="min-w-0">
                <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-blue-800">
                  Developer
                </span>
                <h3 className="mt-2 text-[21px] font-extrabold tracking-tight text-[#102448]">
                  Tejas A N
                </h3>
                <p className="mt-1 text-[11px] text-blue-700">
                  Full-Stack Web Developer
                </p>
              </div>
            </div>

            <div className="my-5 border-t border-blue-100" />

            <div className="space-y-3">
              <a
                href="mailto:tejastejas2828@gmail.com"
                className="group flex items-center gap-3 rounded-xl border border-blue-100 p-3 transition hover:border-blue-200 hover:bg-blue-50/50"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E4EFFF] text-[17px] font-bold text-[#2462AC]">
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

                <span className="text-sm text-blue-400 transition group-hover:translate-x-0.5 group-hover:text-[#2462AC]">
                  ↗
                </span>
              </a>

              <a
                href="tel:+919591362918"
                className="group flex items-center gap-3 rounded-xl border border-blue-100 p-3 transition hover:border-blue-200 hover:bg-blue-100/50"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E4EFFF] text-[17px] text-[#2462AC]">
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

                <span className="text-sm text-blue-400 transition group-hover:text-[#2462AC]">
                  ↗
                </span>
              </a>

              <a
                href="https://wonderweb-technologies.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-blue-100 p-3 transition hover:border-blue-200 hover:bg-blue-50/50"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E4EFFF] text-lg text-[#2462AC]">
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
            </div>
          </article>

          {/* DEVELOPMENT OVERVIEW */}
          <article className="flex flex-col rounded-2xl border border-blue-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#102448] text-[16px] font-bold text-[#2462AC]">
                {'</>'}
              </div>

              <div>
                <h3 className="text-[16px] font-extrabold text-[#102448]">
                  About the Project
                </h3>
                <p className="mt-1 text-[11px] text-blue-700">
                  Designed for easier job discovery
                </p>
              </div>
            </div>

            <p className="mt-4 text-[12px] leading-6 text-blue-700 sm:text-[13px]">
              {website.name} connects job seekers with employment
              opportunities through a straightforward interface.
              The application combines modern frontend development,
              backend services, and database technology.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                { label: 'Frontend', value: 'React.js' },
                { label: 'Backend', value: 'Spring Boot' },
                { label: 'Languages', value: 'Java & JavaScript' },
                { label: 'Database', value: 'MongoDB' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl bg-[#F4F8FF] p-3 transition hover:bg-[#E4EFFF]"
                >
                  <p className="text-[10px] font-medium text-blue-700">
                    {item.label}
                  </p>
                  <p className="mt-1.5 text-[12px] font-bold text-[#102448]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-5">
              <div className="flex items-center gap-3 rounded-xl bg-[#102448] p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E4EFFF] text-lg text-blue-900">
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

        {/* CONTINUOUS TECHNOLOGY CAROUSEL */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-blue-200 bg-white py-5 shadow-sm sm:py-6">
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#2462AC]">
                My development toolkit
              </p>
              <h2 className="mt-1 text-[20px] font-extrabold tracking-tight text-[#102448] sm:text-[23px]">
                Technologies I Use
              </h2>
            </div>

            <span className="rounded-full bg-[#E4EFFF] px-3 py-1.5 text-[10px] font-bold text-[#2462AC]">
              05 Technologies
            </span>
          </div>

          <div className="technology-window mt-5 overflow-hidden">
            <div className="technology-track flex gap-3 px-3">
              {[...technologies, ...technologies].map((technology, index) => (
                <article
                  key={`${technology.name}-${index}`}
                  aria-hidden={index >= technologies.length ? 'true' : undefined}
                  className="flex w-[190px] shrink-0 items-center gap-3 rounded-xl border border-blue-100 bg-white p-3 transition hover:border-blue-200 hover:bg-[#E4EFFF] sm:w-[215px] sm:p-4"
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
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

          <p className="mt-4 px-5 text-[10px] text-blue-400 sm:px-6">
            Move your pointer over the logos to pause the animation.
          </p>
        </section>

        {/* SIMPLE CTA */}
        <section className="mt-5 flex flex-col gap-4 rounded-2xl bg-[#102448] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#2462AC]">
              {website.name}
            </p>
            <h2 className="mt-2 text-[19px] font-extrabold tracking-tight text-white sm:text-[22px]">
              Connecting people with opportunities.
            </h2>
            <p className="mt-1.5 text-[11px] leading-5 text-blue-300">
              Find opportunities and take the next step in your career.
            </p>
          </div>

          <button
            type="button"
            onClick={onJobsClick}
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#E4EFFF] px-5 py-3 text-[12px] font-bold text-blue-900 transition hover:bg-[#E4EFFF] active:scale-[0.98]"
          >
            Explore Jobs <span>→</span>
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
          <p className="mt-2 text-[10px] text-blue-400">
            © {new Date().getFullYear()} {website.name}. All rights reserved.
          </p>
        </footer>
      </main>

      <Desktop_Bottom_Navigation
        activeTab=""
        onHomeClick={onHomeClick}
        onJobsClick={onJobsClick}
        onProfileClick={onProfileClick}
      />
    </div>
  )
}

export default Desktop_Sidebar_Developer_Details
