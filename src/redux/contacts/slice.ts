import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchContacts,
  deleteContactThunk,
  addContactThunk,
} from "./operations";
import { logout } from "../auth/operations";
import { Contact, ContactsState } from "../../components/App/App.types";

const initialState: ContactsState = {
  items: [],
  searchStr: "",
  isLoading: false,
  isError: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(
        fetchContacts.fulfilled,
        (state, action: PayloadAction<Contact[]>) => {
          state.items = action.payload;
        }
      )

      .addCase(
        deleteContactThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
        }
      )

      .addCase(
        addContactThunk.fulfilled,
        (state, action: PayloadAction<Contact>) => {
          state.items.push(action.payload);
        }
      )

      .addCase(logout.fulfilled, () => initialState)

      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          deleteContactThunk.pending,
          addContactThunk.pending
        ),
        (state) => {
          state.isLoading = true;
          state.isError = null;
        }
      )

      .addMatcher(
        isAnyOf(
          fetchContacts.fulfilled,
          deleteContactThunk.fulfilled,
          addContactThunk.fulfilled
        ),
        (state) => {
          state.isLoading = false;
        }
      )

      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          deleteContactThunk.rejected,
          addContactThunk.rejected
        ),
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.isError = action.payload;
        }
      );
  },
});

export const contactsReducer = contactsSlice.reducer;
