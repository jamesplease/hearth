import ReactGA from 'react-ga';

const trackingId = 'UA-112339192-1';

export default function registerGoogleAnalytics() {
  ReactGA.initialize(trackingId);
}
