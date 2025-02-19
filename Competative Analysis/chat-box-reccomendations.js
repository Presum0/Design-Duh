const recommendations = [
    { text: "Hello, how can I help you?", link: "https://example.com/help" },
    { text: "What are your store hours?", link: "https://example.com/store-hours" },
    { text: "Can I return an item?", link: "https://example.com/returns" },
    { text: "Tell me a joke", link: "https://example.com/jokes" },
    { text: "What's the weather like today?", link: "https://example.com/weather" },
    { text: "I need technical support", link: "https://example.com/support" }
];

function showSuggestions() {
    let input = document.getElementById("chatbox").value.toLowerCase();
    let suggestionsDiv = document.getElementById("suggestions");
    
    if (input === "") {
        suggestionsDiv.style.display = "none";
        return;
    }

    let filtered = recommendations.filter(item => 
        item.text.toLowerCase().includes(input)
    );

    if (filtered.length > 0) {
        suggestionsDiv.innerHTML = filtered.map(item => {
            let regex = new RegExp(`(${input})`, "gi"); // Match input (case insensitive)
            let highlightedText = item.text.replace(regex, "<strong>$1</strong>"); // Bold match

            return `<a href="${item.link}" class="suggestion-item" target="_blank">
                        ${highlightedText}
                    </a>`;
        }).join("");

        suggestionsDiv.style.display = "block";
    } else {
        suggestionsDiv.style.display = "none";
    }
}