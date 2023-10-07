import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/api/v1/product/search/${values.keyword}`);
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div><br />
    <form
      className="d-flex justify-content-center align-items-center"
      onSubmit={handleSubmit}
      style={{
        background: "#f0f5ff",        // Modern background color
        paddingBottom: "20px",
        borderRadius: "10px",         // Rounded corners
        boxShadow: "0px ",
        width: "auto",                // Auto-adjust width to content
        margin: "0 auto",             // Centered alignment
      }}
    >
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search for products"
        aria-label="Search"
        value={values.keyword}
        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        style={{
         
          borderRadius: "10px",       // Rounded corners
          fontSize: "18px",          // Increased font size
          background: "transparent", // Transparent background
          flex: 1,
        }}
      />
      <button
        className="btn btn-outline-success"
        type="submit">
        Search
      </button>
    </form>
    </div>
  );
};

export default SearchInput;
