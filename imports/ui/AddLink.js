import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

export default class AddLink extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      url: '',
      isOpen: false,
      error: ''
    }
  }

  onSubmit(e) {
    //const url = this.refs.url.value.trim();
    //const url = this.state.url;
    const { url } = this.state;

    e.preventDefault();

      Meteor.call('llinks.insert', url, (err, res) => {
        if(!err) {
          //this.setState({url: '', isOpen: false, error: ''});
          this.onCloseModal();
        } else {
          this.setState({error: err.reason});
        }
      });
  }

  onChange(e) {
    this.setState({url: e.target.value.trim()});
  }

  onCloseModal() {
    this.setState({
      isOpen: false,
      url: '',
      error: ''
    });
  }

  render() {
    return (
      <div>
      <button onClick={() => this.setState({isOpen: true})} className="button">+ Add Link</button>
      <Modal
        isOpen={this.state.isOpen}
        contentLabel="Add link"
        onAfterOpen={() => this.refs.url.focus()}
        onRequestClose={this.onCloseModal.bind(this)}
        className="boxed-view__box"
        overlayClassName="boxed-view boxed-view--overlay"
      >
        <h1>Add Link</h1>
        {this.state.error ? <p>{this.state.error}</p> : ''}
        <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
          <input type="text"
          placeholder="URL"
          ref="url"
          value={this.state.url}
          onChange={this.onChange.bind(this)}/>
          <button className="button">Add</button>
          <button type="button"
                  onClick={this.onCloseModal.bind(this)}
                  className="button button--secondary">
                  Cancel
          </button>
        </form>
      </Modal>
      </div>
    );
  }
}
