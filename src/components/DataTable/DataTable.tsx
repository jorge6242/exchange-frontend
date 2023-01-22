import {
  DataGrid,
  GridEventListener,
  GridValidRowModel,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { FC } from "react";
import { useStyles } from './styles'

interface IProps {
  rows: GridValidRowModel[];
  columns: any;
  onChangePage: any;
  totalPages: number;
  onHeaderClick?: GridEventListener<"columnHeaderClick"> | undefined;
}
// MuiDataGrid-menuIconButton
const DataTable: FC<IProps> = ({
  rows,
  columns,
  onChangePage,
  totalPages,
  onHeaderClick,
}): JSX.Element => {
  const classes = useStyles();
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={6}
        onPageChange={onChangePage}
        disableSelectionOnClick
        hideFooter
        hideFooterPagination
        onColumnHeaderClick={onHeaderClick}
        className={classes.container}
      />
    </Box>
  )
};

export default DataTable;
