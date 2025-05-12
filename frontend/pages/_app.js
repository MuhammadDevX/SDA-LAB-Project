import '../styles/globals.css';
import TopNavBar from '../components/TopNavBar';
import AIChatAssistant from '../components/AIChatAssistant';

export default function App({ Component, pageProps }) {
  return (
    <>
      <TopNavBar />
      <Component {...pageProps} />
      <AIChatAssistant />
    </>
  );
} 