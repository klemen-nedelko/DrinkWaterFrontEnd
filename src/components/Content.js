import React, {useEffect, useState} from 'react';
import { Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';
import Header from "./Header";
import '../index.css';
import { Card } from '@mui/material';
import { Line, Pie} from 'react-chartjs-2';
import Zoom from '@mui/material/Zoom';
import CountUp from 'react-countup';
import CircularProgress from '@mui/material/CircularProgress';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


    const useStyles = makeStyles({
    WaterCard:{
        width:'50%',
        marginTop:'2%',
        marginLeft:'2%',
        marginRight:'2.5%',
        display:'inline-block',
        fontFamily:'Anton',
    },
    WaterCard_two:{
        width:'40%',
        marginRight:'2.5%',
        display:'inline-block',
    },
        WaterChart:{
            width: '100%',
        },
        WaterChart_two:{
            width: '100%',
        },
        Total:{
            width:'50%',
            display:'inline-block',
            height:'8em !important',
        },
        tips:{
            width:'50%',
            display:'inline-block',
            height:'8em !important',
        }
        
      });
function Content()
{    
    const [info, setInformation] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [checked, setChecked] = useState(false);
    let today = new Date();
    today.setDate(today.getDate() - 7);
    let date = new Date(today).toLocaleDateString("de");
    console.log(date);
    const waterData = info.map((information) => information.amount);
    const waterDate = info.map((information) => information.data_water_input);
    console.log(waterDate);
    let sum = waterData.reduce(function(prev, waterData){
        return parseInt(prev) + + parseInt(waterData)
      }, 0);

    let average = sum / waterData.length;
    const  getWater = () =>{
        const userId = localStorage.getItem('id');
        const url= "http://localhost:8000/api/amountDisplay?users_id="+userId;
        const request = new Request(url,{
                method:'GET',
                headers:{
                users_id:userId,
                
            }
      });
      return fetch(request).then(response =>{
        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.statusText);
          }
          return response.json();
      }).then(function(data){
          const info = data;
          setInformation(info);
        }).catch(error =>{
          console.log(error);
      }) 
  }
    useEffect(() => {
        setTimeout(function(){getWater()},2000);
        setTimeout(function(){setIsLoading(false)},2200);
        setTimeout(function(){setChecked(true)},2500);
        },[]);
      const classes = useStyles();
    return (
        <>
        <Header/>
        <div>
            <Card className={classes.WaterCard}>
    <Typography variant="h2" component="h6">Chart</Typography>
    <div className={classes.WaterChart}> 
    {!isLoading  ?
    <>
        <Line
                        data={{
                            labels: info.map((information) => information.date_water_input),
                            datasets: [{
                                drawLine: true,
                                type: "line",
                                label: 'Water Amount',
                                tension: 0.3,
                                fill: true,
                                data: info.map((information) => information.amount),
                                backgroundColor: [
                                    'rgba(147, 202, 237,0.2)',
                                ],
                            },
                            ],
                        }}
                        height={350}
                        width={200}
                        options={{
                            maintainAspectRatio: false,
                            x: {
                                type: "linear"
                            }
                        }} />
                        </>
        : <CircularProgress color="success" style={{'color': 
        'rgba(7, 102, 237,0.6)'}} />}
    </div>
    </Card>
    <Card className={classes.WaterCard_two}>
    <Typography variant="h2" component="h6">Pie</Typography>
    <div className={classes.WaterChart_two}> 
    {!isLoading  ?
    <>

        <Pie
                        data={{
                            labels: info.map((information) => information.date_water_input),
                            datasets: [{
                                label: 'Water Amount',
                                tension: 0.3,
                                fill: true,
                                data: info.map((information) => information.amount),
                                backgroundColor: [
                                    'rgba(147, 202, 237,0.4)',
                                    'rgba(147, 102, 237,0.4)',
                                    'rgba(7, 102, 237,0.4)',
                                    'rgba(7, 102, 27,0.4)',
                                    'rgba(72, 12, 223,0.4)',
                                ],
                            },
                            ],
                        }}
                        height={350}
                        width={200}
                        options={{
                            maintainAspectRatio: false,}}/>
                        </>
        : <CircularProgress color="success" style={{'color': 
        'rgba(7, 102, 237,0.6)'}} />}
    </div>
    </Card>


    <Card className={classes.WaterCard}>
    <Typography variant="h2" component="h6">Statistics</Typography>
    <div className={classes.WaterChart}> 
    {!isLoading  ?
    <>
    <Zoom in={checked}>
        <Card  className={classes.Total}>
            <Typography variant="h5" component="h6">Today</Typography>
            <Typography variant="h6" component="h6">
            <CountUp start={0} end={today} delay={0}>
            {({ countUpRef }) => (
             <div style={{'color': 'rgba(7, 102, 27,0.6)'}} >
             <span ref={countUpRef} /> ml
            </div>
            )}
            </CountUp>
            </Typography>
            </Card>
            </Zoom>
            <Zoom in={checked} style={{ transitionDelay: checked ? '200ms' : '0ms' }}>
        <Card  className={classes.Total}>
        <Typography variant="h5" component="h6">This week</Typography>
        <Typography variant="h6" component="h6">
            <CountUp start={0} end={sum} delay={0}>
            {({ countUpRef }) => (
             <div style={{'color': 'blue'}} >
             <span ref={countUpRef} /> ml
            </div>
            )}
            </CountUp>
            </Typography>
        </Card>
        </Zoom>
        <Zoom in={checked} style={{ transitionDelay: checked ? '300ms' : '0ms' }}>
        <Card  className={classes.Total}>
        <Typography variant="h5" component="h6">Avarage</Typography>
        <Typography variant="h6" component="h6">
            <CountUp start={0} end={average} delay={0}>
            {({ countUpRef }) => (
             <div style={{'color': 'red'}} >
             <span ref={countUpRef} /> ml
            </div>
            )}
            </CountUp>
            </Typography>
        </Card>
        </Zoom>
        <Zoom in={checked} style={{ transitionDelay: checked ? '400ms' : '0ms' }}>
        <Card  className={classes.Total}>
        <Typography variant="h5" component="h6">Total</Typography>
        <Typography variant="h6" component="h6">
            <CountUp start={0} end={sum} delay={0} >
            {({ countUpRef }) => (
             <div style={{'color': 'green'}} >
             <span ref={countUpRef} /> ml
            </div>
            )}
            </CountUp>
            </Typography>
        </Card>
        </Zoom>      
        </>
        : <CircularProgress color="success" style={{'color': 
        'rgba(7, 102, 237,0.6)'}} />}
    </div>
    </Card>
    <Card className={classes.WaterCard_two}>
    <Typography variant="h2" component="h6">Tips</Typography>
    <div className={classes.WaterChart_two}> 
    {!isLoading  ?
    <>
    <Zoom in={checked}>
    <Card  className={classes.tips}>
        <Typography variant="h5" component="h6">* Avarage per day you Should drink about 2l of Water</Typography>
    </Card>
    </Zoom>
    <Zoom in={checked} style={{ transitionDelay: checked ? '200ms' : '0ms' }}>
    <Card  className={classes.tips}>
        <Typography variant="h5" component="h6">* Carry a water bottle with you and refill it throughout the day.</Typography>
    </Card>
    </Zoom>
    <Zoom in={checked} style={{ transitionDelay: checked ? '300ms' : '0ms' }}>
    <Card  className={classes.tips}>
        <Typography variant="h5" component="h6">* Flavor it.</Typography>
        <Typography variant="h6" component="h6">
    Add fruit to your water. Lemons, limes and oranges are tried and true, also are delicious options.</Typography>
    </Card>
    </Zoom>
    <Zoom in={checked} style={{ transitionDelay: checked ? '400ms' : '0ms' }}>
    <Card  className={classes.tips}>
        <Typography variant="h5" component="h6">* Track it.</Typography>
        <Typography variant="h6" component="h6">
Invest in a high-tech bottle that connects to your smartphone and records how much you drink. </Typography>
    </Card></Zoom>
        </>
        : <CircularProgress color="success" style={{'color': 
        'rgba(7, 102, 237,0.6)'}} />}
    </div>
    </Card>

    </div>
    </>
    );
}


export default Content;