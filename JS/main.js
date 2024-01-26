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

myForm.addEventListener("submit",saveFriend);

function saveFriend(event) {
  event.preventDefault();

  const formData = new FormData(myForm);
  const imageData = formData.get("avatar");
  const imageExtension = imageData.name.split(".").pop();
  const randomId = crypto.randomUUID();
}

  const newFriend = {
    id : randomId,
    name : formData.get("name"),
    dob : formData.get("dob"),
    avatar : randomId + "." + imageExtension
  }

  // get existing cache
    const reader = new FileReader();

    reader.onloadend = () => {
      const 
    }
  // save the image to the Cache Storage of the browser
  caches.open("imageCache").then(cache => {
    cache.match(randomId).then(response => {

  })


document.addEventListener('DOMContentLoaded', () => {
  //open cache and save reference
  //add listener for form submit
  //build list of friends

  // read from cache
  showCache()
});


function showFriendsList() {
  //show the contents of cache as a list of cards
}

function makeCard(friend) {
  //create HTML card for a friend in the <ul>
  }}
