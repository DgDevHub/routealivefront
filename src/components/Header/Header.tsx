"use client";

import Image from "next/image";
import { FaCommentDots, FaUser } from "react-icons/fa";
import style from "@/components/Header/Header.module.css";
import { useEffect, useState } from "react";

interface HeaderProps {
  onFilterChange: (filterType: string) => void;
}

interface MenuItem {
  icon: string;
  label: string;
  type: string;
}

export default function Header({ onFilterChange }: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tiposExtras, setTiposExtras] = useState<string[]>([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const menuItems: MenuItem[] = [
    { icon: "/images/animal.png", label: "Animal", type: "Animal" },
    { icon: "/images/buraco.png", label: "Buracos", type: "Buraco" },
    { icon: "/images/luz.png", label: "Iluminação", type: "Iluminação" },
    { icon: "/images/onda.png", label: "Inundações", type: "Inundações" },
    { icon: "/images/perigo.png", label: "Falta sinalização", type: "Perigo" },

  ];

  // 🟡 Detectar tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 758); 
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🟢 Buscar tipos extras da API
  useEffect(() => {
    if (!dropdownOpen) return;

    const fetchTipos = async () => {
      try {
        const res = await fetch("https://routealive.onrender.com/api/tipos");
        const data: string[] = await res.json();

        const tiposUnicos = Array.from(new Set(data));
        const tiposFiltrados = tiposUnicos.filter(
          (tipo) => !menuItems.some((item) => item.type === tipo)
        );

        setTiposExtras(tiposFiltrados);
      } catch (error) {
        console.error("Erro ao buscar tipos extras:", error);
      }
    };

    fetchTipos();
  }, [dropdownOpen]);

  const visibleItems = isSmallScreen ? menuItems.slice(0, 4) : menuItems;

  return (
    <>
      <div className={`flex justify-center  bg-green-700 w-full text-white ${style.textmont}`}>RouteAlive: cada <span className="text-emerald-950 mr-1.5 ml-1.5">alerta</span> salva <span className="text-emerald-950 mr-1.5 ml-1.5">vidas</span> </div>

      <header className={`flex justify-between items-center px-6 py-3 shadow-sm ${style.header}`}>
        <div className={`flex justify-between w-full items-center ${style.topbar}`}>
          <div className="flex items-center gap-1">
            <Image src="/images/logo.png" alt="RouteAlive Logo" width={24} height={24} />
            <span className="text-green-700 font-bold text-lg">RouteAlive</span>
          </div>

          <div className={`flex items-center gap-4 ${style.perfil}`}>
            <FaCommentDots
              size={20}
              className="text-gray-700 hover:text-green-700 cursor-pointer"
            />
            <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white">
              <FaUser size={16} />
            </div>
          </div>
        </div>

        <nav className={style.menu}>
          <ul className="flex gap-5 relative">
            {visibleItems.map((item, index) => (
              <li
                key={index}
                className="flex flex-col items-center text-xs text-gray-700 hover:text-green-700 cursor-pointer"
                onClick={() => onFilterChange(item.type)}
              >
                <Image src={item.icon} alt={item.label} width={28} height={28} />
                <span>{item.label}</span>
              </li>
            ))}

            <li
              className="flex flex-col items-center text-xs text-gray-700 hover:text-green-700 cursor-pointer relative"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <Image src="/images/ver.png" alt="Ver mais" width={28} height={28} />
              <span>Ver mais</span>

              {dropdownOpen && tiposExtras.length > 0 && (
                <ul className="absolute top-14 bg-green-700 shadow-md rounded-md p-2 z-10 w-auto">
                  {tiposExtras.map((tipo, idx) => (
                    <li
                      key={idx}
                      className="p-2 hover:bg-green-100 cursor-pointer text-sm text-white"
                      onClick={() => {
                        onFilterChange(tipo);
                        setDropdownOpen(false);
                      }}
                    >
                      {tipo}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
