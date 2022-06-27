import React from "react";
import "./JoinInput.scss"
export default function JoinInput({ label, value, onChangeHandle }) {
  return (
    <div className="formInput">
      <input type="text" placeholder={label} value={value} onChange={onChangeHandle} />
    </div>
  );
}
