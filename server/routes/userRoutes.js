const router = require( 'express' ).Router();
const userControllers = require( '../controllers/userControllers' );
const protect = require( '../middlewares/authMiddleware' );


router.post( '/register', userControllers.register );

router.post( '/login', userControllers.login );

router.get( '/get-current-user', protect, userControllers.getCurrentUser );


module.exports = router;
