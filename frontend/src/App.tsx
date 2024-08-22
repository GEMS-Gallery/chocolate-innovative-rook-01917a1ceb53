import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Container, Typography, TextField, Button, Card, CardContent, Box } from '@mui/material';
import { backend } from 'declarations/backend';

type Inputs = {
  newGreeting: string;
};

function App() {
  const [greeting, setGreeting] = useState<string>('');
  const [updateTime, setUpdateTime] = useState<string>('');
  const [viewCount, setViewCount] = useState<number>(0);
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const fetchGreeting = async () => {
    const fetchedGreeting = await backend.getGreeting();
    setGreeting(fetchedGreeting);
  };

  const fetchMetadata = async () => {
    const [time, count] = await backend.getMetadata();
    setUpdateTime(new Date(Number(time) / 1000000).toLocaleString());
    setViewCount(Number(count));
  };

  useEffect(() => {
    fetchGreeting();
    fetchMetadata();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await backend.updateGreeting(data.newGreeting);
    fetchGreeting();
    fetchMetadata();
    reset();
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Greeting Dapp
        </Typography>
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              {greeting}
            </Typography>
            <Typography color="text.secondary">
              Last updated: {updateTime}
            </Typography>
            <Typography color="text.secondary">
              View count: {viewCount}
            </Typography>
          </CardContent>
        </Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('newGreeting')}
            label="New Greeting"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Update Greeting
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default App;