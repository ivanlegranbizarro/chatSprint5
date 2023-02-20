const mongoose = require( 'mongoose' );
const validator = require( 'validator' );

const roomSchema = new mongoose.Schema( {
  name: {
    type: String,
    required: [ true, 'Room name is required' ],
    validate: [ validator.isLength, { min: 3, max: 10, message: 'Room name must be between 3 and 12 characters' } ]
  }
}
);

const Room = mongoose.model( 'Room', roomSchema );

module.exports = Room;
