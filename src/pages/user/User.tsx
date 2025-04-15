import { useEffect, useState } from "react";
import userService from "../../services/user-service";
import { UserResponse } from "../../types/user";

const User = () => {
  const [user, setUser] = useState<UserResponse[]>();
  const getUser = () => {
    userService.getAll().then((res) => {
      setUser(res);
    });
  };

  useEffect(() => {
    getUser();
  }, [user]);
  return (
    <div>
      <div className="p-2 rounded-sm mb-3">Users</div>
      <div className="bg-white rounded-md min-h-64 p-4 shadow-md">
        <div className="mb-3">
            <input placeholder="Search..." className="border border-slate-200 p-2 rounded-md hover:border-blue-400 focus:border-blue-400" />
            <button className="bg-blue-600 p-1.5 text-white rounded-sm float-right mb-1.5">New user</button>
        </div>
        <table className="w-full border font-medium border-collapse border-slate-100">
          <thead>
            <tr className="bg-gray-100 p-4">
              <th className="p-1">#</th>
              <th>Email</th>
              <th>User Name</th>
              <th>Zan ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {user?.map((res, index) => (
              <tr key={res.id} className="border-b">
                <td>{1 + index} </td>
                <td>{res.email}</td>
                <td>{res.username}</td>
                <td>{res.zanId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
