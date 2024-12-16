import axios from 'axios';
import { Flight, FlightApiResponse } from '../types/flight';

const API_URL = 'https://data.gov.il/api/3/action/datastore_search';
const RESOURCE_ID = 'e83f763b-b7d7-479e-b172-ae981ddc6de5';

export class FlightService {
  private flightsCache: Flight[] = [];
  private totalFlightsCache: number = 0;
  private lastFetchTime: number = 0;

  // Fetch and cache flights, refreshing every 5 minutes
  private async fetchFlights(): Promise<Flight[]> {
    const currentTime = Date.now();
    if (this.flightsCache.length === 0 || currentTime - this.lastFetchTime > 300000) {
      try {
        const response = await axios.get<FlightApiResponse>(`${API_URL}?resource_id=${RESOURCE_ID}&limit=2000`);
        this.totalFlightsCache = response.data.result.total;
        this.flightsCache = response.data.result.records;
        this.lastFetchTime = currentTime;
      } catch (error) {
        console.error('Failed to fetch flights:', error);
        throw new Error('Unable to retrieve flight data');
      }
    }
    return this.flightsCache;
  }

  // Total number of flights
  async getTotalFlights(): Promise<number> {
      await this.fetchFlights();
      return this.totalFlightsCache;
  }

  // Outbound flights
  async getOutboundFlights(): Promise<number> {
    const flights = await this.fetchFlights();
    return flights.filter(flight => flight.CHCINT).length;
  }

  // Inbound flights
  async getInboundFlights(): Promise<number> {
    const flights = await this.fetchFlights();
    return flights.filter(flight => !flight.CHCINT).length;
  }

  // Flights from a specific country
  async getFlightsByCountry(country: string): Promise<number> {
    const flights = await this.fetchFlights();
    return flights.filter(flight => 
      flight.CHLOCCT.toLowerCase() === country.toLowerCase()
    ).length;
  }

  // Outbound flights from a specific country
  async getOutboundFlightsByCountry(country: string): Promise<number> {
    const flights = await this.fetchFlights();
    return flights.filter(flight => 
      flight.CHLOCCT.toLowerCase() === country.toLowerCase() && flight.CHCINT
    ).length;
  }

  // Inbound flights from a specific country
  async getInboundFlightsByCountry(country: string): Promise<number> {
    const flights = await this.fetchFlights();
    return flights.filter(flight => 
      flight.CHLOCCT.toLowerCase() === country.toLowerCase() && !flight.CHCINT
    ).length;
  }

  // Delayed flights
  async getDelayedFlights(): Promise<number> {
    const flights = await this.fetchFlights();
    return flights.filter(flight => 
      flight.CHRMINE.toLowerCase().includes('delay')
    ).length;
  }

  // Most popular destination
  async getMostPopularDestination(): Promise<string> {
    const flights = await this.fetchFlights();
    const outboundFlights = flights.filter(flight => flight.CHCINT);
    
    // Make a map with destination : number of outbound flights
    const destinations = outboundFlights.reduce((acc, flight) => {
      acc[flight.CHLOC1T] = (acc[flight.CHLOC1T] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Find the destination with maximum number of flights
    return Object.entries(destinations).reduce((a, b) => 
      b[1] > a[1] ? b : a
    )[0];
  }

  // Quick getaway flights
  async getQuickGetawayFlights(): Promise<{ departure?: string; arrival?: string }> {
    const flights = await this.fetchFlights();
    
    // Find an outbound flight from Israel
    const outboundFlights = flights.filter(flight => 
      flight.CHCINT && flight.CHLOCCT !== 'Israel'
    );

    // Find an inbound flight to Israel
    const inboundFlights = flights.filter(flight => 
      !flight.CHCINT && flight.CHLOCCT === 'Israel'
    );

    // Sort outbound flights by departure time
    outboundFlights.sort((a, b) => new Date(a.CHSTOL).getTime() - new Date(b.CHSTOL).getTime());

    // Sort inbound flights by arrival time
    inboundFlights.sort((a, b) => new Date(a.CHSTOL).getTime() - new Date(b.CHSTOL).getTime());
    
    // Find the first pair of flights
    for (let outbound of outboundFlights) {
        const matchingInbound = inboundFlights.find(inbound => 
            new Date(inbound.CHSTOL).getTime() > new Date(outbound.CHPTOL).getTime()
        );
        if (matchingInbound) {
            return {
                departure: `${outbound.CHOPER}${outbound.CHFLTN}`,
                arrival: `${matchingInbound.CHOPER}${matchingInbound.CHFLTN}`,
            };
        }
    }

    return {};
  }
}

export const flightService = new FlightService();

