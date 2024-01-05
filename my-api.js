const express = require("express");
//Database
const database = require("./database");
const shelf = express();

//Get ------------------------------------------------------------------------------------------------------------>

/*
Route: "/books" --> "/" --> for root route
Description: API call to get all books in database
Access: Public
Parameters: NO
Methods: GET
*/
shelf.get("/books", (request, response) => {
    return response.json({Books: database.books})
});
// ------------------------------------------------------------------------------------------------------------>
/*
Route: "/books/:isbn"
Description: API call to get specific book in database
Access: Public
Parameters: isbn
Methods: GET
*/

shelf.get("/book/:isbn", (request, response) => {
    const getSpecificBook = database.books.filter((book) => book.ISBN === request.params.isbn);
    if(getSpecificBook.length === 0)
    {
        return response.json({error: `No book found for this ${request.params.isbn} number`});
    }
    return response.json({Books: getSpecificBook});
});
// ------------------------------------------------------------------------------------------------------------>
/*
Route: "/publications"
Description: API call to get all publications in database
Access: Public
Parameters: NO
Methods: GET
*/

shelf.get("/publications", (request, response) => {
    return response.json({Publication: database.publications})
}); 
// ------------------------------------------------------------------------------------------------------------>
/*
Route: "/books/:isbn"
Description: API call to get specific publication in database
Access: Public
Parameters: isbn
Methods: GET
*/
shelf.get("/pub/:id", (request, response) => {
    const getPublicationbyID = database.publications.filter((publication) => publication.ID === parseInt(request.params.id));
    if(getPublicationbyID.length === 0) //parseInt ---> is used to convert the string input to interger value because the value in database is in interger form. 
    {
        return response.json({error : `No publication found for this ${request.params.id} ID`});
    }
    return response.json({Publication: getPublicationbyID});
});
// ------------------------------------------------------------------------------------------------------------>
/*
Route: "/authors"
Description: API call to get all authors in database
Access: Public
Parameters: 
Methods: GET
*/
shelf.get("/authors", (request, response) => {
    return response.json({Authors: database.authors})
});
// ------------------------------------------------------------------------------------------------------------>
/*
Route: "/authors"
Description: API call to get specific authors in database
Access: Public
Parameters: ID
Methods: GET
*/
shelf.get("/auth/:id", (request, response) => {
    const getAuthorbyID = database.authors.filter((author) => author.ID === parseInt(request.params.id));
    if(getAuthorbyID.length === 0)
    {
        return response.json({error : `No author found for this ${request.params.id} ID`});
    }
    return response.json({Author: getAuthorbyID});
});

/*------------------------------------------------------------------------------------------------------------------- */

shelf.listen(3000, () => {
    console.log("Server is up and running");
});
