import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import requestService from "../../services/request-service";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateRequest: React.FC<Props> = ({ open, onClose, onSuccess }) => {
  const [requestName, setRequestName] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [documentFile, setDocumentFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDocumentFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!requestName || !date || !documentFile) {
      toast.error("Please fill in all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("requestName", requestName);
    formData.append("date", date);
    formData.append("message", message || "");
    formData.append("document", documentFile);

    try {
      await requestService.create(formData);
      toast.success("Request created successfully");

      // Reset form
      setRequestName("");
      setDate("");
      setMessage("");
      setDocumentFile(null);

      onClose();
      onSuccess();
    } catch (error: any) {
      const errorMsg = error?.response?.data || error.message || "Unknown error";
      console.error("Error creating request:", errorMsg);
      toast.error("Failed to create request");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>New Request</DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Request Name"
          fullWidth
          required
          value={requestName}
          onChange={(e) => setRequestName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Date"
          type="date"
          fullWidth
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Message"
          fullWidth
          multiline
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          margin="normal"
        />
        <input
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.png"
          onChange={handleFileChange}
          style={{ marginTop: 16 }}
        />
        {documentFile && <p>Selected file: {documentFile.name}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRequest;
