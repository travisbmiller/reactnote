import React from 'react';

class NotesList extends React.Component {
  handleRemove(index) {
    this.props.removeNote(index);
  }
  render(){
    const { notes } = this.props;
    return (
      <ul className="list-group">
        {notes.map((note, index) => ( 
          <li onClick={() => this.handleRemove({index})} className="list-group-item" key={index}> {note}</li>
        ))}
      </ul>
    )
  }
};

// var NoteList = React.createClass({
//   render: function () {
//     var notes = this.props.notes.map(function (note, index) {
//       return <li className="list-group-item" key={index}> {note['.value']}</li>
//     });
//     return (
//       <ul className="list-group">
//         {notes}
//       </ul>
//     )
//   }
// });

export default NotesList
