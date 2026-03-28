import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static frontend
app.use(express.static('public'));

// Ping endpoint
app.get("/ping", (req, res) => {
  console.log("Ping received at", new Date());
  res.send("Pong");
});

// Self-ping (every 5 min)
setInterval(async () => {
  try {
    // Node 18+ built-in fetch
    await fetch(`http://localhost:${PORT}/ping`);
    console.log("Self-ping executed at", new Date());
  } catch (err) {
    console.log("Ping failed:", err);
  }
}, 5 * 60 * 1000); // 5 min

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
