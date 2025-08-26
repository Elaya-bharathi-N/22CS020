import React, { useState } from "react";
import { TextField, Button, Grid, Card, CardContent, Typography } from "@mui/material";
import { logInfo, logError } from "./Logger";

const ShortenerForm = () => {
  const [urls, setUrls] = useState([{ longURL: "", validity: "", shortcode: "" }]);
  const [shortenedURLs, setShortenedURLs] = useState(JSON.parse(localStorage.getItem("urls")) || []);

  const handleInputChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const addField = () => {
    if (urls.length < 5) {
      setUrls([...urls, { longURL: "", validity: "", shortcode: "" }]);
    }
  };

  const generateShortCode = () => Math.random().toString(36).substring(2, 7);

  const validateURL = (url) => /^(https?:\/\/[^\s$.?#].[^\s]*)$/i.test(url);

  const handleShorten = () => {
    let newShortened = [...shortenedURLs];
    urls.forEach(({ longURL, validity, shortcode }) => {
      if (!validateURL(longURL)) {
        logError("Invalid URL entered", { longURL });
        alert(`Invalid URL: ${longURL}`);
        return;
      }

      const code = shortcode || generateShortCode();
      if (newShortened.find((item) => item.shortcode === code)) {
        logError("Shortcode collision", { shortcode: code });
        alert(`Shortcode already exists: ${code}`);
        return;
      }

      const createdAt = new Date();
      const expiry = new Date(createdAt.getTime() + (validity ? validity : 30) * 60000);

      newShortened.push({
        longURL,
        shortcode: code,
        createdAt: createdAt.toISOString(),
        expiry: expiry.toISOString(),
        clicks: []
      });

      logInfo("URL shortened successfully", { shortURL: code });
    });

    setShortenedURLs(newShortened);
    localStorage.setItem("urls", JSON.stringify(newShortened));
  };

  return (
    <Card>
      <CardContent>
        {urls.map((urlObj, index) => (
          <Grid container spacing={2} key={index} style={{ marginBottom: "10px" }}>
            <Grid item xs={12} md={5}>
              <TextField
                label="Original URL"
                fullWidth
                value={urlObj.longURL}
                onChange={(e) => handleInputChange(index, "longURL", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Validity (min)"
                fullWidth
                type="number"
                value={urlObj.validity}
                onChange={(e) => handleInputChange(index, "validity", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Custom Shortcode"
                fullWidth
                value={urlObj.shortcode}
                onChange={(e) => handleInputChange(index, "shortcode", e.target.value)}
              />
            </Grid>
          </Grid>
        ))}

        <Button variant="outlined" onClick={addField}>Add More</Button>
        <Button variant="contained" color="primary" onClick={handleShorten} style={{ marginLeft: "10px" }}>
          Shorten URLs
        </Button>

        <Typography variant="h6" style={{ marginTop: "20px" }}>Shortened URLs:</Typography>
        {shortenedURLs.map((item, i) => (
          <Typography key={i}>
            {window.location.origin}/{item.shortcode} → {item.longURL} (Expires: {new Date(item.expiry).toLocaleString()})
          </Typography>
        ))}

        <Button variant="contained" color="secondary" href="/stats" style={{ marginTop: "20px" }}>
          View Stats
        </Button>
      </CardContent>
    </Card>
  );
};

export default ShortenerForm;
