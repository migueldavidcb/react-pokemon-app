export interface PokemonListResponse {
    results: PokemonListResult[];
    count: number;
}

export interface PokemonListResult {
    name: string; 
    url: string;
}

export interface PokemonDetails {
    name: string;
    weight: number;
    types: { type: { name: string } }[];
    abilities: { ability: { name: string; url: string } }[];
    sprites: { front_default: string };
    id: number;
}

export interface AbilityEffect {
    effect_entries: { effect: string; language: { name: string } }[];
}
