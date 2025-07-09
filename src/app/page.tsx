"use client";

import { useState } from "react";
import Header from "@/components/Header/Header";
import ProblemsList from "@/components/ProblemList/ProblemList"; // ajuste o path conforme necessário
import Footer from "@/components/Footer/Footer";

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  return (
    <>
      <Header onFilterChange={(tipo) => setSelectedFilter(tipo)} />
      <ProblemsList filter={selectedFilter} />
      <Footer></Footer>
    </>
  );
}
