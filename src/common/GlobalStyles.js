import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`
* {
  box-sizing: border-box;
  font-family: 'Lato', sans-serif;
  outline: none;
  &:focus {
    box-shadow: 0 0 1px 1px rgba(70, 220, 252, 0.7);
  }
}

#root {
  width: 375px;
  height: 677px;
  background: #fdfeff;
  /* @media (min-width: 500px){
    width: 375px;
    height: 667px;
  } */
}

body {
  position: fixed;
  top: 0;
  left: 0;
  display: grid;
  grid-template-rows: 50px 40px auto 40px;
  margin: 0;
  width: 100%;
  height: 100%;
  @media (min-width: 500px) {
    box-sizing: content-box;
    box-shadow: 30px 40px 30px #2264;
    margin: 40px 35%;
    border: 30px solid black;
    border-width: 60px 20px;
    border-radius: 20px;
    width: 375px;
    height: 667px;
  }
}
`
