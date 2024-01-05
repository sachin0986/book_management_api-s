const books = [
    {
        ISBN: "102Book",
        title: "A Brief History Of Time",
        publicationDate: "08-07-2023",
        language: "ENG",
        numPages: "289",
        author: [1, 2],
        publications: [1],
        category: ["Hestory", "Time"]
    },
    {
        ISBN: "104Book",
        title: "Gone Girl",
        publicationDate: "12-06-2023",
        language: "GER",
        numPages: "200",
        author: [1, 3],
        publications: [2],
        category: ["Female", "Love", "Romance"]
    },
    {
        ISBN: "828Flight",
        title: "Manifest",
        publicationDate: "12-06-2023",
        language: "ENG",
        numPages: "1000",
        author: [3],
        publications: [3],
        category: ["Maturity", "Suspense", "Family", "Drama"]
    }
]

const authors = [
    {
        ID: 1,
        name: "Sachin Arora",
        books: ["102Book", "104Book" ]
    },
    {
        ID: 2,
        name: "Merk",
        books: ["102Book", "Harry-Porter"]
    },
    {
        ID: 3,
        name: "Jered",
        books: ["828Flight"]
    },
]

const publications = [
    {
        ID: 1,
        name: "Historical",
        books: ["102Book"]
    },
    {
        ID: 2,
        name: "Faminism",
        books: ["104Book"]
    },
    {
        ID: 3,
        name: "Stories",
        books: ["828Flight"]
    },


]

module.exports = {books, authors, publications}; //for security reasons we need to export that file to import it in other 