# scrape-change-puppeteer

Track web document content by using the Github action.
Check web document difference in the git commit log. Inspired by [Git scrapping](https://simonwillison.net/2020/Oct/9/git-scraping/)

## Usage
Add information about tracking target in the `document_list.csv`.
Each column is the `file name`, `crawling target URL`, and `jQuery selector of the HTML content`.

E.g.
> skadnetwork_main https://developer.apple.com/documentation/storekit/skadnetwork .main

Every thirty minutes GitHub action cronjob starts to scrape URLs in the `document_list.csv`. 

When the scrapper detects the document's update, it stored the difference in the document folder and makes git commit & push to the repository. 

All the documents are saved in the Documents folder. For increasing the readability of the file difference, HTML is converted to markdown format.
