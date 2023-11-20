import complaints_en from './en/en';
import complaints_es from './es/es';
import complaints_fi from './fi/fi';
import complaints_ml from './ml/ml';

const complaints = [];
complaints.push({ name: 'en', content:complaints_en });
complaints.push({ name: 'fi', content:complaints_fi });
complaints.push({ name: 'es', content:complaints_es });
complaints.push({ name: 'ml', content:complaints_ml });

export default complaints;
