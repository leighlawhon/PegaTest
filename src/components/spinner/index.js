import React from 'react';
import './spinner.scss';
export default function Spinner() {
  return (
    <div className="text-center spinner p-5">
      <span className="pi-pegasus icon "></span>
      <div className="loader"></div>
    </div>
  );
}