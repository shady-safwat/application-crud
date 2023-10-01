import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_,thunkAPI) => {
    try {
      const response = await axios.get(
        "https://650efcd854d18aabfe99b506.mockapi.io/users"
      );

      if(response.ok){
        throw new Error('Failed to fetch user');
      }
      
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue("Failed to get data user");
    }
  }
);

const initialState = {
  users: [],
  loading: false,
  error: null,
  searchData: '',
};

// the action to add user to data
export const addUser = createAsyncThunk(
  "user/addUser",
  async (user, thunkAPI) => {
    try {
      await axios.post(
        "https://650efcd854d18aabfe99b506.mockapi.io/users",
        user
      );
      thunkAPI.dispatch(fetchUser());
      const res = thunkAPI.getState().users;
      return res;
    } catch (error) {
      thunkAPI.rejectWithValue("Failed to add data user");
    }
  }
);

// the action to delete user from the data
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, thunkAPI) => {
    try {
      await axios.delete(
        `https://650efcd854d18aabfe99b506.mockapi.io/users/${id}`
      );
      thunkAPI.dispatch(fetchUser());
      const res = thunkAPI.getState().users;
      return res;
    } catch (error) {
      thunkAPI.rejectWithValue("Failed to delete data user");
    }
  }
);

// the action to update user from data
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    try {
      await axios.put(
        `https://650efcd854d18aabfe99b506.mockapi.io/users/${user.id}`,
        user
      );
      thunkAPI.dispatch(fetchUser());
      const res = thunkAPI.getState().users;
      return res;
    } catch (error) {
      thunkAPI.rejectWithValue("Failed to edit data user");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    searchUser : (state, action) => {
      state.searchData = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        state.users.filter((user) => user.id !== id);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        /* state.users.push(action.payload);  */
        state.users.map((user) =>
          user.id === action.payload ? action.payload : user
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { searchUser } = userSlice.actions;
export default userSlice.reducer;
