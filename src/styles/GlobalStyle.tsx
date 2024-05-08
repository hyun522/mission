import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        margin:0; padding:0;
    }
    body {
        line-height:1;
    }
    img {
        vertical-align:top;
    }
    ul,ol,li { list-style:none; }
    a { text-align:none; }
`;

export default GlobalStyle;
