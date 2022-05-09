function Book(title, author, pages, status = false) {
	this.title = title
	this.author = author
	this.pages = pages 
	this.status = status

}

let myLibrary = [
{
	title: 'Meditations',
	author:'Marcus Aurelius',
	pages: 181,
	status:true,
}, 
{
	title: `Man's Search for Meaning`,
	author:'Viktor Frankl',
	pages: 200,
	status:true,
},
{
	title: 'Beyond Good and Evil',
	author:'Friedrich Nietzsche',
	pages: 222,
	status:false,
}]


function displayBook(){
	const bookSection = document.querySelector('.books')
	bookSection.innerHTML = ''

	myLibrary.forEach((book, index) => {
		const card = document.createElement('div')
		card.classList.add('bookCard')
		card.innerHTML = `
			 <h2>${book.title}</h2>
			 <h3>${book.author}</h3>
			 <h4>${book.pages} Pages</h4>
			 <p>${book.status ? 'Read already!' : 'Not Read'}
			 <button class="readBtn" data-index=${index}>${book.status ? 'Unread' : 'Read'} </button> 
			 <button class="deleteBtn" data-index=${index}>Delete</button> 
			`
		bookSection.appendChild(card)
	})
}



function addBook(book){
	myLibrary.push(book)
}

function changeBookStatus(index){
	myLibrary[index].status = !myLibrary[index].status
	displayBook()
}

function removeBook(index){
	myLibrary.splice(index, 1)
	displayBook()
	console.log(myLibrary)
}

const books = document.querySelector('.books')

books.addEventListener('click', (e) => {
	const index = e.target.getAttribute('data-index')
	const clicked = e.target.classList
	if(clicked.contains('deleteBtn')){
		removeBook(index)	
	} else if(clicked.contains('readBtn')){
		changeBookStatus(index)
	}
})

function setValues(book, el){
	book.author = el.author.value
    book.title = el.title.value
    book.pages = el.pages.value
    book.status = el.status.checked
}

function clearValues(book, el){
	book.author.value = ''
    book.title.value = ''
    book.pages.value = ''
    book.status.checked = false
}

const form = document.getElementById('bookForm')

function formDisplay(){
	formView.classList.toggle('toggleOn')
}

const formButton = document.querySelector('.newBook')
const formView = document.querySelector('.inputBook')

formButton.addEventListener('click', formDisplay)


form.addEventListener('submit', (e) => {
	e.preventDefault()
	const book = new Book()
	setValues(book, e.target.elements)
	addBook(book)
	displayBook()
	clearValues(e.target.elements)
})

displayBook()