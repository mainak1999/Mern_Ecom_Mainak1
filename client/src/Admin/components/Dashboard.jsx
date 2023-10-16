import { Grid } from "@mui/material";
import React from "react";
import Achievement from "./Achievement";
import MonthlyOverview from "./MonthlyOverview";
import ProductsTable from "./ProductsTable";
import OrdersTable from "../view/OrderTableView";
import OrdersTableView from "../view/OrderTableView";
const AdminDashboard=()=>{
    return(
        <div className="p-10 ">
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Achievement/>

                </Grid>
                <Grid item xs={12} md={8}>
                    <MonthlyOverview/>
                </Grid>
                <Grid className="shadow-lg shadow-gray-600" item md={6} sm={6}>
                    <ProductsTable/>
                </Grid>
                <Grid className="shadow-lg shadow-gray-300" item md={6} sm={6}>
                    <OrdersTableView/>
                </Grid>

            </Grid>
        </div>
    )
}
export default AdminDashboard;