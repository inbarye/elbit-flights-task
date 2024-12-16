import { Router } from 'express';
import * as flights from '../controllers/flights';

const router = Router();

router.get('/', flights.getAPIEndpoints);

// Total number of flights
router.get('/total-flights',  flights.getTotalFlights);

// Outbound flights
router.get('/outbound-flights', flights.getOutboundFlights);

// Inbound flights
router.get('/inbound-flights', flights.getInboundFlights);

// Flights by country
router.get('/flights-by-country/', flights.getFlightsByCountry);

// Outbound flights by country
router.get('/outbound-flights-by-country', flights.getOutboundFlightsByCountry);

// Inbound flights by country
router.get('/inbound-flights-by-country', flights.getInboundFlightsByCountry);

// Delayed flights
router.get('/delayed-flights', flights.getDelayedFlights);

// Most popular destination
router.get('/most-popular-destination', flights.getMostPopularDestination);

// Quick getaway flights
router.get('/quick-getaway', flights.getQuickGetawayFlights);


export default router;