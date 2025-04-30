import { useEffect, useState } from "react";
import complaintService from "../../services/complaint-service";
import { ComplaintResponse } from "../../types/complaint";

const Complaint = () => {
  const [complaint, setComplaint] = useState<ComplaintResponse[]>();
  const getComplaint = () => {
    complaintService.getAll().then((res) => {
      setComplaint(res);
    });
  };

  useEffect(() => {
    getComplaint();
  }, [complaint]);
  return (
    <div>
      <div className="p-8 rounded-sm mb-5">Complaint</div>
      <div className="bg-white rounded-md min-h-64 p-4 shadow-md">
        <div className="mb-3">
            <input placeholder="Search..." className="border border-slate-200 p-2 rounded-md hover:border-blue-400 focus:border-blue-400" />
           
        </div>
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">FullName</th>
              <th className="px-4 py-3">ComplaintType</th>
              <th className="px-4 py-3">Account Number</th>
              <th className="px-4 py-3">Street</th>
              <th className="px-4 py-3">District</th>
              <th className="px-4 py-3">PhoneNumber</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {complaint?.map((res, index) => (
              <tr key={res.id}>
                <td className="px-4 py-3">{1 + index} </td>
                <td className="px-4 py-3">{res.name}</td>
                <td className="px-4 py-3">{res.street}</td>
    
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Complaint;
