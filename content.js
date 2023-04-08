async function getInterestingAuthors() {
  return new Promise((resolve) => {
    chrome.storage.sync.get('interestingAuthors', (data) => {
      resolve(data.interestingAuthors || []);
    });
  });
}

function extractPaperId(paperLink) {
  const regex = /\/abs\/(.*?)$/;
  const match = paperLink.match(regex);
  return match ? match[1] : null;
}

async function fetchPaperDetails(paperId) {
  const response = await fetch(`https://export.arxiv.org/api/query?id_list=${paperId}`);
  const responseText = await response.text();
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(responseText, 'application/xml');
  const entry = xmlDoc.querySelector('entry');
  if (!entry) return null;

  const authors = Array.from(entry.querySelectorAll('author')).map(author => {
    return author.querySelector('name').textContent;
  });

  return {authors};
}

async function highlightInterestingAuthors() {
  const interestingAuthors = await getInterestingAuthors();
  const paperLinks = document.querySelectorAll('.list-identifier a[title="Abstract"]');
  console.log(`Found ${paperLinks.length} papers`);

  for (const paperLink of paperLinks) {
    const paperId = extractPaperId(paperLink.href);
    if (!paperId) continue;

    const paperDetails = await fetchPaperDetails(paperId);

    if (!paperDetails) continue;

    const {authors} = paperDetails;
    console.log(`Authors of ${paperId}: ${authors}`);

    const listItem = paperLink.closest('dt').nextElementSibling;
    const authorLinks = listItem.querySelectorAll('.list-authors a');

    for (const authorLink of authorLinks) {
      const author = authorLink.textContent;
      if (interestingAuthors.includes(author.trim())) {
        listItem.classList.add('highlighted');
        authorLink.classList.add('bold-author');
        console.log(`Highlight ${author}'s paper ${paperId}`);
      }
    }
  }
}

highlightInterestingAuthors();
