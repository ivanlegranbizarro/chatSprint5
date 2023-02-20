const mongoose = require( 'mongoose' );
const validator = require( 'validator' );
const bcrypt = require( 'bcryptjs' );


const userSchema = new mongoose.Schema( {
  name: {
    type: String,
    required: [ true, 'Username is required' ],
    validate: [ validator.isLength, { min: 3, max: 12, message: 'Username must be between 3 and 12 characters' } ]
  },
  email: {
    type: String,
    required: [ true, 'Email is required' ],
    unique: true,
    lowercase: true,
    validate: [ validator.isEmail, 'Please provide a valid email' ]
  },
  password: {
    type: String,
    required: [ true, 'Password is required' ],
    validate: [ validator.isLength, { min: 6, max: 12, message: 'Password must be between 6 and 12 characters' } ]
  },
  passwordConfirmation: {
    type: String,
    required: [ true, 'Password confirmation is required' ],
    validate: {
      validator: function ( el ) {
        return el === this.password;
      }
    }
  }
},
  {
    timestamps: true
  }
);



userSchema.pre( 'save', async function ( next ) {
  this.password = await bcrypt.hash( this.password, 12 );
  this.passwordConfirmation = undefined;
  next();
} );

const User = mongoose.model( 'User', userSchema );

module.exports = User;
