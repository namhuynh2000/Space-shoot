import React, { useEffect, useState } from "react";
export default function JoinInput({ label, value, onChangeHandle }) {
  return (
    <div>
      <label>{label}: </label>
      <input type="text" value={value} onChange={onChangeHandle} />
    </div>
  );
}
