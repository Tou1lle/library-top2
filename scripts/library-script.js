const bookshelf = document.querySelector(".bookshelf");
const dialog = document.querySelector("dialog");
const addBookButton = document.querySelector(".button-add-book");
const closeDialogButton = document.querySelector(".close-dialog-button");

const myLibrary = []

function Book(author, title, pages, isRead) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.isRead = isRead;
}

function addBookToLibrary(bookNode) {
    myLibrary.push(bookNode);
}

/**
 * Every book in the array is appended to the "bookshelf node"
 * This way it is showed on the website
 */
function showBooks() {
    myLibrary.forEach((book) => {
        bookshelf.appendChild(book);
    });
}

/**
 * Create book node to add to html
 * @param {Book} book 
 */
function createBookNode(book) {
    // Create all the element components of the book
    const bookDOM = document.createElement("div");
    const bookAuthor = document.createElement("p");
    const bookTitle = document.createElement("p");
    const bookPages = document.createElement("p");
    const bookButtonsContainer = document.createElement("div");
    const bookButtonRead = document.createElement("button");
    const bookButtonRemove = document.createElement("button");

    // Add text content to each element -> book info
    bookAuthor.textContent = book.author;
    bookTitle.textContent = book.title;
    bookPages.textContent = book.pages;
    
    // Button text for read/not red, add classes
    if (book.isRead) {
        bookButtonRead.textContent = "read";
        bookButtonRead.classList.add("button", "read");
    } else {
        bookButtonRead.textContent = "not read";
        bookButtonRead.classList.add("button", "not-read");
    }
    bookButtonRemove.textContent = "remove";

    // Add classes to all elements
    bookDOM.classList.add("book-item");
    bookButtonsContainer.classList.add("book-buttons");

    // Append all corresponding children with parents
    bookDOM.append(bookAuthor, bookTitle, bookPages, bookButtonsContainer);
    bookButtonsContainer.append(bookButtonRead, bookButtonRemove);

    return bookDOM;
}

/**
 * Open & close the dialog window
 */
function openDialog() {
    dialog.showModal();
}

function closeDialog() {
    dialog.close();
}

/**
 * Test
 */

const harryPotter = new Book("J.K. Rowling", "Harry Potter", 500, false)
const lotr = new Book("Tolkien", "Lord of the Rings", 600, true);

const harryPotterDOM = createBookNode(harryPotter);
const lotrDOM = createBookNode(lotr);

addBookButton.addEventListener("click", openDialog);
closeDialogButton.addEventListener("click", closeDialog);