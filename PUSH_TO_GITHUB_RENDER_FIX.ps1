$ErrorActionPreference = "Stop"

$repoUrl = "https://github.com/EHLUK/Planningappv10.git"
$work = Join-Path $env:TEMP "Planningappv10-render-repair"
$source = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "Preparing clean GitHub repair folder..." -ForegroundColor Cyan
if (Test-Path -LiteralPath $work) {
  Remove-Item -LiteralPath $work -Recurse -Force
}

git clone $repoUrl $work
Push-Location $work

Write-Host "Replacing repository contents with the fixed Render app..." -ForegroundColor Cyan
Get-ChildItem -Force | Where-Object { $_.Name -ne ".git" } | Remove-Item -Recurse -Force
Copy-Item -Path (Join-Path $source "*") -Destination $work -Recurse -Force
Copy-Item -Path (Join-Path $source ".dockerignore") -Destination $work -Force
Copy-Item -Path (Join-Path $source ".env.example") -Destination $work -Force
Copy-Item -Path (Join-Path $source ".gitignore") -Destination $work -Force

git add -A
git commit -m "Fix Render deployment structure" 2>$null

Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
git push origin main

Pop-Location
Write-Host "Complete. Now redeploy on Render." -ForegroundColor Green
