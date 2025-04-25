"use client";
import { useState } from "react";
import { usePokemonByName, usePokemonsPaginated } from "../hooks/usePokemon";
import PokemonCard from "./PokemonCard";
import SearchInput from "./SearchInput";
import { PokemonListResult } from "@/types/pokemon";

export default function PokemonTable() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const grouped = [];

    const { data: paginatedData, isLoading: isLoadingPaginated, error: errorPaginated } = usePokemonsPaginated(page, 10);
    const { data: searchData, isLoading: isLoadingByName, error: errorByName } = usePokemonByName(search);

    if (isLoadingPaginated || isLoadingByName) return <div>Cargando...</div>;
    if (errorPaginated || errorByName) return <div>Error al cargar.</div>;

    const pokemons: PokemonListResult[] | undefined = search ? [{
        name: search,
        url: `https://pokeapi.co/api/v2/pokemon/${searchData?.id}/`
    }] : paginatedData?.results;

    for (let i = 0; i < pokemons!.length; i += 2) {
        grouped.push(pokemons?.slice(i, i + 2));
    }

    return (
        <>
            <div className="px-8 mt-6">
                <SearchInput onSearch={setSearch} />
                <div className="flex flex-wrap">
                    {pokemons?.map((pokemon: any, i: number) => (
                        <div
                            key={i}
                            className="w-full lg:w-1/2 p-2"
                        >
                            <PokemonCard pokemon={pokemon} />
                        </div>
                    ))}
                </div>
                {!search && (
                    <div className="mt-4 flex gap-2 place-content-center">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Anterior
                        </button>
                        <span
                            className="px-4 py-2 font-semibold text-gray-700">
                            Página {page}
                        </span>
                        <button
                            onClick={() => setPage((p) => p + 1)}
                            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Siguiente
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}