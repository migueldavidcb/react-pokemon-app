import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetcher } from "../utils/fetcher";
import { PokemonDetails } from "@/types/pokemon";

export const usePokemonByName = (name: string): UseQueryResult<any, Error> => {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;

  return useQuery({
    queryKey: ["pokemon", url],
    queryFn: () => fetcher(url),
    enabled: !!name
  });
};

export const usePokemonsPaginated = (page: number, limit: number): UseQueryResult<any, Error> => {
  const offset = (page - 1) * limit;
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return useQuery({
    queryKey: ["pokemonsPaginated", offset, limit],
    queryFn: () => fetcher(url)
  });
};

export const usePokemonDetail = (url: string): UseQueryResult<PokemonDetails, Error> => {
  return useQuery({ 
    queryKey: ["detail", url], 
    queryFn: () => fetcher(url),
    enabled: !!url
  });
};

export const useAbilityDetail = (url: string): UseQueryResult<any, Error> => {
  return useQuery({ queryKey: ["ability", url], queryFn: () => fetcher(url) });
};