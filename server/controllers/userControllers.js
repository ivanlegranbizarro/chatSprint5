const User = require( '../models/userModel' );

const userControllers = {
  register: async ( req, res ) => {
    const { name, email, password, passwordConfirmation } = req.body;

    try {
      const user = await User.create( { name, email, password, passwordConfirmation } );

      res.status( 201 ).json( {
        success: true,
        data: {
          user
        }
      } );
    } catch ( err ) {
      res.status( 400 ).json( {
        success: false,
        message: err
      } );
    }
  },

  login: async ( req, res ) => { },

  logout: async ( req, res ) => { },
};

module.exports = userControllers;
