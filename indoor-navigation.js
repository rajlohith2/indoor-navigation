let previousTimestamp = null;
let totalDistance = 0;
let alpha = 0;
let accelX = 0, accelY = 0, accelZ = 0;

if (window.DeviceOrientationEvent && window.DeviceMotionEvent) {
    alert("DeviceOrientationEvent and DeviceMotionEvent supported.");
    window.addEventListener('deviceorientation', handleOrientation, true);
    window.addEventListener('devicemotion', handleMotion, true);

    function handleOrientation(event) {
        alpha = event.alpha || 0; // Rotation around the Z axis (0 to 360 degrees)
        document.getElementById('direction').textContent = alpha.toFixed(2);
        console.log("Orientation: ", alpha);
    }

    function handleMotion(event) {
        const timestamp = event.timeStamp;
        if (previousTimestamp) {
            const deltaTime = (timestamp - previousTimestamp) / 1000; // Convert milliseconds to seconds

            accelX = event.accelerationIncludingGravity.x || 0;
            accelY = event.accelerationIncludingGravity.y || 0;
            accelZ = event.accelerationIncludingGravity.z || 0;

            const acceleration = Math.sqrt(accelX ** 2 + accelY ** 2 + accelZ ** 2);

            // Integrate acceleration over time to get velocity and then distance
            const velocity = acceleration * deltaTime;
            const distance = velocity * deltaTime;

            totalDistance += distance;
            document.getElementById('distance').textContent = totalDistance.toFixed(2);
            console.log("Distance: ", totalDistance);
        }
        previousTimestamp = timestamp;
    }
} else {
    alert('Device Orientation or Motion API not supported on this device.');
    console.error("Device Orientation or Motion API not supported on this device.");
}
