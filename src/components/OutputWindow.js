import React, { useState, useRef } from "react";
import useMediaQuery from "../hooks/useMediaQuery";

const OutputWindow = ({ outputDetails }) => {
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
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // compilation error
      return (
        <pre className="px-4 py-2 font-normal text-sm text-red-500">
          {atob(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre className="px-4 py-2 font-normal text-sm text-green-600">
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre className="px-4 py-2 font-normal text-sm text-red-500">
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      return (
        <pre className="px-4 py-2 font-normal text-sm text-red-500">
          {atob(outputDetails?.stderr)}
        </pre>
      );
    }
  };
  return (
    <div className="w-full" ref={containerRef}>
      <div className="bg-[#386AF6] rounded-t-[10px] px-4 py-3">
        <h1 className="text-white text-base font-bold">
          Output
        </h1>
      </div>
      <div className="relative">
        <div 
          className="w-full bg-white text-black font-normal text-sm overflow-auto border-2 border-t-0 border-b-0 border-[#EDEDED]" 
          style={{ height: `${height}px` }}
        >
          {outputDetails ? <>{getOutput()}</> : null}
        </div>
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

export default OutputWindow;
