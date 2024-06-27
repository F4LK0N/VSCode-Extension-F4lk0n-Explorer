import * as vscode from 'vscode';
import { FileExplorerProvider } from './explorer';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "f4lk0n-explorer" is now active!');
    
    const workspaceRoot = vscode.workspace.rootPath;
    if(!workspaceRoot){
        vscode.window.showInformationMessage('No workspace folder open');
        return;
    }
    
    // Register tree view
    const fileExplorerProvider = new FileExplorerProvider(workspaceRoot);
    vscode.window.registerTreeDataProvider('f4lk0n-explorer-view', fileExplorerProvider);
    
    // Register command to refresh tree view
    context.subscriptions.push(vscode.commands.registerCommand('f4lk0n-explorer-view.refresh', () => fileExplorerProvider.refresh()));
}
