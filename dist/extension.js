/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.activate = activate;
const vscode = __importStar(__webpack_require__(1));
const explorer_1 = __webpack_require__(2);
const templateExplorer_1 = __webpack_require__(5);
function activate(context) {
    console.log('Congratulations, your extension "f4lk0n-explorer" is now active!');
    const workspaceRoot = vscode.workspace.rootPath;
    if (!workspaceRoot) {
        vscode.window.showInformationMessage('No workspace folder open');
        return;
    }
    //### EXPLORER ###
    const fileExplorerProvider = new explorer_1.FileExplorerProvider(workspaceRoot);
    vscode.window.registerTreeDataProvider('fkn-view-explorer', fileExplorerProvider);
    //Refresh
    context.subscriptions.push(vscode.commands.registerCommand('fkn-view-explorer.refresh', () => fileExplorerProvider.refresh()));
    //### TEMPLATES ###
    const templateExplorerProvider = new templateExplorer_1.TemplateExplorerProvider(workspaceRoot);
    vscode.window.registerTreeDataProvider('fkn-view-explorer-templates', templateExplorerProvider);
    //Refresh
    context.subscriptions.push(vscode.commands.registerCommand('fkn-view-explorer-templates.refresh', () => templateExplorerProvider.refresh()));
    //Commands
    context.subscriptions.push(vscode.commands.registerCommand('fkn-view-explorer-templates.templateRoot', () => templateExplorerProvider.templateRoot()));
    context.subscriptions.push(vscode.commands.registerCommand('fkn-view-explorer-templates.templateCreate', () => templateExplorerProvider.templateCreate()));
    context.subscriptions.push(vscode.commands.registerCommand('fkn-view-explorer-templates.templateRename', (node) => templateExplorerProvider.templateRename(node)));
    context.subscriptions.push(vscode.commands.registerCommand('fkn-view-explorer-templates.templateDelete', (node) => templateExplorerProvider.templateDelete(node)));
    context.subscriptions.push(vscode.commands.registerCommand('fkn-view-explorer-templates.createFolder', (node) => templateExplorerProvider.createFolder(node)));
    context.subscriptions.push(vscode.commands.registerCommand('fkn-view-explorer-templates.createFile', (node) => templateExplorerProvider.createFile(node)));
    context.subscriptions.push(vscode.commands.registerCommand('fkn-view-explorer-templates.rename', (node) => templateExplorerProvider.rename(node)));
    context.subscriptions.push(vscode.commands.registerCommand('fkn-view-explorer-templates.delete', (node) => templateExplorerProvider.delete(node)));
}


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileItem = exports.FileExplorerProvider = void 0;
const vscode = __importStar(__webpack_require__(1));
const path = __importStar(__webpack_require__(3));
const fs = __importStar(__webpack_require__(4));
class FileExplorerProvider {
    workspaceRoot;
    _onDidChangeTreeData = new vscode.EventEmitter();
    onDidChangeTreeData = this._onDidChangeTreeData.event;
    constructor(workspaceRoot) {
        this.workspaceRoot = workspaceRoot;
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (!this.workspaceRoot) {
            vscode.window.showInformationMessage('No workspace folder open');
            return Promise.resolve([]);
        }
        const dirPath = element ? element.resourceUri.fsPath : this.workspaceRoot;
        return Promise.resolve(this.getFiles(dirPath));
    }
    getFiles(dirPath) {
        if (this.pathExists(dirPath)) {
            const dirFiles = fs.readdirSync(dirPath);
            return dirFiles.map(fileName => {
                const filePath = path.join(dirPath, fileName);
                const isDirectory = fs.statSync(filePath).isDirectory();
                return new FileItem(vscode.Uri.file(filePath), isDirectory ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None);
            });
        }
        else {
            return [];
        }
    }
    pathExists(p) {
        try {
            fs.accessSync(p);
            return true;
        }
        catch (err) {
            return false;
        }
    }
    refresh() {
        this._onDidChangeTreeData.fire();
    }
}
exports.FileExplorerProvider = FileExplorerProvider;
class FileItem extends vscode.TreeItem {
    resourceUri;
    collapsibleState;
    constructor(resourceUri, collapsibleState) {
        super(resourceUri, collapsibleState);
        this.resourceUri = resourceUri;
        this.collapsibleState = collapsibleState;
        this.tooltip = `${this.resourceUri.fsPath}`;
        this.description = this.resourceUri.fsPath;
    }
    iconPath = {
        light: path.join(__filename, '..', '..', 'resources/fs', 'file.svg'),
        dark: path.join(__filename, '..', '..', 'resources/fs', 'file.svg')
    };
    contextValue = 'file';
}
exports.FileItem = FileItem;


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileItem = exports.TemplateExplorerProvider = void 0;
const vscode = __importStar(__webpack_require__(1));
const path = __importStar(__webpack_require__(3));
const fs = __importStar(__webpack_require__(4));
class TemplateExplorerProvider {
    _onDidChangeTreeData = new vscode.EventEmitter();
    onDidChangeTreeData = this._onDidChangeTreeData.event;
    workspaceRoot;
    rootFolder;
    rootPath;
    constructor(workspaceRoot) {
        this.workspaceRoot = workspaceRoot;
        this.rootFolder = path.join(".fkn", "#TEMPLATES");
        this.rootPath = path.join(this.workspaceRoot, this.rootFolder);
    }
    refresh() {
        this._onDidChangeTreeData.fire();
    }
    pathExists(path) {
        try {
            fs.accessSync(path);
            return true;
        }
        catch (err) {
            return false;
        }
    }
    getRootPath() {
        return this.rootPath;
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
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
            if (fs.statSync(itemPath).isDirectory()) {
                return new FileItem(vscode.Uri.file(itemPath), vscode.TreeItemCollapsibleState.Collapsed);
            }
            //File
            return new FileItem(vscode.Uri.file(itemPath), vscode.TreeItemCollapsibleState.None);
        }));
    }
    sortItems(parentPath, itemsArray) {
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
    async templateRoot() {
        return this.templateCreate();
    }
    async templateCreate() {
        const name = await this.getInput("Template");
        if (!name) {
            return;
        }
        fs.mkdirSync(path.join(this.getRootPath(), name), {
            recursive: true
        });
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
    async templateRename(node) {
        //if (node) {
        //    const newName = await vscode.window.showInputBox({ prompt: 'Enter the new name', value: path.basename(node.resourceUri.fsPath) });
        //    if (newName) {
        //        const newFilePath = path.join(path.dirname(node.resourceUri.fsPath), newName);
        //        fs.renameSync(node.resourceUri.fsPath, newFilePath);
        //        this.refresh();
        //    }
        //}
    }
    async templateDelete(node) {
        //if (node) {
        //    fs.rmSync(node.resourceUri.fsPath, { recursive: true, force: true });
        //    this.refresh();
        //}
    }
    async createFile(node) {
        //t uri = node ? node.resourceUri : vscode.Uri.file(this.getRootPath);
        //const itemPath = await this.getFilePath(uri, 'New File');
        //if (itemPath) {
        //    fs.writeFileSync(itemPath, '');
        //    this.refresh();
        //}
    }
    async createFolder(node) {
        //    t uri = node ? node.resourceUri : vscode.Uri.file(this.getRootPath);
        //    const folderPath = await this.getFilePath(uri, 'New Folder');
        //    if (folderPath) {
        //        fs.mkdirSync(folderPath);
        //        this.refresh();
        //    }
    }
    async rename(node) {
        //if (node) {
        //    const newName = await vscode.window.showInputBox({ prompt: 'Enter the new name', value: path.basename(node.resourceUri.fsPath) });
        //    if (newName) {
        //        const newFilePath = path.join(path.dirname(node.resourceUri.fsPath), newName);
        //        fs.renameSync(node.resourceUri.fsPath, newFilePath);
        //        this.refresh();
        //    }
        //}
    }
    async delete(node) {
        //if (node) {
        //    fs.rmSync(node.resourceUri.fsPath, { recursive: true, force: true });
        //    this.refresh();
        //}
    }
    async getFilePath(uri, defaultName) {
        const itemName = await vscode.window.showInputBox({ prompt: `Enter ${defaultName} name`, value: defaultName });
        return itemName ? path.join(uri.fsPath, itemName) : undefined;
    }
    async getInput(defaultValue = "") {
        const name = await vscode.window.showInputBox({ prompt: "Name: ", value: defaultValue });
        return name;
    }
}
exports.TemplateExplorerProvider = TemplateExplorerProvider;
class FileItem extends vscode.TreeItem {
    resourceUri;
    collapsibleState;
    constructor(resourceUri, collapsibleState) {
        super(resourceUri, collapsibleState);
        this.resourceUri = resourceUri;
        this.collapsibleState = collapsibleState;
        //this.tooltip = `${this.resourceUri.fsPath}`;
        //this.description = this.resourceUri.fsPath;
    }
    iconPath = path.join(__filename, '..', '..', 'resources/fs', 'file.svg');
    contextValue = 'file';
}
exports.FileItem = FileItem;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map