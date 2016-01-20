var React = require('react');
var NotesList = require('./NotesList.js')
var Notes = React.createClass({
  propTypes: {
    username: React.PropTypes.string.isRequired,
    notes: React.PropTypes.array.isRequired
  },
  render: function () {
    console.log('notes:', this.props.notes);
    return (
      <div>
        <h3>Notes for {this.props.username}</h3>
        <NotesList notes={this.props.notes} />

      </div>
    )
  }
});

module.exports = Notes;