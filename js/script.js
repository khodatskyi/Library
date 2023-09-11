const container = document.getElementById('container')
const buttonAddNewBook = document.getElementById('new-book')
const createNewCard = document.getElementById('create-new-card')
const myLibrary = []

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = () => {
        return `${title} ${author} ${pages}. You are read this? ${read}`
    }
}

function createCart(bookObj) {
    // Создаем контейнер и заполняем его тегами п
    let newCart = document.createElement('div')
    let nameBook = document.createElement('p')
    let author = document.createElement('p')
    let pages = document.createElement('p')
    let readOrNot = document.createElement('p')
    let button = document.createElement('button')

    // Добавляем в теги п названия
    newCart.className = 'cards'
    nameBook.textContent = bookObj.title
    nameBook.className = 'book-title'
    author.textContent = bookObj.author
    pages.textContent = bookObj.pages
    readOrNot.textContent = `You are read this book?   ${bookObj.read}`
    button.textContent = `Delete`
    button.className = 'deleteButton'
    button.onclick = removeBook


    // Привязываем теги п к своим родителям
    container.appendChild(newCart)
    newCart.appendChild(nameBook)
    newCart.appendChild(author)
    newCart.appendChild(pages)
    newCart.appendChild(readOrNot)
    newCart.appendChild(button)
}

// При нажатии на "Add new book" появляется форма для заполнения данных о книге
buttonAddNewBook.addEventListener('click', function () {
    const displayNewBook = document.getElementById('display-add-book-button');
    const overlay = document.getElementById('overlay-button');

    displayNewBook.classList.remove('display-add-book');
    displayNewBook.classList.add('display-add-book-active');

    overlay.classList.remove('overlay');
    overlay.classList.add('overlay-active');

    overlay.addEventListener('click', () => {
        displayNewBook.classList.remove('display-add-book-active')
        displayNewBook.classList.add('display-add-book');

        overlay.classList.remove('overlay-active')
        overlay.classList.add('overlay');
    });

})

// При заполнения всех полей в форме и нажатии на кнопку мы создаем обьект с указаными данными
createNewCard.addEventListener('click', (event) => {
    event.preventDefault();

    const title = document.getElementById('title')
    const author = document.getElementById('author')
    const pages = document.getElementById('pages')

    if (title.value.trim() != '' && author.value.trim() != '' && pages.value.trim()) {
        let newCard = new Book(title.value, author.value, pages.value)
        myLibrary.push(newCard)
        createCart(newCard)
    }

})

function removeBook() {
    const cardToRemove = event.target.closest('.cards'); // Находим родительскую карточку
    if (cardToRemove) {
        cardToRemove.remove(); // Удаляем карточку
        console.log(cardToRemove)
    }
}