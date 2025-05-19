import { useEffect, useState } from "react";
import complaintService from "../../services/complaint-service";
import { ComplaintResponse } from "../../types/complaint";
import { Button } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import CreateComplaint from "./CreateComplaint";
import toast from "react-hot-toast";

const Complaint = () => {
  const [complaint, setComplaint] = useState<ComplaintResponse[]>();
  const getComplaint = () => {
    complaintService.getAll().then((res) => {
      setComplaint(res);
    });
  };
const [open, setOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<ComplaintResponse | null>();
  const deleteComplaint = async(id: number) => {
    const resp = await complaintService.deleteComplaint(id);
    if(resp){
      toast.success("Deleted")
    }
    getComplaint()
  }

  useEffect(() => {
    getComplaint();
    if(!open){
      getComplaint();
      setSelectedComplaint(null)
    }
  }, []);
  return (
    <div>
      <div className="p-8 rounded-sm mb-5">Complaint</div>
      <div className="bg-white rounded-md min-h-64 p-4 shadow-md">
        <div className="mb-3">
            <input placeholder="Search..." className="border border-slate-200 p-2 rounded-md hover:border-blue-400 focus:border-blue-400" />
             <Button sx={{backgroundColor: "blue",color: "white",float: "right"}}
                         onClick={() => setOpen(true)}>New Complaint <Add/></Button>
        </div>
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">FullName</th>
              <th className="px-4 py-3">ComplaintName</th>
              <th className="px-4 py-3">Account Number</th>
              <th className="px-4 py-3">Street</th>
              <th className="px-4 py-3">District</th>
              <th className="px-4 py-3">PhoneNumber</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {complaint?.map((res, index) => (
              <tr key={res.id}>
                <td className="px-4 py-3">{1 + index} </td>
                <td className="px-4 py-3">{res.fullName}</td>
                <td className="px-4 py-3">{res.complaintName}</td>
                <td className="px-4 py-3">{res.accountNumber}</td>
                <td className="px-4 py-3">{res.street}</td>
                <td className="px-4 py-3">{res.district}</td>
                <td className="px-4 py-3">{res.phoneNumber}</td>
                
                <td className="space-x-1.5">
                  <Button onClick={() =>{
                     setSelectedComplaint(res);
                     setOpen(true)
                     }}><Edit sx={{color: "blue"}} /> Edit</Button>
                   <Button onClick={()=> deleteComplaint(res.id)}><Delete sx={{color: "red"}}/> Delete</Button>
                </td>
    
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CreateComplaint open={open} onOpenChange={()=> setOpen(false)} selectedComplaint={selectedComplaint!}/>
    </div>
  );
};

export default Complaint;
