
  
  // dark and light mode
  
  
  var themeBtn = document.getElementById("theme-toggle-button");
  var html = document.documentElement;

  themeBtn.onclick = function () {
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
    } else {
      html.classList.add("dark");
    }
  };

// active nav

  // نمسك أزرار التابس
var tabButtons = document.querySelectorAll(".tab-btn");

// نمسك كل المشاريع
var portfolioItems = document.querySelectorAll(".portfolio-item");

// نلف على كل زر
for (var i = 0; i < tabButtons.length; i++) {
  tabButtons[i].addEventListener("click", function () {

    // نشيل active من كل الأزرار
    for (var j = 0; j < tabButtons.length; j++) {
      tabButtons[j].classList.remove("active");
    }

    // نضيف active للزر اللي اتضغط
    this.classList.add("active");

    // نجيب نوع الزر
    var category = this.getAttribute("data-category");

    // نلف على المشاريع
    for (var k = 0; k < portfolioItems.length; k++) {
      var itemCategory = portfolioItems[k].getAttribute("data-category");

      if (category === "all" || category === itemCategory) {
        portfolioItems[k].style.display = "block";
      } else {
        portfolioItems[k].style.display = "none";
      }
    }
  });
}



//nav and tabs


// نجيب كل أزرار الفلترة
var filterButtons = document.querySelectorAll(".portfolio-filter");

// نجيب كل المشاريع
var portfolioItems = document.querySelectorAll(".portfolio-item");

// نلف على كل زر
for (var i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener("click", function () {
    var filterValue = this.getAttribute("data-filter");

    
    for (var j = 0; j < filterButtons.length; j++) {
      filterButtons[j].classList.remove(
        "active",
        "bg-linear-to-r",
        "from-primary",
        "to-secondary",
        "text-white"
      );
      filterButtons[j].classList.add(
        "bg-white",
        "dark:bg-slate-800",
        "text-slate-600",
        "dark:text-slate-300"
      );
    }

  
    this.classList.add(
      "active",
      "bg-linear-to-r",
      "from-primary",
      "to-secondary",
      "text-white"
    );
    this.classList.remove(
      "bg-white",
      "dark:bg-slate-800",
      "text-slate-600",
      "dark:text-slate-300"
    );


    for (var k = 0; k < portfolioItems.length; k++) {
      portfolioItems[k].style.transition = "all 0.5s ease";
      portfolioItems[k].style.opacity = "0";
      portfolioItems[k].style.transform = "translateY(40px)";
    }

  
    setTimeout(function () {
      for (var k = 0; k < portfolioItems.length; k++) {
        var itemCategory = portfolioItems[k].getAttribute("data-category");

        if (filterValue === "all" || itemCategory === filterValue) {
          portfolioItems[k].style.display = "block";

          // Smooth دخول
          setTimeout(function (item) {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          }, 50, portfolioItems[k]);
        } else {
          portfolioItems[k].style.display = "none";
        }
      }
    }, 500); // زمن الخروج
  });
}













// Testimonials



var carousel = document.getElementById("testimonials-carousel");
var nextBtn = document.getElementById("next-testimonial");
var prevBtn = document.getElementById("prev-testimonial");
var indicators = document.querySelectorAll(".carousel-indicator");
var cards = document.querySelectorAll(".testimonial-card");

var currentIndex = 0;
var visibleCards = 3; // desktop

function getVisibleCards() {
  if (window.innerWidth < 640) return 1;   // mobile
  if (window.innerWidth < 1024) return 2;  // tablet
  return 3;                                // desktop
}

function updateCarousel() {
  visibleCards = getVisibleCards();
  var cardWidth = cards[0].offsetWidth;

  // 
  carousel.style.transform =
    `translateX(${currentIndex * cardWidth}px)`;

  indicators.forEach((dot, i) => {
    dot.classList.toggle("bg-accent", i === currentIndex);
    dot.classList.toggle("scale-125", i === currentIndex);
    
indicators[currentIndex].classList.remove("bg-slate-400", "dark:bg-slate-600");
  indicators[currentIndex].classList.add("bg-accent", "scale-125");
  indicators[currentIndex].setAttribute("aria-selected", "true");

  });
}


