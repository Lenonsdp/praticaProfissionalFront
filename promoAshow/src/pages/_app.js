import App from 'next/app';
import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalStyle from '../styles/global'
import theme from '../styles/theme';
import { ThemeProvider } from 'styled-components';
import Dashboard from './index';

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider theme={theme}>
			<Dashboard />
			<GlobalStyle/>
		</ThemeProvider>
	)
}

MyApp.getInitialProps = async (appContext) => {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);

    return { ...appProps };
};

export default App;