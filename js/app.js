document.addEventListener("DOMContentLoaded", () => {

  const searchBtn = document.getElementById("search-btn");
  const songInput = document.getElementById("song-input");
  const artistInput = document.getElementById("artist-input");
  const lyricsBox = document.getElementById("lyrics-result");

  searchBtn.addEventListener("click", async () => {


    const song = songInput.value.trim();
    const artist = artistInput.value.trim();

    if (!song || !artist) {
      lyricsBox.style.display = "block";
      lyricsBox.textContent = "Du måste fylla i både låt och artist!";
      return;
    }

    const url = `https://api.lyrics.ovh/v1/${artist}/${song}`;

    lyricsBox.style.display = "block";
    lyricsBox.textContent = "Hämtar låttext...";

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        lyricsBox.textContent = "Ingen låttext hittades. Kontrollera stavningen.";
      } else {
        lyricsBox.textContent = data.lyrics;
      }

    } catch (error) {
      lyricsBox.textContent = "Ett fel uppstod. Försök igen.";
    }
  });
});
