/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import CallsList from "../components/CallsList";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { StoreCalls } from "../store/callReducer";

export default function Homepage() {
  const BASE_URL = "https://cerulean-marlin-wig.cyclic.app";

  const [callData, setCallData] = useState([]);
  const [activeTab, setActiveTab] = useState("tab-1");

  const normalCalls = useSelector((state) => state.calls.normalCalls);
  const archivedCalls = useSelector((state) => state.calls.archivedCalls);
  const totalCalls = useSelector((state) => state.calls.totalCalls);

  const showArchivedCalls = useSelector(
    (state) => state.calls.showArchivedCalls
  );
  const dispatch = useDispatch();

  const activeTabHandler = (tabId) => {
    setActiveTab(tabId);
  };

  const getActivities = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/activities`);
      const data = await response.data;
      setCallData(data);
      dispatch(StoreCalls(data));
    } catch (error) {
      console.error(error);
    }
  };

  const archiveSingleCall = async (id) => {
    try {
      const response = await axios.patch(`${BASE_URL}/activities/${id}`, {
        is_archived: true,
      });
      getActivities();
    } catch (error) {
      console.error(error);
    }
  };

  const archiveAllCalls = async () => {
    try {
      for (let i = 0; i < normalCalls.length; i++) {
        const currentCall = normalCalls[i];
        await archiveSingleCall(currentCall.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const unarchiveAllCalls = async () => {
    try {
      const response = await axios.patch(`${BASE_URL}/reset`);
      console.log(response.data);
      getActivities();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalCalls]);

  return (
    <div className="homepage">
      <Header
        activeTab={activeTab}
        activeTabHandler={activeTabHandler}
        archiveAllCalls={archiveAllCalls}
        unarchiveAllCalls={unarchiveAllCalls}
      />

      <CallsList
        callsData={activeTab === "tab-1" ? normalCalls : archivedCalls}
        // callsData={activeTab === "tab-1" ? normalCalls : archivedCalls}
        noDataText={
          activeTab === "tab-1" ? "No calls to show" : "No archived calls"
        }
        archiveSingleCall={archiveSingleCall}
      />
    </div>
  );
}
