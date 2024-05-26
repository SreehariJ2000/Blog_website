import {React,useEffect,useMemo,useState} from 'react'
import AxiosInstance from './Axois'
import { MaterialReactTable } from 'material-react-table';
import Dayjs from 'dayjs';
import { Box, IconButton } from '@mui/material'; 
import EditIcon from '@mui/icons-material/Edit'; // Import EditIcon
import DeleteIcon from '@mui/icons-material/Delete'; // Import DeleteIcon
import { Link } from 'react-router-dom'

const Home = () => {
  const [myData,setMyData]= useState()
  const [loading,setLoading]= useState(true)
  const GetData =()=>{
    AxiosInstance.get(`project/`).then(
      (res)=>{
         setMyData(res.data)
        console.log(res.data)
        setLoading(false)
      }
    )
  }

  useEffect(()=>{
    GetData();
  },[])



  
  
  
    const columns = useMemo(
      () => [
        {
          accessorKey: 'name', 
          header: 'Name',
          size: 150,
        },
        {
          accessorKey: 'comments',
          header: 'Comments',
          size: 150,
        },
        {
          accessorFn: (row) => Dayjs(row.startdate).format('DD-MM-YYYY'),
          header: 'start_date',
          size: 200,
        },
        {
          accessorFn: (row) => Dayjs(row.enddate).format('DD-MM-YYYY'),
        
          header: 'end_date',
          size: 150,
        },
        
      ],
      [],
    );
  
    

  return (
    
    <div>
      {  loading ?  <p>data is loading</p> :
      <MaterialReactTable
      columns={columns}
      data={myData}
      
        
        enableRowActions
        renderRowActions={({ row,Table }) => (
          <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px', marginLeft: 'auto' }}>
          
          <IconButton   color="secondary" component={Link} to={`edit/${row.original.id}`}>
            <EditIcon />
          </IconButton>


          <IconButton
            color="error"  component={Link} to={`delete/${row.original.id}`}
           
          >
            <DeleteIcon />
          </IconButton>
        </Box>

        
      )}
    
      
        
        
        
        
        /> 
      }
    
    </div>
  )
}

export default Home