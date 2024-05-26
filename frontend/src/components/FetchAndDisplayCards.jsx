// FetchAndDisplayCards.jsx
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AxiosInstance from './Axois';
import '../Css/Card.css';

const OutlinedCard = ({ details }) => (
  <Box className="card"> {/* Apply the 'card' class */}
    <Card variant="outlined">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {details.name}
        </Typography>
        <Typography variant="h5" component="div">
          {details.gender === 'M' ? 'Male' : details.gender === 'F' ? 'Female' : 'Other'}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Description
        </Typography>
        <Typography variant="body2">
          {details.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  </Box>
);

const FetchAndDisplayCards = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    AxiosInstance.get(`yourmodels/`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="card-container"> {/* Apply styles for the container */}
      {data.map((item, index) => (
        <OutlinedCard key={index} details={item} />
      ))}
    </div>
  );
};

export default FetchAndDisplayCards;
