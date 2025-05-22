import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Button,
  Divider,
  Autocomplete,
} from "@mui/material";
import axios from "axios";

const districts = [
  {
    name: "Wilaya A",
    wards: [{ name: "Shehia A1", streets: ["Mtaa A1-1", "Mtaa A1-2"] }],
  },
  {
    name: "Wilaya B",
    wards: [{ name: "Shehia B1", streets: ["Mtaa B1-1", "Mtaa B1-2"] }],
  },
];

const pricePerUnit = 2000;

const schema = yup.object({
  district: yup.string().required("District is required"),
  ward: yup.string().required("Ward is required"),
  street: yup.string().required("Street is required"),
  userName: yup.string().required("Username is required"),
  userId: yup.number().required("User ID is required"),
  units: yup.number().required("Units required").min(0),
  total: yup.number().required(),
});

const Calculation = () => {
  const [wards, setWards] = useState<string[]>([]);
  const [streets, setStreets] = useState<string[]>([]);
  const [userOptions, setUserOptions] = useState([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      district: "",
      ward: "",
      street: "",
      userName: "",
      userId: undefined,
      units: 0,
      total: 0,
    },
  });

  const district = watch("district");
  const ward = watch("ward");
  const units = useWatch({ control, name: "units" }) || 0;

  // Calculate total on units change
  useEffect(() => {
    setValue("total", units * pricePerUnit);
  }, [units, setValue]);

  // Load wards and streets on district/ward change
  useEffect(() => {
    const selected = districts.find((d) => d.name === district);
    setWards(selected?.wards.map((w) => w.name) || []);
    setValue("ward", "");
    setValue("street", "");
    setStreets([]);
  }, [district, setValue]);

  useEffect(() => {
    const selectedDistrict = districts.find((d) => d.name === district);
    const selectedWard = selectedDistrict?.wards.find((w) => w.name === ward);
    setStreets(selectedWard?.streets || []);
    setValue("street", "");
  }, [ward, district, setValue]);

  // Search API for user
  const handleUserSearch = async (value: string) => {
    if (!value) return;
    try {
      const res = await axios.get(`/api/users/search?userName=${value}`);
      setUserOptions(res.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    // submit to backend here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardContent className="p-6">
          <Typography variant="h5" className="text-center font-semibold mb-6">
            Meter Reader Billing Form
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Location Section */}
            <div>
              <Typography variant="subtitle1" className="mb-2 font-medium">
                Location Details
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TextField
                  select
                  fullWidth
                  label="Wilaya (District)"
                  {...register("district")}
                  error={!!errors.district}
                  helperText={errors.district?.message}
                >
                  {districts.map((d) => (
                    <MenuItem key={d.name} value={d.name}>
                      {d.name}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  fullWidth
                  label="Shehia (Ward)"
                  {...register("ward")}
                  disabled={!wards.length}
                  error={!!errors.ward}
                  helperText={errors.ward?.message}
                >
                  {wards.map((w) => (
                    <MenuItem key={w} value={w}>
                      {w}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  fullWidth
                  label="Mtaa (Street)"
                  {...register("street")}
                  disabled={!streets.length}
                  error={!!errors.street}
                  helperText={errors.street?.message}
                >
                  {streets.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>

            <Divider />

            {/* User Info */}
            <div>
              <Typography variant="subtitle1" className="mb-2 font-medium">
                User Information
              </Typography>
              <Autocomplete
                options={userOptions}
                getOptionLabel={(option: any) => option.name}
                onInputChange={(event, value) => handleUserSearch(value)}
                onChange={(event, value) => {
                  setSelectedUser(value);
                  setValue("userName", value?.name || "");
                  setValue("userId", value?.id || undefined);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search User by Name"
                    placeholder="Type to search..."
                    error={!!errors.userName}
                    helperText={errors.userName?.message}
                  />
                )}
              />
            </div>

            <Divider />

            {/* Billing */}
            <div>
              <Typography variant="subtitle1" className="mb-2 font-medium">
                Billing Details
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TextField
                  type="number"
                  fullWidth
                  label="Units Used"
                  {...register("units")}
                  error={!!errors.units}
                  helperText={errors.units?.message}
                />
                <TextField
                  fullWidth
                  label="Price per Unit"
                  value={pricePerUnit}
                  disabled
                />
                <TextField
                  fullWidth
                  label="Total Bill"
                  value={units * pricePerUnit}
                  disabled
                />
              </div>
            </div>

            <div className="text-center pt-4">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="w-full md:w-1/2"
              >
                Submit Bill
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calculation;
