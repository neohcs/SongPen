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
  /* height: 100vh;
  width: 100vw; */
  margin: 0;
@media (min-width: 900px) {
      width: 375px;
      height: 667px;
      border: 30px solid black;
      border-width: 60px 20px;
      border-radius: 20px;
      box-shadow: 30px 40px 30px #2264;
      margin: 40px auto;
}
}

`
