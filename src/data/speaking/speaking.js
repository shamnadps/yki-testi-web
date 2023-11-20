import speaking_en from './en/en';
import speaking_es from './es/es';
import speaking_fi from './fi/fi';
import speaking_ml from './ml/ml';

const speaking = [];
speaking.push({ name: 'en', content:speaking_en });
speaking.push({ name: 'fi', content:speaking_fi });
speaking.push({ name: 'es', content:speaking_es });
speaking.push({ name: 'ml', content:speaking_ml });

export default speaking;
