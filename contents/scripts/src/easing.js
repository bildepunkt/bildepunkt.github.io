/**
 * @param  {number} t current time
 * @param  {number} b start value
 * @param  {number} c change in value
 * @param  {number} d duration
 * @return {number}   the new position   
 */
export const linear = (t, b, c, d) => {
    return c*t/d + b;
};

// quadradic
export const easeIn = (t, b, c, d) => {
    t /= d;
    return c*t*t + b;
};

export const easeOut = (t, b, c, d) => {
    t /= d;
    return -c * t*(t-2) + b;
}

export const easeInOut = (t, b, c, d) => {
    t /= d;
    return -c * t*(t-2) + b;
}