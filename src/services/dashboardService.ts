import axios from 'axios';

const API_URL = 'http://localhost:5555/api/dashboard'; // Hakuna tena proxy
 

export interface DashboardData {
  totalUsers: number;
  recentUsers: number;
  totalRequests: number;
  pendingRequests: number;
  totalComplaints: number;
  recentComplaints: number;
  requestDistribution: DistributionItem[];
  complaintDistribution: DistributionItem[];
}

export interface DistributionItem {
  type: string;
  count: number;
}

export const fetchDashboardData = async (): Promise<DashboardData> => {
  try {
    const response = await axios.get<DashboardData>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};