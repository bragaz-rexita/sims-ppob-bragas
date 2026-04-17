import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDataProfile, getDataBalance } from '../../api/api-home';

// ambil profile
export const fetchProfile = createAsyncThunk(
    'profile/fetchProfile',
    async (_, { rejectWithValue }) => {
        try {
            const res = await getDataProfile();
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ambil saldo
export const fetchBalance = createAsyncThunk(
    'profile/fetchBalance',
    async (_, { rejectWithValue }) => {
        try {
            const res = await getDataBalance();
            return res.data.balance;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profile: {},
        balance: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // PROFILE
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // BALANCE
            .addCase(fetchBalance.fulfilled, (state, action) => {
                state.balance = action.payload;
            });
    },
});

export default profileSlice.reducer;