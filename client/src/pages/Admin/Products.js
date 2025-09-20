import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import { Trash2 } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productNameInput, setProductNameInput] = useState("");

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://ulcclub1.onrender.com/api/v1/product/get-product"
      );
      setProducts(data.product);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something Went Wrong",
      });
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setDeleteModal(true);
  };

  // Close delete modal
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setSelectedProduct(null);
    setProductNameInput("");
  };

  // Delete product
  const deleteProduct = async () => {
    if (productNameInput !== selectedProduct.name) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "Event name does not match!",
      });
    }

    try {
      setLoading(true);
      const { data } = await axios.delete(
        `https://ulcclub1.onrender.com/api/v1/product/product/${selectedProduct._id}`
      );
      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: data.message,
          timer: 2000,
          showConfirmButton: false,
        });
        setProducts(products.filter((p) => p._id !== selectedProduct._id)); // Update the products list
        closeDeleteModal();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error while deleting event",
      });
    } finally {
      setLoading(false);
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="main-content">
      <Layout>
        <style jsx>{`
          /* CRITICAL FIX: Remove all margins and ensure full width */
          * {
            box-sizing: border-box;
          }

          .main-content {
            flex: 1;
            background: #f8fafc;
            overflow-y: auto;
            min-width: 0;
            width: 100vw; /* Full viewport width */
            margin: 0;
            padding: 0;
            position: relative;
          }

          .products-container {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 1rem 0; /* Reduced padding for mobile */
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            width: 100%;
            margin: 0;
            box-sizing: border-box;
          }

          .content-wrapper {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 0.5rem; /* Minimal padding */
            width: 100%;
            box-sizing: border-box;
          }

          .header-section {
            text-align: center;
            margin-bottom: 2rem;
            padding: 1.5rem 1rem; /* Adjusted padding */
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 16px; /* Reduced border radius for mobile */
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            margin-left: 0.5rem;
            margin-right: 0.5rem;
          }

          .main-title {
            font-size: 2rem; /* Reduced for mobile */
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 0.5rem;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            letter-spacing: -0.02em;
            line-height: 1.2;
          }

          .product-count {
            font-size: 1.1rem; /* Slightly reduced */
            color: rgba(255, 255, 255, 0.9);
            font-weight: 500;
            margin: 0;
          }

          .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1.5rem;
            padding: 0 0.5rem; /* Minimal padding */
            width: 100%;
            box-sizing: border-box;
          }

          .product-card {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 12px; /* Slightly reduced */
            overflow: hidden;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            border: 1px solid rgba(255, 255, 255, 0.3);
            width: 100%;
            box-sizing: border-box;
          }

          .product-card:hover {
            transform: translateY(-4px) scale(1.01); /* Reduced transform for mobile */
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
          }

          .product-image {
            width: 100%;
            height: 180px; /* Reduced height for mobile */
            object-fit: cover;
            transition: transform 0.3s ease;
          }

          .product-card:hover .product-image {
            transform: scale(1.03); /* Reduced scale */
          }

          .card-body {
            padding: 1.25rem; /* Reduced padding */
            background: linear-gradient(145deg, #ffffff, #f8fafc);
          }

          .product-title {
            font-size: 1.1rem; /* Reduced font size */
            font-weight: 600;
            color: #1a202c;
            margin-bottom: 1rem;
            line-height: 1.3;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .card-actions {
            display: flex;
            justify-content: flex-end;
            align-items: center;
          }

          .delete-btn {
            background: linear-gradient(135deg, #ff6b6b, #ee5a52);
            border: none;
            border-radius: 8px; /* Reduced border radius */
            padding: 0.625rem; /* Slightly reduced padding */
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 3px 12px rgba(238, 90, 82, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .delete-btn:hover {
            background: linear-gradient(135deg, #ff5252, #d32f2f);
            transform: translateY(-1px); /* Reduced transform */
            box-shadow: 0 5px 18px rgba(238, 90, 82, 0.4);
          }

          .delete-btn:active {
            transform: translateY(0);
          }

          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(4px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1050;
            animation: fadeIn 0.3s ease;
            padding: 1rem; /* Add padding for mobile */
            box-sizing: border-box;
          }

          .modal-content {
            background: white;
            border-radius: 16px; /* Reduced for mobile */
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
            max-width: 450px; /* Reduced max width */
            width: 100%;
            max-height: 90vh; /* Prevent overflow on small screens */
            overflow-y: auto;
            animation: slideIn 0.3s ease;
            margin: 0;
          }

          .modal-header {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 1.25rem; /* Slightly reduced */
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .modal-title {
            font-size: 1.1rem; /* Reduced for mobile */
            font-weight: 600;
            margin: 0;
            line-height: 1.3;
          }

          .close-btn {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.2s ease;
          }

          .close-btn:hover {
            background: rgba(255, 255, 255, 0.2);
          }

          .modal-body {
            padding: 1.5rem; /* Reduced padding */
            text-align: center;
          }

          .modal-body p {
            font-size: 0.95rem; /* Slightly smaller */
            color: #4a5568;
            margin-bottom: 1.25rem;
            line-height: 1.5;
          }

          .modal-body strong {
            color: #2d3748;
            font-weight: 600;
          }

          .form-input {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 2px solid #e2e8f0;
            border-radius: 8px; /* Reduced border radius */
            font-size: 0.95rem; /* Slightly smaller */
            transition: all 0.3s ease;
            outline: none;
            box-sizing: border-box;
          }

          .form-input:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          }

          .modal-footer {
            padding: 1.25rem 1.5rem; /* Reduced padding */
            background: #f7fafc;
            display: flex;
            gap: 0.75rem; /* Reduced gap */
            justify-content: flex-end;
          }

          .btn-secondary {
            background: #718096;
            color: white;
            border: none;
            padding: 0.625rem 1.25rem; /* Slightly reduced */
            border-radius: 8px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.9rem;
          }

          .btn-secondary:hover {
            background: #4a5568;
            transform: translateY(-1px);
          }

          .btn-danger {
            background: linear-gradient(135deg, #ff6b6b, #ee5a52);
            color: white;
            border: none;
            padding: 0.625rem 1.25rem;
            border-radius: 8px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.9rem;
          }

          .btn-danger:hover:not(:disabled) {
            background: linear-gradient(135deg, #ff5252, #d32f2f);
            transform: translateY(-1px);
          }

          .btn-danger:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-30px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          /* MOBILE SPECIFIC STYLES */
          @media (max-width: 768px) {
            .main-content {
              width: 100vw;
              overflow-x: hidden;
            }

            .products-container {
              padding: 0.75rem 0;
              width: 100%;
            }

            .content-wrapper {
              padding: 0 0.25rem; /* Minimal padding */
              max-width: 100%;
            }

            .header-section {
              margin: 0 0.25rem 1.5rem 0.25rem;
              padding: 1.25rem 0.75rem;
              border-radius: 12px;
            }

            .main-title {
              font-size: 1.75rem;
              line-height: 1.2;
            }

            .product-count {
              font-size: 1rem;
            }

            .products-grid {
              grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
              gap: 1rem;
              padding: 0 0.25rem;
            }

            .product-card {
              border-radius: 10px;
            }

            .product-image {
              height: 160px;
            }

            .card-body {
              padding: 1rem;
            }

            .product-title {
              font-size: 1rem;
              margin-bottom: 0.75rem;
            }

            .delete-btn {
              padding: 0.5rem;
              border-radius: 6px;
            }
          }

          /* EXTRA SMALL MOBILE STYLES */
          @media (max-width: 480px) {
            .products-container {
              padding: 0.5rem 0;
            }

            .content-wrapper {
              padding: 0;
            }

            .header-section {
              margin: 0 0.125rem 1rem 0.125rem;
              padding: 1rem 0.5rem;
              border-radius: 10px;
            }

            .main-title {
              font-size: 1.5rem;
            }

            .products-grid {
              grid-template-columns: 1fr;
              gap: 0.75rem;
              padding: 0 0.125rem;
            }

            .product-card {
              margin: 0;
            }

            .modal-overlay {
              padding: 0.5rem;
            }

            .modal-content {
              max-width: 100%;
              border-radius: 12px;
            }

            .modal-header {
              padding: 1rem;
            }

            .modal-title {
              font-size: 1rem;
            }

            .modal-body {
              padding: 1rem;
            }

            .modal-body p {
              font-size: 0.9rem;
            }

            .form-input {
              font-size: 0.9rem;
              padding: 0.625rem 0.75rem;
            }

            .modal-footer {
              padding: 1rem;
              flex-direction: column-reverse;
              gap: 0.5rem;
            }

            .modal-footer button {
              width: 100%;
              justify-content: center;
            }

            .btn-secondary,
            .btn-danger {
              padding: 0.75rem;
              font-size: 0.9rem;
            }
          }

          /* VERY SMALL SCREENS */
          @media (max-width: 360px) {
            .main-title {
              font-size: 1.25rem;
            }

            .product-count {
              font-size: 0.9rem;
            }

            .header-section {
              padding: 0.75rem 0.375rem;
            }

            .products-grid {
              padding: 0;
            }

            .product-image {
              height: 140px;
            }
          }

          .loading-spinner {
            width: 18px;
            height: 18px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top: 2px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <div className="products-container">
          <div className="content-wrapper">
            <div className="header-section">
              <h1 className="main-title">All Events Library List</h1>
              <h2 className="product-count">Total Libraries: {products.length}</h2>
            </div>
            
            <div className="products-grid">
              {products?.map((p) => (
                <div key={p._id} className="product-card">
                  <img
                    src={`https://ulcclub1.onrender.com/api/v1/product/product-photo/${p._id}`}
                    className="product-image"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="product-title">{p.name}</h5>
                    <div className="card-actions">
                      <button
                        className="delete-btn"
                        onClick={() => openDeleteModal(p)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {deleteModal && (
          <div className="modal-overlay" onClick={closeDeleteModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h5 className="modal-title">Confirm User Library Deletion</h5>
                <button
                  type="button"
                  className="close-btn"
                  onClick={closeDeleteModal}
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <p>
                  Enter the library name <strong>"{selectedProduct?.name}"</strong>{" "}
                  to confirm deletion:
                </p>
                <input
                  type="text"
                  className="form-input"
                  value={productNameInput}
                  onChange={(e) => setProductNameInput(e.target.value)}
                  placeholder="Enter product name"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={closeDeleteModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-danger"
                  onClick={deleteProduct}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="loading-spinner"></div>
                  ) : (
                    <Trash2 size={16} />
                  )}
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default Products;
