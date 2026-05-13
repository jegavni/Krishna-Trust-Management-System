import { useEffect, useState } from "react";
import api from "../services/api";

function CommitteeView() {
  const [committee, setCommittee] = useState(null);

  useEffect(() => {
    api.get("/committee").then(res => setCommittee(res.data));
  }, []);

  if (!committee) return null;

  return (
    <div className="card p-3">
      <h4>Office Bearers</h4>
      <ul>
        <li>President: {committee.president?.name}</li>
        <li>Vice President: {committee.vicePresident?.name}</li>
        <li>Secretary: {committee.secretary?.name}</li>
        <li>Vice Secretary: {committee.viceSecretary?.name}</li>
        <li>Treasurer: {committee.treasurer?.name}</li>
        <li>Vice Treasurer: {committee.viceTreasurer?.name}</li>
      </ul>
    </div>
  );
}

export default CommitteeView;
