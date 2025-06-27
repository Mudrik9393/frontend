import { useEffect, useState } from "react";
import requestService from "../../services/request-service";
import { RequestResponse } from "../../types/request";
import { Button } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import toast from "react-hot-toast";
import CreateRequest from "./CreateRequest";

const Request = () => {
  const [requests, setRequests] = useState<RequestResponse[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<RequestResponse | null>(null);

  const getRequests = () => {
    requestService
      .getAll()
      .then((res) => {
        setRequests(res);
      })
      .catch(() => {
        toast.error("Failed to fetch requests");
      });
  };

  const deleteRequest = async (id: number) => {
    try {
      await requestService.deleteRequest(id);
      toast.success("Deleted successfully");
      getRequests();
    } catch {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    getRequests();
    if (!open) {
      setSelectedRequest(null);
    }
  }, [open]);

  return (
    <div>
      <div className="p-6 rounded-sm m-5 text-xl font-semibold">Requests</div>
      <div className="bg-white rounded-md min-h-64 p-6 m-5 shadow-md overflow-auto">
        <div className="mb-4 flex justify-between items-center">
          <input
            placeholder="Search..."
            className="border border-slate-200 p-2 rounded-md hover:border-blue-400 focus:border-blue-400"
          />
          <Button
            sx={{ backgroundColor: "blue", color: "white" }}
            onClick={() => setOpen(true)}
          >
            New Request <Add />
          </Button>
        </div>
        <table className="min-w-full text-sm text-left text-gray-700 border">
          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Full Name</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">Request Name</th>
              <th className="px-4 py-2 border">Document</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Account Number</th>
              <th className="px-4 py-2 border">Message</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((res, index) => (
              <tr key={res.requestId} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{res.fullName}</td>
                <td className="px-4 py-2 border">{res.phoneNumber}</td>
                <td className="px-4 py-2 border">{res.address}</td>
                <td className="px-4 py-2 border">{res.requestName}</td>
                <td className="px-4 py-2 border">
                  {res.document ? (
                    <a
                      href={`http://localhost:5555/uploads/${res.document}`}
                      className="text-blue-600 underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {res.document}
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-4 py-2 border">{new Date(res.date).toLocaleDateString()}</td>
                <td className="px-4 py-2 border">{res.accountNumber}</td>
                <td className="px-4 py-2 border">{res.message || "-"}</td>
                <td className="px-4 py-2 border space-x-1.5">
                  <Button
                    onClick={() => {
                      setSelectedRequest(res);
                      setOpen(true);
                    }}
                  >
                    <Edit sx={{ color: "blue" }} /> Edit
                  </Button>
                  <Button onClick={() => deleteRequest(res.requestId)}>
                    <Delete sx={{ color: "red" }} /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CreateRequest
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={() => getRequests()}
      />
    </div>
  );
};

export default Request;
