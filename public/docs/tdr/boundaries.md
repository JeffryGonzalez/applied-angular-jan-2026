# Enforcing Module Boundaries

![Features](docs/tdr/boundaries.excalidraw.svg)

## `app` - the "Root"

The `app` sort of sits outside of all this in a somewhat privileged position. It's job is to be the _app_, which is to aggregate features and orchestrate their work. As the "root" of our project, it _can_ access about anything, but _should_ only access:

- `node_modules`
- `shared/*`
- `<area>/features`

## Areas

They can only access anything they "own", `node_modules`, and `shared/*`.

## Shared

Is like an area, except it allows other areas to use it's "stuff".

### Rules

If we call the `root` of our application the `src` folder, then:

Anything in the `src/app/areas/*` is an "area". So, `/src/app/areas/home` is an "area".

An _area_ can have:

- 0 or more _features_, e.g.:
  - `/src/app/areas/home/feature-landing`
  - `/src/app/areas/home/feature-preferences`

- 0 or more _ui_ modules, e.g.:
  - `/src/app/areas/home/ui-pages`
    - Contains page definitions shared across the features of this area.
  - `/src/app/areas/home/ui-tables`
    - Contains table-related UI components shared across this area.
- 0 or 1 _data_ section, e.g.:
  - `/src/app/areas/home/data`
    - This contains type definitions, stores, services, etc. that are shared across more than one feature in the area.
- 0 or more _util_ sections, e.g.:
  - `/src/app/areas/home/util-validation`
    - Contains custom validations used across more than one feature in the area.
  - `/src/app/areas/home/util-forms`
    - Contains custom form sections definitions used across more than one feature in the area.
