import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import moment from 'moment';

export default class LinksListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      justCopied: false
    };
  }

  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copyButton);

    this.clipboard.on('success', () => {
      this.setState({justCopied: true});
      setTimeout(() => this.setState({justCopied: false}), 1000);
    });
    this.clipboard.on('error', () => {
      alert('Unable to copy link');
    });
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }
  renderStats() {
    let visitsMessage = this.props.visitedCount + (this.props.visitedCount === 1 ? ' visit' : ' visits');

    if(typeof this.props.lastVisitedAt === 'number') {
      visitsMessage += " (last visited "+moment(this.props.lastVisitedAt).fromNow()+")";
    }
    return (
      visitsMessage
    );
  }

  render() {

    return (
      <div className="item">
        <h2>{this.props.url}</h2>
        <p className="item__message">{this.props.shortUrl}</p>
        <p className="item__message">{this.renderStats()}</p>
        <a href={this.props.shortUrl} target="_blank">
          <button className="button button--pill">Visit</button>
        </a>
        <button className="button button--pill"
                ref="copyButton"
                data-clipboard-text={this.props.shortUrl}>
          {this.state.justCopied ? 'Copied' : 'Copy'}
        </button>
        <button className="button button--pill"
                onClick={() => {
                  Meteor.call('links.setVisibility', this.props._id, !this.props.visible)
                }}>
          {this.props.visible ? 'Hide' : 'Unhide'}
        </button>
      </div>
    );
  }
}

LinksListItem.proptypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  visitedCount: PropTypes.number.isRequired,
  lastVisitedAt: PropTypes.number
};
