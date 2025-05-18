import { useEffect, useState } from "react";
import userService from "../../services/user-service";
import { UserResponse } from "../../types/user";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import CreateUser from "./CreateUser";
import toast from "react-hot-toast";

const User = () => {
  const [user, setUser] = useState<UserResponse[]>();
  const getUser = () => {
    userService.getAll().then((res) => {      
      setUser(res);
    });
  };
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>();
  const deleteUser = async (id: number) => {
   const resp = await userService.deleteUser(id);
   if(resp) {
    toast.success("Deleted")
   }
   getUser()
  }
  useEffect(() => {
    getUser();
    if(!open){
      getUser();
      setSelectedUser(null)
    }
  }, []);

  return (
    <div>
      <div className="p-6 rounded-sm m-5">Users</div>
      <div className="bg-white rounded-md min-h-64 p-6 shadow-md">
        <div className="mb-3 ">
            <input placeholder="Search..." className="border border-slate-200 p-2 rounded-md hover:border-blue-400 focus:border-blue-400" />
            <Button sx={{backgroundColor: "blue",color: "white",float: "right"}}
            onClick={() => setOpen(true)}>New User <Add/></Button>
        </div>
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">User Name</th>
              <th className="px-4 py-3">Zan ID</th>
              <th className="px-4 py-3">PASSWORD</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {user?.map((res, index) => (
              <tr key={res.userId}>
                <td className="px-4 py-3">{1 + index} </td>
                <td className="px-4 py-3">{res.email}</td>
                <td className="px-4 py-3">{res.userName}</td>
                <td className="px-4 py-3">{res.zanId}</td>
                <td className="px-4 py-3">{res.password}</td>
                <td className="space-x-1.5">
                  <Button onClick={() =>{
                     setSelectedUser(res);
                     setOpen(true)
                     }}><Edit sx={{color: "blue"}} /> Edit</Button>
                  <Button onClick={()=> deleteUser(res.userId)}><Delete sx={{color: "red"}}/> Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CreateUser open={open} onOpenChange={()=> setOpen(false)} selectedUser={selectedUser!}/>
    </div>
  );
};

export default User;
