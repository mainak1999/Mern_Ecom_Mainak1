import React from 'react';
import { Avatar, Grid,Box, Rating } from '@mui/material';

const ProductReviewCard = () => {
    return(
        <div>
            <Grid container spacing={2} gap={3}>
                <Grid item xs={1}>
                    <Box>
                        <Avatar className='text-white' sx={{width:56, height: 56,bgcolor: "#9155fd"}}></Avatar>
                    </Box>
                </Grid>
                <Grid itemxs={9}>
                <div className='space-y-2'>
                    <div>
                        <p className='flex font-semibold text-lg'>Raam</p>
                        <p className='flex opacity-70'>April 5, 2023</p>
                    </div>
                </div>


                <Rating value={3.5} name='half-rating' sx={{
    display: 'flex'}} readOnly precision={.5}/>
                <p className='flex'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta, temporibus.</p>

                </Grid>

            </Grid>
        </div>
    )
};

export default ProductReviewCard;