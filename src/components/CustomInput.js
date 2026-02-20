import React, { useState, useRef } from "react";
import useMediaQuery from "../hooks/useMediaQuery";

const CustomInput = ({ customInput, setCustomInput }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [height, setHeight] = useState(isMobile ? 60 : 120); // Smaller on mobile
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startHeight = useRef(0);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startY.current = e.clientY || e.touches?.[0]?.clientY;
    startHeight.current = height;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleMouseUp);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current && isMobile) return;
    const clientY = e.clientY;
    const delta = clientY - startY.current;
    const maxHeight = window.innerHeight * 0.4;
    const minHeight = isMobile ? 80 : 96;
    const newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight.current + delta));
    setHeight(newHeight);
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current && isMobile) return;
    const clientY = e.touches[0].clientY;
    const delta = clientY - startY.current;
    const maxHeight = window.innerHeight * 0.4;
    const minHeight = isMobile ? 80 : 96;
    const newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight.current + delta));
    setHeight(newHeight);
    e.preventDefault();
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleMouseUp);
  };

  return (
    <div className="w-full" ref={containerRef}>
      <div className="bg-[#386AF6] rounded-t-[10px] px-4 py-3">
        <h1 className="text-white text-base font-bold">
          Input
        </h1>
      </div>
      <div className="relative">
        <textarea
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="Custom input"
          className="w-full bg-white text-black font-normal text-sm border-2 border-t-0 border-b-0 border-[#EDEDED] px-4 py-2 focus:outline-none resize-none"
          style={{ height: `${height}px` }}
        ></textarea>
        <div 
          className="w-full bg-white border-2 border-t-0 border-[#EDEDED] rounded-b-[10px] flex items-center justify-center cursor-row-resize hover:bg-gray-50 active:bg-gray-100 transition-colors touch-none"
          style={{ height: '24px' }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <div className="flex flex-col gap-1">
            <div className="w-8 h-0.5 bg-gray-400 rounded"></div>
            <div className="w-8 h-0.5 bg-gray-400 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomInput;
