import ReactGA from 'react-ga';

export default function Analytics(props) {
  ReactGA.set({ page: props.location.pathname + props.location.search });
  ReactGA.pageview(props.location.pathname + props.location.search);
  return null;
}
