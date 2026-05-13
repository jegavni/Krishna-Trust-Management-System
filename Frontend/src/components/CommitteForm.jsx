import { useEffect, useState } from "react";
import api from "../services/api";

const roles = [
  "president",
  "vicePresident",
  "secretary",
  "viceSecretary",
  "treasurer",
  "viceTreasurer"
];

function CommitteeForm() {
  const [members, setMembers] = useState([]);
  const [committee, setCommittee] = useState({});

  useEffect(() => {
    api.get("/members").then(res => setMembers(res.data));
    api.get("/committee").then(res => setCommittee(res.data || {}));
  }, []);

  const submit = async e => {
    e.preventDefault();
    await api.post("/committee", committee);
    alert("Committee saved");
  };

  return (
    <form onSubmit={submit} className="card p-3">
      <h4>Trust Committee</h4>

      {roles.map(role => (
        <div key={role} className="mb-2">
          <label className="form-label">{role}</label>
          <select
            className="form-select"
            value={committee[role] || ""}
            onChange={e =>
              setCommittee({ ...committee, [role]: e.target.value })
            }
          >
            <option value="">Select Member</option>
            {members.map(m => (
              <option key={m._id} value={m._id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
      ))}

      <button className="btn btn-primary mt-2">Save Committee</button>
    </form>
  );
}

export default CommitteeForm;
