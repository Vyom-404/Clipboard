Clipboard - Build Day Project

A simple and powerful clipboard utility built using HTML, CSS, and JavaScript, featuring:
	•	Copy text
	•	Paste text at cursor position
	•	Saved copy history (localStorage)
	•	Dropdown showing previously copied items
	•	Smooth toast notifications
	•	Clean dark UI
	•	NO frameworks — fully vanilla JS

⸻

Features

🔹 1. Copy Text

Copies text from the textarea using the Clipboard API:
	•	Saves it to clipboard
	•	Stores it in localStorage
	•	Adds it to the dropdown history
	•	Shows a green toast: “Text copied!”

⸻

🔹 2. Paste at Cursor Position

Pastes text exactly where your cursor is, not at the end.

Uses:
textarea.selectionStart
textarea.selectionEnd

⸻

🔹 3. Copy History Dropdown

The Last Saved ▾ button shows a dropdown with the most recent items you copied.
	•	Stores up to 10 entries
	•	Removes duplicates automatically
	•	Clicking an item inserts it at the cursor

⸻

🔹 4. Persistent Local Storage

Copied text history is stored in:
  localStorage.setItem("copyHistory", ...)

History stays intact even after refresh.

Textarea stays empty on every reload — clean UI.

⸻

🔹 5. Toast Notifications

A smooth animation appears after copying.

⸻

🛠 Web APIs Used

📌 Clipboard API
 navigator.clipboard.writeText()
 navigator.clipboard.readText()

📌 Local Storage API
 localStorage.setItem()
 localStorage.getItem()

📌 DOM Selection API
 Used to interact with the page:
	•	Selecting elements
	•	Updating textarea value
	•	Creating dropdown items
	•	Changing UI dynamically

📌 Event Listener API
 button.addEventListener("click", ...)

⸻

📁 Folder Structure
📂 project
 ├── index.html      # Main UI structure
 ├── style.css       # Styling & layout
 ├── script.js       # All logic & clipboard handling
 └── README.md       # Project documentation




