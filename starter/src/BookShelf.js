import "./App.css";

import Book from "./Book"

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

export default BookShelf;
