import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

type Customer = {
  userId: number;
  userName: string;
};

type Bill = {
  billId: number;
  billName: string;
  description?: string;
  unit: number;
  totalAmount: number;
};

export default function MeterReaderBills() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | "">("");
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5555/api/bills/customers")
      .then((res) => setCustomers(res.data))
      .catch(() => toast.error("Failed to load customers"));
  }, []);

  useEffect(() => {
    if (selectedUserId === "") {
      setBills([]);
      return;
    }

    setLoading(true);
    axios
      .get(`http://localhost:5555/api/bills/user/${selectedUserId}`)
      .then((res) => {
        setBills(res.data);
      })
      .catch(() => toast.error("Failed to load bills"))
      .finally(() => setLoading(false));
  }, [selectedUserId]);

  let billsContent;
  if (loading) {
    billsContent = <p>Loading bills...</p>;
  } else if (selectedUserId === "") {
    billsContent = <p>Please select a customer to view bills.</p>;
  } else if (bills.length === 0) {
    billsContent = <p>No bills found for this customer.</p>;
  } else {
    billsContent = (
      <ul>
        {bills.map((bill) => (
          <li
            key={bill.billId}
            style={{
              marginBottom: 10,
              padding: 10,
              border: "1px solid #ddd",
              borderRadius: 5,
            }}
          >
            <strong>{bill.billName}</strong> <br />
            Description: {bill.description || "N/A"} <br />
            Units: {bill.unit} <br />
            Total Amount: {bill.totalAmount.toLocaleString()} TZS
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "100px auto 40px auto", // Space juu zaidi
        padding: 20,
        backgroundColor: "white",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <h2 style={{ marginBottom: 20 }}>View Customer Bills</h2>

      <label
        htmlFor="customerSelect"
        style={{ fontWeight: "bold", display: "block", marginBottom: 6 }}
      >
        Select Customer:
      </label>
      <select
        id="customerSelect"
        value={selectedUserId}
        onChange={(e) =>
          setSelectedUserId(e.target.value === "" ? "" : Number(e.target.value))
        }
        style={{
          width: "100%",
          padding: 8,
          marginBottom: 20,
          borderRadius: 4,
          border: "1px solid #ccc",
        }}
      >
        <option value="">-- Select Customer --</option>
        {customers.map((customer) => (
          <option key={customer.userId} value={customer.userId}>
            {customer.userName}
          </option>
        ))}
      </select>

      {billsContent}
    </div>
  );
}
