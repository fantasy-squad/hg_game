import JotaiNexus from 'jotai-nexus'
import { Toaster } from 'react-hot-toast'
import '../styles/globals.scss'


function MyApp({ Component, pageProps }) {
  return (
    <>

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
