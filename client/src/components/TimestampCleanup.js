export const timestampCleanup = (timestamp) => {
    const formatted = String(new Date(Date.parse(timestamp)));
    const formattedArr = formatted.split(' ');
    const time = formattedArr[4].split(':');
    if (parseInt(time[0]) > 12) {
        return `${formattedArr[1]} ${formattedArr[2]} ${formattedArr[3]} ${parseInt(time[0]) - 12}:${time[1]} PM`
    }
    else {
        return `${formattedArr[1]} ${formattedArr[2]} ${formattedArr[3]} ${parseInt(time[0])}:${time[1]} AM`
    }
};