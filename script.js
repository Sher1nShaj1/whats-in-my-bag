const leftArrow = document.querySelector('.arrow.left');
const rightArrow = document.querySelector('.arrow.right');
const bagContainers = document.querySelectorAll('.bag-container');
const background = document.querySelector('.background');
const backgroundColors = ['#6CB4EE', '#FFC0CB', '#000000'];

let currentBagIndex = 0;
let isOpen = false;

// Helper: Update which bag is visible
function updateVisibleBag() {
  bagContainers.forEach((container, index) => {
    container.classList.toggle('active', index === currentBagIndex);

    // Reset item positions when switching bags
    const items = container.querySelectorAll('.item');
    items.forEach(item => {
      item.style.transform = `translate(-50%, -50%) rotate(0deg)`;
      item.style.opacity = '0';
    });
  });
  background.style.backgroundColor = backgroundColors[currentBagIndex % backgroundColors.length];

  isOpen = false; // Close any open items when switching bags
}

// Handle bag click to disperse items
function addBagClickListeners() {
  bagContainers.forEach(container => {
    const bagImage = container.querySelector('img');
    const items = container.querySelectorAll('.item');

    bagImage.addEventListener('click', () => {
      isOpen = !isOpen;

      items.forEach(item => {
        const x = item.style.getPropertyValue('--x');
        const y = item.style.getPropertyValue('--y');
        const angle = item.style.getPropertyValue('--angle') || '0deg';

        if (isOpen) {
          item.style.transform = `translate(calc(-50% + ${x}), calc(-50% + ${y})) rotate(${angle})`;
          item.style.opacity = '1';
        } else {
          item.style.transform = `translate(-50%, -50%) rotate(0deg)`;
          item.style.opacity = '0';
        }
      });
    });
  });
}

// Arrow navigation
leftArrow.addEventListener('click', () => {
  currentBagIndex = (currentBagIndex - 1 + bagContainers.length) % bagContainers.length;
  updateVisibleBag();
});

rightArrow.addEventListener('click', () => {
  currentBagIndex = (currentBagIndex + 1) % bagContainers.length;
  updateVisibleBag();
});

// Initialize
addBagClickListeners();
updateVisibleBag();
