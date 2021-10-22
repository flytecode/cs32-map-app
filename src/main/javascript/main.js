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
    let textToSpeak = "You are in the " + currentElement.tagName.toString() + "section"
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
    "section" : sectionHandler,
    "text" : textHandler
}



// maps element tag names to element categories
// element tag -> category
const ROLES = {
    "header" : "section",
    "aside" : "section",
    "article" : "section",
    "footer" : "section",
    "main" : "section",
    "nav" : "section",
    "section" : "section",
    // h1, h2, -> text
    "p" : "text",
    "blockquote" : "groups",
    "figcaption" : "groups",
    "cite" : "groups",
    "caption" : "groups",
    // is this necessary cuz lemme look up if there is a function that gets us the tag type
}

// Called when the
window.onload = () => {
    /* TODO: initialize Speech API object, inject HTML, get page elements, and initialize event listeners here */
    mapPage()
    let VOICE_SYNTH = window.speechSynthesis
    console.log(PAGE_MAP)

    // // Cycle through every element
    // for (let i = 0; i < ALL_ELEMENTS.length; i++) {
    //     let current = document.getElementById(PAGE_MAP[i].toString()).innerText
    //
    //
    //
    //     let utterThis = new SpeechSynthesisUtterance(current)
    //     VOICE_SYNTH.speak(utterThis)
    // }

    // Cycle through every element
    for (let i = 0; i < ALL_ELEMENTS.length; i++) {
        // Get current element using page map
        let currentElement = document.getElementById(PAGE_MAP[i].toString())
        // Get current tag name
        let curTagName = currentElement.tagName
        // Call the correct method for the given tag name
        let curTagCategory = ROLES[curTagName]
        console.log()

        //HANDLERS[curTagCategory](currentElement, VOICE_SYNTH)
    }
}

