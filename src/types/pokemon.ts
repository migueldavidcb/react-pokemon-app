export interface PokemonListResponse {
    results: { name: string; url: string }[];
    count: number;
}

export interface PokemonDetails {
    name: string;
    weight: number;
    types: { type: { name: string } }[];
    abilities: { ability: { name: string; url: string } }[];
    sprites: { front_default: string };
}

export interface AbilityEffect {
    effect_entries: { effect: string; language: { name: string } }[];
}
