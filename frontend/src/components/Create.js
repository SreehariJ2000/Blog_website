import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import MyDatePickerField from './forms/MyDatePickerField'
import MyMultiLineField from './forms/MyMultiLineField'
import MySelectField from './forms/MySelectField'
import MyTextField from './forms/MyTextField'
import { useForm } from 'react-hook-form'
import AxiosInstance from './Axois'
import  Dayjs  from 'dayjs'
import {useNavigate} from 'react-router-dom'


function Create() {
    const navigate=useNavigate()
    const defaultValues={
        name:'',
        comment:'',
        status:'',
        start_date: null, 
        end_date: null,
    }
    const { handleSubmit, reset, setValue, control } = useForm({defaultValues:defaultValues})
    
    const submission=(data)=> {
        const startDate=Dayjs(data.start_date["$d"]).format("YYYY-MM-DD")
        const endDate=Dayjs(data.end_date["$d"]).format("YYYY-MM-DD")
        AxiosInstance.post(`project/`, {
            name: data.name,
            comments: data.comment,
            startdate: startDate,  
            enddate: endDate,      
        }).then((res)=>{
              navigate(`/`)
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit(submission)}>
            <Box sx={{ backgroundColor: 'lightblue', padding: '10px', borderRadius: '5px', marginBottom: '20px' }}>
                <Typography variant="h4" sx={{ marginBottom: '20px' }}>Create Something</Typography>
            </Box>

            <Box sx={{ padding: '100px', borderRadius: '5px', boxShadow: 2 , marginBottom: '30px' }}>
                <Box sx={{ marginBottom: '20px' }}> {/* Added margin-bottom for space */}
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
                        <MyTextField
                            label="Name"
                            name="name"
                            control={control}
                            placeholder="Enter the project name"
                            width={'30%'}
                        />

                        <MyDatePickerField
                            label="Start date"
                            width={'30%'}
                            name="start_date"
                            control={control}
                        />

                        <MyDatePickerField
                            label="End date"
                            name="end_date"
                            width={'30%'}
                            control={control}
                        />
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
                    <MyMultiLineField
                        label="Comments"
                        name="comment"
                        control={control}
                        placeholder="Enter the project DETAILS"
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

export default Create
