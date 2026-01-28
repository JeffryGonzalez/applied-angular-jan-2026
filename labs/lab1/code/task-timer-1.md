# The Markup For The Time

```typescript
import { Component, ChangeDetectionStrategy, effect, signal } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-labs-lab1-clock',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon],
  template: `
    <div class="flex flex-row items-center">
      <button class="btn btn-xs btn-circle btn-success mr-2">
        <ng-icon name="lucidePlay" size="20"></ng-icon>
      </button>

      <button class="btn btn-xs btn-circle btn-success mr-2">
        <ng-icon name="lucideX" size="20"></ng-icon>
      </button>
      <button class="btn btn-xs btn-circle btn-error mr-2">
        <ng-icon name="lucideCircleSlash" size="20"></ng-icon>
      </button>
      <span class="countdown font-mono text-green-500 text-2xl">
        <span
          style="--value:{{ currentTime().hours }};"
          aria-live="polite"
          aria-label="{{ currentTime().hours }}"
          >{{ currentTime().hours }}</span
        >
        :
        <span
          style="--value:{{ currentTime().minutes }}; --digits: 2;"
          aria-live="polite"
          aria-label="{{ currentTime().minutes }}"
          >{{ currentTime().minutes }}</span
        >
        :
        <span
          style="--value:{{ currentTime().seconds }}; --digits: 2;"
          aria-live="polite"
          aria-label="{{ currentTime().seconds }}"
          >{{ currentTime().seconds }}</span
        >
      </span>
    </div>
  `,
  styles: ``,
  host: {
    class: 'ml-auto',
  },
})
export class Clock {
  tick = signal<Date>(new Date());
  currentTime = signal({
    hours: this.tick().getHours(),
    minutes: this.tick().getMinutes(),
    seconds: this.tick().getSeconds(),
  });

  constructor() {
    setInterval(() => {
      this.tick.set(new Date());
    }, 1000);
    effect(() => {
      const now = this.tick();
      this.currentTime.set({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
      });
    });
  }
}
```
