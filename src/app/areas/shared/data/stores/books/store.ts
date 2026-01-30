import { computed, effect } from '@angular/core';
import {
  patchState,
  signalStore,
  watchState,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import {
  addEntity,
  removeEntity,
  setEntities,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { httpResource } from '@angular/common/http';
import { Book } from './internal/types';

export type BookEntity = Book;

type BookState = {
  books: Book[];
};

type RawBooksFromServer = {
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number;
  id: number;
};

export const bookStore = signalStore(
  // state is like "initialState" in redux. What's there?
  // these are all "read only" signals, automatically created for you.
  withProps(() => {
    const serverBooks = httpResource<RawBooksFromServer[]>(() => '/api/books', {});
    return {
      _serverBooks: serverBooks,
    };
  }),
  withState<BookState>({
    books: [],
  }),
  withEntities<BookEntity>(),
  // instead of having a reducer that takes actions and switches on them, just create methods.
);
