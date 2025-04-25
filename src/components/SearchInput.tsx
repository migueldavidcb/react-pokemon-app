"use client";
import { useState } from "react";

export default function SearchInput({ onSearch }: { onSearch: (value: string) => void }) {
    const [value, setValue] = useState("");
    return (
        <input
            className="border px-2 py-1 rounded mb-4"
            placeholder="Buscar por nombre"
            value={value}
            onChange={(e) => setValue(e.target.value.toLowerCase())}
            onKeyDown={(e) => e.key === "Enter" && onSearch(value)}
        />
    );
}