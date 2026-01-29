import { Component, ChangeDetectionStrategy, computed, input } from '@angular/core';
import { book } from '../pages/home';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-stats-bar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [DecimalPipe],
    template: `@let stats = statsSignal();
      <div class="stats shadow flex flex-row bg-base-100 mt-auto m-2">
        <div class="stat place-items-center">
          <div class="stat-title">Number Of Books</div>
          <div class="stat-value text-primary">{{ stats.totalBooks }}</div>
        </div>
        <div class="stat place-items-center">
          <div class="stat-title">Earliest Published Book</div>
          <div class="stat-value text-primary">{{ stats.earliestBook }}</div>
        </div>
        <div class="stat place-items-center">
          <div class="stat-title">Latest Published Book</div>
          <div class="stat-value text-primary">{{ stats.latestBook }}</div>
        </div>
        <div class="stat place-items-center">
          <div class="stat-title">Average Page Count</div>
          <div class="stat-value text-primary">{{ stats.averagePages | number: '1.0-2' }}</div>
        </div>
      </div>`,
    styles: ``
})
export class Stats {
    bookArray = input.required<book[]>();
    
    protected statsSignal = computed(() => {
        if(!this.bookArray()){
            return {}
        }

        const totalBooks = this.bookArray().length;
        let pages = 0;
        let earliest: number | undefined = undefined;
        let latest: number | undefined = undefined;
        this.bookArray().forEach(responseBook => {
            pages += responseBook.pages;
            if (!earliest || earliest > responseBook.year){
                earliest = responseBook.year;
            }
            if (!latest || latest < responseBook.year){
                latest = responseBook.year;
            }
        });

        return {
            totalBooks: totalBooks,
            earliestBook: earliest,
            latestBook: latest,
            averagePages: pages / totalBooks
        }
    })
}