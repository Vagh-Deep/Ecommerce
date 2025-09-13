import React from "react";

// Smile Arc
export const SmileArc = ({ size = 100, strokeWidth = 4, color = "currentColor" }) => (
  <svg
    width={size}
    height={size / 2}
    viewBox="0 0 100 50"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 20 Q50 50 80 20"
      stroke={color}
      strokeWidth={strokeWidth}
      fill="transparent"
      strokeLinecap="round"
    />
  </svg>
);

// Sad Arc
export const SadArc = ({ size = 100, strokeWidth = 4, color = "currentColor" }) => (
  <svg
    width={size}
    height={size / 2}
    viewBox="0 0 100 50"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 30 Q50 0 80 30"
      stroke={color}
      strokeWidth={strokeWidth}
      fill="transparent"
      strokeLinecap="round"
    />
  </svg>
);
