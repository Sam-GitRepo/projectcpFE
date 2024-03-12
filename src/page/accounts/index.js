import React, { useEffect, useState } from 'react'
import axios from "axios";
import "./index.css";
import Table from '../../component/Table';


const Accounts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [currentRowId, setCurrentRowId] = useState(1);
  const [currentRow, setCurrentRow] = useState({})
  const handleEdit = (id, callback) => {
    console.log(id)
    setCurrentRowId(id);
    setCurrentRow(tableData.find((item) => item.id === id))
  }

  useEffect(() => {
    fetch("http://localhost:5000/account").then((res) => res.json()).then((data) => {
      setTableData(data);
      setIsModalOpen(false);
    })
  }, [])
  const handleEditSubmit = (e) => {
    e.preventDefault();
    try {
      axios.put("http://localhost:5000/account/" + currentRowId, { ...currentRow }).then((data) => {
        setCurrentRow(data.data);
        fetch("http://localhost:5000/account").then((res) => res.json()).then((data) => {
          setTableData(data);
          setIsModalOpen(false);
        })
        setIsModalOpen(false);
      })

    } catch (error) {
      console.log(error);

    }
  }
  return (
    <div className='container'>
      <Table isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} columns={[{ key: "name", width: "20%" }, { key: "industry", width: "20%" }, { key: 'website', width: "20%" }, { key: 'address', width: "20%" }, { key: "notes", width: "20%" }]} data={tableData} pageSize={5} modalBody={<>
        <h2>Edit Account</h2>
        <form onSubmit={handleEditSubmit} className="edit-form-container">
          <div className="fields-container">
            <label className="form-label" htmlFor="name">Name:</label>
            <input
              className="text-input"
              type="text"
              id="name"
              name="name"
              value={currentRow?.name || ""}
              onChange={(e) => {
                const updatedRow = { ...currentRow };
                updatedRow.name = e.target.value;
                setCurrentRow(updatedRow);
              }}
              required
            />
          </div>
          <div className="fields-container">
            <label htmlFor="industries" className="form-label">Industries:</label>
            <input
              type="text"
              id="industries"
              name="industries"
              className="text-input"
              value={currentRow.industry}
              onChange={(e) => {
                const updatedRow = { ...currentRow };
                updatedRow.industry = e.target.value;
                setCurrentRow(updatedRow);
              }}
              required
            />
          </div>
          <div className="fields-container">
            <label className="form-label" htmlFor="website">Website:</label>
            <input
              className="text-input"
              type="text"
              id="website"
              name="website"
              value={currentRow.website || ""}
              onChange={(e) => {
                const updatedRow = { ...currentRow };
                updatedRow.website = e.target.value;
                setCurrentRow(updatedRow);
              }}
              required
            />
          </div>
          <div className="fields-container">
            <label className="form-label" htmlFor="address">Address:</label>
            <input
              className="text-input"
              type="text"
              id="address"
              name="address"
              value={currentRow.address || ""}
              onChange={(e) => {
                const updatedRow = { ...currentRow };
                updatedRow.address = e.target.value;
                setCurrentRow(updatedRow);
              }}
              required
            />
          </div>
          <div className="fields-container text-area-container">
            <label className="form-label" htmlFor="notes">Notes:</label>
            <textarea
              className="textarea-input"
              id="notes"
              name="notes"
              value={currentRow.notes || ""}
              rows={5}
              onChange={(e) => {
                const updatedRow = { ...currentRow };
                updatedRow.notes = e.target.value;
                setCurrentRow(updatedRow);
              }}
              required
            ></textarea>
          </div>
          <button className="edit-submit-btn" type="submit">Submit</button>
        </form>


      </>} onEdit={handleEdit} />
    </div>
  )
}

export default Accounts;