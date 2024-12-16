export interface Flight {
    _id: number;
    CHOPER: string;      // Flight Code
    CHFLTN: string;      // Flight Number
    CHOPERD: string;     // Airline Company
    CHSTOL: string;      // Estimated Departure Time
    CHPTOL: string;      // Real Departure Time
    CHAORD: string;      // Gate
    CHLOC1: string;      // Short Version Destination Airport
    CHLOC1D: string;     // Full Destination Airport Name
    CHLOC1TH: string;    // Destination City Name (Hebrew)
    CHLOC1T: string;     // Destination City Name (English)
    CHLOC1CH: string     // Country Name (Hebrew)
    CHLOCCT: string;     // Country Name (English)
    CHTERM: string;      // TLV Terminal                                                           
    CHCINT: string;      // Check-in Counter (indicates inbound/outbound)
    CHCKZN: string;      // TLV check in zone - if empty inbound flights else outbound flight      
    CHRMINE: string;     // Flight Status (English)     
    CHRMINH: string;     // Flight Status (Hebrew)
  }

  export interface FlightApiResponse {
    result: {
      total: number
      records: Flight[];
    }
  }