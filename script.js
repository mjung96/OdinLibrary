class Book {
    constructor() {
        this.title = "title: " + form.title.value; 
        this.author = "author: " + form.author.value; 
        this.pages = "# of pages: " + form.pages.value; 
        this.read = form.read.checked; 
    }
}
let Library = [];
let newBook;
const AddBookForm = document.getElementById('new-book-pop-up');
const closeNewBookForm = document.getElementsByTagName('span')[0];
const addButton = document.querySelector('#add-button');
addButton.addEventListener('click', addBookToLibrary);
const addBookButton = document.querySelector('#add-book-button');
addBookButton.addEventListener('click', () => AddBookForm.style.display = 'block');
closeNewBookForm.addEventListener('click', () => AddBookForm.style.display = 'none');

function addBookToLibrary() {
    event.preventDefault();
    AddBookForm.style.display = 'none';
    newBook = new Book(); 
    Library.push(newBook); 
    setData();
    render(); 
    form.reset();
}

function createBook(item) {
    const library = document.querySelector('#container');
    const book = document.createElement('div');
    const title = document.createElement('div');
    const author = document.createElement('div');
    const page = document.createElement('div');
    const removeButton = document.createElement('button');
    const readButton = document.createElement('button');
    book.classList.add('book');
    book.setAttribute('id', Library.indexOf(item));
    title.textContent = item.title;
    title.classList.add('title');
    book.appendChild(title);
    author.textContent = item.author;
    author.classList.add('author');
    book.appendChild(author);
    page.textContent = item.pages;
    page.classList.add('pages');
    book.appendChild(page);
    readButton.classList.add('readButton')    
    book.appendChild(readButton);

    if (item.read === false) {
        readButton.textContent = 'Not Read';
        readButton.style.backgroundColor = 'red';
    }
    else {
        readButton.textContent = 'Have Read';
        readButton.style.backgroundColor = 'green'
    }

    removeButton.textContent = 'Delete'; 
    removeButton.setAttribute('id', 'removeButton');
    book.appendChild(removeButton);
    library.appendChild(book);
    removeButton.addEventListener('click', () => {
        Library.splice(Library.indexOf(item),1);
        setData()
        render();
    });
    readButton.addEventListener('click', () => { 
        item.read = !item.read; 
        setData(); 
        render();
    }); 
};

function setData() {
    localStorage.setItem(`Library`, JSON.stringify(Library));
}

function render() {
    const display = document.getElementById('container');
    const books = document.querySelectorAll('.book');
    books.forEach(book => display.removeChild(book));
    for (let i = 0; i < Library.length; i++){
        createBook(Library[i]);
    }
}

function restore() {
    if (!localStorage.Library) {
        render();
    }
    else {
        let objects = localStorage.getItem('Library') 
        objects = JSON.parse(objects);
        Library = objects;
        render();
    }
}

restore();