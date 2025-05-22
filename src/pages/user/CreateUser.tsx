import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { UserResponse } from "../../types/user";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import userService from "../../services/user-service";
import toast from "react-hot-toast";

const schema = yup.object({
  userName: yup.string().required("Required"),
  email: yup.string().email("Email"),
  zanId: yup.string().max(9).min(9),
  password: yup.string().required("Required"),
});

type UserSubmit = yup.InferType<yup.Schema>;
type Props = {
  open: boolean;
  onOpenChange: Function;
  selectedUser: UserResponse;
};
const CreateUser = ({ open, ...props }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isLoading, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  if (props.selectedUser) {
    setValue("email", props.selectedUser.email);
    setValue("password", props.selectedUser.password);
    setValue("zanId", props.selectedUser.zanId);
    setValue("userName", props.selectedUser.userName);
  }

  const onClose = () => {
    reset({ email: "", password: "", userName: "", zanId: "" });
    props.onOpenChange?.(false);
  };
 const onSubmit = (data: UserSubmit) => {
    props.selectedUser
      ? userService.updateUser(data, props.selectedUser.userId ?? 0)
      : userService.createUser(data);
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
                placeholder="Email"
                variant="filled"
                {...register("email")}
              />
              <span className="text-red-500">{errors?.email?.message}</span>
            </div>
            <div>
              <TextField
                placeholder="userName"
                variant="filled"
                {...register("userName")}
              />
              <span className="text-red-500">{errors.userName?.message}</span>
            </div>
          </Box>
          <div className="grid grid-cols-2 gap-2 mb-1.5">
            <div>
              <TextField
                placeholder="zanId"
                variant="filled"
                {...register("zanId")}
              />
              <span className="text-red-500">{errors.zanId?.message}</span>
            </div>
            <div>
              <TextField
                placeholder="Password"
                type="password"
                variant="filled"
                {...register("password")}
              />
              <span className="text-red-500">{errors.password?.message}</span>
            </div>
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

export default CreateUser;
