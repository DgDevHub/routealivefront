"use client";

import { useEffect, useState } from "react";
import SkeletonProblem from "@/components/SkeletonProblem/SkeletonProblem";
import Image from "next/image";


interface Problem {
  id: string;
  tipo: string;
  cidade: string;
  descricao: string;
  localizacao: string;
  data: string;
  status: string;
}

const tipoImagemMap: Record<string, string> = {
  "Buraco": "/img/buracos.png",
  "Sinalização quebrada": "/img/sinalizacao.png",
  "Animal": "/img/morto.png",
  "Falta de iluminação": "/img/luz.png",
  "Inundações": "/img/molhado.png",
};

export default function ProblemsList({
  filter,
  status,
  cidade,
}: {
  filter: string;
  status: string;
  cidade: string;
}) {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      try {
        const baseUrl = "https://routealive.onrender.com/problems";
        const url = filter
          ? `${baseUrl}/filter-type/${filter}`
          : baseUrl;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Erro ao buscar problemas");

        const data: Problem[] = await res.json();

        const filtrados = data.filter((problem) => {
          const matchStatus = status
            ? problem.status.toLowerCase() === status.toLowerCase()
            : true;
          const matchCidade = cidade
            ? problem.cidade.toLowerCase().includes(cidade.toLowerCase())
            : true;
          return matchStatus && matchCidade;
        });

        setProblems(filtrados);
      } catch (err) {
        console.error("Erro no fetch:", err);
        setProblems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [filter, status, cidade]);

  return (
    <div className="p-4">
      {!loading && problems.length === 0 && (
        <p className="text-center text-gray-600">Nenhum problema encontrado.</p>
      )}

      <ul className="space-y-4">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <SkeletonProblem key={i} />
            ))
          : problems.map((problem) => (
            <li key={problem.id} className="border-3 p-4 rounded shadow-sm flex gap-4 items-center">
                <Image
                  src={tipoImagemMap[problem.tipo] || "/img/default.png"} 
                  alt={problem.tipo}
                  width={60}
                  height={60}
                  className="rounded"
                />
                <div className="flex flex-col">
                  <h2 className="font-semibold text-lg text-green-700">
                    {problem.tipo}
                  </h2>
                  <p className="text-sm text-gray-800 w-[100%]">{problem.descricao}</p>
                  <p className="text-xs text-gray-500 italic">
                    {problem.cidade} — {problem.data}
                  </p>
                  <span className=" w-[120px]"> { problem.status }</span>
                </div>
              </li>
            ))}
      </ul>
    </div>
  );
}
