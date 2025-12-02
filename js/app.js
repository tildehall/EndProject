// Väntar tills HTML har laddats innan JavaScript körs
document.addEventListener("DOMContentLoaded", () => {

// Hänvisar till HTML elementen
  const searchBtn = document.getElementById("search-btn"); // Hänvisar till sökknapp
  const songInput = document.getElementById("song-input"); // Hänvisar till input fält där användare ska skriva låtnamn
  const artistInput = document.getElementById("artist-input"); // Hänvisar till input fält där användare ska skriva artist
  const lyricsBox = document.getElementById("lyrics-result"); // HÄnvisar till låttexten

  // Lyssnar efter click på search button
  searchBtn.addEventListener("click", async () => {

// Hämtar det användaren skrivit in i input fälten. "trim" tar bort mellanslag för att undvika fel om användaren skriver extra mellanslag
    const song = songInput.value.trim();
    const artist = artistInput.value.trim();



    if (!song || !artist) {
      lyricsBox.style.display = "block"; // Om inputen är korrekt visas lyrics boxen
      lyricsBox.textContent = "Du måste fylla i både låt och artist!"; //  Om någon av input fälten är tomma visas felmeddelandet
      return;
    }

    // Skapar URL med användarens input för att kunna anropa API
    const url = `https://api.lyrics.ovh/v1/${artist}/${song}`;

    // Visar lyrics boxen med ett meddelande att låttexten hämtas
    lyricsBox.style.display = "block";
    lyricsBox.textContent = "Hämtar låttext...";

    // Anropar API
    try {
      const response = await fetch(url);
      const data = await response.json();

      // Meddelande som visas om API meddelade ett fel (om låttexten inte fanns)
      if (data.error) {
        lyricsBox.textContent = "Ingen låttext hittades. Kontrollera stavningen.";
      // Visar låttexten om allt funkade
      } else {
        lyricsBox.textContent = data.lyrics;
      }

    // Felmeddelande som visas om något gick fel, till exempel om problem med internetuppkoppling
    } catch (error) {
      lyricsBox.textContent = "Ett fel uppstod. Försök igen.";
    }
  });
});
