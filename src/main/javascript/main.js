//Global Variables
let ALL_ELEMENTS = [] // Contains all the elements
let PAGE_MAP = {} // A mapping of elements to i

// here's a hint at a potential way to keep track of the current element
// DO NOT IMPLEMENT THIS BEFORE FIGURING OUT YOUR HTML SPEC AND CORE FUNCTIONALITY
let CURRENT_ELEMENT = {
    // a function that updates this.value to newElement and reads the element
    setAndSpeak: async (newElement) => {},
    // the current element
    value: null
}

// Called when the window is loaded
window.onload = () => {
    /* TODO: initialize Speech API object, inject HTML, get page elements, and initialize event listeners here */
    mapPage()
    let VOICE_SYNTH = window.speechSynthesis

    // Cycle through every element
    for (let i = 0; i < ALL_ELEMENTS.length; i++) {
        // Get current element using page map
        let CURRENT_ELEMENT = document.getElementById(PAGE_MAP[i])
        if (CURRENT_ELEMENT !== null){
            // Get current tag name
            let CURRENT_TAG = CURRENT_ELEMENT.tagName
            console.log(CURRENT_TAG)

            // Call the correct method for the given tag name
            let CURRENT_CATEGORY = ROLES[CURRENT_TAG]

            let SPEECH_HANDLER = HANDLERS[CURRENT_CATEGORY]

            if(typeof SPEECH_HANDLER === 'function') {
                SPEECH_HANDLER(CURRENT_ELEMENT, VOICE_SYNTH)
            }
        }
    }
}

const mapPage = () => {
    if (ALL_ELEMENTS.length === 0){
        ALL_ELEMENTS = document.body.getElementsByTagName("*")
    }

    for (let i = 0; i < ALL_ELEMENTS.length; i++) {
        const currentElement = ALL_ELEMENTS[i]
        if (!currentElement.id){
            currentElement.id = i
        }
        PAGE_MAP[currentElement.id] = i
    }
}

// // just testing writing
// function title

// maps element categories to reading handlers (these should return strings)
// category -> function (that reads)

const sectionHandler = (currentElement, VOICE_SYNTH) => {
    let textToSpeak = "You are in the " + currentElement.tagName + "section"
    voiceOver(textToSpeak, VOICE_SYNTH)
}

const textHandler = (currentElement, VOICE_SYNTH) => {
    let textToSpeak = currentElement.innerText
    voiceOver(textToSpeak, VOICE_SYNTH)
}

const voiceOver = (textToSpeak, VOICE_SYNTH) => {
    let synth = VOICE_SYNTH
    let voices = synth.getVoices()
    let utterThis = new SpeechSynthesisUtterance(textToSpeak)
    synth.speak(utterThis)
}

const HANDLERS = {
    "metadata" : textHandler,
    "section" : sectionHandler,
    "text" : textHandler,
    "groups" : textHandler,
    "figures" : textHandler,
    "list" : textHandler,
    "interactive" : textHandler,
    "table" : textHandler,
    "multimedia" : textHandler,
    "form" : textHandler,
}



// maps element tag names to element categories
// element tag -> category
const ROLES = {
    "TITLE" : "metadata",

    "HEADER" : "section",
    "ASIDE" : "section",
    "ARTICLE" : "section",
    "FOOTER" : "section",
    "MAIN" : "section",
    "NAV" : "section",
    "SECTION" : "section",

    "P" : "text",
    "H1" : "text",
    "H2" : "text",
    "H3" : "text",
    "H4" : "text",
    "H5" : "text",
    "H6" : "text",

    "CODE" : "text",
    "TIME" : "text",
    "DIV" : "text",



    "BLOCKQUOTE" : "groups",
    "FIGCAPTION" : "groups",
    "CITE" : "groups",
    "CAPTION" : "groups",

    "FIGURE" : "figures",
    "IMG" : "figures",
    "CANVAS" : "figures",
    "SVG" : "figures",

    "LI" : "list",
    "UL" : "list",
    "OL" : "list",

    "BUTTON" : "interactive",
    "A" : "interactive",
    "INPUT" : "interactive",

    "TABLE" : "table",
    "TD" : "table",
    "TFOOT" : "table",
    "TH" : "table",
    "TR" : "table",

    "AUDIO" : "multimedia",

    "FIELDSET" : "form",
    "FORM" : "form",
    "LABEL" : "form",
    "OPTION" : "form",
    "PROGRESS" : "form",
    "SELECT" : "form",
    "TEXTAREA" : "form",













}

