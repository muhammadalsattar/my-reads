import { ActionIcon, Grid, Group, Input } from '@mantine/core';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconArrowBack } from '@tabler/icons';
import { getAll, search } from '../BooksAPI';
import Book from './Book';

const Search = ()=>{
    const [books, setBooks] = useState([])
    const searchInput = useRef()
    const query = (query)=>{
        getAll().then(shelfBooks=>
        search(query).then(queryBooks=>{
            if(queryBooks.error){
                setBooks([])
            } else {
                setBooks(queryBooks.map(queryBook=>{
                    const duplicate = shelfBooks.find(shelfBook=>shelfBook.title === queryBook.title)
                    return duplicate? {...queryBook, shelf: duplicate.shelf}: queryBook
                }))
            }
        }))
    }
    return(
        <>
            <Grid sx={{width: "100%"}} justify="center" align="center">
                <Grid.Col span={1}> 
                    <ActionIcon size="xl" radius="xl" color="indigo" variant="filled">
                        <Link to="/"><IconArrowBack size={34} /></Link>
                    </ActionIcon>
                </Grid.Col>
                <Grid.Col span="auto">
                    <Input
                    placeholder="Search"
                    size="xl"
                    onChange={()=>{query(searchInput.current.value)}}
                    ref={searchInput}
                    my={"2em"}
                    />
                </Grid.Col>
            </Grid>
            <Grid gutter={'md'}>
            {books && books.map(book=>(
                <Grid.Col span={4} key={book.title}>
                    <Book book={book} setBooks={setBooks} query={searchInput.current.value} queryFn={query}/>
                </Grid.Col>
            ))}
            </Grid>
        </>
    )
}

export default Search;