// next
nextBtn.addEventListener("click", function () {
  if (currentIndex < cards.length - visibleCards) {
    currentIndex++;
    updateCarousel();
  }
});

// prev
prevBtn.addEventListener("click", function () {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

// dots
indicators.forEach((dot, index) => {
  dot.addEventListener("click", function () {
    currentIndex = index;
    updateCarousel();
  });
});


window.addEventListener("resize", updateCarousel);



//gear icon

var settings_toggle = document.getElementById("settings-toggle");
var settingsSidebar = document.getElementById("settings-sidebar");
var close_settings = document.getElementById("close-settings")
var buttonsFont = Array.from(document.querySelectorAll('button[data-font]'));

var buttonsColor= document.querySelectorAll("#theme-colors-grid button")
console.log(buttonsColor)
console.log(settingsSidebar)
 
 
 settings_toggle.addEventListener("click",function()
{
    settingsSidebar.classList.remove("translate-x-full")
    settings_toggle.style.right="20rem"
})

close_settings.addEventListener("click",function()
{
    settingsSidebar.classList.add("translate-x-full")
    settings_toggle.style.right="0px"
})


for (let index = 0; index < buttonsFont.length; index++) {
   buttonsFont[index].addEventListener("click",function()
   {
    
   buttonsFont.forEach(function(btn)
{
       document.body.classList.remove(`font-${btn.dataset.font}`);
})


        document.body.classList.add(`font-${buttonsFont[index].dataset.font}`)
      
   }
)
    
}


for (var index = 0; index < buttonsColor.length; index++) {
    buttonsColor[index].addEventListener("click", function() {
        
        
        var primary = this.dataset.primary;
        var secondary = this.dataset.secondary;
        var accent = this.dataset.accent;

        document.documentElement.style.setProperty('--color-primary', primary);
        document.documentElement.style.setProperty('--color-secondary', secondary);
        document.documentElement.style.setProperty('--color-accent', accent);

  
    buttonsColor.forEach(function(btn) {
           
            btn.classList.remove('ring-2','ring-primary','ring-offset-2', 'ring-offset-white', 'scale-110', 'dark:ring-offset-slate-900');
            btn.style.borderColor = "transparent"; 
        });

        
        this.classList.add('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-white', 'scale-110', 'dark:ring-offset-slate-900');
       
    });
}

var root = document.documentElement;

var defaultPrimary   = getComputedStyle(root).getPropertyValue('--color-primary');
var defaultSecondary = getComputedStyle(root).getPropertyValue('--color-secondary');
var defaultAccent    = getComputedStyle(root).getPropertyValue('--color-accent');

var defaultBodyClass = document.body.className;
// زرار reset
document.getElementById("reset-settings").addEventListener("click", function () {

  // رجوع الألوان
  root.style.setProperty('--color-primary', defaultPrimary);
  root.style.setProperty('--color-secondary', defaultSecondary);
  root.style.setProperty('--color-accent', defaultAccent);

  // 
  buttonsColor.forEach(function (btn) {
    btn.classList.remove(
      'ring-2',
      'ring-primary',
      'ring-offset-2',
      'ring-offset-white',
      'scale-110',
      'dark:ring-offset-slate-900'
    );
    btn.style.borderColor = "transparent";
  });

  // رجوع الخط الأصلي
  buttonsFont.forEach(function (btn) {
    document.body.classList.remove(`font-${btn.dataset.font}`);
  });

  document.body.className = defaultBodyClass;
});




// scroll position
var sections = document.querySelectorAll('section');
var navLinks = document.querySelectorAll('nav a');
// end 1
window.addEventListener('scroll', function(e) {
    var current = '';
    for (let i = 0; i< sections.length; i++) {
        
        var sectop = sections[i].offsetTop
        if(pageYOffset > sectop-89)
        current = sections[i].getAttribute('id')
    console.log(current)
    }
   ;

    navLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});








// to Top

document.addEventListener("DOMContentLoaded", function () {
  var scroll_to_topBtn = document.getElementById("scroll-to-top");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      scroll_to_topBtn.classList.remove("opacity-0", "invisible");
    } else {
      scroll_to_topBtn.classList.add("opacity-0", "invisible");
    }
  });

  scroll_to_topBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});


