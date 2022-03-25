import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
  hiddenInput: {
    display: 'none',
  },
  uploadContainer: {
    border: '1px solid',
    borderStyle: 'dashed',
    borderRadius: '5px',
    padding: '20px',
    color: "#707070",
  },
  uploadContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    '& span': {
      fontSize: '14px',
      marginTop: '5px'
    }
  }
}));

const Select = React.forwardRef((props, ref) => {
  const accept = props.accept;

  const changeHandler = (event) => {
    props.onFileChange && props.onFileChange(event.target.files[0]);
  };

  const classes = useStyles();

  class Counter extends React.Component {
    constructor(props) {
      super(props)
    }
    render() {
      return (
        <div>
          <input
            id={props.name}
            type="file"
            name={props.name}
            className={classes.hiddenInput}
            accept={accept}
            onChange={changeHandler}
          />
          <input className={classes.hiddenInput} name={props.name} ref={ref} onChange={props.onChange} onBlur={props.onBlur} />
          <label htmlFor={props.name}>
            <div className={classes.uploadContainer}>
              <div className={classes.uploadContent}>
                <CloudUploadIcon style={{ fontSize: 50 }} />
                <span>Browse files to start upload</span>
              </div>
            </div>
          </label>
        </div>
      )
    }
  }
  return <Counter />
});

export default Select;
