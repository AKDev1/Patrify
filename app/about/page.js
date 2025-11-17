import React from 'react'
import AboutInfoCard from '@/components/AboutInfoCard'

export default function About() {
  return (
    <div className="flex justify-center px-4 py-12">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-lg bg-neutral-900/50 border border-neutral-800 p-8">
            <div className="flex items-center gap-6 mb-6">
              <img src="/group.gif" alt="hero" className="w-40 h-24 object-contain" />
              <div>
                <h1 className="text-2xl font-semibold text-white">About Patrify</h1>
                <p className="text-sm text-slate-300 mt-1">A lightweight platform to help creators receive direct support from their community.</p>
              </div>
            </div>

            <section className="mb-6">
              <h2 className="text-lg font-medium text-slate-100">Summary</h2>
              <p className="mt-2 text-slate-300">Patrify makes it easy for creators to accept one-off payments and contributions. Profiles are public and shareable; payments are secure and recorded for creators to manage in their dashboard.</p>
            </section>

            <section className="mb-6">
              <h2 className="text-lg font-medium text-slate-100">How it works</h2>
              <ol className="mt-3 list-decimal ml-5 text-slate-300 space-y-2">
                <li>Creators set up a public profile with bio, images and payment details.</li>
                <li>Supporters visit profiles and contribute using secure checkout (Razorpay).</li>
                <li>Payments and messages are recorded and visible to creators on the dashboard.</li>
                <li>Authentication and sessions are handled by NextAuth for security.</li>
              </ol>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section>
                <h3 className="text-md font-medium text-slate-100">Benefits for creators</h3>
                <ul className="mt-3 ml-4 list-disc text-slate-300 space-y-2">
                  <li>Shareable public profiles to showcase work.</li>
                  <li>Secure payment flows and a simple dashboard.</li>
                  <li>Direct support with context (message, amount).</li>
                </ul>
              </section>

              <section>
                <h3 className="text-md font-medium text-slate-100">Benefits for supporters</h3>
                <ul className="mt-3 ml-4 list-disc text-slate-300 space-y-2">
                  <li>Fast, secure checkout experience.</li>
                  <li>Ability to leave messages and support creators directly.</li>
                  <li>Transparent tracking of contributions.</li>
                </ul>
              </section>
            </div>

            <section className="mt-6">
              <h3 className="text-md font-medium text-slate-100">Community & collaboration</h3>
              <ul className="mt-3 ml-4 list-disc text-slate-300 space-y-2">
                <li>Supporters can leave short messages with payments to strengthen ties.</li>
                <li>Public profiles and activity help discovery and promotion.</li>
                <li>Creators can run small campaigns and coordinate community goals.</li>
              </ul>
            </section>

            <div className="mt-6 border-t border-neutral-800 pt-4">
              <p className="text-sm text-slate-400">Built and maintained by a solo developer.</p>
            </div>
          </div>

          <aside>
            <AboutInfoCard />
          </aside>
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: "About - Patrify"
}
