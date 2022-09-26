import "./App.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { getAll, update } from "./BooksAPI";
import ShowPage from "./ShowPage"
import MyReads from "./MyReads"

function App() {
  const [myBooks, setMyBooks] = useState([]);
  const [showSearchPage, setShowSearchPage] = useState(true);

  const onSelectBookShelf = async (book, newShelf) => {
    update(book, newShelf)

    book.shelf = newShelf
    setMyBooks([...myBooks.filter(  mb => mb.title !== book.title), book])
  }

  const showPageToggle = () => {
    setShowSearchPage(!showSearchPage)
  }

  useEffect( async () => {
    let myBooks = await getAll()

    setMyBooks(myBooks)
  }, [])

  return (
    <div className="app">
      <BrowserRouter>
    <Routes>
      <Route exact path="/" element={
          <MyReads
            books={myBooks}
            onSetShowPage={showPageToggle}
            onSelectBookShelf={onSelectBookShelf}
          />

      } />
      <Route path="/search" element={

          <ShowPage
            onSetShowPage={ () => showPageToggle() }
            showSearchPage="${showSearchPage}"
            onSelectBookShelf={onSelectBookShelf}
            myBooks={myBooks}
          / >
      } />
    </Routes>
  </BrowserRouter>,
    </div>
  )
}

export default App;
