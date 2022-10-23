const dateCleanup = (date) => {
    if (date < 10) {
        return `0${date}`;
    }
    return date
};

export const timestampCleanup = (timestamp, key) => {
    const formatted = String(new Date(Date.parse(timestamp)));
    const formattedArr = formatted.split(' ');
    const time = formattedArr[4].split(':');
    const monthNumMap = {
        'Jan': 1,
        'Feb': 2,
        'Mar': 3,
        'Apr': 4,
        'May': 5,
        'Jun': 6,
        'Jul': 7,
        'Aug': 8,
        'Sep': 9,
        'Oct': 10,
        'Nov': 11,
        'Dec': 12
    };

    if (key === 'update') {
        return `${formattedArr[3]}-${monthNumMap[formattedArr[1]]}-${dateCleanup(parseInt(formattedArr[2]) - 1)}`
    }
    else {
        if (parseInt(time[0]) > 12) {
            return `${formattedArr[1]} ${formattedArr[2]} ${formattedArr[3]} ${parseInt(time[0]) - 12}:${time[1]} PM`
        }
        else {
            return `${formattedArr[1]} ${formattedArr[2]} ${formattedArr[3]} ${parseInt(time[0])}:${time[1]} AM`
        }
    }
};