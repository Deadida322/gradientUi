

# Gradient UI 0.7.0

### Added

- Added `GAvatar` and `GAvatarGroup` with image, initials, icon, shape, size,
  material variant and texture support.
- Added `GCard` with composable anatomy, layout options, material variants,
  media-friendly slots and texture support.
- Added `GDivider` with horizontal and vertical orientation, labels, icon and
  content slots, material variants, gradient-aware styling and textures.
- Added `GCombobox` as an editable select built on shared select primitives,
  with typed props and slots, filtering, multiple chips, custom add flow and
  `add` event support.
- Added `GStepper`, `GStepPanel` and `GStepperActions` for declarative ordered
  flows with typed item, panel and actions slots.
- Added shared navigation controller and keyboard handling for tab-like and
  step-like components.
- Added reusable state icon resolution for semantic indicators and per-item
  stepper icon overrides.

### Changed

- Refactored select-like field behavior so combobox reuses shared item
  normalization, selection, keyboard and field-control composables.
- Refactored `GTabs` onto the shared navigation controller used by `GStepper`.
- Improved input surface variants with clearer `default`, `tonal`, `glass`,
  `outlined` and `text` behavior.

### Breaking Changes

- `GChip` remove interactions now use the `remove` event as the preferred Vue