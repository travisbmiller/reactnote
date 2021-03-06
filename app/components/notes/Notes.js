import React from 'react';
import NotesList from './NotesList';
import AddNote from './AddNote';

class Notes extends React.Component {
  render(){
    console.log(this.props.removeNote)
    return (
      <div>
        <h3>Notes for {this.props.username}</h3>
        <AddNote username={this.props.username} addNote={this.props.addNote} />
        <NotesList notes={this.props.notes} removeNote={this.props.removeNote}/>

      </div>
    )
  }
}

Notes.propTypes = {
  username: React.PropTypes.string.isRequired,
  notes: React.PropTypes.array.isRequired,
  addNote: React.PropTypes.func.isRequired
};

export default Notes;




// var Notes = React.createClass({
//   propTypes: {
//     username: React.PropTypes.string.isRequired,
//     notes: React.PropTypes.array.isRequired,
//     addNote: React.PropTypes.func.isRequired
//   },
//   render: function () {
//     return (
//       <div>
//         <h3>Notes for {this.props.username}</h3>
//         <AddNote username={this.props.username} addNote={this.props.addNote} />
//         <NotesList notes={this.props.notes} />

//       </div>
//     )
//   }
// });

// module.exports = Notes;