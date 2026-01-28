import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { ShoppingCartComponent } from './computed-examples/shopping-cart';
import { UserProfileComponent } from './computed-examples/user-profile';
import { UserListComponent } from './computed-examples/user-list';
import { ConceptNotesModal } from '../../ui-data-display/concept-notes-modal';

@Component({
  selector: 'app-demos-aa-pages-computing',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PageLayout,
    ShoppingCartComponent,
    UserProfileComponent,
    UserListComponent,
    ConceptNotesModal,
  ],
  template: `
    <app-ui-page title="Computed Signals">
      <!-- Concept Notes Button -->
      <div class="mb-4 flex justify-end">
        <div class="tooltip tooltip-left" data-tip="Concept Notes">
          <button (click)="showNotesModal.set(true)" class="btn btn-circle btn-sm btn-ghost">
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
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div class="space-y-8">
        <!-- Example 1: Shopping Cart -->
        <section>
          <h2 class="mb-4 text-2xl font-bold">1. Shopping Cart Total</h2>
          <p class="mb-4">
            Demonstrates computed signals that automatically update when dependent signals change
          </p>
          <app-shopping-cart />
        </section>

        <!-- Example 2: User Profile -->
        <section>
          <h2 class="mb-4 text-2xl font-bold">2. User Profile Computed Values</h2>
          <p class="mb-4">
            Demonstrates multiple computed signals derived from the same source signals
          </p>
          <app-user-profile />
        </section>

        <!-- Example 3: Data Filtering and Sorting -->
        <section>
          <h2 class="mb-4 text-2xl font-bold">3. Filtered and Sorted List</h2>
          <p class="mb-4">Demonstrates computed signals for filtering and sorting operations</p>
          <app-user-list />
        </section>
      </div>

      <!-- Concept Notes Modal -->
      <app-demos-aa-concept-notes-modal
        title="Computed Signals - Reactive Derived State"
        [(isOpen)]="showNotesModal"
      >
        <div class="space-y-6">
          <div class="alert alert-success">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span
              ><strong>Computed signals</strong> are read-only signals that automatically derive
              their value from other signals and update whenever dependencies change.</span
            >
          </div>

          <div>
            <h4 class="mb-3 text-lg font-bold">What is a Computed Signal?</h4>
            <div class="mockup-code">
              <pre data-prefix="1"><code>// Source signals</code></pre>
              <pre data-prefix="2"><code>firstName = signal('John');</code></pre>
              <pre data-prefix="3"><code>lastName = signal('Doe');</code></pre>
              <pre data-prefix="4"><code></code></pre>
              <pre data-prefix="5"><code>// Computed signal - auto-updates!</code></pre>
              <pre data-prefix="6"><code>fullName = computed(() => {{'{'}}</code></pre>
              <pre
                data-prefix="7"
              ><code>  return this.firstName() + ' ' + this.lastName();</code></pre>
              <pre data-prefix="8"><code>{{'}'}});</code></pre>
            </div>
          </div>

          <div class="divider"></div>

          <div>
            <h4 class="mb-3 flex items-center gap-2 text-lg font-bold">
              <span class="badge badge-primary badge-lg">1</span>
              Shopping Cart Example
            </h4>
            <div class="space-y-3">
              <p>
                The shopping cart demonstrates <strong>chained computed signals</strong> where later
                computations depend on earlier ones:
              </p>
              <div class="card bg-base-200">
                <div class="card-body p-4">
                  <div class="space-y-2 text-sm">
                    <div class="flex items-center gap-2">
                      <span class="badge badge-sm">1</span>
                      <code class="badge badge-neutral">cartItems</code>
                      <span>→ Source signal (array of items)</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="badge badge-sm">2</span>
                      <code class="badge badge-primary">subtotal</code>
                      <span>→ Computed from cartItems</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="badge badge-sm">3</span>
                      <code class="badge badge-primary">tax</code>
                      <span>→ Computed from subtotal</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="badge badge-sm">4</span>
                      <code class="badge badge-primary">total</code>
                      <span>→ Computed from subtotal + tax</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="alert alert-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <strong>Try it:</strong> Change any item quantity and watch all computed values
                  (subtotal, tax, total) update automatically!
                </div>
              </div>
            </div>
          </div>

          <div class="divider"></div>

          <div>
            <h4 class="mb-3 flex items-center gap-2 text-lg font-bold">
              <span class="badge badge-secondary badge-lg">2</span>
              User Profile Example
            </h4>
            <div class="space-y-3">
              <p>
                The user profile shows <strong>multiple computed signals</strong> derived from the
                same source signals:
              </p>
              <div class="grid gap-3 md:grid-cols-2">
                <div class="card bg-base-200">
                  <div class="card-body p-3">
                    <h5 class="card-title text-sm">Source Signals</h5>
                    <ul class="space-y-1 text-xs">
                      <li>• <code class="badge badge-xs">firstName</code></li>
                      <li>• <code class="badge badge-xs">lastName</code></li>
                      <li>• <code class="badge badge-xs">birthYear</code></li>
                    </ul>
                  </div>
                </div>
                <div class="card bg-base-200">
                  <div class="card-body p-3">
                    <h5 class="card-title text-sm">Computed Values</h5>
                    <ul class="space-y-1 text-xs">
                      <li>• <code class="badge badge-xs badge-primary">fullName</code></li>
                      <li>• <code class="badge badge-xs badge-primary">initials</code></li>
                      <li>• <code class="badge badge-xs badge-primary">age</code></li>
                      <li>
                        • <code class="badge badge-xs badge-primary">displayName</code> (depends on
                        fullName + age)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="mockup-code">
                <pre data-prefix="1"><code>age = computed(() => {{'{'}}</code></pre>
                <pre
                  data-prefix="2"
                ><code>  const currentYear = new Date().getFullYear();</code></pre>
                <pre data-prefix="3"><code>  return currentYear - this.birthYear();</code></pre>
                <pre data-prefix="4"><code>{{'}'}});</code></pre>
              </div>
            </div>
          </div>

          <div class="divider"></div>

          <div>
            <h4 class="mb-3 flex items-center gap-2 text-lg font-bold">
              <span class="badge badge-accent badge-lg">3</span>
              User List Example
            </h4>
            <div class="space-y-3">
              <p>
                The user list demonstrates <strong>complex computations</strong> for filtering and
                sorting data:
              </p>
              <div class="mockup-code">
                <pre
                  data-prefix="1"
                ><code>filteredAndSortedUsers = computed(() => {{'{'}}</code></pre>
                <pre data-prefix="2"><code>  let result = this.users();</code></pre>
                <pre data-prefix="3"><code>  </code></pre>
                <pre data-prefix="4"><code>  // Filter by search term</code></pre>
                <pre data-prefix="5"><code>  if (this.searchTerm()) {{'{'}}</code></pre>
                <pre data-prefix="6"><code>    result = result.filter(/* ... */);</code></pre>
                <pre data-prefix="7"><code>  {{'}'}}</code></pre>
                <pre data-prefix="8"><code>  </code></pre>
                <pre data-prefix="9"><code>  // Filter by status</code></pre>
                <pre data-prefix="10"><code>  // Sort by selected field</code></pre>
                <pre data-prefix="11"><code>  </code></pre>
                <pre data-prefix="12"><code>  return result;</code></pre>
                <pre data-prefix="13"><code>{{'}'}});</code></pre>
              </div>
              <div class="alert alert-warning">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 shrink-0 stroke-current"
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
                <div>
                  <strong>Performance:</strong> The computed signal only re-runs when
                  <code class="badge badge-xs">searchTerm</code>,
                  <code class="badge badge-xs">statusFilter</code>, or
                  <code class="badge badge-xs">sortBy</code> changes!
                </div>
              </div>
            </div>
          </div>

          <div class="divider"></div>

          <div>
            <h4 class="mb-3 text-lg font-bold">🎯 Key Benefits of Computed Signals</h4>
            <div class="space-y-2">
              <div class="alert">
                <span class="badge badge-primary">1</span>
                <span
                  ><strong>Automatic Updates:</strong> No manual subscriptions or change detection
                  needed</span
                >
              </div>
              <div class="alert">
                <span class="badge badge-secondary">2</span>
                <span
                  ><strong>Efficient:</strong> Only recalculate when dependencies actually
                  change</span
                >
              </div>
              <div class="alert">
                <span class="badge badge-accent">3</span>
                <span
                  ><strong>Composable:</strong> Build complex computations from simpler ones</span
                >
              </div>
              <div class="alert">
                <span class="badge badge-warning">4</span>
                <span><strong>Type-Safe:</strong> Full TypeScript support with inference</span>
              </div>
              <div class="alert">
                <span class="badge badge-success">5</span>
                <span
                  ><strong>Declarative:</strong> Describe what you want, not how to calculate
                  it</span
                >
              </div>
            </div>
          </div>

          <div class="divider"></div>

          <div>
            <h4 class="mb-3 text-lg font-bold">📚 Comparison with RxJS</h4>
            <div class="grid gap-3 md:grid-cols-2">
              <div class="card bg-base-200">
                <div class="card-body p-4">
                  <h5 class="card-title text-sm">RxJS (Old Way)</h5>
                  <ul class="space-y-1 text-xs">
                    <li>❌ Manual subscriptions</li>
                    <li>❌ Memory leak risks</li>
                    <li>❌ combineLatest/map chains</li>
                    <li>❌ takeUntil patterns</li>
                    <li>❌ AsyncPipe everywhere</li>
                  </ul>
                </div>
              </div>
              <div class="card bg-success text-success-content">
                <div class="card-body p-4">
                  <h5 class="card-title text-sm">Computed Signals (New Way)</h5>
                  <ul class="space-y-1 text-xs">
                    <li>✅ Zero subscriptions</li>
                    <li>✅ Automatic cleanup</li>
                    <li>✅ Simple function calls</li>
                    <li>✅ No lifecycle management</li>
                    <li>✅ Direct template access</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="card bg-primary text-primary-content">
            <div class="card-body p-4">
              <p class="text-sm">
                <strong>💡 Pro Tip:</strong> Computed signals are the foundation of reactive state
                management in modern Angular. They replace most use cases for RxJS operators like
                <code class="badge badge-sm">map</code>, <code class="badge badge-sm">filter</code>,
                and <code class="badge badge-sm">combineLatest</code>. Try modifying values in each
                demo and watch the magic happen!
              </p>
            </div>
          </div>
        </div>
      </app-demos-aa-concept-notes-modal>
    </app-ui-page>
  `,
  styles: ``,
})
export class ComputingPage {
  showNotesModal = signal(false);
}
