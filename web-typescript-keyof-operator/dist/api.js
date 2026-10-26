export function ok(data) {
    return { status: 200, message: "OK", data };
}
// extend TRACK
export function findById(items, id) {
    return items.find((item) => item.id === id);
}
//# sourceMappingURL=api.js.map