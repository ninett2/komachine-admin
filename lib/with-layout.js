import React from 'react';
import DefaultLayout from '../layouts/DefaultLayout';


const withLayout = (Layout = DefaultLayout) => (Wrapped) => {
  return class extends React.Component {
    static getInitialProps(ctx) {
      if(Wrapped.getInitialProps) {
        return Wrapped.getInitialProps(ctx);
      }
    }
    render() {
      return (
        <Layout {...this.props}>
          <Wrapped {...this.props} />
        </Layout>
      )
    }
  }
};

export default withLayout;