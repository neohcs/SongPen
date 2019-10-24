import React from 'react'
import styled from 'styled-components/macro'
import { NavLink } from 'react-router-dom'
import { PlusCircle } from 'styled-icons/boxicons-solid'

export default function Navigation() {
  return (
    <NavigationStyled>
      <LinkStyled to="/create">
        <CreateIconStyled></CreateIconStyled>
      </LinkStyled>
    </NavigationStyled>
  )
}

const NavigationStyled = styled.nav`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 5px solid #17e2cc;
  height: 35px;
  padding: 10px 0;
`

const LinkStyled = styled(NavLink)`
  position: absolute;
  top: -33px;
  display: flex;
  box-shadow: 0 2px 5px #0002;
  text-decoration: none;
  border-radius: 50%;
  background: #17e2cc;
  color: #050102;
`

const CreateIconStyled = styled(PlusCircle)`
  display: inline-block;
  height: 60px;
`
