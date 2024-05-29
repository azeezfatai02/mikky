import React from "react";

export default function Modals({ children }) {
  return (
    <div className="modal">
      <div>{children}</div>
    </div>
  );
}
