import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import { Container, Row, Col } from 'react-bootstrap';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deltaBreak: {
        columnDefs: [{
          headerName: "Make", field: "make", sortable: true, filter: true 
        }, {
          headerName: "Model", field: "model", sortable: true, filter: true 
          },{
          headerName: "Price", field: "price", sortable: true, filter: true 
        }],
        rowData: [{
          make: "Toyota", model: "Celica", price: 35000
        }, {
          make: "Ford", model: "Mondeo", price: 32000
        }, {
          make: "Porsche", model: "Boxter", price: 72000
        }]
      },
      detail: {
        columnDefs: [{
          headerName: "Make", field: "make", sortable: true, filter: true 
        }, {
          headerName: "Model", field: "model", sortable: true, filter: true 
          },{
          headerName: "Price", field: "price", sortable: true, filter: true 
        }],
        rowData: [{
          make: "Toyota", model: "Celica", price: 13500000
        }, {
          make: "Ford", model: "Mondeo", price: 13200000
        }, {
          make: "Porsche", model: "Boxter", price: 7200000
        }]      
      }
    };

    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.onGridReady = this.onGridReady.bind(this);
  }

  onSelectionChanged() {
    console.log("click");
    // alert("asfasf");
    let selectedNode = this.gridApi.getSelectedNodes()[0];
    // this.props.onSelectionChanged(selectedNode ? selectedNode.data.symbol : null);
    let price = this.state.detail.rowData[0]['price'];
    this.state.detail.rowData[0]['price'] = price+10;
    this.setState(this.state);
    console.log(this.state.detail.rowData[0].price);

    this.gridApi.refreshCells();

  }


  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;

    // // make realistic - call in a batch
    // let rowData = map(this.props.selectedExchange.supportedStocks, symbol => this.exchangeService.getTicker(symbol));
    // this.gridApi.updateRowData({add: rowData});

    // // select the first symbol to show the chart
    // this.gridApi.getModel().getRow(0).setSelected(true);

    // this.gridApi.sizeColumnsToFit();
  }

  render() {
    return (
      <div>
        <div>
        <div 
          className="ag-theme-balham"
          style={{ 
            height: '500px', 
            width: '600px' }} 
        >
          <AgGridReact
            columnDefs={this.state.deltaBreak.columnDefs}
            rowData={this.state.deltaBreak.rowData}
            rowSelection='single'
            onSelectionChanged={this.onSelectionChanged}>
          </AgGridReact>
        </div>

        <div 
          className="ag-theme-balham"
          style={{ 
            height: '500px', 
            width: '600px' }} 
        >
          <AgGridReact
            columnDefs={this.state.detail.columnDefs}
            rowData={this.state.detail.rowData}
            onGridReady={this.onGridReady}>
          </AgGridReact>
        </div>

        {/* <Col 
          className="ag-theme-balham"
          style={{ 
            height: '500px', 
            width: '600px' }} 
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}>
          </AgGridReact>
        </Col> */}
        </div>
      </div>
    );
  }
}

export default App;