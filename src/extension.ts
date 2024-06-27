import * as vscode from 'vscode';
import { FileExplorerProvider } from './explorer';
import { TemplateExplorerProvider } from './templateExplorer';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "f4lk0n-explorer" is now active!');
    
    const workspaceRoot = vscode.workspace.rootPath;
    if(!workspaceRoot){
        vscode.window.showInformationMessage('No workspace folder open');
        return;
    }
    
    
    
    //### EXPLORER ###
    // Register tree view
    const fileExplorerProvider = new FileExplorerProvider(workspaceRoot);
    vscode.window.registerTreeDataProvider('fkn-view-explorer', fileExplorerProvider);
    
    // Register command to refresh tree view
    context.subscriptions.push(vscode.commands.registerCommand('fkn-view-explorer.refresh', () => fileExplorerProvider.refresh()));
    
    
    
    //### TEMPLATES ###
    const templateExplorerProvider = new TemplateExplorerProvider(workspaceRoot);
    vscode.window.registerTreeDataProvider('fkn-view-templates', templateExplorerProvider);
    
    context.subscriptions.push(vscode.commands.registerCommand('fkn-view-templates.templateCreate', () => templateExplorerProvider.templateCreate()));
    context.subscriptions.push(vscode.commands.registerCommand('fkn-view-templates.templateRename', (node) => templateExplorerProvider.templateRename(node)));
    context.subscriptions.push(vscode.commands.registerCommand('fkn-view-templates.templateDelete', (node) => templateExplorerProvider.templateDelete(node)));
    context.subscriptions.push(vscode.commands.registerCommand('fkn-view-templates.createFolder', (node) => templateExplorerProvider.createFolder(node)));
    context.subscriptions.push(vscode.commands.registerCommand('fkn-view-templates.createFile', (node) => templateExplorerProvider.createFile(node)));
    context.subscriptions.push(vscode.commands.registerCommand('fkn-view-templates.rename', (node) => templateExplorerProvider.rename(node)));
    context.subscriptions.push(vscode.commands.registerCommand('fkn-view-templates.delete', (node) => templateExplorerProvider.delete(node)));
}
