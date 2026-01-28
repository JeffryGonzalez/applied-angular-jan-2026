import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { JsonPipe } from '@angular/common';
import { GreetingComponent } from './component-demos/greeting';
import { CounterComponent } from './component-demos/counter';
import { UserCardComponent } from './component-demos/user-card';
import { TextInputComponent } from './component-demos/text-input';
import { TodoItemComponent } from './component-demos/todo-item';
import { ConceptNotesModal } from '../../ui-data-display/concept-notes-modal';

// Main page component demonstrating all examples
@Component({
  selector: 'app-demos-aa-pages-components',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PageLayout,
    GreetingComponent,
    CounterComponent,
    UserCardComponent,
    TextInputComponent,
    TodoItemComponent,
    JsonPipe,
    ConceptNotesModal,
  ],
  template: `
    <app-ui-page title="Component Demonstrations">
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

      <div class="space-y-6">
        <!-- Demo 1: Simple Inputs -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title text-2xl">
              <span class="badge badge-primary badge-lg">1</span>
              Simple Signal Inputs
            </h2>
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
                <div class="font-bold">Input Signals</div>
                <div class="text-sm">
                  Components using <code class="badge badge-sm">input()</code> and
                  <code class="badge badge-sm">input.required()</code>
                </div>
              </div>
            </div>

            <div class="divider"></div>

            <div class="space-y-4">
              <app-greeting greeting="Hello" name="John Doe" />
              <app-greeting greeting="Welcome" />
            </div>
          </div>
        </div>

        <!-- Demo 2: Signal Outputs -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title text-2xl">
              <span class="badge badge-secondary badge-lg">2</span>
              Signal Outputs
            </h2>
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
                <div class="font-bold">Output Events</div>
                <div class="text-sm">
                  Components using <code class="badge badge-sm">output()</code> to emit events
                </div>
              </div>
            </div>

            <div class="divider"></div>

            <app-counter
              [initialValue]="10"
              (countChanged)="onCountChanged($event)"
              (resetClicked)="onResetClicked()"
            />

            <div class="card bg-base-200">
              <div class="card-body">
                <div class="flex items-center gap-2">
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h3 class="card-title text-base">Event Log</h3>
                  <div class="badge badge-neutral">{{ eventLogs().length }} events</div>
                </div>
                <div class="mockup-code mt-2 max-h-48 overflow-y-auto">
                  @for (log of eventLogs(); track $index) {
                    <pre [attr.data-prefix]="$index + 1"><code>{{ log }}</code></pre>
                  } @empty {
                    <pre
                      data-prefix="—"
                    ><code class="text-base-content/50">No events yet...</code></pre>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Demo 3: Computed Signals -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title text-2xl">
              <span class="badge badge-accent badge-lg">3</span>
              Computed Signals
            </h2>
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
                <div class="font-bold">Computed Values</div>
                <div class="text-sm">
                  Components using <code class="badge badge-sm">computed()</code> to derive values
                </div>
              </div>
            </div>

            <div class="divider"></div>

            <div class="grid gap-4 md:grid-cols-2">
              <app-user-card
                firstName="Alice"
                lastName="Johnson"
                email="alice@example.com"
                [isActive]="true"
              />
              <app-user-card
                firstName="Bob"
                lastName="Smith"
                email="bob@example.com"
                [isActive]="false"
              />
            </div>
          </div>
        </div>

        <!-- Demo 4: Two-Way Binding with Model -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title text-2xl">
              <span class="badge badge-warning badge-lg">4</span>
              Two-Way Binding with Model
            </h2>
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
                <div class="font-bold">Model Binding</div>
                <div class="text-sm">
                  Components using <code class="badge badge-sm">model()</code> for two-way data
                  binding
                </div>
              </div>
            </div>

            <div class="divider"></div>

            <div class="space-y-4">
              <app-text-input
                label="First Name"
                placeholder="Enter your first name"
                [(value)]="firstName"
              />
              <app-text-input
                label="Last Name"
                placeholder="Enter your last name"
                [(value)]="lastName"
              />
            </div>

            <div class="card bg-base-200 mt-4">
              <div class="card-body">
                <div class="flex items-center gap-2">
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
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  <h3 class="card-title text-base">Current Values</h3>
                </div>
                <div class="mockup-code">
                  <pre
                    data-prefix="$"
                  ><code>{{ { firstName: firstName(), lastName: lastName() } | json }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Demo 5: Complex Component Interactions -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title text-2xl">
              <span class="badge badge-success badge-lg">5</span>
              Complex Component Interactions
            </h2>
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
                <div class="font-bold">Todo List Demo</div>
                <div class="text-sm">Demonstrating multiple components with inputs and outputs</div>
              </div>
            </div>

            <div class="divider"></div>

            <div class="space-y-2">
              @for (todo of todos(); track todo.id) {
                <app-todo-item
                  [text]="todo.text"
                  [completed]="todo.completed"
                  (toggleCompleted)="toggleTodo(todo.id)"
                  (deleteItem)="deleteTodo(todo.id)"
                />
              } @empty {
                <div class="alert">
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
                  <span>No todos! Click below to add one.</span>
                </div>
              }
            </div>

            <button (click)="addTodo()" class="btn btn-primary btn-block mt-4">
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Todo
            </button>

            <div class="stats stats-vertical mt-4 shadow lg:stats-horizontal">
              <div class="stat">
                <div class="stat-title">Total Todos</div>
                <div class="stat-value text-2xl">{{ todos().length }}</div>
                <div class="stat-desc">All items</div>
              </div>

              <div class="stat">
                <div class="stat-title">Completed</div>
                <div class="stat-value text-2xl text-success">{{ completedTodos() }}</div>
                <div class="stat-desc">Finished tasks</div>
              </div>

              <div class="stat">
                <div class="stat-title">Remaining</div>
                <div class="stat-value text-2xl text-warning">{{ remainingTodos() }}</div>
                <div class="stat-desc">To do</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Concept Notes Modal -->
      <app-demos-aa-concept-notes-modal
        title="Component Communication Patterns"
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
              >This page demonstrates the <strong>modern Angular component API</strong> using
              signals for inputs, outputs, and state management.</span
            >
          </div>

          <div>
            <h4 class="mb-3 flex items-center gap-2 text-lg font-bold">
              <span class="badge badge-primary badge-lg">1</span>
              Signal Inputs
            </h4>
            <div class="space-y-3">
              <p>
                Signal-based inputs replace the old <code class="badge badge-sm">&#64;Input()</code>
                decorator with a more reactive approach:
              </p>
              <div class="mockup-code">
                <pre data-prefix="1"><code>// Optional input with default</code></pre>
                <pre data-prefix="2"><code>name = input&lt;string&gt;('');</code></pre>
                <pre data-prefix="3"><code></code></pre>
                <pre data-prefix="4"><code>// Required input</code></pre>
                <pre data-prefix="5"><code>greeting = input.required&lt;string&gt;();</code></pre>
              </div>
              <div class="alert">
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
                  <strong>Benefits:</strong> Type-safe, reactive, and can be used in computed
                  signals or effects. No more <code class="badge badge-sm">ngOnChanges</code>!
                </div>
              </div>
            </div>
          </div>

          <div class="divider"></div>

          <div>
            <h4 class="mb-3 flex items-center gap-2 text-lg font-bold">
              <span class="badge badge-secondary badge-lg">2</span>
              Signal Outputs
            </h4>
            <div class="space-y-3">
              <p>
                Signal-based outputs replace <code class="badge badge-sm">&#64;Output()</code> with
                a simpler, more consistent API:
              </p>
              <div class="mockup-code">
                <pre data-prefix="1"><code>// Output with typed value</code></pre>
                <pre data-prefix="2"><code>countChanged = output&lt;number&gt;();</code></pre>
                <pre data-prefix="3"><code></code></pre>
                <pre data-prefix="4"><code>// Output without value (void)</code></pre>
                <pre data-prefix="5"><code>resetClicked = output&lt;void&gt;();</code></pre>
                <pre data-prefix="6"><code></code></pre>
                <pre data-prefix="7"><code>// Emit events</code></pre>
                <pre data-prefix="8"><code>this.countChanged.emit(42);</code></pre>
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
                  <strong>Watch the Event Log:</strong> Notice how parent components receive and
                  handle events from child components in real-time!
                </div>
              </div>
            </div>
          </div>

          <div class="divider"></div>

          <div>
            <h4 class="mb-3 flex items-center gap-2 text-lg font-bold">
              <span class="badge badge-accent badge-lg">3</span>
              Computed Signals in Components
            </h4>
            <div class="space-y-3">
              <p>
                Components can use <code class="badge badge-sm">computed()</code> to derive values
                from their inputs:
              </p>
              <div class="mockup-code">
                <pre data-prefix="1"><code>firstName = input.required&lt;string&gt;();</code></pre>
                <pre data-prefix="2"><code>lastName = input.required&lt;string&gt;();</code></pre>
                <pre data-prefix="3"><code></code></pre>
                <pre data-prefix="4"><code>// Automatically updates when inputs change</code></pre>
                <pre data-prefix="5"><code>fullName = computed(() => {{'{'}}</code></pre>
                <pre
                  data-prefix="6"
                ><code>  return this.firstName() + ' ' + this.lastName();</code></pre>
                <pre data-prefix="7"><code>{{'}'}});</code></pre>
              </div>
              <div class="stats shadow">
                <div class="stat">
                  <div class="stat-title">User Cards</div>
                  <div class="stat-value text-2xl">2</div>
                  <div class="stat-desc">Using computed fullName</div>
                </div>
              </div>
            </div>
          </div>

          <div class="divider"></div>

          <div>
            <h4 class="mb-3 flex items-center gap-2 text-lg font-bold">
              <span class="badge badge-warning badge-lg">4</span>
              Two-Way Binding with Model
            </h4>
            <div class="space-y-3">
              <p>
                The <code class="badge badge-sm">model()</code> function enables two-way data
                binding between parent and child components:
              </p>
              <div class="mockup-code">
                <pre data-prefix="1"><code>// In child component</code></pre>
                <pre data-prefix="2"><code>value = model&lt;string&gt;('');</code></pre>
                <pre data-prefix="3"><code></code></pre>
                <pre data-prefix="4"><code>// In parent template</code></pre>
                <pre
                  data-prefix="5"
                ><code>&lt;app-text-input [(value)]="firstName" /&gt;</code></pre>
              </div>
              <div class="grid gap-3 md:grid-cols-2">
                <div class="alert alert-info">
                  <div>
                    <div class="font-bold">Traditional Way</div>
                    <div class="text-xs">
                      <code class="badge badge-xs">[value]="x"</code> +
                      <code class="badge badge-xs">(valueChange)="x=$event"</code>
                    </div>
                  </div>
                </div>
                <div class="alert alert-success">
                  <div>
                    <div class="font-bold">Model Way</div>
                    <div class="text-xs">
                      <code class="badge badge-xs">[(value)]="x"</code> - Clean & simple!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="divider"></div>

          <div>
            <h4 class="mb-3 flex items-center gap-2 text-lg font-bold">
              <span class="badge badge-success badge-lg">5</span>
              Putting It All Together
            </h4>
            <div class="space-y-3">
              <p>
                The todo list demo shows how these patterns work together in a real-world scenario:
              </p>
              <div class="grid gap-3 md:grid-cols-2">
                <div class="card bg-base-200">
                  <div class="card-body p-4">
                    <h5 class="card-title text-sm">Parent Component</h5>
                    <ul class="space-y-1 text-xs">
                      <li>✓ Manages state with <code class="badge badge-xs">signal()</code></li>
                      <li>
                        ✓ Computes statistics with <code class="badge badge-xs">computed()</code>
                      </li>
                      <li>✓ Passes data down via inputs</li>
                      <li>✓ Handles events from children</li>
                    </ul>
                  </div>
                </div>
                <div class="card bg-base-200">
                  <div class="card-body p-4">
                    <h5 class="card-title text-sm">Child Component</h5>
                    <ul class="space-y-1 text-xs">
                      <li>✓ Receives data via <code class="badge badge-xs">input()</code></li>
                      <li>✓ Emits events via <code class="badge badge-xs">output()</code></li>
                      <li>✓ Self-contained & reusable</li>
                      <li>✓ Type-safe communication</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="divider"></div>

          <div>
            <h4 class="mb-3 text-lg font-bold">🎯 Key Takeaways</h4>
            <div class="space-y-2">
              <div class="alert">
                <span class="badge badge-primary">1</span>
                <span
                  ><strong>input()</strong> replaces &#64;Input() with reactive, signal-based
                  properties</span
                >
              </div>
              <div class="alert">
                <span class="badge badge-secondary">2</span>
                <span
                  ><strong>output()</strong> replaces &#64;Output() and EventEmitter for cleaner
                  event handling</span
                >
              </div>
              <div class="alert">
                <span class="badge badge-accent">3</span>
                <span
                  ><strong>computed()</strong> creates derived values that automatically update with
                  inputs</span
                >
              </div>
              <div class="alert">
                <span class="badge badge-warning">4</span>
                <span
                  ><strong>model()</strong> simplifies two-way binding between parent and
                  child</span
                >
              </div>
              <div class="alert alert-success">
                <span class="badge badge-success">5</span>
                <span
                  >All of these work together to create
                  <strong>predictable, reactive</strong> component communication!</span
                >
              </div>
            </div>
          </div>

          <div class="card bg-primary text-primary-content">
            <div class="card-body p-4">
              <p class="text-sm">
                <strong>💡 Pro Tip:</strong> Try interacting with each demo above. Watch how changes
                flow through the component tree and how computed values update automatically. This
                is the power of Angular's signal-based reactivity!
              </p>
            </div>
          </div>
        </div>
      </app-demos-aa-concept-notes-modal>
    </app-ui-page>
  `,
  styles: ``,
})
export class ComponentsPage {
  // State for modal
  showNotesModal = signal(false);

