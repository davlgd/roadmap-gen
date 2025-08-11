# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

**roadmap-gen** is a modern TypeScript-based HTML roadmap generator that converts YAML data into professional, interactive roadmap visualizations. The tool is designed for teams and organizations to create and share strategic roadmaps with rich project information, status tracking, and timeline visualization.

The package provides both a CLI tool for direct usage and a programmatic API for integration into other applications.

## Project Details

- **Name**: roadmap-gen
- **Version**: 0.3.1
- **Runtime**: Bun (primary), Node.js compatible
- **Language**: TypeScript with strict configuration
- **Architecture**: Modular design with separation of concerns

## Installation & Usage

### CLI Usage

```bash
# Direct usage with Bun (recommended)
bunx roadmap-gen

# With theme (external theme directory)
bunx roadmap-gen -s ./my-roadmap.yaml -t themes/cards -o ./public

# Show help
bunx roadmap-gen --help

# Or with npm
npx roadmap-gen
```

### Programmatic API

```javascript
// ES modules
import { build, generateHTML, parseYAML, CONFIG } from 'roadmap-gen';

// CommonJS
const { build, generateHTML, parseYAML, CONFIG } = require('roadmap-gen');

// Use individual functions
const yamlContent = readFileSync('roadmap.yaml', 'utf8');
const roadmap = parseYAML(yamlContent);
const html = generateHTML(roadmap);
writeFileSync('roadmap.html', html);

// Or use the main build function
await build(); // Uses defaults
await build('./data.yaml', 'themes/cards', './public'); // All custom
```

### Local Development

```bash
# Install dependencies
bun install

# Build roadmap (requires roadmap.yaml or use -s flag)
bun run build
bun run build -s example.yml

# Development mode (build + serve)
bun run dev

# Run tests
bun test

# Code quality and validation
bun run check           # Lint + format + tests
bun run validate        # Full validation (check + functional test)
bun run typecheck       # TypeScript compilation check (optional)
bun run lint
bun run lint:fix

# Clean output directory
bun run clean
```

## File Structure

```
index.ts              # 🎯 Main entrypoint (CLI & API)
src/
├── core/             # Core business logic
│   ├── build.ts     # Build orchestration
│   ├── config.ts    # Centralized configuration constants
│   └── types.ts     # Complete TypeScript type definitions
├── data/             # Data processing
│   └── parser.ts    # YAML parsing and data validation
├── template/         # Template system
│   ├── template.ts  # HTML document template generation
│   ├── template-loader.ts # Template loading and variable replacement
│   ├── html-generator.ts  # Modular HTML generation functions
│   └── html-utils.ts      # HTML generation utilities (DRY helpers)

themes/              # 🎨 All themes (including default)
├── default/         # Default embedded theme
│   ├── assets/      # Default static assets
│   │   ├── styles.css  # Default styling
│   │   └── script.js   # Interactive features
│   ├── main.html        # Main document structure
│   ├── header.html      # Page header template
│   ├── legend.html      # Status legend template
│   ├── category.html    # Category section template
│   ├── project-row.html # Project table row template
│   ├── quarter-cell.html # Quarter data cell template
│   ├── quarter-cell-empty.html # Empty quarter cell template
│   └── metrics.html     # Metrics section template
├── light/           # Light minimal theme
│   └── assets/
│       ├── styles.css
│       └── script.js
├── cards/           # Card-based layout theme
├── compact/         # Compact high-density theme
├── mobile/          # Mobile-optimized theme
├── timeline/        # Timeline visualization theme
└── README.md        # Theme documentation

tests/               # Comprehensive test suite (65+ tests)
├── build.test.ts    # Build process testing
├── config.test.ts   # Configuration validation
├── html-generator.test.ts # HTML generation testing
├── html-utils.test.ts # HTML utilities testing
├── parser.test.ts   # YAML parsing and validation
├── template.test.ts # Template generation testing
├── template-loader.test.ts # Template loading testing
└── types.test.ts    # Type definition validation

example.yml          # Sample roadmap data (YAML format)
tsconfig.json        # TypeScript configuration
package.json         # Package configuration with binary
.gitignore          # Git ignore patterns
```

## Data Format

The tool uses YAML for roadmap configuration:

