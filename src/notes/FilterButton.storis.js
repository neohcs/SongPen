import React from 'react'
import { action } from '@storybook/addon-actions'
import FilterButton from './FilterButton'

export default {
  title: 'FilterButton'
}

export const filterButton = () => (
  <FilterButton onCLick={action('onClick')}>test</FilterButton>
)
