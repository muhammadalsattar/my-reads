import { Grid, Image, Title, Text, Rating, Spoiler } from "@mantine/core"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAll } from "../BooksAPI"

const BookDetails = ()=>{
    const {id} = useParams()
    const [book, setBook] = useState(undefined)
    useEffect(()=>{
        getAll().then(data=>setBook(data.find(book=>book.id===id)))
    }, [id, setBook])
    return(
        <>
        { book &&
        <Grid gutter={'lg'}>
            <Grid.Col span={4}>
                <Image
                    radius="md"
                    src={book?.imageLinks?.thumbnail}
                    alt={book?.title}
                />
            </Grid.Col>
            <Grid.Col span={'auto'}>
                <Title order={1}>{book?.title}</Title>
                <Title order={4} my={5}>{book?.subtitle}</Title>
                <Text color={"dimmed"} size={"lg"}>{book?.authors.join(", ")}</Text>
                <Rating defaultValue={book?.averageRating} my={5} />
                <Spoiler maxHeight={150} showLabel="Show more" hideLabel="Hide">
                    <Text fs={'italic'}>{book?.description}</Text>
                </Spoiler>
            </Grid.Col>
        </Grid>
        }
        </>
    )
}

export default BookDetails;