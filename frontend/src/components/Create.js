import React ,{useState,useEffect} from 'react'
import { Box, Button, Typography } from '@mui/material'
import MyDatePickerField from './forms/MyDatePickerField'
import MyMultiLineField from './forms/MyMultiLineField'
import MySelectField from './forms/MySelectField'
import MyTextField from './forms/MyTextField'
import { useForm } from 'react-hook-form'
import AxiosInstance from './Axois'
import  Dayjs  from 'dayjs'
import {useNavigate} from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"


function Create() {
    const [projectmanager,setprojectmanager]= useState([])
    const [loading,setLoading]= useState(true)
    const GetData =()=>{
      AxiosInstance.get(`projectmanager/`).then(
        (res)=>{
            setprojectmanager(res.data)
          console.log(res.data)
          setLoading(false)
        }
      )
    }
  
    useEffect(()=>{
      GetData();
    },[])



    const navigate=useNavigate()
    const defaultValues={
        name:'',
        comment:'',
        status:'',
        start_date: null, 
        end_date: null,
    }

    const schema = yup
  .object({
    name: yup.string().required('Name is required'),
    comment: yup.string().required('comment is required'),
    start_date: yup.date().required(),
    end_date: yup
      .date()
      .required('End date is required').min(yup.ref('start_date'),'gerater than start')
      
  })
  

    const { handleSubmit, reset, setValue, control } = useForm({defaultValues:defaultValues,resolver: yupResolver(schema)})
    
    const submission=(data)=> {
        const startDate=Dayjs(data.start_date["$d"]).format("YYYY-MM-DD")
        const endDate=Dayjs(data.end_date["$d"]).format("YYYY-MM-DD")
        AxiosInstance.post(`project/`, {
            name: data.name,
            comments: data.comment,
            startdate: startDate,  
            enddate: endDate, 
            projectmanager:data.project_manager     
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

                   <MySelectField
                    label="Project Manager"
                    name="project_manager"
                    control={control}
                    options={projectmanager.map(manager => ({ value: manager.id, label: manager.name }))}
                    width={'30%'}
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
