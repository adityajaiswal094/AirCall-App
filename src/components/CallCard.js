/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../styles/styles.css";
import moment from "moment";
import {
  HiOutlinePhoneIncoming,
  HiOutlinePhoneOutgoing,
  HiOutlinePhoneMissedCall,
} from "react-icons/hi";
import { IoMdMore } from "react-icons/io";

import Sidebar from "./Sidebar";

export default function CallCard({ item, callIdHandler, archiveSingleCall }) {
  const [showActivityDetails, setShowActivityDetails] = useState(false);

  const { id, call_type, created_at, direction, from, to, is_archived } = item;

  const formattedTime = moment(created_at).format("h:mm A");

  const showActivityDetailsHandler = () => {
    setShowActivityDetails(!showActivityDetails);
  };

  const moreActionsHandler = (event) => {
    if (event.stopPropagation) {
      event.stopPropagation();
    }
  };

  return (
    <div
      className="card call-card-style"
      role="button"
      onClick={showActivityDetailsHandler}
    >
      <div className="card-body">
        <div style={{ display: "flex", alignItems: "center" }}>
          {call_type === "missed" ? (
            <HiOutlinePhoneMissedCall size={20} color="red" />
          ) : direction === "inbound" ? (
            <HiOutlinePhoneIncoming size={20} color="green" />
          ) : (
            <HiOutlinePhoneOutgoing size={20} color="green" />
          )}
          <div
            style={{
              display: "flex",
              flex: 2,
              flexDirection: "column",
              alignItems: "flex-start",
              marginLeft: "10px",
            }}
          >
            <h5 className="card-title text-white">{from}</h5>
            <h6 className="card-subtitle mb-2 text-white text-white">
              tried to call on {to}
            </h6>
            <h6 className="card-subtitle mb-2 text-white text-white-50">
              {formattedTime}
            </h6>
          </div>

          {/* menu button for archive */}
          {is_archived === false && (
            <div
              style={{ display: "flex" }}
              role="button"
              onClick={moreActionsHandler}
              class="dropdown"
            >
              <IoMdMore
                type="button"
                size={20}
                color="white"
                data-bs-toggle="dropdown"
              />
              <ul class="dropdown-menu">
                <li
                  style={{ textAlign: "center" }}
                  onClick={() => {
                    archiveSingleCall(id);
                  }}
                >
                  Archive Call
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {showActivityDetails && (
        <Sidebar
          showActivityDetails={showActivityDetails}
          showActivityDetailsHandler={showActivityDetailsHandler}
          call={item}
        />
      )}
    </div>
  );
}
