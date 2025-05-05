import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { cn } from "../../lib/utils";
import "./calender.css"; // create this CSS file for custom styling

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, ...props }: CalendarProps) {
  return (
    <div className={cn("p-3", className)}>
      <DayPicker
        {...props}
      />
    </div>
  );
}

Calendar.displayName = "Calendar";
export { Calendar };
