
$roles = @("Carry", "Midlaner", "Offlaner", "Soft Support", "Hard Support")
$ranks = @("Herald", "Guardian", "Crusader", "Archon", "Legend", "Ancient", "Divine", "Immortal")

function Generate-RandomLobbyName { 
    $chars = "ABCDEF GH IJKLM NOP QRSTUV WXYZ0123456789 "
    return -join ((1..15) | ForEach-Object { $chars[(Get-Random -Minimum 0 -Maximum ($chars.Length - 1))] })
}

function Generate-RandomUserId {
    return Get-Random -Minimum 1000 -Maximum 99999
}

function Generate-RandomLobby {
    $lobbyId = Get-Random -Minimum 1000 -Maximum 9999
    $lobbyName = Generate-RandomLobbyName
    $rank = $ranks | Get-Random
    $numMembers = Get-Random -Minimum 1 -Maximum 5
    $members = @()
    $ownerAssigned = $false
    for ($i = 1; $i -le $numMembers; $i++) {
        $role = $roles | Get-Random
        $userId = Generate-RandomUserId
        $userOwner = $false

        # Assign one user as the owner
        if (-not $ownerAssigned) {
            $userOwner = $true
            $ownerAssigned = $true
        }

        $member = @{
            user_id = $userId
            user_role = $role
            user_owner = $userOwner
        }

        $members += $member
    }
    $lobby = @{
        Lobby_Id = $lobbyId
        Lobby_Name = $lobbyName
        Rank = $rank
        Members = $members
    }

    return $lobby
}

$lobbies = @()
for ($i = 1; $i -le 8; $i++) {
    $lobbies += Generate-RandomLobby
}
$jsonOutput = $lobbies | ConvertTo-Json -Depth 4
$jsonOutput | Set-Content -Path "lobbies.json"

Write-Output "JSON file 'lobbies.json' has been created."
