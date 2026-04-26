# Project Guidelines

## Code Style
- Use React function components with JSX files in src/.
- Prefer Mantine components for UI primitives and layouts.
- Keep styles consistent with existing global styles in src/index.css and src/App.css.
- Keep generated module pages in src/pages/modules easy to edit manually after generation.

## Architecture
- This is a spec-driven backoffice app.
- Source specs live in specs/ and define menu structure and page behavior.
- Static module pages are generated into src/pages/modules by scripts/generate-pages-from-specs.cjs.
- Route and page binding is maintained through src/lib/pageRegistry.js and src/lib/specs.js.
- Main route composition is in src/App.jsx, and authenticated shell layout is in src/layouts/PrivateLayout.jsx.

## Build and Test
- Use Node 24 (see .nvmrc).
- Install dependencies: npm install
- Run dev server: npm run dev
- Lint: npm run lint
- Build: npm run build
- Regenerate static module pages from specs: node scripts/generate-pages-from-specs.cjs

## Conventions
- Do not add runtime markdown parsing for business pages; pages should be concrete source files under src/pages/modules.
- For each module, keep the ListPage and DetailPage split so developers can edit each page directly.
- Keep section-title mapping aligned between specs/menu.md, src/lib/specs.js menuStructure, and src/lib/pageRegistry.js.
- Use Mantine DataTable for list pages and Mantine form controls for detail pages.
- Component mapping from specs/overview.md:
  - Single Select -> Mantine Select
  - Search Box -> Mantine TextInput with left search icon
  - DateRange -> Mantine DatePickerInput (https://mantine.dev/dates/date-picker-input/#dates-range)
  - DateRangeWithPreset -> Mantine DatePickerInput (https://mantine.dev/dates/date-picker-input/#presets)
  - Table with row dragging -> Mantine with dragging column (https://icflorescu.github.io/mantine-datatable/examples/row-dragging/)
- in table.md, Secondary Actions is the action in single dropdown
- in table.md, Primary Filters must shrink to right and let searchbox expand to full width

## Links
- Specs overview: specs/overview.md
- Menu structure: specs/menu.md
- User menu spec: specs/user-menu.md
- Page templates: specs/page-templates/table.md, specs/page-templates/detail.md, specs/page-templates/report.md
- Generated page script: scripts/generate-pages-from-specs.cjs

##
- LLM response in short text, no summary