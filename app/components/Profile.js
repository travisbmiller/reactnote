var React = require('react');
var Router = require('react-router');
var Repos = require('./github/Repos.js');
var UserProfile = require('./github/UserProfile.js');
var Notes = require('./notes/Notes.js');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');


var Profile = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function() {
      return {
        notes: ['a','b','c'],
        bio: {
          name: "Travis Miller"
        },
        repos: [1,2,3]
      }
  },
  componentDidMount: function () {
    this.ref = new Firebase('https://rgnt.firebaseio.com/');
    var childRef = this.ref.child(this.props.params.username);
    this.bindAsArray(childRef, 'notes');    
  },
  componentWillUnmount: function () {
    this.unbind('notes');
  },
  handleAddNote: function (newNote) {
    
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
          <Notes username={this.props.params.username} notes={this.state.notes} />
        </div>
      </div>
    )
  }
});

module.exports = Profile;
