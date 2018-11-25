export function clearSelection() {
    if (window.getSelection().empty) {
        window.getSelection().empty();
    } else if (window.getSelection().removeAllRanges) {
        window.getSelection().removeAllRanges();
    }
}
