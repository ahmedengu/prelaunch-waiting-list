import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
// ---------------------------------------------
export default class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const { req } = ctx;
    let lng = 'ar';
    if (req.query && req.query.lng) {
      lng = req.query.lng;
    }
    return { ...initialProps, lng, isBot: (req.get('User-Agent') || '').toLowerCase().includes('bot') };
  }

  render() {
    const { isBot, lng } = this.props;
    return (
      <html lang={lng}>
        <Head />
        <noscript>
          <style dangerouslySetInnerHTML={{
            __html: `
          .has-loading-screen:before {
            width: 0 !important;
          }
          .has-loading-screen:after {
            transform: scale(0) !important;
            opacity: 0 !important;
          }
          `,
          }}
          />
        </noscript>

        <body data-spy="scroll" data-target=".navbar" className={isBot ? '' : 'has-loading-screen'} data-bg-parallax="scroll" data-bg-parallax-speed="3">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
