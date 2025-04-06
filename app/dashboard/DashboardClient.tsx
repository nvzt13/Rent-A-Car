"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import { useAppSelector } from "@/lib/hooks";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

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

  const [rentalData, setRentalData] = useState<
    { month: string; revenue: number; rentals: number }[]
  >([]);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const res = await fetch("/api/v1/statistics");
        const data = await res.json();
        const formatted = data.data.map((item: any) => ({
          month: `${item.month} ${item.year}`,
          revenue: item.totalIncome,
          rentals: item.totalRentals,
        }));
        setRentalData(formatted);
      } catch (err) {
        console.error("İstatistik verisi alınamadı:", err);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gap: "20px",
        padding: "20px",
        maxWidth: "1280px",
        margin: "auto",
      }}
    >
      {/* İstatistik Kartları */}
      <Grid container spacing={2}>
        {/* Aylık Ziyaretçi */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography variant="subtitle2" color="textSecondary">
              Aylık Ziyaretçi
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
              <Typography variant="h5" fontWeight="bold">1.240</Typography>
              <PeopleAltRoundedIcon color="primary" />
            </Box>
          </Card>
        </Grid>

        {/* Toplam Araba */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography variant="subtitle2" color="textSecondary">
              Toplam Araba
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
              <Typography variant="h5" fontWeight="bold">{cars.length}</Typography>
              <DirectionsCarRoundedIcon sx={{ color: "#1976d2" }} />
            </Box>
          </Card>
        </Grid>

        {/* Toplam Randevu */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography variant="subtitle2" color="textSecondary">
              Toplam Randevu
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
              <Typography variant="h5" fontWeight="bold">350</Typography>
              <CalendarMonthRoundedIcon sx={{ color: "#0288d1" }} />
            </Box>
          </Card>
        </Grid>

        {/* Toplam Gelir */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography variant="subtitle2" color="textSecondary">
              Toplam Gelir
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
              <Typography variant="h5" fontWeight="bold">₺125.000</Typography>
              <MonetizationOnRoundedIcon sx={{ color: "#43a047" }} />
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Araç Kiralama Sayıları Grafiği */}
      <Card style={{ width: "100%" }}>
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

      {/* Kategori Dağılımı + Aylık Gelir */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "20px",
          }}
        >
          <div style={{ display: "grid", gap: "20px" }}>
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
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                      layout="horizontal"
                      verticalAlign="bottom"
                      align="center"
                    />
                  </PieChart>
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
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          div:nth-child(4) > div > div {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardClient;
