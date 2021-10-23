//Global Variables
let ALL_ELEMENTS = [] // Contains all the elements
let PAGE_MAP = {} // A mapping of elements to i

let CURRENT_ELEMENT = {
    // a function that updates this.value to newElement and reads the element
    setAndSpeak: (newElement) => {
        // Set element
        this.value = newElement
        // Speak if the element isn't null
        if(this.value !== null) {
            // Get current tag name
            let CURRENT_TAG = this.value.tagName

            console.log(CURRENT_TAG)
            // Call the correct method for the given tag name
            let CURRENT_CATEGORY = ROLES[CURRENT_TAG]
            // Get the function to handle speech for the current tag
            let SPEECH_HANDLER = HANDLERS[CURRENT_CATEGORY]
            // This makes sure the speech handler is a function like we want
            if(typeof SPEECH_HANDLER === 'function') {
                SPEECH_HANDLER(this.value)
            }
        }
    },
    value: null,
}

// Called when the window is loaded
window.onload = () => {
    // Maps page elements
    mapPage()

    document.addEventListener('keyup', event => {
        // Starts the reader
        if (event.code === 'KeyP') {
            event.preventDefault();
            // Cycle through every element
            for (let i = 0; i < ALL_ELEMENTS.length; i++) {
                // Get current element using page map
                let newElement = document.getElementById(PAGE_MAP[i])
                // Speak the current element according to the handler
                CURRENT_ELEMENT.setAndSpeak(newElement)
            }
        }
        // Pauses and unpauses the reader
        if (event.code === 'KeyS') {
            event.preventDefault();
            window.speechSynthesis.pause()
            if(window.speechSynthesis.paused){
                window.speechSynthesis.resume()
            }
        }
    })
}

const mapPage = () => {
    // Get the elements
    if (ALL_ELEMENTS.length === 0){
        ALL_ELEMENTS = document.body.getElementsByTagName("*")
    }
    // Assign every element an id
    for (let i = 0; i < ALL_ELEMENTS.length; i++) {
        const currentElement = ALL_ELEMENTS[i]
        if (!currentElement.id){
            currentElement.id = i
        }
        PAGE_MAP[currentElement.id] = i
    }
}

// Handles tags that are in the metadata category
// TODO temporarily the same as the text handler
const metadataHandler = (currentElement) => {
    let textToSpeak = currentElement.innerText
    voiceOver(textToSpeak)
}

// Handles tags that are in the section category
const sectionHandler = (currentElement) => {
    let textToSpeak = "You are in the " + currentElement.tagName + "section"
    voiceOver(textToSpeak)
}

// Handles tags that are in the text category
const textHandler = (currentElement) => {
    let textToSpeak = currentElement.innerText
    voiceOver(textToSpeak)
}

// Handles tags that are in the metadata category
// TODO temporarily the same as the text handler
const groupsHandler = (currentElement) => {
    let textToSpeak = currentElement.innerText
    voiceOver(textToSpeak)
}

// Handles tags that are in the metadata category
// TODO temporarily the same as the text handler
const figuresHandler = (currentElement) => {
    let textToSpeak = currentElement.innerText
    voiceOver(textToSpeak)
}

// TODO temporarily the same as the text handler
const listHandler = (currentElement) => {
    let textToSpeak = currentElement.innerText
    voiceOver(textToSpeak)
}

// TODO temporarily the same as the text handler
const interactiveHandler = (currentElement) => {
    let textToSpeak = currentElement.innerText
    voiceOver(textToSpeak)
}

// TODO temporarily the same as the text handler
const tableHandler = (currentElement) => {
    let textToSpeak = currentElement.innerText
    voiceOver(textToSpeak)
}

// TODO temporarily the same as the text handler
const multimediaHandler = (currentElement) => {
    let textToSpeak = currentElement.innerText
    voiceOver(textToSpeak)
}

// TODO temporarily the same as the text handler
const formHandler = (currentElement) => {
    let textToSpeak = currentElement.innerText
    voiceOver(textToSpeak)
}


const voiceOver = (textToSpeak) => {
    let voices = window.speechSynthesis.getVoices()
    let utterThis = new SpeechSynthesisUtterance(textToSpeak)
    window.speechSynthesis.speak(utterThis)
}

const HANDLERS = {
    "metadata" : metadataHandler,
    "section" : sectionHandler,
    "text" : textHandler,
    "groups" : groupsHandler,
    "figures" : figuresHandler,
    "list" : listHandler,
    "interactive" : interactiveHandler,
    "table" : tableHandler,
    "multimedia" : multimediaHandler,
    "form" : formHandler,
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

