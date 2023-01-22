import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
       marginBottom: 20 ,
      '&.MuiDataGrid-menuIcon': {
        display: "none"
      },
      '&.MuiDataGrid-menuIcon:hover': {
        display: "none"
      }
    },
  }));
  