import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export class TemplateExplorerProvider implements vscode.TreeDataProvider<FileItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<FileItem | undefined | void> = new vscode.EventEmitter<FileItem | undefined | void>();
    readonly onDidChangeTreeData: vscode.Event<FileItem | undefined | void> = this._onDidChangeTreeData.event;

    private workspaceRoot: string;
    private rootFolder: string;
    private rootPath: string;
    
    constructor(workspaceRoot: string) {
        this.workspaceRoot = workspaceRoot;
        this.rootFolder = path.join(".fkn", "#TEMPLATES");
        this.rootPath = path.join(this.workspaceRoot, this.rootFolder);
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }
    
    private pathExists(path: string): boolean {
        try {
            fs.accessSync(path);
            return true;
        } catch (err) {
            return false;
        }
    }
    
    getRootPath(): string {
        return this.rootPath;
    }
    
    getTreeItem(element: FileItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: FileItem): Thenable<FileItem[]> {
        if (!this.workspaceRoot) {
            return Promise.resolve([]);
        }
        
        const elementPath = element ? element.resourceUri.fsPath : this.getRootPath();
        if (!this.pathExists(elementPath)) {
            return Promise.resolve([]);
        }
        
        let elementItems = fs.readdirSync(elementPath);
        elementItems = this.sortItems(elementPath, elementItems);
        
        return Promise.resolve(elementItems.map(itemName => {
            const itemPath = path.join(elementPath, itemName);
            
            //Folder
            if(fs.statSync(itemPath).isDirectory()){
                return new FileItem(
                    vscode.Uri.file(itemPath),
                    vscode.TreeItemCollapsibleState.Collapsed
                );
            }
            
            //File
            return new FileItem(
                vscode.Uri.file(itemPath),
                vscode.TreeItemCollapsibleState.None
            );
        }));
    }
    
    private sortItems(parentPath: string, itemsArray: string[]): string[] {
        const directories = itemsArray.filter(item => {
            const itemPath = path.join(parentPath, item);
            return fs.statSync(itemPath).isDirectory();
        });
    
        const files = itemsArray.filter(item => !directories.includes(item));
    
        directories.sort();
        files.sort();
    
        return [...directories, ...files];
    }
    
    //private getItems(path: string): FileItem[] {
    //    if (!this.pathExists(path)) {
    //        return [];
    //    }
    //    
    //    const pathItems = fs.readdirSync(path);
    //    return pathItems.map(pathName => {
    //        const itemPath = path.join(dirPath, itemName);
    //        const isDirectory = fs.statSync(itemPath).isDirectory();
    //        return new FileItem(vscode.Uri.file(itemPath), isDirectory ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None);
    //    });
    //    
    //    
    //    const items = fs.readdirSync(path);
    //    return items.map(item => this.createFileItem(path.join(path, item)));
    //}

//    private createFileItem(itemPath: string): FileItem {
//        const isDirectory = fs.statSync(itemPath).isDirectory();
//        const icon = isDirectory ? 'folder' : 'document';
//        const lightIconPath = path.join(__filename, '..', '..', 'resources', 'light', `${icon}.svg`);
//        const darkIconPath = path.join(__filename, '..', '..', 'resources', 'dark', `${icon}.svg`);
//
//        return new FileItem(vscode.Uri.file(itemPath), {
//            light: lightIconPath,
//            dark: darkIconPath
//        }, isDirectory ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None);
//    }

    async templateRoot(): Promise<void> {
        return this.templateCreate();
    }
    
    async templateCreate(): Promise<void> {
        
        const name = await this.getInput("Template");
        if(!name){
            return;
        }
        
        fs.mkdirSync(
            path.join(this.getRootPath(), name),
            {
                recursive: true
            }
        );
        this.refresh();
        
        //t rootPath = await this.getTemplatePath(this.getRootPath, 'New Template');
        //fs.mkdirSync(rootPath);
        //
        //t rootPath = await this.getTemplatePath(this.getRootPath, 'New Template');
        //fs.mkdirSync(rootPath);
        //
        //const newName = await vscode.window.showInputBox({ prompt: 'Enter the new name', value: path.basename(node.resourceUri.fsPath) });
        //
        //
        //if (folderPath) {
        //    fs.mkdirSync(folderPath);
        //    this.refresh();
        //}
    }

    async templateRename(node: FileItem): Promise<void> {
        //if (node) {
        //    const newName = await vscode.window.showInputBox({ prompt: 'Enter the new name', value: path.basename(node.resourceUri.fsPath) });
        //    if (newName) {
        //        const newFilePath = path.join(path.dirname(node.resourceUri.fsPath), newName);
        //        fs.renameSync(node.resourceUri.fsPath, newFilePath);
        //        this.refresh();
        //    }
        //}
    }

    async templateDelete(node: FileItem): Promise<void> {
        //if (node) {
        //    fs.rmSync(node.resourceUri.fsPath, { recursive: true, force: true });
        //    this.refresh();
        //}
    }

    async createFile(node: FileItem): Promise<void> {
        //t uri = node ? node.resourceUri : vscode.Uri.file(this.getRootPath);
        //const itemPath = await this.getFilePath(uri, 'New File');
        //if (itemPath) {
        //    fs.writeFileSync(itemPath, '');
        //    this.refresh();
        //}
    }

    async createFolder(node: FileItem): Promise<void> {
    //    t uri = node ? node.resourceUri : vscode.Uri.file(this.getRootPath);
    //    const folderPath = await this.getFilePath(uri, 'New Folder');
    //    if (folderPath) {
    //        fs.mkdirSync(folderPath);
    //        this.refresh();
    //    }
    }
    
    async rename(node: FileItem): Promise<void> {
        //if (node) {
        //    const newName = await vscode.window.showInputBox({ prompt: 'Enter the new name', value: path.basename(node.resourceUri.fsPath) });
        //    if (newName) {
        //        const newFilePath = path.join(path.dirname(node.resourceUri.fsPath), newName);
        //        fs.renameSync(node.resourceUri.fsPath, newFilePath);
        //        this.refresh();
        //    }
        //}
    }
    
    async delete(node: FileItem): Promise<void> {
        //if (node) {
        //    fs.rmSync(node.resourceUri.fsPath, { recursive: true, force: true });
        //    this.refresh();
        //}
    }



    private async getFilePath(uri: vscode.Uri, defaultName: string): Promise<string | undefined> {
        const itemName = await vscode.window.showInputBox({ prompt: `Enter ${defaultName} name`, value: defaultName });
        return itemName ? path.join(uri.fsPath, itemName) : undefined;
    }

    private async getInput(defaultValue: string = ""): Promise<string | undefined> {
        const name = await vscode.window.showInputBox({ prompt: "Name: ", value: defaultValue });
        return name;
    }
}

export class FileItem extends vscode.TreeItem {
    
    iconPath = path.join(__filename, '..', '..', 'resources/fs', 'file.svg')
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
            this.iconPath = path.join(__filename, '..', '..', 'resources', 'fs', 'file.svg')
        }
        else{
            //Template
            if(this.resourceUri.fsPath.endsWith("#TEMPLATES")) {
                this.contextValue = 'template';
                this.iconPath = path.join(__filename, '..', '..', 'resources', 'fs', 'template.svg')
            }
            
            //Folder
            else{
                this.contextValue = 'folder';
                this.iconPath = path.join(__filename, '..', '..', 'resources', 'fs', 'folder.svg')
            }
        }
    }
}
