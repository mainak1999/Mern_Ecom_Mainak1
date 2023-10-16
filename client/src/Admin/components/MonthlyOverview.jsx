import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsCellIcon from "@mui/icons-material/SettingsCell";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const salesData = [
  {
    stats: "245k",
    title: "Sales",
    color: "RGB(147, 250, 165)",
    icon: <TrendingUpIcon sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "12.5k",
    title: "Customer",
    color: "RGB(255, 240, 0)",
    icon: <AccountCircleIcon sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "1.54k",
    title: "Products",
    color: "RGB(255, 76, 48)",
    icon: <SettingsCellIcon sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "88k",
    title: "Revenue",
    color: "RGB(95, 16, 245)",
    icon: <CurrencyRupeeIcon sx={{ fontSize: "1.75rem" }} />,
  },
];

const renderStats = () => {
  return salesData.map((item, index) => (
    <Grid item xs={12} sm={3} key={index}>
        <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
      <Avatar
        variant="rounded"
        sx={{
          mr: 3,
          width: 44,
          height: 44,
          boxShadow: 3,
          color: "white",
          bgcolor: `${item.color}`,
        }}
      >
        {item.icon}
      </Avatar>
      <Box sx={{ display: "flex", flexDirection: "column"}}>
        <Typography variant="caption">{item.title}</Typography>
        <Typography variant="h6">{item.stats}</Typography>
      </Box>
      </Box>
    </Grid>
  ));
};

const MonthlyOverview = () => {
  return (
    <Card sx={{bgcolor:"RGB(57, 46, 74)",color:"white"}}>
      <CardHeader
        title="Monthly Overview"
        action={
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        }
        subheader={
          <Typography variant="body2">
            <Box component="span" sx={{ fontWeight: 600, mx:2 }}>
              Total 48.5% growth 
            </Box>
            😎  This Month
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: "2rem !important",
            letterSpacing: "0.15px !important",
          },
        }}
      />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={2}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MonthlyOverview;
