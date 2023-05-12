const highlightColor = "rgb(213, 234, 255)";

//Changes the color of selected text after highlighter button is clicked
//Adds an svg icon for the highlighter button
const template = `
  <button id="mediumHighlighter">
    <svg class="text-marker" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
    </svg>
  </button>
`;

const styled = ({ display = "none", left = 0, top = 0 }) => `
  #mediumHighlighter {
    align-items: center;
    background-color: black;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    display: ${display};
    justify-content: center;
    left: ${left}px;
    padding: 5px 10px;
    position: fixed;
    top: ${top}px;
    width: 40px;
    z-index: 9999;
  }
  .text-marker {
    fill: white;
  }
  .text-marker:hover {
    fill: ${highlightColor};
  }
`;

class MediumHighlighter extends HTMLElement {
    //get keyword binds these properties to the MediumHighlighter class
    get markerPosition() {
      return JSON.parse(this.getAttribute("markerPosition") || "{}");
    }
  
    get styleElement() {
      return this.shadowRoot.querySelector("style");
    }
  
    static get observedAttributes() {
      return ["markerPosition"];
    }
  
    constructor() {
      super();
      this.render();
    }
  
    render() {
      this.attachShadow({ mode: "open" });
      const style = document.createElement("style");
      style.textContent = styled({});
      this.shadowRoot.appendChild(style);
      this.shadowRoot.innerHTML += template;
      this.shadowRoot
        .getElementById("mediumHighlighter")
        .addEventListener("click", () => this.highlightSelection());
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "markerPosition") {
        this.styleElement.textContent = styled(this.markerPosition);
      }
    }
  
    //Opens a new miniwindow when highlighter button is clicked
    highlightSelection() {
        const selectedText = window.getSelection().toString()
        console.log(selectedText)
        window.open("localhost:3000", "ChatGPT", "width=550,height=170,left=150,top=200,toolbar=0,status=0,")

    }
  }
  
  //define the MediumHighlighter class as 'medium-highlighter'
  window.customElements.define("medium-highlighter", MediumHighlighter);