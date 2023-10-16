import { Button, Card, CardContent, Typography, styled } from "@mui/material";
import React from "react";


const TriangelImg = styled("img")({
    right:0,
    bottom:30,
    height:150,
    position:"absolute"
})

const TrophyImg=styled("img")({
    right:36,
    bottom:20,
    height:'absolute'
})
const Achievement=()=>{
    return(
        <Card className='space-y-6' sx={{position:"relative",bgcolor:"RGB(57, 46, 74);",color:"white"}}>
            <CardContent>
                <Typography variant='h6' className=' flex' sx={{letterSpacing:".25px"}}>
                    Shop With Mainak
                </Typography>
                <Typography  className=' flex' variant="body2">Congratulations 🥳</Typography>
                <Typography  className=' flex' variant="h5" sx={{my:3.1}}>420.8k</Typography>
                <Button  className='flex' size='small' variant='contained'>View Sales</Button>
                <TriangelImg src='https://shopwithzosh.vercel.app/images/misc/trophy.png'></TriangelImg>
                <TrophyImg src=''></TrophyImg>
            </CardContent>
        </Card>
    )
}
export default Achievement;