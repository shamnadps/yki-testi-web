import barber_shop from "./barbershop";
import electricity_contract from "./electricity_contract";
import medical_emergency from "./medical_emergency";
import renting_apartment from "./renting_apartment";
import hobby_registration from "./hobby_registration";
import buying_car from "./buying_car";

const converstation_ml = [];

converstation_ml.push({ name: 'Barber Shop', content:barber_shop });
converstation_ml.push({ name: 'Electricity Contract', content:electricity_contract });
converstation_ml.push({ name: 'Medical Emergency', content:medical_emergency });
converstation_ml.push({ name: 'Renting Apartment', content:renting_apartment });
converstation_ml.push({ name: 'Buying Car', content:buying_car });
converstation_ml.push({ name: 'Hobby Registration', content:hobby_registration });

export default converstation_ml;