import { Box, IBoxProps, Text } from 'native-base'
import React from 'react'
import { ColorByType } from '../utils/color-by-type'
import { getConstrastColor } from '../utils/constrast-color'

type PokemonTypeProps = IBoxProps & {
    type: string
}

const PokemonTypeTag = ({
    type,
    ...rest
}: PokemonTypeProps) => {
    return (
        <Box bg={ColorByType[type]} {...rest} py={1} px={2.5} borderRadius="sm" mx={1}>
            <Text textTransform="uppercase" color={getConstrastColor(ColorByType[type])} fontWeight="bold">
                {type}
            </Text>
        </Box>
    )
}

export default PokemonTypeTag