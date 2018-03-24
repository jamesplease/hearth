import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default class GuideContent extends Component {
  render() {
    const { markdownText } = this.state;
    return (
      <div className="standardPage-contentWithSideNavBody">
        <Link to="/guides" className="navBackLink">
          <i className="mdi mdi-chevron-left navBackLink-icon" />
          Guides
        </Link>
        {markdownText && (
          <ReactMarkdown source={markdownText} className="guideContent_text" />
        )}
      </div>
    );
  }

  state = {
    markdownText: null
  };

  componentWillMount() {
    const { markdownUrl } = this.props;

    fetch(markdownUrl)
      .then(response => response.text())
      .then(markdownText => {
        this.setState({
          markdownText
        });
      });
  }
}
