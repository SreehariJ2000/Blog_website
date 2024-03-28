import React from 'react'
import { useEffect,useState } from 'react'
import { Box, Button, Typography } from '@mui/material'

import AxiosInstance from './Axois'

import {useNavigate,useParams} from 'react-router-dom'

function Delete() {
    const MyParams=useParams()
    const MyId=MyParams.id
    const [loading,setLoading]= useState(true)
    const [MyData,setMyData]=useState()

     const GetData=()=>{

        AxiosInstance.get(`project/${MyId}/`).then(
            (res)=>{
                setMyData(res.data)
                setLoading(false)
            }
        )

     }


  
    
      useEffect(()=>{
        GetData();
      },[])


    const navigate=useNavigate()
  
   
    
    const submission=(data)=> {
        
        AxiosInstance.delete(`project/${MyId}/`, 
                 
        ).then((res)=>{
              navigate(`/`)
        })
    }
    return (
        <div>
            {loading ? <p>data is loading</p>:
            <div>
            
            <Box sx={{ backgroundColor: 'lightblue', padding: '10px', borderRadius: '5px', marginBottom: '20px' }}>
                <Typography variant="h4" sx={{ marginBottom: '20px' }}>Create Something</Typography>
            </Box>

            <Box sx={{ padding: '100px', borderRadius: '5px', boxShadow: 2 , marginBottom: '30px' }}>
                <Box sx={{ marginBottom: '20px' }}> {/* Added margin-bottom for space */}
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
                       Are you sure dou want {MyData.name}
                    <Button variant='contained'  onClick={submission} sx={{width:"30px",height:'20px'}}>
                     submit
                    </Button>
                    </Box>
                </Box>

                
               
            </Box>
            </div>
            }
        
        </div>
    )
}

export default Delete
