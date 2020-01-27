import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
// ---------------------------------------------
export default class CustomDocument extends Document {
  render() {
    return (
      <html lang="en-US">
        <Head />
        <body data-spy="scroll" data-target=".navbar" className="has-loading-screen" data-bg-parallax="scroll" data-bg-parallax-speed="3">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
