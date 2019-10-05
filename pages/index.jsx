import React from 'react';
import Router from 'next/router';

export default class extends React.Component {
  static async getInitialProps({ res, req }) {
    const { query: { ref } } = req;
    const refQS = ref ? `?ref=${ref}` : '';
    if (res) {
      res.writeHead(302, {
        Location: `/egypt${refQS}`,
      });
      res.end();
    } else {
      Router.push(`/egypt${refQS}`);
    }
    return {};
  }
}
