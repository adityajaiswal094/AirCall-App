import React from "react";
import CallCard from "./CallCard";

import "../styles/styles.css";

export default function CallsList({
  callsData,
  noDataText,
  archiveSingleCall,
}) {

  return (
    <div className="calls">
      {callsData.length !== 0 ? (
        callsData.map((item) => {
          return (
            <CallCard
              key={item.id}
              item={item}
              archiveSingleCall={archiveSingleCall}
            />
          );
        })
      ) : (
        <p className="text-white">{noDataText}</p>
      )}
    </div>
  );
}
