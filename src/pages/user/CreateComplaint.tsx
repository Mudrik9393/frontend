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

import toast from "react-hot-toast";
import { ComplaintResponse } from "../../types/complaint";
import complaintService from "../../services/complaint-service";

const schema = yup.object({
  ComplaintName: yup.string().required("Required"),
  street: yup.string().required("Required"),
});

type ComplaintSubmit = yup.InferType<yup.Schema>;
type Props = {
  open: boolean;
  onOpenChange: Function;
  selectedComplaint: ComplaintResponse;
};
const CreateComplaint = ({ open, ...props }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isLoading, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  if (props.selectedComplaint) {
    setValue("ComplaintName", props.selectedComplaint.complaintName);
    setValue("street", props.selectedComplaint.street);
  }

  const onClose = () => {
    // reset({ email: "", password: "", userName: "", zanId: "" });
    props.onOpenChange?.(false);
  };
  const onSubmit = (data: ComplaintSubmit) => {
    complaintService.createComplaint(data);
    isSubmitSuccessful && toast.success("Success");
    onClose();
  };

  return (
    <Dialog open={open} {...props}>
      <DialogTitle>New User</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="grid grid-cols-2 gap-2 mb-1.5">
            <div>
              <TextField
                placeholder="ComplaintName"
                variant="filled"
                {...register("ComplaintName")}
              />
              <span className="text-red-500">{errors?.ComplaintName?.message}</span>
            </div>
            <div>
              <TextField
                placeholder="street"
                variant="filled"
                {...register("street")}
              />
              <span className="text-red-500">{errors.street?.message}</span>
            </div>
          </Box>
          <div className="grid grid-cols-2 gap-2 mb-1.5">
            
            
          </div>

          <DialogActions>
            <Button
              sx={{ backgroundColor: "red", color: "white" }}
              onClick={() => onClose()}
            >
              Close
            </Button>
            <Button
              type="submit"
              sx={{ backgroundColor: "blue", color: "white" }}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateComplaint;

