import React from "react";

const OutputDetails = ({ outputDetails }) => {
  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="bg-white rounded-lg border-2 border-[#EDEDED] p-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Status:</span>
            <span className="font-semibold text-sm px-3 py-1 rounded-md bg-gray-100 break-words">
              {outputDetails?.status?.description}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Memory:</span>
            <span className="font-semibold text-sm px-3 py-1 rounded-md bg-gray-100">
              {outputDetails?.memory}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Time:</span>
            <span className="font-semibold text-sm px-3 py-1 rounded-md bg-gray-100">
              {outputDetails?.time}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutputDetails;
