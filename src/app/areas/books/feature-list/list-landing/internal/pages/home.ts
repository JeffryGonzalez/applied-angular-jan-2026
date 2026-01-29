import { JsonPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, signal, OnInit } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { Book } from '../types/books';
import { Stats } from '../widgets/stats';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'ht-home-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageLayout, JsonPipe, Stats, NgIcon],
  template: `
    <app-ui-page title="list">
      @if (booksResource.hasValue()) {
        <app-book-stats [books]="booksResource.value()" />

        <div>
          <ul class="menu bg-base-200 lg:menu-horizontal rounded-box">
            <li>
              <a (click)="sortTitle()">
                @if (titleSortMethod() === 'desc') {
                  <ng-icon name="lucideArrowDownWideNarrow" size="20"></ng-icon>
                } @else {
                  <ng-icon name="lucideArrowUpNarrowWide" size="20"></ng-icon>
                }
                Title
              </a>
            </li>
            <li>
              <a (click)="sortAuthor()">
                @if (authorSortMethod() === 'desc') {
                  <ng-icon name="lucideArrowDownWideNarrow" size="20"></ng-icon>
                } @else {
                  <ng-icon name="lucideArrowUpNarrowWide" size="20"></ng-icon>
                }
                Author
              </a>
            </li>
            <li>
              <a (click)="sortYear()">
                @if (yearSortMethod() === 'asc') {
                  <ng-icon name="lucideArrowDownWideNarrow" size="20"></ng-icon>
                } @else {
                  <ng-icon name="lucideArrowUpNarrowWide" size="20"></ng-icon>
                }
                Year
              </a>
            </li>
          </ul>
        </div>

        <div class="grid grid-cols-4 gap-4">
          @for (book of booksResource.value(); track book.id) {
            <div class="card bg-neutral text-neutral-content w-96">
              <div class="card-body items-center text-center">
                <h2 class="card-title">{{ book.title }}</h2>
                <p>{{ book.year }}</p>
                <p>Written By: {{ book.author }}</p>
                <p>
                  <small>id: {{ book.id }}</small>
                </p>
              </div>
            </div>
          }
        </div>
      }
    </app-ui-page>
  `,
  styles: ``,
})
export class HomePage implements OnInit {
  booksResource = httpResource<Book[]>(() => '/api/books');

  yearSortMethod = signal<string>('asc');
  authorSortMethod = signal<string>('asc');
  titleSortMethod = signal<string>('asc');

  defaultSort = signal<string | null>(localStorage.getItem('DefaultSort'));
  defaultSortMethod = signal<string | null>(localStorage.getItem('DefaultSortMethod'));

  ngOnInit(): void {
    if (this.defaultSort()) {
      let sort = 'asc';
      if (this.defaultSortMethod()) {
        if (this.defaultSortMethod() === 'Ascending') {
          sort = 'asc';
        } else {
          sort = 'desc';
        }
      }

      switch (this.defaultSort()) {
        case 'Title':
          this.titleSortMethod.set(sort);
          this.sortTitle();
          break;
        case 'Author':
          this.authorSortMethod.set(sort);
          this.sortAuthor();
          break;
        case 'Year':
          this.yearSortMethod.set(sort);
          this.sortYear();
          break;
      }
    }
  }

  sortYear() {
    if (this.yearSortMethod() === 'asc') {
      this.yearSortMethod.set('desc');
      this.booksResource.value()?.sort((a, b) => (a.year < b.year ? -1 : 1));
    } else {
      this.yearSortMethod.set('asc');
      this.booksResource.value()?.sort((a, b) => (a.year > b.year ? -1 : 1));
    }
  }

  sortTitle() {
    if (this.titleSortMethod() === 'asc') {
      this.titleSortMethod.set('desc');
      this.booksResource.value()?.sort((a, b) => (a.title < b.title ? -1 : 1));
    } else {
      this.titleSortMethod.set('asc');
      this.booksResource.value()?.sort((a, b) => (a.title > b.title ? -1 : 1));
    }
  }

  sortAuthor() {
    if (this.authorSortMethod() === 'asc') {
      this.authorSortMethod.set('desc');
      this.booksResource.value()?.sort((a, b) => (a.author < b.author ? -1 : 1));
    } else {
      this.authorSortMethod.set('asc');
      this.booksResource.value()?.sort((a, b) => (a.author > b.author ? -1 : 1));
    }
  }
}
