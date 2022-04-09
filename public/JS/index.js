const navBar = document.getElementById('navBar');
const navContainer = document.getElementById('navContainer');
const nav1 = document.getElementById('nav1');
const nav2 = document.getElementById('nav2');
const nav3 = document.getElementById('nav3');
const nav4 = document.getElementById('nav4');
const nav5 = document.getElementById('nav5');

const navArray=[nav1,nav2,nav3,nav4,nav5];


function navAnimation(direction1, direction2) {
    navArray.forEach((nav, i) => {
      nav.classList.replace(`slide-${direction1}-${i + 1}`, `slide-${direction2}-${i + 1}`);
    });
  }
  
function toggleNav(){
    // toggle the class change i.e if change is present then it will be removed and if not present then it will be added
    navBar.classList.toggle('change');
    // toggle the class active on navContainer
    navContainer.classList.toggle('active');
    //check if navContainer contains class active
    if(navContainer.classList.contains('active')){
        // remove navContainer from left
        navContainer.classList.remove('navContainer-move-left');
        // move navContainer to right
        navContainer.classList.add('navContainer-move-right');

        navAnimation('out', 'in');
    }else{
         // remove navContainer from roght
         navContainer.classList.remove('navContainer-move-right');
         // move navContainer to left
         navContainer.classList.add('navContainer-move-left');

         navAnimation('in', 'out');
    }
}

navBar.addEventListener('click',toggleNav);
navArray.forEach((nav) => {
    nav.addEventListener('click', toggleNav);
  });