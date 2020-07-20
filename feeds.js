import Airtable from 'airtable'

const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appWRLvYBrNmW9ClQ');

export const urls = [
    "https://feed.amorris.ca/hallway.txt",
    "https://t.seed.hex22.org/twtxt.txt",
    "https://wiki.xxiivv.com/twtxt.txt",
    "https://www.gkbrk.com/twtxt.txt",
    "https://phse.net/twtxt/merv.txt",
    "https://avanier.now.sh/tw.txt",
    "http://ctrl-c.club/~jlj/tw.txt",
]

const KB = 1000

export const getAllFeeds = () => {
    return new Promise((resolve, reject) => {
        const feeds = []
        base('Feeds').select({
            maxRecords: 100,
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                feeds.push({
                    url: record.get('url') || '',
                    name: record.get('name') || '',
                    trusted: record.get('trusted') || '',
                })
            });
            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
            resolve(feeds)
        });
    })
}