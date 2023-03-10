const jwt = require( 'jsonwebtoken' );
const dotenv = require( 'dotenv' );

dotenv.config();

const signToken = ( id ) => {
  return jwt.sign( { id }, process.env.JWT_SECRET, {
    expiresIn: 3600
  } );
};

module.exports = signToken;
