# My Solution

## The New Clock Component

```typescript
import { Component, ChangeDetectionStrategy, effect, signal } from '@angular/core';

@Component({
  selector: 'app-labs-lab1-clock',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
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

## The Home Component

```typescript
import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { Clock } from '../widgets/clock';

@Component({
  selector: 'ht-home-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageLayout, Clock],
  template: `
    <app-ui-page title="First Lab">
      <div class="flex flex-row">
        <app-labs-lab1-clock></app-labs-lab1-clock>
      </div>
    </app-ui-page>
  `,
  styles: ``,
})
export class HomePage {}
```
