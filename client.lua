local shownZones = {}

Citizen.CreateThread(function()
    while true do
        Wait(1000)

        local playerPed = PlayerPedId()
        local playerCoords = GetEntityCoords(playerPed)

        for i, zone in ipairs(Config.Locations) do
            local dist = #(playerCoords - zone.coords)

            if dist < zone.radius then
                if not shownZones[i] then
                    shownZones[i] = true
                    local hour = GetClockHours()
                    local minute = GetClockMinutes()
                    TriggerEvent("location-names:showZone", zone.label, hour, minute)
                end
            else
                shownZones[i] = false
            end
        end
    end
end)

RegisterNetEvent("location-names:showZone", function(zoneName, hour, minute)
    SendNUIMessage({
        action = "show",
        location = zoneName,
        hour = hour,
        minute = minute
    })
    SetNuiFocus(false, false)
end)
