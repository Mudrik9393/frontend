import { useEffect, useState } from "react";
import complaintService from "../../services/complaint-service";
import { ComplaintResponse } from "../../types/complaint";
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
  useTheme
} from "@mui/material";
import { Add, Delete, Edit, Search } from "@mui/icons-material";
import CreateComplaint from "./CreateComplaint";
import toast from "react-hot-toast";

const Complaint = () => {
  const [complaints, setComplaints] = useState<ComplaintResponse[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<ComplaintResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useTheme();

  const getComplaints = () => {
    setLoading(true);
    complaintService.getAll()
      .then((res) => {
        setComplaints(res);
      })
      .catch(() => {
        toast.error("Failed to load complaints");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteComplaint = async (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this complaint?");
    if (!confirmed) return;
    
    try {
      const resp = await complaintService.deleteComplaint(id);
      if (resp) {
        toast.success("Complaint deleted successfully");
        getComplaints();
      }
    } catch (error) {
      toast.error("Failed to delete complaint");
    }
  };

  useEffect(() => {
    getComplaints();
  }, []);

  // Changed to search only by fullName
  const filteredComplaints = complaints.filter(complaint => 
    complaint.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Extracted table body content
  let tableBodyContent;
  
  if (loading) {
    tableBodyContent = (
      <TableRow>
        <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
          <CircularProgress />
          <Typography variant="body2" mt={2}>Loading complaints...</Typography>
        </TableCell>
      </TableRow>
    );
  } else if (filteredComplaints.length === 0) {
    tableBodyContent = (
      <TableRow>
        <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
          <Typography variant="body1">
            {searchTerm ? "No matching complaints found" : "No complaints available"}
          </Typography>
        </TableCell>
      </TableRow>
    );
  } else {
    tableBodyContent = filteredComplaints.map((complaint, index) => (
      <TableRow 
        key={complaint.id} 
        hover 
        sx={{ 
          '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover },
          '&:hover': { backgroundColor: theme.palette.action.selected }
        }}
      >
        <TableCell>{index + 1}</TableCell>
        <TableCell sx={{ fontWeight: 'medium' }}>{complaint.fullName}</TableCell>
        <TableCell sx={{ maxWidth: 200 }}>
          <Typography noWrap title={complaint.complaintName}>
            {complaint.complaintName}
          </Typography>
        </TableCell>
        <TableCell>{complaint.accountNumber}</TableCell>
        <TableCell>
          <Box>
            <Typography variant="body2">{complaint.street}</Typography>
            <Typography variant="body2" color="textSecondary">{complaint.district}</Typography>
          </Box>
        </TableCell>
        <TableCell>{complaint.phoneNumber}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>
          <Box display="flex" justifyContent="center" gap={1}>
            <Tooltip title="Edit complaint">
              <IconButton 
                color="primary" 
                size="small"
                onClick={() => {
                  setSelectedComplaint(complaint);
                  setOpen(true);
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Delete complaint">
              <IconButton 
                color="error" 
                size="small"
                onClick={() => deleteComplaint(complaint.id)}
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
        sx={{ backgroundColor: theme.palette.background.paper, p: 3, borderRadius: 2 }}
      >
        <Typography variant="h5" fontWeight="bold" color="primary">
          Complaint Management
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
              {filteredComplaints.length} complaint(s) found
            </Typography>
          </Box>
          
          {/* Moved button to this location */}
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<Add />}
            onClick={() => {
              setSelectedComplaint(null);
              setOpen(true);
            }}
          >
            New Complaint
          </Button>
        </Box>

        <TableContainer sx={{ maxHeight: 'calc(100vh - 220px)', minHeight: 300 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.grey[200] }}>#</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.grey[200] }}>Full Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.grey[200] }}>Complaint</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.grey[200] }}>Account #</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.grey[200] }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.grey[200] }}>Contact</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.grey[200], textAlign: 'center' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableBodyContent}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <CreateComplaint 
        open={open} 
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            setSelectedComplaint(null);
          }
        }}
        selectedComplaint={selectedComplaint}
        refreshComplaints={getComplaints}
      />
    </div>
  );
};

export default Complaint;