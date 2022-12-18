import { Flex, Title } from "@mantine/core";
import { Link } from "react-router-dom";


const Error = ()=>(
    <>
        <Flex
        gap="xl"
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
        >
            <Title order={1}>404</Title>
            <Title order={4}>Page not found. <Link to="/">Go Back?</Link></Title>
        </Flex>
    </>
)

export default Error;