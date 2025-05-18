import * as yup from "yup";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Input } from "../../components/form/Input";

const schema = yup.object({
  units: yup.number().default(0),
  price: yup.number().default(0),
  total: yup.number().default(0),
});
const Calculation = () => {
    const price = 2000
  const { control, handleSubmit, setValue, } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {price: price}
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };
  const units = useWatch({ control, name: "units" });

  const sum = () => {
    const total = price * units;
    setValue("total", total);
  };
  useEffect(()=> {
    sum()
  })
  return (
    <div className="mt-32">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-x-1.5">
        <Input
          control={control}
          type="number"
          name="units"
          placeholder="Units"
        />
        <Input
          control={control}
          type="number"
          name="price"
          disabled
        />
        <Input
          control={control}
          type="number"
          disabled
          name="total"
        />
            
        </div>
      </form>
    </div>
  );
};

export default Calculation;
