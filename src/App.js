import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShortenerForm from "./components/ShortenerForm";
import StatsPage from "./components/StatsPage";
import RedirectHandler from "./components/RedirectHandler";
import { Container, Typography } from "@mui/material";

function App() {
  return (
    <Router>
      <Container maxWidth="md" style={{ marginTop: "30px" }}>
        <Typography variant="h4" gutterBottom align="center">
          React URL Shortener
        </Typography>
        <Routes>
          <Route path="/" element={<ShortenerForm />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/:shortcode" element={<RedirectHandler />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
