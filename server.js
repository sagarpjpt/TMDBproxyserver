import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

// TMDb Bearer Token (v4 read access)
const TMDB_BEARER = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NTc0NDE1NjZmZDE3NjQ1YzU1MzZkMjJhYmEwZjk0NCIsIm5iZiI6MTc2MDUyODQyOC4zODIwMDAyLCJzdWIiOiI2OGVmODgyYzIwYWYyOTYzNTNhZWRlNTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.pvkrdFIDe647ETzPxIwFqolwQLNPTcXA2i-ykAFQ384";

const BASE_URL = "https://api.themoviedb.org/3";

const fetchFromTMDB = async (endpoint) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_BEARER}`,
    },
  });
  return res.json();
};

// Now Playing
app.get("/api/now-playing", async (req, res) => {
  try {
    const data = await fetchFromTMDB("/movie/now_playing?language=en-US&page=1");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch now playing movies" });
  }
});

// Popular
app.get("/api/popular", async (req, res) => {
  try {
    const data = await fetchFromTMDB("/movie/popular?language=en-US&page=1");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch popular movies" });
  }
});

// Top Rated
app.get("/api/top-rated", async (req, res) => {
  try {
    const data = await fetchFromTMDB("/movie/top_rated?language=en-US&page=1");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch top rated movies" });
  }
});

// Upcoming
app.get("/api/upcoming", async (req, res) => {
  try {
    const data = await fetchFromTMDB("/movie/upcoming?language=en-US&page=1");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch upcoming movies" });
  }
});

// Fetch poster image (optional)
app.get("/api/poster/:path", (req, res) => {
  const { path } = req.params;
  const imageUrl = `https://image.tmdb.org/t/p/w500/${path}`;
  res.redirect(imageUrl);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ TMDB Proxy Server running on port ${PORT}`));

// Movie Videos (trailers, teasers, clips)
app.get("/api/movie/:id/videos", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(`/movie/${id}/videos?language=en-US`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch movie videos" });
  }
});
