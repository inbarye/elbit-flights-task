import { Request, Response } from 'express';
import { flightService } from '../services/flightService';

// API Endpoints
export const getAPIEndpoints = async (req: Request, res: Response): Promise<void> => {
  res.json(`## API Endpoints: 
          '/flights/': Api Endpoints
          '/flights/total-flights': Total number of flights
          '/flights/outbound-flights': Number of outbound flights
          '/flights/inbound-flights': Number of inbound flights
          '/flights/flights-by-country?country=Germany': Flights from a specific country
          '/flights/outbound-flights-by-country?country=Germany': Outbound flights from a country
          '/flights/inbound-flights-by-country?country=Germany': Inbound flights from a country
          '/flights/delayed-flights': Number of delayed flights
          '/flights/most-popular-destination': Most popular destination city
          '/flights/quick-getaway': Most popular destination city`
  )
}

// Total number of flights
export const getTotalFlights = async (req: Request, res: Response): Promise<void> => {
  try {
    const total = await flightService.getTotalFlights();
    res.json(total);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve total flights' });
  }
}

// Outbound flights
 export const getOutboundFlights = async (req: Request, res: Response): Promise<void> => {
  try {
    const outbound = await flightService.getOutboundFlights();
    res.json(outbound);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve outbound flights' });
  }
}

// Inbound flights
 export const getInboundFlights = async (req: Request, res: Response): Promise<void> => {
  try {
    const inbound = await flightService.getInboundFlights();
    res.json(inbound);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve inbound flights' });
  }
}

// Flights by country
// In controller file
export const getFlightsByCountry = async (req: Request, res: Response): Promise<void> => {
  const { country } = req.query;
  
  if (!country || typeof country !== 'string') {
    res.status(400).json({ error: 'Country parameter is required' });
    return;
  }

  try {
    const flights = await flightService.getFlightsByCountry(country);
    res.json(flights);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve flights by country' });
  }
}

// Outbound flights by country
 export const getOutboundFlightsByCountry = async (req: Request, res: Response): Promise<void> => {
  const { country } = req.query;
  
  if (!country || typeof country !== 'string') {
    res.status(400).json({ error: 'Country parameter is required' });
    return;
  }

  try {
    const flights = await flightService.getOutboundFlightsByCountry(country);
    res.json(flights);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve outbound flights by country' });
  }
}

// Inbound flights by country
 export const getInboundFlightsByCountry = async (req: Request, res: Response): Promise<void> => {
  const { country } = req.query;
  
  if (!country || typeof country !== 'string') {
    res.status(400).json({ error: 'Country parameter is required' });
    return;
  }

  try {
    const flights = await flightService.getInboundFlightsByCountry(country);
    res.json(flights);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve inbound flights by country' });
  }
}

// Delayed flights
 export const getDelayedFlights = async (req: Request, res: Response): Promise<void> => {
  try {
    const delayed = await flightService.getDelayedFlights();
    res.json(delayed);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve delayed flights' });
  }
}

// Most popular destination
 export const getMostPopularDestination = async (req: Request, res: Response): Promise<void> => {
  try {
    const destination = await flightService.getMostPopularDestination();
    res.json(destination);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve most popular destination' });
  }
}

// Quick getaway flights
 export const getQuickGetawayFlights = async (req: Request, res: Response): Promise<void> => {
  try {
    const flights = await flightService.getQuickGetawayFlights();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve quick getaway flights' });
  }
}