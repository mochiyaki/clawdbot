# Clawdbot Extension - Testing Guide

## ✅ Implementation Complete

All files have been created and the extension has been successfully compiled!

## 📁 Project Structure
```
c:\Users\calcu\Desktop\ideas\clawdbot\vscode\
├── .vscode/
│   ├── launch.json       # Debug configuration
│   └── tasks.json        # Build tasks
├── src/
│   └── extension.ts      # Main extension code
├── out/
│   ├── extension.js      # Compiled JavaScript
│   └── extension.js.map  # Source map
├── package.json          # Extension manifest
├── tsconfig.json         # TypeScript config
└── README.md             # Documentation
```

## 🎯 Features Implemented

### Status Bar States
1. **Not Connected**: `$(plug) Clawdbot - Not connected (click to connect)`
2. **Connecting**: `$(sync~spin) Connecting...`
3. **Connected**: `$(check) Clawdbot - Connected to Clawdbot`

### OS Detection
- **Windows**: Executes `wsl clawdbot status`
- **Linux/Mac**: Executes `clawdbot status`

### Settings
- **Auto Connect**: `clawdbot.autoConnect` (default: false)
  - When enabled, automatically connects on VS Code startup

## 🧪 How to Test

### Method 1: Press F5 (Recommended)
1. Open the extension folder in VS Code: `c:\Users\calcu\Desktop\ideas\clawdbot\vscode`
2. Press **F5** to launch Extension Development Host
3. A new VS Code window will open with the extension loaded

### Method 2: Run Extension Command
1. Open the extension folder in VS Code
2. Press **Ctrl+Shift+D** (Debug view)
3. Select "Run Extension" from dropdown
4. Click the green play button

### What to Verify

#### Test 1: Initial State
- Look at the bottom-right status bar
- You should see: `$(plug) Clawdbot - Not connected (click to connect)`

#### Test 2: Manual Connection
1. Click the status bar item
2. Observe the icon change to spinning: `$(sync~spin) Connecting...`
3. A terminal named "Clawdbot" should open
4. The command `wsl clawdbot status` should execute (on Windows)
5. Status bar should update to: `$(check) Clawdbot - Connected to Clawdbot`

#### Test 3: Auto-Connect
1. In the Extension Development Host, open Settings (Ctrl+,)
2. Search for "clawdbot"
3. Enable "Clawdbot: Auto Connect"
4. Reload the window (Ctrl+Shift+P → "Developer: Reload Window")
5. The extension should automatically connect on startup

#### Test 4: Terminal Reuse
1. Click the status bar when already connected
2. The same terminal should be reused (not create a new one)

## 🐛 Troubleshooting

- **Extension doesn't appear**: Make sure you're in the Extension Development Host window
- **Command not found**: The `clawdbot` command needs to be installed on your system (or WSL for Windows)
- **No status bar item**: Check the Output panel (View → Output → select "Clawdbot")

## 📝 Next Steps

If you want to package and install the extension permanently:
```bash
npm install -g @vscode/vsce
vsce package
code --install-extension clawdbot-0.0.1.vsix
```
