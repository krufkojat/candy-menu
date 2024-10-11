import { atom } from "recoil";

export interface Business {
  name: string;
  address: string;
}

const defaultBusiness: Business = {
  name: "Kuchnia pod gruszą",
  address: "ul. Jagodzianki 345, 34-345 Jagodzianka",
};

export const businessState = atom({
  key: "Business",
  default: defaultBusiness,
});
