import letters_en from './en/en';
import letters_es from './es/es';
import letters_fi from './fi/fi';
import letters_ml from './ml/ml';

const letters = [];
letters.push({ name: 'en', content:letters_en });
letters.push({ name: 'es', content:letters_es });
letters.push({ name: 'fi', content:letters_fi });
letters.push({ name: 'ml', content:letters_ml });

export default letters;
