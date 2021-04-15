// let error = true

print("Begin Seeding Process")

db.AudioMetadata.insertMany([
    {
        name: "Hat1",
        src: "/hats/hat1.wav",
        type: "wav",
    }
])

// printjson(res)

// if (error) {
//     print("Error Occurred during Seeding: " + error)
//     quit(1)
// }