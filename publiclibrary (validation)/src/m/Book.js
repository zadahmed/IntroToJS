/**
 * @fileOverview  The model class Book with attribute definitions and storage management methods
 * @author Gerd Wagner
 * @copyright Copyright © 2013-2014 Gerd Wagner, Chair of Internet Technology, Brandenburg University of Technology, Germany. 
 * @license This code is licensed under The Code Project Open License (CPOL), implying that the code is provided "as-is", 
 * can be modified to create derivative works, can be redistributed, and can be used in commercial applications.
 */
/**
 * Constructor function for the class Book 
 * @constructor
 * @param {{isbn: string, title: string, year: number}} slots - Object creation slots.
 */
function Book( slots) {
  // assign default values
  this.isbn = "";   // string
  this.title = "";  // string
  this.year = 0;    // number (int)
  if (arguments.length > 0) {
    this.setIsbn( slots.isbn); 
    this.setTitle( slots.title); 
    this.setYear( slots.year);
    if (slots.edition) {  // optional
      this.setEdition( slots.edition);
    }
  }
};
/***********************************************
 ***  Class-level ("static") properties  *******
 ***********************************************/
Book.instances = {};  // initially an empty collection (a map)

/*********************************************************
 ***  Class-level ("static") storage management methods **
 *********************************************************/
// Convert row to object
Book.checkIsbn = function (id) {
  if (!id) {
    return new NoConstraintViolation();
  } else if (typeof(id) !== "string" || id.trim() === "") {
    return new RangeConstraintViolation(
        "The ISBN must be a non-empty string!");
  } else if (!/\b\d{9}(\d|X)\b/.test( id)) {
    return new PatternConstraintViolation(
        "The ISBN must be a 10-digit string or "+
        " a 9-digit string followed by 'X'!");
  } else {
    return new NoConstraintViolation();
  }
};


Book.convertRow2Obj = function (bookRow) {
  var book = new Book( bookRow);
  return book;
};
// Load the book table from Local Storage
Book.retrieveAll = function () {
  var key="", keys=[], booksString="", books={}, i=0;  
  try {
    if (localStorage.getItem("books")) {
      booksString = localStorage.getItem("books");
    }
  } catch (e) {
    alert("Error when reading from Local Storage\n" + e);
  }
  if (booksString) {
    books = JSON.parse( booksString);
    keys = Object.keys( books);
    console.log( keys.length +" books loaded.");
    for (i=0; i < keys.length; i++) {
      key = keys[i];
      Book.instances[key] = Book.convertRow2Obj( books[key]);
    }
  }
};
//  Save all book objects to Local Storage
Book.saveAll = function () {
  var booksString="", error=false,
      nmrOfBooks = Object.keys( Book.instances).length;  
  try {
    booksString = JSON.stringify( Book.instances);
    localStorage.setItem("books", booksString);
  } catch (e) {
    alert("Error when writing to Local Storage\n" + e);
    error = true;
  }
  if (!error) console.log( nmrOfBooks + " books saved.");
};


Book.checkIsbnAsId = function (id) {
  var constraintViolation = Book.checkIsbn( id);
  if ((constraintViolation instanceof NoConstraintViolation)) {
    if (!id) {
      constraintViolation = new MandatoryValueConstraintViolation(
          "A value for the ISBN must be provided!");
    } else if (Book.instances[id]) {  
      constraintViolation = new UniquenessConstraintViolation(
          "There is already a book record with this ISBN!");
    } else {
      constraintViolation = new NoConstraintViolation();
    } 
  }
  return constraintViolation;
};

Book.prototype.setIsbn = function (id) {
  var validationResult = Book.checkIsbnAsId( id);
  if (validationResult instanceof NoConstraintViolation) {
    this.isbn = id;
  } else {
    throw validationResult;
  }
};

Book.prototype.toString = function () {
  return "Book{ ISBN:" + this.isbn + ", title:" + 
      this.title + ", year:" + this.year +"}"; 
};

//  Create a new book row
Book.add = function (slots) {
  var book = new Book( slots);
  // add book to the Book.instances collection
  Book.instances[slots.isbn] = book;
  console.log("Book " + slots.isbn + " created!");
};
//  Update an existing book row
Book.update = function (slots) {
  var book = Book.instances[slots.isbn];
  var year = parseInt( slots.year);
  if (book.title !== slots.title) book.title = slots.title;
  if (book.year !== year) book.year = year;
  console.log("Book " + slots.isbn + " modified!");
};
//  Delete a book row from persistent storage
Book.destroy = function (isbn) {
  if (Book.instances[isbn]) {
    console.log("Book " + isbn + " deleted");
    delete Book.instances[isbn];
  } else {
    console.log("There is no book with ISBN " + isbn + " in the database!");
  }
};
/*******************************************
*** Auxiliary methods for testing **********
********************************************/
//  Create and save test data
Book.generateTestData = function () {
  Book.instances["006251587X"] = new Book({isbn:"006251587X", title:"Weaving the Web", year:2000});
  Book.instances["0465026567"] = new Book({isbn:"0465026567", title:"GÃ¶del, Escher, Bach", year:1999});
  Book.instances["0465030793"] = new Book({isbn:"0465030793", title:"I Am A Strange Loop", year:2008});
  Book.saveAll();
};
//  Clear data
Book.clearData = function () {
  if (confirm("Do you really want to delete all book data?")) {
    Book.instances = {};
    localStorage.setItem("books", "{}");
  }
};
