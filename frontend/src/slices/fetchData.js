import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const fetchData = createAsyncThunk(
  'data/fetchData',
  async (authHeader) => {
    const { data } = await axios.get(routes.dataPath(), { headers: authHeader });

    return data;
  },
);

export default fetchData;
