'use client';
import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/tr'; // Türkçe desteği
dayjs.locale('tr'); // varsayılan dil

import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarProps } from '@mui/x-date-pickers/internals';

interface CalendarProps {
  busyDates: string[];
}

export default function Calender({ busyDates }: CalendarProps) {
  const [value, setValue] = useState<Dayjs>(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
      <DemoContainer components={['DateCalendar']}>
        <DemoItem>
          <DateCalendar
            value={value}
            onChange={(newValue) => setValue(newValue!)}
            readOnly
            slotProps={{
              day: (ownerState: DayCalendarProps<dayjs.Dayjs> & { day: dayjs.Dayjs; selected: boolean }) => {
                const dateStr = ownerState.day.format("YYYY-MM-DD");
                const isBusy = busyDates.includes(dateStr);
                const isToday = ownerState.day.isSame(dayjs(), 'day');

                return {
                  sx: {
                    backgroundColor: isBusy ? "#f44336" : undefined,
                    color: isBusy ? "white" : undefined,
                    border: isToday && isBusy ? "2px solid #f44336" : undefined,
                    "&.Mui-selected": {
                      backgroundColor: isBusy ? "#f44336 !important" : undefined,
                      color: isBusy ? "white" : undefined,
                    },
                    "&.MuiPickersDay-today": {
                      border: isBusy ? "2px solid #f44336" : "2px solid #1976d2",
                    },
                    "&:hover": {
                      backgroundColor: isBusy ? "#d32f2f" : undefined,
                    },
                  },
                };
              },
            }}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
