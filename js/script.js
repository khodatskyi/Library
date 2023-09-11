const container = document.getElementById('container')
const buttonAddNewBook = document.getElementById('new-book')


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
function addBookToLibrary(book) {
    myLibrary.push(book)
    // createCart(container, book)
    createCart(container, myLibrary[myLibrary.length - 1])
    console.log(myLibrary)

}

function createCart(container, bookObj) {
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

    // Привязываем теги п к своим родителям
    container.appendChild(newCart)
    newCart.appendChild(nameBook)
    newCart.appendChild(author)
    newCart.appendChild(pages)
    newCart.appendChild(readOrNot)
    newCart.appendChild(button)
}

function deleteCart(myLibrary) {
    //  Мы получем а аргументе массив. И далее по нажатии на кнопку "удалить" удаляем карточку со страницы и с нашего массива
    let deleteButtons = document.querySelectorAll(".deleteButton");

    deleteButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            let parentDiv = event.target.closest(".cards");
            let bookTitleElement = parentDiv.querySelector(".book-title");
            parentDiv.remove();

            myLibrary.forEach((e) => {
                if (bookTitleElement.textContent == e.title) {
                    let indexBook = myLibrary.indexOf(e)
                    myLibrary.splice(indexBook, 1)
                    console.log(myLibrary)
                }
            })
        });
    });
}

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



const theHobbit = new Book('Hobbit', 'J.R.R. Tolkien', '295', true)
const harryPotter = new Book('HarryPotter', 'J. K. Rowling', '310', false)
const dune = new Book('Dune', 'Frank Gerbert', '896 ', false)


addBookToLibrary(theHobbit)
addBookToLibrary(harryPotter)
addBookToLibrary(dune)

const warAndPeace = new Book('War and Peace', 'Leo Tolstoy', '1225 ', true)
addBookToLibrary(warAndPeace)


deleteCart(myLibrary)

/* 
-сделать кнопку по которой добавлять можно было карточки на наш сайт
-красиво оформить сайт

*/