// server

// support API:

// V - number of flights
// example:
// Input: {}
// Output: 192

// V - number of outbound flights
// example:
// Input: {}
// Output: 192

// V - number of inbound flights
// example:
// Input: {}
// Output: 192

// V - number of flights from a specific country (inbound & outbound)
// example:
// Input: {country: Germany} (country name - string)
// Output: 192

// V - number of flights from a specific country (outbound)
// example:
// Input: {country: Germany} (country name - string)
// Output: 192

// V - number of flights from a specific country (inbound)
// example:
// Input: {country: Germany} (country name - string)
// Output: 192

// V - number of delayed flights
// example:
// Input: {}
// Output: 192

// V - Most popular destination - the city with the highest number of outbound flights.
// example:
// Input: {}
// Output: AMSTERDAM

/* Bonus:
return (if exist) two flights one from Israel and one to Israel that someone can take for a quick getaway -
considering date and time. ignore the flight duration.
Input: none.
Output:
-departure: Flight Number (code and number) - string.
-arrival: Flight Number (code and number) - string.
-can be none.

o example:
Input: {}
Output: {departure: LX2526, arrival: LX257} / {}
*/

// *If there is not enough information - missing date - just return the correct http error code,
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status.