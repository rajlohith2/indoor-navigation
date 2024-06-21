let previousTimestamp = null;
let totalDistance = 0;
let alpha = 0, beta = 0, gamma = 0;
let accelX = 0, accelY = 0, accelZ = 0;

if (window.DeviceOrientationEvent && window.DeviceMotionEvent) {
    window.addEventListener('deviceorientation', handleOrientation, true);
    window.addEventListener('devicemotion', handleMotion, true);

    function handleOrientation(event) {
        alpha = event.alpha; // Rotation around the Z axis (0 to 360 degrees)
        beta = event.beta; // Rotation around the X axis (-180 to 180 degrees)
        gamma = event.gamma; // Rotation around the Y axis (-90 to 90 degrees)
        document.getElementById('direction').textContent = alpha.toFixed(2);
    }

    function handleMotion(event) {
        const timestamp = event.timeStamp;
        if (previousTimestamp) {
            const deltaTime = (timestamp - previousTimestamp) / 1000; // Convert milliseconds to seconds

            accelX = event.accelerationIncludingGravity.x;
            accelY = event.accelerationIncludingGravity.y;
            accelZ = event.accelerationIncludingGravity.z;

            const acceleration = Math.sqrt(accelX ** 2 + accelY ** 2 + accelZ ** 2);

            // Integrate acceleration over time to get velocity and then distance
            const velocity = acceleration * deltaTime;
            const distance = velocity * deltaTime;

            totalDistance += distance;
            document.getElementById('distance').textContent = totalDistance.toFixed(2);
        }
        previousTimestamp = timestamp;
    }
} else {
    alert('Device Orientation or Motion API not supported on this device.');
}
