import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  summaryCards: {
    display: "flex",
    flexWrap: "wrap",
  },
  summaryCard: {
    margin: theme.spacing(3),
    flexGrow: 1,
    padding: `${theme.spacing(3)}px ${theme.spacing(3)}px 0`,
  },
  morePadding: {
    paddingTop: "20px",
    paddingBottom: "20px"
  }
}));

export default function SummaryCard({ value, component, morePadding }) {
  const classes = useStyles();

  return (
    <Paper variant={"outlined"} className={`${classes.summaryCard} ${(morePadding ? classes.morePadding : '')}`}>
      {component || (
        <Typography color={"primary"} variant="h3">
          {value}
        </Typography>
      )}
    </Paper>
  );
}