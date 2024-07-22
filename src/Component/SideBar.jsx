import React from "react";

export const SideBar = () => {
  return (
    <div>
      <aside>
        <h2>MNE</h2>
        <hr />
        <div className="sidebutton">
          <div>
            <button>
              <img src="/mage_dashboard.png" alt="asd" />
              Dashboard
            </button>
          </div>
          <div>
            <button>
              <img src="/pepicons-pencil_t-shirt.png" alt="asd" />
              Products
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};
