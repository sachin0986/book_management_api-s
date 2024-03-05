const express = require("express");
//Database
const database = require("./database");
//All this for posting the data
// Defination -----> 
var bodyParser = require("body-parser");
const shelf = express();
shelf.use(bodyParser.urlencoded({extended: true}));  //In ordre to acess the post data we use that 
shelf.use(bodyParser.json()); //this is just for making our code bug free

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
Route: "/books/category"
Description: API call to get specific book in database
Access: Public
Parameters: isbn
Methods: GET
*/

shelf.get("/book/catg/:category", (request, response) => {
    const getBookbyCategory = database.books.filter((book) => book.category.includes(request.params.category)); /*includes() search in the array that 
                                                                                                                any matching parameter present in that array or not */
    if(getBookbyCategory.length === 0)
    {
        return response.json({error: `No book found for ${request.params.category} type of category`})
    }
    return response.json({Books: getBookbyCategory});
});

// ------------------------------------------------------------------------------------------------------------>
/*
Route: "/books/language"
Description: API call to get specific book by their language from database
Access: Public
Parameters: isbn
Methods: GET
*/
shelf.get("book/lang/:language", (request,response) => {
    const getBookByLanguage = database.books.filter((book) => book.language.includes(request.params.language));
    if(getBookByLanguage.length === 0)
    {
        return response.json({error: `No books found for ${request.params.language} type of Language`})
    }
    return response.json({Books : getBookByLanguage});
});

// ------------------------------------------------------------------------------------------------------------>
/*
Route: "/publications"
Description: API call to get all publications in database
Access: Public
Parameters: NO
Methods: GET
*/

shelf.get("/book/lang/:language", (request, response) => {
    const getBookbyLanguage = database.books.filter((book) => book.language.includes(request.params.language));
    if(getBookbyLanguage.length === 0)
    {
        return response.json({error: `No book found for ${request.params.language}`});
    }
    return response.json({Book: getBookbyLanguage});
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

shelf.get("/publication/:name", (request,response) => {
    const getPublicationByName = database.publications.filter((publication) => publication.name.includes(request.params.name));
    if(getPublicationByName.length === 0)
    {
        return response.json({error : `No Publication found of this ${request.params.name} nane `});
    }
    return response.json({Publication : getPublicationByName});
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
Route: "/books/:isbn"
Description: API call to get specific publication in database
Access: Public
Parameters: isbn
Methods: GET
*/

shelf.get("/pub/book/:isbn", (request, response) => {
    const getPublicationByBook = database.publications.filter((publication) => publication.books.includes(request.params.isbn));
    if(getPublicationByBook.length === 0)
    {
        return response.json({Error: `No Publication found for this Book ${request.params.isbn} isbn number`});
    }
    return response.json({Publication : getPublicationByBook});
}) ;

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


// ------------------------------------------------------------------------------------------------------------>
/*
Route: "/authors"
Description: API call to get all authors in database
Access: Public
Parameters: 
Methods: GET
*/
shelf.get("/author/:name", (request,response) => {
    const getAuthorByName = database.authors.filter((author) => author.name.includes(request.params.name));
    if(getAuthorByName.length === 0)
    {
        return response.json({error : `No author found of this ${request.params.name}`});
    }
    return response.json({Author : getAuthorByName});

});

// ------------------------------------------------------------------------------------------------------------>
/*
Route: "/authors"
Description: API call to get specific authors in database
Access: Public
Parameters: ID
Methods: GET
*/

shelf.get("/auth/book/:isbn", (request, response) => {
    const getAuthorByBook = database.authors.filter((author) => author.books.includes(request.params.isbn));
    if(getAuthorByBook.lenght === 0)
    {
        return response.json({Error : `No Author found for this Book ${request.params.isbn} number`});
    }
    return response.json({Author : getAuthorByBook});
}) ;
/*------------------------------------------------------------------------------------------------------------------- */



//POST --------------------------------------------------------------------------------------------------------------
/*
Route: "/authors"
Description: API call to get specific authors in database
Access: Public
Parameters: ID
Methods: POST
*/
shelf.post("/book/new", (request, response) => {
    const newBook = request.body;
    database.books.push(newBook);
    return response.json({UpdatedBook : database.books});
});

//POST --------------------------------------------------------------------------------------------------------------
/*
Route: "/authors"
Description: API call to get specific authors in database
Access: Public
Parameters: ID
Methods: POST
*/
shelf.post("/publication/new", (request, response) => {
    const newPublication = request.body;
    database.publications.push(newPublication);
    return response.json({UpdatedPublications: database.publications});
});    

//POST --------------------------------------------------------------------------------------------------------------
/*
Route: "/authors"
Description: API call to get specific authors in database
Access: Public
Parameters: ID
Methods: POST
*/
shelf.post("/author/new", (request,response) => {
    const newAuthor = request.body;
    database.authors.push(newAuthor);
    return response.json({UpdatedAuthor : database.authors});
});

//PUT --------------------------------------------------------------------------------------------------------------
/*
Route: "/authors"
Description: API call to get specific authors in database
Access: Public
Parameters: ID
Methods: PUT
*/

//update book details if author is chnaged.
shelf.put("/publication/update/book/:isbn", (request,response) => {
database.publications.forEach((pub) => {            //forEach is used because we don't want to return any thing
    if(pub.ID === request.body.pubId)
    {
        return pub.books.push(request.params.isbn);
    }
})

//now books database
database.books.forEach((book) => {
if(book.ISBN === request.params.isbn)
{ 
     book.publications = request.body.pubId;
     return;
}
return response.json({
    books : database.books,
    publications : database.publications,
    message : "Sucessfully updated Publications"
});
});
});



//also add update using post request

//DELETE --------------------------------------------------------------------------------------------------------------
/*
Route: "/authors"
Description: API call to get specific authors in database
Access: Public
Parameters: ID
Methods: POST
*/
shelf.post("", (request,response) => {
    
});

shelf.listen(3000, () => {
    console.log("Server is up and running");
});
