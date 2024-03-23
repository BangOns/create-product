import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  product: [
    {
      id: uuidv4(),
      nameProduct: "laptop",
      category: "Electronics",
      freshness: "Brand New",
      priceProduct: "120000",
      descProduct: "lorem ipsum dolor sit amet",
      imgProduct: "laptop.img",
    },
  ],
 
  modals: {
    show: false,
    idProduct: "",
  },
  productEdit: {},
  messageError: "",
  isLoading: false,
};

// Fungsi untuk mengecek apakah product dengan name yang sama
async function checkProductisSame(InitialstateProduct, product) {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      const findProductWithName = InitialstateProduct?.find(
        (items) => items?.nameProduct === product?.nameProduct
      );
      if (findProductWithName) return reject("Product Name Already Exists");
      else return resolve(product);
    }, 500);
  });
}

// Implementasi redux thunk menggunakan createAsyncThunk yang dimiliki oleh redux toolkit
export const addProducts = createAsyncThunk(
  "product/addProduct",
  async (product, ThunkAPI) => {
    return await checkProductisSame(
      //  disini saya menggunakan getState() untuk mengambil data terbaru pada initialState
      ThunkAPI.getState().productSystem.product,
      product
    );
  }
);

const ManageProduct = createSlice({
  name: "product",
  initialState,
  reducers: {
    deleteProduct: (state, action) => {
      const deleted = state.product?.filter(
        (product) => product?.id !== action?.payload
      );
      return {
        ...state,
        product: deleted,
      };
    },
    setProductEdit: (state, action) => {
      return {
        ...state,
        productEdit: action.payload,
      };
    },
    editProduct: (state, action) => {
      let productUdpate = state.product.findIndex(
        (product) => product.id === action.payload.id
      );
      return void (state.product[productUdpate] = action.payload);
    },
    showModals: (state, action) => {
      state.modals = action?.payload;
    },
  },
  // Reducer yang digunakan untuk melakukan action addProducts
  extraReducers: (builder) => {
    builder.addCase(addProducts.fulfilled, (state, action) => {
      state.product?.push(action.payload);
      state.messageError = "";
      state.isLoading = false;
    });
    builder.addCase(
      addProducts.pending,
      (state) => void (state.isLoading = true)
    );

    builder.addCase(addProducts.rejected, (state, action) => {
      state.messageError = action.error?.message;
      state.isLoading = false;
    });
  },
});
export const {
  addProduct,
  deleteProduct,
  showModals,
  setProductEdit,
  editProduct,
} = ManageProduct.actions;

export default ManageProduct.reducer;
