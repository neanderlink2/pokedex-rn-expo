import { Box, Center, SimpleGrid, Spinner, Text } from 'native-base'
import React, { useState } from 'react'
import useSWR from 'swr'
import { fetchPokemon } from '../api'
import PokemonCard from '../components/pokemon-card'

const HomePage = () => {
    const [page, setPage] = useState(0);
    const { data, isValidating } = useSWR(['pokemon', page, 10], (url, page, pageSize) => fetchPokemon(page, pageSize));

    return (
        <Box flex={1} m={3}>
            {isValidating && (
                <Center>
                    <Spinner />
                    <Text>Carregando...</Text>
                </Center>
            )}
            <Center>
                <SimpleGrid columns={3}>
                    {data && (
                        data.results.map(pokemon => (
                            <PokemonCard
                                name={pokemon.name}
                            />
                        ))

                    )}
                </SimpleGrid>
            </Center>
        </Box>
    )
}

export default HomePage