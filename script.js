const textarea = document.getElementById("text");
    const status = document.getElementById("status");
    const historyBtn = document.getElementById("historyBtn");
    const historyMenu = document.getElementById("historyMenu");

    const HISTORY_KEY = "copyPasteHelper:history";
    const MAX_HISTORY = 10;

    
    let history = loadHistory();
    renderHistoryMenu();

    
    document.getElementById("copyBtn").addEventListener("click", async () => {
      const text = textarea.value;

      try {
        await navigator.clipboard.writeText(text);
        addToHistory(text);
        showToast("Text copied!");
      } catch (e) {
        console.error(e);
        showToast("Copy failed!");
      }
    });

    
    document.getElementById("pasteBtn").addEventListener("click", async () => {
      try {
        const clipboardText = await navigator.clipboard.readText();
        insertAtCursor(clipboardText);
        showStatus("📥 Pasted from clipboard");
      } catch (e) {
        console.error(e);
        showStatus("❌ Paste blocked by browser");
      }
    });

    
    historyBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      historyMenu.classList.toggle("show");
    });

    
    document.addEventListener("click", (e) => {
      if (!historyMenu.contains(e.target) && !historyBtn.contains(e.target)) {
        historyMenu.classList.remove("show");
      }
    });

   

    function loadHistory() {
      try {
        const raw = localStorage.getItem(HISTORY_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        console.warn("Could not read history from localStorage:", e);
        return [];
      }
    }

    function saveHistory() {
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
      } catch (e) {
        console.warn("Could not save history to localStorage:", e);
      }
    }

    function addToHistory(text) {
      const trimmed = text.trim();
      if (!trimmed) return; 

      
      history = history.filter((item) => item !== trimmed);

      
      history.unshift(trimmed);

      
      if (history.length > MAX_HISTORY) {
        history = history.slice(0, MAX_HISTORY);
      }

      saveHistory();
      renderHistoryMenu();
    }

    function renderHistoryMenu() {
      historyMenu.innerHTML = "";

      if (!history.length) {
        const empty = document.createElement("div");
        empty.className = "dropdown-item empty";
        empty.textContent = "No saved items yet";
        historyMenu.appendChild(empty);
        return;
      }

      history.forEach((item) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "dropdown-item";

       
        btn.textContent = item.length > 40 ? item.slice(0, 40) + "…" : item;
        btn.title = item;

        btn.addEventListener("click", () => {
          insertAtCursor(item);
          showStatus("💾 Inserted from history");
          historyMenu.classList.remove("show");
        });

        historyMenu.appendChild(btn);
      });
    }

    

    function insertAtCursor(textToInsert) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const value = textarea.value;
      const before = value.slice(0, start);
      const after = value.slice(end);

      textarea.value = before + textToInsert + after;

      const newPos = start + textToInsert.length;
      textarea.selectionStart = textarea.selectionEnd = newPos;
      textarea.focus();
    }

    function showStatus(msg) {
      status.textContent = msg;
      clearTimeout(showStatus._timeoutId);
      showStatus._timeoutId = setTimeout(() => {
        status.textContent = "";
      }, 2000);
    }

    function showToast(message) {
      const toast = document.getElementById("toast");
      toast.textContent = message;
      toast.classList.add("show");

      clearTimeout(showToast.timeout);
      showToast.timeout = setTimeout(() => {
        toast.classList.remove("show");
      }, 1800);
    }