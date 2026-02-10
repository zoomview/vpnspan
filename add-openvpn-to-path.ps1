# 添加OpenVPN到PATH（一次性脚本）
# 以管理员身份运行PowerShell，然后执行此脚本

$openVpnPath = "C:\Program Files\OpenVPN\bin"

# 获取当前用户PATH
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")

# 检查是否已包含
if ($userPath -notlike "*$openVpnPath*") {
    # 添加到用户PATH
    $newPath = $userPath + ";" + $openVpnPath
    [Environment]::SetEnvironmentVariable("Path", $newPath, "User")
    Write-Host "✅ 成功！OpenVPN已添加到用户PATH" -ForegroundColor Green
    Write-Host "⚠️ 请重启命令提示符或PowerShell使更改生效" -ForegroundColor Yellow
} else {
    Write-Host "ℹ️ OpenVPN已经在PATH中" -ForegroundColor Cyan
}

# 测试
Write-Host "`n测试OpenVPN..." -ForegroundColor Cyan
& "C:\Program Files\OpenVPN\bin\openvpn.exe" --version
