import React from 'react';

export default function JuiceWindow({ position, isDragging, isActive, handleMouseDown, handleDismiss, handleWindowClick, BASE_Z_INDEX, ACTIVE_Z_INDEX }) {
    return (
        <div 
            onClick={handleWindowClick('juiceWindow')}
            style={{
                display: "flex", 
                position: "absolute", 
                zIndex: isActive ? ACTIVE_Z_INDEX : BASE_Z_INDEX, 
                width: 400,
                height: 300,
                color: 'black',
                backgroundColor: "#fff", 
                border: "1px solid #000", 
                borderRadius: 4,
                flexDirection: "column",
                padding: 0,
                justifyContent: "space-between",
                transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
                top: "50%",
                left: "50%",
                userSelect: "none"
            }}>
            <div 
                onMouseDown={handleMouseDown('juiceWindow')}
                style={{
                    display: "flex", 
                    borderBottom: "1px solid #000", 
                    padding: 8, 
                    flexDirection: "row", 
                    justifyContent: "space-between", 
                    cursor: isDragging ? 'grabbing' : 'grab'
                }}>
                <div style={{display: "flex", flexDirection: "row", gap: 8}}>
                    <button onClick={(e) => { e.stopPropagation(); handleDismiss('juiceWindow'); }}>x</button>
                </div>
                <p>???</p>
                <div></div>
            </div>
            <div style={{flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 12}}>
                <h1 style={{fontSize: 32}}>The mysterious Juicer will turn on Feb 1st after World Start Call...</h1>
            </div>
        </div>
    );
} 