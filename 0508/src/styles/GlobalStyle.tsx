import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'SOGANGUNIVERSITYTTF';
        src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2312-1@1.1/SOGANGUNIVERSITYTTF.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
    }
    * {
        margin:0; padding:0;
        box-sizing: border-box;
    }
    body {
        line-height:1;
        font-family: 'SOGANGUNIVERSITYTTF';
    }
    img {
        vertical-align:top;
    }
    ul,ol,li { list-style:none; }
    a { text-decoration:none; }
`;

export default GlobalStyle;
