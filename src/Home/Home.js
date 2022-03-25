import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchFilter } from "../API/Filter/fetchFilter";
import { fetchOrder } from "../API/Order/fetchOrder";
import { fetchOrderDetail } from "../API/OrderDetail/fetchOrderDetail";

import Content from "../Dashboard/Content";
import SummaryCard from "../Components/Card/SummaryCard";
import Chart from "../Dashboard/Chart";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Collapse from "@material-ui/core/Collapse";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://react.school">
        Aemulus
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  statistic: {
    "& .heading": {
      textTransform: "uppercase",
      fontSize: "1.2rem",
      fontWeight: "700",
      color: "#989898",
      fontFamily: "Roboto",
    },
    "& .count": {
      color: "#5ebaca",
      ontFamily: "Arial",
    },
  },
}));

export function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [countries, setCountries] = useState([]);
  const [years, setYears] = useState([]);
  const [managers, setManagers] = useState([]);

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedManager, setSelectedManager] = useState("");
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState([]);

  useEffect(() => {
    dispatch(fetchFilter()).then((result) => {
      let countries = result.countries.map((item) => item.country);
      let years = result.orderYears.map((item) => item.year);

      setCountries(countries);
      setYears(years);
      setManagers(result.manager);
    });
  }, [dispatch]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleManagerChange = (event) => {
    setSelectedManager(event.target.value);
  };

  const onUpdate = () => {
    const data = {
      year: selectedYear,
      country: selectedCountry,
      manager: selectedManager,
    };
    dispatch(fetchOrder(data)).then((result) => {
      const array = [];

      for (let item in result) {
        array.push({ visible: false, detail: [] });
      }
      setOpen(array);
      setOrders(result);
    });
  };

  const onOpenDetail = (id, index) => {
    dispatch(fetchOrderDetail(id)).then((result) => {
      const shadow = [...open];
      shadow[index].detail = result;
      setOpen(shadow);
      console.log(shadow);
    });
  };

  const headCells = [
    {
      id: "orderNumber",
      numeric: false,
      disablePadding: true,
      label: "Order Number",
      width: 100,
    },
    {
      id: "date",
      numeric: false,
      disablePadding: false,
      label: "Date",
      width: 100,
    },
    {
      id: "phoneNumber",
      numeric: false,
      disablePadding: false,
      label: "Phone Number",
      width: 120,
    },
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "Name",
      width: 200,
    },
    {
      id: "address",
      numeric: false,
      disablePadding: false,
      label: "Address",
      width: 200,
    },
    {
      id: "country",
      numeric: false,
      disablePadding: false,
      label: "Country",
      width: 100,
    },
    {
      id: "status",
      numeric: false,
      disablePadding: false,
      label: "Status",
      width: 100,
    },
    {
      id: "total",
      numeric: false,
      disablePadding: false,
      label: "Total",
      width: 100,
    },
  ];

  function EnhancedTableHead(props) {
    const {
      classes,
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "default"}
              sortDirection={orderBy === headCell.id ? order : false}
              width={headCell.width ? headCell.width : null}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  return (
    <Content>
      <Grid container alignItems={"flex-start"}>
        <Grid item xs={12} lg={4}>
          <SummaryCard
            morePadding={true}
            value={
              <>
                <Select
                  variant="outlined"
                  value={selectedYear}
                  onChange={handleYearChange}
                >
                  {(years || []).map((item, i) => {
                    return (
                      <MenuItem key={i} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
              </>
            }
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <SummaryCard
            morePadding={true}
            value={
              <>
                <Select
                  variant="outlined"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                >
                  {(countries || []).map((item, i) => {
                    return (
                      <MenuItem key={i} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
              </>
            }
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <SummaryCard
            morePadding={true}
            value={
              <>
                <Select
                  variant="outlined"
                  value={selectedManager}
                  onChange={handleManagerChange}
                >
                  {(managers || []).map((item, i) => {
                    return (
                      <MenuItem key={i} value={item.employeeNumber}>
                        {item.firstName + " " + item.lastName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </>
            }
          />
        </Grid>
      </Grid>

      <Grid container alignItems={"flex-start"}>
        <Grid item xs={12} lg={4}>
          <Button
            color="primary"
            variant="contained"
            type="button"
            onClick={onUpdate}
          >
            Update
          </Button>
        </Grid>
      </Grid>

      <Grid container alignItems={"flex-start"}>
        <Grid item xs={12} lg={12}>
          <SummaryCard
            value={
              <>
                <TableContainer>
                  <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size={"small"}
                    aria-label="enhanced table"
                  >
                    <EnhancedTableHead
                      classes={classes}
                      rowCount={orders.length}
                    />
                    <TableBody>
                      {orders.map((row, index) => {
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <>
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              onClick={(e) => {}}
                              key={`order-${row.orderNumber}`}
                              style={{ cursor: "pointer" }}
                            >
                              <TableCell align="left">
                                {row.orderNumber}
                              </TableCell>
                              <TableCell align="right">
                                {row.orderDate}
                              </TableCell>
                              <TableCell align="right">{row.phone}</TableCell>
                              <TableCell align="right">
                                {row.customerName}
                              </TableCell>
                              <TableCell align="right">
                                {row.addressLine1}
                              </TableCell>
                              <TableCell align="right">{row.country}</TableCell>
                              <TableCell align="right">{row.status}</TableCell>
                              <TableCell align="right">{row.total}</TableCell>
                            </TableRow>
                            <TableRow>
                              <Button
                                color="primary"
                                variant="contained"
                                type="button"
                                onClick={() => {
                                  const shadow = [...open];
                                  shadow[index].visible =
                                    !shadow[index].visible;
                                  setOpen(shadow);
                                  console.log(row.orderNumber);
                                  onOpenDetail(row.orderNumber, index);
                                }}
                              >
                                Open
                              </Button>
                              <Collapse
                                in={open[index].visible}
                                timeout="auto"
                                unmountOnExit
                              >
                                <TableContainer>
                                  <Table
                                    className={classes.table}
                                    aria-labelledby="tableTitle"
                                    size={"small"}
                                    aria-label="enhanced table"
                                  >
                                    <TableBody>
                                      {open[index].detail.map(
                                        (childRow, index) => {
                                          const labelId = `enhanced-table-checkbox-${index}`;

                                          return (
                                            <>
                                              <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                onClick={(e) => {}}
                                                key={`detail-${row.productCode}`}
                                                style={{ cursor: "pointer" }}
                                              >
                                                <TableCell align="left">
                                                  {childRow.productCode}
                                                </TableCell>
                                                <TableCell align="left">
                                                  {childRow.productName}
                                                </TableCell>
                                                <TableCell align="left">
                                                  {childRow.quantityOrdered}
                                                </TableCell>
                                                <TableCell align="left">
                                                  {childRow.priceEach}
                                                </TableCell>
                                                <TableCell align="left">
                                                  {childRow.subtotal}
                                                </TableCell>
                                              </TableRow>
                                            </>
                                          );
                                        }
                                      )}
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </Collapse>
                            </TableRow>
                          </>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            }
          />
        </Grid>
      </Grid>

      <Chart salesData={orders} />
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Footer Content
        </Typography>
        <Copyright />
      </footer>
    </Content>
  );
}
