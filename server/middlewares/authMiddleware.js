const jwt = require( 'jsonwebtoken' );
const dotenv = require( 'dotenv' );

dotenv.config();

const protect = async ( req, res, next ) => {
  try {
    const token = req.headers.authorization.split( ' ' )[ 1 ];
    const decoded = jwt.verify( token, process.env.JWT_SECRET );
    req.user = {};
    req.user.id = decoded.id;
    next();
  } catch ( error ) {
    res.status( 401 ).json( {
      success: false,
      message: 'Not authorized'
    } );
  }
};

module.exports = protect;
