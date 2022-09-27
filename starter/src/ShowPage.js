import "./App.css";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { search } from "./BooksAPI";
import Book from "./Book"

const addCurrentShelf = (searchedBook, myBooks) => {
        let existentBook = myBooks.find( mb => mb.id === searchedBook.id)

        if(existentBook) {
          searchedBook.shelf = existentBook.shelf
        }else {
          searchedBook.shelf = 'none'
        }

        return searchedBook

}

const ShowPage = ( {
  onSetShowPage,
  showSearchPage,
  onSelectBookShelf,
  myBooks
}) => {
  const [searchBooks, setSearchBooks] = useState([])
  const [query, setQuery] = useState('')

  const test = (event) => {
    setQuery(event.target.value)
  }

  useEffect(async () => {
    if (query !== "") {
      const response = await search(query)
      const data = response.error? [] : response
      console.log('response', data)

let booksWithStatus = data
        .filter( value => !!value)
        .map( d => addCurrentShelf(d, myBooks))

      console.log('mapped', booksWithStatus)
      setSearchBooks(booksWithStatus)
    }
  }, [query])
  return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link
              className="close-search"
              to="/"
            >
              Close
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                onChange={ (e) => {test(e)}}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
          {
            searchBooks.map( b => {
              return (
                <li key={b.id}>
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

export default ShowPage;
