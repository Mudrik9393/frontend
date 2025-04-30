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
      <div className="p-6 rounded-sm mb-5">Users</div>
      <div className="bg-white rounded-md min-h-64 p-6 shadow-md">
        <div className="mb-3 ">
            <input placeholder="Search..." className="border border-slate-200 p-2 rounded-md hover:border-blue-400 focus:border-blue-400" />
            <button className="bg-blue-600 p-1.5 text-white rounded-sm float-right mb-1.5">New user</button>
        </div>
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">User Name</th>
              <th className="px-4 py-3">Zan ID</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {user?.map((res, index) => (
              <tr key={res.id}>
                <td className="px-4 py-3">{1 + index} </td>
                <td className="px-4 py-3">{res.email}</td>
                <td className="px-4 py-3">{res.username}</td>
                <td className="px-4 py-3">{res.zanId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
