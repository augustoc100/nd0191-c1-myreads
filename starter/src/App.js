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

  const onSelectBookShelf = async (book, newShelf) => {
    update(book, newShelf)

    book.shelf = newShelf
    setMyBooks([...myBooks.filter(  mb => mb.title !== book.title), book])
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
            onSelectBookShelf={onSelectBookShelf}
          />

      } />
      <Route path="/search" element={

          <ShowPage
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
