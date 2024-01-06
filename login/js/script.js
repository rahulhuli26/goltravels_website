const forms = document.querySelector(".forms"),
  pwShowHide = document.querySelectorAll(".eye-icon"),
  links = document.querySelectorAll(".link");

pwShowHide.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    let pwFields =
      eyeIcon.parentElement.parentElement.querySelectorAll(".password");

    pwFields.forEach((password) => {
      if (password.type === "password") {
        password.type = "text";
        eyeIcon.classList.replace("bx-hide", "bx-show");
        return;
      }
      password.type = "password";
      eyeIcon.classList.replace("bx-show", "bx-hide");
    });
  });
});

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); //preventing form submit
    forms.classList.toggle("show-signup");
  });
});

document
  .getElementById("signupForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("signupemail").value;
    const password = document.getElementById("signuppassword").value;
    const confirm_password = document.getElementById("conformPassword").value;
    console.log(email, password, confirm_password);

    try {
      const response = await fetch("/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, confirm_password }),
      });

      const data = await response.json();
      console.log(data);

      // Handle the response from the backend
      if (response.ok && password === confirm_password) {
        console.log("signup successfully");
        window.location.href = "https://goltravels.com";
      } else if (password !== confirm_password) {
        alert("password and confirm password should be same");
      } else {
        console.log("error while signup");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  });

document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email, password);

    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);

      // Handle the response from the backend
      if (response.ok) {
        console.log("login successfully");
        window.location.href = "https://goltravels.com";
      } else {
        console.log("error while login");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  });
