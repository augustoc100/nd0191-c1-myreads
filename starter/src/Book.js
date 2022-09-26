import "./App.css";

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
            `url(${data.imageLinks? data.imageLinks.thumbnail : ''})`,
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
      <div className="book-authors">{data.authors? data.authors.join('') : ""}</div>
    </div>
  )

}

export default Book;
