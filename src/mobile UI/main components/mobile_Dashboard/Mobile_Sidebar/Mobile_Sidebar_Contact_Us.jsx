
import React from 'react'
import Mobile_Bottom_Navigation from '../Mobile_Bottom_Navigation'
import WEBSITE_CONFIG from '../../../../inputs/overall/Website_Config'

function Mobile_Sidebar_Contact_Us({
  onMenuClick,
  onHomeClick,
  onJobsClick,
  onProfileClick,
}) {
  const { website, contact } = WEBSITE_CONFIG

  const contactTopics = [
    'Help with job search and applications',
    'Website issues or technical problems',
    'Suggestions and feedback',
    'General website enquiries',
  ]

  return (
    <div className="min-h-screen w-full bg-[#F4F8FF] pb-24 font-sans text-[#102448]">

      {/* HEADER */}
      <header className="fixed inset-x-0 top-0 z-[100] border-b border-blue-200/60 bg-[#E4EFFF]">
        <div className="flex h-[58px] items-center justify-between px-3">

          {/* MENU AND WEBSITE BRAND */}
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

      {/* CONTACT CONTENT */}
      <main className="mx-auto w-full max-w-[600px] px-4 pb-6 pt-[76px]">

        {/* PAGE INTRODUCTION */}
        <section className="overflow-hidden rounded-2xl border border-blue-200/80 bg-white shadow-sm">

          <div className="h-1.5 bg-[#E4EFFF]" />

          <div className="p-4">

            <div className="flex items-center gap-2">
              <span className="h-5 w-1 rounded-full bg-[#2462AC]" />

              <p className="text-[9px] font-bold uppercase tracking-[1.2px] text-blue-700">
                We're here to help
              </p>
            </div>

            <h2 className="mt-3 text-[26px] font-extrabold leading-tight tracking-tight text-[#102448]">
              Contact Us
            </h2>

            <p className="mt-3 text-[12px] leading-[1.8] text-blue-700">
              Have a question about {website.name}? Need help using our job
              portal, or want to share a suggestion? We'd love to hear from you.
              Reach out to us by email.
            </p>

          </div>
        </section>

        {/* CONTACT OPTIONS */}
        <section className="mt-4 grid grid-cols-1 gap-3">

          {/* EMAIL SUPPORT CARD */}
          <article className="
            group rounded-2xl border border-blue-200/80
            bg-white p-4 shadow-sm
            transition duration-200
            hover:border-blue-200 hover:shadow-md
          ">

            <div className="
              flex h-11 w-11 items-center justify-center
              rounded-xl bg-[#E4EFFF] text-xl font-bold
              text-[#2462AC] transition-colors
              group-hover:bg-[#E4EFFF]
            ">
              @
            </div>

            <h3 className="mt-4 text-[15px] font-bold text-[#102448]">
              Email Support
            </h3>

            <p className="mt-2 text-[12px] leading-[1.8] text-blue-700">
              Contact our website team for questions, technical assistance,
              feedback or other website-related enquiries.
            </p>

            <a
              href={`mailto:${contact.ownerEmail}`}
              className="
                mt-4 inline-flex max-w-full items-start gap-2
                break-all text-[12px] font-bold leading-5
                text-[#2462AC] transition-colors
                hover:text-[#2462AC]
                focus-visible:outline-none focus-visible:underline
              "
            >
              <span className="min-w-0 break-all">
                {contact.ownerEmail}
              </span>

              <span className="shrink-0" aria-hidden="true">
                ↗
              </span>
            </a>

            <p className="mt-3 text-[10px] leading-5 text-blue-400">
              Select the email address to contact us.
            </p>

          </article>

          {/* GENERAL ENQUIRIES CARD */}
          <article className="
            rounded-2xl border border-blue-200/80
            bg-white p-4 shadow-sm
          ">

            <div className="
              flex h-11 w-11 items-center justify-center
              rounded-xl bg-[#E4EFFF] text-lg font-bold
              text-[#2462AC]
            ">
              ?
            </div>

            <h3 className="mt-4 text-[15px] font-bold text-[#102448]">
              How can we help?
            </h3>

            <p className="mt-2 text-[12px] leading-[1.8] text-blue-700">
              You can contact us regarding:
            </p>

            <ul className="mt-3 space-y-3">
              {contactTopics.map((item) => (
                <li
                  key={item}
                  className="
                    flex items-start gap-2.5
                    text-[11px] leading-[1.7] text-blue-700
                  "
                >
                  <span className="
                    mt-0.5 flex h-4 w-4 shrink-0
                    items-center justify-center rounded-full
                    bg-[#E4EFFF] text-[9px] font-bold
                    text-[#2462AC]
                  ">
                    ✓
                  </span>

                  <span>{item}</span>
                </li>
              ))}
            </ul>

          </article>

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

export default Mobile_Sidebar_Contact_Us
