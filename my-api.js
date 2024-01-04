const express = require("express");
//Database
const database = require("./database");
const shelf = express();

//Get --------------------------->

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

/*
Route: "/publications"
Description: API call to get all publications in database
Access: Public
Parameters: NO
Methods: GET
*/

shelf.get("/publications", (request, response) => {
    return response.json({Publication: database.publication})
}); 
/*
Route: "/books/:isbn"
Description: API call to get specific book in database
Access: Public
Parameters: isbn
Methods: GET
*/
shelf.get("/pub/:id", (request, response) => {
    const getPublicationbyID = database.publication.filter((publication) => publication.ID === request.params.id);
    if(getPublicationbyID.length === 0)
    {
        return response.json({error : `No author found for this ${request.params.id} ID`});
    }
    return response.json({Publication: getPublicationbyID});
});
/*
Route: "/authors"
Description: API call to get all authors in database
Access: Public
Parameters: NO
Methods: GET
*/
shelf.get("/authors", (request, response) => {
    return response.json({Authors: database.author})
});
shelf.listen(3000, () => {
    console.log("Server is up and running");
});