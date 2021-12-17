import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  body {
	margin: 0;
	padding: 0;
	background: ${props => props.theme.colors.background};
	font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`;
 
