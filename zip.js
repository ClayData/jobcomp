const puppeteer = require('puppeteer');

export default async function zipJobs() {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage();
    const jobInfo = [];
    for (let i = 0; i < 1; i++) {
        await page.goto(`https://www.ziprecruiter.com/candidate/search?radius=25&search=junior+developer&location=Austin%2C+TX&page=${i}`);
        const jobCards = await page.$$('article')
        for(let jobs of jobCards){
            const title = await jobs.$eval('.just_job_title', el => el.textContent).catch(err => console.error('no title'));
            const company = await jobs.$eval('.name', el => el.textContent).catch(err => console.error('no name'));
            const location = await jobs.$eval('.location', el => el.textContent).catch(err => console.error('no location'));
            const link = await jobs.$eval('.job_link', el => el.getAttribute('href')).catch(err => console.error('no link'));
            jobInfo.push({title, company, location, link});
        }
        page.waitFor(2000);
    }
    await browser.close();
    console.log(jobInfo);
};

