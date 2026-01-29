import { Component, ChangeDetectionStrategy, signal, effect, WritableSignal } from '@angular/core';

export type prefs = {
    sortyBy: 'title' | 'year' | 'author',
    ascDsc: 'asc' | 'dsc'
}

@Component({
    selector: 'app-preferences-page',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
    template: `
        <div class = "flex flex-row">
            <label class="input">
                <span class="label">Sort by Title</span>
                <input type="radio" name="radio-6" class="radio radio-accent" [checked]="sortBy() === 'title'" (click)="setSort('title')" />
            </label>
            <label class="input">
                <span class="label">Sort by Author</span>
                <input type="radio" name="radio-6" class="radio radio-accent" [checked]="sortBy() === 'author'" (click)="setSort('author')" />
            </label>
            <label class="input">
                <span class="label">Sort by Publish Date</span>
                <input type="radio" name="radio-6" class="radio radio-accent" [checked]="sortBy() === 'year'" (click)="setSort('year')"/>
            </label>
        </div>
        <div class = "flex flex-row">
            <label class="input">
                <span class="label">Ascending</span>
                <input type="radio" name="radio-7" class="radio radio-accent" [checked]="ascDesc() === 'asc'" (click)="ascDesc.set('asc')"/>
            </label>
            <label class="input">
                <span class="label">Descending</span>
                <input type="radio" name="radio-7" class="radio radio-accent" [checked]="ascDesc() === 'dsc'" (click)="ascDesc.set('dsc')" />
            </label>
        </div>
    `,
    styles: ``
})
export class PreferencesPage {
    protected sortBy: WritableSignal<'title' | 'year' | 'author'>;
    protected ascDesc: WritableSignal<'asc' | 'dsc'>;
    
    protected setSort(sortType: 'title' | 'year' | 'author'){
        this.sortBy.set(sortType);
    }

    synchPrefs = effect(() => {
        localStorage.setItem('prefs', JSON.stringify({ 'sortyBy': this.sortBy(), 'ascDsc': this.ascDesc()}));
    })

    constructor() {
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