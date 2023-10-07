import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/ProductDetailsStyles.css";
import { useCart } from "../context/cart";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const {setCart} = useCart()

  // Initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Get similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Add product to cart
  const addToCart = (p) => {
    setCart((old) => {
      return [...old, p]
    })
    toast.success("Item Added to cart");
  };

  return (
    <Layout>
      <div className="container product-details" style={{ marginTop: '120px' }}>
        <div className="row">
          <div className="col-md-6">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              className="product-image"
              alt={product.name}
            />
          </div>
          <div className="col-md-6 product-details-info">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-description">{product.description}</p>
            <div className="product-price">
              Price:{" "}
              {product?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
              })}
            </div>
            <div className="product-category">Category: {product?.category?.name}</div>
            <button className="btn btn-secondary mt-3" onClick={() => addToCart(product)}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="container similar-products">
        <h4>Similar Products</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="row">
          {relatedProducts?.map((p) => (
            <div className="col-md-4" key={p._id}>
              <div className="card">
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <div className="card-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </div>
                  <p className="card-text">{p.description.substring(0, 60)}...</p>
                  <button className="btn btn-info" onClick={() => navigate(`/product/${p.slug}`)}>
                    More Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
