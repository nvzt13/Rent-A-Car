import * as React from "react";
import { Rental } from "@prisma/client";
import { Box, Typography } from "@mui/material";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import { useState, useEffect } from "react";
import "react-date-range/dist/styles.css"; // stil dosyasını dahil et
import "react-date-range/dist/theme/default.css"; // tema stil dosyasını dahil et

type Props = {
  rental: Rental | null;
};

type SelectionRange = {
  startDate: Date;
  endDate: Date;
  key: string;
};

export default function DateInput({ rental }: Props) {
  const [state, setState] = useState<SelectionRange[]>([
    {
      startDate: rental ? new Date(rental.rentalDate) : new Date(),
      endDate: rental ? new Date(rental.returnDate) : new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    if (rental) {
      setState([
        {
          startDate: new Date(rental.rentalDate),
          endDate: new Date(rental.returnDate),
          key: "selection",
        },
      ]);
    }
  }, [rental]); // rental değiştiğinde state güncellenir.

  if (!rental) return null;

  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      <Typography variant="h6" align="center" gutterBottom>
        Alış ve Teslim Tarihi
      </Typography>
      <Box sx={{ width: "100%" }}>
        <DateRangePicker
          ranges={state}
          onChange={(item: RangeKeyDict) =>
            setState([
              {
                startDate: item.selection.startDate || new Date(),
                endDate: item.selection.endDate || new Date(),
                key: item.selection.key || "selection",
              },
            ])
          }
          months={1}  // Only one month is shown
          direction="horizontal"
          moveRangeOnFirstSelection={false}
          staticRanges={[]}  // Removed extra static ranges
          inputRanges={[]}   // Removed input ranges
        />
      </Box>
    </Box>
  );
}