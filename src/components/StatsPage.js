import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const StatsPage = () => {
  const shortenedURLs = JSON.parse(localStorage.getItem("urls")) || [];

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Statistics</Typography>
        {shortenedURLs.map((item, i) => (
          <div key={i} style={{ marginTop: "15px" }}>
            <Typography><b>Short URL:</b> {window.location.origin}/{item.shortcode}</Typography>
            <Typography><b>Original URL:</b> {item.longURL}</Typography>
            <Typography><b>Created:</b> {new Date(item.createdAt).toLocaleString()}</Typography>
            <Typography><b>Expiry:</b> {new Date(item.expiry).toLocaleString()}</Typography>
            <Typography><b>Clicks:</b> {item.clicks.length}</Typography>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default StatsPage;
