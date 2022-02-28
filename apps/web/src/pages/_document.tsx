import { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

const Document = () => (
  <Html>
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/android-chrome-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="512x512"
        href="/android-chrome-512x512.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
