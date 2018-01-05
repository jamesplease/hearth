import _ from 'lodash';

// These should be pulled from the market data at some point, but for
// now the values are hard-coded.
const MIN_YEAR = 1871;
const MAX_YEAR = 2017;

export default {
  empty(inputName) {
    const displayName = _.startCase(inputName);
    return `${displayName} is required.`;
  },
  tooSmall(inputName) {
    const displayName = _.startCase(inputName);
    return `${displayName} must be later than ${MIN_YEAR - 1}.`;
  },
  tooLarge(inputName, inputValue, inputs) {
    const displayName = _.startCase(inputName);
    return `${displayName} must be earlier than ${MAX_YEAR + 1}.`;
  },
  lessThanZero(inputName) {
    const displayName = _.startCase(inputName);
    return `${displayName} must be greater than 0.`;
  },
  NaN(inputName) {
    const displayName = _.startCase(inputName);
    return `${displayName} must be a number.`;
  },
  nonInteger(inputName) {
    const displayName = _.startCase(inputName);
    return `${displayName} must be an integer.`;
  },
  tooManyDollars(inputName) {
    const displayName = _.startCase(inputName);
    return `${displayName} must be less than one quadrillion dollars.`;
  },
  earlierThanEnd() {
    return 'The Start Year must be earlier than the End Year.';
  },
  laterThanStart() {
    return 'The End Year must be later than the Start Year.';
  },
  tooManyYears() {
    return 'The Number of Years must be less than 1000';
  },
  tooMuchInterest(inputName) {
    const displayName = _.startCase(inputName);
    return `${displayName} must be less than one million percent.`;
  },
  durationTooLong() {
    return 'The duration cannot be more than 300 years.';
  }
};
