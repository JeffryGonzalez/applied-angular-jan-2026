import { httpResource } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, computed, signal, WritableSignal } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { Stats } from '../widgets/stats';
import { prefs } from './preferences'

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
    return this.booksResource?.value() ?? [];
  })

  private sortBy: WritableSignal<'title' | 'year' | 'author'>;
  private ascDesc: WritableSignal<'asc' | 'dsc'>;

  constructor(){
    const prefsItem = localStorage.getItem('prefs');
    
    if(!prefsItem){
        this.sortBy = signal('title');
        this.ascDesc = signal('asc');
    } else {
        const prefs = JSON.parse(prefsItem) as prefs;
        this.sortBy = signal(prefs.sortyBy);
        this.ascDesc = signal(prefs.ascDsc);
    }
  }
  
}
