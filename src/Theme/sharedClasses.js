import { makeStyles, createStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => createStyles({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
    '& label': {
      fontSize: '0.9rem',
      color: '#707070',
      marginBottom: theme.spacing(1),
    },
    '& .inputContainer': {
      display: 'flex'
    },
    '& .error': {
      color: theme.palette.error.main,
      fontSize: '0.8rem',
      display: 'block',
      marginTop: theme.spacing(0.5)
    }
  },
  fullWidth: {
    width: '100%'
  },
  headerContainer: {
    position: "relative",
    height: "70px",
    margin: "0",
    '&.box': {
      height: '100px',
      backgroundColor: '#FFFFFF',
      borderBottom: 'solid 1px #cbcfd6',
    }
  },
  header: {
    display: "flex",
    position: "absolute",
    width: "calc(100%)",
    top: "0",
    padding: '30px 20px',
    alignItems: "flex-end",
    "& > *": {
      margin: `0 ${theme.spacing(1)}px`,
    },
  },
  actionGroup: {
    display: "flex",
    height: '36px',
    justifyContent: "flex-end",
    marginRight: 0,
  },
}));

