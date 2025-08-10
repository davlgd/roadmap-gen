# roadmap-gen

🗺️ **Professional HTML roadmap generator from YAML data**

Transform your project roadmaps into beautiful, interactive visualizations. Built with modern TypeScript and powered by Bun for lightning-fast performance.

[![CI/CD Pipeline](https://github.com/your-username/roadmap-gen/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/roadmap-gen/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/roadmap-gen.svg)](https://badge.fury.io/js/roadmap-gen)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## ✨ Features

- **🎨 Professional Design**: Dark theme with responsive layout and smooth animations
- **📊 Rich Visualizations**: Interactive project tracking across quarters with status indicators
- **⚡ Lightning Fast**: Built with Bun runtime for optimal performance
- **🔧 Easy Configuration**: Simple YAML format for defining roadmaps
- **📱 Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **🚀 Dual Usage**: Both CLI tool and programmatic API
- **🎯 Export Ready**: Generate standalone HTML files for easy sharing
- **📈 Flexible Progress**: Support for percentages, fractions, phases, or custom text
- **🌍 Year-Agnostic**: Automatically adapts to current year, no hardcoded dates

### Visual Status Tracking

- ✅ **Completed** - Objectives achieved
- 🟡 **In Progress** - Active development
- 🔵 **Planned** - Approved and scheduled
- ⏸️ **On Hold** - Temporarily suspended

## 🚀 Quick Start

### CLI Usage

```bash
# Direct usage with Bun (recommended)
bunx roadmap-gen

# Or with npm
npx roadmap-gen

# Global installation
npm install -g roadmap-gen
roadmap-gen
```

### Programmatic API

```typescript
import { build, generateHTML, parseYAML, CONFIG } from 'roadmap-gen';

// Use individual functions
const yamlContent = readFileSync('roadmap.yaml', 'utf8');
const roadmap = parseYAML(yamlContent);
const html = generateHTML(roadmap);
writeFileSync('roadmap.html', html);

// Or use the main build function
await build();
```

## 📝 YAML Configuration

Create a `data.yaml` file with your roadmap structure:

```yaml
title: 'Product Roadmap 2025'
vision: 'Building the future of our platform'
quarters: ['Q1-2025', 'Q2-2025', 'Q3-2025', 'Q4-2025']
next_quarters: ['Q2-2025', 'Q3-2025'] # Highlighted quarters

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
            description: 'Migrating core services to cloud infrastructure'
            details:
              - 'Setup AWS infrastructure'
              - 'Migrate databases'
              - 'Configure monitoring'
            progress: '60%' # Can also be "3/5 tasks", "Phase 2", etc.
            risks: ['Potential downtime during migration']
          Q2-2025:
            status: 'planned'
            description: 'Complete migration and optimize'
            objectives: ['Zero downtime deployment', 'Cost optimization']

# Optional: Global metrics
metrics:
  kpis:
    - 'System uptime > 99.9%'
    - 'Performance improvement > 25%'
  risks:
    - 'Resource constraints in Q3'
    - 'Technical debt accumulation'
```

## 🛠️ Installation

### Package Manager

```bash
# Using Bun (recommended)
bun add roadmap-gen

# Using npm
npm install roadmap-gen

# Using yarn
yarn add roadmap-gen
```

### Pre-compiled Binaries

Download platform-specific binaries from the [releases page](https://github.com/your-username/roadmap-gen/releases):

- **Linux**: `roadmap-gen-linux-x64`, `roadmap-gen-linux-arm64`
- **macOS**: `roadmap-gen-darwin-arm64`
- **Windows**: `roadmap-gen-win32-x64.exe`

### From Source

```bash
git clone https://github.com/your-username/roadmap-gen.git
cd roadmap-gen
bun install
bun run build
```

## 🏗️ Architecture

roadmap-gen follows modern TypeScript best practices with a clean, modular architecture:

```
index.ts              # 🎯 Main entrypoint (CLI & API)
src/
├── core/             # Core business logic
│   ├── build.ts     # Build orchestration
│   ├── config.ts    # Configuration constants
│   └── types.ts     # TypeScript definitions
├── data/             # Data processing
│   └── parser.ts    # YAML parsing & validation
├── template/         # Template system
│   ├── template.ts  # HTML template generation
│   ├── template-loader.ts # Template loading & caching
│   ├── html-generator.ts  # HTML generation
│   └── html-utils.ts      # Utility functions
└── assets/           # Static assets
    ├── styles.css   # Professional styling
    └── script.js    # Interactive features
```

## 🔧 Development

### Prerequisites

- [Bun](https://bun.sh/) >= 1.2.19
- Node.js >= 18 (for compatibility)

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/roadmap-gen.git
cd roadmap-gen

# Install dependencies
bun install

# Run tests
bun test

# Build project
bun run build

# Development server
bun run dev

# Code quality
bun run lint
bun run lint:fix

# Formatting
bun run format
bun run format:check

# Quality checks
bun run check
bun run fix

# Full validation
bun run validate
```

### Testing

```bash
# Run all tests
bun test

# Watch mode
bun run test:watch

# With coverage
bun test --coverage
```

## 📊 Key Features Deep Dive

### Template System

- **External Templates**: HTML templates stored in `templates/` directory
- **Variable Replacement**: Simple `{{variable}}` syntax for dynamic content
- **Template Caching**: Automatic caching for improved performance
- **Easy Customization**: Modify HTML structure without touching TypeScript

### Data Validation

- **Comprehensive Validation**: Strict YAML schema validation
- **Error Reporting**: Clear, actionable error messages
- **Type Safety**: Full TypeScript type checking throughout

### Performance

- **Template Caching**: Reduces file I/O operations
- **Optimized Builds**: Minified output with source maps
- **Bun Runtime**: Native performance optimizations

## 🤝 Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) and:

1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Run the test suite
5. Submit a pull request

### Development Guidelines

- Follow TypeScript strict mode
- Write comprehensive tests
- Use meaningful commit messages
- Update documentation as needed
- Maintain code quality with ESLint

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🚀 Built With

- **[Bun](https://bun.sh/)** - Fast JavaScript runtime and toolkit
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[js-yaml](https://github.com/nodeca/js-yaml)** - YAML parsing
- **[@bomb.sh/args](https://bomb.sh/docs/args/api)** - CLI argument parsing
- **[ESLint](https://eslint.org/)** - Code quality and consistency

## 📈 Roadmap

Check out our [project roadmap](https://your-username.github.io/roadmap-gen/) built with roadmap-gen itself!

Future features:

- 🎨 Custom themes and color schemes
- 📊 Advanced metrics and analytics
- 🔗 Integration with project management tools
- 📱 Mobile-first responsive improvements
- 🌐 Multi-language support

---

**Made with ❤️ and powered by Bun**

[⭐ Star this repo](https://github.com/your-username/roadmap-gen) if you find it useful!
