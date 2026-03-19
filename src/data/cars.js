import { ferrariCars } from "./ferrari";
import { lamborghiniCars } from "./lamborghini";
import { mclarenCars } from "./mclaren";
import { bugattiCars } from "./bugatti";
import { porscheCars } from "./porsche";
import { paganiCars } from "./pagani";
import { koenigseggCars } from "./koenigsegg";

export const carsData = [
  ...ferrariCars,
  ...lamborghiniCars,
  ...mclarenCars,
  ...bugattiCars,
  ...porscheCars,
  ...paganiCars,
  ...koenigseggCars,
];

export const brands = [...new Set(carsData.map(c => c.brand))].sort();
export const eras = [...new Set(carsData.map(c => c.era))].sort();