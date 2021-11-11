import React, { useRef, useEffect } from 'react'
import Coords from './objects/Coords'
import Way from './objects/Way'


function Canvas (props) {

    const canvasRef = useRef(null)

    // Way_ID, Type, idk, node1Id, node2ID
    let way1 = new Way(1, 'road', null, 1, 2)
    let way2 = new Way(2, 'road', null, 2, 3)
    let way3 = new Way(3, 'road', null, 3, 4)
    let way4 = new Way(4, 'road', null, 4, 1)

    let coords1 = new Coords(100, 100);
    let coords2 = new Coords(200, 100);
    let coords3 = new Coords(200, 200);
    let coords4 = new Coords(100, 200);


    const nodeMap = {
        1: coords1,
        2: coords2,
        3: coords3,
        4: coords4
    }
    let ways = [way1, way2, way3, way4]


    /**
     * returns ways
     * @returns {Promise<unknown>}
     */
    async function requestWays() {
        return new Promise( (resolve, reject) => {
                // Address we are getting data from
                fetch("http://localhost:4567/ways", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                    },
                    // Data that we are inputting into the api. This allows us to get the ways for a specific area
                    body: JSON.stringify( {
                        //"northwest": [INIT_MAX_LAT, INIT_MIN_LON],
                        //"southeast" : [INIT_MIN_LAT, INIT_MAX_LON],
                    })
                }).then(response => response.json())
                    .then(response => {
                        console.log("Response:", response)
                        if("error" in response) {
                            if (response.error === undefined) {
                                alert("An error occurred")
                            } else {
                                console.log("ways:", response.ways)
                                resolve( {"ways": response.ways} )
                            }
                        }
                    })
            }
        )
    }

    /**
     * returns nodes
     * @returns {Promise<unknown>}
     */
    async function requestNodes() {
        return new Promise( (resolve, reject) => {
                fetch("http://localhost:4567/nodes", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                    },
                }).then(response => response.json())
                    .then(response => {
                        console.log("Response:", response)
                        if("error" in response) {
                            if (response.error === undefined) {
                                alert("An error occurred")
                            } else {
                                console.log("nodes:", response.nodes)
                                resolve( {"nodes": response.nodes} )
                            }
                        }
                    })
            }
        )
    }

    const draw = ctx => {
        ctx.fillStyle = '#000000'
        ctx.borderColor = 'black'
        ctx.beginPath()

        // Cycle through all the lines and draw them
        for(let i = 0; i < ways.length; i++) {
            // Get starting variables
            let startNode = nodeMap[ways[i].node1ID]
            let endNode = nodeMap[ways[i].node2ID]

            // Move the start of the line to the starting node
            ctx.moveTo(startNode.x, startNode.y)

            // Draw a line to the end node
            ctx.lineTo(endNode.x, endNode.y)
            console.log(startNode, endNode)
        }
        
        ctx.stroke() // finishes path
        ctx.closePath() // fills in object if the object is a building
        //ctx.strokeRect(0, 0, ctx.width, ctx.height);

    }

    useEffect(() => {

        const canvas = canvasRef.current
        canvas.width = window.innerWidth - 500
        canvas.height = window.innerHeight - 100
        const ctx = canvas.getContext('2d')

        //Our draw come here
        draw(ctx)
    }, [draw])

    return <canvas ref={canvasRef} {...props}/>
}

export default Canvas