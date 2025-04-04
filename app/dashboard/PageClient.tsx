"use client"
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const rentalData = [
  { month: "Jan", rentals: 120, revenue: 5000 },
  { month: "Feb", rentals: 150, revenue: 7000 },
  { month: "Mar", rentals: 180, revenue: 8500 },
  { month: "Apr", rentals: 210, revenue: 9000 },
  { month: "May", rentals: 170, revenue: 7500 },
  { month: "Jun", rentals: 220, revenue: 9500 },
];

const pieData = [
  { name: "Ekonomik", value: 400 },
  { name: "Orta Segment", value: 300 },
  { name: "Lüks", value: 200 },
  { name: "SUV", value: 100 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PageAdminStats = () => {
  return (
    <div style={{ display: "grid", gap: "20px", padding: "20px", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
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
      <Card>
        <CardContent>
          <Typography variant="h6">Araç Kategori Dağılımı</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default PageAdminStats;
