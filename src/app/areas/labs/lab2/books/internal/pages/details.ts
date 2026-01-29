import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { httpResource } from '@angular/common/http';
import { computed } from '@angular/core';

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
  selector: 'ht-details-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageLayout, CommonModule],
  template: `
    <app-ui-page title="Book Details">
      <div class="details-container">
        @if (book(); as book) {
          <div class="details-content">
            <div class="book-image-section">
              @if (book.imageLink) {
                <button class="image-link" disabled>View Book Image →</button>
              } @else {
                <div class="no-image">No Image Available</div>
              }
            </div>

            <div class="book-info-section">
              <h1 class="book-title">{{ book.title }}</h1>

              <div class="info-grid">
                <div class="info-item">
                  <label>Author:</label>
                  <span>{{ book.author }}</span>
                </div>

                <div class="info-item">
                  <label>Year:</label>
                  <span>{{ book.year }}</span>
                </div>

                <div class="info-item">
                  <label>Country:</label>
                  <span>{{ book.country }}</span>
                </div>

                <div class="info-item">
                  <label>Language:</label>
                  <span>{{ book.language }}</span>
                </div>

                <div class="info-item">
                  <label>Pages:</label>
                  <span>{{ book.pages }}</span>
                </div>

                <div class="info-item">
                  <label>ID:</label>
                  <span>{{ book.id }}</span>
                </div>
              </div>

              @if (book.link) {
                <div class="external-link">
                  <a
                    [href]="cleanLink(book.link)"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn-external"
                  >
                    View on Wikipedia →
                  </a>
                </div>
              }
            </div>
          </div>
        }
      </div>
    </app-ui-page>
  `,
  styles: `
    .details-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem;
    }

    .back-link {
      margin-bottom: 2rem;
    }

    .details-content {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 3rem;
      background: white;
      padding: 2rem;
      border-radius: 0.75rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .book-image-section {
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }

    .image-link {
      display: inline-block;
      background: #d1d5db;
      color: #6b7280;
      padding: 0.75rem 1.5rem;
      border-radius: 0.375rem;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.2s;
      border: none;
      cursor: not-allowed;
      font-family: inherit;
      font-size: 1rem;
    }

    .image-link:hover {
      background: #d1d5db;
      transform: none;
      box-shadow: none;
    }

    .no-image {
      width: 280px;
      height: 400px;
      background: #f3f4f6;
      border: 2px dashed #d1d5db;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #9ca3af;
      text-align: center;
      font-weight: 500;
    }

    .book-info-section {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .book-title {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0 0 1.5rem 0;
      line-height: 1.2;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .info-item label {
      font-size: 0.875rem;
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .info-item span {
      font-size: 1rem;
      color: #1f2937;
      font-weight: 500;
      word-break: break-word;
    }

    .external-link {
      margin-top: 1rem;
    }

    .btn-external {
      display: inline-block;
      background: #3b82f6;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 0.375rem;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.2s;
    }

    .btn-external:hover {
      background: #2563eb;
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .error-section {
      text-align: center;
      padding: 3rem;
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 0.5rem;
    }

    .error-message {
      color: #991b1b;
      font-size: 1.125rem;
      margin: 0 0 1rem 0;
    }

    @media (max-width: 768px) {
      .details-content {
        grid-template-columns: 1fr;
      }

      .book-image {
        max-width: 100%;
      }

      .info-grid {
        grid-template-columns: 1fr;
      }

      .book-title {
        font-size: 1.5rem;
      }
    }
  `,
})
export class DetailsPage {
  private route = inject(ActivatedRoute);

  booksResource = httpResource(() => '/api/books');
  bookId = signal<string | null>(null);

  book = computed(() => {
    const id = this.bookId();
    const books = (this.booksResource.value() ?? []) as BookDetails[];
    return id ? books.find((b) => b.id === id) || null : null;
  });

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    this.bookId.set(id);
  }

  getImagePath(imagePath: string): string {
    if (
      imagePath.startsWith('/') ||
      imagePath.startsWith('http') ||
      imagePath.startsWith('images')
    ) {
      return imagePath;
    }
    return '/' + imagePath;
  }

  cleanLink(link: string): string {
    return link.trim();
  }
}
