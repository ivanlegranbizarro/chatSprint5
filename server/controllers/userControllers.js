const User = require( '../models/userModel' );
const signToken = require( '../helpers/jwt' );

const userControllers = {
  register: async ( req, res ) => {
    const { name, email, password, passwordConfirmation } = req.body;

    try {
      const user = await User.create( { name, email, password, passwordConfirmation } );

      const token = signToken( user._id );

      res.status( 201 ).json( {
        success: true,
        data: {
          user,
          token
        }
      } );
    } catch ( err ) {
      res.status( 400 ).json( {
        success: false,
        message: err
      } );
    }
  },

  login: async ( req, res ) => {
    const { email, password } = req.body;
    try {
      const user = findOne( { email } );

      if ( !user ) {
        res.status( 404 ).json( {
          success: false,
          message: 'User not found'
        } );
      }

      const isCorrect = await user.correctPassword( password, user.password );

      if ( !isCorrect ) {
        res.status( 400 ).json( {
          success: false,
          message: 'Incorrect password'
        } );
      }

      const token = signToken( user._id );

      res.status( 200 ).json( {
        success: true,
        data: {
          user,
          token
        }
      } );

    } catch ( err ) {
      res.status( 400 ).json( {
        success: false,
        message: err
      } );
    }
  },

  logout: async ( req, res ) => {
    res.cookie( 'jwt', 'loggedout', {
      expires: new Date( Date.now() + 10 * 1000 ),
      httpOnly: true
    } );

    res.status( 200 ).json( {
      success: true,
      data: {}
    } );
  },
};

module.exports = userControllers;
