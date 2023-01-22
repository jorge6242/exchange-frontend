import { DataGrid, GridValidRowModel } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { FC } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface IProps {
  rows: GridValidRowModel[];
  columns: any;
  onChangePage: any;
  totalPages: number
}

const DataTable: FC<IProps> = ({
  rows,
  columns,
  onChangePage,
  totalPages
}): JSX.Element => {
  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={6}
          onPageChange={onChangePage}
          disableSelectionOnClick
          hideFooter
          hideFooterPagination
        />
        <Stack spacing={2}>
          <Pagination count={totalPages} onChange={onChangePage}  />
        </Stack>
      </Box>
    </>
  );
};

export default DataTable;
