
const Dashboard = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
    <h1 className="text-3xl font-bold mb-2">ZAWA Performance Dashboard</h1>
    <p className="mb-6 text-gray-600">Real-time insights and analytics</p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Complaints Chart */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-2">Complaints Over Time</h2>
        <div className="h-40 bg-blue-100 rounded-md flex items-center justify-center text-blue-600">
          [Chart Placeholder]
        </div>
      </div>

      {/* Requests Chart */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-2">Requests by Category</h2>
        <div className="h-40 bg-pink-100 rounded-md flex items-center justify-center text-pink-600">
          [Bar Chart Placeholder]
        </div>
      </div>

      {/* Customer Visits Chart */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-2">Customer Visits</h2>
        <div className="h-40 bg-green-100 rounded-md flex items-center justify-center text-green-600">
          [Pie Chart Placeholder]
        </div>
      </div>
    </div>
  </div>
);
  
}

export default Dashboard
