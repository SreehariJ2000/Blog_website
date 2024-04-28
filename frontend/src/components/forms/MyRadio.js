
import * as React from 'react';
import Radio from '@mui/material/Radio'; // Import the Radio component
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Controller } from 'react-hook-form';


import FormHelperText from '@mui/material/FormHelperText';

export default function MyRadio(props) {
    const {name,control} = props
    const handleRadioChange = (event) => {
        console.log(event.target.value); 
      

    }
  return (
    <Controller
    name={name}
    control = {control}
    render={({
        field:{onChange,value}, 
                    fieldState:{error}, 
                    formState,

    })=>(
        <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"


          name={name} // Set the name attribute of the RadioGroup
            value={value} // Set the value of the RadioGroup to the value from react-hook-form
            onChange={onChange}
        >
          <FormControlLabel value="F" control={<Radio />} label="Female" />
          <FormControlLabel value="M" control={<Radio />} label="Male" />
          <FormControlLabel value="O" control={<Radio />} label="Other" />
          <FormControlLabel
            value="disabled"
            disabled
            control={<Radio />}
            label="other"
          />
        </RadioGroup>
      </FormControl>

    )}

    />
   

    
  );
}