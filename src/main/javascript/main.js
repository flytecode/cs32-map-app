/* ------ TODO: put global variables here -------- */
let ALL_ELEMENTS = []
let PAGE_MAP = {}
// here's a hint at a potential way to keep track of the current element
// DO NOT IMPLEMENT THIS BEFORE FIGURING OUT YOUR HTML SPEC AND CORE FUNCTIONALITY
let CURRENT_ELEMENT = {
   // a function that updates this.value to newElement and reads the element
   set: (newElement) => {},
   // the current element
 value: null
}

window.onload = () => {
    /* TODO: initialize Speech API object, inject HTML, get page elements, and initialize event listeners here */
    mapPage()
    //let VOICE_SYNTH = window.speechSynthesis
    //console.log("Loaded Successfully")
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


// maps element categories to reading handlers (these should return
// strings)
// const HANDLERS = {}

// maps element tag names to element categories
// const ROLES = {}
