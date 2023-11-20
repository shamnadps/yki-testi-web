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

const speaking_fi = [];
speaking_fi.push({ name: 'Phrases', content:phrases });
speaking_fi.push({ name: 'Call Emergency', content:call_emergency });
speaking_fi.push({ name: 'Call Restaurant', content:call_restaurant });
speaking_fi.push({ name: 'Electricity Contract', content:electricity_contract });
speaking_fi.push({ name: 'Issue with Renovation', content:issue_with_renovation });
speaking_fi.push({ name: 'Late for Party', content:late_for_party });
speaking_fi.push({ name: 'Pharmacy', content:pharmacy });
speaking_fi.push({ name: 'Renting Apartment', content:renting_apartment });
speaking_fi.push({ name: 'Renting Car', content:renting_car });
speaking_fi.push({ name: 'Travel Plan', content:travel_plan });
speaking_fi.push({ name: 'Weather', content:weather });

export default speaking_fi;