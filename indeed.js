const fetch = require('node-fetch');
const cheerio = require('cheerio');

export default async function scrapeIndeed() {
    const res = await fetch('https://www.indeed.com/jobs?q=Junior%20Software%20Developer&explvl=entry_level&limit=50&sort=date&fromage=3&vjk=d71e78a65150914c');
    const text = await res.text();
    const $ = cheerio.load(text);
    const jobCards = $('.jobsearch-SerpJobCard').toArray();
    const jobInfo = jobCards.map(c => {
        const active = $(c);
        const title = active.find('.jobtitle').attr('title');
        const company = active.find('.company').text().replace(/\n/g, "");
        const location = active.find('.location').text();
        const link = active.find('.jobtitle').attr('href');
        const fullLink = 'https://www.indeed.com' + link;
        return {title, company, location, fullLink};
    })
    console.log(jobInfo); 
};