```yaml
title: 'Product Roadmap 2025'
vision: 'Strategic vision statement'
quarters: ['Q1-2025', 'Q2-2025', 'Q3-2025', 'Q4-2025']
next_quarters: ['Q2-2025'] # Highlighted quarters

categories:
  - name: 'Infrastructure'
    icon: '🏗️'
    projects:
      - name: 'Cloud Migration'
        responsible: 'DevOps Team'
        issue: 'https://github.com/org/repo/issues/123'
        quarters:
          Q1-2025:
            status: 'in-progress'
            description: 'Migrating core services'
            details: ['Setup AWS infrastructure', 'Migrate databases']
            progress: '60%' # Can be percentage, fraction, phase, or text
            risks: ['Potential downtime during migration']
          Q2-2025:
            status: 'planned'
            description: 'Complete migration'

metrics:
  kpis:
    - 'System uptime > 99.9%'
    - 'Performance improvement > 25%'
  risks:
    - 'Resource constraints in Q3'
```

## Project Status Indicators

- ✅ **Completed** - Objectives achieved
- 🟡 **In Progress** - Active development
- 🔵 **Planned** - Approved and scheduled
- ⏸️ **On Hold** - Temporarily suspended

## Architecture & Design Patterns

### Modular Architecture

- **Separation of Concerns**: Each module has a single responsibility
- **Type Safety**: Comprehensive TypeScript types with strict configuration
- **Error Handling**: Robust validation and error reporting
- **Testability**: 66+ tests with full coverage
- **Security**: Built-in XSS protection and input sanitization

### Key Components

1. **Core Module**: Build orchestration, configuration, and type definitions
2. **Data Module**: YAML parsing with comprehensive validation rules
3. **Template Module**: Complete template system with HTML generation

- External HTML templates with variable replacement
- Efficient loading and caching of template files
- DRY utilities for reducing code duplication
- Modular HTML generation with reusable components

4. **Build System**: TypeScript compilation with Bun runtime

### Template System

The project uses a template-based approach for HTML generation:

- **External Templates**: HTML templates stored in `templates/` directory
- **Variable Replacement**: Simple `{{variable}}` syntax for dynamic content
- **Template Caching**: Automatic caching for improved performance
- **Modular Design**: Separate templates for different components
- **Easy Maintenance**: Edit HTML structure without touching TypeScript code

Template files use `{{variable}}` placeholders that are replaced with actual data:

```html
<!-- templates/header.html -->
<div class="header">
  <h1>{{title}}</h1>
  <div class="subtitle">{{vision}}</div>
</div>
```

## Development Guidelines

### Code Style

- Use TypeScript with strict mode enabled
- Write comprehensive JSDoc documentation
- Follow modular architecture patterns
- Maintain test coverage for new features
- Use English for all code comments and documentation
- Follow KISS principle: Keep It Simple, Stupid
- Apply DRY principle: Don't Repeat Yourself
- ESLint enforces code quality and consistency

### Adding Features

1. Update TypeScript types in `src/core/types.ts`
2. Add configuration constants to `src/core/config.ts`
3. Create/modify HTML templates in `templates/` directory
4. Implement functionality in appropriate module:

- Core logic: `src/core/`
- Data processing: `src/data/`
- Template system: `src/template/`

5. Add comprehensive tests
6. Update documentation

### Modifying Templates

- Edit HTML files in `templates/` directory directly
- Use `{{variable}}` syntax for dynamic content
- Test changes by running `bun run build`
- Templates are automatically cached for performance

### Working with Themes

- **Default theme**: Embedded in binary (no filesystem needed) - used when no theme specified
- **External themes**: Located in `themes/[name]/` directories
- **Theme structure**: `assets/` (styles.css, script.js), `templates/` (optional overrides)
- **Shared resources**: `themes/shared/` contains common JavaScript/CSS to avoid duplication
- Use `-t themes/[name]` CLI flag to specify external theme
- All external themes load shared functionality automatically

### Testing

- Tests use Bun's built-in test runner
- Aim for comprehensive coverage of all modules
- Include edge cases and error conditions
- Test TypeScript type definitions

## Build Output

Generates:

- **index.html** - Complete roadmap visualization
- **styles.css** - Professional theme styling (embedded default)
- **script.js** - Interactive features and navigation

Features:

