import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
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
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center mb-4 text-primary">All Events Library List</h1>
          <h2>Total Libraries: {products.length}</h2>
          <div className="row">
            {products?.map((p) => (
              <div className="col-md-4 col-sm-6 mb-4" key={p._id}>
                <div
                  className="card shadow-sm hover-card"
                  style={{
                    borderRadius: "10px",
                    overflow: "hidden",
                    transition: "transform 0.2s",
                  }}
                >
                  <img
                    src={`https://ulcclub1.onrender.com/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-dark text-truncate">
                      {p.name}
                    </h5>
                    <div className="d-flex justify-content-between mt-3">
                      <button
                        className="btn btn-sm"
                        onClick={() => openDeleteModal(p)}
                      >
                        <Trash2 className="h-4 w-4 text-danger" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-primary">Confirm User Library Deletion</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeDeleteModal}
                ></button>
              </div>
              <div className="modal-body text-black">
                <p>
                  Enter the library name <strong>"{selectedProduct?.name}"</strong>{" "}
                  to confirm deletion:
                </p>
                <input
                  type="text"
                  className="form-control"
                  value={productNameInput}
                  onChange={(e) => setProductNameInput(e.target.value)}
                  placeholder="Enter product name"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeDeleteModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={deleteProduct}
                  disabled={loading}
                >
                  <Trash2 className="h-4 w-4 text-danger" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Products;
