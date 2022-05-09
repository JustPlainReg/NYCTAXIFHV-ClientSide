import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import { isNullOrUndefined } from 'util';
import Common from '../common/services/Common';
import {Bar,Line} from 'react-chartjs-2';
import { browserHistory } from 'react-router'
import Select from 'react-select';

let barData,tripsGreen;
let selectedZones,selectedMonths,currentLocationType,currentMapBy;
var Months,LocationTypes;

class ChartView extends React.Component {

  constructor (props) {
    super(props)    
   this.handleInputChange = this.handleInputChange.bind(this);
   this.changeMonth = this.changeMonth.bind(this);  
   this.ChangeMapBy = this.ChangeMapBy.bind(this);  
   this.applyFilter=this.applyFilter.bind(this);
   this.state={chartBy:'trips'}
   
  }
  componentDidMount () {  
    this.props.getBarChartData()  
  }
  handleInputChange(event)
  {
    const options = event.target.options;
   
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
    if (options[i].selected) {
      value.push(Number(options[i].value));
    }
  }    
  selectedZones=value   
  }
  applyFilter()
  {
    var search={zones:selectedZones,months:selectedMonths,chartBy:this.state.chartBy}
    this.props.getBarChartData(search)  
  }
  ChangeMapBy(event)
  {
    const target = event.target;
    const value = target.value;   
    this.setState({chartBy:value})       
  }

  changeMonth(event)
  {
    const options = event.target.options;
   
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
    if (options[i].selected) {
      value.push(Number(options[i].value));
    }
  }    
  selectedMonths=value   
  }
getSelectedMonth()
{
  return this.getDropdownSelectedValue('months');
}

getSelectedLocationType()
{
  return this.getDropdownSelectedValue('locationTypes');
}

getSelectedMapBy()
{
  return this.getDropdownSelectedValue('mapTypes');
}

getDropdownSelectedValue(id)
{
  var dd = document.getElementById(id);
  if(dd)
  return dd.options[dd.selectedIndex].value;
  else
  return undefined
}

DrawMixedChart(d)
{
  if(d!=undefined)
    {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
    datasets: [{
        label: 'Sales',
        type:'line',
        data: [51, 65, 40, 49, 60, 37, 40],
        fill: false,
        borderColor: '#EC932F',
        backgroundColor: '#EC932F',
        pointBorderColor: '#EC932F',
        pointBackgroundColor: '#EC932F',
        pointHoverBackgroundColor: '#EC932F',
        pointHoverBorderColor: '#EC932F',
        yAxisID: 'y-axis-2'
      },{
        type: 'bar',
        label: 'Visitor',
        data: [200, 185, 590, 621, 250, 400, 95],
        fill: false,
        backgroundColor: '#71B37C',
        borderColor: '#71B37C',
        hoverBackgroundColor: '#71B37C',
        hoverBorderColor: '#71B37C',
        yAxisID: 'y-axis-1'
      }]
  };
  
  const options = {
    responsive: true,
    tooltips: {
      mode: 'label'
    },
    elements: {
      line: {
        fill: false
      }
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            display: false
          },
          labels: {
            show: true
          }
        }
      ],
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          gridLines: {
            display: false
          },
          labels: {
            show: true
          }
        },
        {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y-axis-2',
          gridLines: {
            display: false
          },
          labels: {
            show: true
          }
        }
      ]
    }
  };
  
  const plugins = [{
      afterDraw: (chartInstance, easing) => {
          const ctx = chartInstance.chart.ctx;
          ctx.fillText("This text drawn by a plugin", 100, 100);
      }
  }];

  return (
    <div>      
      <Bar
        data={data}
        options={options}
        plugins={plugins}
      />
    </div>
  );
    }
}

getDatabyMapBy(t)
{
  switch(this.state.chartBy)
  {
    case 'tips': return t.tips
    case 'triptotal': return t.triptotal
    default: return t.trips
  }
}

getLabelText()
{
  switch(this.state.chartBy)
  {
    case 'tips': return "Tips"
    case 'triptotal': return "Average Total Trip Amount"
    default: return "Trips"
  }
}

