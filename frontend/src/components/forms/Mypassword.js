import * as React from 'react';
import {Controller} from 'react-hook-form'
import TextField from '@mui/material/TextField';

export default function Mypassword(props) {
    const {type,label,name,control}=props
  return (
    <Controller
    name={name}
    control={control}
    render={({
        field: {onChange,value},
        fieldState:{error}
    })=>(

         
          <TextField
          id="standard-password-input"
          label={label}
          type={type}
          onChange={onChange}
          value={value}
          autoComplete="current-password"
          variant="standard"
        />
    )}
    
    />
    
  );
}

