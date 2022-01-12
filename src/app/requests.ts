import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { instance } from "./axiosSettings";
import { TOrder } from "./reducer";
import { ToneMolecule } from "./reducer";

export const getMolecules = createAsyncThunk(
  "main/getMolecules",
  async function (_, { rejectWithValue }) {
    const res = await instance.get("molecules");
    if (res?.data && res.data.success) {
      return res.data.result;
    } else return rejectWithValue(res);
  }
);

export const getSalads = createAsyncThunk(
  "main/getSalads",
  async function (_, { rejectWithValue }) {
    const res = await instance.get("salads");
    if (res?.data && res.data.success) {
      return res.data.result;
    } else return rejectWithValue(res);
  }
);

export const getCurrentSalad = createAsyncThunk(
  "main/getCurrentSalad",
  async function (arg: { id: string }, { rejectWithValue }) {
    const { id } = arg;
    const res = await instance.get(`salad/${id}`);
    if (res?.data && res.data.success) {
      return res.data.result;
    } else return rejectWithValue(res);
  }
);

export const createOrder = createAsyncThunk(
  "main/createOrder",
  async function (arg: { order: Array<TOrder> }, { rejectWithValue }) {
    const res = await instance.post(`order`, {
      molecules: arg.order,
    });
    if (res?.data && res.data.success) {
      return res.data.result;
    } else return rejectWithValue(res);
  }
);

export const fetchImage = async (
  rightMolecule: ToneMolecule,
  setImg: React.Dispatch<React.SetStateAction<string>>
) => {
  if (rightMolecule) {
    const res = await axios.get(
      `http://test-job.webatom.ru${rightMolecule.image}`,
      {
        responseType: "blob",
      }
    );
    if (res.status === 200) {
      const imageObjectURL = URL.createObjectURL(await res.data);
      setImg(imageObjectURL);
    }
  }
};
