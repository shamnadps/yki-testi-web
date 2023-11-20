import essays_en from './en/en';
import essays_es from './es/es';
import essays_fi from './fi/fi';
import essays_ml from './ml/ml';

const essays = [];
essays.push({ name: 'en', content:essays_en });
essays.push({ name: 'es', content:essays_es });
essays.push({ name: 'fi', content:essays_fi });
essays.push({ name: 'ml', content:essays_ml });

export default essays;
