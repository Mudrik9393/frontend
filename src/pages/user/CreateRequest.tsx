import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import requestService from "../../services/request-service";
import { RequestResponse } from "../../types/request";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  selectedRequest: RequestResponse | null;
}

const CreateRequest: React.FC<Props> = ({ open, onClose, onSuccess, selectedRequest }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    requestName: "",
    date: "",
    accountNumber: "",
    message: "",
  });
  const [documentFile, setDocumentFile] = useState<File | null>(null);

  // Initialize form when selectedRequest changes
  useEffect(() => {
    if (selectedRequest) {
      setFormData({
        fullName: selectedRequest.fullName,
        phoneNumber: selectedRequest.phoneNumber,
        address: selectedRequest.address,
        requestName: selectedRequest.requestName,
        date: new Date(selectedRequest.date).toISOString().split('T')[0],
        accountNumber: selectedRequest.accountNumber,
        message: selectedRequest.message || "",
      });
    } else {
      // Reset form for new request
      setFormData({
        fullName: "",
        phoneNumber: "",
        address: "",
        requestName: "",
        date: "",
        accountNumber: "",
        message: "",
      });
      setDocumentFile(null);
    }
  }, [selectedRequest]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDocumentFile(e.target.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // Validate required fields
    const requiredFields = ['fullName', 'phoneNumber', 'address', 'requestName', 'date', 'accountNumber'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast.error(`Missing required fields: ${missingFields.join(', ')}`);
      return;
    }

    // For new requests, document is required
    if (!selectedRequest && !documentFile) {
      toast.error("Document is required for new requests");
      return;
    }

    const formDataObj = new FormData();
    
    // Append all form data
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value);
    });
    
    // Append document if it exists
    if (documentFile) {
      formDataObj.append("document", documentFile);
    }

    try {
      if (selectedRequest) {
        // Update existing request
        await requestService.update(selectedRequest.requestId, formDataObj);
        toast.success("Request updated successfully");
      } else {
        // Create new request
        await requestService.create(formDataObj);
        toast.success("Request created successfully");
      }

      onClose();
      onSuccess();
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || error.message || "Unknown error";
      console.error("Error processing request:", errorMsg);
      toast.error(`Failed: ${errorMsg}`);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{selectedRequest ? "Edit Request" : "New Request"}</DialogTitle>
      <DialogContent dividers>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, py: 1 }}>
          <TextField
            name="fullName"
            label="Full Name"
            fullWidth
            required
            value={formData.fullName}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          
          <TextField
            name="phoneNumber"
            label="Phone Number"
            fullWidth
            required
            value={formData.phoneNumber}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          
          <TextField
            name="address"
            label="Address"
            fullWidth
            required
            value={formData.address}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          
          <TextField
            name="requestName"
            label="Request Name"
            fullWidth
            required
            value={formData.requestName}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          
          <TextField
            name="date"
            label="Date"
            type="date"
            fullWidth
            required
            value={formData.date}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
          
          <TextField
            name="accountNumber"
            label="Account Number"
            fullWidth
            required
            value={formData.accountNumber}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          
          <TextField
            name="message"
            label="Message"
            fullWidth
            multiline
            rows={3}
            value={formData.message}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          
          <Box mt={2}>
            <Typography variant="subtitle2" gutterBottom>
              {selectedRequest?.document ? "Current Document" : "Upload Document"}
            </Typography>
            
            {selectedRequest?.document && (
              <Typography variant="body2" color="textSecondary" gutterBottom>
                <a 
                  href={`http://localhost:5555/uploads/${selectedRequest.document}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: 'inherit' }}
                >
                  {selectedRequest.document}
                </a>
              </Typography>
            )}
            
            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleFileChange}
            />
            
            {documentFile && (
              <Typography variant="body2" mt={1}>
                New file: {documentFile.name}
              </Typography>
            )}
            
            <Typography variant="caption" color="textSecondary">
              {selectedRequest ? "Upload a new file to replace existing document" : "Document is required"}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {selectedRequest ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRequest;