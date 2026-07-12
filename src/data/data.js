// Dehradun Wards & Environmental Zones Dataset

export const DEHRADUN_CENTER = { lat: 30.3165, lng: 78.0322 };
export const DEHRADUN_BOUNDS = {
    north: 30.45,
    south: 30.20,
    east: 78.15,
    west: 77.90,
};

export const dehradunZones = [
    // Core City Wards
    { id: "RAJ", name: "Rajpur Road", lat: 30.3450, lng: 78.0450, type: "ward", issues: 67, risk: "Medium", primaryConcern: "Traffic pollution & construction dust", sustainabilityScore: 62, citizenParticipation: 71 },
    { id: "ISBT", name: "ISBT / Rispana Pul", lat: 30.3080, lng: 78.0280, type: "ward", issues: 94, risk: "High", primaryConcern: "Waste accumulation & river dumping", sustainabilityScore: 44, citizenParticipation: 38 },
    { id: "CLT", name: "Clement Town", lat: 30.2870, lng: 78.0100, type: "ward", issues: 42, risk: "Low", primaryConcern: "Green cover maintenance", sustainabilityScore: 74, citizenParticipation: 65 },
    { id: "PRM", name: "Prem Nagar", lat: 30.3200, lng: 78.0000, type: "ward", issues: 78, risk: "Medium", primaryConcern: "Waterlogging & drainage", sustainabilityScore: 55, citizenParticipation: 48 },
    { id: "VAS", name: "Vasant Vihar", lat: 30.3350, lng: 78.0600, type: "ward", issues: 35, risk: "Low", primaryConcern: "Solid waste segregation", sustainabilityScore: 78, citizenParticipation: 82 },
    { id: "DOI", name: "Doiwala", lat: 30.1900, lng: 78.1200, type: "ward", issues: 86, risk: "High", primaryConcern: "Illegal dumping in peri-urban belt", sustainabilityScore: 41, citizenParticipation: 29 },
    { id: "DAL", name: "Dalanwala", lat: 30.3250, lng: 78.0380, type: "ward", issues: 51, risk: "Medium", primaryConcern: "Air quality & traffic congestion", sustainabilityScore: 63, citizenParticipation: 57 },
    { id: "KAN", name: "Kanwali", lat: 30.3400, lng: 78.0200, type: "ward", issues: 38, risk: "Low", primaryConcern: "Water supply efficiency", sustainabilityScore: 72, citizenParticipation: 66 },
    { id: "MAJ", name: "Majra", lat: 30.3100, lng: 78.0550, type: "ward", issues: 59, risk: "Medium", primaryConcern: "Construction debris & air quality", sustainabilityScore: 58, citizenParticipation: 45 },
    { id: "RAI", name: "Raipur", lat: 30.3600, lng: 78.0800, type: "ward", issues: 29, risk: "Low", primaryConcern: "Forest-urban boundary management", sustainabilityScore: 81, citizenParticipation: 74 },

    // Eco-sensitive Zones
    { id: "MUSS", name: "Mussoorie Foothills", lat: 30.4200, lng: 78.0600, type: "eco-sensitive", issues: 112, risk: "Critical", primaryConcern: "Forest degradation & hillside waste", sustainabilityScore: 38, citizenParticipation: 22 },
    { id: "RAJ_PARK", name: "Rajaji National Park Corridor", lat: 30.2400, lng: 78.0800, type: "eco-sensitive", issues: 45, risk: "Medium", primaryConcern: "Wildlife corridor encroachment", sustainabilityScore: 65, citizenParticipation: 31 },

    // River Corridors
    { id: "RISP", name: "Rispana River Corridor", lat: 30.3150, lng: 78.0300, type: "river-corridor", issues: 134, risk: "Critical", primaryConcern: "Sewage discharge & solid waste dumping", sustainabilityScore: 28, citizenParticipation: 42 },
    { id: "BIND", name: "Bindal River Corridor", lat: 30.3300, lng: 78.0450, type: "river-corridor", issues: 118, risk: "Critical", primaryConcern: "Industrial effluent & encroachment", sustainabilityScore: 32, citizenParticipation: 35 },

    // Tourist Zones
    { id: "SAH", name: "Sahastradhara", lat: 30.3800, lng: 78.1300, type: "tourist", issues: 89, risk: "High", primaryConcern: "Tourist waste & water contamination", sustainabilityScore: 47, citizenParticipation: 55 },
    { id: "ROB", name: "Robber's Cave (Gucchu Pani)", lat: 30.3700, lng: 78.0700, type: "tourist", issues: 72, risk: "High", primaryConcern: "Plastic waste & trail degradation", sustainabilityScore: 51, citizenParticipation: 60 },
    { id: "TAP", name: "Tapkeshwar Temple", lat: 30.3550, lng: 78.0150, type: "tourist", issues: 48, risk: "Medium", primaryConcern: "Water pollution from offerings", sustainabilityScore: 59, citizenParticipation: 68 },

    // Traffic Corridors
    { id: "TC_RAJP", name: "Rajpur Road Traffic Corridor", lat: 30.3400, lng: 78.0500, type: "traffic-corridor", issues: 76, risk: "High", primaryConcern: "Vehicular emissions & PM2.5 spikes", sustainabilityScore: 45, citizenParticipation: 40 },
    { id: "TC_HAR", name: "Haridwar Road Corridor", lat: 30.2700, lng: 78.0300, type: "traffic-corridor", issues: 82, risk: "High", primaryConcern: "Heavy vehicle emissions & dust", sustainabilityScore: 42, citizenParticipation: 33 },
];

