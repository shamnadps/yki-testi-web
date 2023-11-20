import barber_shop from "./barbershop";
import electricity_contract from "./electricity_contract";
import medical_emergency from "./medical_emergency";
import renting_apartment from "./renting_apartment";
import hobby_registration from "./hobby_registration";
import buying_car from "./buying_car";

const converstation_en = [];

converstation_en.push({ name: 'Barber Shop', content:barber_shop });
converstation_en.push({ name: 'Electricity Contract', content:electricity_contract });
converstation_en.push({ name: 'Medical Emergency', content:medical_emergency });
converstation_en.push({ name: 'Renting Apartment', content:renting_apartment });
converstation_en.push({ name: 'Buying Car', content:buying_car });
converstation_en.push({ name: 'Hobby Registration', content:hobby_registration });

export default converstation_en;