function locomotiveScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locomotiveScroll();

function loader(){
  let count = 0;
  let loadInterval;
  let webcount = document.querySelector("#loadcount span");
  loadInterval = setInterval( function (){
    if(count>=99){
      clearInterval(loadInterval);
    }
    count++;
    webcount.textContent = `${count}`;
  },30);
}
/*
let tm = gsap.timeline();
tm.from(".ltitle h1, .ltitle h2" , {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.3,
    ease: "power4.out"
},0);
tm.to(".ltitle h2",{
  animationName: "nowBlink",
},.5);
tm.from("#loadcount" , {
  opacity: 0,
  duration: 1,
  onStart: loader,
},0.4);
tm.to("#ltitle h1",{
  opacity: 0,
  duration: .5,
},0)
tm.to("#loader",{
  duration: .7,
  opacity: 0,
  delay: 2.5,
  ease: "power4",
},1.5)
tm.from( "#page1" , {
   y: 1600,
   opacity : 0,
   duration:0.5,
   ease : Power4
  });
tm.from(".scup",{
  y: 100,
  opacity: 0,
  duration: 1,
  ease: "power4.out"
});
tm.to("#loader",{
  display: "none",
})
gsap.to("#scroll-div ",{
  opacity: 0,
  scrollTrigger: {
    trigger: ".scroll-div",
    scroller :".main",
    start: "top 0",
    end: "bottom 90%",
    scrub: 1,
    markers: false,
  }});
gsap.to("#nav-about ,#nav-part2",{
  opacity :0,
  y:-25,
  scrollTrigger:{
    trigger: ".scroll-div",
    scroller :".main",
    start: "top 0",
    end: "bottom 90%",
    scrub: 1.5,
    markers: false,
  }

})*/
function cursor(){
  let cursor = document.querySelector("#cursor");
  document.addEventListener("mousemove", function (e){
    cursor.style.top = e.pageY + "px";
    cursor.style.left = e.pageX + "px";
  });
  document.addEventListener("click", function (){
    cursor.classList.add("expand");
    setTimeout(function (){
      cursor.classList.remove("expand");
    },500);
  });
}
cursor();
function playcursor(){
  let vdoplay = document.querySelector("#vdo");
  let currentcursor = document.querySelector("#play-circle");
  let container = document.querySelector("#vdo");
   container.addEventListener("mousemove", function (e){
    gsap.to("#cursor",{
      display :"none",
      duration :0

    });
      gsap.to('#play-circle',{
        top: e.y-200,
        left: e.x-624,
        duration: 0.3,
        ease: "power1.out"
      });
    });
    container.addEventListener("mouseleave",function(){
       gsap.to("#cursor",{
        display: "initial"
       })
      vdoplay.style.opacity = 0;
      gsap.to('#play-circle',{
        left: 600,
        top: -80,
        duration: 0.3,
        ease: "power1.out"
      });
      vdoplay.pause();
      currentcursor.innerHTML ='<i class="ri-play-mini-fill"></i>';
            gsap.to('#play-circle',{
              scale: 1,
              duration: 0.1,
              ease: "power1.out"
            });
            flag=0;
          });
    let flag=0;
    container.addEventListener("click",function(){
      
      if(flag==0){
      vdoplay.style.opacity = 1;
      vdoplay.play();
      currentcursor.innerHTML ='<i class="ri-pause-mini-line"></i>';
      gsap.to('#play-circle',{
        scale: 0.6,
        duration: 0.1,
        ease: "power1.out"
      });
      flag=1;
    }
    else{
      vdoplay.pause();
currentcursor.innerHTML ='<i class="ri-play-mini-fill"></i>';
      gsap.to('#play-circle',{
        scale: 1,
        duration: 0.1,
        ease: "power1.out"
      });
      flag=0;
};
    });
  };
playcursor();

function projectscroll(){
  let title = document.querySelector("#h1 h2");
title.addEventListener("mouseenter",function(){
  let tt = gsap.timeline();
   tt.to("#h1 h2",{
    y : -20
   })
   tt.from("#h1 h2",{
    y :20
   })

})
}
function sheryanimation(){
Shery.imageEffect("#img-div",{
  style : 5 ,
  dubug :true,

})
}
//sheryanimation();
function flaghover(){
  let flag = document.querySelector("#t3 img")
   let flagarea = document.querySelector("#t3");
   flagarea.addEventListener("mousemove", function(details){
      gsap.to("#t3 img",{
        top: details.y,
        left:details.x,
        opacity :1,
        duration :.8,
      })
   });
   flagArea.addEventListener("mouseleave", () => {
    gsap.set(flag, { opacity: 0, visibility: "hidden" }); // Instantly hide the flag
  });
}
flaghover();