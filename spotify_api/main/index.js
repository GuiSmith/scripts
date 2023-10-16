import {filterText, mobileDesktop, setContent, showElement} from '../sources.js';
var user;
async function main(){
  try {
    let userData = await getSpotify("user", "GET");
    user = userData;
  }catch(error){
    console.error(`Error: ${error}`);
  }
}
main()
.then(
  async () => {
    if(!user){
      window.location.href = "../index.html";
    }else{
      setContent('user-image',"src",user.images[0].url); //Setting navbar image
      setContent('user-name','text',user.display_name); //Setting name for header
      //console.log(user);

      //Page control
      const search = new URLSearchParams(window.location.search);
      const pageName = (search.get('page') === null) ? ('home') : (search.get('page'));
      const pages = document.querySelectorAll(".page-content");
      console.log(pageName);
      pages.forEach(function(page){
        page.style.display = "none";
      });
      const currentPage = document.getElementById(pageName);
      currentPage.style.display = "block";
      switch(pageName){
        case "home":
          setContent('page-title','text','Músicas recentemente tocadas');
          break;
        case 'song-details':
          document.getElementById('page-title').innerHTML = `Detalhes de <span id = 'page-title-song'></span>`;
          break;
        default:
          setContent('page-title','text','Página não selecionada');
          break;
      }
      
      //Currently playing track
      const currentlyPlaying = await getSpotify("currently-playing","GET");
      console.log(currentlyPlaying);
      setContent('currently-playing-card','title',`Atualmente tocando ${filterText(currentlyPlaying.item.name)} de ${filterText(currentlyPlaying.item.artists[0].name)}`);
      setContent('currently-playing-img',"src",currentlyPlaying.item.album.images[1].url);
      setContent('currently-playing-title',"text",filterText(currentlyPlaying.item.name));
      setContent('currently-playing-text',"text",`Artista: ${filterText(currentlyPlaying.item.artists[0].name)}`);
      setContent('currently-playing-link','href',`?page=song-details&songId=${currentlyPlaying.item.id}`);
      //Recently played tracks
      const recentlyPlayed = await getSpotify("recently-played","GET",0,mobileDesktop(2,5)); //Getting recently played tracks
      //console.log(recentlyPlayed);
      const recentlyPlayedContainer = document.querySelector('#recently-played-container');
      recentlyPlayed.items.forEach(function(item){
        recentlyPlayedContainer.innerHTML += `<div class = 'col-lg-2 col-sm-12'><div class = 'card'><a href = '?page=song-details&songId=${item.track.id}'><img src = ${item.track.album.images[1].url} class = 'card-img-top' alt = '${item.track.album.name} image'></a><div class = 'card-body'><p class = 'card-title'>${filterText(item.track.name)}</p><p class = 'card-text'>Artista: ${filterText(item.track.artists[0].name)}</p></div></div></div>`;
      });

      //Song details

      
    }
  }
);
