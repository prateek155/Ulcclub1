import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import { Trash2, Search, Filter, Grid, List, Sparkles, Database, Eye, AlertTriangle, Loader2 } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productNameInput, setProductNameInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState('grid');
  const [filterOpen, setFilterOpen] = useState(false);

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

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const StatCard = ({ icon: Icon, label, value, color = "blue" }) => (
    <div className={`stat-card stat-card-${color}`}>
      <div className="stat-card-content">
        <div className="stat-card-text">
          <p className="stat-label">{label}</p>
          <p className="stat-value">{value}</p>
        </div>
        <div className={`stat-icon stat-icon-${color}`}>
          <Icon className="icon-medium" />
        </div>
      </div>
    </div>
  );

  const ProductCard = ({ product }) => (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={`https://ulcclub1.onrender.com/api/v1/product/product-photo/${product._id}`}
          className="product-image"
          alt={product.name}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="product-image-fallback">
          <Database className="fallback-icon" />
        </div>
        <div className="product-image-overlay"></div>
        <div className="product-status">Active</div>
      </div>
      
      <div className="product-card-body">
        <div className="product-header">
          <h3 className="product-title">{product.name}</h3>
        </div>
        
        <div className="product-meta">
          <span>Library Item</span>
          <span>{new Date(product.createdAt || Date.now()).toLocaleDateString()}</span>
        </div>
        
        <div className="product-actions">
          <button className="btn-view">
            <Eye className="icon-small" />
            View
          </button>
          <button
            onClick={() => openDeleteModal(product)}
            className="btn-delete"
          >
            <Trash2 className="icon-small" />
          </button>
        </div>
      </div>
    </div>
  );

  const ProductListItem = ({ product }) => (
    <div className="product-list-item">
      <div className="product-list-image-container">
        <img
          src={`https://ulcclub1.onrender.com/api/v1/product/product-photo/${product._id}`}
          className="product-list-image"
          alt={product.name}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="product-list-image-fallback">
          <Database className="icon-medium" />
        </div>
      </div>
      
      <div className="product-list-content">
        <h3 className="product-list-title">{product.name}</h3>
        <div className="product-list-meta">
          <span>Library Item</span>
          <span>•</span>
          <span>{new Date(product.createdAt || Date.now()).toLocaleDateString()}</span>
        </div>
      </div>
      
      <div className="product-list-actions">
        <button className="btn-view">
          <Eye className="icon-small" />
          View
        </button>
        <button
          onClick={() => openDeleteModal(product)}
          className="btn-delete btn-delete-large"
        >
          <Trash2 className="icon-small" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        /* Main Container */
        .products-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #e8eaf6 100%);
          padding: 2rem 0;
        }

        /* Icon Sizes */
        .icon-small {
          width: 16px;
          height: 16px;
        }

        .icon-medium {
          width: 24px;
          height: 24px;
        }

        .icon-large {
          width: 32px;
          height: 32px;
        }

        .fallback-icon {
          width: 64px;
          height: 64px;
          color: rgba(255, 255, 255, 0.8);
        }

        /* Admin Menu Wrapper */
        .admin-menu-wrapper {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        /* Header */
        .products-header {
          margin-bottom: 2rem;
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }

        .header-icon {
          padding: 12px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border-radius: 16px;
          box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.4);
        }

        .main-title {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }

        .main-subtitle {
          font-size: 1.125rem;
          color: #64748b;
          margin: 0;
        }

        /* Stats Section */
        .stats-section {
          margin-bottom: 2rem;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(8px);
          border-radius: 16px;
          padding: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15);
          transform: translateY(-2px);
        }

        .stat-card-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .stat-label {
          color: #64748b;
          font-size: 0.875rem;
          font-weight: 500;
          margin: 0;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0.25rem 0 0 0;
        }

        .stat-card-indigo .stat-value {
          color: #6366f1;
        }

        .stat-card-green .stat-value {
          color: #10b981;
        }

        .stat-card-orange .stat-value {
          color: #f59e0b;
        }

        .stat-icon {
          padding: 12px;
          border-radius: 12px;
        }

        .stat-icon-indigo {
          background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
          color: #6366f1;
        }

        .stat-icon-green {
          background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
          color: #10b981;
        }

        .stat-icon-orange {
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          color: #f59e0b;
        }

        /* Search and Filter Section */
        .search-filter-section {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(8px);
          border-radius: 16px;
          padding: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem;
        }

        .search-container {
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          width: 20px;
          height: 20px;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 3rem;
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.2s ease;
        }

        .search-input:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
          border-color: #6366f1;
        }

        .filter-controls {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
        }

        .btn-filter {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background-color: #f1f5f9;
          border: none;
          border-radius: 12px;
          color: #475569;
          font-weight: 500;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .btn-filter:hover {
          background-color: #e2e8f0;
        }

        .view-toggle {
          display: flex;
          background-color: #f1f5f9;
          border-radius: 12px;
          padding: 4px;
        }

        .view-btn {
          padding: 8px;
          border: none;
          border-radius: 8px;
          background: transparent;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .view-btn.active {
          background-color: white;
          color: #6366f1;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        /* Product Cards */
        .products-grid {
          gap: 1.5rem;
        }

        .product-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          transition: all 0.5s ease;
        }

        .product-card:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.2);
          transform: translateY(-8px);
        }

        .product-image-container {
          position: relative;
          overflow: hidden;
          height: 200px;
        }

        .product-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .product-card:hover .product-image {
          transform: scale(1.1);
        }

        .product-image-fallback {
          width: 100%;
          height: 200px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
          display: none;
          align-items: center;
          justify-content: center;
        }

        .product-image-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }

        .product-card:hover .product-image-overlay {
          background: rgba(0, 0, 0, 0.1);
        }

        .product-status {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 4px 8px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 500;
          background-color: #dcfce7;
          color: #166534;
          border: 1px solid #bbf7d0;
        }

        .product-card-body {
          padding: 1.5rem;
        }

        .product-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .product-title {
          font-weight: 700;
          font-size: 1.125rem;
          color: #1e293b;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.2s ease;
        }

        .product-card:hover .product-title {
          color: #6366f1;
        }

        .product-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.875rem;
          color: #64748b;
          margin-bottom: 1rem;
        }

        .product-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .btn-view {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
          border: none;
          border-radius: 12px;
          color: #475569;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-view:hover {
          background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
        }

        .btn-delete {
          padding: 8px;
          background-color: #fef2f2;
          border: none;
          border-radius: 12px;
          color: #ef4444;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-delete:hover {
          background-color: #fee2e2;
          color: #dc2626;
        }

        .btn-delete-large {
          padding: 12px;
        }

        /* List View */
        .products-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .product-list-item {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
          border-radius: 12px;
          padding: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          gap: 1.5rem;
          transition: all 0.3s ease;
        }

        .product-list-item:hover {
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15);
          transform: translateY(-2px);
        }

        .product-list-image-container {
          flex-shrink: 0;
          position: relative;
        }

        .product-list-image {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 12px;
        }

        .product-list-image-fallback {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
          border-radius: 12px;
          display: none;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.8);
        }

        .product-list-content {
          flex: 1;
        }

        .product-list-title {
          font-weight: 700;
          font-size: 1.25rem;
          color: #1e293b;
          margin: 0 0 0.5rem 0;
        }

        .product-list-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.875rem;
          color: #64748b;
        }

        .product-list-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        /* Modal Styles */
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 1rem;
        }

        .modal-dialog {
          max-width: 500px;
          width: 100%;
          z-index: 10000;
        }

        .modal-content-custom {
          background: white;
          border-radius: 24px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          overflow: hidden;
          animation: modalSlideIn 0.3s ease;
          z-index: 10001;
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .modal-header-custom {
          background: linear-gradient(135deg, #ef4444 0%, #ec4899 100%);
          padding: 1.5rem;
        }

        .modal-header-content {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: white;
        }

        .modal-icon {
          padding: 8px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 12px;
        }

        .modal-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0;
        }

        .modal-subtitle {
          font-size: 0.875rem;
          margin: 0;
          color: rgba(255, 255, 255, 0.9);
        }

        .modal-body-custom {
          padding: 1.5rem;
        }

        .modal-text {
          color: #1f2937;
          margin-bottom: 1rem;
        }

        .modal-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.2s ease;
          margin-bottom: 1.5rem;
        }

        .modal-input:focus {
          outline: none;
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }

        .modal-actions {
          display: flex;
          gap: 0.75rem;
        }

        .btn-cancel {
          flex: 1;
          padding: 0.75rem 1rem;
          background-color: #f1f5f9;
          border: none;
          border-radius: 12px;
          color: #475569;
          font-weight: 500;
          cursor: pointer !important;
          transition: all 0.2s ease;
          position: relative;
          z-index: 10002;
        }

        .btn-cancel:hover {
          background-color: #e2e8f0;
        }

        .btn-delete-confirm {
          flex: 1;
          padding: 0.75rem 1rem;
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 500;
          cursor: pointer !important;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          position: relative;
          z-index: 10002;
        }

        .btn-delete-confirm:hover:not(:disabled) {
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
        }

        .btn-delete-confirm:disabled {
          opacity: 0.5;
          cursor: not-allowed !important;
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .products-container {
            padding: 1rem 0;
          }

          .main-title {
            font-size: 2rem;
          }

          .main-subtitle {
            font-size: 1rem;
          }

          .header-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }

          .filter-controls {
            justify-content: flex-start;
            flex-wrap: wrap;
          }

          .product-list-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .product-list-actions {
            align-self: stretch;
            justify-content: space-between;
          }

          .modal-dialog {
            margin: 1rem;
          }

          .modal-actions {
            flex-direction: column;
          }
        }

        @media (max-width: 576px) {
          .stats-section .col-md-4 {
            margin-bottom: 1rem;
          }

          .search-filter-section {
            padding: 1rem;
          }

          .filter-controls {
            gap: 0.5rem;
          }

          .btn-filter {
            padding: 0.5rem 0.75rem;
            font-size: 0.875rem;
          }

          .view-toggle {
            padding: 2px;
          }

          .view-btn {
            padding: 6px;
          }

          .product-card-body {
            padding: 1rem;
          }

          .product-actions {
            flex-direction: column;
            gap: 0.75rem;
          }

          .btn-view {
            width: 100%;
            justify-content: center;
          }
        }

        /* Dark mode support (optional) */
        @media (prefers-color-scheme: dark) {
          .products-container {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
          }

          .stat-card,
          .search-filter-section,
          .product-card,
          .product-list-item {
            background: rgba(30, 41, 59, 0.8);
            border-color: rgba(71, 85, 105, 0.3);
          }

          .main-title {
            background: linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .main-subtitle {
            color: #94a3b8;
          }

          .stat-label {
            color: #94a3b8;
          }

          .product-title {
            color: #f8fafc;
          }

          .product-meta {
            color: #94a3b8;
          }

          .search-input {
            background-color: #334155;
            border-color: #475569;
            color: #f8fafc;
          }

          .search-input::placeholder {
            color: #94a3b8;
          }

          .btn-filter {
            background-color: #334155;
            color: #f8fafc;
          }

          .view-toggle {
            background-color: #334155;
          }

          .view-btn {
            color: #94a3b8;
          }

          .view-btn.active {
            background-color: #475569;
            color: #6366f1;
          }
        }
      `}</style>
      <Layout>
      <div className="products-container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              
            </div>
            
            <div className="col-md-9">
              {/* Header */}
              <div className="products-header">
                <div className="header-content">
                  <div className="header-icon">
                    <Sparkles className="icon-large" />
                  </div>
                  <div className="header-text">
                    <h1 className="main-title">AI Events Library</h1>
                    <p className="main-subtitle">Manage your intelligent library collection</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="row stats-section">
                <div className="col-md-4 mb-3">
                  <StatCard icon={Database} label="Total Libraries" value={products.length} color="indigo" />
                </div>
                <div className="col-md-4 mb-3">
                  <StatCard icon={Eye} label="Active Libraries" value={products.length} color="green" />
                </div>
                <div className="col-md-4 mb-3">
                  <StatCard icon={AlertTriangle} label="Monitoring" value="24/7" color="orange" />
                </div>
              </div>

              {/* Search and Filters */}
              <div className="search-filter-section">
                <div className="row align-items-center">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <div className="search-container">
                      <Search className="search-icon" />
                      <input
                        type="text"
                        placeholder="Search libraries..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                      />
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="filter-controls">
                      <button
                        onClick={() => setFilterOpen(!filterOpen)}
                        className="btn-filter"
                      >
                        <Filter className="icon-small" />
                        Filter
                      </button>
                      
                      <div className="view-toggle">
                        <button
                          onClick={() => setViewMode('grid')}
                          className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                        >
                          <Grid className="icon-small" />
                        </button>
                        <button
                          onClick={() => setViewMode('list')}
                          className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                        >
                          <List className="icon-small" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Display */}
              {viewMode === 'grid' ? (
                <div className="row products-grid">
                  {filteredProducts?.map((p) => (
                    <div className="col-md-4 col-sm-6 mb-4" key={p._id}>
                      <ProductCard product={p} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="products-list">
                  {filteredProducts?.map((p) => (
                    <ProductListItem key={p._id} product={p} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Delete Modal */}
      {deleteModal && (
        <div className="modal-backdrop">
          <div className="modal-dialog">
            <div className="modal-content-custom">
              <div className="modal-header-custom">
                <div className="modal-header-content">
                  <div className="modal-icon">
                    <AlertTriangle className="icon-medium" />
                  </div>
                  <div className="modal-header-text">
                    <h3 className="modal-title">Confirm Deletion</h3>
                    <p className="modal-subtitle">This action cannot be undone</p>
                  </div>
                </div>
              </div>
              
              <div className="modal-body-custom">
                <p className="modal-text">
                  To confirm deletion of <strong>"{selectedProduct?.name}"</strong>, 
                  please type the library name below:
                </p>
                
                <input
                  type="text"
                  value={productNameInput}
                  onChange={(e) => setProductNameInput(e.target.value)}
                  placeholder="Enter library name"
                  className="modal-input"
                />
                
                <div className="modal-actions">
                  <button
                    type="button"
                    onClick={closeDeleteModal}
                    className="btn-cancel"
                    style={{ cursor: 'pointer', zIndex: 9999 }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={deleteProduct}
                    disabled={loading || productNameInput !== selectedProduct?.name}
                    className="btn-delete-confirm"
                    style={{ cursor: loading || productNameInput !== selectedProduct?.name ? 'not-allowed' : 'pointer', zIndex: 9999 }}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="icon-small spinner" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="icon-small" />
                        Delete
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          </div>
        )}
      </Layout>
    </>
  );
};

export default Products;
