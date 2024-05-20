document.addEventListener("DOMContentLoaded", () => {
    const authorsListElement = document.getElementById("authorsList");
    const keywordsListElement = document.getElementById("keywordsList");
    const saveButton = document.getElementById("save");
    const clearButton = document.getElementById("clearSavedArticles");

    // 获取并显示已保存的感兴趣作者和关键词
    chrome.storage.sync.get(["favoriteAuthors", "highlightKeywords", "savedArticles"], (data) => {
      if (data.favoriteAuthors) {
        authorsListElement.value = data.favoriteAuthors;
      }
      if (data.highlightKeywords) {
        keywordsListElement.value = data.highlightKeywords;
      }
      renderSavedArticles(data.savedArticles || {});
    });

    // 保存感兴趣作者和关键词
    saveButton.addEventListener("click", () => {
      const favoriteAuthors = authorsListElement.value;
      const highlightKeywords = keywordsListElement.value;
      chrome.storage.sync.set({ favoriteAuthors, highlightKeywords }, () => {
        alert("Data saved!");
      });
    });

    // 清除已保存的文章
    clearButton.addEventListener("click", () => {
      chrome.storage.sync.set({ savedArticles: {} }, () => {
        renderSavedArticles({});
        alert("Saved articles cleared!");
      });
    });


    // 渲染已保存的文章
    const renderSavedArticles = (savedArticles) => {
      const savedArticlesContainer = document.getElementById('savedArticles');
      savedArticlesContainer.innerHTML = '';

      Object.keys(savedArticles).forEach(articleId => {
        const articleTitle = savedArticles[articleId];
        const articleElement = document.createElement('div');
        articleElement.className = 'saved-article';
        articleElement.innerHTML = `<a href="https://arxiv.org/abs/${articleId}" target="_blank">${articleTitle}</a>`;
        savedArticlesContainer.appendChild(articleElement);
      });
    };
  });
