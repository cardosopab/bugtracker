import React from "react";
import { Button, ButtonGroup, Grid } from "@mui/material";
import { blue } from "@mui/material/colors";

interface PaginationButtonsProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };
  // Don't render if totalPages is less than 1
  if (totalPages < 2) {
    return null;
  }

  return (
    <Grid container justifyContent="center">
      <ButtonGroup>
        <Button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Prev
        </Button>
        <Button
          disabled
          style={{
            color: blue[600],
          }}
        >
          {`Page ${page} of ${totalPages}`}
        </Button>
        <Button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </ButtonGroup>
    </Grid>
  );
};

export default PaginationButtons;
