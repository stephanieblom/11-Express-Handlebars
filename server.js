const express = require( "express" );
const bodyParser = require('body-parser');
const mysql = require( 'mysql' );

const PORT = process.env.PORT || 8080;
const app = express();

class Database {
    constructor( config ) {
        this.connection = mysql.createConnection( config );
    }
    query( sql, args=[] ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
  }
// at top INIT DB connection
const db = new Database({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Root1234",
    database: "burgers_db"
  });


// to serve static content from the 'html' directory
app.use(express.static('html'));
// needed for POST FORM decoding
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, function() {
    console.log(`App running on: http://localhost:${PORT}`);
  });


//Routes 

app.get( '/api/burgers', async function( req, res ){
  const myBurgerList = await db.query( "SELECT * FROM burgers" );
  console.log( `[/api/burgers] sending back list: `, myBurgerList  );
  // tablelist is FIRST 5
  res.send( myBurgerList );
} )

app.post( '/api/newBurger/:name', async function( req, res ){
  console.log( `<< new burger received: `, req.params.name );
  
  // save to database
  const result = await db.query( `INSERT INTO burgers (burger_name, devoured)`+ `VALUES('${req.params.name}',0)` );

  // respond with something
  res.send( { message: `Thank you, saved: ${req.params.name}` } );
})

app.post( '/api/devourBurger/:id', async function( req, res ){
  console.log( `<< devour burger received: `, req.body.name );
  
  // save to database
  const burgerUpdate = await db.query( 
    "UPDATE burgers SET devoured=? WHERE id=?",
    [  1, req.body.id ] );

  //respond with something
  console.log(`burgerUpdate: `, burgerUpdate)
  res.send( burgerUpdate );
})

app.get( '/api/burgerUpdate/:id', async function( req, res ){
  console.log(`Pulling updated burger with id`, req.params.id)
  const myBurger = await db.query( "SELECT * FROM burgers WHERE id=?",
  [  req.params.id ] );
  console.log( `[/api/burgers] sending back burger: `, myBurger  );

  res.send( myBurger );
} )
