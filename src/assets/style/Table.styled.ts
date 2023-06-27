import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/system'

export const CustomTableRow = styled(TableRow)(
  () => `
  &:hover  td{
    color: #fff;
    img.editIcon ,img.viewIcon {
        filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(306deg) brightness(104%) contrast(101%);
    }
  }
  `,
)

export const CustomTableHead = styled(TableHead)(
  ({ theme }) => `
   tr *{
    background-color: ${theme.palette.primary.main};
    color:${theme.palette.secondary.main};
    font-weight:bold
  }
  `,
)
export const CustomTableContainer = styled(TableContainer)(
  ({ theme }) => `
        position:relative;
        border: 2px solid ${theme.palette.secondary.main};
        border-radius: 10px;
        background-color:#fff;
        .MuiTable-root {
          max-height:300px
        }
        .MuiTablePagination-root{
          color:${theme.palette.primary.main};
          position: sticky;
          bottom: 0px;
          left: 0px;
          right: 0px;
          background: white;
        }
  `,
)
