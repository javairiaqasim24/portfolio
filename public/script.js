// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  hamburger.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    hamburger.classList.remove("active")
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Active navigation link highlighting
window.addEventListener("scroll", () => {
  let current = ""
  const sections = document.querySelectorAll("section")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Skills toggle functionality
const toggleBtns = document.querySelectorAll(".toggle-btn")
const codingSkills = document.querySelectorAll(".coding-skill")
const toolsSkills = document.querySelectorAll(".tools-skill")

toggleBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    toggleBtns.forEach((b) => b.classList.remove("active"))
    // Add active class to clicked button
    btn.classList.add("active")

    const category = btn.getAttribute("data-category")

    if (category === "coding") {
      // Show coding skills, hide tools
      codingSkills.forEach((skill) => {
        skill.style.display = "flex"
        skill.style.animation = "fadeInUp 0.5s ease-out"
      })
      toolsSkills.forEach((skill) => {
        skill.style.display = "none"
      })
    } else {
      // Show tools, hide coding skills
      toolsSkills.forEach((skill) => {
        skill.style.display = "flex"
        skill.style.animation = "fadeInUp 0.5s ease-out"
      })
      codingSkills.forEach((skill) => {
        skill.style.display = "none"
      })
    }
  })
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running"
      if (entry.target.classList.contains("timeline-item")) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
      if (entry.target.classList.contains("service-card")) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
      if (entry.target.classList.contains("stat-item")) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
        // Animate the numbers
        const numberElement = entry.target.querySelector("h4")
        if (numberElement) {
          animateNumber(numberElement)
        }
      }
    }
  })
}, observerOptions)

document.querySelectorAll(".project-card, .skill-item, .timeline-item, .service-card, .stat-item").forEach((el) => {
  observer.observe(el)
})

function animateNumber(element) {
  const target = Number.parseInt(element.textContent)
  const duration = 2000
  const start = performance.now()

  function updateNumber(currentTime) {
    const elapsed = currentTime - start
    const progress = Math.min(elapsed / duration, 1)
    const current = Math.floor(progress * target)

    element.textContent = current + (element.textContent.includes("+") ? "+" : "")

    if (progress < 1) {
      requestAnimationFrame(updateNumber)
    }
  }

  requestAnimationFrame(updateNumber)
}

document.querySelectorAll(".social-icon").forEach((icon) => {
  icon.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px) scale(1.1) rotate(5deg)"
  })

  icon.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1) rotate(0deg)"
  })
})

function initTimelineAnimations() {
  const timelineItems = document.querySelectorAll(".timeline-item")

  timelineItems.forEach((item, index) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(50px)"
    item.style.transition = "all 0.6s ease-out"
    item.style.transitionDelay = `${index * 0.2}s`
  })
}

function initServiceAnimations() {
  const serviceCards = document.querySelectorAll(".service-card")

  serviceCards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "all 0.6s ease-out"
    card.style.transitionDelay = `${index * 0.1}s`
  })
}

function initStatAnimations() {
  const statItems = document.querySelectorAll(".stat-item")

  statItems.forEach((item, index) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(20px)"
    item.style.transition = "all 0.5s ease-out"
    item.style.transitionDelay = `${index * 0.1}s`
  })
}

window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const originalText = heroTitle.textContent
    typeWriter(heroTitle, originalText, 50)
  }

  // Initialize new animations
  initTimelineAnimations()
  initServiceAnimations()
  initStatAnimations()
})

// Enhanced form validation
const contactForm = document.getElementById("contact-form")

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  const name = contactForm.querySelector("#name").value.trim()
  const email = contactForm.querySelector("#email").value.trim()
  const subject = contactForm.querySelector("#subject").value.trim()
  const message = contactForm.querySelector("#message").value.trim()

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields.")
    return
  }

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.")
    return
  }

  if (message.length < 10) {
    alert("Please enter a message with at least 10 characters.")
    return
  }

  const submitBtn = contactForm.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent
  submitBtn.textContent = "Sending..."
  submitBtn.disabled = true

  try {
    // ✅ Send form data via EmailJS
    await emailjs.send(
      "service_pkqus9h",
      "template_x3rneeu",
      {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
      }
    )

    showNotification("Message sent successfully! I'll get back to you soon.", "success")
    contactForm.reset()
  } catch (error) {
    showNotification("Sorry, there was an error sending your message. Please try again.", "error")
    console.error("Form submission error:", error)
  } finally {
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }
})


function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification")
  if (existingNotification) {
    existingNotification.remove()
  }

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.textContent = message

  // Style the notification
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 5px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease-out;
    max-width: 300px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  `

  // Set background color based on type
  if (type === "success") {
    notification.style.background = "#4CAF50"
  } else if (type === "error") {
    notification.style.background = "#f44336"
  } else {
    notification.style.background = "#2196F3"
  }

  // Add to page
  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, 5000)
}

// Add floating animation to profile image
const profileImg = document.querySelector(".profile-img")
if (profileImg) {
  setInterval(() => {
    profileImg.style.transform = `translateY(${Math.sin(Date.now() * 0.001) * 5}px)`
  }, 16)
}

// Parallax effect for floating brackets
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallax = scrolled * 0.5

  document.querySelectorAll(".floating-bracket").forEach((bracket) => {
    bracket.style.transform = `translateY(${parallax}px)`
  })
})

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}
