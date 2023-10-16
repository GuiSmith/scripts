import {filterText, mobileDesktop, setContent, getArtists} from '../sources.js';
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
          home();
          break;
        case 'track-details':
          document.getElementById('page-title').innerHTML = `Detalhes de <span id = 'page-title-song' style = 'font-weight: bold'></span>`;
          trackDetails(search.get('trackId'));
          break;
        default:
          setContent('page-title','text','Página não selecionada');
          break;
      }
    }
  }
);

async function home (){
  //Currently playing track
  const currentlyPlaying = await getSpotify("currently-playing","GET");
  //console.log(currentlyPlaying);
  setContent('currently-playing-card','title',`Atualmente tocando ${filterText(currentlyPlaying.item.name)} de ${filterText(currentlyPlaying.item.artists[0].name)}`);
  setContent('currently-playing-img',"src",currentlyPlaying.item.album.images[1].url);
  setContent('currently-playing-title',"text",filterText(currentlyPlaying.item.name));
  setContent('currently-playing-text',"text",filterText(currentlyPlaying.item.artists[0].name));
  setContent('currently-playing-link','href',`?page=track-details&trackId=${currentlyPlaying.item.id}`);
  
  //Recently played tracks
  const recentlyPlayed = await getSpotify("recently-played","GET",0,mobileDesktop(2,5)); //Getting recently played tracks
  //console.log(recentlyPlayed);
  const recentlyPlayedContainer = document.querySelector('#recently-played-container');
  recentlyPlayed.items.forEach(function(item){
    recentlyPlayedContainer.innerHTML += `<div class = 'col-lg-2 col-sm-12'><div class = 'card'><a href = '?page=track-details&trackId=${item.track.id}'><img src = ${item.track.album.images[1].url} class = 'card-img-top' alt = '${item.track.album.name} image'></a><div class = 'card-body'><p class = 'card-title'>${filterText(item.track.name)}</p><p class = 'card-text'>${filterText(item.track.artists[0].name)}</p></div></div></div>`;
  });

  //Cards height
  const cards = document.querySelectorAll('#home .card');
  let maxHeight = 0;
  cards.forEach(function(card){
    maxHeight = (card.offsetHeight > maxHeight) ? (card.offsetHeight) : (maxHeight);
  });
  cards.forEach(function(card){
    card.style.height = `${maxHeight}px`;
  });
}

async function trackDetails (trackId){
  //Song details
  const track = await getSpotify("track","GET",trackId);
  console.log(track);
  setContent('page-title-song','text',filterText(track.name)); //Page's title
  setContent('webpage-title','text',`Detalhes de ${filterText(track.name)}`); //Webpage content
  setContent('favicon','href',track.album.images[2].url); //Fav icon's Image
  //Content
  setContent('track-album-img','src',track.album.images[1].url); //Album's image
  //Track's name
  setContent('#track-info .track-name','text',track.name, true);
  setContent('#track-info .track-name','href',track.external_urls.spotify, true);
  //Track's artist
  setContent('#track-info .track-artists','text',getArtists(track.artists), true);
  setContent('#track-info .track-artists','href',track.artists[0].external_urls.spotify, true);
  //Track's album
  setContent('#track-info .track-album','text',track.album.name, true);
  setContent('#track-info .track-album','href',track.album.external_urls.spotify,true);
  
}