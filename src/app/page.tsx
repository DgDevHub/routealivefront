"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header/Header";
import StatusFilter from "@/components/StatusFilter";
import CitySearch from "@/components/CitySearch";
import ProblemsList from "@/components/ProblemList/ProblemList";
import Footer from "@/components/Footer/Footer";

export default function HomePage() {
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");

  // Limpar cidade quando tipo ou status mudar
  useEffect(() => {
    setCityFilter("");
  }, [typeFilter, statusFilter]);

  return (
    <>
      <Header onFilterChange={setTypeFilter} />
      <CitySearch onCityChange={setCityFilter} />
      <StatusFilter onStatusChange={setStatusFilter} />
      <ProblemsList filter={typeFilter} status={statusFilter} cidade={cityFilter} />
      <Footer />
    </>
  );
}
