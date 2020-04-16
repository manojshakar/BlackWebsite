let last_known_scroll_position = 0;
let ticking = false;
let menu = 'home'
var oldy=window.scrollY
var introheight=100
var movement = false;

function getCssValuePrefix()
{
    var rtrnVal = '';//default to standard syntax
    var prefixes = ['-o-', '-ms-', '-moz-', '-webkit-'];

    // Create a temporary DOM object for testing
    var dom = document.createElement('div');

    for (var i = 0; i < prefixes.length; i++)
    {
        // Attempt to set the style
        dom.style.background = prefixes[i] + 'linear-gradient(#000000, #ffffff)';

        // Detect if the style was successfully set
        if (dom.style.background)
        {
            rtrnVal = prefixes[i];
        }
    }

    dom = null;
    delete dom;

    return rtrnVal;
}

function goToPage(num){

	movement = true;
	$('html, body').animate({
		scrollTop: num == 2? (introheight+1) : 0
	}, 500, function(){
		movement = false;
	});
}

function handleScroll(scroll_pos) {
	var currenty = window.scrollY
	var scrolldown = oldy > currenty;
	var scrollup = oldy < currenty;
	var samescroll = oldy == currenty;
	oldy = currenty;

	//console.log(oldy+" "+currenty+" scrollup:"+scrollup+" samescroll:"+samescroll)

	if(currenty >= 0 && currenty <= introheight*0.75){
		// selected menu - home
		$(".menuhome").html("<div class='menuitem hideitem active' onclick='goToPage(1)'><span class='activechar'>H</span>ome</div>");
		$(".menuabout").html("<div class='menuitem hideitem' onclick='goToPage(2)'>About</div>");
	}else{
		$(".menuhome").html("<div class='menuitem hideitem ' onclick='goToPage(1)'>Home</div>");
		$(".menuabout").html("<div class='menuitem hideitem active' onclick='goToPage(2)'><span class='activechar'>A</span>bout</div>");
	}

	if(samescroll) return;

	if(!movement && currenty >= 0 && currenty <= introheight && (scrollup || samescroll)){
		goToPage(2)
	}else if(!movement && currenty >= introheight && currenty <= introheight+100 && (scrolldown || samescroll)){
		goToPage(1)
	}

}

function addScrollListener(){
	window.addEventListener('scroll', function(e) {
	  last_known_scroll_position = window.scrollY;
	  if (!ticking) {
	    window.requestAnimationFrame(function() {
	      handleScroll(last_known_scroll_position);
	      ticking = false;
	    });

	    ticking = true;
	  }
	});

}

function callInititalLoad(){
	introheight = document.getElementsByClassName("intro")[0].offsetHeight;
	addScrollListener();
	setTimeout(function(){
		$(".gridline").addClass('gridlineanim')
		setTimeout(function(){
			$("body").addClass('bgcolor')
			$(".topbar").addClass('bgcolor')
			$(".topbar").addClass('bgcolor1')

			setTimeout(function(){
				$(".intro").addClass('introbg')
				$(".hold").addClass('moveupanim')
			},500);

		}, 500);


		setTimeout(function(){$(".topbar").css('background-color', '#14141A');}, 1000);
	}, 500);
}

function loadDone(){
	setTimeout(function(){
		document.getElementById("loading_holder").style.display = "none";
		$("body").addClass('gradcolor');
		$(".topbar").addClass('gradcolor');
		document.getElementById("fullsingle").style.display = "block";
		$(".content").css("height",window.innerHeight + 'px')
		$(".grid").css("bottom",window.innerHeight + 'px')
		
		callInititalLoad();
	}, 500);
	
}