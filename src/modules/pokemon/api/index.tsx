import axios from "axios";



export const fetchPokemon = async (page: number = 0, pageSize: number = 10) => {
    const response = await axios.get<FetchPokemonResponse>(`https://pokeapi.co/api/v2/pokemon/?offset=${page * pageSize}&limit=${pageSize}`);
    return response.data;
}

export type FetchPokemonResponse = {
    count: number;
    next: string;
    previous: string | null;
    results: {
        name: string;
        url: string;
    }[];
}

export const fetchOnePokemonById = async (id: string) => {
    const response = await axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.data;
}

type Pokemon = {
    name: string;
    id: number;
    sprites: {
        front_default: string;
        other: Record<string, any>;
        [x: string]: any;
    };
    types: {
        slot: number;
        type: {
            name: string;
            url: string;
        }
    }[];
}