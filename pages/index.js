
import React from 'react';
import axios from 'axios';
import Head from 'next/head';
import MainDisplay from './mainDisplay';

const initialState = {
  loading: true,
  error: false,
  data: null,
};

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  componentDidMount() {
    this.updateData();
  }

  async updateData() {
    this.setState(initialState);

    const response = await this.getData();

    if (response.error === false) {
      this.setState({ error: false, loading: false, data: response.data });
    } else {
      this.setState({ error: true, loading: false, data: null });
    }
  }

  async getData() {
    try {
      // const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
      // how we get data from backend server
      const response = await axios.get('http://localhost:8000/update');

      if (response.status === 200) {
        console.log(response.data);
        return ({ error: false, data: response.data });
      }
      return ({ error: true, data: null, errorType: 'server' });
    } catch (err) {
      console.error(err);
      return ({ error: true, data: null, errorType: 'network' });
    }
  }

  render() {
    // if (this.state.loading === true) {
    //   return null;
    // }
    return (

      <div>
        <Head>
          <title>JAFA Analytics Dash</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
          // Required meta tags
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          // Bootstrap CSS
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />

          <link rel="stylesheet" href="static/vendor/fonts/circular-std/style.css" />
          <link rel="stylesheet" href="static/libs/css/style.css" />
          <link rel="stylesheet" href="static/css/style.css" />

          <link rel="stylesheet" href="static/vendor/fonts/fontawesome/css/fontawesome-all.css" />
          <link rel="stylesheet" href="static/vendor/charts/chartist-bundle/chartist.css" />
          <link rel="stylesheet" href="static/vendor/charts/morris-bundle/morris.css" />
          <link rel="stylesheet" href="static/vendor/fonts/material-design-iconic-font/css/materialdesignicons.min.css" />
          <link rel="stylesheet" href="static/vendor/charts/c3charts/c3.css" />
          <link rel="stylesheet" href="static/vendor/fonts/flag-icon-css/flag-icon.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />


          <script src="static/vendor/jquery/jquery-3.3.1.min.js" />
          // bootstap bundle js
          <script src="static/vendor/bootstrap/js/bootstrap.bundle.js" />
          // slimscroll js
          <script src="static/vendor/slimscroll/jquery.slimscroll.js" />
          // main js
          <script src="static/libs/js/main-js.js" />
          // chart chartist js
          <script src="static/vendor/charts/chartist-bundle/chartist.min.js" />
          // sparkline js
          <script src="static/vendor/charts/sparkline/jquery.sparkline.js" />
          // morris js
          <script src="static/vendor/charts/morris-bundle/raphael.min.js" />
          <script src="static/vendor/charts/morris-bundle/morris.js" />
          // chart c3 js
          <script src="static/vendor/charts/c3charts/c3.min.js" />
          <script src="static/vendor/charts/c3charts/d3-5.4.0.min.js" />
          <script src="static/vendor/charts/c3charts/C3chartjs.js" />
          <script src="static/libs/js/dashboard-ecommerce.js" />
        </Head>

        <MainDisplay
          {...this.state}
        />
      </div>
    );
  }
}

export default Index;
