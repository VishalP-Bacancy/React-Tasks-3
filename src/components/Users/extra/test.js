// import React,{useState} from 'react'
import { useEffect, useState } from "react";
import { Outlet, Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { FaSortUp } from "react-icons/fa";
// import { Navigate } from "react-router-dom";
import Modal from "react-modal";


function Users({
  data,
  setData,
  viewObjData,
  deleteObj,
  editUserDetail,
  onisEditable,
}) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams,setSearchParams] = useSearchParams()

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [search, setSearch] = useState("");
  
  //sorting
  const handleSortClick = () => {
    const sortedData = [...data];
    setIsSorted(!isSorted);
    sortedData.sort((a, b) => {
      const NameA = a.name.toLowerCase();
      const NameB = b.name.toLowerCase();
      return NameA.localeCompare(NameB);
    });
    setData(sortedData);
  };

  
  //search
  const datafilter = data.filter((item)=>{
    return search === "" ? item : item.name.toLowerCase().includes(search.toLowerCase())
  })

  //pagination
  const [page, setPage] = useState(1);
  const [selectedValue, setSeletectedValue] = useState(5);
  
    
    
  const noOfPages = Math.ceil(Number(datafilter.length/+selectedValue));
  console.log("first " + noOfPages)
  
  const pageVal = searchParams.get('pageValue')
  console.log(pageVal)

  useEffect(()=>{
    if(pageVal){
      setPage(pageVal)
      console.log("sdfghjkl"+noOfPages +"dfghjkl"+pageVal)
      if(+pageVal > noOfPages){
        setSearchParams({pageValue:1})
      }      
    }
  },[pageVal,search])

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= noOfPages &&
      selectedPage !== page
    )
    setPage(selectedPage);
    setSearchParams({pageValue:selectedPage})
  };

  const handleSelectChange = (event) => {
    console.log(event.target.value);
    setSeletectedValue(event.target.value);
  };

  function viewUser(d) {
    navigate(`/users/${d.id}`);
    viewObjData(d);
  }

  function editUser(d) {
    navigate(`/users/edit/${d.id}`);
    console.log(editUserDetail);
    editUserDetail(d);
    onisEditable();
  }

  //delete
  useEffect(() => {
    if (id) {
      setModalIsOpen(true);
    }
  }, [id]);

  const openModal = (userId) => {
    setModalIsOpen(true);
    navigate(`/users/delete/${userId}`);
  };

  const closeModal = (e) => {
    e.preventDefault();
    navigate(`/users?pageValue=${page}`);
    setModalIsOpen(false);
  };

  const deleteUser = (e) => {
    e.preventDefault();
    deleteObj(+id);
    setModalIsOpen(false);
    navigate(`/users?pageValue=${page}`);
  };

  const customStyles = {
    content: {
      width: "50%", // Adjust the width as needed
      height: "50%", // Adjust the height as needed
      margin: "auto",
    },
  };

  // function deleteUser(id){
  //   //  navigate(`/users/delete/${id}`)
  //   const afterDeleted = data.filter((item)=>item.id !== id)
  //    setData(afterDeleted)
  // }

  return (
    <div className="container mt-5">
      <input
        type="text"
        placeholder="search name"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="text-end">
        <Link to="/users/add" className="btn btn-primary">
          Add +
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name {<FaSortUp onClick={handleSortClick} />}</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {datafilter.length > 0 ? (
           datafilter.slice(page*selectedValue - selectedValue, page * selectedValue).map((d, i) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => editUser(d)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm ms-1 btn-danger"
                    onClick={() => openModal(+d.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-sm ms-1 btn-success"
                    onClick={() => viewUser(d)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <p>Users Not found!!</p>
          )}

          {modalIsOpen ? (
            <Modal
              isOpen={modalIsOpen}
              style={customStyles}
              className="d-flex w-100 h-100 justify-content-center align-items-center"
            >
              <div className="w-50 border bg-light p-5">
                <form>
                  <label>Do you really want to delete?</label>
                  <br />
                  <button className="btn btn-info ms-1" onClick={deleteUser}>
                    Yes
                  </button>
                  <button className="btn btn-info" onClick={closeModal}>
                    No
                  </button>
                </form>
              </div>
            </Modal>
          ) : (
            <></>
          )}
        </tbody>
      </table>

      {/* Pagination component */}
      {datafilter.length > 0 && (
          <ul className="pagination">
            <li
              className={`page-item ${+page === 1 ? "opacity-0 disabled" : ""}`}
            >
              <a
                className="page-link"
                onClick={() => {
                  selectPageHandler(+page - 1);
                }}
              >
                Prev
              </a>
            </li>
            {[...Array(+noOfPages)].map((_, i) => {
              return (
                <li
                  className={`page-item ${+page === i + 1 ? "active" : ""}`}
                  key={i}
                >
                  <a
                    className="page-link"
                    onClick={() => selectPageHandler(i + 1)}
                  >
                    {i + 1}
                  </a>
                </li>
              );
            })}

            <li
              className={`page-item ${
                page < noOfPages ? "" : "disabled opacity-0"
              }`}
            >
              <a
                className="page-link"
                onClick={() => {
                  selectPageHandler(+page + 1);
                }}
              >
                Next
              </a>
            </li>

            {/* for records per page */}
            <label className="page-link ms-5">Records</label>
            <select
              value={selectedValue}
              onChange={handleSelectChange}
              className="page-link"
            >
              {Array.from({ length: 10 }, (_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </ul>
      
      )}
   
     
      <Outlet />
    </div>
  );
}

export default Users;