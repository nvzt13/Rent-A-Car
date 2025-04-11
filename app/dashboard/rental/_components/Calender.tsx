import React, { useState } from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";

interface CalenderProps {
  busyDates: string[];
}

const Calender: React.FC<CalenderProps> = ({ busyDates }) => {
  // Use controlled state for DateCalendar
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs());

  return (
    <DateCalendar
      value={selectedDate}
      onChange={(newValue) => setSelectedDate(newValue ? dayjs(newValue) : null)}
    />
  );
};

export default Calender;
