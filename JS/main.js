/*
create an object like
{
  id: '1234-2342343-3423423424', //uuid
  name: 'friend',
  dob: '2000-06-01',
  avatar: 'filename same as id',
}

- submit form
- generate UUID
- file -> rename -> response -> cache
- json with filename, name, dob, id
- json -> file -> response -> cache
*/

const myForm = document.querySelector("form");
const count = document.querySelector("#count");
const friendsList = document.querySelector("ul");

myForm.addEventListener("submit",saveFriend);

const cacheName = 'friends-v1'

function saveFriend(event) {
  event.preventDefault();

  const formData = new FormData(myForm);
  const imageData = formData.get("avatar");
  const imageExtension = imageData.name.split(".").pop();
  const randomId = crypto.randomUUID();

  const newFriend = {
    id : randomId,
    name : formData.get("name"),
    dob : formData.get("dob"),
    avatar : randomId + "." + imageExtension
  }
  const userAvatar = formData.get("avatar")



  caches.open(cacheName).then(async cache => {
    // saves both the friend and the image to the Cache Storage of the browser with different keys
    await cache.put(`${randomId}.jpg`, new Response(userAvatar))
    await cache.put(randomId, new Response(JSON.stringify(newFriend)))
  })

  myForm.reset();
  showFriendsList()
}


document.addEventListener('DOMContentLoaded', () => {
  //open cache and save reference
  //add listener for form submit
  //build list of friends
   showFriendsList();
});


async function showFriendsList() {
  //show the contents of cache as a list of cards
  
  const cache = await caches.open(cacheName)
  const cachedFiles = await cache.keys();
  // make a friend object from each cached file along with its respective image
  let tempCount = 0;
  cachedFiles.forEach(async cachedFile => {
     const newFriend = await cache.match(cachedFile);
     const newFriendData = await newFriend.json();
     const newFriendAvatar= await cache.match(`${newFriendData.id}.jpg`)
      const newFriendAvatarData = await newFriendAvatar.blob()
      const newFriendAvatarUrl = URL.createObjectURL(newFriendAvatarData)
      const newFriendWithAvatar = {
        ...newFriendData,
        avatar : newFriendAvatarUrl
      }
    makeCard(newFriendWithAvatar)
    tempCount++;
  })
  count.innerText = temp
}


function makeCard(friend) {
  //create HTML card for a friend in the <ul>
  const card = document.createElement("li");
  card.classList.add("card");
  card.innerHTML = `
    <img src="${friend.avatar}" alt="${friend.name}" height="100" width="100">
    <div class="details">
       <h2>${friend.name}</h2>
        <p>${friend.dob}</p>
    </div>
  `;
  friendsList.appendChild(card)
  }
