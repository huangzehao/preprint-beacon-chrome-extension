chrome.storage.sync.get(["favoriteAuthors", "highlightKeywords", "savedArticles"], (data) => {
    const { favoriteAuthors, highlightKeywords, savedArticles } = data;

    const updateSavedArticles = (articleId, titleText) => {
        let articles = savedArticles || {};
        articles[articleId] = titleText;
        chrome.storage.sync.set({ savedArticles: articles }, () => {
        //   alert("Article saved!");
        });
      };

      document.querySelectorAll('dl > dt').forEach((articleHeaderElement) => {
        const articleLinkElement = articleHeaderElement.querySelector('a[href^="/abs/"]');
        if (articleLinkElement) {
          const articleId = articleLinkElement.getAttribute('href').split('/').pop();
          const titleElement = articleHeaderElement.nextElementSibling.querySelector('.list-title');
          const titleText = titleElement.textContent.trim();

          // Add a '+' button next to the title
          const saveButton = document.createElement('button');
          saveButton.textContent = '+';
          saveButton.style.marginLeft = '10px';
          saveButton.style.cursor = 'pointer';
          saveButton.title = 'Save this article';
          saveButton.onclick = () => updateSavedArticles(articleId, titleText);

          titleElement.appendChild(saveButton);
        }
      });

    if (favoriteAuthors) {
      const authorsList = favoriteAuthors.split("\n").map(author => author.trim().toLowerCase());
      document.querySelectorAll('.list-authors').forEach(authorElement => {
        const authorText = authorElement.textContent.toLowerCase();
        console.log("authors:", authorsList);
        if (authorsList.some(author => authorText.includes(author))) {
          const parentElement = authorElement.closest('dd');
          if (parentElement) {
            parentElement.classList.add('highlight-article');
          }

          authorElement.querySelectorAll('a').forEach(linkElement => {
            const linkText = linkElement.textContent.toLowerCase();
            if (authorsList.includes(linkText)) {
              linkElement.classList.add('bold-author');
            }
          });
        }
      });
    }

    if (highlightKeywords) {
        const keywordsList = highlightKeywords.split("\n").map(keyword => keyword.trim().toLowerCase());
        document.querySelectorAll('.list-title').forEach(titleElement => {
          let titleHTML = titleElement.innerHTML;
          const titleText = titleElement.textContent.toLowerCase();
          let foundKeyword = false; // 追踪是否找到关键词

          keywordsList.forEach(keyword => {
            if (titleText.includes(keyword)) {
              // 使用正则表达式匹配并替换关键词
              const regex = new RegExp(`(${keyword})`, 'gi');
              titleHTML = titleHTML.replace(regex, '<span class="highlight-keyword">$1</span>');
              foundKeyword = true; // 设置为true，因为找到了关键词
            }
          });

          if (foundKeyword) {
            titleElement.innerHTML = titleHTML;
            const parentElement = titleElement.closest('dd');
            if (parentElement) {
              parentElement.classList.add('highlight-article');
            }
          }
        });
      }
    });