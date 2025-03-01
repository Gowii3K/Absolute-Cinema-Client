import { SubmitHandler, useForm } from "react-hook-form";
import { SubmitButton } from "./SubmitButton";

export const DateSelector = ({onSubmit}:{onSubmit:SubmitHandler<{date:string}>}) => {
  const { register, handleSubmit } = useForm<{ date: string }>();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("date")} type="date" />
      <SubmitButton type="submit" children="This date"/>
    </form>
  );
};
