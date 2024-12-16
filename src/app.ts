import express from 'express';
import cors from 'cors';
import flightRoutes from './routes/flights';


const app = express();
const PORT = process.env.PORT || 8080;


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/flights', flightRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;