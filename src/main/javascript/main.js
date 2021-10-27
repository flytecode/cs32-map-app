//Global Variables
let ALL_ELEMENTS = [] // Contains all of the elements of HTML
let PAGE_MAP = {} // A mapping of elements to i
// TODO define ALL_ELEMENTS and PAGE_MAP better

// CLASS CURRENT_ELEMENT
let CURRENT_ELEMENT = {

    // FUNCTION setAndSpeak
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
    // reset before operating again
}

// Called when the window is loaded
window.onload = () => {
    // Maps page elements
    mapPage()
    document.addEventListener('keyup', event => {

        // Starts the reader
        if (event.code === 'KeyP') {
            event.preventDefault();

            // Cycle through every element of HTML
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

        // Stops the reader
        if (event.code === 'KeyZ') {
            event.preventDefault();
            window.speechSynthesis.cancel()
            // cancel removes all utterances from the utterance queue
        }

        // Reads the previous section when prompted by KeyB
        if (event.code === 'KeyB') {
            event.preventDefault();

            // pause what the screen reader was reading
            window.speechSynthesis.pause()

            // announce what previous section is
            // ask whether the user wants continuous or prompted backward read
            let anncmntToSpeak =
            + "The previous section is" + prevElement.tagName +
            "To read backwards one section at a time, hit" + "KeyB Name"
            + "once." + "To read backwards without pausing, hit" + "KeyB Name"
            + "twice."
                voiceOver(anncmntToSpeak)

            CURRENT_ELEMENT.setAndSpeak(prevElement)
        }


        // Reads backwards until beginning of document
        if (event.code === 'KeyB' + 'KeyB') {
            event.preventDefault();

            // pause what the screen reader was reading
            window.speechSynthesis.pause()

            // Cycle through until beginning of document
            for (let i = prevId; i > -1; i--) {
                 // Speak the previous element according to the handler
                 CURRENT_ELEMENT.setAndSpeak(prevElement)
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
        const prevElement = All_ELEMENTS[i-1]
        const prevId = i-1
        if (!currentElement.id){
            currentElement.id = i
        }
        PAGE_MAP[currentElement.id] = i
    }
}

// TODO injectHTML()

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

// maps element category names to handler functions
// element category -> handler
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