  // State for demonstrations
  eventLogs = signal<string[]>([]);
  firstName = signal('');
  lastName = signal('');

  todos = signal([
    { id: 1, text: 'Learn Angular signals', completed: false },
    { id: 2, text: 'Create reusable components', completed: true },
    { id: 3, text: 'Build an awesome app', completed: false },
  ]);

  // Computed signals for todo statistics
  completedTodos = computed(() => this.todos().filter((t) => t.completed).length);
  remainingTodos = computed(() => this.todos().filter((t) => !t.completed).length);

  // Event handlers for counter demo
  onCountChanged(count: number) {
    this.eventLogs.update((logs) => [
      `Count changed to: ${count}`,
      ...logs.slice(0, 9), // Keep last 10 logs
    ]);
  }

  onResetClicked() {
    this.eventLogs.update((logs) => ['Counter was reset', ...logs.slice(0, 9)]);
  }

  // Todo list handlers
  toggleTodo(id: number) {
    this.todos.update((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  }

  deleteTodo(id: number) {
    this.todos.update((todos) => todos.filter((todo) => todo.id !== id));
  }

  addTodo() {
    const newId = Math.max(...this.todos().map((t) => t.id), 0) + 1;
    this.todos.update((todos) => [
      ...todos,
      { id: newId, text: `New todo item ${newId}`, completed: false },
    ]);
  }
}
