# BaitHate - Clickbait Identification
"You won't BELIEVE how great this extension is."

Let's be honest - we've all been there. You see that headline that you know you shouldn't click, but you just can't resist. You fell for clickbait.

Clickbait is a manipulative practice the litters the web and pollutes your browser with noise. 

We developed BaitHate to help identify clickbait at a glance and get back to cleaner browsing.

### Tech Specs
We decided to use our differences as our strengths using a variety of platforms and languages. C#, SQL, Python, and JavaScript were the primary languages for our solution. C# provided us with a powerful statically typed back end. It was used for our machine learning and api. We used JavaScript for the chrome extension to embed our results right in the users browser. Finally we used a python modual to generate short descriptions for some of the Clickbait articles. We used a plethora of services from Azure serverless functions to Google Cloud Platforms powerful app services. All of our data is securly stored in a sql database kindly offered for free by gearhost. You can see a picture of our full cloud solution below.

## Installation Instructions

### Google Chrome

#### Manual
1. Download this repo as a [ZIP file from GitHub](https://github.com/xamroot/baithate/archive/master.zip).
2. Unzip the file and you should have a folder named `baithate`.
3. In Chrome go to the extensions page (`chrome://extensions`).
4. Enable Developer Mode.
5. Drag the 'baithate-master' folder anywhere on the page to import it (do not delete the folder afterwards).

#### Chrome Web Store
Coming soon. BaitHait is currently under review to be published to the Chrome Web App Store. 

## Usage

Once installed, BaitHate will automatically display an estimated likelihood that a title link on a supported site is clickbait, as well as a helpful color indicator. 

To disable, click the BaitHate extension icon on the toolbar and toggle "enable BaitHate" to off and referesh the page.

####  Supported Sites

Currently, the extension needs to be configured for each individual site. It is our hope to develop a general form in the future. Below is a list of sites currently supported.

1. Google [Search](https://www.google.com) / [News](https://news.google.com)
1. [Youtube](https://www.youtube.com)
2. [Buzzfeed](https://www.buzzfeed.com)
3. [Hacker News](https://www.news.ycombinator.com)

