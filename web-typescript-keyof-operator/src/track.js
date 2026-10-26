const formatLabels = {
    vinyl: "Vinyl record",
    cd: "Compact disc",
    digital: "Digital download",
};
// The object must contain all three required properties, 
// and each value must be a string.
export function describeFormat(format) {
    // RETURN    
    return formatLabels[format];
}
// STRING
// describeFormat("vinyl");   // "Vinyl record"
// describeFormat("cd");      // "Compact disc"
// describeFormat("digital"); // "Digital download"
//# sourceMappingURL=track.js.map