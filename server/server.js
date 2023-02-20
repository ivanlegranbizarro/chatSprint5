const express = require( 'express' );
const db = require( './db/conexion' );

const app = express();

const port = process.env.PORT || 5000;



// Connect to database
db.conexion();

app.listen( port, () => {
  console.log( `Server is running in http://localhost:${ port }` );
} );
