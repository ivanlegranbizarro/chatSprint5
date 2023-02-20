const express = require( 'express' );
const db = require( './db/conexion' );
const userRoutes = require( './routes/userRoutes' );

const app = express();

const port = process.env.PORT || 5000;

// Middlewares
app.use( express.json() );

// Routes
app.use( '/api/users', userRoutes );



// Connect to database
db.conexion();

app.listen( port, () => {
  console.log( `Server is running in http://localhost:${ port }` );
} );
