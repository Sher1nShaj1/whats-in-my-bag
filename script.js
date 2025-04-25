// Select the left and right arrow buttons for navigating between bags
const leftArrow = document.querySelector('.arrow.left');
const rightArrow = document.querySelector('.arrow.right');
// Select all the bag containers (each one holds a bag + its items)
const bagContainers = document.querySelectorAll('.bag-container');
// Select the background div to change its color dynamically
const background = document.querySelector('.background');

// Array of background colors that rotate with each bag. I did use AI to undertand how to implement this
const backgroundColors = ['#6CB4EE', '#FFC0CB', '#e7dcc6'];

// Index to track which bag is currently visible
let currentBagIndex = 0;
// Flag to track if the bag is open or closed (showing items or not)
let isOpen = false;

//Shows the currently selected bag and hides all others.
//Also resets item positions and updates the background color.
function updateVisibleBag() {
  bagContainers.forEach((container, index) => {
    // Only show the active bag (hide the rest)
    container.classList.toggle('active', index === currentBagIndex);

    // Reset all items inside the bag to the center position and hide them
    const items = container.querySelectorAll('.item');
    items.forEach(item => {
      item.style.transform = `translate(-50%, -50%) rotate(0deg)`;
      item.style.opacity = '0';
    });
  });
  // Change the background color based on the selected bag
  background.style.backgroundColor = backgroundColors[currentBagIndex % backgroundColors.length];

  // Ensure the bag starts closed after switching. Close any open items when switching bags
  isOpen = false; 
}

// Handle bag click to disperse items. Add click behavior to each bag image to toggle showing/hiding items.
function addBagClickListeners() {
  bagContainers.forEach(container => {
    const bagImage = container.querySelector('img'); // the bag image
    const items = container.querySelectorAll('.item'); // items inside the bag

    // Toggle item visibility when bag is clicked
    bagImage.addEventListener('click', () => {
      isOpen = !isOpen;

      items.forEach(item => {
        const x = item.style.getPropertyValue('--x'); // X offset for dispersal
        const y = item.style.getPropertyValue('--y'); // Y offset
        const angle = item.style.getPropertyValue('--angle') || '0deg'; // rotation

        if (isOpen) {
          // Disperse the item out from the bag
          item.style.transform = `translate(calc(-50% + ${x}), calc(-50% + ${y})) rotate(${angle})`;
          item.style.opacity = '1';
        } else {
          // Reset item back to bag
          item.style.transform = `translate(-50%, -50%) rotate(0deg)`;
          item.style.opacity = '0';
        }
      });
    });
  });
}

// Arrow navigation-functionality to the left arrow to move to the previous bag
leftArrow.addEventListener('click', () => {
  currentBagIndex = (currentBagIndex - 1 + bagContainers.length) % bagContainers.length;
  updateVisibleBag();
});

// functionality to the right arrow to move to the next bag
rightArrow.addEventListener('click', () => {
  currentBagIndex = (currentBagIndex + 1) % bagContainers.length;
  updateVisibleBag();
});

// Run these functions when the page loads
addBagClickListeners(); // Enable clicking on bags to show/hide items
updateVisibleBag(); // Show the first bag initially

// Intro Screen Scroll Logic
//Hides the fullscreen intro screen once the user scrolls down
window.addEventListener('scroll', () => {
  const intro = document.querySelector('.intro-screen');
  if (window.scrollY > 50) {
    intro.style.display = 'none'; // hide the intro screen
  }
});

//Toggle View (Products vs Bags)
//Allows user to switch between "View Bags" and "View Products"
const toggleButtons = document.querySelectorAll('.toggle-btn');
const viewSections = {
  bags: document.querySelector('.view-bags'),
  products: document.querySelector('.view-products')
};

// Add click events to toggle buttons
toggleButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active state from all buttons
    toggleButtons.forEach(b => b.classList.remove('active'));
    // Add active class to the clicked button
    btn.classList.add('active');
    // Show the selected view and hide the other
    const view = btn.dataset.view;
    Object.keys(viewSections).forEach(key => {
      viewSections[key].style.display = key === view ? 'block' : 'none';
    });
  });
});