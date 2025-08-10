# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
