import "./App.css";
// import { useState, useEffect } from "react";
import { useState } from "react";
// import { getAll } from "./BooksAPI";
const initialBooks = [
  {
    authors: ['Harper Lee IIII'],
    title: 'To Kill a Mockingbird',
    currentShelf: 'currentlyReading',
    imageUrl:  'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api'

  },
  {
    title: "Ender's Game",
    authors: ["Orson Scott Card"],
    currentShelf: 'currentlyReading',
    imageUrl: "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api"
  },
  {
  imageUrl: "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api",
  title: '1776',
  currentShelf: 'wantToRead',
  authors: ['David McCullough']
  },
  {
    imageUrl:"http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api",
    title: "Harry Potter and the Sorcerer's Stone",
    authors: ['J.K. Rowling'],
    currentShelf: 'wantToRead'
  },
  {

    imageUrl: "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api",
    title: 'The Hobbit',
    authors: ['J.R.R. Tolkien'],
    currentShelf: 'read'
  },
  {
    imageUrl:"http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api",
    currentShelf: 'read',
    title: "Oh, the Places You'll Go!",
    authors: ['Seuss']
  },
  {
    imageUrl: "http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api",
    currentShelf: 'read',
    title: 'The Adventures of Tom Sawyer',
    authors: ['Mark Twain']
  }
]

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
            `url(${data.imageUrl})`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select value={data.currentShelf} onChange={ (event) => { onSelectBookShelf(data, event.target.value)}}>
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
  const myCurrentReadingBooks = books.filter( b => b.currentShelf === 'currentlyReading')
  const myReadBooks = books.filter( b => b.currentShelf === 'read')
  const myWantToReadBooks = books.filter( b => b.currentShelf === 'wantToRead')

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
  const [myBooks, setMyBooks] = useState(initialBooks);
  const [showSearchPage, setShowSearchPage] = useState(false);

  const onSelectBookShelf = (book, newShelf) => {
    console.log("book before",book)
    book.currentShelf = newShelf
    console.log("book after",book)

    setMyBooks([...myBooks.filter(  mb => mb.title !== book.title), book])
  }

  const showPageToggle = () => {
    setShowSearchPage(!showSearchPage)
  }

  // useEffect( async () => {
  //   let data = await getAll()
  //   console.log(data)

  // }, [])

  return (
    <div className="app">
      {showSearchPage ?
          ( <ShowPage onSetShowPage={ () => showPageToggle() } showSearchPage="${showSearchPage}"/ >) :
          ( <BookList books={myBooks} onSetShowPage={showPageToggle} onSelectBookShelf={onSelectBookShelf}/>)}
    </div>
  );
}

export default App;
