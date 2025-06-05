import { useState } from "react";
import logo from "../../assets/image/zawa-logo.png";



function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8080/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      if (res.ok) {
        setMessage("Password changed successfully");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        const errorText = await res.text();
        setMessage("Failed: " + errorText);
      }
    } catch (err) {
      setMessage("Error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <img src={logo} alt="ZAWA Logo" className="w-20 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Change Account Password</h2>

        <form onSubmit={handleChangePassword} className="text-left space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block mb-1 font-semibold text-gray-700">Current Password</label>
            <input
              type="password"
              placeholder="Please Enter Your Current Password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label  htmlFor="newPassword" className="block mb-1 font-semibold text-gray-700">New Password</label>
            <input
              type="password"
              placeholder="Please Enter Your New Password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label  htmlFor="Password" className="block mb-1 font-semibold text-gray-700">Re-Type New Password</label>
            <input
              type="password"
              placeholder="Please Re-Type Your New Password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 text-white font-semibold py-2 rounded hover:bg-yellow-500 transition"
          >
            Change Password
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-red-500 font-medium text-center">{message}</p>
        )}
      </div>
    </div>
  );
}

export default ChangePassword;
