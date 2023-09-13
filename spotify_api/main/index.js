var user;
async function main(){
  try {
    let userData = await getSpotify("user", "GET");
    console.log(userData);
    user = userData;
  }catch(error){
    console.error(`Error: ${error}`);
  }
}

main()
.then(() => {
  if(!user){
    console.log("user data not set");
    window.location.href = "../index.html";
  }else{
    //User display name
    setContent("display-name","text",user.display_name);
    //User image 1
    showElement("img", "user-img1");
    setContent("user-img1","src",user.images[0].url);
    //User image 2
    showElement("img","user-img2");
    setContent("user-img2","src",user.images[1].url);
  }
});