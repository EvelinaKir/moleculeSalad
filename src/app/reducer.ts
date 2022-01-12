import { createSlice, PayloadAction, CaseReducer } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMolecules,
  getSalads,
  getCurrentSalad,
  createOrder,
} from "./requests";

export type ToneMolecule = {
  _id: string;
  title: string;
  qty: number;
  price: number;
  discount_price: number;
  image: string;
};

export type ToneSalad = {
  composition: Array<string>;
  discount_price: number;
  price: number;
  title: string;
  _id: string;
};

export type TOrder = {
  id: string;
  qty: number;
};

type TmainState = {
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: boolean;
  errorInfo: null | string;
  currentMolecule: null | ToneMolecule;
  currentSalad: null | ToneSalad;
  salads: null | Array<ToneSalad>;
  molecules: null | Array<ToneMolecule>;
  discounted: boolean;
  order: Array<{ molecule: ToneMolecule; qty: number }> | null;
  orderAnswer: null | string;
  defaultOrder: ToneSalad | null;
};

const mainState: TmainState = {
  loading: "idle",
  error: false,
  errorInfo: null,
  currentMolecule: null,
  currentSalad: null,
  salads: null,
  molecules: null,
  discounted: false,
  order: null,
  orderAnswer: null,
  defaultOrder: null,
};

export const mainSlice = createSlice({
  name: "main",
  initialState: mainState,
  reducers: {
    changeDiscount(state, action) {
      state.discounted = action.payload;
    },
    writeCurrentSalad(state, action) {
      state.currentSalad = action.payload;
    },
    writeError(state, action) {
      state.error = true;
      state.errorInfo = action.payload;
    },
    changeOrder(state, action) {
      state.order = action.payload;
    },
    changeDefaultOrder(state, action) {
      state.defaultOrder = action.payload;
    },
    cleanOrderAnswer(state) {
      state.orderAnswer = null;
    },
    makeDiscount(state) {
      state.discounted = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMolecules.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getMolecules.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.molecules = action.payload;
    });
    builder.addCase(getMolecules.rejected, (state) => {
      state.error = true;
      state.loading = "failed";
    });

    builder.addCase(getSalads.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getSalads.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.salads = action.payload;
    });
    builder.addCase(getSalads.rejected, (state) => {
      state.error = true;
      state.loading = "failed";
    });

    builder.addCase(getCurrentSalad.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getCurrentSalad.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.currentSalad = action.payload;
    });
    builder.addCase(getCurrentSalad.rejected, (state) => {
      state.error = true;
      state.loading = "failed";
    });

    builder.addCase(createOrder.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.orderAnswer = action.payload;
    });
    builder.addCase(createOrder.rejected, (state) => {
      state.error = true;
      state.loading = "failed";
    });
  },
});
export const {
  changeDiscount,
  writeCurrentSalad,
  writeError,
  changeOrder,
  changeDefaultOrder,
  cleanOrderAnswer,
  makeDiscount,
} = mainSlice.actions;
export const mainReducer = mainSlice.reducer;
