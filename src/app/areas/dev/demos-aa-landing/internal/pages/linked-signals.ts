import { Component, ChangeDetectionStrategy, signal, linkedSignal } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { CurrencyPipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-demos-aa-pages-linked-signals',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageLayout, CurrencyPipe, DecimalPipe],
  template: `
    <app-ui-page title="Linked Signals">
      <div class="space-y-6">
        <!-- Introduction -->
        <div class="alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="h-6 w-6 shrink-0 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div>
            <h3 class="font-bold">Product Pricing with Manual Override</h3>
            <div class="text-sm">
              This example demonstrates <code class="badge badge-sm">linkedSignal()</code> - a
              signal that derives its value from another signal but can also be manually overridden.
            </div>
          </div>
        </div>

        <!-- Main Card -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title text-2xl">Price Calculator</h2>

            <div class="grid gap-6 lg:grid-cols-2">
              <!-- Base Price Control -->
              <div class="space-y-4">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Base Price</span>
                    <span class="label-text-alt badge badge-primary">{{
                      basePrice() | currency
                    }}</span>
                  </label>
                  <input
                    type="number"
                    [value]="basePrice()"
                    (input)="basePrice.set(+$any($event.target).value)"
                    min="0"
                    step="0.01"
                    class="input input-bordered w-full"
                    placeholder="Enter base price"
                  />
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Discount Percentage</span>
                    <span class="label-text-alt badge badge-secondary"
                      >{{ discountPercent() }}% off</span
                    >
                  </label>
                  <input
                    type="range"
                    [value]="discountPercent()"
                    (input)="discountPercent.set(+$any($event.target).value)"
                    min="0"
                    max="50"
                    class="range range-secondary"
                  />
                  <div class="flex w-full justify-between px-2 text-xs">
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                  </div>
                </div>

                <div class="alert">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="h-6 w-6 shrink-0 stroke-current"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <div class="text-xs">
                    <ul class="space-y-1">
                      <li>• Sale price updates automatically</li>
                      <li>• You can manually override it</li>
                      <li>• Changes here reset manual overrides</li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Sale Price Control -->
              <div class="space-y-4">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Sale Price</span>
                    @if (isManualOverride()) {
                      <span class="label-text-alt badge badge-warning gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                        Override
                      </span>
                    }
                  </label>
                  <input
                    type="number"
                    [value]="salePrice()"
                    (input)="salePrice.set(+$any($event.target).value)"
                    min="0"
                    step="0.01"
                    class="input input-bordered w-full"
                    [class.input-warning]="isManualOverride()"
                    placeholder="Enter sale price"
                  />
                </div>

                <button (click)="resetToCalculated()" class="btn btn-outline btn-block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Reset to Calculated Price
                </button>

                @if (isManualOverride()) {
                  <div class="alert alert-warning">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 shrink-0 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <div class="text-xs">
                      <p class="font-bold">Manual Override Active</p>
                      <p>
                        Difference: {{ getPriceDifference() | currency }} ({{
                          getPriceDifferencePercent() | number: '1.1-1'
                        }}%)
                      </p>
                    </div>
                  </div>
                }
              </div>
            </div>

            <div class="divider"></div>

            <!-- Price Summary -->
            <div class="stats stats-vertical lg:stats-horizontal shadow">
              <div class="stat">
                <div class="stat-title">Base Price</div>
                <div class="stat-value text-2xl">{{ basePrice() | currency }}</div>
                <div class="stat-desc">Starting price</div>
              </div>

              <div class="stat">
                <div class="stat-title">Discount ({{ discountPercent() }}%)</div>
                <div class="stat-value text-2xl text-error">
                  -{{ calculateDiscount() | currency }}
                </div>
                <div class="stat-desc">Amount saved</div>
              </div>

              <div class="stat">
                <div class="stat-title">Calculated Price</div>
                <div class="stat-value text-2xl">{{ calculateSalePrice() | currency }}</div>
                <div class="stat-desc">Auto-computed</div>
              </div>

              <div class="stat">
                <div class="stat-title">Actual Sale Price</div>
                <div class="stat-value text-2xl" [class.text-warning]="isManualOverride()">
                  {{ salePrice() | currency }}
                </div>
                <div class="stat-desc">
                  @if (isManualOverride()) {
                    <span class="badge badge-warning badge-sm">Manual Override</span>
                  } @else {
                    <span class="badge badge-success badge-sm">Auto-calculated</span>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Code Explanation -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Code Implementation</h2>

            <div class="space-y-4">
              <div>
                <div class="badge badge-accent badge-outline mb-2">Source Signals</div>
                <div class="mockup-code">
                  <pre data-prefix="1"><code>basePrice = signal(99.99);</code></pre>
                  <pre data-prefix="2"><code>discountPercent = signal(20);</code></pre>
                </div>
              </div>

              <div>
                <div class="badge badge-accent badge-outline mb-2">Linked Signal</div>
                <div class="mockup-code">
                  <pre data-prefix="1"><code>salePrice = linkedSignal(() => {{ '{' }}</code></pre>
                  <pre data-prefix="2"><code>  const base = this.basePrice();</code></pre>
                  <pre
                    data-prefix="3"
                  ><code>  const discount = this.discountPercent() / 100;</code></pre>
                  <pre data-prefix="4"><code>  return base * (1 - discount);</code></pre>
                  <pre data-prefix="5"><code>{{ '}' }});</code></pre>
                </div>
              </div>

              <div>
                <div class="badge badge-accent badge-outline mb-2">Key Benefits</div>
                <div class="grid gap-3 md:grid-cols-2">
                  <div class="alert">
                    <div>
                      <div class="font-bold">Automatic Updates</div>
                      <div class="text-xs">
                        When basePrice or discountPercent changes, salePrice automatically
                        recalculates
                      </div>
                    </div>
                  </div>
                  <div class="alert">
                    <div>
                      <div class="font-bold">Manual Override</div>
                      <div class="text-xs">
                        You can call <code class="badge badge-xs">salePrice.set()</code> to override
                        the value
                      </div>
                    </div>
                  </div>
                  <div class="alert">
                    <div>
                      <div class="font-bold">Re-synchronization</div>
                      <div class="text-xs">
                        The linked signal automatically recomputes when dependencies change
                      </div>
                    </div>
                  </div>
                  <div class="alert">
                    <div>
                      <div class="font-bold">vs. Computed</div>
                      <div class="text-xs">
                        Unlike <code class="badge badge-xs">computed()</code>, linkedSignal allows
                        manual modifications
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </app-ui-page>
  `,
  styles: ``,
})
export class LinkedSignalsPage {
  // Source signals
  basePrice = signal(99.99);
  discountPercent = signal(20);

  // Linked signal: automatically derives from basePrice and discountPercent
  // but can also be manually overridden
  salePrice = linkedSignal(() => {
    const base = this.basePrice();
    const discount = this.discountPercent() / 100;
    return base * (1 - discount);
  });

  // Helper to calculate the expected sale price
  calculateSalePrice(): number {
    const base = this.basePrice();
    const discount = this.discountPercent() / 100;
    return base * (1 - discount);
  }

  // Helper to calculate discount amount
  calculateDiscount(): number {
    return this.basePrice() * (this.discountPercent() / 100);
  }

  // Check if the sale price has been manually overridden
  isManualOverride(): boolean {
    return Math.abs(this.salePrice() - this.calculateSalePrice()) > 0.01;
  }

  // Get the difference between manual and calculated price
  getPriceDifference(): number {
    return this.salePrice() - this.calculateSalePrice();
  }

  // Get the percentage difference
  getPriceDifferencePercent(): number {
    const calculated = this.calculateSalePrice();
    if (calculated === 0) return 0;
    return ((this.salePrice() - calculated) / calculated) * 100;
  }

  // Reset to the calculated value
  resetToCalculated(): void {
    this.salePrice.set(this.calculateSalePrice());
  }
}
