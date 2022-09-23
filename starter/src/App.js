import "./App.css";
import { useState, useEffect } from "react";
import { getAll } from "./BooksAPI";
import { initialBooks } from "./initialData"

const Book = ({data, onSelectBookShelf})  => {

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 188,
            backgroundImage:
            `url(${data.imageLinks.thumbnail})`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select value={data.shelf} onChange={ (event) => { onSelectBookShelf(data, event.target.value)}}>
            <option value="none" disabled> Move to... </option>
            <option value="currentlyReading"> Currently Reading </option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{data.title}</div>
      <div className="book-authors">{data.authors.join('')}</div>
    </div>
  )

}

const BookShelf = ({name, books, onSelectBookShelf}) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            books.map( b => {
              return (
                <li key={b.title}>
                  <Book
                    data={b}
                    onSelectBookShelf={onSelectBookShelf}
                  />
                </li>
              )
            })
          }
        </ol>
      </div>
    </div>
  )
}


const ShowPage = ({onSetShowPage, showSearchPage}) => {
  return (
        <div className="search-books">
          <div className="search-books-bar">
            <button
              className="close-search"
              onClick={() => onSetShowPage(!showSearchPage)}
            >
              Close
            </button>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
  )
}

const BookList = ({books, onSetShowPage, onSelectBookShelf}) => {
  const myCurrentReadingBooks = books.filter( b => b.shelf === 'currentlyReading')
  const myReadBooks = books.filter( b => b.shelf === 'read')
  const myWantToReadBooks = books.filter( b => b.shelf === 'wantToRead')

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf
            name='Currently Reading'
            books={myCurrentReadingBooks}
            onSelectBookShelf={onSelectBookShelf}
          / >
          <BookShelf
            name='Want to Read'
            books={myWantToReadBooks}
            onSelectBookShelf={onSelectBookShelf}
          / >
          <BookShelf
            name='Read'
            books={myReadBooks}
            onSelectBookShelf={onSelectBookShelf}
          / >
        </div>
      </div>
      <div className="open-search">
        <a onClick={() => onSetShowPage()}>Add a book</a>
      </div>
    </div>
  )

}

function App() {
  const [myBooks, setMyBooks] = useState([]);
  const [showSearchPage, setShowSearchPage] = useState(false);

  const onSelectBookShelf = (book, newShelf) => {
    console.log("book before",book)
    book.shelf = newShelf
    console.log("book after",book)

    setMyBooks([...myBooks.filter(  mb => mb.title !== book.title), book])
  }

  const showPageToggle = () => {
    setShowSearchPage(!showSearchPage)
  }

  useEffect( async () => {
    let myBooks = await getAll()

    setMyBooks(myBooks)
    // setMyBooks(initialBooks)

  }, [])

  return (
    <div className="app">
      {showSearchPage ?
          ( <ShowPage onSetShowPage={ () => showPageToggle() } showSearchPage="${showSearchPage}"/ >) :
          ( <BookList books={myBooks} onSetShowPage={showPageToggle} onSelectBookShelf={onSelectBookShelf}/>)}
    </div>
  );
}

export default App;
