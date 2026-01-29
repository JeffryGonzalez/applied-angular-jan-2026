import { httpResource } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { Stats } from '../widgets/stats';

export type book = {
  id: number;
  title: string;
  author: string;
  year: number;
  pages: number;
}

@Component({
  selector: 'ht-home-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageLayout, Stats],
  template: `
    <app-ui-page title="list">
      <app-stats-bar [bookArray]="booksInOrder() ?? []"></app-stats-bar>
      <div class="flex flex-row-reverse"></div>
      <div class = "flex flex-row-reverse">
        <label class="input">
          <span class="label">Sort by Publish Date</span>
          <input type="radio" name="radio-6" class="radio radio-accent" [checked]="sortBy() === 'year'" (click)="setSort('year')"/>
        </label>
        <label class="input">
          <span class="label">Sort by Author</span>
          <input type="radio" name="radio-6" class="radio radio-accent" [checked]="sortBy() === 'author'" (click)="setSort('author')" />
        </label>
        <label class="input">
          <span class="label">Sort by Title</span>
          <input type="radio" name="radio-6" class="radio radio-accent" [checked]="sortBy() === 'title'" (click)="setSort('title')" />
        </label>
      </div>
      <div class = "flex flex-row-reverse">
        <label class="input">
          <span class="label">Descending</span>
          <input type="radio" name="radio-7" class="radio radio-accent" [checked]="ascDesc() === 'dsc'" (click)="ascDesc.set('dsc')" />
        </label>
        <label class="input">
          <span class="label">Ascending</span>
          <input type="radio" name="radio-7" class="radio radio-accent" [checked]="ascDesc() === 'asc'" (click)="ascDesc.set('asc')"/>
        </label>
      </div>
      <div class="flex flex-row flex-wrap">
        @for(book of booksInOrder(); track book.id){
        <div class="card w-96 bg-base-100 card-md shadow-sm m-2">
            <div class="card-body">
              <h2 class="card-title">{{book?.title}}</h2>
              <i>written by {{book?.author }}</i>
              <p>{{ book?.year}}</p>
              <div class="justify-end card-actions">
              </div>
            </div>
          </div>
        }
      </div>
    </app-ui-page>
  `,
  styles: ``,
})
export class HomePage {
  protected booksResource = httpResource<book[]>(() => '/api/books');
  protected sortBy = signal<'title' | 'year' | 'author'>('title');
  protected ascDesc = signal<'asc' | 'dsc'>('asc');

  protected booksInOrder = computed(() => {
    const multiplier = this.ascDesc() === 'asc' ? 1 : -1;
    switch(this.sortBy()){
      case 'title':
        return this.booksResource?.value()?.sort((a, b) => multiplier * a.title.localeCompare(b.title));
      case 'year':
        return this.booksResource?.value()?.sort((a, b) => multiplier * a.year - b.year);
      case 'author':
        return this.booksResource?.value()?.sort((a, b) => multiplier * a.author.localeCompare(b.author));
    }
  })

  protected setSort(sortType: 'title' | 'year' | 'author'){
    this.sortBy.set(sortType);
  }
}
