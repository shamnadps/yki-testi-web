import conversation_en from './en/en';
import conversation_es from './es/es';
import conversation_fi from './fi/fi';
import conversation_ml from './ml/ml';

const conversations = [];
conversations.push({ name: 'en', content:conversation_en });
conversations.push({ name: 'fi', content:conversation_fi });
conversations.push({ name: 'es', content:conversation_es });
conversations.push({ name: 'ml', content:conversation_ml });

export default conversations;
