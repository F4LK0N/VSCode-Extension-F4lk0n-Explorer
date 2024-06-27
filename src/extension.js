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
exports.activate = activate;
const vscode = __importStar(require("vscode"));
function activate(context) {
    console.log('Congratulations, your extension "f4lk0n-explorer" is now active!');
    // Register tree view
    vscode.window.registerTreeDataProvider('f4lk0n-explorer-view', new F4lk0nExplorerProvider());
    // Register command to refresh tree view
    vscode.commands.registerCommand('f4lk0n-explorer-view.refresh', () => {
        vscode.window.createTreeView('f4lk0n-explorer-view', { treeDataProvider: new F4lk0nExplorerProvider() });
    });
}
class F4lk0nExplorerProvider {
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (!element) {
            // Display workspace folders as root elements
            return vscode.workspace.workspaceFolders?.map(folder => new vscode.TreeItem(folder.uri.fsPath, vscode.TreeItemCollapsibleState.Collapsed));
        }
        return [];
    }
}
//# sourceMappingURL=extension.js.map