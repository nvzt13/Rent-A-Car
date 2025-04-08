"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
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
  const rentals = useAppSelector((state) => state.rentals.rentals);

  const [carsLength, setCarsLength] = useState(0);
  const [waitedRentals, setWaitedRentals] = useState(0);
  const [visitorCounter, setVisitorCounter] = useState(0);
  const [rentalData, setRentalData] = useState<
    { month: string; revenue: number; rentals: number }[]
  >([]);

  const suvCount = cars.filter((car) => car.carType === "Suv").length;
  const premiumCount = cars.filter((car) => car.carType === "Premium").length;
  const ekonomiCount = cars.filter((car) => car.carType === "Ekonomi").length;

  const pieData = [
    { name: "Ekonomi", value: ekonomiCount },
    { name: "Premium", value: premiumCount },
    { name: "Suv", value: suvCount },
  ];

  useEffect(() => {
    setCarsLength(cars.length);
    setWaitedRentals(rentals?.filter((rental) => rental.isAprove === false).length);
  }, [cars, rentals]);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const res = await fetch("/api/v1/statistics");
        const data = await res.json();
        const formatted = data?.data?.map((item: any) => ({
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

  const latestRevenue =
    rentalData?.length > 0 ? rentalData[rentalData.length - 1].revenue : 0;
useEffect(() => {
  fetch("/api/v1/visitor")
    .then((res) => res.json())
    .then((data) => {
      setVisitorCounter(data.count)
    });
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {/* Aylık Ziyaretçi */}
        <Card sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="textSecondary">
            Aylık Ziyaretçi
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
            <Typography variant="h5" fontWeight="bold">
              {visitorCounter}
            </Typography>
            <PeopleAltRoundedIcon color="primary" />
          </Box>
        </Card>

        {/* Toplam Araba */}
        <Card sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="textSecondary">
            Toplam Araba
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
            <Typography variant="h5" fontWeight="bold">
              {carsLength}
            </Typography>
            <DirectionsCarRoundedIcon sx={{ color: "#1976d2" }} />
          </Box>
        </Card>

        {/* Bekleyen Randevu */}
        <Card sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="textSecondary">
            Bekleyen Randevu
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
            <Typography variant="h5" fontWeight="bold">
              {waitedRentals}
            </Typography>
            <CalendarMonthRoundedIcon sx={{ color: "#0288d1" }} />
          </Box>
        </Card>

        {/* Güncel Gelir */}
        <Card sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="textSecondary">
            Toplam Gelir
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
            <Typography variant="h5" fontWeight="bold">
              ₺{latestRevenue.toLocaleString("tr-TR")}
            </Typography>
            <MonetizationOnRoundedIcon sx={{ color: "#43a047" }} />
          </Box>
        </Card>
      </div>

      {/* Aylık Gelir Grafiği */}
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

      {/* Kategori ve Kiralama Sayısı Grafikleri */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))",
          gap: "20px",
        }}
      >
        {/* Araç Kategori Dağılımı */}
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
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Kiralama Sayıları */}
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
      </div>
    </div>
  );
};

export default DashboardClient;
