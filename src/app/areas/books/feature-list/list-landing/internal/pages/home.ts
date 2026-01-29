import { JsonPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';

type book = {
  id: number;
  title: string;
  author: string;
  year: number;
}

@Component({
  selector: 'ht-home-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageLayout, JsonPipe],
  template: `
    <app-ui-page title="list">
      <div class="flex flex-row flex-wrap">
        @for(book of booksResource.value(); track book.id){
        <div class="card w-96 bg-base-100 card-md shadow-sm m-2">
          <!-- @let book = booksResource.value()?.[0]; -->
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
  booksResource = httpResource<book[]>(() => '/api/books');
}
