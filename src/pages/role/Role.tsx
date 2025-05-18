import { useEffect, useState } from "react";
import { RoleResponse } from "../../types/role";
import roleService from "../../services/role-service";

const Role = () => {
  const [role, setRole] = useState<RoleResponse[]>([]);
  const getRoles = () => {
    roleService.getAll().then((res) => {
      setRole(res);
    });
  };

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <div>
      <table className="table table-auto ">
        <thead>
          <tr className="border">
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {role.map((res, index) => (
            <tr key={res.id}>
              <td>{index + 1}</td>
              <td>{res.name}</td>
              <td>{res.roleStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Role;
