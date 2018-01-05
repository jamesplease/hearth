import {
  ONE_BILLION,
  ONE_TRILLION,
  ONE_QUADRILLION,
  ONE_QUINTILLION,
  ONE_SEXTILLION,
  ONE_SEPTILLION
} from './big-numbers';

// rawNumber: A number such as 124000000000
//
// Returns a formatted string suitable for display to the user, such as:
// "1.92 quadrillion"
//
// Anything greater than or equal to 1 billion dollars is given a string
// suffix, otherwise the "raw number" is returned.
export default function(rawNumber) {
  let adjustedNumber;
  let suffix = '';

  if (rawNumber >= ONE_SEPTILLION) {
    adjustedNumber = rawNumber / ONE_SEPTILLION;
    suffix = ' quintillion';
  } else if (rawNumber >= ONE_SEXTILLION) {
    adjustedNumber = rawNumber / ONE_SEXTILLION;
    suffix = ' quintillion';
  } else if (rawNumber >= ONE_QUINTILLION) {
    adjustedNumber = rawNumber / ONE_QUINTILLION;
    suffix = ' quintillion';
  } else if (rawNumber >= ONE_QUADRILLION) {
    adjustedNumber = rawNumber / ONE_QUADRILLION;
    suffix = ' quadrillion';
  } else if (rawNumber >= ONE_TRILLION) {
    adjustedNumber = rawNumber / ONE_TRILLION;
    suffix = ' trillion';
  } else if (rawNumber >= ONE_BILLION) {
    adjustedNumber = rawNumber / ONE_BILLION;
    suffix = ' billion';
  } else {
    adjustedNumber = rawNumber;
  }

  return `$${adjustedNumber.toLocaleString('en', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  })}${suffix}`;
}
