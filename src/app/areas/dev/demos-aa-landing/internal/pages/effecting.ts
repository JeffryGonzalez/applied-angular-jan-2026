import { Component, ChangeDetectionStrategy, signal, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { ConceptNotesModal } from '../../ui-data-display/concept-notes-modal';

@Component({
  selector: 'app-demos-aa-pages-effects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageLayout, ConceptNotesModal, FormsModule],
  template: `
    <app-ui-page title="Effects - Number Guessing Game">
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
        <!-- Game Instructions -->
        <div class="alert alert-info">
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
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 class="font-bold">How to Play</h3>
            <div class="text-sm">
              Guess the secret number (1-100) in 5 tries within 60 seconds. The
              <strong>effect()</strong> automatically starts/stops the timer based on game state!
            </div>
          </div>
        </div>

        <!-- Game Board -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <!-- Game Stats -->
            <div class="stats stats-vertical shadow lg:stats-horizontal">
              <div class="stat">
                <div class="stat-figure text-secondary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div class="stat-title">Time Remaining</div>
                <div
                  class="stat-value"
                  [class.text-error]="timeRemaining() < 10"
                  [class.text-warning]="timeRemaining() >= 10 && timeRemaining() < 30"
                  [class.text-success]="timeRemaining() >= 30"
                >
                  {{ timeRemaining() }}s
                </div>
                <div class="stat-desc">{{ gameStatus() }}</div>
              </div>

              <div class="stat">
                <div class="stat-figure text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div class="stat-title">Attempts Left</div>
                <div class="stat-value text-primary">{{ attemptsLeft() }}</div>
                <div class="stat-desc">out of 5 tries</div>
              </div>

              <div class="stat">
                <div class="stat-figure text-accent">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                    />
                  </svg>
                </div>
                <div class="stat-title">Total Guesses</div>
                <div class="stat-value text-accent">{{ guesses().length }}</div>
                <div class="stat-desc">History below</div>
              </div>
            </div>

            <div class="divider"></div>

            @if (isGameActive()) {
              <!-- Input Section -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Enter your guess (1-100)</span>
                </label>
                <div class="flex gap-2">
                  <input
                    type="number"
                    [(ngModel)]="currentGuess"
                    (keyup.enter)="makeGuess()"
                    min="1"
                    max="100"
                    class="input input-bordered flex-1"
                    placeholder="Enter a number..."
                    [disabled]="!isGameActive()"
                  />
                  <button
                    (click)="makeGuess()"
                    class="btn btn-primary"
                    [disabled]="!isGameActive()"
                  >
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
                        d="M13 5l7 7-7 7M5 5l7 7-7 7"
                      />
                    </svg>
                    Guess
                  </button>
                </div>
              </div>

              <!-- Feedback -->
              @if (lastFeedback()) {
                <div
                  class="alert"
                  [class.alert-warning]="
                    lastFeedback().includes('high') || lastFeedback().includes('low')
                  "
                >
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
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{{ lastFeedback() }}</span>
                </div>
              }
            } @else {
              <!-- Game Over Section -->
              <div class="text-center space-y-4">
                @if (hasWon()) {
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
                    <div>
                      <h3 class="font-bold">Congratulations! 🎉</h3>
                      <div class="text-sm">
                        You guessed the number {{ secretNumber() }} in {{ guesses().length }}
                        {{ guesses().length === 1 ? 'try' : 'tries' }}!
                      </div>
                    </div>
                  </div>
                } @else {
                  <div class="alert alert-error">
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
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <h3 class="font-bold">Game Over!</h3>
                      <div class="text-sm">
                        {{ gameOverReason() }} The secret number was {{ secretNumber() }}.
                      </div>
                    </div>
                  </div>
                }
                <button (click)="startNewGame()" class="btn btn-primary btn-wide">
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
                  Play Again
                </button>
              </div>
            }

            <div class="divider"></div>

            <!-- Guess History -->
            <div class="card bg-base-200">
              <div class="card-body">
                <h3 class="card-title">Guess History</h3>
                @if (guesses().length > 0) {
                  <div class="flex flex-wrap gap-2">
                    @for (guess of guesses(); track $index) {
                      <div
                        class="badge badge-lg"
                        [class.badge-success]="guess === secretNumber()"
                        [class.badge-error]="guess > secretNumber()"
                        [class.badge-warning]="guess < secretNumber()"
                      >
                        {{ guess }}
                      </div>
                    }
                  </div>
                } @else {
                  <p class="text-sm text-base-content/70">No guesses yet. Start guessing!</p>
                }
              </div>
            </div>
          </div>
        </div>

        <!-- Effect Explanation -->
        <div class="card bg-base-200 shadow">
          <div class="card-body">
            <h3 class="card-title">How the Effect Works</h3>
            <div class="mockup-code">
              <pre
                data-prefix="1"
              ><code>// Effect automatically runs when isGameActive() changes</code></pre>
              <pre data-prefix="2"><code>constructor() {{'{'}}</code></pre>
              <pre data-prefix="3"><code>  effect(() => {{'{'}}</code></pre>
              <pre data-prefix="4"><code>    if (this.isGameActive()) {{'{'}}</code></pre>
              <pre data-prefix="5"><code>      // Start the timer</code></pre>
              <pre data-prefix="6"><code>      this.startTimer();</code></pre>
              <pre data-prefix="7"><code>    {{'}'}}</code></pre>
              <pre data-prefix="8"><code>  {{'}'}});</code></pre>
              <pre data-prefix="9"><code>{{'}'}}</code></pre>
            </div>
            <div class="alert alert-info mt-2">
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
              <span
                >The effect watches <code class="badge badge-sm">isGameActive()</code> and
                automatically starts the timer when the game begins!</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Concept Notes Modal -->
      <app-demos-aa-concept-notes-modal
        title="Effects - Side Effects in Response to Signal Changes"
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
              ><strong>Effects</strong> allow you to perform side effects (like timers, logging, API
              calls) that automatically run when signals they depend on change.</span
            >
          </div>

          <div>
            <h4 class="mb-3 text-lg font-bold">What is an Effect?</h4>
            <p class="mb-3">
              An effect is a function that runs automatically whenever any signal it reads changes.
              Unlike computed signals (which derive values), effects are for
              <strong>side effects</strong>.
            </p>
            <div class="mockup-code">
              <pre data-prefix="1"><code>constructor() {{'{'}}</code></pre>
              <pre data-prefix="2"><code>  effect(() => {{'{'}}</code></pre>
              <pre data-prefix="3"><code>    console.log('Count is:', this.count());</code></pre>
              <pre data-prefix="4"><code>    // Runs automatically when count changes!</code></pre>
              <pre data-prefix="5"><code>  {{'}'}});</code></pre>
              <pre data-prefix="6"><code>{{'}'}}</code></pre>
            </div>
          </div>

          <div class="divider"></div>

          <div>
            <h4 class="mb-3 text-lg font-bold">Game Example - Timer Management</h4>
            <div class="space-y-3">
              <p>In this game, the effect manages the countdown timer:</p>
              <div class="card bg-base-200">
                <div class="card-body p-4">
                  <div class="space-y-2 text-sm">
                    <div class="flex items-start gap-2">
                      <span class="badge badge-primary badge-sm">1</span>
                      <div>
                        <strong>Game Starts:</strong>
                        <code class="badge badge-xs ml-1">isGameActive()</code> becomes
                        <code class="badge badge-xs">true</code>
                      </div>
                    </div>
                    <div class="flex items-start gap-2">
                      <span class="badge badge-primary badge-sm">2</span>
                      <div>
                        <strong>Effect Triggers:</strong> Automatically detects the change and
                        starts the timer
                      </div>
                    </div>
                    <div class="flex items-start gap-2">
                      <span class="badge badge-primary badge-sm">3</span>
                      <div>
                        <strong>Timer Runs:</strong> Counts down every second using
                        <code class="badge badge-xs">setInterval()</code>
                      </div>
                    </div>
                    <div class="flex items-start gap-2">
                      <span class="badge badge-primary badge-sm">4</span>
                      <div>
                        <strong>Game Ends:</strong>
                        <code class="badge badge-xs">isGameActive()</code> becomes
                        <code class="badge badge-xs">false</code>
                      </div>
                    </div>
                    <div class="flex items-start gap-2">
                      <span class="badge badge-primary badge-sm">5</span>
                      <div>
                        <strong>Effect Cleans Up:</strong> Automatically clears the timer interval
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="divider"></div>

          <div>
            <h4 class="mb-3 text-lg font-bold">Key Characteristics</h4>
            <div class="space-y-2">
              <div class="alert">
                <span class="badge badge-primary">1</span>
                <span
                  ><strong>Automatic Tracking:</strong> Effects automatically track which signals
                  they read</span
                >
              </div>
              <div class="alert">
                <span class="badge badge-secondary">2</span>
                <span
                  ><strong>Re-run on Change:</strong> Automatically re-execute when dependencies
                  change</span
                >
              </div>
              <div class="alert">
                <span class="badge badge-accent">3</span>
                <span
                  ><strong>Cleanup Function:</strong> Return a cleanup function for
                  subscriptions/timers</span
                >
              </div>
              <div class="alert">
                <span class="badge badge-warning">4</span>
                <span
                  ><strong>Side Effects Only:</strong> For DOM manipulation, logging, API calls,
                  timers</span
                >
              </div>
              <div class="alert">
                <span class="badge badge-success">5</span>
                <span
                  ><strong>No Return Value:</strong> Unlike computed(), effects don't return
                  values</span
                >
              </div>
            </div>
          </div>

          <div class="divider"></div>

          <div>
            <h4 class="mb-3 text-lg font-bold">Common Use Cases</h4>
            <div class="grid gap-3 md:grid-cols-2">
              <div class="card bg-base-200">
                <div class="card-body p-3">
                  <h5 class="card-title text-sm">⏰ Timers & Intervals</h5>
                  <p class="text-xs">Start/stop timers based on state changes (like this game!)</p>
                </div>
              </div>
              <div class="card bg-base-200">
                <div class="card-body p-3">
                  <h5 class="card-title text-sm">📡 API Calls</h5>
                  <p class="text-xs">Fetch data when search parameters change</p>
                </div>
              </div>
              <div class="card bg-base-200">
                <div class="card-body p-3">
                  <h5 class="card-title text-sm">💾 Local Storage</h5>
                  <p class="text-xs">Save state to localStorage when it changes</p>
                </div>
              </div>
              <div class="card bg-base-200">
                <div class="card-body p-3">
                  <h5 class="card-title text-sm">📊 Analytics</h5>
                  <p class="text-xs">Track user interactions and state changes</p>
                </div>
              </div>
              <div class="card bg-base-200">
                <div class="card-body p-3">
                  <h5 class="card-title text-sm">🎨 DOM Manipulation</h5>
                  <p class="text-xs">Update non-Angular elements (third-party libraries)</p>
                </div>
              </div>
              <div class="card bg-base-200">
                <div class="card-body p-3">
                  <h5 class="card-title text-sm">🔔 Notifications</h5>
                  <p class="text-xs">Show toasts or alerts based on state</p>
                </div>
              </div>
            </div>
          </div>

          <div class="divider"></div>

          <div>
            <h4 class="mb-3 text-lg font-bold">Effect vs Computed</h4>
            <div class="grid gap-3 md:grid-cols-2">
              <div class="card bg-base-200">
                <div class="card-body p-4">
                  <h5 class="card-title text-sm">computed()</h5>
                  <ul class="space-y-1 text-xs">
                    <li>✅ Returns a value</li>
                    <li>✅ Read-only signal</li>
                    <li>✅ For deriving state</li>
                    <li>✅ Lazy evaluation</li>
                    <li>✅ Memoized/cached</li>
                    <li>❌ No side effects</li>
                  </ul>
                </div>
              </div>
              <div class="card bg-primary text-primary-content">
                <div class="card-body p-4">
                  <h5 class="card-title text-sm">effect()</h5>
                  <ul class="space-y-1 text-xs">
                    <li>✅ No return value</li>
                    <li>✅ Runs automatically</li>
                    <li>✅ For side effects</li>
                    <li>✅ Eager execution</li>
                    <li>✅ Runs every change</li>
                    <li>✅ DOM, API, logging</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="card bg-success text-success-content">
            <div class="card-body p-4">
              <p class="text-sm">
                <strong>💡 Pro Tip:</strong> Effects replace most lifecycle hooks like
                <code class="badge badge-sm">ngOnChanges</code>,
                <code class="badge badge-sm">ngDoCheck</code>, and manual RxJS subscriptions. They
                automatically clean up when the component is destroyed, preventing memory leaks!
              </p>
            </div>
          </div>
        </div>
      </app-demos-aa-concept-notes-modal>
    </app-ui-page>
  `,
  styles: ``,
})
export class EffectingPage {
  showNotesModal = signal(false);

  // Game state
  secretNumber = signal(0);
  guesses = signal<number[]>([]);
  timeRemaining = signal(60);
  isGameActive = computed(() => {
    return this.timeRemaining() > 0 && this.guesses().length < 5 && !this.hasWon();
  });
  lastFeedback = signal<string>('');
  gameOverReason = signal<string>('');

  currentGuess = 0;
  private timerInterval?: ReturnType<typeof setInterval>;

  // Computed values
  attemptsLeft = computed(() => 5 - this.guesses().length);
  hasWon = computed(() => this.guesses().includes(this.secretNumber()));
  gameStatus = computed(() => {
    if (this.hasWon()) return '🎉 Winner!';
    if (!this.isGameActive() && this.timeRemaining() === 0) return "⏰ Time's up!";
    if (!this.isGameActive() && this.attemptsLeft() === 0) return '😢 No more tries';
    return '🎮 Playing...';
  });

  constructor() {
    // Start the first game
    this.startNewGame();

    // Effect to manage the timer based on game state
    effect(() => {
      if (this.isGameActive()) {
        this.startTimer();
      } else {
        this.stopTimer();
      }
    });
  }

  private startTimer() {
    // Clear any existing timer
    this.stopTimer();

    // Start a new timer
    this.timerInterval = setInterval(() => {
      this.timeRemaining.update((time) => {
        const newTime = time - 1;
        if (newTime <= 0) {
          this.gameOverReason.set('You ran out of time!');
        }
        return Math.max(0, newTime);
      });
    }, 1000);
  }

  private stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = undefined;
    }
  }

  makeGuess() {
    if (!this.isGameActive() || this.currentGuess < 1 || this.currentGuess > 100) {
      return;
    }

    const guess = this.currentGuess;
    this.guesses.update((guesses) => [...guesses, guess]);

    if (guess === this.secretNumber()) {
      this.lastFeedback.set(`🎉 Correct! You guessed the number!`);
    } else if (guess > this.secretNumber()) {
      this.lastFeedback.set(`📉 Too high! Try a lower number.`);
    } else {
      this.lastFeedback.set(`📈 Too low! Try a higher number.`);
    }

    if (this.attemptsLeft() === 0 && !this.hasWon()) {
      this.gameOverReason.set('You ran out of attempts!');
    }

    this.currentGuess = 0;
  }

  startNewGame() {
    this.secretNumber.set(Math.floor(Math.random() * 100) + 1);
    this.guesses.set([]);
    this.timeRemaining.set(60);
    this.lastFeedback.set('');
    this.gameOverReason.set('');
    this.currentGuess = 0;
  }
}
