"use client";

import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";

interface CitySearchProps {
  onCityChange: (cidade: string) => void;
}

export default function CitySearch({ onCityChange }: CitySearchProps) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [allCities, setAllCities] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch("https://routealive.onrender.com/problems");
        const data: { cidade: string }[] = await res.json();

        const cidadesUnicas = Array.from(
          new Set(data.map((item) => item.cidade))
        );

        setAllCities(cidadesUnicas);
      } catch (err) {
        console.error("Erro ao buscar cidades:", err);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const filtradas = allCities.filter((cidade) =>
      cidade.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions(filtradas);
  };

  const handleSelect = (cidade: string) => {
    setInputValue(cidade);
    setSuggestions([]);
    onCityChange(cidade);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue) onCityChange(inputValue);
  };

  return (
    <div ref={wrapperRef} className="relative max-w-md mx-auto mt-6 text-sm">
      <form onSubmit={handleSubmit} className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <FaSearch />
        </div>

        <input
          ref={inputRef}
          type="text"
          placeholder="Buscar por cidade"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 font-bold text-black focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </form>

      {suggestions.length > 0 && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 z-10 shadow-md">
          {suggestions.map((cidade, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(cidade)}
            >
              {cidade}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
