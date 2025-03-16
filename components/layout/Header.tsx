"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import TemporaryDrawer from "./Drawer"; // Drawer component
import Button from "@mui/material/Button";
import Image from "next/image"; // Next.js için
import MenuIcon from '@mui/icons-material/Menu';
import Link from "next/link";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: theme.shadows[5],
  [theme.breakpoints.up("sm")]: {
    paddingLeft: 20,
    paddingRight: 20,
  },
}));

const Header = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen:boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static">
        <Toolbar>
          {/* Drawer component for mobile */}
          <TemporaryDrawer open={open} toggleDrawer={toggleDrawer} />
          
          {/* Araba logosunu ekledik ve mobilde sağ tarafa yerleştirdik */}
                        <Image src='/logo.svg' alt="Car Logo" width={40}
                        height={40} /> {/* Araba logosunu yerleştirdik */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "flex", sm: "none" }, justifyContent: "flex-end" }}>
            <IconButton
              size="large"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <Link href="/">
            <Button color="inherit">Ana Sayfa</Button>
            </Link>

          <Link href="/about"> <Button color="inherit">Hakkımızda</Button></Link>
            <Link href="contact"><Button color="inherit">İletişim</Button></Link>
          </Box>
        </Toolbar>
      </StyledAppBar>
    </Box>
    </div>
  );
};

export default Header;