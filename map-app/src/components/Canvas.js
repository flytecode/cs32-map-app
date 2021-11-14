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


    let convertY = function(latitude) {
        return (INIT_MAX_LAT - latitude) * (600 / MapHeight)
    }

    let convertX = function(longitude) {
        return (longitude - INIT_MIN_LON) * (600 / MapWidth)
    }


    /**
     * returns ways
     * @returns {Promise<unknown>}
     */
    async function requestWays() {
        // console.log(JSON.stringify([INIT_MAX_LAT, INIT_MIN_LAT, INIT_MAX_LON, INIT_MIN_LON]))
        return new Promise( (resolve, reject) => {
                // Address we are getting data from
                fetch("http://localhost:4567/ways", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                    },
                    // Data that we are inputting into the api. This allows us to get the ways for a specific area
                    body: JSON.stringify([INIT_MAX_LAT, INIT_MIN_LAT, INIT_MAX_LON, INIT_MIN_LON])
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
                            console.log("ways:", response[0])
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
        ctx.fillStyle = '#000000'
        ctx.borderColor = 'black'
        ctx.beginPath()


        let alreadyDrawn = [] //keeps track of street names we've already drawn
        // Cycle through all the lines and draw them
        for(let i = 0; i < canvasWays.current.ways.length; i++) {

            // Move the start of the line to the starting node
            let x1 = convertX(canvasWays.current.ways[i].startLon) //x coordinate for start node
            let y1 = convertY(canvasWays.current.ways[i].startLat) //y coordinate for start node
            ctx.moveTo(x1, y1)

            // Draw a line to the end node
            let x2 = convertX(canvasWays.current.ways[i].endLon) //x coordinate for end node
            let y2 = convertY(canvasWays.current.ways[i].endLat) //y coordinate for end node
            ctx.lineTo(x2, y2)
            console.log(canvasWays.current.ways[i].name)
            let streetName = canvasWays.current.ways[i].name
            let streetType = canvasWays.current.ways[i].type
            let angle = 0;
            let adj = x2 - x1
            let opp = y2 - y1
            // if (x1 < x2 && y1 < y2) { // NE
            //     angle = - Math.asin((opp)/Math.sqrt(Math.pow(adj, 2) + Math.pow(opp, 2)))
            // }
            // else if (x1 < x2 && y1 > y2) { // SE
            //     angle = - Math.asin((opp)/Math.sqrt(Math.pow(adj, 2) + Math.pow(opp, 2)))
            // }
            // else if (x1 > x2 && y1 < y2) { // NW
            //     angle = Math.asin((opp)/Math.sqrt(Math.pow(adj, 2) + Math.pow(opp, 2)))
            // }
            // else if (x1 > x2 && y1 > y2) { // SW
            //     angle = Math.asin((opp)/Math.sqrt(Math.pow(adj, 2) + Math.pow(opp, 2)))
            // }
            if (streetType == 'primary' || streetType == 'secondary'|| streetType == 'residential' || streetType == 'road' || streetType == 'tertiary'){
                if (!alreadyDrawn.includes(streetName)) {
                    ctx.font = "10px Arial"
                    // ctx.rotate(angle)
                    ctx.fillText(streetName,x1,y1)
                    ctx.restore()
                    alreadyDrawn.push(streetName)
                }
            }
            ctx.restore()
            // console.log("Y startLat : " + convertY(canvasWays.current.ways[i].startLat) + " X startLon: " + convertX(canvasWays.current.ways[i].startLon))
        }

        ctx.stroke() // finishes path
        ctx.closePath()
    }

    useEffect( () => {

        const canvas = canvasRef.current
        canvas.width = 600
        canvas.height = 600
        const ctx = canvas.getContext('2d')


        //Our draw come here
        draw(ctx)
        ctx.rotate(-90 * Math.PI / 180);
    }, [draw])

    return <canvas ref={canvasRef} {...props}/>
}

export default Canvas