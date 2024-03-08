import React, { useState } from 'react';
import logo from "../../utils/img/logo.png";
import Modal from "../../component/modal";
import "./index.css";
import axios from 'axios';
const Header = () => {
    const [showModal, setShowModal] = useState(false);
    const [currentData, setCurrentData] = useState({
        name:"",
        industry:"",
        website:"",
        address:"",
        notes:""
    });

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        try {
          axios.post("http://localhost:5000/account/",{...currentData} ).then((data)=>{
          setCurrentData(data.data);
          setShowModal(false);
          })    
        } catch (error) {
          console.log(error);
          
        }
        console.log("handleAdd Submit");
    }

    return (
        <>
            <header className="navbar">
                <div className="navbar-brand">
                    <img src={logo} alt="Application Logo" className="logo" />
                </div>
                <nav className="navbar-nav">
                    <ul>
                        <li>
                            <button className='active' onClick={openModal}>Add Account</button>
                        </li>
                    </ul>
                </nav>
            </header>
            {showModal && (
                <Modal
                    onClose={closeModal}
                    isOpen={true}
                    children={<>
                        <h2>Add New Account</h2>
                        <form onSubmit={handleAddSubmit} className="edit-form-container">
                            <div className="fields-container">
                                <label className="form-label" htmlFor="name">Name:</label>
                                <input
                                    className="text-input"
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={currentData.name}
                                    onChange={(e) => {
                                        const updatedValue = {...currentData}
                                        updatedValue.name = e.target.value;
                                        setCurrentData(updatedValue);
                                    }}
                                    required
                                />
                            </div>
                            <div className="fields-container">
                                <label htmlFor="industries" className="form-label">Industries:</label>
                                <input
                                    type="text"
                                    id="industry"
                                    name="industry"
                                    className="text-input"
                                    value={currentData.industry}
                                    onChange={(e) => {
                                        const updatedValue = {...currentData}
                                        updatedValue.industry = e.target.value;
                                        setCurrentData(updatedValue);
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
                                    value={currentData.website}
                                    onChange={(e) => {
                                        const updatedValue = {...currentData}
                                        updatedValue.website = e.target.value;
                                        setCurrentData(updatedValue);
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
                                    value={currentData.address}
                                    onChange={(e) => {
                                        const updatedValue = {...currentData}
                                        updatedValue.address = e.target.value;
                                        setCurrentData(updatedValue);
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
                                    value={currentData.notes}
                                    rows={5}
                                    onChange={(e) => {
                                        const updatedValue = {...currentData}
                                        updatedValue.notes = e.target.value;
                                        setCurrentData(updatedValue);
                                    }}
                                    required
                                ></textarea>
                            </div>
                            <button className="edit-submit-btn" type="submit">Submit</button>
                        </form>


                    </>}

                />
            )}
        </>
    )
}

export default Header;


// children={
//     <>
//         <h2>Edit Account</h2>
//         {/* Your form content here */}
//     </>
// }