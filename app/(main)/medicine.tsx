import AddButton from '@/components/AddButton'
import CommonWrapper from '@/components/CommonWrapper'
import AddMedicine from '@/components/home/addMedicine'
import React from 'react'

const medicine = () => {
  return (
    <CommonWrapper padding={0}>
      <AddMedicine />
      <AddButton />
    </CommonWrapper>
  )
}

export default medicine