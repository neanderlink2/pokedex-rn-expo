import { FontAwesome } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Box, Heading, HStack, IconButton, Text } from 'native-base'
import React, { useMemo } from 'react'
import useSWR from 'swr'
import { fetchOnePokemonById } from '../api'
import PokemonSprites from '../components/pokemon-sprites'
import PokemonTypeTag from '../components/pokemon-type'
import { ColorByType } from '../utils/color-by-type'

const data = [
    {
        type: 'Humlan P',
        imageUri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
        heading: 'Vibrant colors',
        description: 'Four on-trend colorways to seamlessly suit your style.',
        key: 'first',
        color: '#9dcdfa',
    },
    {
        type: 'Pampas',
        imageUri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
        heading: 'Redefined sound',
        description: 'A bold statement tuned to perfection.',
        key: 'second',
        color: '#db9efa',
    },
    {
        type: 'Humlan P',
        imageUri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png',
        heading: 'Great quality',
        description:
            'An Urbanears classic! Listen-all-day fit. Striking the perfect balance of effortless technology',
        key: 'third',
        color: '#999',
    },
    {
        type: 'Humlan B',
        imageUri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
        heading: 'From Sweden',
        description:
            'The “Plattan” in Plattan headphones is Swedish for “the slab.”',
        key: 'fourth',
        color: '#a1e3a1',
    },
];

const DetailsPage = () => {
    const route = useRoute<any>();
    const pokemonId = route.params!.id;
    const navigation = useNavigation();
    const { data } = useSWR([`pokemon/${pokemonId}`], (url) => fetchOnePokemonById(pokemonId));

    const goBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate("Home");
        }
    }

    const images = useMemo(() => {
        const images = [];
        for (let prop in data?.sprites.other) {
            if (data?.sprites.other[prop] && typeof data?.sprites.other[prop] === "string" &&
                !data?.sprites.other[prop].endsWith(".svg")) {
                images.push(data?.sprites.other[prop]);
            }

            if (data?.sprites.other[prop] && typeof data?.sprites.other[prop] === "object") {
                for (let propDeep in data.sprites.other[prop]) {
                    if (data?.sprites.other[prop][propDeep] && typeof data?.sprites.other[prop][propDeep] === "string" &&
                        !data?.sprites.other[prop][propDeep].endsWith(".svg")) {
                        images.push(data?.sprites.other[prop][propDeep]);
                    }
                }
            }
        }
        console.log('IMAGES => ', images);
        return images;
    }, [data]);

    return (
        <Box flex={1} m={5} safeArea>
            <Heading textTransform="capitalize" fontSize="4xl">
                <IconButton
                    icon={<FontAwesome name="arrow-left" size={20} />}
                    onPress={goBack}
                />
                {data?.name}
            </Heading>
            <HStack justifyContent="space-between" alignItems="center">
                <Text color="gray.400" >#{data?.id}</Text>
                <HStack>
                    {data?.types.map(type => (
                        <PokemonTypeTag type={type.type.name} />
                    ))}
                </HStack>
            </HStack>
            <Box flex={1} mt={5}>
                <PokemonSprites
                    data={images.map((x) => (
                        {
                            type: 'Humlan B',
                            imageUri: x,
                            key: `${data?.name}-${x}`,
                            color: ColorByType[data?.types[0].type.name ?? ""],
                        }
                    ))}
                />
            </Box>
        </Box>
    )
}

export default DetailsPage