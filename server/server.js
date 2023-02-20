const express = require( 'express' );
const db = require( './db/conexion' );
const userRoutes = require( './routes/userRoutes' );
const cors = require( 'cors' );

const app = express();

const port = process.env.PORT || 5000;

// Middlewares
app.use( cors(
  {
    origin: 'http://localhost:3000',
    credentials: true
  }
) );
app.use( express.json() );

// Routes
app.use( '/api/users', userRoutes );



// Connect to database
db.conexion();

app.listen( port, () => {
  console.log( `Server is running in http://localhost:${ port }` );
} );
