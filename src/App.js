import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import EnhancedTableHead from './EnhancedTableHead';
import axios from 'axios';


function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const styles = theme => ({
  root: {
    width: '50%',
    marginTop: theme.spacing.unit * 3,
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  table: {
    minWidth: 850,
  },
  twoup: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class App extends React.Component {
  constructor() {
    super()
    
    this.state = {
      repState: 'None',
      value: "representative",
      repName: '',
      repDistrict: '',
      repPhone: '',
      repOffice: '',
      searchDisabled: true,
      order: 'asc',
      orderBy: 'name',
      data: [],
      page: 0,
      rowsPerPage: 9,
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });


  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleMenuChange = event => {
    if (event.target.value === 'None') {
      this.setState({ searchDisabled: true });
    }else{
      this.setState({ searchDisabled: false });
    }
    this.setState({ [event.target.name]: event.target.value });
  };

  handleRadioChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSearchButtonClick = event => {
    this.getReps()
  }

  getReps(){
    if (this.state.repState !== 'None'){
        if (this.state.value === 'representative'){
          axios.get(`/representatives/${this.state.repState}`).then( results => {
            let data = results.data.results.map( (obj, idx) => {
              return Object.assign({id: idx}, obj);
            })
            this.setState({ data: data })
          })
        }else{
          axios.get(`/senators/${this.state.repState}`).then( results => {
            let data = results.data.results.map( (obj, idx) => {
              return Object.assign({id: idx}, obj);
            })
            this.setState({ data: data })
        })
      }
    }
  }

  populateRep(idx){
    this.setState({
      repName: this.state.data[idx].name,
      repDistrict: this.state.data[idx].district,
      repPhone: this.state.data[idx].phone,
      repOffice: this.state.data[idx].office
    })
  }

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <div>
      <form className={classes.root} autoComplete="off">
          <FormControl component="fieldset" className={classes.formControl}>  
            <RadioGroup
              name="rep"
              className={classes.group}
              value={this.state.value}
              onChange={this.handleRadioChange}
            >
              <FormControlLabel value="representative" control={<Radio />} label="Representative" />
              <FormControlLabel value="senator" control={<Radio />} label="Senator" />
            </RadioGroup>

            <Select
              value={this.state.repState}
              onChange={this.handleMenuChange}
              inputProps={{
                name: 'repState',
                id: 'state-simple',
              }}
            >
              <MenuItem value="None">
                <em>Select State...</em>
              </MenuItem>
              <MenuItem value="AL">Alabama</MenuItem>
              <MenuItem value="AK">Alaska</MenuItem>
              <MenuItem value="AZ">Arizona</MenuItem>
              <MenuItem value="AR">Arkansas</MenuItem>
              <MenuItem value="CA">California</MenuItem>
              <MenuItem value="CO">Colorado</MenuItem>
              <MenuItem value="CT">Connecticut</MenuItem>
              <MenuItem value="DE">Delaware</MenuItem>
              <MenuItem value="DC">District Of Columbia</MenuItem>
              <MenuItem value="FL">Florida</MenuItem>
              <MenuItem value="GA">Georgia</MenuItem>
              <MenuItem value="HI">Hawaii</MenuItem>
              <MenuItem value="ID">Idaho</MenuItem>
              <MenuItem value="IL">Illinois</MenuItem>
              <MenuItem value="IN">Indiana</MenuItem>
              <MenuItem value="IA">Iowa</MenuItem>
              <MenuItem value="KS">Kansas</MenuItem>
              <MenuItem value="KY">Kentucky</MenuItem>
              <MenuItem value="LA">Louisiana</MenuItem>
              <MenuItem value="ME">Maine</MenuItem>
              <MenuItem value="MD">Maryland</MenuItem>
              <MenuItem value="MA">Massachusetts</MenuItem>
              <MenuItem value="MI">Michigan</MenuItem>
              <MenuItem value="MN">Minnesota</MenuItem>
              <MenuItem value="MS">Mississippi</MenuItem>
              <MenuItem value="MO">Missouri</MenuItem>
              <MenuItem value="MT">Montana</MenuItem>
              <MenuItem value="NE">Nebraska</MenuItem>
              <MenuItem value="NV">Nevada</MenuItem>
              <MenuItem value="NH">New Hampshire</MenuItem>
              <MenuItem value="NJ">New Jersey</MenuItem>
              <MenuItem value="NM">New Mexico</MenuItem>
              <MenuItem value="NY">New York</MenuItem>
              <MenuItem value="NC">North Carolina</MenuItem>
              <MenuItem value="ND">North Dakota</MenuItem>
              <MenuItem value="OH">Ohio</MenuItem>
              <MenuItem value="OK">Oklahoma</MenuItem>
              <MenuItem value="OR">Oregon</MenuItem>
              <MenuItem value="PA">Pennsylvania</MenuItem>
              <MenuItem value="RI">Rhode Island</MenuItem>
              <MenuItem value="SC">South Carolina</MenuItem>
              <MenuItem value="SD">South Dakota</MenuItem>
              <MenuItem value="TN">Tennessee</MenuItem>
              <MenuItem value="TX">Texas</MenuItem>
              <MenuItem value="UT">Utah</MenuItem>
              <MenuItem value="VT">Vermont</MenuItem>
              <MenuItem value="VA">Virginia</MenuItem>
              <MenuItem value="WA">Washington</MenuItem>
              <MenuItem value="WV">West Virginia</MenuItem>
              <MenuItem value="WI">Wisconsin</MenuItem>
              <MenuItem value="WY">Wyoming</MenuItem>
            </Select>

            <Button variant="contained" className={classes.button} onClick={ this.handleSearchButtonClick } disabled={ this.state.searchDisabled } >
              Search
            </Button>
          </FormControl>
        </form>

        <div className={classes.twoup}>
        <Paper className={classes.root}>
          <Typography>
            Representatives
          </Typography>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="list of representatives">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {stableSort(data, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((n) => {
                    return (
                      <TableRow hover key={n.id} onClick={event => this.populateRep(n.id)}>
                        <TableCell>{n.name}</TableCell>
                        <TableCell>{n.party}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Paper>

        <Paper className={classes.root}>
          <Typography>
            Info
          </Typography>
          <Table className={classes.table} aria-labelledby="representative detail">
              <TableBody>
                
              <TableRow>
                  <TableCell>Name:</TableCell>
                  <TableCell>{this.state.repName}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>District:</TableCell>
                  <TableCell>{this.state.repDistrict}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Phone:</TableCell>
                  <TableCell>{this.state.repPhone}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Office:</TableCell>
                  <TableCell>{this.state.repOffice}</TableCell>
                </TableRow>
              </TableBody>
          </Table>

        </Paper>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
