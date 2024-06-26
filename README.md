# arXiv Enhancer
## Reflections on Building with GPT-4o
Today, exactly one year after completing the original project with GPT-4, I decided to rebuild it from scratch using the latest GPT-4o. The advancements in GPT-4o compared to the GPT-4 version I used in March 2023 are remarkable. The current model can generate almost error-free, runnable code, and it supports image inputs to report the current running state and error information, making prompts significantly easier. These improvements have saved me a considerable amount of time and allowed this toy project to support even more features. I am genuinely impressed by the progress and efficiency brought about by these advancements.
![alt text](imgs/enhancer.png)
# Preprint Beacon
**Never Miss Your Favored Authors!**

Preprint Beacon is a Chrome extension that enhances your browsing experience on preprint repositories like arXiv by highlighting papers from interesting authors.

**Acknowledgment:** Thank you to arXiv for use of its open access interoperability.

**Note:** The motivation of this project is to experience the paired programming ability of GPT-4. The vast majority of the code in this project, including the CHANGELOG and README, is implemented by GPT-4.

## Preview
Randomly pick several authors for preview.
![preview](imgs/preview.png)
![authors](imgs/authors.png)

## Features

- Highlight papers from a customizable list of interesting authors.
- Bold author names for highlighted papers.

## Installation

1. Clone this repository or download it as a ZIP file.
2. In Chrome, go to `chrome://extensions`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the folder containing the downloaded repository.

## Usage

1. Open the extension's options page by right-clicking the Preprint Beacon icon in the Chrome toolbar and selecting "Options".
2. Add or remove authors from the list of interesting authors.
3. Visit an arXiv listing page, and the extension will automatically highlight papers from the interesting authors.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed list of changes.
