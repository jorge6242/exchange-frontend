import { Grid } from '@mui/material';
import "./App.css";
import { Home } from './containers/Home/Home';


const App = (): JSX.Element => {
  return (
    <Grid container spacing={24} ><Home /></Grid>
  );
}

export default App;
