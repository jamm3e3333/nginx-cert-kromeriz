import Header from './components/Header';
import Temperature from './components/Temperature';
import { useTranslation } from 'react-i18next';

const lngs = {
  en: { nativeName: 'EN'},
  es: { nativeName: 'ES'},
  cz: { nativeName: 'CZ'}
}

const App = () => {
  const { t, i18n } = useTranslation();
  const setLangHandler = lang => {
    i18n.changeLanguage(lang);
  }
  return (
    <>
      <Header t={t} lngs={lngs} setLang={setLangHandler}/>
      <Temperature t={t} />
    </>
  );
}

export default App;
