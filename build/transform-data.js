const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const SOURCE_DIRECTORY = path.join(__dirname, '..', 'data');
const SOURCE_FILENAME = 'ie_data.csv';

const DESTINATION_DIRECTORY = path.join(__dirname, '..', 'src', 'common', 'data');
const DESTINATION_FILENAME = 'market-data.json';

const marketDataFileLoc = path.join(SOURCE_DIRECTORY, SOURCE_FILENAME);
const marketData = fs.readFileSync(marketDataFileLoc, 'utf-8');

const marketDataArray = marketData.split('\n').map(r => r.split(','));

// The number of columns in the table
const COLUMN_COUNT = marketDataArray[0].length;

// This is the array index of the CSV line that represents the header of the table
const HEADER_LINE = _.findIndex(marketDataArray, val => val[0] === 'Date');

// This is the first line that contains the market data (rather than headers/chart metadata)
const FIRST_DATA_LINE = HEADER_LINE + 1;

// The total number of rows that contain market data
const DATA_ROW_COUNT = (marketDataArray.length - 1) - FIRST_DATA_LINE;

// This is a mapping that represents the names of the columns on the chart
const attributeNames = [
  { displayName: 'Date', key: 'date' },
  { displayName: 'S&P Comp. (P)', key: 'comp' },
  { displayName: 'Dividend (D)', key: 'dividend' },
  { displayName: 'Earnings (E)', key: 'earnings' },
  { displayName: 'Consumer Price Index (CPI)', key: 'cpi' },
  { displayName: 'Date Fraction', key: 'dateFraction' },
  { displayName: 'Long Interest Rate GS10', key: 'lir' },
  { displayName: 'Real Price', key: 'realPrice' },
  { displayName: 'Real Dividend', key: 'realDividend' },
  { displayName: 'Real Earnings', key: 'realEarnings' },
  { displayName: 'Cyclically Adjusted Price Earnings Ratio (P/E10) or (CAPE)', key: 'cape' }
];

const dataByYear = {};

const dataRows = _.times(DATA_ROW_COUNT, n => n + FIRST_DATA_LINE);

const labeledData = _.chain(dataRows)
  .map(dataIndex => {
    const dataRow = marketDataArray[dataIndex];

    // This converts the array form of the row to be an object with keys mapped
    // to the `attributeNames` above
    const labeledRow = _.reduce(dataRow, (result, columnEntry, columnIndex) => {
      // First, we get the "key" for this column from the attribute names array above
      const columnName = attributeNames[columnIndex].key;

      // '\r' appears in every CAPE column, so we swap that out
      result[columnName] = columnEntry.replace('\r', '');
      return result;
    }, {});

    // Sometimes, there are placeholder or empty rows. We check the date column
    // to see if that's the case
    const rowIsEmpty = Boolean(labeledRow.date);
    return rowIsEmpty ? labeledRow : null;
  })
  // Filter out empty rows, which are returned as `null` above
  .filter()
  .value();

const marketDataJson = JSON.stringify(labeledData);

const destFileLoc = path.join(DESTINATION_DIRECTORY, DESTINATION_FILENAME);
fs.writeFileSync(destFileLoc, marketDataJson);
