# TSearch
Website: https://tsearch.pages.dev/

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
- Using all ATMs as an option will perform 138 (the atm list length) API calls, which is not preferred. The fetch only kicks in if three conditions are met (date range start, date range end, atm ID)

## Challenges
- getAtmPastFutureTransactions has unclear documentation, especially datetime. I had to guess the format it accepted for it to work. Correct format: 2 digit month, 2 digit day, 4 digit year twice
- Example: 0311202005122020

- The range of active transactions are unclear. But based on the screenshots, the assumption is transactions will be somewhere in the year 2020, as a QOL improvement, the date range is defaulted to the 2019-2021 range
- Get transaction log has no solid examples of what it does and what parameters are needed, it needs an atm ID and a datetime, but then again I do not have a solid time frame reference where this API will 100% work (solved through trial and error and using valid getAtmPastFutureTransactions parameters until I found the valid format)

- Example: a = 27, t = 20220311135458

## Approach
- Get basic frontend based on wireframe
- Transactions panel rely on several filters, so set up the filters first separately then package them to be sent into transactions
- The primary filters are the date range and ATM ID, additional filters only fetch from those results.

## Observations
- The software is doing nested API calls which is generally not best practice. getTransactionLog is dependent on a valid getAtmPastFutureTransactions that sends atmID and devtime that then performs calls per each valid transaction