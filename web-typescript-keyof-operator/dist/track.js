export function formatId(id) {
    return `TRK-${id}`;
}
// >>> ADD this 26.10
const formatLabels = {
    vinyl: "Vinyl record",
    cd: "Compact disc",
    digital: "Digital download",
    cassette: "Cassette download"
};
// The object must contain all three required properties, 
// and each value must be a string.
export function describeFormat(format) {
    return formatLabels[format];
}
// STRING
// describeFormat("vinyl");   // "Vinyl record"
// describeFormat("cd");      // "Compact disc"
// describeFormat("digital"); // "Digital download"
describeFormat("cassette"); // "Cassette download"  // enter in /erminal: tsc
//# sourceMappingURL=track.js.map