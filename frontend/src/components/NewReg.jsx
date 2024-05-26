import React from 'react'; 
import { Box, Button, Typography } from '@mui/material';
import MyRadio from './forms/MyRadio';
import { useForm } from 'react-hook-form'
import AxiosInstance from './Axois'

import MyMultiLineField from './forms/MyMultiLineField';
import MyTextField from './forms/MyTextField';


const NewReg = () => {
    const { handleSubmit,control,reset } = useForm();
    const submittion=(data)=> {
        AxiosInstance.post(`yourmodels/`,{
            name:data.name,
            description:data.comment,
            gender:data.radio
        }).then((result)=>{
            console.log(result)
            reset();
        })
    }
  return (
    
    <div>
        <form  onSubmit={handleSubmit(submittion)}>
    <Box sx={{ backgroundColor: 'lightblue', padding: '10px', borderRadius: '5px', marginBottom: '20px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>Create Something</Typography>
    </Box>

    <Box sx={{ padding: '20px', borderRadius: '5px', boxShadow: 2 , marginBottom: '30px' }}>
      <Box sx={{ marginBottom: '20px' }}>
        <MyTextField
          label="Name"
          name="name"
          control={control}
          placeholder="Enter the project name"
          width={'500px'} 
        />
      </Box>

      <Box sx={{ marginBottom: '20px' }}>
        <MyRadio
          name="radio"
          control={control}
        />
      </Box>

      <Box sx={{ marginBottom: '20px' }}>
        <MyMultiLineField
          label="Comments"
          name="comment"
          control={control}
          placeholder="Enter the project details"
          width={'100%'} // Adjusted width to fill the full width
        />
      </Box>
      <Button variant='contained'  type='submit' sx={{width:"30px",height:'20px'}}>
                     submit
                    </Button>
    </Box>
    </form>
  </div>
  
  )
}

export default NewReg
