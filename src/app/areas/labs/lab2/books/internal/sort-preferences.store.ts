import { Injectable, signal, effect } from '@angular/core';

export type SortField = 'title' | 'author' | 'year';

@Injectable({
  providedIn: 'root',
})
export class SortPreferencesStore {
  private readonly STORAGE_KEY = 'book-sort-preferences';

  sortField = signal<SortField>(this.loadSortField());
  isAscending = signal(this.loadIsAscending());

  constructor() {
    effect(() => {
      this.savePreferences();
    });
  }

  private loadSortField(): SortField {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const prefs = JSON.parse(stored);
        return prefs.sortField || 'title';
      } catch {
        return 'title';
      }
    }
    return 'title';
  }

  private loadIsAscending(): boolean {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const prefs = JSON.parse(stored);
        return prefs.isAscending !== false;
      } catch {
        return true;
      }
    }
    return true;
  }

  private savePreferences() {
    const prefs = {
      sortField: this.sortField(),
      isAscending: this.isAscending(),
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(prefs));
  }

  setSortField(field: SortField) {
    this.sortField.set(field);
  }

  setAscending(ascending: boolean) {
    this.isAscending.set(ascending);
  }
}
