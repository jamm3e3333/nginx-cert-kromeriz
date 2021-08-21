import Card from './UI/Card';
import { useEffect, useState, useCallback, Fragment } from 'react';
import classes from './Temperature.module.css';

const local = 'http://192.168.0.33:3010/data';
const serv = 'https://jakubvala.com/api/data';

const Temperature = props => {
    const [isError, setIsError] = useState(false);
    const [temp, setTemp] = useState(undefined);
    const [date, setDate] = useState(undefined);
    let classTemp = '';
    if (Number.parseFloat(temp) > 30) {
        classTemp = classes['para__temp--high'];
    }
    else {
        classTemp = classes['para__temp--normal'];
    }
const fetchTemp = useCallback(async  () => {
    setIsError(false);
    try {
        const response = await fetch(serv); //specifyin the url
        if(response.status !== 200) {
            throw new Error('Bad request');
        }

        const data = await response.json();
        if(!data) {
            throw new Error('No data');
        }
        const { temp, date } = data;
        setTemp(temp);
        setDate(date);
    }
    catch(e){
        setIsError(true);
        console.log(e);
    }
}, []);

useEffect(() => {
    if(!isError){
        const fetchInt = setInterval(() => {
            fetchTemp();
        }, 5000);
        return () =>  clearInterval(fetchInt);
    }
}, [fetchTemp, isError])

const tempDiv = temp && date ? 
    <Card className={classes['container__temp']}>
        <p className={classes.para}>{props.t('temperatureDiv.date')}: </p>
        <p className={classes['para__date']}>{new Date(date).toLocaleString()}</p>
        <p className={classes.para}>{props.t('temperatureDiv.temp')}: </p>
        <p className={`${classes['para__temp']} ${classTemp && classTemp}`}>{temp}°C</p>
    </Card> : undefined;

return (
   <Fragment>
       {!isError && tempDiv}
   </Fragment>
)

}

export default Temperature;