const mysql = require( 'mysql' );


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
    password: process.env.DB_PWD,
    database: "pictures"
});

async function selectAll( ){
    const burgerList = await db.query( "SELECT * FROM burger");
    return burgerList;
}

async function insertOne( myBurger ){
    const burgerInput = await db.query ("INSERT INTO burger (burger_name, devoured) VALUES(?,?)", [ myBurger.burgerName, myBurger.devoured ] );
    return burgerInput;
}

async function updateOne( myUpdate ){
    const burgerUpdate = await db.query( 
        "UPDATE thumbnails SET burger_name=?,devoured=? WHERE id=?",
        [ myUpdate.burgeName, myUpdate.devoured ] );
    return myResult;   
}



async function updateThumbnail( myEdit ){
    const myResult = await db.query( 
        "UPDATE thumbnails SET name=?,image_url=?,tags=? WHERE id=?",
        [ myEdit.name, myEdit.image_url, myEdit.tags, myEdit.id ] );
    return myResult;    
}

async function getThumbnail( myId ){
    const myData = await db.query( "SELECT * FROM thumbnails WHERE id=?", [ myId ] );
    return myData[0];
}
async function registerUser( myPost ){
    const myResult = await db.query( 
        "INSERT INTO users(first_name,last_name,email_address,user_password) VALUES(?,?,?,?)",
        [ myPost.first_name, myPost.last_name, myPost.email_address, myPost.user_password ] );
    return myResult;
}

async function checkUserStuff(checkUser) {
    const userInfo = await db.query("SELECT * FROM users WHERE email_address=?", [ checkUser.userEmail ] );
    return userInfo[0];

}

async function tagSearch( userId, tag ){
    console.log(`Calling listThumbnails with ${userId}, ${tag}`)
    return listThumbnails( userId, tag );
    // console.log(`orm tag: ${tag}`)
    // let query = `select * from thumbnails `+( tag ? `where tags like "%${tag.replace('"','').replace('"','')}%"` : '' );
    // console.log(`Query: ${query}`);
    // const tagSearchPictures = await db.query(query);
    // console.log(`orm search: ${JSON.stringify(tagSearchPictures)}`)
    // return tagSearchPictures;

}

async function addFavourite( userId, picID ){
    const myFav = await db.query ("INSERT INTO favourites (user_id, picture_id) VALUES(?,?)", [ userId, picID ] );
    return myFav;
}

async function deleteFavourite( userId, picID ){
    const myFav = await db.query("DELETE FROM favourites WHERE user_id=? AND picture_id=?", [ userId, picID ] );
    return myFav;
}


module.exports = { 
    selectAll,
    insertOne,
    updateOne,
}