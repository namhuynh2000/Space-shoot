import React from "react";
export default function JoinInput({ label, value, onChangeHandle }) {
  return (
    <div>
      <input type="text" placeholder={label} value={value} onChange={onChangeHandle} style={{
        borderRadius:'4px', 
        height:'45px',
        width:'290px',
        textAlign:'center',
        margin:'5px',
        lineHeight:'4px',
        fontSize:'15px',
        fontWeight:'bolder'
      }} />
    </div>
  );
}
