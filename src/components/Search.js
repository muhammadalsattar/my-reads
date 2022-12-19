import { ActionIcon, Grid, Input, Text, Skeleton } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconArrowBack } from '@tabler/icons';
import { getAll, search } from '../BooksAPI';
import Book from './Book';
import useDebounce from '../utils/useDebouce';
import filterBooks from '../utils/filterBooks';

const Search = ()=>{
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("")
    const debounceValue = useDebounce(searchQuery, 500)
    useEffect(()=>{
        if(debounceValue){
            setLoading(true)
            search(debounceValue)
            .then(searchBooks=>getAll()
            .then(allBooks=>{
                if(searchBooks.length > 0){
                    searchBooks = searchBooks.filter(book=>allBooks.find(item=>item.title===book.title) === undefined)
                }
                setBooks([...filterBooks(searchBooks, debounceValue), ...filterBooks(allBooks, debounceValue)])
                setLoading(false)
            })
            )
        } else {
            setBooks([])
        }        
    }, [debounceValue])
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
                    onChange={(e)=>setSearchQuery(e.target.value)}
                    my={"2em"}
                    />
                </Grid.Col>
            </Grid>
            <Grid gutter={'md'}>
            {
                books.length === 0 && !loading &&
                <Grid.Col span="auto">
                    <Text size="xl" align="center">No book matches your query. Try different words</Text>
                </Grid.Col>
            }
            {books && books.map(book=>(
                <Grid.Col span={4} key={book.title}>
                    <Book book={book} setBooks={setBooks} books={books}/>
                </Grid.Col>
            ))}
            </Grid>
            {
                loading &&
                <Grid gutter={'md'}>
                    <Grid.Col span={4}><Skeleton height={300} mt={6} radius="xl"></Skeleton></Grid.Col>
                    <Grid.Col span={4}><Skeleton height={280} mt={6} radius="xl"></Skeleton></Grid.Col>
                    <Grid.Col span={4}><Skeleton height={300} mt={6} radius="xl"></Skeleton></Grid.Col>
                </Grid>
            }
        </>
    )
}

export default Search;