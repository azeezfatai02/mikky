import React from "react";
import "./EditModal.css";

function EditProductModal({ product, onClose, onSave, onChange }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Product</h2>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={onChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={product.description}
            onChange={onChange}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={onChange}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={onChange}
          />
        </label>
        <button onClick={onSave} className="save-button">
          Save
        </button>
        <button onClick={onClose} className="cancel-button">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditProductModal;
