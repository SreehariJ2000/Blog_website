import * as React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';



export default function  MyMultiLineField(props) {
    const {label,placeholder,name,control}=props
  return (
    
     <Controller
     name={name}
     control={control}
     render={({
     field:{onChange,value},
     fieldState:{error},
     formState,



     })=>(

        <TextField
          id="standard-multiline-static"
          label={label}
          multiline
          rows={4}
          variant="standard"
          onChange={onChange}
          value={value}
          placeholder={placeholder}
        />

        
     )
    }
    />
  );
}
