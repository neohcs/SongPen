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
  position: absolute;
  bottom: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  height: 35px;
  padding: 10px 0;
  background: #17e2cc;
`

const LinkStyled = styled(NavLink)`
  position: absolute;
  top: -38px;
  display: flex;
  box-shadow: 0 3px 6px #0003;
  text-decoration: none;
  border-radius: 50%;
  background: white;
  color: #08101f;
`

const CreateIconStyled = styled(PlusCircle)`
  display: inline-block;
  height: 60px;
`
