import React from 'react';
import Repos from './github/Repos';
import UserProfile from './github/UserProfile';
import Notes from './notes/Notes';
import getGithubInfo from '../unils/helpers';
import Rebase from 're-base';

const base = Rebase.createClass('https://rgnt.firebaseio.com/')

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      bio: {},
      repos: []
    }
  }
  componentWillReceiveProps(nextProps) {
    base.removeBinding(this.ref);
    this.init(nextProps.params.username)
  }
  init(username) {
    this.ref = base.bindToState(username, {
      context: this,
      asArray: true,
      state: 'notes'
    });

    getGithubInfo(username)
      .then(function (data) {
        this.setState({
          bio: data.bio,
          repos: data.repos
        })
      }.bind(this))   
  }
  componentDidMount() {
    this.init(this.props.params.username); 
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  handleAddNote(newNote) {
    base.post(this.props.params.username, {
      data: this.state.notes.concat([newNote])
    })
  }
  render(){
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
          addNote={(newNote) => this.handleAddNote(newNote)}
          />
        </div>
      </div>
    )
  }
}


export default Profile;


// var Profile = React.createClass({
//   mixins: [ReactFireMixin],
//   getInitialState: function() {
//       return {
//         notes: [],
//         bio: {},
//         repos: []
//       }
//   },
//   componentWillReceiveProps: function (nextProps) {
//     console.log(nextProps)
//     this.unbind('notes');
//     this.init(nextProps.params.username)
//   },
//   init: function (username) {
//     var childRef = this.ref.child(username);
//     this.bindAsArray(childRef, 'notes'); 

//     getGithubInfo(username)
//       .then(function (data) {
//         this.setState({
//           bio: data.bio,
//           repos: data.repos
//         })
//       }.bind(this))   
//   },
//   componentDidMount: function () {
//     this.ref = new Firebase('https://rgnt.firebaseio.com/');
//     this.init(this.props.params.username); 
//   },
//   componentWillUnmount: function () {
//     this.unbind('notes');
//   },
//   handleAddNote: function (newNote) {
//     this.ref.child(this.props.params.username).child(this.state.notes.length).set(newNote)
//   },
//   render: function () {
  
//     return (
//       <div className="row">
//         <div className="col-md-4">
//           <UserProfile username={this.props.params.username} bio={this.state.bio}/>
//         </div>
//         <div className="col-md-4">
//           <Repos username={this.props.params.username} repos={this.state.repos} />
//         </div>
//         <div className="col-md-4">
//           <Notes 
//           username={this.state.bio.name} 
//           notes={this.state.notes} 
//           addNote={this.handleAddNote}
//           />
//         </div>
//       </div>
//     )
//   }
// });

// module.exports = Profile;
