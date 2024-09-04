import React, { useState } from "react";
import "../../global.css"; // Make sure global.css is correctly imported

const SavePlaylistAlert: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      {isOpen && (
        <div className="alert success-alert">
          <div className="alert-icon">✔</div>
          <div className="alert-content">
            <strong className="alert-title">Success 🙌</strong>
            <span>Your Playlist has been saved!</span>
          </div>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
      )}
      {/* Button to trigger the alert */}
      <button className="show-alert-button" onClick={onOpen}>
        Show Alert
      </button>
    </>
  );
};

export default SavePlaylistAlert;
