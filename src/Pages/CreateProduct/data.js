import { v4 as uuidv4 } from "uuid";

export const Article = {
  title: {
    id: "Buat Product",
    en: "Create Product",
  },
  buttonLanguage: {
    id: "Ubah Bahasa Inggris",
    en: "Change Language Indonesia",
  },
  buttonRandomNumber: {
    id: "Nomor Acak",
    en: "Random Number",
  },

  description: {
    id: "Di bawah ini adalah contoh formulir yang dibuat seluruhnya dengan kontrol formulir Bootstrap. Setiap grup formulir yang diperlukan memiliki status validasi yang dapat dipicu dengan mencoba mengirimkan formulir tanpa menyelesaikannya.",

    en: "Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.",
  },
};
export let Products = [
  {
    id: uuidv4(),
    nameProduct: "laptop",
    category: "Electronics",
    freshness: "Brand New",
    priceProduct: "120000",
    descProduct: "lorem ipsum dolor sit amet",
    imgProduct: "laptop.img",
    editProduct: false,
  },
];
