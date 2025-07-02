import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { ComplaintResponse } from "../../types/complaint";
import complaintService from "../../services/complaint-service";

const schema = yup.object({
  fullName: yup.string().required("Required"),
  complaintName: yup.string().required("Required"),
  accountNumber: yup.string().required("Required"),
  street: yup.string().required("Required"),
  district: yup.string().required("Required"),
  phoneNumber: yup.string().required("Required"),
});

type ComplaintSubmit = yup.InferType<typeof schema>;
type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedComplaint?: ComplaintResponse | null;
  refreshComplaints: () => void;
};

const CreateComplaint = ({ open, onOpenChange, selectedComplaint, refreshComplaints }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ComplaintSubmit>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (selectedComplaint) {
      setValue("fullName", selectedComplaint.fullName);
      setValue("complaintName", selectedComplaint.complaintName);
      setValue("accountNumber", selectedComplaint.accountNumber);
      setValue("street", selectedComplaint.street);
      setValue("district", selectedComplaint.district);
      setValue("phoneNumber", selectedComplaint.phoneNumber);
    } else {
      reset();
    }
  }, [selectedComplaint, setValue, reset]);

  const onClose = () => {
    reset();
    onOpenChange(false);
  };

  const onSubmit = async (data: ComplaintSubmit) => {
    try {
      if (selectedComplaint) {
        await complaintService.update(data, selectedComplaint.id);
        toast.success("Complaint updated successfully");
      } else {
        await complaintService.createComplaint(data);
        toast.success("Complaint created successfully");
      }
      refreshComplaints();
      onClose();
    } catch (error) {
      toast.error("Operation failed. Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{selectedComplaint ? "Edit Complaint" : "New Complaint"}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Box className="grid grid-cols-2 gap-4 mb-4 mt-2">
            <div>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
                {...register("fullName")}
              />
            </div>
            <div>
              <TextField
                label="Complaint Name"
                variant="outlined"
                fullWidth
                error={!!errors.complaintName}
                helperText={errors.complaintName?.message}
                {...register("complaintName")}
              />
            </div>
            <div>
              <TextField
                label="Account Number"
                variant="outlined"
                fullWidth
                error={!!errors.accountNumber}
                helperText={errors.accountNumber?.message}
                {...register("accountNumber")}
              />
            </div>
            <div>
              <TextField
                label="Street"
                variant="outlined"
                fullWidth
                error={!!errors.street}
                helperText={errors.street?.message}
                {...register("street")}
              />
            </div>
            <div>
              <TextField
                label="District"
                variant="outlined"
                fullWidth
                error={!!errors.district}
                helperText={errors.district?.message}
                {...register("district")}
              />
            </div>
            <div>
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
                {...register("phoneNumber")}
              />
            </div>
          </Box>

          <DialogActions sx={{ px: 0 }}>
            <Button
              variant="outlined"
              color="error"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateComplaint;