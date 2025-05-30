import { PokemonDetails } from "@/types/pokemon";
    import Image from 'next/image'

export default function PokemonDetailModal({
    data,
    onClose,
}: {
    data: PokemonDetails;
    onClose: () => void;
}) {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75">
            <div className="bg-white p-6 rounded w-[90%] md:w-[500px] max-h-[80vh] overflow-auto">
                <div>
                    <div className="flex place-content-center">
                        <h2 className="text-xl font-bold mb-2 capitalize">{data.name}</h2>
                    </div>
                    <div className="flex flex-row">
                        <div className="basis-2/3">
                            <p><strong>Peso:</strong> {data.weight}</p>
                            <p><strong>Tipo:</strong> {data.types.map((t: { type: { name: string } }) => t.type.name).join(", ")}</p>
                            <div>
                                <strong>Habilidades:</strong>
                                <ul className="list-disc list-inside">
                                    {data.abilities.map((a: { ability: { name: string; url: string } }, i: number) => (
                                        <li key={i}>
                                            {a.ability.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="basis-1/4 relative">
                            <Image
                                src={data?.sprites.front_default || '/fallback.png'}
                                alt={data?.name || 'Pokemon'}
                                width={100}
                                height={100}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex place-content-center">
                        <button className="mt-4 bg-cyan-500 text-white px-4 py-2 rounded" onClick={onClose}>
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}