import React, { Component } from 'react';
import axios from 'axios';

import $ from 'jquery';

class Twitter extends Component {

  componentDidMount() {
    const {width, height} = this.props;
    console.log(this.props);

    $(this.thing).html(`
      <a className="twitter-timeline" data-lang="en" data-width="${width}" data-height="${height}" data-theme="dark" data-link-color="#FC7D01" href="https://twitter.com/jafa?ref_src=twsrc%5Etfw">Tweets by jafa</a>
      <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"/>`);
  }

  render() {
    return (
        <div ref={(element) => {this.thing = element;}}></div>
      );
  }
}

export default Twitter;
