import React, { useState, useEffect } from "react";
import axios from "axios";

const Found = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await axios.get(
          "https://ulcclub1.onrender.com/api/v1/lost/get-item"
        );

        console.log("API Response:", data);

        // Your API sends { success, lost: [...] }
        if (data?.lost) {
          setItems(data.lost);
        } else {
          setError("Unexpected API response format");
        }
      } catch (err) {
        setError("Error fetching items: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) return <p style={{ padding: "20px" }}>Loading items...</p>;
  if (error) return <p style={{ padding: "20px", color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px", color: "black" }}>All Items</h2>

      {items.length === 0 ? (
        <p>No items found</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {items.map((item) => (
            <div
              key={item._id}
              style={{
                width: "220px",
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "10px",
                textAlign: "center",
                backgroundColor: "#fff", // ensures visible on white background
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={`https://ulcclub1.onrender.com/api/v1/lost/item-photo/${item._id}`}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  backgroundColor: "#f5f5f5",
                }}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/220x150.png?text=No+Image";
                }}
              />
              <h4 style={{ margin: "10px 0", color: "black" }}>{item.name}</h4>
                <p>hello friends </p>
              <p style={{ fontSize: "14px", color: "#333", minHeight: "40px" }}>
                {item.description}
              </p>
              <small style={{ fontSize: "12px", color: "#555" }}>
                Venue: {item.venue}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Found;
