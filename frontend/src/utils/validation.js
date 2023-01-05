import * as Yup from "yup";
import dayjs from "dayjs";

export const validationSchema = Yup.object({
  task: Yup.string()
    .required("Task is required!")
    .min(5, "Task must be at least 6 characters")
    .max(120, "Task must not exceed 20 characters"),
  deadline: Yup.date()
    .transform(parseDateString)
    .nullable()
    .typeError("Invalid date")
    .min(
      dayjs().startOf("D").add(1, "day"),
      "Task must not be less than today!"
    )
    .required("Deadline is required!"),
});
function parseDateString(value, originalValue) {
  const parsedDate = dayjs.isDayjs(originalValue)
    ? originalValue
    : dayjs(originalValue, "DD-MM-YYYY");

  return parsedDate?.$d;
}
