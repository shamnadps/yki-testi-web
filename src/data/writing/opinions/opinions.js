import opinions_en from './en/en';
import opinions_es from './es/es';
import opinions_fi from './fi/fi';
import opinions_ml from './ml/ml';

const opinions = [];
opinions.push({ name: 'en', content:opinions_en });
opinions.push({ name: 'es', content:opinions_es });
opinions.push({ name: 'fi', content:opinions_fi });
opinions.push({ name: 'ml', content:opinions_ml });

export default opinions;
