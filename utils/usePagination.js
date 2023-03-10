import React, { useEffect, useState } from "react";

export function usePagination(datas, itemsPerPage) {
  const perItem = itemsPerPage;
  const [perData, setPerData] = useState(datas);
  useEffect(() => {
    setPerData(datas);
  }, [datas]);
  const [currentPage, setCurrentPage] = useState(1);
  const [firstPage, setFirstPage] = useState(0);
  const [lastPage, setLastPage] = useState(3);
  let totalPages = Math.ceil(perData.length / itemsPerPage) || 1;
  const indexOfLastTodo = currentPage * itemsPerPage;
  const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
  const currentDatas = perData?.slice(indexOfFirstTodo, indexOfLastTodo);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(perData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };
  const handleClick = (value) => {
    setCurrentPage(value);
  };
  useEffect(() => {
    if (currentPage === 1) {
      setFirstPage(0);
      setLastPage(3);
    } else if (currentPage === 2) {
      setFirstPage(0);
      setLastPage(3);
    } else if (currentPage === totalPages) {
      setFirstPage(totalPages - 3);
      setLastPage(totalPages);
    } else {
      setFirstPage(currentPage - 2);
      setLastPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);
  const renderPages = pageNumbers.slice(firstPage, lastPage);
  return {
    perData,
    perItem,
    totalPages,
    indexOfLastTodo,
    indexOfFirstTodo,
    handleClick,
    handleNext,
    handlePrev,
    currentDatas,
    pageNumbers,
    currentPage,
    renderPages,
    setCurrentPage,
    setPerData,
  };
}
