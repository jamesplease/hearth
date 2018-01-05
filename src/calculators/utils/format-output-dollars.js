import { ONE_BILLION, ONE_TRILLION, ONE_QUADRILLION } from './big-numbers';

// rawNumber: A number such as 1240000000
//
// Returns a formatted string suitable for display to the user, such as:
// "1.92 quadrillion"
//
// Anything greater than or equal to 1 billion dollars is given a string
// suffix, otherwise the "raw number" is returned.
export default function(rawNumber) {
  const number = Number(rawNumber);

  if (Number.isNaN(number)) {
    return '–';
  } else if (!Number.isSafeInteger(Math.round(number))) {
    return 'The number is too large to display.';
  }

  let adjustedNumber;
  let suffix = '';

  if (number >= ONE_QUADRILLION) {
    adjustedNumber = number / ONE_QUADRILLION;
    suffix = ' quadrillion';
  } else if (number >= ONE_TRILLION) {
    adjustedNumber = number / ONE_TRILLION;
    suffix = ' trillion';
  } else if (number >= ONE_BILLION) {
    adjustedNumber = number / ONE_BILLION;
    suffix = ' billion';
  } else {
    adjustedNumber = number;
  }

  return `$${adjustedNumber.toLocaleString('en', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  })}${suffix}`;
}
