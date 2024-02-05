// styles/globalStyles.tsx
import { Global, css } from "@emotion/react";

const globalStyles = css`
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700&display=swap");
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-family: "Poppins", sans-serif;
  }
  // Add more global styles as needed
`;

const GlobalStyles = () => <Global styles={globalStyles} />;

export default GlobalStyles;
