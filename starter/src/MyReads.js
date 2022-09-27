import "./App.css";
import  BookShelf from "./BookShelf";

import { Link } from 'react-router-dom'

const MyReads = ({books, onSetShowPage, onSelectBookShelf}) => {
  const myCurrentReadingBooks = books.filter( b => b.shelf === 'currentlyReading')
  const myReadBooks = books.filter( b => b.shelf === 'read')
  const myWantToReadBooks = books.filter( b => b.shelf === 'wantToRead')
  const list = [
    {
      name: 'Currently Reading',
      books: myCurrentReadingBooks
    },
    {
      name: 'Want to Read',
      books: myWantToReadBooks
    },
    {
      name: 'Read',
      books: myReadBooks
    }
  ]

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>

          {
            list.map( bl => <BookShelf
              key={bl.name}
              name={bl.name}
              books={bl.books}
              onSelectBookShelf={onSelectBookShelf}
                />
                )
              }
        </div>
      </div>
      <div className="open-search">
        <Link  to="search"> Add a book</Link>
      </div>
    </div>
  )

}

export default MyReads;
