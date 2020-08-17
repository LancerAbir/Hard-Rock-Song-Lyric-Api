document.getElementById('lyrics-Search').addEventListener('click', function () {
    const inputValue = document.getElementById('inputValue').value
    const listSongs = loadData(inputValue)
    listSongs.then(data => {
        for (let i = 0; i < 10; i++) {
            singerImage = data.data[i].artist.picture_medium
            songTitle = data.data[i].title
            songAlbum = data.data[i].album.title
            songArtist = data.data[i].artist.name
            songMp3 = data.data[i].preview

            songArea(singerImage, songTitle, songAlbum, songArtist, songMp3)
        }
    })
})


function songArea(singerImage, songTitle, songAlbum, songArtist, songMp3) {
    document.getElementById('songBox').innerHTML += `
  
            <div class="search-result col-md-8 mx-auto py-4">
                <div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-4">
                        <img class="pic" src=${singerImage} alt="">
                    </div>
                    <div class="col-md-5">
                        <h3 class="lyrics-name">${songTitle}</h3>
                        <p class="author lead">Album by <span>${songAlbum}</span></p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="findLyric('${songArtist}', '${songTitle}', '${songMp3}')" id="lyric" class="btn btn-success">Get Lyrics</button>
                    </div>
                </div>
            </div>
    `
}


const loadData = async (searchValue) => {
    const res = await fetch(`https://api.lyrics.ovh/suggest/${searchValue}`)
    const data = await res.json()
    return data
}


const findLyric = async (songArtist, songTitle, songMp3) => {
    const res = await fetch(`https://api.lyrics.ovh/v1/${songArtist}/${songTitle}`)
    const data = await res.json()

    document.getElementById('songLyrics').innerHTML = `
    <h2 class="text-success mb-4">${songTitle}</h2>
    <!-- song -->
    <div class="text-center mb-3">
        <audio controls>
            <source src=${songMp3} type="audio/mpeg">
        </audio>
    </div>
    <pre class="lyric text-white">
    ${data.lyrics}
    </div>
   `
}


