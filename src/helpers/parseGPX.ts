import GpxParser from 'gpxparser'

export const parseGPX = (GPXFile: string) => {
    const gpx = new GpxParser()
    gpx.parse(GPXFile)
    return gpx.tracks[0].points.map((p) => [p.lat, p.lon])
}
