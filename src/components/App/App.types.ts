

export interface Contact {
  id: string;
  name: string;
  number: string;
}


export interface ContactsState {
  items: Contact[];
  searchStr: string;
  isLoading: boolean;
  isError: string | null;
}
