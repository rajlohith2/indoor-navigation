let previousTimestamp = null;
let totalDistance = 0;
let alpha = 0;
let accelX = 0, accelY = 0, accelZ = 0;
let tracking = false;
let recordedData = [];
let velocity = 0;

document.getElementById('startTracking').addEventListener('click', () => {
    tracking = true;
    previousTimestamp = null; // Reset timestamp when starting
    totalDistance = 0; // Reset total distance
    recordedData = []; // Clear recorded data
    velocity = 0; // Reset velocity
    console.log("Tracking started.");
});

document.getElementById('stopTracking').addEventListener('click', () => {
    tracking = false;
    console.log("Tracking stopped.");
    console.log("Recorded Data:", recordedData);
});

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
        if (!tracking) return;

        const timestamp = event.timeStamp;
        if (previousTimestamp) {
            const deltaTime = (timestamp - previousTimestamp) / 1000; // Convert milliseconds to seconds

            accelX = event.accelerationIncludingGravity.x || 0;
            accelY = event.accelerationIncludingGravity.y || 0;
            accelZ = event.accelerationIncludingGravity.z || 0;

            const acceleration = Math.sqrt(accelX ** 2 + accelY ** 2 + accelZ ** 2);

            // Log sensor data
            recordedData.push({
                timestamp: timestamp,
                accelX: accelX,
                accelY: accelY,
                accelZ: accelZ,
                acceleration: acceleration,
                deltaTime: deltaTime
            });

            // Ignore very small accelerations to reduce noise
            const accelerationThreshold = 0.1;
            if (acceleration > accelerationThreshold) {
                // Integrate acceleration over time to get velocity
                velocity += acceleration * deltaTime;
                // Calculate distance from velocity over time
                const distance = velocity * deltaTime;

                totalDistance += distance;
                document.getElementById('distance').textContent = totalDistance.toFixed(2);
                console.log("Distance: ", totalDistance);
            } else {
                console.log("Acceleration below threshold: ", acceleration);
            }
        }
        previousTimestamp = timestamp;
    }
} else {
    alert('Device Orientation or Motion API not supported on this device.');
    console.error("Device Orientation or Motion API not supported on this device.");
}
