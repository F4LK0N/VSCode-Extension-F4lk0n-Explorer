"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileItem = exports.FileExplorerProvider = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
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
        light: path.join(__filename, '..', '..', 'resources', 'light', 'document.svg'),
        dark: path.join(__filename, '..', '..', 'resources', 'dark', 'document.svg')
    };
    contextValue = 'file';
}
exports.FileItem = FileItem;
//# sourceMappingURL=explorer.js.map