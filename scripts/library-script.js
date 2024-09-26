// The main body where the book items are
const bookshelf = document.querySelector(".bookshelf");
//const bookButtonRemove = document.querySelector(".button-remove")
// Dialog and button for opening the dialog
const dialog = document.querySelector("dialog");
const addBookButton = document.querySelector(".button-add-book");
// Close dialog button
const closeDialogButton = document.querySelector(".close-dialog-button");
// Form elements
const formButtonAddBook = document.querySelector(".form-button-add-book");
const inputAuthor = document.querySelector("#author");
const inputTitle = document.querySelector("#title");
const inputPages = document.querySelector("#pages");
const inputCheckbox = document.querySelector("#read-book");
const form = document.querySelector("form");

const myLibrary = []

/**
 * 
 * @param {string} author 
 * @param {string} title 
 * @param {*} pages 
 * @param {boolean} isRead 
 */
function Book(author, title, pages, isRead) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.isRead = isRead;
    this.index = myLibrary.length;
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
    bookButtonRemove.classList.add("button-remove");
    bookButtonRemove.id = book.index;
    bookButtonRemove.addEventListener("click", removeBook);

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
 * Get data from user - form
 */
function getDataForm(event) {
    event.preventDefault();
    
    const author = inputAuthor.value;
    const title = inputTitle.value;
    const pages = inputPages.value;
    const isRead = inputCheckbox.checked;

    const book = new Book(author, title, pages, isRead);

    const bookDOM = createBookNode(book);
    addBookToLibrary(bookDOM);
    showBooks();
    form.reset();
    closeDialog()
}

function removeBook(event) {
    const buttonRemove = event.target;
    const removedBooks = myLibrary.splice(buttonRemove.id, 1);
    removedBooks[0].remove();

    for(let i = buttonRemove.id; i < myLibrary.length; i++) {
        myLibrary[i].childNodes[3].childNodes[1].id = i;
    }
}

/**
 * Event listeners for buttons
 */
addBookButton.addEventListener("click", openDialog);
closeDialogButton.addEventListener("click", closeDialog);

form.addEventListener("submit", getDataForm);
//bookButtonRemove.addEventListener("click", removeBook);