let myLibrary = [];
let key = 0;

const grid = document.querySelector('.grid-container');

const form = document.querySelector('form');

class Book {
  constructor(author, title, pages, status) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.status = status;
  }
}

function addBookToLibrary(Book) {
  myLibrary.push(Book);
}

function displayBooks() {
  cleardisplay();

  myLibrary.forEach((book, key) =>  {
    
    const display = document.createElement('div');
    display.classList.add('book');
    display.setAttribute('data-index', `${key}`);

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('removeButton')

    const readBtn = document.createElement('button');
    readBtn.classList.add('readButton');

    const btnContainer = document.createElement('div');


    removeBtn.innerHTML = "Remove";
    readBtn.innerHTML = "Change read status"

    const title = document.createElement('div');
    const author = document.createElement('div');
    const pages = document.createElement('div');
    const read = document.createElement('div');
    
    const labelContainer = document.createElement('div')

    
    let stat = 'read';
    if(!book.status) {
      stat = 'not read';
    }

    author.innerHTML = `<strong>Author:</strong> ${book.author}`;
    title.innerHTML = `<strong>Title:</strong> ${book.title}`;
    pages.innerHTML = `<strong>Pages:</strong> ${book.pages}`;
    read.innerHTML = `<strong>Status:</strong> ${stat}`
   
    labelContainer.appendChild(title);
    labelContainer.appendChild(author);
    labelContainer.appendChild(pages)
    labelContainer.appendChild(read);

    display.appendChild(labelContainer);
    grid.appendChild(display);

    display.appendChild(readBtn);
    display.appendChild(removeBtn);
    
  });

  const removeButtons = document.querySelectorAll('.removeButton');
  removeButtons.forEach((rmBtn) => {
    rmBtn.addEventListener('click', function(e) {
      const current = (rmBtn.parentNode.getAttribute('data-index'))
      removeBook(current);
    })
  })

  const changeStatButton = document.querySelectorAll('.readButton');
  changeStatButton.forEach((btn) => {
    btn.addEventListener('click', function(e) {
      const current = (btn.parentNode.getAttribute('data-index'));
      console.log(current);
      updateBook(current);
    })
  })

  
}

function updateBook(index) {
  myLibrary[index].status = !(myLibrary[index].status)
  displayBooks();
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

function submitForm() {
  const author = document.getElementById('author').value;

  const title = document.getElementById('title').value;

  const pages = document.getElementById('pages').value;

  let stat;

  if(document.getElementById('yes').checked) {
    stat = true;
  }

  if(document.getElementById('no').checked) {
    stat = false;
  }

  const newBook = new Book(author, title, pages, stat); 

  addBookToLibrary(newBook);

  displayBooks(myLibrary);

  form.reset();
  
  return false;
}

function cleardisplay() {
  while(grid.lastChild) {
    grid.removeChild(grid.lastChild);
  }
}

const HP1 = new Book('J.K. Rowling', "Harry Potter and the Sorceror's Stone", 223, true)

addBookToLibrary(HP1);

displayBooks();


