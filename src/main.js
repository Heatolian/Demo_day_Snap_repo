import {
   bootstrapCameraKit,
   createMediaStreamSource,
   Transform2D, 
 } from '@snap/camera-kit'

 (async function (){
    var cameraKit = await bootstrapCameraKit({apiToken:'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNjk3MTIzODc0LCJzdWIiOiJjNjgxNDRmMy0xYzIzLTQ2YjAtYmQxYi1mYWM2MDY1NzVkNDd-U1RBR0lOR35mYzFjNGY2My03YTAxLTQ5ODMtYmRmZi0yODg1MTQxNzdlMjMifQ.BNMimqE4mjiaB3fbal6zaiY9rW5WRK33dAZJYu9Ua1M'})

    const session = await cameraKit.createSession()
    document.getElementById('canvas').replaceWith(session.output.live)

    const { lenses } = await cameraKit.lensRepository.loadLensGroups(['49ad613a-7c87-4784-867e-bac29ccbad30'])

    session.applyLens(lenses[0])
    
    let mediaStream = await navigator.mediaDevices.getUserMedia ({video: 
        { facingMode: 'environment'}
    });

    const source = createMediaStreamSource(mediaStream, {
        cameraType:'back'
    })

    await session.setSource(source)

    session.source.setRenderSize(window.innerWidth, window.innerHeight)

    session.play()
 })();