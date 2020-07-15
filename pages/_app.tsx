import { AppProps } from 'next/app';
import {Provider} from 'react-redux';
import {useStore} from '../store';
import '../styles/global.css';

export default function App({ Component, pageProps }: AppProps) {

  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>

  );
}