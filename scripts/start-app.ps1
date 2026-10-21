param(
  [ValidateSet('Preview','Dev','Build','Test','Install','QR')]
  [string]$Mode = 'Preview',
  [string]$ProductionUrl = ''
)
$ErrorActionPreference = 'Stop'
$taskProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $taskProjectRoot
$taskNodeCommand = Get-Command node -ErrorAction SilentlyContinue
if ($taskNodeCommand) { $taskNodePath = $taskNodeCommand.Source }
else { $taskNodePath = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' }
if (-not (Test-Path -LiteralPath $taskNodePath)) { throw 'Cần Node 24 để chạy dự án. Xem README.md.' }
$env:PATH = (Split-Path -Parent $taskNodePath) + ';' + $env:PATH
function Invoke-AppStep([string[]]$StepArguments) {
  & $taskNodePath @StepArguments
  if ($LASTEXITCODE -ne 0) { throw "Lệnh chạy không thành công: $($StepArguments -join ' ')" }
}
if ($Mode -eq 'Install') {
  $taskPnpmCommand = Get-Command pnpm -ErrorAction SilentlyContinue
  if ($taskPnpmCommand) { & $taskPnpmCommand.Source install --frozen-lockfile; if ($LASTEXITCODE -ne 0) { throw 'Cài thư viện thất bại.' } }
  else {
    $taskBundledPnpm = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules\pnpm\bin\pnpm.cjs'
    if (-not (Test-Path -LiteralPath $taskBundledPnpm)) { throw 'Cần pnpm để cài thư viện. Xem README.md.' }
    Invoke-AppStep -StepArguments @($taskBundledPnpm,'install','--frozen-lockfile','--store-dir','.pnpm-store')
  }
  exit
}
if (-not (Test-Path -LiteralPath 'node_modules/vite/bin/vite.js')) { throw 'Chưa có thư viện. Chạy scripts\start-app.ps1 -Mode Install trước.' }
switch ($Mode) {
  'Build' {
    Invoke-AppStep -StepArguments @('scripts/validate-content.mjs')
    Invoke-AppStep -StepArguments @('node_modules/typescript/bin/tsc','--noEmit')
    Invoke-AppStep -StepArguments @('node_modules/vite/bin/vite.js','build')
    Invoke-AppStep -StepArguments @('scripts/build-offline.mjs')
  }
  'Test' { Invoke-AppStep -StepArguments @('node_modules/vitest/vitest.mjs','run') }
  'Dev' { Invoke-AppStep -StepArguments @('node_modules/vite/bin/vite.js','--host','127.0.0.1','--port','5173','--strictPort') }
  'QR' {
    if (-not $ProductionUrl) { throw 'Cần -ProductionUrl là URL HTTPS của bản đã phát hành.' }
    Invoke-AppStep -StepArguments @('scripts/create-qr.mjs',$ProductionUrl)
  }
  'Preview' {
    if (-not (Test-Path -LiteralPath 'dist/index.html')) { & $PSCommandPath -Mode Build }
    Invoke-AppStep -StepArguments @('node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','5173','--strictPort')
  }
}
