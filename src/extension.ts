import * as vscode from 'vscode';
import * as os from 'os';

let statusBarItem: vscode.StatusBarItem;
let terminal: vscode.Terminal | undefined;

export function activate(context: vscode.ExtensionContext) {
    console.log('Clawdbot extension is now active');

    // Create status bar item
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'clawdbot.connect';
    // statusBarItem.text = '$(plug) Clawdbot - Not connected (click to connect)';
    statusBarItem.text = '$(plug) Clawdbot';
    statusBarItem.tooltip = 'Click to connect to Clawdbot';
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);

    // Register connect command
    let connectCommand = vscode.commands.registerCommand('clawdbot.connect', async () => {
        await connect();
    });
    context.subscriptions.push(connectCommand);

    // Check auto-connect setting
    const config = vscode.workspace.getConfiguration('clawdbot');
    const autoConnect = config.get<boolean>('autoConnect', false);

    if (autoConnect) {
        // Auto-connect on startup
        setTimeout(() => {
            connect();
        }, 1000); // Small delay to ensure everything is initialized
    }

    // Listen for terminal close events
    vscode.window.onDidCloseTerminal((closedTerminal) => {
        if (terminal && closedTerminal === terminal) {
            terminal = undefined;
            // statusBarItem.text = '$(plug) Clawdbot - Not connected (click to connect)';
            statusBarItem.text = '$(plug) Clawdbot';
            statusBarItem.tooltip = 'Click to connect to Clawdbot';
        }
    });
}

async function connect() {
    try {
        // Update status to connecting
        statusBarItem.text = '$(sync~spin) Connecting...';
        statusBarItem.tooltip = 'Connection in progress';

        // Detect OS
        const platform = os.platform();
        const isWindows = platform === 'win32';

        // Create or reuse terminal
        if (!terminal) {
            if (isWindows) {
                terminal = vscode.window.createTerminal({
                    name: 'Claw',
                    shellPath: 'wsl.exe',
                    shellArgs: ['-d', 'Ubuntu']
                });
            } else {
                terminal = vscode.window.createTerminal('Clawdbot');
            }
        }

        // Show terminal and send command
        terminal.show(true); // true = preserve focus
        terminal.sendText('clawdbot status');

        // // Determine command based on OS
        // // const command = isWindows ? 'wsl clawdbot status' : 'clawdbot status';
        // const command = isWindows ? 'clawdbot status' : 'clawdbot status';
        // // Create or reuse terminal
        // if (!terminal) {
        //     terminal = vscode.window.createTerminal('Clawdbot');
        // }
        // // Show terminal and send command
        // terminal.show(true); // true = preserve focus
        // terminal.sendText(command);

        // Update status to connected
        // statusBarItem.text = '$(check) Clawdbot - Connected to Clawdbot';
        statusBarItem.text = '$(check) Clawdbot';
        statusBarItem.tooltip = 'Connected to Clawdbot';

        vscode.window.showInformationMessage('Connected to Clawdbot');
    } catch (error) {
        // statusBarItem.text = '$(plug) Clawdbot - Not connected (click to connect)';
        statusBarItem.text = '$(plug) Clawdbot';
        statusBarItem.tooltip = 'Click to connect to Clawdbot';
        vscode.window.showErrorMessage(`Failed to connect: ${error}`);
    }
}

export function deactivate() {
    if (terminal) {
        terminal.dispose();
    }
}
