"use client";

import { useState } from "react";

interface StatusFilterProps {
  onStatusChange: (status: string) => void;
}

export default function StatusFilter({ onStatusChange }: StatusFilterProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const statuses = [
    { label: "Pendente", value: "pendente", color: "bg-yellow-500" },
    { label: "Em andamento", value: "em andamento", color: "bg-orange-500" },
    { label: "Resolvido", value: "resolvido", color: "bg-green-600" },
  ];

  const handleClick = (status: string) => {
    const newStatus = selectedStatus === status ? "" : status;
    setSelectedStatus(newStatus);
    onStatusChange(newStatus);
  };

  return (
    <div className="flex justify-center gap-4 mt-4">
      {statuses.map((s) => (
        <button
          key={s.value}
          onClick={() => handleClick(s.value)}
          className={`px-4 py-2 rounded-full text-white text-sm font-medium transition ${
            selectedStatus === s.value ? s.color : "bg-green-700 text-gray-700"
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