DrawBarChart(data)
{
  if(data!=undefined)
    {
      var month = document.getElementById('months');
      var monthText="";
      if(month && month.selectedIndex>0)
      monthText ="For Month of "+ month.options[month.selectedIndex].innerHTML;
      var locationTypes = document.getElementById('locationypes');
      var locationTypesText="";
      if(locationTypes)
      locationTypesText = locationTypes.options[locationTypes.selectedIndex].innerHTML;      
      var tripMonths=Object.values(data).filter(t=>t.taxitype=='yellow').map(t=>t.month).sort(function(a, b){return a - b}).map((t)=>{
        return Common.getMonths()[t-1];
      });
      
      
      const chartdata = {
        labels: tripMonths,
        datasets: [
          {
            label: `Yellow Taxi ${this.getLabelText()}`,
            backgroundColor: 'rgba(255,255,51,1)',
            borderColor: 'rgba(255,255,102,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,255,51,1)',
            hoverBorderColor: 'rgba(0,0,0,1)',
            data: Object.values(data).filter(t=>t.taxitype=='yellow').map(t=>{
              return this.getDatabyMapBy(t)
            })
          },
          {
            label: `Green Taxi ${this.getLabelText()}`,
            backgroundColor: 'rgba(0,204,0,1)',
            borderColor: 'rgba(0,153,0,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(0,204,0,1)',
            hoverBorderColor: 'rgba(0,0,0,1)',
            data: Object.values(data).filter(t=>t.taxitype=='green').map(t=>{
              return this.getDatabyMapBy(t)
            })
          },
          /*{
            label: `Juno ${this.getLabelText()}`,
            backgroundColor: 'rgba(255,0,55,1)',
            borderColor: 'rgba(255,51,55,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,0,55,1)',
            hoverBorderColor: 'rgba(0,0,0,1)',
            data: Object.values(data).filter(t=>t.taxitype=='Juno').map(t=>{
              return this.getDatabyMapBy(t)
            })
          },*/
          {
            label: `Uber ${this.getLabelText()}`,
            backgroundColor: 'rgba(0,0,0,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(0,0,255,1)',
            hoverBorderColor: 'rgba(0,0,0,1)',
            data: Object.values(data).filter(t=>t.taxitype=='Uber').map(t=>{
              return this.getDatabyMapBy(t)
            })
          },
          {
            label: `Via ${this.getLabelText()}`,
            backgroundColor: 'rgba(0,217,255,1)',
            borderColor: 'rgba(0,255,255,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(0,217,255,1)',
            hoverBorderColor: 'rgba(0,0,0,1)',
            data: Object.values(data).filter(t=>t.taxitype=='Via').map(t=>{
              return this.getDatabyMapBy(t)
            })
          },
          {
            label: `Lyft ${this.getLabelText()}`,
            backgroundColor: 'rgba(255,102,255,1)',
            borderColor: 'rgba(255,174,255,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,102,255,1)',
            hoverBorderColor: 'rgba(0,0,0,1)',
            data: Object.values(data).filter(t=>t.taxitype=='Lyft').map(t=>{
              return this.getDatabyMapBy(t)
            })
          }
        ]
      };
      const lineChartdata = {
        labels: tripMonths,
        datasets: [
          {
            label: `Yellow Taxi ${this.getLabelText()}`,
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(255,255,51,1)',
            borderColor: 'rgba(255,255,102,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(255,255,51,1)',
            pointHoverBorderColor: 'rgba(0,0,0,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: Object.values(data).filter(t=>t.taxitype=='yellow').map(t=>{
              return this.getDatabyMapBy(t)
            })
          },
          {
            label: `Green Taxi ${this.getLabelText()}`,
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(0,204,0,1)',
            borderColor: 'rgba(0,153,0,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(0,204,0,1)',
            pointHoverBorderColor: 'rgba(0,0,0,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: Object.values(data).filter(t=>t.taxitype=='green').map(t=>{
              return this.getDatabyMapBy(t)
            })
          },
          /*{
            label: `Juno ${this.getLabelText()}`,
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(255,0,55,1)',
            borderColor: 'rgba(255,51,55,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(255,0,55,1)',
            pointHoverBorderColor: 'rgba(0,0,0,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: Object.values(data).filter(t=>t.taxitype=='Juno').map(t=>{
              return this.getDatabyMapBy(t)
            })
          },*/
          {
            label: `Uber ${this.getLabelText()}`,
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(0,0,0,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(0,0,0,1)',
            pointHoverBorderColor: 'rgba(0,0,0,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: Object.values(data).filter(t=>t.taxitype=='Uber').map(t=>{
              return this.getDatabyMapBy(t)
            })
          },
          {
            label: `Via ${this.getLabelText()}`,
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(0,217,255,1)',
            borderColor: 'rgba(0,255,255,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(0,217,255,1)',
            pointHoverBorderColor: 'rgba(0,0,0,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: Object.values(data).filter(t=>t.taxitype=='Via').map(t=>{
              return this.getDatabyMapBy(t)
            })
          },
          {
            label: `Lyft ${this.getLabelText()}`,
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(255,102,255,1)',
            borderColor: 'rgba(255,174,255,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(255,102,255,1)',
            pointHoverBorderColor: 'rgba(0,0,0,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: Object.values(data).filter(t=>t.taxitype=='Lyft').map(t=>{
              return this.getDatabyMapBy(t)
            })
          }
        ]
      };

      return (
        <div style={{padding:'30px'}}>
        <div style={{width:'500px',height:'400px'}}> 
        <Bar
          data={chartdata}
          width={400}
          height={300}
          options={{maintainAspectRatio: true,showLines: false }}
        />
      </div> 
      <div style={{width:'500px',height:'400px'}}>
      <Line data={lineChartdata}   width={400}
          height={300}/>
      </div> 
      </div>
      );
    }

}


   ZonesDropDown(zones)
  {    
    if(zones!=undefined)
    {
     return (
        <div>
          <div className="grid-x">
          <div className="small-2 cell"><label style={{fontSize:'14px'}}>Select Taxi PickUp Zone: </label> </div>
				<div className="small-6 cell">        
        <select  style={{width:'100%'}} multiple size='10'  onChange ={this.handleInputChange}>          
          {
            zones!=undefined && zones.map((r, index) => {
              return (
                <option value={r.locationid} key={index}>{r.borough}/{r.service_zone}/{r.zone}</option>
              )
            })
          }
        </select>      
       
        </div>
        </div>
        </div>
        
      )
    }
  }
  MonthsDropDown()
  {
    Months=[     
    {"text":"January","value":1},
    {"text":"February","value":2},
    {"text":"March","value":3},
    {"text":"April","value":4},
    {"text":"May","value":5},
    {"text":"June","value":6},
    {"text":"July","value":7},
    {"text":"August","value":8}
  ]
    return (
      <div>
        <div className="grid-x">
      <div className="small-2 cell">
      <label style={{fontSize:'14px'}}>Filter By Month: </label> 
      </div>
      <div className="small-6 cell">
      <select  style={{width:'150px'}} id="months" multiple size="6" onChange ={this.changeMonth}>          
        {
          Months.map((r, index) => {
            return (
              <option value={r.value} key={index} >{r.text}</option>
            )
          })
        }
      </select>
      </div>
      </div>
      </div>
      
    )
  }
  LocationTypeDropDown()
  {
    LocationTypes=[     
    {"text":"Pickup","value":'Pickup'},
    {"text":"Drop Off","value":'DO'}
  ];
  
    return (
      <div>
        <div className="grid-x">
      <div className="small-2 cell">
      <label  style={{fontSize:'14px'}}>Filter By Location Types: </label> 
      </div>
      <div className="small-3 cell">
      <select  style={{width:'80px'}} id="locationtypes" value={currentLocationType?currentLocationType:'Pickup'}  onChange ={this.handleInputChangeLocationType}>          
        {
          LocationTypes.map((r, index) => {
            return (
              <option value={r.value} key={index}>{r.text}</option>
            )
          })
        }
      </select>

     
      </div>
      </div>
      </div>
      
    )
  }
  mapByDropDown()
  {
    var mapTypes=[     
    {"text":"Trip Counts","value":'trips'},
    {"text":"Tip Amount","value":'tips'},
    {"text":"Average Trip Amount","value":'triptotal'}
  ];

    return (
      <div>
        <div className="grid-x">
      <div className="small-2 cell">
      <label  style={{fontSize:'14px'}}>Show Chart By: </label> 
      </div>
      <div className="small-3 cell">
      <select  style={{width:'170px'}} id="mapTypes" className="dropdown"   onChange ={this.ChangeMapBy}>          
        {
          mapTypes.map((r, index) => {
            return (
              <option value={r.value} key={index}>{r.text}</option>
            )
          })
        }
      </select>     
      </div>
      </div>
      </div>      
    )
  }
  

  render () {
    const search = this.props.search;
   if(search && search[0])
   {
    currentMonth=search[0].month;
    currentLocationType=search[0].locationType;
    currentMapBy=search[0].countBy;
   } 
    barData = get(this.props, 'BarChartData') || {}  
    var zones = get(this.props, 'zones') || {} 
    if (!barData[0] || !zones[0])
       {return(<div/>)}
    if (barData[0] && barData[0].length === 0) {
     
      return (
         <div className='em-cc-bp-notifications'>
          <div className='no-notifications'>
            <h3 className='text'>You do not have any trip data at this time.</h3>
          </div>
        </div>
       )
    }
    
    return (    
     
     
      <div className="grid-container full" style={{padding:'20px'}}> 
          
      {this.ZonesDropDown(zones[0]) }
        {this.MonthsDropDown()}
        {this.mapByDropDown()}
        <input type="button" value="Apply Filter" onClick ={this.applyFilter}></input>
    
        {//this.DrawMixedChart(barData[0])
            this.DrawBarChart(barData[0])
       }     
      
      </div>
    )
  }
}
ChartView.propTypes = {
  getBarChartData: PropTypes.func  
}
export default ChartView
