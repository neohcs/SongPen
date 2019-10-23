import React from 'react'
import styled from 'styled-components/macro'
import { NavLink } from 'react-router-dom'
import { ListUl } from 'styled-icons/fa-solid'
import { FileAlt } from 'styled-icons/fa-regular'

export default function Navigation() {
  return (
    <NavigationStyled>
      <LinkStyled to="/" exact>
        <ListIconStyled></ListIconStyled>
      </LinkStyled>
      <LinkStyled to="/create">
        <CreateIconStyled></CreateIconStyled>
      </LinkStyled>
    </NavigationStyled>
  )
}

const NavigationStyled = styled.nav`
  display: flex;
  justify-content: space-between;
  margin: 0 30px 40px;
  height: 50px;
  padding-top: 50px;
`

const LinkStyled = styled(NavLink)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-decoration: none;
  color: #17e2cc;
  opacity: 0.5;
  &.active {
    color: #17e2cc;
    opacity: 1;
  }
`

const ListIconStyled = styled(ListUl)`
  display: inline-block;
  justify-content: flex-start;
  height: 40px;
`

const CreateIconStyled = styled(FileAlt)`
  display: inline-block;
  justify-content: flex-end;
  height: 40px;
`
