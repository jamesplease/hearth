import _ from 'lodash';
import getYearRange from './get-year-range';

export default {
  empty(inputName) {
    const displayName = _.startCase(inputName);
    return `${displayName} is required.`;
  },
  tooSmall(inputName) {
    const displayName = _.startCase(inputName);
    const { minYear } = getYearRange();
    return `${displayName} must be later than ${minYear - 1}.`;
  },
  tooLarge(inputName, inputValue, inputs) {
    const displayName = _.startCase(inputName);
    const { maxYear } = getYearRange();
    return `${displayName} must be earlier than ${maxYear + 1}.`;
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
  laterThanEnd() {
    return 'The Start Year must be earlier than the End Year.';
  },
  earlierThanStart() {
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
