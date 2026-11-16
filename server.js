
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Basic security headers
app.disable("x-powered-by");

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("X-Frame-Options", "DENY");
  next();
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "online",
    service: "DingusBrowse",
    browsingDataStored: false
  });
});

// Privacy information
app.get("/privacy", (req, res) => {
  res.json({
    message: "DingusBrowse does not intentionally store browsing history.",
    browsingTrafficRoutedThroughServer: false
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`DingusBrowse service running on port ${PORT}`);
});
