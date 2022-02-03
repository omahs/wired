import * as React from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Head from "next/head";

import "../styles/globals.css";
import { theme } from "ui";
import { CeramicProvider } from "ceramic";

export default function MyApp(props) {
  const { Component, pageProps } = props;

  const Layout = Component.Layout ?? EmptyLayout;

  return (
    <>
      <Head>
        <title>The Wired</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <CssBaseline />

      <ThemeProvider theme={theme}>
        <CeramicProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CeramicProvider>
      </ThemeProvider>
    </>
  );
}

function EmptyLayout({ children }) {
  return children;
}
