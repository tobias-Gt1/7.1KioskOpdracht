param(
    [Parameter(Mandatory = $true)]
    [string]$BranchName
)

if (-not (Test-Path ".git")) {
    Write-Error "Please run this script from the repository root."
    exit 1
}

git fetch --all
git switch main
git pull
git switch -c $BranchName main