"use client";

import React from "react";

export default function SectionDivider() {
  return (
    <div
      className="bg-gray-200 my-24 h-16 w-1 rounded-full hidden sm:block dark:bg-opacity-20"
      style={{ animation: 'fadeSlideUp 0.5s ease-out 0.125s both' }}
    ></div>
  );
}
