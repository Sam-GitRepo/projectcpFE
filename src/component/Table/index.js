import React, { useState } from "react";
import "./index.css"; // Import your CSS file for styling
import Modal from "../modal";

const Table = ({ data, columns, pageSize, onEdit, modalBody, isModalOpen, setIsModalOpen}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);


  const handleModalClick = (id) => {
    setIsModalOpen(true);
    onEdit(id);
    
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const sortedData = () => {
    let sortedData = [...data];
    if (sortConfig !== null) {
      sortedData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedData;
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredData = () => {
    return sortedData().filter((row) =>
      Object.values(row).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const pageCount = Math.ceil(filteredData().length / pageSize);

  const paginatedData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData().slice(startIndex, startIndex + pageSize);
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="table-container">
        <input
          type="text"
          className="table-search-input"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <table className="table">
          <thead>
            <tr className="table-header-container">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="table-header"
                  style={{ width: column.width ? column.width : "auto" }}
                  onClick={() => handleSort(column.key)}
                >
                  {column.key}
                </th>
              ))}
              {/* <th className="table-header">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {paginatedData().map((row, index) => (
              <tr key={index} className="table-row">
              {console.log(row)}
                {columns.map((column) => (
                  <td key={column.key} className="table-cell">
                    {row[column.key]}
                  </td>
                ))}
                <td className="table-cell">
                  <button
                    onClick={() => handleModalClick(row.id)}
                    className="editButton"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button
            className="pagination-button"
            onClick={() => handleChangePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              className="pagination-button"
              onClick={() => handleChangePage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="pagination-button"
            onClick={() => handleChangePage(currentPage + 1)}
            disabled={currentPage === pageCount}
          >
            Next
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          children={modalBody}
          isOpen={true}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default Table;
