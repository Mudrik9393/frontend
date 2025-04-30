import { People, ReportProblem, Schedule } from '@mui/icons-material';

const Dashboard = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-2">ZAWA Performance Dashboard</h1>
      <p className="mb-6 text-gray-600">Real-time insights and analytics</p>

      {/* Summary Cards with Icons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-green-600 text-white p-6 rounded-xl shadow flex items-center">
          <div className="mr-4">
            <People fontSize="large" />
          </div>
          <div>
            <h2 className="text-sm font-medium">Registered Customers</h2>
            <p className="text-4xl font-bold">148</p>
            <p className="text-sm mt-1">Currently in the system</p>
          </div>
        </div>

        <div className="bg-yellow-500 text-white p-6 rounded-xl shadow flex items-center">
          <div className="mr-4">
            <ReportProblem fontSize="large" />
          </div>
          <div>
            <h2 className="text-sm font-medium">Complaints Received</h2>
            <p className="text-4xl font-bold">79</p>
            <p className="text-sm mt-1">Being processed</p>
          </div>
        </div>

        <div className="bg-red-600 text-white p-6 rounded-xl shadow flex items-center">
          <div className="mr-4">
            <Schedule fontSize="large" />
          </div>
          <div>
            <h2 className="text-sm font-medium">Requests Received</h2>
            <p className="text-4xl font-bold">41</p>
            <p className="text-sm mt-1">Need follow-up</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-2">Registered Customers</h2>
          <div className="h-40 bg-blue-100 rounded-md flex items-center justify-center text-blue-600">
            [Chart Placeholder]
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-2">Complaints Received</h2>
          <div className="h-40 bg-pink-100 rounded-md flex items-center justify-center text-pink-600">
            [Bar Chart Placeholder]
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-2">Requests Received</h2>
          <div className="h-40 bg-green-100 rounded-md flex items-center justify-center text-green-600">
            [Pie Chart Placeholder]
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
