import { useState } from "react";
import { usePokemonDetail } from "../hooks/usePokemon";
import PokemonDetailModal from "./PokemonDetailModal";
import { useImageColor } from "@/hooks/useImageColor";
import Image from 'next/image'

export default function PokemonCard({ pokemon }: { pokemon: { name: string; url: string } }) {
    const [open, setOpen] = useState(false);
    const { data, isLoading } = usePokemonDetail(pokemon.url);
    const imageUrl = data?.sprites.front_default;
    const bgColor = useImageColor(imageUrl);

    if (isLoading) return null;
    return (
        <>
            <div
                className="flex flex-row border border-transparent flex flex-row rounded-xl shadow-lg w-full"
                style={{ backgroundColor: bgColor }}
            >
                <div className="basis-1/3 place-content-center">
                    <Image
                        src={data?.sprites.front_default || '/fallback.png'}
                        alt={data?.name || 'Pokemon'}
                        width={100}
                        height={100}
                        className="cursor-pointer mx-auto"
                        onDoubleClick={() => setOpen(true)}
                    />
                </div>
                <div className="basis-2/3 font-mono place-content-center">
                    <span className="w-full">{pokemon.name}</span>
                </div>
            </div>
            {open && <PokemonDetailModal data={data!} onClose={() => setOpen(false)} />}
        </>
    );
}