import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-prefs',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
    template: `
        <button class="btn btn-primary"  [class.btn-outline]="sortOrder !== 'asc'" (click)="toggleSortOrder('asc')">Sort Ascend</button>
        <button class="btn btn-secondary" [class.btn-outline]="sortOrder !== 'desc'" (click)="toggleSortOrder('desc')">Sort Descend</button>
    `,
    styles: ``
})
export class Prefs {
    sortOrder: 'asc' | 'desc' = localStorage.getItem('sortOrder') as 'asc' | 'desc' || 'asc';

    toggleSortOrder(order: 'asc' | 'desc') {
        this.sortOrder = order;
        localStorage.setItem('sortOrder', order);
        this.sortType();
    }

    sortType() {
        console.log(localStorage.getItem('sortOrder'));
    }
}