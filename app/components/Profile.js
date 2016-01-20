var React = require('react');
var Router = require('react-router');
var Repos = require('./github/Repos.js');
var UserProfile = require('./github/UserProfile.js');
var Notes = require('./notes/Notes.js');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var helpers = require('../unils/helpers');

var Profile = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function() {
      return {
        notes: ['a','b','c'],
        bio: {},
        repos: []
      }
  },
  componentWillReceiveProps: function (nextProps) {
    console.log(nextProps)
    this.unbind('notes');
    this.init(nextProps.params.username)
  },
  init: function (username) {
    var childRef = this.ref.child(username);
    this.bindAsArray(childRef, 'notes'); 

    helpers.getGithubInfo(username)
      .then(function (data) {
        this.setState({
          bio: data.bio,
          repos: data.repos
        })
      }.bind(this))   
  },
  componentDidMount: function () {
    this.ref = new Firebase('https://rgnt.firebaseio.com/');
    this.init(this.props.params.username); 
  },
  componentWillUnmount: function () {
    this.unbind('notes');
  },
  handleAddNote: function (newNote) {
    this.ref.child(this.props.params.username).child(this.state.notes.length).set(newNote)
  },
  render: function () {
  
    return (
      <div className="row">
        <div className="col-md-4">
          <UserProfile username={this.props.params.username} bio={this.state.bio}/>
        </div>
        <div className="col-md-4">
          <Repos username={this.props.params.username} repos={this.state.repos} />
        </div>
        <div className="col-md-4">
          <Notes 
          username={this.state.bio.name} 
          notes={this.state.notes} 
          addNote={this.handleAddNote}
          />
        </div>
      </div>
    )
  }
});

module.exports = Profile;
