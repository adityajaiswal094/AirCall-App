import React from "react";
import { Offcanvas } from "react-bootstrap";
import "../styles/styles.css";
import {
  HiOutlinePhoneIncoming,
  HiOutlinePhoneMissedCall,
  HiOutlinePhoneOutgoing,
} from "react-icons/hi";
import moment from "moment";

export default function Sidebar({
  showActivityDetails,
  showActivityDetailsHandler,
  call,
  ...props
}) {
  const {
    call_type,
    created_at,
    direction,
    duration,
    from,
    to,
    via,
    // eslint-disable-next-line no-unused-vars
    is_archived,
  } = call;

  const formattedDate = moment(created_at).format("DD-MM-YYYY");
  const formattedTime = moment(created_at).format("hh:mm A");

  return (
    <>
      <Offcanvas
        className="sidebar"
        placement="end"
        show={showActivityDetails}
        onHide={showActivityDetailsHandler}
        {...props}
      >
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          <div className="card call-activity-detail">
            <div className="card-body">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {call_type === "missed" ? (
                  <HiOutlinePhoneMissedCall size={20} color="red" />
                ) : direction === "inbound" ? (
                  <HiOutlinePhoneIncoming size={20} color="green" />
                ) : (
                  <HiOutlinePhoneOutgoing size={20} color="green" />
                )}
                <div
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  <h5 className="card-title text-white">{from}</h5>
                  <h6 className="card-subtitle mb-2 text-white text-white-50">
                    Tried to call on {to}
                  </h6>
                </div>
              </div>
              <p className="card-text text-white">Via: {via}</p>
              <p className="card-text text-white">Call Duration: {duration}</p>
              <p className="card-text text-white">Called on: {formattedDate}</p>
              <p className="card-text text-white">Called at: {formattedTime}</p>
              <p className="card-text text-white">Call type: {call_type}</p>
              <p className="card-text text-white">
                Call Direction: {direction}
              </p>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
