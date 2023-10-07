import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useCart } from "../context/cart";
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import toast from "react-hot-toast";
import "../styles/Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const {cart, setCart} = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  



  // Get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-category');
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getTotal();
  }, []);

 //get products
 const getAllProducts = async () => {
  try {
    setLoading(true);
    const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
    setLoading(false);
    setProducts(data.products);
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
};
 
  //getTotal Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  // load more function

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  // Filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // Filter by price
  const handlePriceFilter = (value) => {
    setRadio(value);
  };

  // Apply filters and get filtered products
  useEffect(() => {
    const filterProduct = async () => {
      try {
        const { data } = await axios.post('/api/v1/product/product-filters', {
          checked,
          radio,
        });
        setProducts(data?.products);
      } catch (error) {
        console.log(error);
      }
    };

    if (checked.length > 0 || radio.length > 0) {
      filterProduct();
    } else {
      getAllProducts();
    }
  }, [checked, radio]);

  return (
    <Layout title={'All Products - Best Offer'}>
         <img
        src="/images/banner.png"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />
      {/* banner image */}

      <div style={{ marginTop: '100px' }}> <br />
        <div className="row mt-3">
          <div className="col-md-2">
            <h4 className="text-center m-2">Filter by Categories</h4>
            <div
              className="d-flex flex-column"
              style={{
                marginLeft: '11px',
              }}
            >
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
              {/* Price filter */}
              <h4 className="text-center mt-3">Filter By Price</h4>
              <div className="d-flex flex-column my-3">
                <Radio.Group
                  onChange={(e) => handlePriceFilter(e.target.value)}
                  value={radio}
                >
                  {Prices?.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
              <div className="d-flex flex-column mx-1 my-4">
               <button class="btn btn-sm btn-outline-danger ms-2"
                onClick={() => window.location.reload()}>RESET FILTERS</button>
              </div>
            </div>
          </div>
        
          <div className="col-md-10">
          <h1 className="text-center">All Products</h1>
          <br />
            <div className="d-flex flex-wrap">
              {products.map((p) => (
                <div
                  className="card m-1"
                  key={p._id}
                  style={{
                    width: '18rem',
                    marginRight: '2px',
                    marginBottom: '2px',
                    marginLeft: '1px',
                  }}
                >
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name.substring(0, 14)}...</h5>
                    <p className="card-text">{p.description.substring(0, 30)}....</p>
                    <p className="card-text">₹{p.price}</p>
                    <button className="btn  btn-outline-primary" 
                     onClick={() => navigate(`/product/${p.slug}`)}
                     >
                      More Details
                  </button>
                  <button className="btn btn-outline-secondary ms-1"
                     onClick={() => {
                      setCart((oldCart) => {
                       if (Array.isArray(oldCart)) {
                        return [...oldCart, p];
                        } else {
                         return [p]; // If oldCart is not an array, create a new array with p
                        }
                       });
                       toast.success("Item Added to cart");
                       }}
                     >
                      ADD TO CART
                   </button>

                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='m-2 p-3'>
          {products && products.length < total && (
              <button
                className="btn loadmore " class="btn btn-outline-danger"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Load More
                  </>
                )}
              </button>
            )}
           
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
