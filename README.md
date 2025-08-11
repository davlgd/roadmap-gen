# roadmap-gen

🗺️ **Professional HTML roadmap generator from YAML data**

Transform your project roadmap into beautiful, interactive visualizations. Built with modern TypeScript and powered by Bun for lightning-fast performance.

[![CI/CD Pipeline](https://github.com/davlgd/roadmap-gen/actions/workflows/ci.yml/badge.svg)](https://github.com/davlgd/roadmap-gen/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/roadmap-gen.svg)](https://badge.fury.io/js/roadmap-gen)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## ✨ Features

- **🎨 Multiple Themes**: Professional themes for different audiences
- **📊 Interactive Visualizations**: Project tracking across quarters with status indicators
- **⚡ Lightning Fast**: Built with Bun runtime for optimal performance
- **🔧 Simple Configuration**: YAML format for defining roadmaps
- **🚀 Dual Usage**: CLI tool and programmatic API
- **📱 Responsive Design**: Works on desktop, tablet, and mobile

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

Download from [releases page](https://github.com/davlgd/roadmap-gen/releases) for Linux, macOS, or Windows.

## 🚀 Quick Start

### CLI Usage

```bash
# Basic usage
bunx roadmap-gen
npx roadmap-gen

# With options
roadmap-gen -s ./my-roadmap.yaml -t themes/cards -o ./public

# Show help
roadmap-gen --help
```

### Programmatic API

```typescript
import { build } from 'roadmap-gen';

await build(); // Uses defaults
await build('./data.yaml', 'themes/cards', './public');
```

## 📝 YAML Configuration

Create a `roadmap.yaml` file (see `example.yml` for complete reference):

```yaml
title: 'Product Roadmap 2025'
vision: 'Building the future of our platform'
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
            progress: '60%'
```

## 🎨 Themes

Professional themes for different audiences:

- **light** - Clean minimal design
- **cards** - Project cards layout for visual presentations
- **compact** - Ultra-dense table for many projects
- **mobile** - Mobile-first responsive design
- **timeline** - Enhanced chronological visualization

See [themes/README.md](themes/README.md) for details and custom theme creation.

## 🔧 Development

```bash
git clone https://github.com/davlgd/roadmap-gen.git
cd roadmap-gen
bun install
bun test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Submit a pull request

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🚀 Built With

- **[Bun](https://bun.sh/)** - Runtime and toolkit
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[js-yaml](https://github.com/nodeca/js-yaml)** - YAML parsing

---

**Made with ❤️ and powered by Bun**

[⭐ Star this repo](https://github.com/davlgd/roadmap-gen) if you find it useful!
