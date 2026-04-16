$pairs = @(
  "https://ryznsquare.oopy.io/867b8067-6e38-4798-a4ea-1d9285c47c91|kdb.png",
  "https://ryznsquare.oopy.io/99733223-58de-4d60-8602-6e4546404ce6|cj-ai-center.png",
  "https://ryznsquare.oopy.io/6db011eb-90fa-443b-af4c-e77a4e05652f|yongdon.png",
  "https://ryznsquare.oopy.io/29dbaf4a-3267-4349-b54e-303a04bbd4bc|playkiki.png",
  "https://ryznsquare.oopy.io/90a7ebdb-7516-418d-8733-782307b42244|ophiuchus.png",
  "https://ryznsquare.oopy.io/c251cf2e-92b9-4da4-8460-39ef21ebecba|happyhan.png",
  "https://ryznsquare.oopy.io/d7eb3e45-613b-43d4-ad86-06bb384ef207|dreamjobschool.png",
  "https://ryznsquare.oopy.io/2888a716-14c2-44f0-a8df-de0a7d014688|skyupdragon.png",
  "https://ryznsquare.oopy.io/ec12519b-f757-4298-bc9b-3950dfc8e416|beopmu.png",
  "https://ryznsquare.oopy.io/d682e02b-b4e6-41db-abd7-3509e06ce55e|revimo.png",
  "https://ryznsquare.oopy.io/9a93325d-58ae-4832-a549-3f256ac911f3|yunho.png",
  "https://ryznsquare.oopy.io/37b54bf0-9816-455c-9a01-d400968a4286|jwp.png",
  "https://ryznsquare.oopy.io/42688dd0-aa9b-498a-abbe-cbe87a74554e|commkorea.png",
  "https://ryznsquare.oopy.io/873ab948-5aa5-4b03-81ee-d8b709abf8b5|owolschool.png",
  "https://ryznsquare.oopy.io/af4c0d9c-19fb-4c94-adf3-4399eae6a33a|wooriatoz.png",
  "https://ryznsquare.oopy.io/2d372af2-36f0-409c-9fa1-fb2f59d12a42|daran.png",
  "https://ryznsquare.oopy.io/0ceed645-8a0b-4006-9295-bde409e85438|atozoffshore.png",
  "https://ryznsquare.oopy.io/1a367e86-fea7-4777-9f2c-4d9abd457337|maxplusone.png",
  "https://ryznsquare.oopy.io/22a8a8f4-687c-4e7c-b42e-aaa389078e03|rexsoft.png",
  "https://ryznsquare.oopy.io/1fd2811e-b196-49ec-8c11-707fa4010843|umicco.png",
  "https://ryznsquare.oopy.io/d551869e-8f47-4c96-b494-82a9405469e8|wsl.png",
  "https://ryznsquare.oopy.io/ef5faba7-8ce3-41c1-adcf-49c61f4adc2a|jinju100.png",
  "https://ryznsquare.oopy.io/370bd70f-c3fa-4996-8e7a-e4b1d9d16037|sinwon.png",
  "https://ryznsquare.oopy.io/f79ccc09-d2b9-4198-822f-c2f79366a613|lh.png",
  "https://ryznsquare.oopy.io/b5f7b2d6-c2b0-4def-b841-1b0ac2101029|litchaud.png"
)

$outputDir = "d:\2026_futervisor\public\assets\portfolio"
$i = 1

foreach ($pair in $pairs) {
  $parts = $pair -split '\|'
  $oopyUrl = $parts[0]
  $filename = $parts[1]
  Write-Host "[$i/25] $filename ..."

  try {
    $html = (Invoke-WebRequest -Uri $oopyUrl -UseBasicParsing -TimeoutSec 15).Content

    $pattern = 'oopy\.lazyrockets\.com/api/v2/notion/image\?src=https[^"&]*prod-files[^"&]*(&amp;|&)blockId=[^"&]+'
    $allMatches = [regex]::Matches($html, $pattern)

    $imgUrl = $null
    foreach ($m in $allMatches) {
      $raw = "https://" + ($m.Value -replace "&amp;", "&")
      if ($raw -notmatch "Untitled\.png") {
        $imgUrl = $raw
        break
      }
    }

    if (-not $imgUrl -and $allMatches.Count -gt 0) {
      $imgUrl = "https://" + ($allMatches[0].Value -replace "&amp;", "&")
    }

    if (-not $imgUrl) {
      Write-Host "  [SKIP] no image found" -ForegroundColor Yellow
      $i++
      continue
    }

    $outPath = Join-Path $outputDir $filename
    Invoke-WebRequest -Uri $imgUrl -OutFile $outPath -UseBasicParsing -TimeoutSec 20
    $sizeKB = [Math]::Round((Get-Item $outPath).Length / 1KB, 1)
    Write-Host "  [OK] $filename ($sizeKB KB)" -ForegroundColor Green

  } catch {
    Write-Host "  [ERR] $($_.Exception.Message)" -ForegroundColor Red
  }

  $i++
  Start-Sleep -Milliseconds 300
}

Write-Host "`nDone." -ForegroundColor Cyan
