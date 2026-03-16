import React from 'react'
import { DataTable } from '../../components/data-table/DataTable'

export const Categories = () => {
    const data = []
    const columns= []
  return (
    <div className="bg-cl-primary w-full min-h-screen rounded-lg p-2 space-y-4">
      <h1 className="text-2xl">Categories</h1>
      <DataTable data={data} columns={columns} />
    </div>
  )
}