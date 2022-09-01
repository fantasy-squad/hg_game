import JotaiNexus from 'jotai-nexus'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import '../styles/globals.scss'


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta http-equiv='cache-control' content='no-cache' />
        <meta http-equiv='expires' content='0' />
        <meta http-equiv='pragma' content='no-cache' />

      </Head>
      <Component {...pageProps} />
      <JotaiNexus />
      <Toaster
        containerClassName="cuzstomtoajstgdkljklj"
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </>)
}

export default MyApp
