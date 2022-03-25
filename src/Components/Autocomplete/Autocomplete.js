/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

const Tags = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const rows = props.list;
  const label = props.label;
  const [data, setData] = useState([]);

  useEffect(() => {
    if (rows.length > 0 && typeof props.value !== 'undefined') {
      setData(props.value.map(key => rows[rows.findIndex((item) => item._id === key._id)]));
    }
  }, [rows, props.value]);

  const changeHandler = (event, newValue) => {
    setData(newValue);
    props.onValueChange && props.onValueChange(event, newValue);
  };

  class Dropdown extends React.Component {
    constructor(props) {
      super(props)
    }
    render() {
      return (
        <div className={classes.root}>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={rows}
            getOptionLabel={(option) => option.name}
            defaultValue={[]}
            onChange={changeHandler}
            value={data}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                error={props.error}
                inputRef={ref}
                variant="outlined"
                placeholder={'Pick ' + label.toLowerCase() + 's'}
              />
            )}
          />
        </div >
      )
    }
  }
  return <Dropdown />
});

export default Tags;
