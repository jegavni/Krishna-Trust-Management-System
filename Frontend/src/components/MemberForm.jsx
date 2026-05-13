// src/components/MemberForm.jsx
import { useState } from "react";
import api from "../../scr/services/api";

function MemberForm() {
  const [form, setForm] = useState({ name: "", role: "", phone: "" });
  const [photo, setPhoto] = useState(null);

  const submit = async e => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach(k => data.append(k, form[k]));
    data.append("photo", photo);

    await api.post("/members", data);
    alert("Member added");
  };

  return (
    <form onSubmit={submit} className="p-3">
      <input className="form-control mb-2" placeholder="Name"
        onChange={e => setForm({...form, name: e.target.value})} />
      <input className="form-control mb-2" placeholder="Role"
        onChange={e => setForm({...form, role: e.target.value})} />
      <input className="form-control mb-2" placeholder="Phone"
        onChange={e => setForm({...form, phone: e.target.value})} />
      <input type="file" className="form-control mb-2"
        onChange={e => setPhoto(e.target.files[0])} />
      <button className="btn btn-primary">Add Member</button>
    </form>
  );
}

export default MemberForm;
