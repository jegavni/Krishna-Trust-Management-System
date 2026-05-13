// src/components/MemberList.jsx
import { useEffect, useState } from "react";
import api from "../../scr/services/api";

function MemberList() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    api.get("/members").then(res => setMembers(res.data));
  }, []);

  return (
    <div>
      {members.map(m => (
        <div key={m.id} className="card m-2 p-2">
          <h5>{m.name}</h5>
          <p>{m.role}</p>
          {m.photo && (
            <img src={`http://localhost:5000/uploads/${m.photo}`}
                 width="80" />
          )}
        </div>
      ))}
    </div>
  );
}

export default MemberList;
