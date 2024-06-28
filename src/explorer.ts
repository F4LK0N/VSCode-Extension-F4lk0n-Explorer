import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export class FileExplorerProvider implements vscode.TreeDataProvider<FileItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<FileItem | undefined | void> = new vscode.EventEmitter<FileItem | undefined | void>();
    readonly onDidChangeTreeData: vscode.Event<FileItem | undefined | void> = this._onDidChangeTreeData.event;

    constructor(private workspaceRoot: string) { }

    getTreeItem(element: FileItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: FileItem): Thenable<FileItem[]> {
        if (!this.workspaceRoot) {
            vscode.window.showInformationMessage('No workspace folder open');
            return Promise.resolve([]);
        }

        const dirPath = element ? element.resourceUri.fsPath : this.workspaceRoot;
        return Promise.resolve(this.getFiles(dirPath));
    }

    private getFiles(dirPath: string): FileItem[] {
        if (this.pathExists(dirPath)) {
            const dirFiles = fs.readdirSync(dirPath);
            return dirFiles.map(fileName => {
                const filePath = path.join(dirPath, fileName);
                const isDirectory = fs.statSync(filePath).isDirectory();
                return new FileItem(vscode.Uri.file(filePath), isDirectory ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None);
            });
        } else {
            return [];
        }
    }

    private pathExists(p: string): boolean {
        try {
            fs.accessSync(p);
            return true;
        } catch (err) {
            return false;
        }
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }
}

export class FileItem extends vscode.TreeItem {
    
    iconPath = path.join(__filename, '..', '..', 'resources/fs', 'file.svg');
    contextValue = 'file';
    
    constructor(
        public readonly resourceUri: vscode.Uri,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super(resourceUri, collapsibleState);
        
        //this.tooltip = `${this.resourceUri.fsPath}`;
        //this.description = this.resourceUri.fsPath;
        
        //File
        if(collapsibleState == vscode.TreeItemCollapsibleState.None){
            this.contextValue = 'file';
            this.iconPath = path.join(__filename, '..', '..', 'resources', 'fs', 'file.svg');
        }
        //Folder
        else{
            this.contextValue = 'folder';
            if(collapsibleState == vscode.TreeItemCollapsibleState.Collapsed){
                this.iconPath = path.join(__filename, '..', '..', 'resources', 'fs', 'folder.svg');
            }else{
                this.iconPath = path.join(__filename, '..', '..', 'resources', 'fs', 'folder-open.svg');
            }
        }
    }
}
