import React, { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"; // Assuming you're using MUI icons

function AddToCommunity({ onAddPost }) {
  const [picture, setPicture] = useState("");

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("picture", picture);
  };

  return (
    <div className="community-container">
      <form onSubmit={handlePostSubmit} className="community-form">
        <textarea
          className="community-textarea grow"
          placeholder="Write a caption"
        ></textarea>
        <AddPhotoAlternateIcon className="community-icon" />
        <label className="community-label">
          <input
            className="community-input"
            type="file"
            accept="image/*"
            onChange={(e) => setPicture(e.target.files[0])}
          />
        </label>
        <div className="community-things">
          <div>
            <button className="community-button" type="submit">
              Share
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddToCommunity;
