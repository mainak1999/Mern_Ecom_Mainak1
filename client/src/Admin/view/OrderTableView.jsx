import { AvatarGroup, Grid, Menu, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmOrder, deleteOrder, deliveredOrder, getOrders, shipOrder } from "../../State/Admin/Order/Action";
import { Avatar, Button, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
const OrdersTableView = () => {
  const dispatch = useDispatch();
  const {adminOrder}  = useSelector((store) => store);
  const [anchorEl, setAnchorEl] = useState([]);

  useEffect(() => {
    dispatch(getOrders());
  }, [adminOrder.confirmed, adminOrder.delivered, adminOrder.shipped,adminOrder.deletedOrder]);

  const handleClick = (event, index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = event.currentTarget;
    const orderId = event.currentTarget.getAttribute("data-order-id"); // Get the orderId
    setAnchorEl(newAnchorElArray);
    
  };
  const handleClose = (index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = null;
    setAnchorEl(newAnchorElArray);
  };

  const handleShippedOrder = (orderId) => {
    dispatch(shipOrder(orderId));
    handleClose();
  };

  const handleConfirmedOrder = (orderId) => {
    dispatch(confirmOrder(orderId));
    handleClose();
  };

  const handleDeliveredOrder = (orderId) => {
    dispatch(deliveredOrder(orderId));
    handleClose();
  };

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
    handleClose();
    console.log('State after deletion:', adminOrder);
  };

  return (
    <div className="p-10">
      <Card className='mt-2'>
        <CardHeader title="Recent Orders" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Order ID</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Status</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {adminOrder.orders?.slice(0,4).map((item,index) => (
                <TableRow
                  key={item.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">
                    <AvatarGroup max={3} sx={{ justifyContent: "start" }}>

                      {item.orderItems?.map((orderItem) => <Avatar src={orderItem.product?.imageUrl}></Avatar>)}
                    </AvatarGroup>                </TableCell>
                  <TableCell align="left" scope="item">
                    {item.orderItems?.map((orderItem) => <p>{orderItem.product?.title}</p>)}

                  </TableCell>

                  <TableCell align="left">{item._id}</TableCell>
                  <TableCell align="left">{item.totalPrice}</TableCell>
                  <TableCell align="left"><span className={` text-white px-5 py-2 rounded-full ${item.orderStatus === "CONFIRMED" ? "bg-[green]" :
                    item.orderStatus === "SHIPPED" ? "bg-[blue]" :
                      item.orderStatus == "PLACED" ? "bg-[#EA7773]" :
                        item.orderStatus == "PENDING" ? "bg-[#01CBC6]" :
                        item.orderStatus == "DELIVERED" ? "bg-[#E74292]" :
                          "bg-[red]"}`}>{item.orderStatus}</span></TableCell>

                 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>

  )
}
export default OrdersTableView;