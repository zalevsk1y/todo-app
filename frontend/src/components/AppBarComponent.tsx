import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

const AppBarComponent: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5">Todo</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
