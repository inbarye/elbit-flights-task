# TLV Airport Flight Information Server

## Overview
This is a web server that provides various flight information endpoints for Tel Aviv (TLV) airport.

## Prerequisites
- Node.js (14+)
- Docker (optional)

## Installation
1. Clone the repository
2. Run `npm install`

## Running the Server
### Local Development
`npm run dev`

### Production Build
1. `npm run build`
2. `npm start`

## Docker Setup
1. Build the Docker image:
   ```
   docker build -t tlv-flight-server .
   ```

2. Run the Docker container:
   ```
   docker run -p 8080:8080 tlv-flight-server
   ```

## API Endpoints
- `/flights/total-flights`: Total number of flights
- `/flights/outbound-flights`: Number of outbound flights
- `/flights/inbound-flights`: Number of inbound flights
- `/flights/flights-by-country?country=Germany`: Flights from a specific country
- `/flights/outbound-flights-by-country?country=Germany`: Outbound flights from a country
- `/flights/inbound-flights-by-country?country=Germany`: Inbound flights from a country
- `/flights/delayed-flights`: Number of delayed flights
- `/flights/most-popular-destination`: Most popular destination city
- `/flights/quick-getaway`: Most popular destination city
- `/flights/`: Api Endpoints 