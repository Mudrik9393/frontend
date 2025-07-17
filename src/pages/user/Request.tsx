import { useEffect, useState } from "react";
import requestService from "../../services/request-service";
import { RequestResponse } from "../../types/request";
import { 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton, 
  Tooltip,
  Box,
  TextField,
  CircularProgress,
  Typography,
  useTheme,
  Link
} from "@mui/material";
import { Add, Delete, Edit, Search } from "@mui/icons-material";
import toast from "react-hot-toast";
import CreateRequest from "./CreateRequest";

const Request = () => {
  const [requests, setRequests] = useState<RequestResponse[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<RequestResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useTheme();

  const getRequests = () => {
    setLoading(true);
    requestService.getAll()
      .then((res) => {
        setRequests(res);
      })
      .catch(() => {
        toast.error("Failed to fetch requests");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteRequest = async (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this request?");
    if (!confirmed) return;
    
    try {
      await requestService.deleteRequest(id);
      toast.success("Request deleted successfully");
      getRequests();
    } catch {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  // Fixed search with null check
  const filteredRequests = requests.filter(request => {
    const fullName = request.fullName || ""; // Handle null/undefined values
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Extracted table body content
  let tableBodyContent;
  
  if (loading) {
    tableBodyContent = (
      <TableRow>
        <TableCell colSpan={10} align="center" sx={{ py: 5 }}>
          <CircularProgress />
          <Typography variant="body2" mt={2}>Loading requests...</Typography>
        </TableCell>
      </TableRow>
    );
  } else if (filteredRequests.length === 0) {
    tableBodyContent = (
      <TableRow>
        <TableCell colSpan={10} align="center" sx={{ py: 5 }}>
          <Typography variant="body1">
            {searchTerm ? "No matching requests found" : "No requests available"}
          </Typography>
        </TableCell>
      </TableRow>
    );
  } else {
    tableBodyContent = filteredRequests.map((request, index) => (
      <TableRow 
        key={request.requestId} 
        hover 
        sx={{ 
          '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover },
          '&:hover': { backgroundColor: theme.palette.action.selected }
        }}
      >
        <TableCell>{index + 1}</TableCell>
        <TableCell sx={{ fontWeight: 'medium' }}>{request.fullName || "-"}</TableCell>
        <TableCell>{request.phoneNumber}</TableCell>
        <TableCell>
          <Typography variant="body2">{request.address}</Typography>
        </TableCell>
        <TableCell sx={{ maxWidth: 150 }}>
          <Typography noWrap title={request.requestName}>
            {request.requestName}
          </Typography>
        </TableCell>
        <TableCell>
          {request.document ? (
            <Link 
              href={`http://localhost:5555/uploads/${request.document}`} 
              target="_blank" 
              rel="noopener noreferrer"
              color="primary"
              underline="hover"
            >
              View Document
            </Link>
          ) : (
            <Typography variant="body2" color="textSecondary">-</Typography>
          )}
        </TableCell>
        <TableCell>{new Date(request.date).toLocaleDateString()}</TableCell>
        <TableCell>{request.accountNumber}</TableCell>
        <TableCell sx={{ maxWidth: 200 }}>
          <Typography 
            noWrap 
            title={request.message || ""}
            color={request.message ? "inherit" : "textSecondary"}
          >
            {request.message || "-"}
          </Typography>
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>
          <Box display="flex" justifyContent="center" gap={1}>
            <Tooltip title="Edit request">
              <IconButton 
                color="primary" 
                size="small"
                onClick={() => {
                  setSelectedRequest(request);
                  setOpen(true);
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Delete request">
              <IconButton 
                color="error" 
                size="small"
                onClick={() => deleteRequest(request.requestId)}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </TableCell>
      </TableRow>
    ));
  }

  return (
    <div className="p-4">
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        mb={3}
        sx={{ backgroundColor: theme.palette.background.paper, p: 5, borderRadius: 2 }}
      >
        <Typography variant="h5" fontWeight="bold" color="primary">
          Request Management
        </Typography>
      </Box>

      <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          p={2}
          bgcolor={theme.palette.grey[100]}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <TextField
              placeholder="Search by Full Name..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search fontSize="small" color="action" sx={{ mr: 1 }} />,
              }}
              sx={{ width: 300, backgroundColor: 'white' }}
            />
            
            <Typography variant="body2" color="textSecondary">
              {filteredRequests.length} request(s) found
            </Typography>
          </Box>
          
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<Add />}
            onClick={() => {
              setSelectedRequest(null);
              setOpen(true);
            }}
          >
            New Request
          </Button>
        </Box>

        <TableContainer sx={{ maxHeight: 'calc(100vh - 220px)', minHeight: 300 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.grey[200] }}>#</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.grey[200] }}>Full Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.grey[200] }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.grey[200] }}>Address</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.grey[200] }}>Request</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.grey[200] }}>Document</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.grey[200] }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.grey[200] }}>Account #</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.grey[200] }}>Message</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.grey[200], textAlign: 'center' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableBodyContent}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <CreateRequest
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedRequest(null);
        }}
        onSuccess={getRequests}
        selectedRequest={selectedRequest}
      />
    </div>
  );
};

export default Request;