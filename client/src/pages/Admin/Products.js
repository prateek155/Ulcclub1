import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
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
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-600 text-sm font-medium">{label}</p>
          <p className={`text-2xl font-bold text-${color}-600 mt-1`}>{value}</p>
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br from-${color}-100 to-${color}-200`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const ProductCard = ({ product }) => (
    <div className="group bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <img
          src={`https://ulcclub1.onrender.com/api/v1/product/product-photo/${product._id}`}
          className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500"
          alt={product.name}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="h-48 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hidden items-center justify-center">
          <Database className="w-16 h-16 text-white/80" />
        </div>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
        <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
          Active
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-lg text-slate-800 group-hover:text-indigo-600 transition-colors truncate">
            {product.name}
          </h3>
        </div>
        
        <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
          <span>Library Item</span>
          <span>{new Date(product.createdAt || Date.now()).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl hover:from-slate-200 hover:to-slate-300 transition-all duration-200 text-slate-700 font-medium">
            <Eye className="w-4 h-4" />
            View
          </button>
          <button
            onClick={() => openDeleteModal(product)}
            className="p-2 bg-red-50 hover:bg-red-100 rounded-xl transition-colors group"
          >
            <Trash2 className="w-4 h-4 text-red-500 group-hover:text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );

  const ProductListItem = ({ product }) => (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-6">
      <div className="flex-shrink-0">
        <img
          src={`https://ulcclub1.onrender.com/api/v1/product/product-photo/${product._id}`}
          className="w-20 h-20 object-cover rounded-xl"
          alt={product.name}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl hidden items-center justify-center">
          <Database className="w-8 h-8 text-white/80" />
        </div>
      </div>
      
      <div className="flex-1">
        <h3 className="font-bold text-xl text-slate-800 mb-2">{product.name}</h3>
        <div className="flex items-center gap-4 text-sm text-slate-600">
          <span>Library Item</span>
          <span>•</span>
          <span>{new Date(product.createdAt || Date.now()).toLocaleDateString()}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl hover:from-slate-200 hover:to-slate-300 transition-all duration-200 text-slate-700 font-medium">
          <Eye className="w-4 h-4" />
          View
        </button>
        <button
          onClick={() => openDeleteModal(product)}
          className="p-3 bg-red-50 hover:bg-red-100 rounded-xl transition-colors group"
        >
          <Trash2 className="w-4 h-4 text-red-500 group-hover:text-red-600" />
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container-fluid px-6 py-8">
          <div className="row">
            <div className="col-md-3">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-2xl">
                <AdminMenu />
              </div>
            </div>
            
            <div className="col-md-9">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                      AI Events Library
                    </h1>
                    <p className="text-slate-600 text-lg">Manage your intelligent library collection</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="row mb-4">
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
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-lg mb-4">
                <div className="row align-items-center">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <div className="position-relative">
                      <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" style={{width: '20px', height: '20px'}} />
                      <input
                        type="text"
                        placeholder="Search libraries..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="form-control ps-5 py-3 border-0 bg-light rounded-3"
                        style={{paddingLeft: '3rem'}}
                      />
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="d-flex justify-content-end gap-2">
                      <button
                        onClick={() => setFilterOpen(!filterOpen)}
                        className="btn btn-light rounded-3 d-flex align-items-center gap-2"
                      >
                        <Filter style={{width: '16px', height: '16px'}} />
                        Filter
                      </button>
                      
                      <div className="btn-group bg-light rounded-3 p-1">
                        <button
                          onClick={() => setViewMode('grid')}
                          className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-light border-0'} rounded-2`}
                        >
                          <Grid style={{width: '16px', height: '16px'}} />
                        </button>
                        <button
                          onClick={() => setViewMode('list')}
                          className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-light border-0'} rounded-2`}
                        >
                          <List style={{width: '16px', height: '16px'}} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Display */}
              {viewMode === 'grid' ? (
                <div className="row">
                  {filteredProducts?.map((p) => (
                    <div className="col-md-4 col-sm-6 mb-4" key={p._id}>
                      <ProductCard product={p} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
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
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-red-500 to-pink-600 p-4">
                <div className="d-flex align-items-center gap-3 text-white">
                  <div className="p-2 bg-white bg-opacity-20 rounded-3">
                    <AlertTriangle style={{width: '24px', height: '24px'}} />
                  </div>
                  <div>
                    <h3 className="h5 mb-1 fw-bold">Confirm Deletion</h3>
                    <p className="mb-0 small text-red-100">This action cannot be undone</p>
                  </div>
                </div>
              </div>
              
              <div className="modal-body p-4">
                <p className="text-dark mb-3">
                  To confirm deletion of <strong>"{selectedProduct?.name}"</strong>, 
                  please type the library name below:
                </p>
                
                <input
                  type="text"
                  value={productNameInput}
                  onChange={(e) => setProductNameInput(e.target.value)}
                  placeholder="Enter library name"
                  className="form-control rounded-3 border-2 py-3"
                />
                
                <div className="d-flex gap-3 mt-4">
                  <button
                    onClick={closeDeleteModal}
                    className="btn btn-light flex-fill py-3 rounded-3 fw-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={deleteProduct}
                    disabled={loading || productNameInput !== selectedProduct?.name}
                    className="btn btn-danger flex-fill py-3 rounded-3 fw-medium d-flex align-items-center justify-content-center gap-2"
                    style={{background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'}}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" style={{width: '16px', height: '16px'}} />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 style={{width: '16px', height: '16px'}} />
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
    </div>
  );
};

export default Products;
