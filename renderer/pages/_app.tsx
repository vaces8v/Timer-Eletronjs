import React from 'react'
import type { AppProps } from 'next/app'
import { Poppins } from 'next/font/google'
import '../styles/globals.scss'
import { SnackbarProvider } from "notistack";
import {NextFont} from "next/dist/compiled/@next/font";
import {Provider} from "react-redux";
import {store} from "../components/store";

const poppins: NextFont = Poppins({
  weight: '400', subsets: ['latin'],
})

function MyApp({ Component, pageProps }: AppProps) {
  return <div className={poppins.className}>
    <div className="titlebar">Timer</div>
    <Provider store={store}>
        <SnackbarProvider maxSnack={4} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}  autoHideDuration={3500}>
          <div className="app" >
            <Component {...pageProps} />
          </div>
        </SnackbarProvider>
    </Provider>
  </div>
}

export default MyApp
