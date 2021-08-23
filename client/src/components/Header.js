import classes from './Header.module.css';
import { useEffect, useState, useCallback } from 'react';

const Header = props => {
    const [sel, setSel] = useState('en');
    
    const lngs = Object.keys(props.lngs);

    const selectedHandler = useCallback(e => {
        props.setLang(e.target.value.toLowerCase());
    }, [props]);

    useEffect(() => {
        setSel(localStorage.i18nextLng);
    }, [selectedHandler]);
    
    return (
        <header className={classes.header}>
            <select className={classes['lang__selector']} value={sel.toUpperCase()} onChange={selectedHandler}>
                {lngs.map((lng) => {
                    return (
                        <option 
                            key={props.lngs[lng].nativeName}
                            value={props.lngs[lng].nativeName}
                        >
                            {props.lngs[lng].nativeName}
                        </option>
                    )
                })}
            </select>
            <p>
                {/* <Trans i18nKey="description.part1">
                    Edit <code>src/Header.js</code> and save to reload.
                </Trans> */}
            </p>
            <h1>{props.t('description.part2')}</h1>
        </header>    
    )
        
}

export default Header;