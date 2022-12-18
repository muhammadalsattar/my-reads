import React, { useState } from "react";
import { Card, Image, Text, Menu, Group, ActionIcon, Rating } from '@mantine/core';
import { IconBrandAsana, IconCheck } from '@tabler/icons';
import { getAll, update } from "../BooksAPI";

const Book = ({book, setBooks, query, queryFn})=>{
    const [shelves] = useState(["currentlyReading", "wantToRead", "read"])
    const changeShelf = (book, shelf)=>{
        update(book, shelf).then(()=>{
            query ? queryFn(query):
            getAll().then(data=>setBooks(data))
        })
    }
    return(
    <Card shadow="sm" p="lg" radius="md" sx={{height: "max-content"}} >
      <Card.Section>
        <Image
          src={book?.imageLinks?.thumbnail}
          fit={"cover"}
          height={290}
          alt={book?.title}
        />
      </Card.Section>
      <Menu shadow="md" width={200} sx={{position: "absolute", bottom: 165, right: 20}}>
        <Menu.Target>
        <ActionIcon color="indigo" size="xl" radius="xl" variant="light">
            <IconBrandAsana size={26} />
        </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
            <Menu.Item key={"none"} disabled>{!book.shelf && <IconCheck size={18}/>} None</Menu.Item>
            {shelves?.map(shelf=>(
                <Menu.Item key={shelf} onClick={()=>{changeShelf(book, shelf)}}>{shelf === book.shelf && <IconCheck size={18}/>} {shelf.split(/(?=[A-Z])/).join(" ")}</Menu.Item>
            ))}
        </Menu.Dropdown>
        </Menu>
      <Group position="left" mt="md" mb="xs" spacing="xs">
        <Text weight={500}>{book?.title}</Text>
        <Text size={"sm"}>{book?.subtitle}</Text>
        <Text size="sm" color="dimmed">{(book?.authors)?.join(", ")}</Text>
      </Group>
      <Rating defaultValue={book?.averageRating} />
    </Card>
    )
}

export default Book;