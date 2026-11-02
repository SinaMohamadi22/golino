
$ErrorActionPreference = "Stop"

# Remove previous build
if (Test-Path "docs") {
    Remove-Item "docs" -Recurse -Force
}

# Create output folder
New-Item -ItemType Directory -Path "docs" | Out-Null

# Copy HTML pages
Copy-Item "src/html/*" "docs" -Recurse

# Copy public assets
Copy-Item "src/public" "docs/public" -Recurse

# Copy fonts if the folder exists
if (Test-Path "src/fonts") {
    Copy-Item "src/fonts" "docs/fonts" -Recurse
}

# Fix asset paths in HTML files
Get-ChildItem "docs" -Filter "*.html" -File | ForEach-Object {
    $content = Get-Content $_.FullName -Raw -Encoding UTF8

    $content = $content.Replace("../public/", "public/")
    $content = $content.Replace("../fonts/", "fonts/")

    Set-Content $_.FullName $content -Encoding UTF8
}

Write-Host "Golino build completed successfully!"
