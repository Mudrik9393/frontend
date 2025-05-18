import { Control, Controller, useController } from "react-hook-form";

type Props = React.ComponentProps<"input"> & {
  name: string;
  control: Control<any>;
};
export const Input = ({ name, control, ...props }: Props) => {
  const { field } = useController({ control, name });
  return (
    <Controller
      name={name}
      control={control}
      render={() => {
        return (
            <input {...props} {...field}  className="border p-2 rounded-md"/>
        );
      }}
    />
  );
};
