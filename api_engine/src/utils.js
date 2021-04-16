function toArrayBuffer(buffer) {
    var ab = new ArrayBuffer(buffer.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }
    return ab;
}

function initializeNotes() {
    const notes = ["B", "Bb", "A", "Ab", "G", "Gb", "F", "E", "Eb", "D", "Db", "C"]
    const noteRange = [4];

    const allNotes = [];
    noteRange.forEach(octave => {notes.forEach(note => {
        allNotes.push(note+octave);
    })})
    allNotes.unshift("C5")
    return allNotes
}

module.exports = {
    toArrayBuffer: toArrayBuffer,
    notes: initializeNotes(),
}

// exports.toArrayBuffer = toArrayBuffer;