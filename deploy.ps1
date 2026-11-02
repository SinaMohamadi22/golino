
$ErrorActionPreference = "Stop"

# Remove previous build
if (Test-Path "dist") {
    Remove-Item "dist" -Recurse -Force
}

# Create output folder
New-Item -ItemType Directory -Path "dist" | Out-Null

# Copy HTML pages
Copy-Item "src/html/*" "dist" -Recurse

# Copy public assets
Copy-Item "src/public" "dist/public" -Recurse

# Copy fonts if the folder exists
if (Test-Path "src/fonts") {
    Copy-Item "src/fonts" "dist/fonts" -Recurse
}

# Fix asset paths in HTML files
Get-ChildItem "dist" -Filter "*.html" -File | ForEach-Object {
    $content = Get-Content $_.FullName -Raw -Encoding UTF8

    $content = $content.Replace("../public/", "public/")
    $content = $content.Replace("../fonts/", "fonts/")
    $content = $content.Replace("./main.html", "./index.html")

    Set-Content $_.FullName $content -Encoding UTF8
}

Write-Host "Golino build completed successfully!"
