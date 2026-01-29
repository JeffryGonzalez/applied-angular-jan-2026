import { httpResource } from '@angular/common/http';
import { computed } from '@angular/core';
import { signalStore, withComputed, withProps } from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';
import { BookEntity } from './types/bookEntity';

export const bookStore = signalStore(
  withProps(() => {
    const serverBooks = httpResource<BookEntity[]>(() => '/api/books');
    return {
      _serverBooks: serverBooks,
    };
  }),
  withEntities<BookEntity>(),
  withComputed((store) => {
    return {
      stats: computed(() => {
        const totalPages = store.entities().reduce((total, book) => total + book.pages, 0);
        const totalBooks = store.entities().length;
        const averagePages = totalPages === 0 ? 0 : totalPages / totalBooks;
        const latestPublished = store
          .entities()
          .reduce((max, book) => (book.year > max ? book.year : max), 0);
        const oldest = store
          .entities()
          .reduce((min, book) => (book.year < min ? book.year : min), 0);
        return {
          totalBooks,
          averagePages,
          totalPages,
          latestPublished,
          oldest,
        };
      }),
    };
  }),
);
