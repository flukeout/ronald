export { mapScale };


const mapScale = (value, min, max, newMin, newMax) => {
    // Set to min or max if value is outside of bounds
    if(value >= max) {
        value = max;
    } else if (value <= min) {
        value = min;
    }

    var delta = value - min;
    var percent = delta / (max - min);
    var newRangeDelta = newMax - newMin;
    var newValue = newMin + (newRangeDelta * percent);

    return newValue;
}