import call_emergency from './call_emergency';
import call_restaurant from './call_restaurant';
import electricity_contract from './electricity_contract';
import issue_with_renovation from './issue_with_renovation';
import late_for_party from './late_for_party';
import pharmacy from './pharmacy';
import renting_apartment from './renting_apartment';
import renting_car from './renting_car';
import travel_plan from './travel_plan';
import weather from './weather';
import phrases from './phrases';

const speaking_ml = [];
speaking_ml.push({ name: 'Phrases', content:phrases });
speaking_ml.push({ name: 'Call Emergency', content:call_emergency });
speaking_ml.push({ name: 'Call Restaurant', content:call_restaurant });
speaking_ml.push({ name: 'Electricity Contract', content:electricity_contract });
speaking_ml.push({ name: 'Issue with Renovation', content:issue_with_renovation });
speaking_ml.push({ name: 'Late for Party', content:late_for_party });
speaking_ml.push({ name: 'Pharmacy', content:pharmacy });
speaking_ml.push({ name: 'Renting Apartment', content:renting_apartment });
speaking_ml.push({ name: 'Renting Car', content:renting_car });
speaking_ml.push({ name: 'Travel Plan', content:travel_plan });
speaking_ml.push({ name: 'Weather', content:weather });

export default speaking_ml;