# TSearch

## Installation
- Clone the Repository
- Open the Command Terminal at the directory
- Type in the terminal `npm install`
- Once complete, type `npm run dev`

## Tech Stack
- Vite + React + TypeScript
- No External CSS Libraries

## Considerations
- Since the stack is using no external libraries, date range has been separated into two inputs (from and to).

## Challenges
- getAtmPastFutureTransactions has unclear documentation, especially datetime. I had to guess the format it accepted for it to work. Correct format: 2 digit month, 2 digit day, 4 digit year twice
- Example: 0311202005122020

## Approach
- Get basic frontend based on wireframe
- Transactions panel rely on several filters, so set up the filters first separately then package them to be sent into transactions