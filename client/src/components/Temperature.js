import Card from './UI/Card';
import { useEffect, useState, useCallback, Fragment } from 'react';
import classes from './Temperature.module.css';

const serv = 'https://jakubvala.com/api/data';

const Temperature = props => {
    const [isError, setIsError] = useState(false);
    const [temp, setTemp] = useState(undefined);
    const [hum, setHum] = useState(undefined);
    const [date, setDate] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);

    let classTemp = '';
    let classHum = '';

    if (Number.parseFloat(temp) > 30) {
        classTemp = classes['para__temp--high'];
    }
    else {
        classTemp = classes['para__temp--normal'];
    }

    if (Number.parseFloat(hum) > 80) {
        classHum = classes['para__temp--high'];
    }
    else {
        classHum = classes['para__temp--normal'];
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
        const { temp, hum, date } = data;

        setHum(hum);
        setTemp(temp);
        setDate(date);
    }
    catch(e){
        setIsError(true);
        console.log(e);
    }
}, []);


useEffect(() => {
    if(!isLoaded) {
        fetchTemp();
        setIsLoaded(true);
        console.log('updated');
    }
    if(!isError){
        console.log('on update');
        const fetchInt = setInterval(() => {
            fetchTemp();
        }, 60000);
        return () =>  clearInterval(fetchInt);
    }
}, [fetchTemp, isError])

const tempDiv = temp && date ? 
    <Card className={classes['container__temp']}>
        <p className={classes.para}>{props.t('temperatureDiv.date')}: </p>
        {date && <p className={classes['para__date']}>{new Date(date).toLocaleString()}</p>}

        <p className={classes.para}>{props.t('temperatureDiv.temp')}: </p>
        {temp && <p className={`${classes['para__temp']} ${classTemp && classTemp}`}>{temp} °C</p>}

        <p className={classes.para}>{props.t('temperatureDiv.hum')}: </p>
        {hum && <p className={`${classes['para__temp']} ${classTemp && classTemp}`}>{hum} %</p>}
    </Card> : undefined;

return (
   <Fragment>
       {!isError && tempDiv}
   </Fragment>
)

}

export default Temperature;