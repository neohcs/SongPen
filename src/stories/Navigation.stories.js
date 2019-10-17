import React from 'react'
import { action } from '@storybook/addon-actions'
import Navigation from './Navigation'
import LinkStyled from '../app/Navigation'

export default {
  LinkStyled: 'Navigation'
}

export const navigation = () => (
  <Navigation onCLick={action('onClick')}>
    <LinkStyled to="/" exact>
      <ListIconStyled></ListIconStyled>
    </LinkStyled>
    <LinkStyled to="/create">
      <CreateIconStyled></CreateIconStyled>
    </LinkStyled>
  </Navigation>
)
