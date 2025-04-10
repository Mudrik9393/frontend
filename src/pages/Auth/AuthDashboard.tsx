import { Outlet } from "react-router-dom"

const AuthDashboard = () => {
  return (
    <div>
        <div className="bg-slate-400">
            zanzibar water Authority
        </div>
    <div className="grid grid-cols-2">
      <div>
        Side
      </div>
      <Outlet/>
    </div>
    </div>
  )
}

export default AuthDashboard
