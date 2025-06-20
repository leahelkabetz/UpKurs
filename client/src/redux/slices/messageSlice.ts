// redux/messageSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MessageState {
  type: 'success' | 'error' | null;
  text: string;
}

const initialState: MessageState = {
  type: null,
  text: '',
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    showMessage: (state, action: PayloadAction<MessageState>) => {
      state.type = action.payload.type;
      state.text = action.payload.text;
    },
    clearMessage: (state) => {
      state.type = null;
      state.text = '';
    },
  },
});

export const { showMessage, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;
