'use client'
import SuperAdminGuard from '@/hoc/SuperAdminGuard'
import React from 'react'

const Overview = () => {
  return (
    <div>Overview</div>
  )
}

export default SuperAdminGuard(Overview)