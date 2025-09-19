document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }
  
  // Menu Categories
  const menuCategories = document.querySelectorAll(".menu-category");
  const menuItems = document.querySelectorAll(".menu-item");

  if (menuCategories.length > 0) {
    menuCategories.forEach((category) => {
      category.addEventListener("click", function () {
        const selectedCategory = this.getAttribute("data-category");

        menuCategories.forEach((cat) => {
          cat.classList.remove("active");
        });

        this.classList.add("active");

        menuItems.forEach((item) => {
          if (selectedCategory === "all" || item.getAttribute("data-type") === selectedCategory) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

  // Order Form
  const menuItemSelect = document.getElementById("menuItem");
  const addons = document.querySelectorAll('input[name="addons"]');
  const subtotalElement = document.getElementById("subtotal");
  const totalElement = document.getElementById("total");
  const placeOrderBtn = document.getElementById("placeOrderBtn");

  // Menu prices
  const menuPrices = {
    "3-layered-coffee": 38000,
    "iced-frappucino": 20000,
    "iced-americano": 16000,
    "chocolate-frappe": 26000,
    "thai-tea-frappe": 23000,
    "iced-raspberry-leaf-tea": 23000,
    "apple-cinnamon-roll": 25000,
    "chocolate-almond-croissant": 25000,
    "blueberry-muffin": 22000,
    "spaghetti-bolognese": 45000,
    "spicy-miso-ramen": 50000,
    "sticky-chicken-rice-bowl": 40000,
    "matcha-frappe": 23000,
    "red-velvet-frappe": 25000,
    "iced-lychee-tea": 18500,
    "iced-lemon-tea": 18000,



  };

  // Addon prices
  const addonPrices = {
    "brown-sugar-boba": 5000,
    "caramel-syrup": 7000,
    "egg-pudding": 5000,
    "hazelnut-syrup": 7000,
  };

  function updateOrderSummary() {
    let subtotal = 0;

    // Add menu item price
    const selectedMenuItem = menuItemSelect.value;
    if (selectedMenuItem && menuPrices[selectedMenuItem]) {
      subtotal += menuPrices[selectedMenuItem];
    }

    // Add addon prices
    addons.forEach((addon) => {
      if (addon.checked && addonPrices[addon.value]) {
        subtotal += addonPrices[addon.value];
      }
    });


    const formattedSubtotal = new Intl.NumberFormat("id-ID").format(subtotal);
    const formattedTotal = new Intl.NumberFormat("id-ID").format(subtotal + 5000);


    if (subtotalElement && totalElement) {
      subtotalElement.textContent = `Rp ${formattedSubtotal}`;
      totalElement.textContent = `Rp ${formattedTotal}`;
    }
  }


  function validateForm() {
    let isValid = true;

    // Full Name validation
    const fullName = document.getElementById("fullName");
    const fullNameError = document.getElementById("fullNameError");

    if (fullName && fullNameError) {
      if (!fullName.value.trim()) {
        fullNameError.textContent = "Full name is required";
        isValid = false;
      } else if (fullName.value.trim().length < 3) {
        fullNameError.textContent = "Full name must be at least 3 characters";
        isValid = false;
      } else {
        fullNameError.textContent = "";
      }
    }

    // Email validation
    const email = document.getElementById("email");
    const emailError = document.getElementById("emailError");

    if (email && emailError) {
      if (!email.value.trim()) {
        emailError.textContent = "Email is required";
        isValid = false;
      } else if (!email.value.includes("@") || !email.value.includes(".")) {
        emailError.textContent = "Please enter a valid email address";
        isValid = false;
      } else {
        emailError.textContent = "";
      }
    }

    // Phone validation
    const phone = document.getElementById("phone");
    const phoneError = document.getElementById("phoneError");

    if (phone && phoneError) {
      if (!phone.value.trim()) {
        phoneError.textContent = "Phone number is required";
        isValid = false;
      } else if (phone.value.trim().length < 10) {
        phoneError.textContent = "Phone number must be at least 10 digits";
        isValid = false;
      } else {
        phoneError.textContent = "";
      }
    }

    // Address validation
    const address = document.getElementById("address");
    const addressError = document.getElementById("addressError");

    if (address && addressError) {
      if (!address.value.trim()) {
        addressError.textContent = "Address is required";
        isValid = false;
      } else if (address.value.trim().length < 10) {
        addressError.textContent = "Please enter a complete address";
        isValid = false;
      } else {
        addressError.textContent = "";
      }
    }

    // Menu item validation
    const menuItem = document.getElementById("menuItem");
    const menuItemError = document.getElementById("menuItemError");

    if (menuItem && menuItemError) {
      if (!menuItem.value) {
        menuItemError.textContent = "Please select a menu item";
        isValid = false;
      } else {
        menuItemError.textContent = "";
      }
    }

    return isValid;
  }


  if (menuItemSelect) {
    menuItemSelect.addEventListener("change", updateOrderSummary);

    addons.forEach((addon) => {
      addon.addEventListener("change", updateOrderSummary);
    });


    updateOrderSummary();


    if (placeOrderBtn) {
      placeOrderBtn.addEventListener("click", () => {
        if (validateForm()) {
          // Show order confirmation
          alert("Thank you for your order! Your delicious MR.COFFEE items will be on their way soon.");


          document.getElementById("fullName").value = "";
          document.getElementById("email").value = "";
          document.getElementById("phone").value = "";
          document.getElementById("address").value = "";
          menuItemSelect.value = "";

          if (document.getElementById("instructions")) {
            document.getElementById("instructions").value = "";
          }

          addons.forEach((addon) => {
            addon.checked = false;
          });

          updateOrderSummary();
        }
      });
    }
  }


  const formInputs = document.querySelectorAll(".order-form input, .order-form select");
  formInputs.forEach((input) => {
    input.addEventListener("input", validateForm);
  });


  const claimButtons = document.querySelectorAll('.claim-btn');
  claimButtons.forEach(button => {
    button.addEventListener('click', () => {
      alert("🎉 Reward claimed successfully! Enjoy your treat from MR.COFFEE ☕");
    });
  });
});