// Simulated Environmental Reports
export const environmentalReports = [
    { id: "R001", zoneId: "RISP", type: "water", severity: "Critical", title: "Sewage overflow near ISBT bridge", description: "Untreated sewage flowing into Rispana river near ISBT crossing. Foul smell reported by residents.", reportedAt: "2026-03-06T08:30:00", lat: 30.3085, lng: 78.0275, status: "Open" },
    { id: "R002", zoneId: "BIND", type: "dumping", severity: "High", title: "Industrial waste dumping near Bindal", description: "Chemical waste spotted near Bindal riverbank in Dalanwala area.", reportedAt: "2026-03-06T07:15:00", lat: 30.3280, lng: 78.0430, status: "In Progress" },
    { id: "R003", zoneId: "SAH", type: "waste", severity: "High", title: "Plastic waste at Sahastradhara entrance", description: "Large pile of plastic bottles and food wrappers at parking area.", reportedAt: "2026-03-06T09:00:00", lat: 30.3810, lng: 78.1310, status: "Open" },
    { id: "R004", zoneId: "MUSS", type: "deforestation", severity: "Critical", title: "Illegal tree felling — Mussoorie road", description: "Multiple trees cut for road widening without clearance near Kolhu Khet.", reportedAt: "2026-03-05T16:00:00", lat: 30.4150, lng: 78.0580, status: "Open" },
    { id: "R005", zoneId: "DOI", type: "dumping", severity: "High", title: "Unauthorized waste dump — Doiwala bypass", description: "Construction debris and household waste dumped on roadside near Doiwala.", reportedAt: "2026-03-05T14:30:00", lat: 30.1920, lng: 78.1180, status: "In Progress" },
    { id: "R006", zoneId: "ROB", type: "waste", severity: "Medium", title: "Trail littering at Robber's Cave", description: "Visitors leaving trash along the cave pathway. Bins overflowing.", reportedAt: "2026-03-06T10:45:00", lat: 30.3710, lng: 78.0690, status: "Open" },
    { id: "R007", zoneId: "TC_RAJP", type: "air", severity: "High", title: "PM2.5 spike — Rajpur Road", description: "Air quality index crossed 180 near Astley Hall due to construction + traffic.", reportedAt: "2026-03-06T11:00:00", lat: 30.3420, lng: 78.0480, status: "Open" },
    { id: "R008", zoneId: "PRM", type: "flood", severity: "Medium", title: "Waterlogging — Prem Nagar underpass", description: "Knee-deep water accumulation after morning drizzle. Drainage blocked.", reportedAt: "2026-03-06T06:30:00", lat: 30.3210, lng: 78.0010, status: "Resolved" },
    { id: "R009", zoneId: "TC_HAR", type: "air", severity: "High", title: "Dust pollution — Haridwar Road expansion", description: "Continuous dust from road construction affecting nearby residential areas.", reportedAt: "2026-03-05T18:00:00", lat: 30.2720, lng: 78.0320, status: "In Progress" },
    { id: "R010", zoneId: "RISP", type: "water", severity: "Critical", title: "Drain collapse into Rispana — Karanpur", description: "Storm drain collapsed, directing untreated waste water into the river.", reportedAt: "2026-03-06T05:45:00", lat: 30.3200, lng: 78.0310, status: "Open" },
    { id: "R011", zoneId: "TAP", type: "water", severity: "Medium", title: "Water contamination — Tapkeshwar stream", description: "Offerings and flowers causing organic waste buildup in stream.", reportedAt: "2026-03-05T12:00:00", lat: 30.3560, lng: 78.0160, status: "In Progress" },
    { id: "R012", zoneId: "MUSS", type: "deforestation", severity: "High", title: "Hillside land clearing — Jollygrant area", description: "Unauthorized hillside clearing for construction spotted via satellite.", reportedAt: "2026-03-04T10:00:00", lat: 30.3950, lng: 78.0900, status: "Open" },
    { id: "R013", zoneId: "VAS", type: "waste", severity: "Low", title: "Overflowing community bin — Vasant Vihar", description: "Community waste bin not collected for 2 days. Minor overflow.", reportedAt: "2026-03-06T08:00:00", lat: 30.3340, lng: 78.0610, status: "Resolved" },
    { id: "R014", zoneId: "BIND", type: "water", severity: "Critical", title: "Toxic discharge — Bindal near Parade Ground", description: "Greenish discharge observed in Bindal stream. Lab testing recommended.", reportedAt: "2026-03-06T07:00:00", lat: 30.3320, lng: 78.0460, status: "Open" },
    { id: "R015", zoneId: "MAJ", type: "air", severity: "Medium", title: "Brick kiln emissions — Majra outskirts", description: "Brick kiln operating without emission control measures.", reportedAt: "2026-03-05T15:30:00", lat: 30.3050, lng: 78.0600, status: "In Progress" },
];

// River Health Data
export const riverHealthData = {
    rispana: {
        name: "Rispana River",
        length: "35 km",
        cleanlinessScore: 28,
        pollutionLevel: "Severe",
        dumping_alerts: 14,
        active_reports: 8,
        monthly: [
            { month: "Oct", score: 42 }, { month: "Nov", score: 38 }, { month: "Dec", score: 35 },
            { month: "Jan", score: 31 }, { month: "Feb", score: 29 }, { month: "Mar", score: 28 },
        ],
    },
    bindal: {
        name: "Bindal River",
        length: "22 km",
        cleanlinessScore: 32,
        pollutionLevel: "High",
        dumping_alerts: 9,
        active_reports: 6,
        monthly: [
            { month: "Oct", score: 48 }, { month: "Nov", score: 44 }, { month: "Dec", score: 40 },
            { month: "Jan", score: 36 }, { month: "Feb", score: 34 }, { month: "Mar", score: 32 },
        ],
    },
};

// Tourism Impact Data
export const touristSites = [
    { name: "Robber's Cave", dailyWaste: 420, complaints: 34, cleanliness: 4.2 },
    { name: "Sahastradhara", dailyWaste: 680, complaints: 56, cleanliness: 3.1 },
    { name: "Tapkeshwar Temple", dailyWaste: 280, complaints: 18, cleanliness: 5.8 },
    { name: "Mindrolling Monastery", dailyWaste: 190, complaints: 8, cleanliness: 7.2 },
    { name: "Forest Research Institute", dailyWaste: 310, complaints: 12, cleanliness: 6.5 },
    { name: "Rajaji National Park Entry", dailyWaste: 150, complaints: 22, cleanliness: 5.4 },
];

// Leaderboard
export const zoneLeaderboard = [
    { rank: 1, zone: "Vasant Vihar", score: 78, participation: 82, trend: "+5" },
    { rank: 2, zone: "Raipur", score: 81, participation: 74, trend: "+3" },
    { rank: 3, zone: "Clement Town", score: 74, participation: 65, trend: "+2" },
    { rank: 4, zone: "Kanwali", score: 72, participation: 66, trend: "+1" },
    { rank: 5, zone: "Rajaji Corridor", score: 65, participation: 31, trend: "-2" },
    { rank: 6, zone: "Dalanwala", score: 63, participation: 57, trend: "+4" },
    { rank: 7, zone: "Rajpur Road", score: 62, participation: 71, trend: "-1" },
    { rank: 8, zone: "Tapkeshwar", score: 59, participation: 68, trend: "+2" },
    { rank: 9, zone: "Majra", score: 58, participation: 45, trend: "-3" },
    { rank: 10, zone: "Prem Nagar", score: 55, participation: 48, trend: "0" },
    { rank: 11, zone: "Robber's Cave", score: 51, participation: 60, trend: "-2" },
    { rank: 12, zone: "Sahastradhara", score: 47, participation: 55, trend: "-4" },
    { rank: 13, zone: "Rajpur Traffic", score: 45, participation: 40, trend: "-1" },
    { rank: 14, zone: "ISBT Area", score: 44, participation: 38, trend: "-5" },
    { rank: 15, zone: "Haridwar Road", score: 42, participation: 33, trend: "-3" },
    { rank: 16, zone: "Doiwala", score: 41, participation: 29, trend: "-6" },
    { rank: 17, zone: "Mussoorie Foothills", score: 38, participation: 22, trend: "-4" },
    { rank: 18, zone: "Rispana Corridor", score: 28, participation: 42, trend: "-8" },
    { rank: 19, zone: "Bindal Corridor", score: 32, participation: 35, trend: "-5" },
];