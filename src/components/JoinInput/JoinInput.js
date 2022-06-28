import React from "react";
import "./JoinInput.scss"
export default function JoinInput({ label, value, onChangeHandle, className = '' }) {
  return (
    <div className="formInput">
      <input className={className} type="text" placeholder={label} value={value} onChange={onChangeHandle} />
    </div>
  );
}
