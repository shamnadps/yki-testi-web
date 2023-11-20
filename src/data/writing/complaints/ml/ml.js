import bad_food from './bad_food';
import bathroom from './bathroom';
import late_train from './late_train';
import luggage_lost from './luggage_lost';
import restuarant from './restaurant';
import washingmachine from './washingmachine';

const complaints_ml = [];
complaints_ml.push({ name: 'Bad Food', content:bad_food });
complaints_ml.push({ name: 'Bathroom Smell', content:bathroom });
complaints_ml.push({ name: 'Late Train', content:late_train });
complaints_ml.push({ name: 'Lost Luggage', content:luggage_lost });
complaints_ml.push({ name: 'Restaurant food', content:restuarant });
complaints_ml.push({ name: 'Washing Machine', content:washingmachine });

export default complaints_ml;
