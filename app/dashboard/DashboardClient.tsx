"use client";
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, LineChart, Line,
  PieChart, Pie, Cell
} from "recharts";
import { useAppSelector } from "@/lib/hooks";
import { Legend } from "recharts"; 
const rentalData = [
  { month: "Jan", rentals: 10, revenue: 50 },
  { month: "Feb", rentals: 150, revenue: 7000 },
  { month: "Mar", rentals: 180, revenue: 8500 },
  { month: "Apr", rentals: 210, revenue: 9000 },
  { month: "May", rentals: 170, revenue: 7500 },
  { month: "Jun", rentals: 220, revenue: 9500 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const DashboardClient = () => {
  const cars = useAppSelector((state) => state.cars.cars);

  const suvCount = cars.filter((car) => car.carType === "Suv").length;
  const premiumCount = cars.filter((car) => car.carType === "Premium").length;
  const ekonomiCount = cars.filter((car) => car.carType === "Ekonomi").length;

  const pieData = [
    { name: "Ekonomi", value: ekonomiCount },
    { name: "Premium", value: premiumCount },
    { name: "Suv", value: suvCount },
  ];

  return (
    <div style={{ gap: "20px", padding: "20px", maxWidth: "980px", margin: "auto" }}>
      <Card>
        <CardContent>
          <Typography variant="h6">Araç Kategori Dağılımı</Typography>
         <ResponsiveContainer width="100%" height={300}>
  <PieChart>
<Pie
  data={pieData}
  dataKey="value"
  nameKey="name"
  cx="50%"
  cy="50%"
  outerRadius={100}
  fill="#8884d8"
  label
  isAnimationActive={false}
>
      {pieData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend layout="horizontal" verticalAlign="bottom" align="center" />
  </PieChart>
</ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">Araç Kiralama Sayıları</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={rentalData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="rentals" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">Aylık Gelir</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={rentalData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardClient;