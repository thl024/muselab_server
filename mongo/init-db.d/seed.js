// let error = true

print("Begin Seeding Process")

db.AudioMetadata.insertMany([
    {
        name: "Hat1",
        src: "/hats/hat1",
        file_type: "wav",
        sound_type: "perc",
    },
    {
        name: "Grand Piano",
        src: "/acoustic_grand_piano",
        file_type: "mp3",
        sound_type: "toned",
    }
])

// printjson(res)

// if (error) {
//     print("Error Occurred during Seeding: " + error)
//     quit(1)
// }