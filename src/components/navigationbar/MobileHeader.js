"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import * as React from "react";

import {
  Box,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItem,
  Divider,
  List,
  SwipeableDrawer,
} from "@mui/material";
import Link from "next/link";
import "./style.css";
export default function SwipeableTemporaryDrawer({ setHideLogo, hideLogo }) {
  // const [isConsultingServicesOpen, setIsConsultingServicesOpen] =
  //   React.useState(true);
  const [isServicesDropDownOpen, setIsServicesDropDownOpen] =
    React.useState(false);
  // const router = useRouter();
  const router = useRouter();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open, path) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    if (path) {
      router.push(path);
    }
    setState({ ...state, [anchor]: open });
    setHideLogo(!hideLogo);
  };
  const list = (anchor) => (
    // {isOpen?
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : "150px",
        bgcolor: "white",
        overflowY: "unset",
      }}
      role="presentation"
    >
      <div className="flex justify-between p-4 header">
        <Link href="/">
          <Image
            // eslint-disable-next-line no-undef
            src={`/images/Logo.png`}
            width={150}
            height={60}
            alt="mcad-logo"
            className="py-[10px]"
          />
        </Link>
        <p
          onClick={toggleDrawer(anchor, false)}
          className="text-[22px] font-bold cursor-pointer"
        >
          <>&#9747;</>
        </p>
      </div>

      <List>
        <ListItem
          className="flex items-center justify-center "
          onClick={toggleDrawer(anchor, false, "/")}
          onKeyDown={toggleDrawer(anchor, false)}
          disablePadding
        >
          <ListItemButton>
            <ListItemIcon></ListItemIcon>
            <span>
              <ListItemText primary="Home" />
            </span>
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem
          className="flex items-center justify-center "
          onClick={toggleDrawer(anchor, false, "/services")}
          onKeyDown={toggleDrawer(anchor, false)}
          disablePadding
        >
          <ListItemButton>
            <ListItemIcon></ListItemIcon>
            <span>
              <ListItemText primary="Services" />
            </span>
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem
          className="flex items-center justify-center "
          onClick={toggleDrawer(anchor, false, "/projects")}
          onKeyDown={toggleDrawer(anchor, false)}
          disablePadding
        >
          <ListItemButton>
            <ListItemIcon></ListItemIcon>
            <span>
              <ListItemText primary="Projects" />
            </span>
          </ListItemButton>
        </ListItem>
        <Divider />

        <ListItem
          className="ml-[3px]"
          onClick={toggleDrawer(anchor, false, "/contact")}
          onKeyDown={toggleDrawer(anchor, false)}
          disablePadding
        >
          <ListItemButton>
            <ListItemIcon></ListItemIcon>
            <span>
              <ListItemText primary="contact" />
            </span>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );
  return (
    <div className="sm:pl-[3rem]  h-[80px] flex justify-center items-center w-full">
      {["top"].map((anchor) => (
        <React.Fragment key={anchor}>
          <div className="flex items-center w-full justify-around">
            <span
              onClick={toggleDrawer(anchor, true)}
              className="cursor-pointer text-[25px] flex "
            >
              &#9776;
            </span>
            {!hideLogo && (
              <Link href="/">
                <Image
                  // eslint-disable-next-line no-undef
                  src={`/images/Logo.png`}
                  width={150}
                  height={60}
                  alt="mcad-logo"
                  className="py-[10px]"
                />
              </Link>
            )}
          </div>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            variant="persistent"
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            sx={{
              "& .MuiPaper-root": {
                overflowY: 'visible', 
              }
            }}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
