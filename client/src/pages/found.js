import React, { useState, useEffect } from "react";
import axios from "axios";

const GetAllItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/v1/lost/get-item"
        );

        console.log("API Response:", data);

        // Since response contains "lost"
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

  if (loading) return <p>Loading items...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Items</h2>
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
              }}
            >
              <img
                src={`http://localhost:8080/api/v1/lost/item-photo/${item._id}`}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/150?text=No+Image"; // fallback image
                }}
              />
              <h4 style={{ margin: "10px 0" }}>{item.name}</h4>
              <p style={{ fontSize: "14px", color: "#555" }}>
                {item.description}
              </p>
              <small style={{ fontSize: "12px", color: "#777" }}>
                Venue: {item.venue}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetAllItems;
