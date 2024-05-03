
// logIn MongoDB with sachinarora0986@gmail.com
// mongoDB and mongooes are related to asyncronus

// for that we have to write the format of async - await
const express = require("express");
//const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const shelf = express();
shelf.use(bodyParser.urlencoded({extended: true}));  //In ordre to acess the post data we use that 
shelf.use(bodyParser.json()); //this is just for making our code bug free
//DataBase
const dataBase = require("./database/database");

// Models

//const BookModel = require("./database/book");
//const AuthorModel = require("./database/author"); 
//const PublicationModel = require("./database/publication"); 

//GET

 // API call for all books in DataBase
shelf.get("/books", async (request, response,) => {
    const getAllBooks = await BookModel.find(); // the find function is used for finding things in database using parametes passed in it 
    return response.json(getAllBooks);
});

//API call for get specific book
shelf.get("/books/:isbn", (request,response) => {
    const getSpecificBook = dataBase.books.filter(
        (book) =>  book.ISBN === request.params.isbn
    );
    if(getSpecificBook.length === 0)
    {
        return response.json({error: `No result found for ${request.params.isbn}`});
    }
    return response.json({book: getSpecificBook});
});

//API call for get Books from Category
shelf.get("/cat/:category", (request, response) => {
    const getCatBook = dataBase.books.filter(
        (book) => book.category.includes(request.params.category)  /*includes() search in the array that 
                                                                   any matching parameter present in that array or not */
    );
    if(getCatBook.length === 0)
    {
        return response.json({error: `No result found for this ${request.params.category} category`});
    }
    return response.json({book: getCatBook});
});

//API call to get Books based on languages 
shelf.get("/lang/:language", (request, response) => {
    const getBookLang = dataBase.books.filter(
        (book) => book.language === request.params.language
    );
    if(getBookLang.length === 0)
    {
        return response.json({error: `No book found on this ${request.params.language} language`});
    }
    return response.json({book: getBookLang});
});


//Authors

//API call to get all authors
shelf.get("/author", (request, response) => {
    return response.json({author: dataBase.author});
});

// API call to get specific authors 
shelf.get("/auth/identifier/:id", (request, response) => {
    const getAuhtorId = dataBase.author.filter(
    (author) => author.ID === parseInt(request.params.id)
    );
    if(getAuhtorId.length === 0)
    {
        return response.json({error: `No author found on this ID - ${request.params.id} `});
    }
    return response.json({author: getAuhtorId});
});


//API call to get a list of author based on books
shelf.get("/auth/book/:isbn", (request, response) => {
    const getSpecificAuthor = dataBase.author.filter(
        (author) => author.books.includes(request.params.isbn)
    );
    if(getSpecificAuthor.length === 0)
    {
        return response.json({error: `No author found for this ISBN ${request.params.isbn}`});
    }
    return response.json({authors: getSpecificAuthor});
});


//Publications

//API call to get all publications
shelf.get("/publications", (request, response) => {
    return response.json({publications: dataBase.publication});
});

//API call to get specific publication based on id
shelf.get("/public/:id", (request,response) => {
    const getPubliocation = dataBase.publication.filter(
        (publication) =>  publication.ID === parseInt(request.params.id)
    );
    if(getPubliocation.length === 0)
    {
        return response.json({error: `No result found for ${request.params.id}`});
    }
    return response.json({publication: getPubliocation});
});

//API call to get publication list based on books
shelf.get("/pub/book/:isbn", (request, response) => {
    const getPublicationBook = dataBase.publication.filter(
        (publication) => publication.books.includes(request.params.isbn)
    );
    if(getPublicationBook.length === 0)
    {
        return response.json({error: `No publication found on this ${request.params.isbn} ISBN`});
    }
    return response.json({publication: getPublicationBook});
});



//POST
//Books
// API call to post a new book
shelf.post("/books/new", (request,response) => {
    const newBook = request.body;
    dataBase.books.push(newBook);
    return response.json({updatedBook: dataBase.books});
});

//auhtor
// API call to post a new author
shelf.post("/auth/new", (request, response) => {
    const newAuth = request.body;
    dataBase.author.push(newAuth);
    return response.json({updatedAuthor: dataBase.author});
});

//publication
// API call to post a new publucation
shelf.post("/publication/new", (request, response) => {
    const newPub = request.body;
    dataBase.publication.push(newPub);
    return response.json({updatedPublication: dataBase.publication});
});


//PUT
// API call to update an exesting publication and books at the same time 
shelf.put("/publication/update/book/:isbn", (request, response) => {
    dataBase.publication.forEach((pub) => {   // we use forEach because we do not want to return anything
        if(pub.ID === request.body.pubId)
        {
            return pub.books.push(request.params.isbn);
        }
    });
    
    dataBase.books.forEach((book) => {
        if(book.ISBN === request.params.isbn)
        {
            book.publications = request.body.pubId;
            return;
        }
    });
    return response.json({
        book: dataBase.books,
        publication: dataBase.publication,
        message: "Successfully Updated"
    });
});


// DELETE
// API call to delete the book using isbn number 
shelf.delete("/book/delete/:isbn", (request, response) => {
        const updatedBookDatabase = dataBase.books.filter((book) => 
            book.ISBN !== request.params.isbn
        );
        dataBase.books = updatedBookDatabase;
        return response.json({
            Books: dataBase.books,
            message: `That isbn ${request.params.isbn} number book is deleted `
        });
});

//API call to Delete author form book

shelf.delete("/delete/book/author/:isbn/:id", (request, response) => {
    dataBase.books.forEach((book) => 
    {
        if(book.ISBN === request.params.isbn)
        {
            const newBookAuth = book.author.filter(
                (auth) => auth !== parseInt(request.params.id));

                book.author = newBookAuth;   //stuck here
                return;
        }
    });
    return response.json({
        Book: dataBase.books,
        message: `The author id ${request.params.id} is successfuly delete from ${request.params.isbn}`
    });
});


// API to Delete author form book and related book form author
shelf.delete("/book/delete/author/:isbn/:auhtorId", (request, response) => {
     dataBase.books.forEach((book) => {
        if(book.ISBN === request.params.isbn)
        {
            const newAuthorList = book.author.filter(
                (eachAuhtor) => eachAuhtor !== parseInt(request.params.auhtorId)); 
        
        book.author = newAuthorList;
        return;
        }
     });

     dataBase.author.forEach((auth) => {
        if(auth.ID === parseInt(request.params.auhtorId))
        {
            const newBookList = auth.books.filter(
                (eachBook) => eachBook !== request.params.isbn);
                auth.books = newBookList;
                return;
        }
     });
        return response.json({
            Book: dataBase.books,
            author: dataBase.author,
            message: `Both author number ${request.params.auhtorId} and Book ${request.params.isbn} are deleted `
        });
});


//Server Port
shelf.listen(3000, () => {
    console.log("Server is up and running");
});