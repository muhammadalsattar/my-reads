const filterBooks = (books, query)=>{
    return books.length > 0 ? books.filter(book=>book.title.includes(query)): []
}

export default filterBooks