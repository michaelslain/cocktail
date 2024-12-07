import puppeteer from 'puppeteer'
import fs from 'fs/promises'
import path from 'path'

async function scrapeDosagePages() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    const page = await browser.newPage()

    try {
        // Create output directory if it doesn't exist
        const outputDir = path.join(__dirname, '../data/erowid-dosages')
        await fs.mkdir(outputDir, { recursive: true })

        // Go to main dosage index page
        await page.goto(
            'https://www.erowid.org/psychoactives/dose/dose.shtml',
            {
                waitUntil: 'networkidle0',
            }
        )

        // Get all links from the page
        const links = await page.evaluate(() => {
            const anchors = document.querySelectorAll('a')
            return Array.from(anchors)
                .map(a => a.href)
                .filter(
                    href =>
                        href.includes('erowid.org') && href.includes('/dose')
                )
        })

        console.log(`Found ${links.length} dosage pages to scrape`)

        // Visit each link and save the HTML
        for (const link of links) {
            try {
                await page.goto(link, { waitUntil: 'networkidle0' })
                const html = await page.content()

                // Create filename from URL
                const filename = link
                    .split('/')
                    .slice(-2)
                    .join('-')
                    .replace(/\.shtml$/, '.html')

                // Save HTML to file
                await fs.writeFile(
                    path.join(__dirname, '../data/dosage', filename),
                    html,
                    'utf-8'
                )
                console.log(`Saved ${filename}`)

                // Polite delay between requests
                await new Promise(resolve => setTimeout(resolve, 2000))
            } catch (error) {
                console.error(`Failed to scrape ${link}:`, error)
                continue
            }
        }
    } catch (error) {
        console.error('Error in scrapeDosagePages:', error)
    } finally {
        await browser.close()
    }
}

scrapeDosagePages()
