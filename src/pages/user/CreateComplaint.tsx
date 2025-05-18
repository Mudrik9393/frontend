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
  fullName: yup.string().required("Required"),
  complaintName: yup.string().required("Required"),
  accountNumber: yup.string().required("Required"),
  street: yup.string().required("Required"),
  district: yup.string().required("Required"),
  phoneNumber: yup.string().required("Required"),
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
    setValue("fullName", props.selectedComplaint.fullName);
    setValue("complaintName", props.selectedComplaint.complaintName);
    setValue("accountNumber", props.selectedComplaint.accountNumber);
    setValue("street", props.selectedComplaint.street);
    setValue("district", props.selectedComplaint.district);
    setValue("phoneNumber", props.selectedComplaint.phoneNumber);
  }

  const onClose = () => {
    reset({
      fullName: "",
      complaintName: "",
      accountNumber: "",
      street: "",
      district: "",
      phoneNumber: "",
    });
    props.onOpenChange?.(false);
  };
  const onSubmit = (data: ComplaintSubmit) => {
    props.selectedComplaint
      ? complaintService.update(data, props.selectedComplaint.id ?? 0)
      : complaintService.createComplaint(data);
    isSubmitSuccessful && toast.success("Success");
    onClose();
  };

  return (
    <Dialog open={open} {...props}>
      <DialogTitle>New Complaint</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="grid grid-cols-2 gap-2 mb-1.5">
            <div>
              <TextField
                placeholder="fullName"
                variant="filled"
                {...register("fullName")}
              />
              <span className="text-red-500">{errors?.fullName?.message}</span>
            </div>
            <div>
              <TextField
                placeholder="ComplaintName"
                variant="filled"
                {...register("complaintName")}
              />
              <span className="text-red-500">
                {errors?.complaintName?.message}
              </span>
            </div>
            <div>
              <TextField
                placeholder="accountNumber"
                variant="filled"
                {...register("accountNumber")}
              />
              <span className="text-red-500">
                {errors?.accountNumber?.message}
              </span>
            </div>
            <div>
              <TextField
                placeholder="street"
                variant="filled"
                {...register("street")}
              />
              <span className="text-red-500">{errors.street?.message}</span>
            </div>
            <div>
              <TextField
                placeholder="district"
                variant="filled"
                {...register("district")}
              />
              <span className="text-red-500">{errors?.district?.message}</span>
            </div>
            <div>
              <TextField
                placeholder="phoneNumber"
                variant="filled"
                {...register("phoneNumber")}
              />
              <span className="text-red-500">
                {errors?.phoneNumber?.message}
              </span>
            </div>
          </Box>
          <div className="grid grid-cols-2 gap-2 mb-1.5"></div>

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
