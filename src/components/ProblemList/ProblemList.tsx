"use client";

import { useEffect, useState } from "react";
import SkeletonProblem from "@/components/SkeletonProblem/SkeletonProblem";
import Link from "next/link";

interface Problem {
  id: string;
  tipo: string;
  cidade: string;
  descricao: string;
  localizacao: string;
  data: string;
  status: string;
}

export default function ProblemsList({ filter }: { filter: string }) {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!filter) return;

    const fetchProblems = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://routealive.onrender.com/problems/filter-type/${filter}`);
        if (!res.ok) throw new Error("Erro ao buscar problemas");

        const data = await res.json();
        console.log("Resposta da API:", data);
        setProblems(data);
      } catch (err) {
        console.error("Erro no fetch:", err);
        setProblems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [filter]);

  return (
    <div className="p-4">
      {!loading && problems.length === 0 && <p>Nenhum problema encontrado.</p>}

      <ul className="space-y-4">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => <SkeletonProblem key={i} />)
          : problems.map((problem) => (
              <li key={problem.id} className="border p-4 rounded shadow-sm">
                <h2 className="font-semibold text-lg">{problem.tipo}</h2>
                <p className="text-sm text-gray-700">{problem.descricao}</p>
                <span className="text-xs text-gray-500">{problem.status}</span>
              </li>
            ))}
      </ul>
    </div>
  );
}
