import { httpResource } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SortPreferencesStore } from '../sort-preferences.store';

type SortField = 'title' | 'author' | 'year';

interface BookDetails {
  id: string;
  title: string;
  author: string;
  country: string;
  language: string;
  pages: number;
  year: number;
  imageLink: string;
  link: string;
}

@Component({
  selector: 'ht-home-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageLayout, DecimalPipe, RouterLink],
  template: `
    <app-ui-page title="Books">
      <div class="books-container">
        <div class="header-section">
          <div class="title-and-prefs">
            <h2 class="books-title">Library Books</h2>
            <a routerLink="../prefs" class="prefs-link">Sort Preferences</a>
          </div>
          <div class="search-section">
            <input
              type="text"
              class="search-input"
              placeholder="Search by title or author..."
              [value]="searchQuery()"
              (input)="setSearchQuery($event.target.value)"
            />
          </div>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-label">Total Books</div>
              <div class="stat-value">{{ totalBooks() }}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Earliest Year</div>
              <div class="stat-value">{{ earliestYear() }}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Most Recent Year</div>
              <div class="stat-value">{{ mostRecentYear() }}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Avg Pages</div>
              <div class="stat-value">{{ averagePages() | number: '1.0-0' }}</div>
            </div>
          </div>
          @if (searchQuery()) {
            <div class="filter-info">
              Showing {{ filteredAndSortedBooks().length }} of {{ totalBooks() }} books
            </div>
          }
        </div>
        <div class="table-wrapper">
          <table class="books-table">
            <thead>
              <tr>
                <th
                  (click)="setSortField('title')"
                  class="sortable-header"
                  [class.active]="sortField() === 'title'"
                >
                  Title
                  <span class="sort-indicator">{{
                    sortField() === 'title' ? (isAscending() ? '↑' : '↓') : ''
                  }}</span>
                </th>
                <th
                  (click)="setSortField('author')"
                  class="sortable-header"
                  [class.active]="sortField() === 'author'"
                >
                  Author
                  <span class="sort-indicator">{{
                    sortField() === 'author' ? (isAscending() ? '↑' : '↓') : ''
                  }}</span>
                </th>
                <th
                  (click)="setSortField('year')"
                  class="sortable-header"
                  [class.active]="sortField() === 'year'"
                >
                  Year
                  <span class="sort-indicator">{{
                    sortField() === 'year' ? (isAscending() ? '↑' : '↓') : ''
                  }}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              @if (filteredAndSortedBooks().length === 0) {
                <tr>
                  <td colspan="3" class="no-results">No books found matching your search.</td>
                </tr>
              } @else {
                @for (book of filteredAndSortedBooks(); track book.id) {
                  <tr>
                    <td class="title-cell">
                      <a [routerLink]="['./details', book.id]" class="book-link">{{
                        book.title
                      }}</a>
                    </td>
                    <td class="author-cell">{{ book.author }}</td>
                    <td class="year-cell">{{ book.year }}</td>
                  </tr>
                }
              }
            </tbody>
          </table>
        </div>
      </div>
    </app-ui-page>
  `,
  styles: `
    .books-container {
      padding: 2rem;
      max-width: 1000px;
      margin: 0 auto;
    }

    .header-section {
      margin-bottom: 2rem;
      text-align: center;
    }

    .title-and-prefs {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      gap: 1rem;
    }

    .books-title {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0;
    }

    .search-section {
      margin: 0 0 1.5rem 0;
    }

    .search-input {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 0.375rem;
      font-size: 1rem;
      transition: border-color 0.2s;
    }

    .search-input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .filter-info {
      text-align: center;
      color: #6b7280;
      font-size: 0.875rem;
      margin: 1rem 0 0 0;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 0.75rem;
      padding: 1.5rem;
      color: white;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s;
    }

    .stat-card:hover {
      transform: translateY(-2px);
    }

    .stat-label {
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      opacity: 0.9;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 700;
    }

    .table-wrapper {
      overflow-x: auto;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border-radius: 0.5rem;
    }

    .books-table {
      width: 100%;
      border-collapse: collapse;
      background: white;
    }

    .books-table thead {
      background: #f3f4f6;
      border-bottom: 2px solid #e5e7eb;
    }

    .books-table th {
      padding: 1rem;
      text-align: left;
      font-weight: 600;
      color: #374151;
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .sortable-header {
      cursor: pointer;
      user-select: none;
      transition: background-color 0.2s;
    }

    .sortable-header:hover {
      background-color: #e5e7eb !important;
    }

    .sortable-header.active {
      background-color: #dbeafe;
      color: #1e40af;
    }

    .sort-indicator {
      margin-left: 0.5rem;
      font-size: 0.75rem;
    }

    .books-table tbody tr {
      border-bottom: 1px solid #e5e7eb;
      transition: background-color 0.2s;
    }

    .books-table tbody tr:hover {
      background-color: #f9fafb;
    }

    .books-table td {
      padding: 1rem;
      color: #4b5563;
    }

    .title-cell {
      font-weight: 500;
      color: #1f2937;
    }

    .book-link {
      color: #3b82f6;
      text-decoration: none;
      transition: all 0.2s;
      font-weight: 500;
    }

    .book-link:hover {
      color: #2563eb;
      text-decoration: underline;
    }

    .author-cell {
      color: #6b7280;
    }

    .year-cell {
      color: #9ca3af;
      font-weight: 500;
    }

    .no-results {
      text-align: center;
      color: #9ca3af;
      padding: 2rem 1rem;
      font-style: italic;
    }
  `,
})
export class HomePage {
  private store = inject(SortPreferencesStore);

  booksResource = httpResource(() => '/api/books');
  books = computed(() => (this.booksResource.value() ?? []) as BookDetails[]);

  sortField = this.store.sortField;
  isAscending = this.store.isAscending;
  searchQuery = signal('');

  totalBooks = computed(() => this.books().length);

  earliestYear = computed(() => {
    const bookList = this.books();
    return bookList.length > 0 ? Math.min(...bookList.map((b) => b.year)) : 'N/A';
  });

  mostRecentYear = computed(() => {
    const bookList = this.books();
    return bookList.length > 0 ? Math.max(...bookList.map((b) => b.year)) : 'N/A';
  });

  averagePages = computed(() => {
    const bookList = this.books();
    if (bookList.length === 0) return 0;
    const totalPages = bookList.reduce((sum, book) => sum + book.pages, 0);
    return totalPages / bookList.length;
  });

  sortedBooks = computed(() => {
    const bookList = [...this.books()];
    const field = this.sortField();
    const ascending = this.isAscending();

    bookList.sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      if (field === 'year') {
        return ascending
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      }

      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();

      if (ascending) {
        return aStr.localeCompare(bStr);
      } else {
        return bStr.localeCompare(aStr);
      }
    });

    return bookList;
  });

  filteredAndSortedBooks = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const books = this.sortedBooks();

    if (!query) {
      return books;
    }

    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query),
    );
  });

  setSortField(field: SortField) {
    if (this.sortField() === field) {
      this.store.setAscending(!this.isAscending());
    } else {
      this.store.setSortField(field);
      this.store.setAscending(true);
    }
  }

  setSearchQuery(query: string) {
    this.searchQuery.set(query);
  }
}
