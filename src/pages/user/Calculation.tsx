import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

type Customer = {
  userId: number;
  userName: string;
};

type BillRequest = {
  billName: string;
  description: string;
  unit: number;
};

// Hakikisha umeweka image hii kwenye path hii:
// src/assets/image/zawa-logo.png
import zawaLogo from "../../assets/image/zawa-logo.png";


export default function UserBills() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | "">("");
  const [formData, setFormData] = useState<BillRequest>({
    billName: "",
    description: "",
    unit: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5555/api/users/customers")
      .then((res) => setCustomers(res.data))
      .catch(() => toast.error("Failed to load customers"));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "unit") {
      setFormData((prev) => ({
        ...prev,
        [name]: Number(value),
      }));
    } else if (name === "selectedUserId") {
      setSelectedUserId(value === "" ? "" : Number(value));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedUserId === "" || !formData.billName || formData.unit <= 0) {
      toast.error("Please fill in all required fields and select customer.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `http://localhost:5555/api/bills/create/${selectedUserId}`,
        formData
      );
      toast.success("Bill created successfully");

      // Reset form
      setSelectedUserId("");
      setFormData({ billName: "", description: "", unit: 0 });
    } catch (error) {
      toast.error("Failed to create bill");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow">
      {/* Nembo ya ZAWA */}
      <div className="flex justify-center mb-6">
        <img
          src={zawaLogo}
          alt="ZAWA Logo"
          className="h-20 object-contain"
        />
      </div>

      <Toaster position="top-center" reverseOrder={false} />

      <h2 className="text-2xl font-semibold mb-4">Add Bill</h2>

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium" htmlFor="selectedUserId">
          Select Customer
        </label>
        <select
          id="selectedUserId"
          name="selectedUserId"
          value={selectedUserId}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-4"
          required
        >
          <option value="">-- Select Customer --</option>
          {customers.map((c) => (
            <option key={c.userId} value={c.userId}>
              {c.userName}
            </option>
          ))}
        </select>

        <label className="block mb-2 font-medium" htmlFor="billName">
          Bill Name
        </label>
        <input
          type="text"
          id="billName"
          name="billName"
          value={formData.billName}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-4"
          required
          placeholder="Enter bill name"
        />

        <label className="block mb-2 font-medium" htmlFor="description">
          Description
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-4"
          placeholder="Optional description"
        />

        <label className="block mb-2 font-medium" htmlFor="unit">
          Unit
        </label>
        <input
          type="number"
          id="unit"
          name="unit"
          min={1}
          value={formData.unit}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-4"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {loading ? "Submitting..." : "Submit Bill"}
        </button>
      </form>
    </div>
  );
}
