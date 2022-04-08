import { useNavigation } from '@react-navigation/native';
import { Box, Heading, Image, Skeleton, Text, VStack } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import useSWR from 'swr';
import { fetchOnePokemonById } from '../api';

type PokemonCardProps = {
  name: string;
}

const PokemonCard = ({
  name
}: PokemonCardProps) => {
  const navigation = useNavigation();
  const { data, isValidating } = useSWR([`pokemon/${name}`], (url) => fetchOnePokemonById(name));

  function navigateToDetails() {
    navigation.navigate('Details', { id: name });
  }

  return (
    <TouchableOpacity onPress={navigateToDetails}>
      <Box m={2} height={120} width={100}>
        <Skeleton isLoaded={!!data && !isValidating}>
          <VStack alignItems="center">
            <Image source={{ uri: data?.sprites.front_default }} height={75} width={75} alt={`Sprite pokemon ${name}`} />
            <Heading mt={2} fontSize="lg" textTransform="capitalize">{name}</Heading>
            <Text color="gray.400" >#{data?.id}</Text>
          </VStack>
        </Skeleton>
      </Box>
    </TouchableOpacity>
  )
}

export default PokemonCard