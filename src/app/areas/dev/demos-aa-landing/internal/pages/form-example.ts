import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { form, FormField, required, email, maxLength } from '@angular/forms/signals';
import { FormInputComponent } from '@ht/shared/ui-common/forms/inputs/form-input';
import { signal } from '@angular/core';

type PersonalInformation = {
  firstName: string;
  lastName: string;
  email: string;
  streetAddress: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
};
@Component({
  selector: 'ht-demos-form-example',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageLayout, FormInputComponent, FormField],
  template: `
    <app-ui-page title="Form Example">
      <form (submit)="handleSubmit($event)" class="space-y-8">
        <!-- Profile Section -->
        <div class="card bg-base-200 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Profile</h2>
            <p class="text-sm opacity-70">
              This information will be displayed publicly so be careful what you share.
            </p>
          </div>
        </div>

        <!-- Personal Information Section -->
        <div class="card bg-base-200 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Personal Information</h2>
            <p class="text-sm opacity-70">Use a permanent address where you can receive mail.</p>

            <div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-6">
              <!-- First Name -->
              <div class="col-span-3">
                <app-ui-form-input
                  label="First name"
                  [formField]="form.firstName"
                  id="firstName"
                  autocomplete="given-name"
                  placeholder="Enter first name"
                  containerClass="sm:col-span-3"
                />

                <!-- Last Name -->
                <app-ui-form-input
                  label="Last name"
                  [formField]="form.lastName"
                  id="lastName"
                  autocomplete="family-name"
                  placeholder="Enter last name"
                  containerClass="sm:col-span-3"
                />
              </div>

              <!-- Email -->
              <div class="col-span-3">
                <app-ui-form-input
                  label="Email address"
                  type="email"
                  [formField]="form.email"
                  id="email"
                  autocomplete="email"
                  placeholder="you@example.com"
                  containerClass="sm:col-span-4"
                  hint="We'll never share your email with anyone else."
                />
              </div>

              <!-- Country -->
              <div class="col-span-full sm:col-span-1">
                <div class="form-control sm:col-span-1">
                  <label class="label">
                    <span class="label-text font-medium">Country</span>
                  </label>
                  <select
                    id="country"
                    [formField]="form.country"
                    autocomplete="country-name"
                    class="select select-bordered w-full"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>

                <!-- Street Address -->
                <app-ui-form-input
                  label="Street address"
                  [formField]="form.streetAddress"
                  id="streetAddress"
                  autocomplete="street-address"
                  placeholder="123 Main St"
                  containerClass="col-span-full"
                />
              </div>
              <!-- City -->
              <app-ui-form-input
                label="City"
                [formField]="form.city"
                id="city"
                autocomplete="address-level2"
                placeholder="San Francisco"
                containerClass="sm:col-span-2 sm:col-start-1"
              />

              <!-- State / Province -->
              <app-ui-form-input
                label="State / Province"
                [formField]="form.region"
                id="region"
                autocomplete="address-level1"
                placeholder="CA"
                containerClass="sm:col-span-2"
              />

              <!-- ZIP / Postal Code -->
              <app-ui-form-input
                label="ZIP / Postal code"
                [formField]="form.postalCode"
                id="postalCode"
                autocomplete="postal-code"
                placeholder="12345"
                containerClass="sm:col-span-2"
              />
            </div>
          </div>
        </div>

        <!-- Notifications Section -->
        <div class="card bg-base-200 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Notifications</h2>
            <p class="text-sm opacity-70">
              We'll always let you know about important changes, but you pick what else you want to
              hear about.
            </p>

            <div class="mt-6 space-y-8">
              <!-- Email Notifications -->
              <fieldset>
                <legend class="text-sm font-semibold mb-4">By email</legend>
                <div class="space-y-4">
                  <div class="form-control">
                    <label class="label cursor-pointer justify-start gap-3">
                      <input
                        type="checkbox"
                        name="comments"
                        checked
                        class="checkbox checkbox-primary"
                        aria-describedby="comments-description"
                      />
                      <div>
                        <span class="label-text font-medium">Starter</span>
                        <p id="comments-description" class="text-xs opacity-70">
                          Get notified on course content.
                        </p>
                      </div>
                    </label>
                  </div>

                  <div class="form-control">
                    <label class="label cursor-pointer justify-start gap-3">
                      <input
                        type="checkbox"
                        name="candidates"
                        class="checkbox checkbox-primary"
                        aria-describedby="candidates-description"
                      />
                      <div>
                        <span class="label-text font-medium">New Source Code</span>
                        <p id="candidates-description" class="text-xs opacity-70">
                          Get notified when new versions of the starter app are published.
                        </p>
                      </div>
                    </label>
                  </div>

                  <div class="form-control">
                    <label class="label cursor-pointer justify-start gap-3">
                      <input
                        type="checkbox"
                        name="offers"
                        class="checkbox checkbox-primary"
                        aria-describedby="offers-description"
                      />
                      <div>
                        <span class="label-text font-medium">Offers</span>
                        <p id="offers-description" class="text-xs opacity-70">
                          Get notified when new courses or tutorials are available.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </fieldset>

              <!-- Push Notifications -->
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex items-center justify-end gap-3">
          <button type="button" class="btn btn-ghost">Cancel</button>
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
      </form>
    </app-ui-page>
  `,
  styles: ``,
})
export class FormExamplePage {
  // Form controls

  initialFormState = signal<PersonalInformation>({
    firstName: '',
    lastName: '',
    email: '',
    streetAddress: '',
    city: '',
    region: '',
    postalCode: '',
    country: '',
  });
  form = form(this.initialFormState, (fs) => {
    required(fs.firstName);
    required(fs.lastName);
    maxLength(fs.firstName, 30);
    maxLength(fs.lastName, 30);
    required(fs.email);
    email(fs.email);
    required(fs.streetAddress);
    required(fs.city);
    required(fs.region);
    required(fs.postalCode);
    required(fs.country);
  });
  onSubmit(): void {}

  protected handleSubmit(e: SubmitEvent) {
    e.preventDefault();
  }
}
