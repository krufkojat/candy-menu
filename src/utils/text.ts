export const capitalizeFirst = (str: string): string =>
  str.toString().charAt(0).toUpperCase() +
  str.toString().slice(1).toLowerCase();
