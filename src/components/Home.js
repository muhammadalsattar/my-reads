import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Grid, Divider, Text, Affix, Transition, ActionIcon } from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import { useWindowScroll } from '@mantine/hooks';
import { getAll } from '../BooksAPI';
import Book from './Book';

function Home() {
  const [books, setBooks] = useState([])
  const [scroll] = useWindowScroll();
  useEffect(()=>{
    books.length === 0 && getAll().then(books=>setBooks(books))
  }, [setBooks])
  return (
    <>

      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y >= 0}>
          {(transitionStyles) => (
            <ActionIcon
              style={transitionStyles}
              color="indigo"
              size="xl"
              radius="xl"
              variant="filled"
            >
              <Link to="/search"><IconSearch size={24} /></Link>
            </ActionIcon>
          )}
        </Transition>
      </Affix>

      <Divider my="xl" label={<Text size={'lg'}>Currently Reading</Text>} />

      <Grid gutter={'md'}>
      {books.filter(book=>book.shelf==="currentlyReading").map(book=>(
        <Grid.Col span={4} key={book.title}>
          <Book book={book} books={books} setBooks={setBooks}/>
        </Grid.Col>
      ))}
      </Grid>

      <Divider my="xl" label={<Text size={'lg'}>Want to Read</Text>} />

      <Grid gutter={'md'}>
      {books.filter(book=>book.shelf==="wantToRead").map(book=>(
        <Grid.Col span={4} key={book.title}>
          <Book book={book} setBooks={setBooks}/>
        </Grid.Col>
      ))}
      </Grid>

      <Divider my="xl" label={<Text size={'lg'}>Read</Text>} />

      <Grid gutter={'md'}>
      {books.filter(book=>book.shelf==="read").map(book=>(
        <Grid.Col span={4} key={book.title}>
          <Book book={book} setBooks={setBooks}/>
        </Grid.Col>
      ))}
      </Grid>
  
    </>
  );
}

export default Home;
