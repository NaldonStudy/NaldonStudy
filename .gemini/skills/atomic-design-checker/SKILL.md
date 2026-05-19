---
name: atomic-design-checker
description: Validates and enforces Atomic Design patterns in this project. Use this when checking component structure, creating new components, or auditing the `components/` directory to ensure items are correctly categorized as atoms, molecules, organisms, or templates.
---

# Atomic Design Checker

This skill ensures that the project's component architecture follows the Atomic Design principles as defined in `GEMINI.md`.

## Component Hierarchy

- **Atoms**: Basic building blocks.
    - Location: `components/atoms/` and `components/ui/` (shadcn/ui).
    - Rules: No complex logic, highly reusable.
- **Molecules**: Groups of atoms bonded together.
    - Location: `components/molecules/`.
    - Rules: Handles simple interactions, relatively small.
- **Organisms**: Groups of molecules joined together to form a relatively complex, distinct section of an interface.
    - Location: `components/organisms/`.
    - Rules: May contain multiple molecules and atoms, often handles business logic or complex state.
- **Templates**: Page-level objects that place components into a layout.
    - Location: `components/templates/`.
    - Rules: Primarily concerned with layout and structure, not specific data.

## Usage Guidelines

1. **New Component Creation**: Before creating a component, identify its tier.
2. **Audit**: Run the provided check script to identify misplaced components.
3. **Type Safety**: Ensure all components use strict TypeScript (no `any`).

## Tools

- **Check Script**: Run `node scripts/check_structure.cjs` to validate the current file structure.
