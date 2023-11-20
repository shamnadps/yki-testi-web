import bad_food from './bad_food';
import bathroom from './bathroom';
import late_train from './late_train';
import luggage_lost from './luggage_lost';
import restuarant from './restaurant';
import washingmachine from './washingmachine';

const complaints_es = [];
complaints_es.push({ name: 'Bad Food', content:bad_food });
complaints_es.push({ name: 'Bathroom Smell', content:bathroom });
complaints_es.push({ name: 'Late Train', content:late_train });
complaints_es.push({ name: 'Lost Luggage', content:luggage_lost });
complaints_es.push({ name: 'Restaurant food', content:restuarant });
complaints_es.push({ name: 'Washing Machine', content:washingmachine });

export default complaints_es;
