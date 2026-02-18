import React from "react";
import "../Skeleton.css";

function Skeleton({ width, height, style }) {
  return (
    <div
      className="skeleton"
      style={{
        width,
        height,
        ...style,
      }}
    />
  );
}

export default Skeleton;
