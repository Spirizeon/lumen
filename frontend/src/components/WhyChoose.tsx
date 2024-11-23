import React from 'react'

const WhyChoose = () => {
  const features = [
    {
      icon:
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>,
      title: "Efficiency",
      desc: "Automates complex malware analysis tasks, reducing the time and effort required."
    },
    {
      icon:
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>,
      title: "Accuracy",
      desc: "Uses sophisticated AI to provide accurate and detailed analysis."
    },
    {
      icon:
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>,
      title: "User-Friendly",
      desc: "Intuitive dashboard design makes it easy for users to manage and review their files and reports."
    },
  ]
  return (
    <section className="py-14 pattern">
      <div className="max-w-screen-xl mx-auto px-4 text-center text-gray-200 md:px-8">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-indigo-600 text-3xl font-semibold sm:text-4xl">
            Why choose Adamantium?
          </h3>

        </div>
        <div className="mt-12">
          <ul className="grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {
              features.map((item, idx) => (
                <li key={idx} className="space-y-3">
                  <div className="w-12 h-12 mx-auto bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h4 className="text-lg text-indigo-500 font-semibold">
                    {item.title}
                  </h4>
                  <p>
                    {item.desc}
                  </p>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </section>
  )
}

export default WhyChoose
