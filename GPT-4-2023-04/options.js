document.addEventListener('DOMContentLoaded', () => {
    // Load saved authors from storage
    chrome.storage.sync.get('interestingAuthors', (data) => {
      const authors = data.interestingAuthors || [];
      document.getElementById('authors').value = authors.join('\n');
    });

    // Save button click event
    document.getElementById('save').addEventListener('click', () => {
      const authors = document.getElementById('authors').value.split('\n').map(author => author.trim());
      chrome.storage.sync.set({interestingAuthors: authors}, () => {
        alert('Settings saved.');
      });
    });
  });
