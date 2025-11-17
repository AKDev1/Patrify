"use client"
import React from 'react'

export default function AboutInfoCard() {
  const info = {
    name: 'Aman Kumar',
    title: 'Founder & Developer',
    email: 'amanmadan9801@gmail.com',
    phone: '+91-9080754795',
    linkedin: 'https://www.linkedin.com/in/akdev01',
    github: 'https://github.com/AKDev1',
    avatar: '/Aman_profile_image.png',
    cover: '/Info_cover_pic.png',
  }

  return (
    <div className="w-full">
      <div className="rounded-lg overflow-hidden border border-neutral-800 bg-neutral-900/50">
        <div className="w-full h-28 bg-neutral-800 flex items-center justify-center overflow-hidden">
          <img src={info.cover} alt="cover" className="" />
        </div>

        <div className="p-4 flex flex-col items-center">
          <div className="-mt-12 w-28 h-28 rounded-full overflow-hidden ring-2 ring-neutral-800">
            <img src={info.avatar} alt="avatar" className="w-full h-full object-cover" />
          </div>

          <h3 className="mt-3 text-lg font-semibold text-white">{info.name}</h3>
          <p className="text-sm text-slate-400">{info.title}</p>

          <div className="mt-4 w-full text-sm text-slate-300">
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-400">Email</span>
              <a className="text-slate-200 hover:underline" href={`mailto:${info.email}`}>{info.email}</a>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-400">Phone</span>
              <a className="text-slate-200" href={`tel:${info.phone}`}>{info.phone}</a>
            </div>
          </div>

          <div className="mt-4 w-full flex gap-2">
            <a href={info.linkedin} target="_blank" rel="noreferrer" className="flex-1 text-center px-3 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm">LinkedIn</a>
            <a href={info.github} target="_blank" rel="noreferrer" className="flex-1 text-center px-3 py-2 rounded border border-neutral-700 text-slate-200 text-sm">GitHub</a>
          </div>
        </div>
      </div>
    </div>
  )
}
