

export const getSupercrossTimes = (times) => {
    const toReturn = times.map(time => {
        const lap = time.lap
        const racer = time.racer
        const lapTimes = times.filter(e => e.lap <= lap && e.racer === racer)
        let totalRaceTime = 0
        lapTimes.forEach(e => totalRaceTime += e.time)
        return {...time, totalRaceTime}
    });
    return toReturn
}