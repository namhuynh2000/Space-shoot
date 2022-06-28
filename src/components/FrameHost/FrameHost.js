import React from 'react';
import "./FrameHost.scss"

function FrameHost({ children }) {
    return (
        <div className="frameWrap">
            <img className="planetIcon" src="/images/Planet-1.png" alt="planetIcon" />
            <img className="starIcon" src="/images/Star2.png" alt="starIcon" />
            {children}
        </div>
    )
}

export default FrameHost