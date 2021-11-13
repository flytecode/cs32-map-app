import React, { useRef, useEffect } from 'react'
import Coords from './objects/Coords'
import Way from './objects/Way'


function Canvas (props) {

    const canvasWays = useRef(null)
    const canvasRef = useRef(null)

    // Way_ID, Type, idk, node1Id, node2ID
    let way1 = new Way(1, 'road', null, 1, 2)
    let way2 = new Way(2, 'road', null, 2, 3)
    let way3 = new Way(3, 'road', null, 3, 4)
    let way4 = new Way(4, 'road', null, 4, 1)

    let coords1 = new Coords(41.825432, -71.393321);
    let coords2 = new Coords(41.82421, -71.401231);
    let coords3 = new Coords(41.82734, -71.40321);
    let coords4 = new Coords(41.825343, -71.40543);


    const nodeMap = {
        1: coords1,
        2: coords2,
        3: coords3,
        4: coords4
    }
    let ways = [way1,way2, way3, way4]

    let INIT_MAX_LAT = 41.828147
    let INIT_MIN_LAT = 41.823142
    let INIT_MAX_LON = -71.392231
    let INIT_MIN_LON = -71.407971

    let MapWidth = INIT_MAX_LON - INIT_MIN_LON // 0.01574 * 38119.44091 -> 600
    let MapHeight = INIT_MAX_LAT - INIT_MIN_LAT // 0.005005 * 139860.1399 -> 700


    let convertX = function(latitude) {
        return (latitude - INIT_MIN_LAT) * (600 / MapHeight)
    }

    let convertY = function(longitude) {
        return (longitude - INIT_MIN_LON) * (700 / MapWidth)
    }

    /**
     * returns ways
     * @returns {Promise<unknown>}
     */
    async function requestWays() {
        console.log(JSON.stringify([INIT_MAX_LAT, INIT_MIN_LAT, INIT_MAX_LON, INIT_MIN_LON]))
        return new Promise( (resolve, reject) => {
                // Address we are getting data from
                fetch("http://localhost:4567/ways", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                    },
                    // Data that we are inputting into the api. This allows us to get the ways for a specific area
                    body: JSON.stringify([INIT_MAX_LAT, INIT_MIN_LON, INIT_MIN_LAT, INIT_MAX_LON])
                }).then(response => response.json())
                    .then(response => {
                        //console.log("Response:", response)
                        if('error' in response) {
                            if (response.error === undefined) {
                                alert("An error occurred")
                            } else {
                                alert(response.error)
                            }
                            reject()
                        } else {
                            //console.log("ways:", response[0])
                            resolve( {
                                "ways" : response
                            })
                        }
                    })
            }
        )
    }

    const draw = async ctx => {

        await requestWays().then(ways => canvasWays.current = ways)
        console.log(canvasWays.current.ways[0])
        console.log(canvasWays.current.ways[0].startLon)

        ctx.fillStyle = '#000000'
        ctx.borderColor = 'black'
        ctx.beginPath()

        console.log("X: " + convertX(canvasWays.current.ways[0].startLat) + " Y: " + convertY(canvasWays.current.ways[0].startLon))


        // Cycle through all the lines and draw them
        for(let i = 0; i < canvasWays.current.ways.length; i++) {

            // Move the start of the line to the starting node
            ctx.moveTo(convertX(canvasWays.current.ways[i].startLat), convertY(canvasWays.current.ways[i].startLon));

            // Draw a line to the end node
            ctx.lineTo(convertX(canvasWays.current.ways[i].endLat), convertY(canvasWays.current.ways[i].endLon))

            //console.log("X: " + convertX(canvasWays.current.ways[i].startLat) + " Y: " + convertY(canvasWays.current.ways[i].startLon))
        }

        ctx.stroke() // finishes path
        ctx.closePath()
    }

    useEffect( () => {

        const canvas = canvasRef.current
        canvas.width = 600
        canvas.height = 700
        const ctx = canvas.getContext('2d')


        //Our draw come here
        draw(ctx)
    }, [draw])

    return <canvas ref={canvasRef} {...props}/>
}

export default Canvas