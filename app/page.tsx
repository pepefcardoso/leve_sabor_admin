import { txtColors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import clsx from "clsx";

export default function Page() {
  return (
    <div>
      <h1 className={clsx(Typography.Display, txtColors.gray500)}>Page</h1>
    </div>
  );
}
