import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`
* {
  box-sizing: border-box;
  font-family: Lucida Grande, Lucida Sans Unicode, Lucida Sans, Geneva, Verdana, sans-serif;
  :focus {
    box-shadow: 0 0 1px 1px rgba(70, 220, 252, 0.7);
  }
}

body {
  height: 100vh;
  width: 100vw;
  margin: 0;
}
`
