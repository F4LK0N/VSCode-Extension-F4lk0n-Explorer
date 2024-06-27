import * as vscode from 'vscode';

class F4lk0nExplorerProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
    getTreeItem(element: vscode.TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(element?: vscode.TreeItem): vscode.ProviderResult<vscode.TreeItem[]> {
        if (!element) {
            // Display workspace folders as root elements
            return vscode.workspace.workspaceFolders?.map(folder => new vscode.TreeItem(folder.uri.fsPath, vscode.TreeItemCollapsibleState.Collapsed));
        }
        return [];
    }
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "f4lk0n-explorer" is now active!');

    // Register tree view
    vscode.window.registerTreeDataProvider('f4lk0n-explorer', new F4lk0nExplorerProvider());

    // Register command to refresh tree view
    vscode.commands.registerCommand('f4lk0n-explorer.refresh', () => {
        vscode.window.createTreeView('f4lk0n-explorer', { treeDataProvider: new F4lk0nExplorerProvider() });
    });
}
