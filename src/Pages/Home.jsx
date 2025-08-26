import React from 'react'
import { Button, Typography } from '@mui/material'

export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>
      <Button variant="contained" color="primary">
        Shorten URL
      </Button>
    </div>
  )
}
