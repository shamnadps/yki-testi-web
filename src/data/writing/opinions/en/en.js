import day_care from './day_care';
import driver_license from './drivers_license';
import eco_tourism from './eco_tourism';
import good_atomosphere from './good_atomosphere';
import grandfather from './grandfather';
import modern_fashion from './modern_fashion'
import newspapers from './newspapers';
import spending_money from './spending_money';
import use_medicines from './use_medicines';
import work_based_immigration from './work_based_immigration';
import renting from './renting_apartment';

const opinions_en = [];
  opinions_en.push({ name: 'Day Care', content:day_care });
  opinions_en.push({ name: 'Driver License', content:driver_license });
  opinions_en.push({ name: 'Eco Tourism', content:eco_tourism });
  opinions_en.push({ name: 'Good Atmosphere', content:good_atomosphere });
  opinions_en.push({ name: 'Grand Father', content:grandfather });
  opinions_en.push({ name: 'Online News Papers', content:newspapers });
  opinions_en.push({ name: 'Spending Money', content:spending_money });
  opinions_en.push({ name: 'Use of Medicines', content:use_medicines });
  opinions_en.push({ name: 'Modern Fashion', content:modern_fashion });
  opinions_en.push({ name: 'Work Based Immigration', content:work_based_immigration });
  opinions_en.push({ name: 'Renting or Buying', content:renting });

export default opinions_en;