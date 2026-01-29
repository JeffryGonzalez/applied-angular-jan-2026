import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Book } from '../models/book';
type BookState = {
  bookList: Book[];
};
export const bookStore = signalStore(
  withState<BookState>({
    bookList: [],
  }),
  withMethods((store) => {
    return {
      storeBookList: (bookList: Book[]) => {
        patchState(store, { bookList: bookList });
      },
    };
  }),
);
