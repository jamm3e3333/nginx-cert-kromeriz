import classes from './Header.module.css';
import { useEffect } from 'react';

const Header = props => {
    const selectedHandler = e => {
        props.setLang(e.target.value.toLowerCase());
    }
    
    const lngs = Object.keys(props.lngs);

    useEffect(() => {
        props.setLang('en');
    }, []);
    
    return (
        <header className={classes.header}>
            <select onChange={selectedHandler}>
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