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
    const fileExplorerProvider = new FileExplorerProvider(workspaceRoot);
    vscode.window.registerTreeDataProvider('fkn-view-explorer', fileExplorerProvider);
    //Refresh
    context.subscriptions.push(vscode.commands.registerCommand('fkn-view-explorer.refresh', () => fileExplorerProvider.refresh()));
    
    
    
    //### TEMPLATES ###
    const templateExplorerProvider = new TemplateExplorerProvider(workspaceRoot);
    vscode.window.registerTreeDataProvider('fkn-view-explorer-templates', templateExplorerProvider);
    //Refresh
    context.subscriptions.push(vscode.commands.registerCommand('fkn-view-explorer-templates.refresh', () => templateExplorerProvider.refresh()));
    //Commands
    context.subscriptions.push(vscode.commands.registerCommand('fkn-view-explorer-templates.templateCreate', () => templateExplorerProvider.templateCreate()));
    context.subscriptions.push(vscode.commands.registerCommand('fkn-view-explorer-templates.templateRename', (node) => templateExplorerProvider.templateRename(node)));
    context.subscriptions.push(vscode.commands.registerCommand('fkn-view-explorer-templates.templateDelete', (node) => templateExplorerProvider.templateDelete(node)));
    context.subscriptions.push(vscode.commands.registerCommand('fkn-view-explorer-templates.createFolder', (node) => templateExplorerProvider.createFolder(node)));
    context.subscriptions.push(vscode.commands.registerCommand('fkn-view-explorer-templates.createFile', (node) => templateExplorerProvider.createFile(node)));
    context.subscriptions.push(vscode.commands.registerCommand('fkn-view-explorer-templates.rename', (node) => templateExplorerProvider.rename(node)));
    context.subscriptions.push(vscode.commands.registerCommand('fkn-view-explorer-templates.delete', (node) => templateExplorerProvider.delete(node)));
}
