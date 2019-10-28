import React from 'react'
import TagFilter from './TagFilter'
import FilterButton from './FilterButton'

export default {
  title: 'TagFilter'
}

export const tagFilter = tags => (
  <TagFilter>
    {tags.map(tag => (
      <FilterButton
        selectedTag={selectedTag}
        onClick={() => onClick(tag)}
        tag={tag}
        key={tag}
      ></FilterButton>
    ))}
  </TagFilter>
)
