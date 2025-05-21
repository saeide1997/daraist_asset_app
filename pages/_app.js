import "../styles/style.css"
import Head from 'next/head'
import Menu from "../components/Menu";
import { useRouter } from "next/router";


function MyApp({ Component, pageProps }) {
  const router = useRouter();

    // مسیرهایی که نباید Menu نمایش داده بشه
    const hideMenuRoutes = ["/login", "/signup"];
    const showMenu = !hideMenuRoutes.includes(router.pathname);
  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </Head>
      <Component {...pageProps} />
      {showMenu && <Menu />}
    </>
  );
}

export default MyApp;
