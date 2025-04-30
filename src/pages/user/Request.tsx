import { useEffect, useState } from "react";
import requestService from "../../services/request-service";
import { RequestResponse } from "../../types/request";

const Request = () => {
  const [request, setRequest] = useState<RequestResponse[]>();
  const getRequest = () => {
    requestService.getAll().then((res) => {
      setRequest(res);
    });
  };

  useEffect(() => {
    getRequest();
  }, [request]);
  return (
    <div>
      <div className="p-2 rounded-sm mb-3">Complaint</div>
      <div className="bg-white rounded-md min-h-64 p-4 shadow-md">
        <div className="mb-3">
            <input placeholder="Search..." className="border border-slate-200 p-2 rounded-md hover:border-blue-400 focus:border-blue-400" />
           
        </div>
        <table className="w-full border font-medium border-collapse border-slate-100">
          <thead>
            <tr className="bg-gray-100 p-4">
              <th className="p-1">#</th>
              <th>FullName</th>
              <th>RequestName</th>
              <th>Property Type</th>
              <th>Date</th>
              <th>Document</th>
              <th>Account Number</th>
              <th>Control Number</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {request?.map((res, index) => (
              <tr key={res.id} className="border-b">
                <td>{1 + index} </td>
                <td>{res.name}</td>
                
    
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Request;
