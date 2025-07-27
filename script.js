const API_URL = "REPLACE_YOUR_API_OR_BACKEND_LINK_HERE";

async function checkNews() {
  const input = document.getElementById("newsInput").value.trim();
  const resultBox = document.getElementById("result");

  if (!input) {
    resultBox.innerText = "⚠️ Please enter news content!";
    resultBox.style.color = "#ffcc00";
    return;
  }

  resultBox.innerText = "Checking news...";
  resultBox.style.color = "#00ffff";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ content: input })
    });

    const data = await res.json();

    if (data.result) {
      typeEffect(resultBox, data.result);
    } else {
      resultBox.innerText = "⚠️ No result returned!";
      resultBox.style.color = "#ffcc00";
    }

  } catch (err) {
    resultBox.innerText = "❌ Error: " + err.message;
    resultBox.style.color = "#ff4c4c";
  }
}

function typeEffect(element, text) {
  element.innerText = "";
  let i = 0;
  const interval = setInterval(() => {
    element.innerText += text.charAt(i);
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 50);
}

  const getStartedBtn = document.getElementById('get-started-btn');
  const aboutBtn = document.getElementById('about-btn');
  const loaderOverlay = document.getElementById('loader-overlay');

  function triggerPageRedirect(page) {
    loaderOverlay.style.display = 'flex';
    setTimeout(() => {
      window.location.href = page;
    }, 1200); // Adjust time if needed
  }

  getStartedBtn.addEventListener('click', (e) => {
    e.preventDefault();
    triggerPageRedirect('news.html');
  });

  aboutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    triggerPageRedirect('about.html');
  });


