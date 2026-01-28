import { Component, signal, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <div class="space-y-4">
      <div class="card bg-base-200 shadow">
        <div class="card-body">
          <h3 class="card-title">Cart Items</h3>
          <div class="space-y-2">
            @for (item of cartItems(); track item.id) {
              <div class="card bg-base-100 shadow-sm">
                <div class="card-body p-3">
                  <div class="flex items-center justify-between">
                    <div class="flex-1">
                      <p class="font-medium">{{ item.name }}</p>
                      <p class="text-sm text-base-content/70">{{ item.price | currency }} each</p>
                    </div>
                    <div class="flex items-center gap-3">
                      <button
                        (click)="decrementQuantity(item.id)"
                        class="btn btn-sm btn-circle btn-outline"
                        [disabled]="item.quantity === 0"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M20 12H4"
                          />
                        </svg>
                      </button>
                      <span class="badge badge-lg">{{ item.quantity }}</span>
                      <button
                        (click)="incrementQuantity(item.id)"
                        class="btn btn-sm btn-circle btn-primary"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>

          <div class="divider"></div>

          <div class="stats stats-vertical shadow">
            <div class="stat">
              <div class="stat-title">Subtotal</div>
              <div class="stat-value text-2xl">{{ subtotal() | currency }}</div>
            </div>

            <div class="stat">
              <div class="stat-title">Tax (8%)</div>
              <div class="stat-value text-2xl text-warning">{{ tax() | currency }}</div>
            </div>

            <div class="stat">
              <div class="stat-title">Total</div>
              <div class="stat-value text-2xl text-primary">{{ total() | currency }}</div>
              <div class="stat-desc">
                <span class="badge badge-neutral">{{ totalItems() }} items</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ShoppingCartComponent {
  cartItems = signal([
    { id: 1, name: 'Laptop', price: 999.99, quantity: 1 },
    { id: 2, name: 'Mouse', price: 29.99, quantity: 2 },
    { id: 3, name: 'Keyboard', price: 79.99, quantity: 1 },
    { id: 4, name: 'Monitor', price: 299.99, quantity: 0 },
  ]);

  // Computed signals for cart
  subtotal = computed(() => {
    return this.cartItems().reduce((sum, item) => sum + item.price * item.quantity, 0);
  });

  tax = computed(() => {
    return this.subtotal() * 0.08;
  });

  total = computed(() => {
    return this.subtotal() + this.tax();
  });

  totalItems = computed(() => {
    return this.cartItems().reduce((sum, item) => sum + item.quantity, 0);
  });

  incrementQuantity(id: number) {
    this.cartItems.update((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
    );
  }

  decrementQuantity(id: number) {
    this.cartItems.update((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item,
      ),
    );
  }
}
