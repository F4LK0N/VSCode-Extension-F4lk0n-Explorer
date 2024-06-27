# Type Script - Execution Policy (PowerShell)
## Error:
```shell
tsc : File C:\...\tsc.ps1 cannot be loaded because running scripts is disabled on this system.
```
## Solution:
- Open PowerShell as Administrator;
- Check current policy:
```shell
Get-ExecutionPolicy
```
- If it returns `Restricted`, that's likely causing the issue;
- Change policy:
```shell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```
> This command allows scripts to run that are signed by a trusted publisher (local scripts can run without a signature).


# GPT
### Enabling Script Execution in PowerShell (Windows)

To enable script execution in PowerShell, you need to adjust the PowerShell Execution Policy. Follow these steps:

1. **Open PowerShell as Administrator**:
   - Right-click on the PowerShell icon and select "Run as administrator" to open an elevated PowerShell session.

2. **Check Current Execution Policy**:
   - In the PowerShell window, type the following command and press Enter:
     ```powershell
     Get-ExecutionPolicy
     ```
   - Note down the current execution policy. If it returns `Restricted`, that’s likely causing the issue.

3. **Change Execution Policy**:
   - To change the execution policy to allow script execution (for development purposes), use the following command:
     ```powershell
     Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
     ```
     This command allows scripts to run that are signed by a trusted publisher (local scripts can run without a signature).

   - Alternatively, if you prefer to allow all scripts to run, use:
     ```powershell
     Set-ExecutionPolicy Unrestricted -Scope CurrentUser
     ```
     This allows all scripts to run, which is less secure and should be used cautiously.

4. **Confirm Execution Policy Change**:
   - Confirm the change by entering `Y` (yes) when prompted.

5. **Retry Running npm Tasks**:
   - After adjusting the execution policy, close and reopen Visual Studio Code.
   - Retry running your npm tasks (`npm run watch` or similar) to compile TypeScript or perform other development tasks.

### Additional Considerations

- **Security Concerns**: While changing the execution policy to `RemoteSigned` or `Unrestricted` can resolve the immediate issue, it temporarily lowers security. It’s recommended to revert back to a more restrictive policy (`Restricted` or `AllSigned`) after development tasks are completed.

- **Scope**: The `-Scope CurrentUser` parameter ensures that the policy change applies only to the current user’s session, which is typically sufficient for development purposes without affecting system-wide settings.

### Alternative Approaches

If you prefer not to change the execution policy, consider these alternatives:

- **Run PowerShell Commands Manually**: Instead of using VSCode tasks, open a PowerShell window as Administrator and run necessary commands manually (`npm install`, `npm run watch`, etc.).

- **Use Command Prompt**: Use Command Prompt (`cmd`) instead of PowerShell for running npm commands, as some npm commands may behave differently between PowerShell and Command Prompt.

By following these steps, you should be able to resolve the "cannot be loaded because running scripts is disabled on this system" error and successfully execute npm tasks or other scripts within your Visual Studio Code project. If you encounter any further issues or need additional assistance, feel free to ask!
