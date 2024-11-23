import Dashboard from '@/components/Dashboard'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const page = () => {
  return (
    <div className='h-screen flex items-start justify-center pattern'>

      <Sidebar />
      <Dashboard />
    </div>

  )
}

export default page
