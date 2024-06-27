import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export class TemplateExplorerProvider implements vscode.TreeDataProvider<FileItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<FileItem | undefined | void> = new vscode.EventEmitter<FileItem | undefined | void>();
    readonly onDidChangeTreeData: vscode.Event<FileItem | undefined | void> = this._onDidChangeTreeData.event;

    constructor(private workspaceRoot: string) { }

    get templatesRoot(): string {
        return path.join(this.workspaceRoot, '#TEMPLATES');
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: FileItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: FileItem): Thenable<FileItem[]> {
        const dir = element ? element.resourceUri.fsPath : this.templatesRoot;
        return Promise.resolve(this.getFiles(dir));
    }

    private getFiles(dir: string): FileItem[] {
        if (!fs.existsSync(dir)) {
            return [];
        }
        const files = fs.readdirSync(dir);
        return files.map(file => this.createFileItem(path.join(dir, file)));
    }

    private createFileItem(filePath: string): FileItem {
        const isDirectory = fs.statSync(filePath).isDirectory();
        const icon = isDirectory ? 'folder' : 'document';
        const lightIconPath = path.join(__filename, '..', '..', 'resources', 'light', `${icon}.svg`);
        const darkIconPath = path.join(__filename, '..', '..', 'resources', 'dark', `${icon}.svg`);

        return new FileItem(vscode.Uri.file(filePath), {
            light: lightIconPath,
            dark: darkIconPath
        }, isDirectory ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None);
    }

    async templateCreate(): Promise<void> {
        const folderPath = await this.getTemplatePath(this.templatesRoot, 'New Template');
        if (folderPath) {
            fs.mkdirSync(folderPath);
            this.refresh();
        }
    }

    async templateRename(node: FileItem): Promise<void> {
        if (node) {
            const newName = await vscode.window.showInputBox({ prompt: 'Enter the new name', value: path.basename(node.resourceUri.fsPath) });
            if (newName) {
                const newFilePath = path.join(path.dirname(node.resourceUri.fsPath), newName);
                fs.renameSync(node.resourceUri.fsPath, newFilePath);
                this.refresh();
            }
        }
    }

    async templateDelete(node: FileItem): Promise<void> {
        if (node) {
            fs.rmSync(node.resourceUri.fsPath, { recursive: true, force: true });
            this.refresh();
        }
    }

    async createFile(node: FileItem): Promise<void> {
        const uri = node ? node.resourceUri : vscode.Uri.file(this.templatesRoot);
        const filePath = await this.getFilePath(uri, 'New File');
        if (filePath) {
            fs.writeFileSync(filePath, '');
            this.refresh();
        }
    }

    async createFolder(node: FileItem): Promise<void> {
        const uri = node ? node.resourceUri : vscode.Uri.file(this.templatesRoot);
        const folderPath = await this.getFilePath(uri, 'New Folder');
        if (folderPath) {
            fs.mkdirSync(folderPath);
            this.refresh();
        }
    }

    async delete(node: FileItem): Promise<void> {
        if (node) {
            fs.rmSync(node.resourceUri.fsPath, { recursive: true, force: true });
            this.refresh();
        }
    }

    async rename(node: FileItem): Promise<void> {
        if (node) {
            const newName = await vscode.window.showInputBox({ prompt: 'Enter the new name', value: path.basename(node.resourceUri.fsPath) });
            if (newName) {
                const newFilePath = path.join(path.dirname(node.resourceUri.fsPath), newName);
                fs.renameSync(node.resourceUri.fsPath, newFilePath);
                this.refresh();
            }
        }
    }

    private async getFilePath(uri: vscode.Uri, defaultName: string): Promise<string | undefined> {
        const fileName = await vscode.window.showInputBox({ prompt: `Enter ${defaultName} name`, value: defaultName });
        return fileName ? path.join(uri.fsPath, fileName) : undefined;
    }

    private async getTemplatePath(uri: string, defaultName: string): Promise<string | undefined> {
        const folderName = await vscode.window.showInputBox({ prompt: `Enter ${defaultName} name`, value: defaultName });
        return folderName ? path.join(uri, folderName) : undefined;
    }
}

class FileItem extends vscode.TreeItem {
    constructor(
        public readonly resourceUri: vscode.Uri,
        public readonly iconPath: { light: string; dark: string },
        public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super(resourceUri, collapsibleState);
    }
}
