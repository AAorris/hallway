export const urls = [
    "https://feed.amorris.ca/hallway.txt",
    "https://t.seed.hex22.org/twtxt.txt",
    "https://wiki.xxiivv.com/twtxt.txt",
    "https://www.gkbrk.com/twtxt.txt",
    "https://phse.net/twtxt/merv.txt",
    "https://avanier.now.sh/tw.txt",
]

const KB = 1000

export const getAllFeeds = async () => {
    const sheet = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS-FzjyiOz0gP21K6zU_3gqbopbaQLF1g2yf-vp_8rEUb6kGiHUuOHcHuJMTdckg5VI0H7eboHaHpQe/pub?gid=0&single=true&output=csv"
    const resp = await fetch(sheet)
    const text = await resp.text()
    return text
        .split('\n')
        .map(x => x.trim())
        .filter(x => x.startsWith('https://'))
        .map(x => x.split(','))
        .map(([url, name, trusted]) => ({url, name, trusted}))
}