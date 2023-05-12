// Append an instance of the MediumHighlighter class to the document body
const mediumHighlighter = document.createElement("medium-highlighter");
document.body.appendChild(mediumHighlighter);

//sets the location of the highlighter button given the value of 'markerPosition'
const setMarkerPosition = (markerPosition) =>
  mediumHighlighter.setAttribute(
    "markerPosition",
    JSON.stringify(markerPosition)
  );

//Returns the value of the text selection
//...was cleaner as an arrow function
const getSelectedText = () => window.getSelection().toString();

//Listen for clicks (text highlights) on the document
//'selectionchange' not used here because the highlighter button will pop up before selection is complete
document.addEventListener("click", () => {
    if (getSelectedText().length > 0) {
        setMarkerPosition(getMarkerPosition());
    }
});

//hide the highlighter button if no text is selected
document.addEventListener("selectionchange", () => {
    if (getSelectedText().length === 0) {
        setMarkerPosition({ display: "none" });
    }
});

//get the position of the selected text and return an object with coordinates for the highlighter button
function getMarkerPosition() {
    const rangeBounds = window
        .getSelection()
        .getRangeAt(0)
        .getBoundingClientRect();
    return {
        // Substract width of marker button -> 40px / 2 = 20
        left: rangeBounds.left + rangeBounds.width / 2 - 20,
        top: rangeBounds.top - 30,
        display: "flex",
    };
}