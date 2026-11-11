
import React from 'react'
import Desktop_Bottom_Navigation from '../Desktop_Bottom_Navigation'
import WEBSITE_CONFIG from '../../../../inputs/overall/Website_Config'

function Desktop_Sidebar_Contact_Us({
  onMenuClick,
  onHomeClick,
  onJobsClick,
  onProfileClick,
}) {
  const { website, contact } = WEBSITE_CONFIG

  return (
    <div className="min-h-screen bg-[#F4F8FF] pb-20 font-sans text-[#102448]">

      {/* HEADER */}
      <header className="fixed inset-x-0 top-0 z-[100] border-b border-blue-200/60 bg-[#E4EFFF]">
        <div className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">

          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={onMenuClick}
              aria-label="Open menu"
              className="
                flex h-10 w-10 shrink-0 flex-col items-center
                justify-center gap-[5px] rounded-xl bg-[#102448]
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
              <h1 className="truncate text-[20px] font-extrabold leading-tight tracking-tight text-blue-900 sm:text-[23px]">
                {website.name}
              </h1>
              <p className="mt-0.5 text-[10px] font-medium text-blue-900/70 sm:text-[11px]">
                {website.tagline}
              </p>
            </div>
          </div>

          {/* Post jobs */}
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

      {/* CONTACT CONTENT */}
      <main className="mx-auto max-w-[1200px] px-4 pb-8 pt-[88px] sm:px-6 lg:px-8">

        {/* Page introduction */}
        <section className="overflow-hidden rounded-2xl border border-blue-200/80 bg-white shadow-sm">
          <div className="h-1.5 bg-[#E4EFFF]" />

          <div className="p-5 sm:p-7">
            <div className="flex items-center gap-2">
              <span className="h-5 w-1 rounded-full bg-[#2462AC]" />
              <p className="text-[10px] font-bold uppercase tracking-[1.3px] text-blue-700">
                We're here to help
              </p>
            </div>

            <h2 className="mt-3 text-[27px] font-extrabold leading-tight tracking-tight text-[#102448] sm:text-[32px]">
              Contact Us
            </h2>

            <p className="mt-3 max-w-2xl text-[12px] leading-6 text-blue-700 sm:text-[13px]">
              Have a question about {website.name}? Need help using our job
              portal, or want to share a suggestion? We'd love to hear from you.
              Reach out to us by email.
            </p>
          </div>
        </section>

        {/* Contact options */}
        <section className="mt-5 grid gap-4 md:grid-cols-2">

          {/* Email card */}
          <article className="
            group rounded-2xl border border-blue-200/80
            bg-white p-5 shadow-sm transition duration-200
            hover:border-blue-200 hover:shadow-md sm:p-6
          ">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E4EFFF] text-xl text-[#2462AC] transition-colors group-hover:bg-[#E4EFFF]">
              @
            </div>

            <h3 className="mt-4 text-[15px] font-bold text-[#102448]">
              Email Support
            </h3>

            <p className="mt-2 text-[12px] leading-6 text-blue-700">
              Contact our website team for questions, technical assistance,
              feedback or other website-related enquiries.
            </p>

            <a
              href={`mailto:${contact.ownerEmail}`}
              className="
                mt-4 inline-flex max-w-full items-center gap-2
                break-all text-[12px] font-bold text-[#2462AC]
                transition-colors hover:text-[#2462AC]
                focus-visible:outline-none focus-visible:underline
              "
            >
              {contact.ownerEmail}
              <span className="shrink-0" aria-hidden="true">↗</span>
            </a>

            <p className="mt-3 text-[10px] text-blue-400">
              Select the email address to contact us.
            </p>
          </article>

          {/* General enquiries card */}
          <article className="
            rounded-2xl border border-blue-200/80
            bg-white p-5 shadow-sm sm:p-6
          ">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E4EFFF] text-lg font-bold text-[#2462AC]">
              ?
            </div>

            <h3 className="mt-4 text-[15px] font-bold text-[#102448]">
              How can we help?
            </h3>

            <p className="mt-2 text-[12px] leading-6 text-blue-700">
              You can contact us regarding:
            </p>

            <ul className="mt-3 space-y-2.5">
              {[
                'Help with job search and applications',
                'Website issues or technical problems',
                'Suggestions and feedback',
                'General website enquiries',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[11px] leading-5 text-blue-700"
                >
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#E4EFFF] text-[9px] font-bold text-[#2462AC]">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </section>

        {/* Footer */}
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

export default Desktop_Sidebar_Contact_Us
