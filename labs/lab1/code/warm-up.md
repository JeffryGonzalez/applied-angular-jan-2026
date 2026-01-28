# My Solution

```typescript
import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';

@Component({
  selector: 'ht-home-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageLayout],
  template: `
    <app-ui-page title="First Lab">
      <div class="flex flex-row">
        <span class="countdown font-mono text-green-500 text-2xl ml-auto">
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
    </app-ui-page>
  `,
  styles: ``,
})
export class HomePage {
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
