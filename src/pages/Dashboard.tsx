import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, Typography, Box,
  CircularProgress, LinearProgress, Paper, Stack
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import RequestIcon from '@mui/icons-material/Description';
import ComplaintIcon from '@mui/icons-material/ReportProblem';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import { fetchDashboardData, DashboardData } from '../services/dashboardService';

ChartJS.register(ArcElement, Tooltip, Legend);

const styles = {
  dashboardContainer: {
    padding: '20px',
    maxWidth: '1400px',
    margin: '0 auto'
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  chartContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '20px',
    flexWrap: 'wrap',
    marginTop: '20px'
  },
  card: {
    height: '100%',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 6px 16px rgba(0,0,0,0.15)'
    }
  }
};

const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const dashboardData = await fetchDashboardData();
        setData(dashboardData);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" p={4}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box textAlign="center" p={4}>
        <Typography variant="h6">No data available</Typography>
      </Box>
    );
  }

  const requestChartData = {
    labels: data.requestDistribution?.map(item => item.type) || [],
    datasets: [{
      data: data.requestDistribution?.map(item => item.count) || [],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      borderWidth: 1,
    }]
  };

  const complaintChartData = {
    labels: data.complaintDistribution?.map(item => item.type) || [],
    datasets: [{
      data: data.complaintDistribution?.map(item => item.count) || [],
      backgroundColor: ['#FF9F40', '#83E8FF', '#FFD700', '#98FB98', '#D8BFD8', '#FF6347'],
      borderWidth: 1,
    }]
  };

  const chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            size: 13
          }
        }
      }
    }
  };

  return (
    <Box sx={styles.dashboardContainer}>
      <Typography variant="h4" component="h1" gutterBottom sx={{
        fontWeight: 700,
        mb: 4,
        color: 'primary.main',
        textAlign: 'center'
      }}>
        System Dashboard
      </Typography>

      {/* Stats Cards */}
      <Box sx={styles.statsContainer}>
        <Card sx={styles.card}>
          <CardContent>
            <Stack direction="row" alignItems="center" mb={2}>
              <PeopleIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
              <Typography variant="h5" fontWeight="600">Users</Typography>
            </Stack>
            <Typography variant="h3" fontWeight="700" mb={1}>
              {data.totalUsers || 0}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="body2" color="text.secondary">Recent users:</Typography>
              <Typography variant="body2" fontWeight="600" color="success.main">
                +{data.recentUsers || 0}
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card sx={styles.card}>
          <CardContent>
            <Stack direction="row" alignItems="center" mb={2}>
              <RequestIcon sx={{ fontSize: 40, color: 'secondary.main', mr: 2 }} />
              <Typography variant="h5" fontWeight="600">Requests</Typography>
            </Stack>
            <Typography variant="h3" fontWeight="700" mb={1}>
              {data.totalRequests || 0}
            </Typography>
            <Box mb={1}>
              <Typography variant="body2" color="text.secondary" mb={0.5}>
                Pending: {data.pendingRequests || 0}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(data.pendingRequests / (data.totalRequests || 1)) * 100 || 0}
                sx={{ height: 8, borderRadius: 4 }}
                color="warning"
              />
            </Box>
          </CardContent>
        </Card>

        <Card sx={styles.card}>
          <CardContent>
            <Stack direction="row" alignItems="center" mb={2}>
              <ComplaintIcon sx={{ fontSize: 40, color: 'error.main', mr: 2 }} />
              <Typography variant="h5" fontWeight="600">Complaints</Typography>
            </Stack>
            <Typography variant="h3" fontWeight="700" mb={1}>
              {data.totalComplaints || 0}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="body2" color="text.secondary">Recent complaints:</Typography>
              <Typography variant="body2" fontWeight="600" color="error.main">
                {data.recentComplaints || 0}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* Charts */}
      <Box sx={styles.chartContainer}>
        <Paper elevation={3} sx={{ borderRadius: 3, p: 2, flex: '1 1 45%' }}>
          <Typography variant="h6" fontWeight="600" mb={2} textAlign="center">
            Request Distribution
          </Typography>
          <Box sx={{ height: 300, position: 'relative' }}>
            {requestChartData.labels.length > 0 ? (
              <Pie data={requestChartData} options={chartOptions} />
            ) : (
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <Typography>No request data available</Typography>
              </Box>
            )}
          </Box>
        </Paper>

        <Paper elevation={3} sx={{ borderRadius: 3, p: 2, flex: '1 1 45%' }}>
          <Typography variant="h6" fontWeight="600" mb={2} textAlign="center">
            Complaint Distribution
          </Typography>
          <Box sx={{ height: 300, position: 'relative' }}>
            {complaintChartData.labels.length > 0 ? (
              <Pie data={complaintChartData} options={chartOptions} />
            ) : (
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <Typography>No complaint data available</Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
