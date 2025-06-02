"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import Image from "next/image"; // Next.js için
import {Grid2} from '@mui/material'; // Grid2'nin doğru yolu

const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.common.white,
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  [theme.breakpoints.up("sm")]: {
    paddingLeft: 20,
    paddingRight: 20,
  },
}));

const Footer = () => {
  return (
    <div>
    <StyledFooter >
      <Container maxWidth="lg">
        <Grid2 container spacing={4}>
          {/* Logo Bölümü */}
          <Grid2 >
            <Image src='/logo.svg' alt="Car Logo" width={60} height={60} />
            <Typography variant="h6" color="inherit" gutterBottom>
              RentCar
            </Typography>
            <Typography variant="body2" color="inherit">
              İhtiyacınız olan aracı en uygun fiyatlarla kiralayın.
            </Typography>
          </Grid2>

          {/* Navigasyon Bölümü */}
          <Grid2>
            <Typography variant="h6" color="inherit" gutterBottom>
              Menü
            </Typography>
            <Link href="#" color="inherit">
              Ana Sayfa
            </Link>
            <br />
            <Link href="#" color="inherit">
              Hakkımızda
            </Link>
            <br />
            <Link href="#" color="inherit">
              İletişim
            </Link>
            <br />
            {/* Admin Giriş Linki */}
            <Link href="/signin" color="inherit" >
              Admin Girişi
            </Link>
          </Grid2>

          <Grid2 >
            <Typography variant="h6" color="inherit" gutterBottom>
              İletişim
            </Typography>
            <Typography variant="body2" color="inherit">
              Adres: XYZ Caddesi, No: 123, Bitlis
            </Typography>
            <Typography variant="body2" color="inherit">
              Telefon: +90 123 456 78 90
            </Typography>
            <Typography variant="body2" color="inherit">
              E-posta: info@rentcar.com
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit">
                <EmailIcon />
              </IconButton>
            </Box>
          </Grid2>
        </Grid2>

        {/* Alt Bilgi */}
        <Divider sx={{ backgroundColor: "#ffffff", mt: 4 }} />
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="inherit">
            © {new Date().getFullYear()} RentCar. Tüm Hakları Saklıdır.
          </Typography>
        </Box>
      </Container>
    </StyledFooter>
    </div>
  );
};

export default Footer;