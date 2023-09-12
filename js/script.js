const container = document.getElementById('container')
const buttonAddNewBook = document.getElementById('new-book')
const createNewCard = document.getElementById('create-new-card')
const myLibrary = []
const inputs = document.getElementsByTagName('input')
const issueText = document.getElementById('issue-text')

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = () => {
        return `${title} ${author} ${pages}. You are read this? ${read}`
    }
}


// Итерируем массив и выводим каждую книгу
function displayEachBook(array) {
    container.innerHTML = ''
    array.forEach((book) => {


        let newCart = document.createElement('div')
        let nameBook = document.createElement('p')
        let author = document.createElement('p')
        let pages = document.createElement('p')
        let readOrNot = document.createElement('p')
        // let issueText = document.createElement('p')
        let button = document.createElement('button')
    
        // Добавляем в теги п названия
        newCart.className = 'cards'
        nameBook.textContent = book.title
        nameBook.className = 'book-title'
        author.textContent = book.author
        pages.textContent = book.pages
        // issueText.textContent = bookObj.
        button.textContent = `Delete`
        button.className = 'deleteButton'
        if(book.read == '') {
            readOrNot.textContent = `Книга не прочитана!`
            } else readOrNot.textContent = `Книга прочитана!`
        button.onclick = removeBook
    
    
        // Привязываем теги п к своим родителям
        container.appendChild(newCart)
        newCart.appendChild(nameBook)
        newCart.appendChild(author)
        newCart.appendChild(pages)
        newCart.appendChild(readOrNot)
        // newCart.appendChild(issueText)
        newCart.appendChild(button)
    }) 
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
    const read = document.getElementById('myCheckbox')

    if (title.value.trim() != '' && author.value.trim() != '' && pages.value.trim()) {
        // Проверяем есть ли такая книга уже в нашем каталоге
        const bookAlreadyExists = myLibrary.some((book) => {
            return book.title.toLowerCase() === title.value.toLowerCase();
        });

        if(!bookAlreadyExists) {
            let newCard = new Book(title.value, author.value, pages.value, read.value)
            myLibrary.push(newCard)
            issueText.textContent = ''
            // createCart(newCard)
            displayEachBook(myLibrary)

            // 
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].value = ''
            }
        } else {
            console.log('Такая книга уже есть в нашем каталоге!')
            issueText.textContent = 'Такая книга уже добавлена!'
        }
    }

})

function removeBook() {
    const cardToRemove = event.target.closest('.cards'); // Находим родительскую карточку
    if (cardToRemove) {
        cardToRemove.remove(); // Удаляем карточку
        const bookName = cardToRemove.querySelector('.book-title') // Получаем доступ к названию книги
        console.log(bookName.textContent)
        myLibrary.forEach((book) => {
            if(book.title == bookName.textContent) {
                myLibrary.splice(myLibrary.indexOf(book), 1)
            }
        })
    }
}