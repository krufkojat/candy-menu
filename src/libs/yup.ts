import * as yup from "yup";

yup.setLocale({
  mixed: {
    required: "Pole wymagane.",
    notType: "Niepoprawnie wypełnione pole.",
  },
  string: {
    min: ({ min }) => `Wprowadź minimalnie ${min} znaki.`,
    max: ({ max }) => `Wprowadź maksymalnie ${max} znaki.`,
    matches: "Niepoprawnie wypełnione pole.",
  },
});

export default yup;
