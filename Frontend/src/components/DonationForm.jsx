import { useState } from "react";

function DonationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Donation Submitted:", formData);
    alert("Thank you for your donation!");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Donate to Our Trust</h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow">

        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Donation Amount (₹)</label>
          <input
            type="number"
            className="form-control"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Message (Optional)</label>
          <textarea
            className="form-control"
            rows="3"
            name="message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-success w-100">
          Donate Now
        </button>

      </form>
    </div>
  );
}

export default DonationForm;