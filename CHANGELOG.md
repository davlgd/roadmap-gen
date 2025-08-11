# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.1] - 2025-08-11

### Added

- 📦 **Embedded Default Theme**: Default theme is now fully embedded in the binary for self-contained usage
- 🎯 **Smart Theme Resolution**: Automatic detection between embedded default and external themes

### Fixed

- **Code Quality**: Resolved ESLint warnings and formatting issues

### Technical

- **Embedded Assets**: Complete default theme embedded in `src/core/embedded-assets.ts`
- **Theme Loading**: Enhanced `loadThemeAssets()` with embedded vs external theme detection
- **Template System**: Improved template variable consistency across all generators
- **Build Process**: Streamlined asset copying for both embedded and external themes

## [0.3.0] - 2025-08-10

### Added

- 📁 **Custom Output Directory**: `--output` / `-o` option to specify custom output directories
- 🎯 **Template System**: `--template` / `-t` option to use different theme directories
- 🎨 **Multiple Themes**: Example themes for different audiences and use cases

### Enhanced

- **API**: `build()` function now accepts `templateDir` and `outputDir` parameters
- **CLI Interface**: Extended help documentation with new theme and output options
- **Asset Management**: Smart asset copying that handles both default and themed assets
- **Template Loading**: Enhanced template loader to work with different theme directories

### Technical

- **Theme Architecture**: Modular theme system with individual asset directories
- **Asset Resolution**: Intelligent asset path resolution for default vs themed templates
- **Code Quality**: All code passes ESLint, Prettier, and EditorConfig validation
- **Test Coverage**: Comprehensive test suite continues to pass with new functionality

## [0.2.2] - 2025-08-10

### Added

- **Workflows**: Composite action for Bun setup to reduce code duplication across workflows

### Changed

- **CI/CD**: Optimized workflow architecture - CI runs on push/PR, Build validates and builds on release, Publish depends on successful Build
- **Validation**: Moved validation logic out of composite action to individual workflows for better control

### Fixed

- **TypeScript**: Resolved strict mode errors with proper null safety and optional chaining
- **Tests**: Enhanced test robustness with safe navigation operators
- **Workflows**: Fixed softprops/action-gh-release requiring proper release context
- **Code Quality**: Improved regex validation with capture group verification

## [0.2.1] - 2025-08-10

### Fixed

- 🧹 **Code Cleanup**: Removed unused CSS rules, optimized JavaScript event handlers for better maintainability
- ✅ **Test Updates**: Fixed test assertions to match updated UI text labels
- 📝 **Code Quality**: Improved ESLint compliance with proper line length and quote consistency

### Changed

- **UI**: Issue links now appear directly on project titles with arrow indicators instead of separate links
- **Visual**: Project row borders increased from 1px to 2px for better visual separation
- **Assets**: Removed redundant CSS classes and optimized file structure

## [0.2.0] - 2025-08-10

### Added

- 🎛️ **CLI Arguments Support**: `--source` / `-s` option to specify custom YAML files
- 📋 **Help Command**: `--help` / `-h` displays comprehensive usage information
- 🎨 **Typography Enhancement**: Replaced `...` with proper ellipse character `…`
- 📄 **Example File**: Repository example moved to `example.yml` for better structure
- ⚙️ **Configuration**: Use constants instead of hard coded values throughout codebase
- 🔧 **Dependencies**: Added `@bomb.sh/args` for CLI parsing and TypeScript for compilation checks

### Changed

- **Breaking**: Default source file is now `roadmap.yaml` instead of `data.yaml`
- **CLI**: Enhanced error messages with helpful suggestions for `--source` option
- **API**: `build()` function now accepts optional `sourceFile` parameter
- **CI/CD**: Refactored GitHub Actions workflows with sequential CI → Build/Publish architecture
- **Scripts**: Reorganized npm scripts - `build` for roadmap generation, `validate` for CI

### Fixed

- 🔧 **ESLint Configuration**: Improved ESLint rules without disabling checks unnecessarily
- 🏗️ **TypeScript Configuration**: Fixed `allowImportingTsExtensions` compatibility with `noEmit`
- ✨ **Code Style**: Enhanced build function modularity and removed trailing spaces
- 🧪 **Test Improvements**: Better test structure with named constants instead of magic numbers

## [0.1.0] - 2025-01-14

### Added

- 🎯 HTML roadmap generator from YAML data
- 📊 Interactive roadmap visualizations with project tracking
- 🎨 Professional dark theme with responsive design
- 📝 YAML configuration support with comprehensive validation
- 🏗️ Modular template system with external HTML templates
- ⚡ Template caching for improved performance with memory limits
- 🧪 Comprehensive test suite with 66+ tests and 201 assertions
- 🔧 ESLint configuration with code quality rules
- ✨ Prettier formatting with EditorConfig standards
- 📏 EditorConfig for consistent code style across editors
- 🛉 EditorConfig-checker for automated style validation in lint phase
- 📦 Dual usage: CLI tool and programmatic API
- 🚀 Cross-platform binary compilation support
- 📈 Flexible progress format support (percentages, fractions, phases, custom text)
- 🌍 Dynamic year detection (no hardcoded dates)
- 🔒 Built-in XSS protection with HTML escaping
- 🛡️ URL sanitization to block dangerous schemes

### Features

- **Project Status Tracking**: Visual indicators for completed, in-progress, planned, and on-hold projects
- **Quarter-based Timeline**: Organize projects across multiple quarters with highlighted periods
- **Rich Project Data**: Support for responsible parties, issue links, progress tracking
- **Metrics Dashboard**: KPIs and risk management
- **Interactive Elements**: Keyboard navigation, hover effects, and smooth scrolling
- **Export Ready**: Generate standalone HTML files for sharing

### Technical

- **Modern Architecture**: TypeScript with strict configuration and modular design
- **Template System**: External HTML templates with secure variable replacement
- **Code Quality**: KISS and DRY principles, comprehensive linting, EditorConfig standards
- **Industry Standards**: Follows npm/Node.js conventions with root index.ts
- **Organized Structure**: Logical grouping in core/, data/, and template/ modules
- **Bun Runtime**: Optimized for performance with Bun's native features
- **CI/CD Pipeline**: Automated quality checks and multi-platform binary builds
- **Security First**: Input sanitization, XSS protection, and URL validation built-in
- **Error Handling**: Comprehensive validation with clear error messages
- **Separated Concerns**: Quality checks (`check`) independent from build validation (`validate`)
