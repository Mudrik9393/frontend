import React, { useState, useEffect } from "react";

import type { BillRequest, BillResponse } from "../../types/bill"; // assume types inatoka hapa

interface UserBillsProps {
  userId: number;
}

const UserBills: React.FC<UserBillsProps> = ({ userId }) => {
  const [bills, setBills] = useState<BillResponse[]>([]);
  const [formData, setFormData] = useState<BillRequest>({
    billName: "",
    description: "",
    unit: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load bills za user on mount au userId change
  useEffect(() => {
    async function fetchBills() {
      try {
        const res = await fetch(`http://localhost:5555/api/bills/user/${userId}`);
        if (res.status === 204) {
          setBills([]);
          return;
        }
        if (!res.ok) {
          throw new Error("Failed to fetch bills");
        }
        const data: BillResponse[] = await res.json();
        setBills(data);
      } catch (err) {
        setError((err as Error).message);
      }
    }
    if (userId) fetchBills();
  }, [userId]);

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: name === "unit" ? Number(value) : value,
    }));
  };

  // Submit new bill
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:5555/api/bills/create/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error(`Failed to create bill, status: ${res.status}`);
      }
      const newBill: BillResponse = await res.json();
      setBills(prev => [...prev, newBill]);
      setFormData({ billName: "", description: "", unit: 0 });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2>User Bills</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {bills.length === 0 && <li>No bills found.</li>}
        {bills.map(bill => (
          <li key={bill.billId} style={{ marginBottom: 10, borderBottom: "1px solid #ccc", paddingBottom: 10 }}>
            <strong>{bill.billName}</strong><br />
            Description: {bill.description ?? "No description"}<br />
            Units: {bill.unit}<br />
            Total Amount: {bill.totalAmount.toLocaleString()} TZS
          </li>
        ))}
      </ul>

      <h3>Add New Bill</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>
            Bill Name: <br />
            <input
              type="text"
              name="billName"
              value={formData.billName}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: 8 }}
            />
          </label>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>
            Description: <br />
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{ width: "100%", padding: 8 }}
            />
          </label>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>
            Units: <br />
            <input
              type="number"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              min={1}
              required
              style={{ width: "100%", padding: 8 }}
            />
          </label>
        </div>

        <button type="submit" disabled={loading} style={{ padding: "10px 20px" }}>
          {loading ? "Saving..." : "Save Bill"}
        </button>
      </form>
    </div>
  );
};

export default UserBills;
