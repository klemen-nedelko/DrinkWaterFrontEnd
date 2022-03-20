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
        color:'#E8EEF1',
    },
    WaterCard_two:{
        width:'40%',
        marginRight:'2.5%',
        display:'inline-block',
    },
        WaterChart:{
            width: '100%',
            backgroundColor:'#057DCD'
        },
        WaterChart_two:{
            width: '100%',
            backgroundColor:'#057DCD'
        },
        Total:{
            width:'50%',
            display:'inline-block',
            height:'8em !important',
            "&:hover":{
                backgroundColor:' rgba(255, 255, 255, 0.1)',
            }
        },
        tips:{
            width:'50%',
            display:'inline-block',
            height:'8em !important',
            "&:hover":{
                backgroundColor:' rgba(255, 255, 255, 0.1)',
            }
        },
        
        
      });
function Content()
{    
    const [info, setInformation] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [checked, setChecked] = useState(false);
    const [today_Amount, setTodayAmount] = useState([]);
    const [week_Amount, setWeekAmount] = useState([]);
    let today = new Date();
    today.setDate(today.getDate() - 7);
    let date = new Date(today).toLocaleDateString("de");
    const waterData = info.map((information) => information.amount);
    const waterDate = info.map((information) => information.data_water_input);
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
  const todayAmount = () =>{
    const userId = localStorage.getItem('id');
    const url= "http://localhost:8000/api/amountDisplayDay";
    const request = new Request(url,{
            method:'get',
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
      const today_Amount = data;
      setTodayAmount(today_Amount);
    }).catch(error =>{
      console.log(error);
  }) 
}
const weekAmount = () =>{
    const userId = localStorage.getItem('id');
    const url= "http://localhost:8000/api/amountDisplayWeek?users_id=" + userId;
    const request = new Request(url,{
            method:'get',
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
      const week_Amount = data;
      setWeekAmount(week_Amount);
    }).catch(error =>{
      console.log(error);
  }) 
}
    useEffect(() => {
        setTimeout(function(){getWater()},2000);
        setTimeout(function(){todayAmount()},2000);
        setTimeout(function(){weekAmount()},2000);
        setTimeout(function(){setIsLoading(false)},2200);
        setTimeout(function(){setChecked(true)},2500);
        },[]);
      const classes = useStyles();
    return (
        <>
        <Header/>
        <div>
            <Card className={classes.WaterCard}>
    <Typography variant="h2" component="h6" style={{'color': 
        '#E8EEF1',backgroundColor:'#057DCD'}}>Chart</Typography>
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
                                color: 'rgba(183, 207, 220, 1)',
                                fill: true,
                                data: info.map((information) => information.amount),
                                borderColor: [
                                    'rgba(183, 207, 220, 1)',
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
        'rgba(183, 207, 220, 1)'}} />}
    </div>
    </Card>
    <Card className={classes.WaterCard_two}>
    <Typography variant="h2" component="h6" style={{'color': 
        '#E8EEF1',backgroundColor:'#057DCD'}}>Pie</Typography>
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
                                    'rgba(183, 207, 220, 1)',
                                    'rgba(106, 171, 210, 1)',
                                    'rgba(56, 94, 114, 1)',
                                    'rgba(7, 102, 27,0.6)',
                                    'rgba(72, 12, 223,0.6)',
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
        'rgba(183, 207, 220, 1)'}} />}
    </div>
    </Card>


    <Card className={classes.WaterCard}>
    <Typography variant="h2" component="h6" style={{'color': 
        '#E8EEF1',backgroundColor:'#057DCD'}}>Statistics</Typography>
    <div className={classes.WaterChart}> 
    {!isLoading  ?
    <>
    <Zoom in={checked}>
        <Card  className={classes.Total} style={{backgroundColor:'#057DCD'}}>
            <Typography variant="h5" component="h6">Today</Typography>
            <Typography variant="h6" component="h6">
            <CountUp start={0} end={today_Amount} delay={0}>
            {({ countUpRef }) => (
             <div style={{'color': 'rgba(183, 207, 220, 1)'}} >
             <span ref={countUpRef} /> ml
            </div>
            )}
            </CountUp>
            </Typography>
            </Card>
            </Zoom>
            <Zoom in={checked} style={{ transitionDelay: checked ? '200ms' : '0ms' }}>
        <Card  className={classes.Total} style={{backgroundColor:'#057DCD'}}>
        <Typography variant="h5" component="h6">This week</Typography>
        <Typography variant="h6" component="h6" >
            <CountUp start={0} end={week_Amount} delay={0}>
            {({ countUpRef }) => (
             <div style={{'color': 'rgba(183, 207, 220, 1)'}} >
             <span ref={countUpRef} /> ml
            </div>
            )}
            </CountUp>
            </Typography>
        </Card>
        </Zoom>
        <Zoom in={checked} style={{ transitionDelay: checked ? '300ms' : '0ms' }}>
        <Card  className={classes.Total} style={{backgroundColor:'#057DCD'}}>
        <Typography variant="h5" component="h6">Avarage</Typography>
        <Typography variant="h6" component="h6">
            <CountUp start={0} end={average} delay={0}>
            {({ countUpRef }) => (
             <div style={{'color': 'rgba(183, 207, 220, 1)'}} >
             <span ref={countUpRef} /> ml
            </div>
            )}
            </CountUp>
            </Typography>
        </Card>
        </Zoom>
        <Zoom in={checked} style={{ transitionDelay: checked ? '400ms' : '0ms' }}>
        <Card  className={classes.Total}style={{backgroundColor:'#057DCD'}} >
        <Typography variant="h5" component="h6">Total</Typography>
        <Typography variant="h6" component="h6">
            <CountUp start={0} end={sum} delay={0} >
            {({ countUpRef }) => (
             <div style={{'color': 'rgba(183, 207, 220, 1)'}} >
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
    <Typography variant="h2" component="h6" style={{'color': 
        '#E8EEF1',backgroundColor:'#057DCD'}}>Tips</Typography>
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