- Responsive design with horizontal scrolling
- Interactive project details
- Current period highlighting
- Multiple professional themes
- Keyboard and mouse navigation
- Exportable HTML format

## Dependencies

**Runtime**:

- `js-yaml`: YAML parsing library
- `@bomb.sh/args`: CLI argument parsing

**Development**:

- Bun runtime for building and testing
- TypeScript compiler with strict configuration and optional type checking
- ESLint with comprehensive rules (no disabled checks)
- Prettier for consistent formatting
- EditorConfig for cross-editor consistency

## Security Features

The project implements comprehensive security measures:

- **XSS Protection**: All user input is HTML-escaped using a custom `escapeHtml()` function
- **URL Sanitization**: Dangerous URL schemes (javascript:, data:, vbscript:) are blocked
- **Template Safety**: Variable replacement uses escaped regex patterns to prevent injection
- **Input Validation**: Strict YAML validation with type checking and field validation
- **Memory Management**: Template cache with size limits (MAX_CACHE_SIZE = 100)
- **Progress Flexibility**: Accepts various formats (percentages, fractions, phases, custom text)
- **Dynamic Year Detection**: No hardcoded years, automatically uses current year

## Working with This Repository

This is a production-ready TypeScript project following modern development practices:

- **Strict TypeScript**: All code uses proper typing with strict compiler settings
- **Modular Design**: Clear separation between parsing, generation, and templating
- **Comprehensive Testing**: Full test suite with 66+ test cases
- **Professional Output**: Generates publication-ready HTML roadmaps
- **CLI Ready**: Can be used as a global binary with npx/bunx
- **Security First**: Built with security in mind, all inputs are sanitized

When making changes:

- Maintain TypeScript strict mode compliance
- Add tests for new functionality
- Update type definitions as needed
- Follow existing architectural patterns
- Ensure all text and comments are in English
- All files must end with a newline character (Git/POSIX compliance)
- **ALWAYS verify changes with `bun run check` for quality validation**
- **ALWAYS run `bun run validate` for complete validation before completion**

## Token Efficiency Guidelines

To minimize token consumption and maximize efficiency:

### Use Local Commands First

- **Prefer local file operations**: Use `Read`, `Edit`, `Grep`, `Glob` tools instead of asking questions
- **Use Bash for verification**: Run `bun test`, `bun run build`, `bun run lint` to verify changes
- **Batch operations**: Combine multiple file reads/edits in single tool calls when possible
- **Use specific searches**: `Grep` with patterns instead of reading entire files

### Smart Information Gathering

- **Search before asking**: Use `Grep` or `Glob` to find information in the codebase
- **Read targeted sections**: Use `offset` and `limit` parameters when reading large files
- **Use file system**: Check what exists with `LS` before making assumptions
- **Leverage existing patterns**: Look at similar code in the project before implementing new features

### Efficient Communication

- **Be concise**: Answer directly without unnecessary preamble or explanations
- **Use code over descriptions**: Show the actual change rather than describing it
- **Batch related tasks**: Group similar changes together
- **Reference existing code**: Point to line numbers and existing implementations

### Quality Assurance Workflow

1. **Make changes** using appropriate tools
2. **Run quality checks** with `bun run check` (linting, formatting, tests)
3. **Run full validation** with `bun run validate` (quality checks + functional test with example.yml)
4. **Or run individual checks**:

- TypeScript compilation: `bun run typecheck` (optional, strict)
- EditorConfig compliance: `editorconfig-checker`
- Code quality: `bun run lint`
- Tests: `bun test`
- Build with example: `bun run build -s example.yml`

5. **Only then report completion**

### Automated Enforcement

The project includes automated checks to ensure compliance:

- **ESLint rule**: `eol-last` enforces final newlines in TypeScript files
- **EditorConfig**: Automatic validation with `editorconfig-checker`
- **Prettier**: Automatic formatting with `prettier --write`
- **CI Pipeline**: GitHub Actions with release-triggered Build/Publish workflows
- **Convenience commands**:
  - `bun run check`: Quality validation (lint + format + test)
  - `bun run validate`: Full validation (quality + functional test with example.yml)
  - `bun run typecheck`: TypeScript strict compilation check (optional)
  - `bun run fix`: Automatic fixes (formatting + lint auto-fix)

This approach ensures changes are validated locally and reduces back-and-forth iterations.
