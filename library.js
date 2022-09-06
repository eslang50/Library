let myLibrary = [];
let key = 0;

const HP1 = new Book("Harry Potter and the Sorceror's Stone", 'J.K. Rowling', 223, true)

const grid = document.querySelector('.grid-container');

const form = document.querySelector('form');


function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary(Book) {
  myLibrary.push(Book);
}

function displayBooks() {
  cleardisplay();

  myLibrary.forEach((book, key) =>  {
    
    const display = document.createElement('div');
    display.setAttribute('data-index', `${key}`);

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('removeButton')

    const readBtn = document.createElement('button');
    readBtn.classList.add('readButton');

    removeBtn.innerHTML = "Remove";
    readBtn.innerHTML = "Change read status"

    const author = document.createElement('div');
    const title = document.createElement('div');
    const pages = document.createElement('div');
    const read = document.createElement('div');
    
    let stat = 'read';
    if(!book.status) {
      stat = 'not read';
    }

    author.innerHTML = `<strong>Author:</strong> ${book.author}`;
    title.innerHTML = `<strong>Title:</strong> ${book.title}`;
    pages.innerHTML = `<strong>Pages:</strong> ${book.pages}`;
    read.innerHTML = `<strong>Status:</strong> ${stat}`
   

    display.appendChild(author);
    display.appendChild(title);
    display.appendChild(pages)
    display.appendChild(read);

    grid.appendChild(display);

    display.appendChild(readBtn)
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
      const current = btn.parentNode.getAttribute('data-index');
      console.log(current);
      updateBook(current)
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

  const stat = document.getElementById('status').value;

  let tf = false;

  if(stat == 'Yes') {
    tf = true;
  }

  const newBook = new Book(author, title, pages, tf); 

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

addBookToLibrary(HP1);

displayBooks();


