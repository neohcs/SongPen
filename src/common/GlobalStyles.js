import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`
* {
  box-sizing: border-box;
  /* font-family: Lucida Grande, Lucida Sans Unicode, Lucida Sans, Geneva, Verdana, sans-serif; */
  font-family: 'Lato', sans-serif;
  :focus {
    box-shadow: 0 0 1px 1px rgba(70, 220, 252, 0.7);
  }
}

body {
  margin: 0;
  height: 100vh;
  width: 100vw;
 @media (min-width: 900px) {
      margin: 40px auto;
      box-shadow: 30px 40px 30px #2264;
      border: 30px solid black;
      border-width: 60px 20px;
      border-radius: 20px;
      width: 375px;
      height: 667px;
}
}

`
