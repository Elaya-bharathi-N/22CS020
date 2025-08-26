import { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

export default function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleShorten = async () => {
    if (!url) {
      alert('Please enter a URL');
      return;
    }

    try {
      // Using tinyurl API
      const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
      const shortLink = await response.text();
      setShortUrl(shortLink);
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>

      <TextField
        variant="outlined"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ marginRight: '10px', width: '300px' }}
      />

      <Button variant="contained" color="primary" onClick={handleShorten}>
        Shorten URL
      </Button>

      {shortUrl && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6">Shortened URL:</Typography>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}
