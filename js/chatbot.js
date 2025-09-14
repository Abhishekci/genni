const chatBody = document.getElementById('chatBody');
const faqChatbot = document.getElementById('faqChatbot');
const faqTrigger = document.getElementById('faqTrigger');

const faqSections = {
  competition: [
    { question: "What is the Young Genius League 2025?", answer: "Ans:\nA premier platform for Class 6-12 students to showcase innovative ideas and projects." },
    { question: "Who can participate?", answer: "Ans:\nStudents from Class 6 to 12 from Chennai and nearby districts are welcome." },
    { question: "What are the eligibility criteria?", answer: "Ans:\nParticipants must be enrolled in schools within Chennai, Chengalpattu, Kanchipuram, Vellore, or Thiruvallur." },
    { question: "Are there age limits?", answer: "Ans:\nOnly students between Class 6 and Class 12 can participate." },
    { question: "How are projects judged?", answer: "Ans:\nIndustry experts and educators evaluate projects on innovation, collaboration, and future readiness." },
    { question: "What are the prizes?", answer: "Ans:\nWinners receive awards, recognition, and networking opportunities with industry leaders." }
  ],
  registration: [
    { question: "How do I register for the competition?", answer: "Ans:\nParticipants register online via the official website by filling out the form." },
    { question: "What information is needed <br> for registration?", answer: "Ans:\nPersonal details, school, class, project summary, and guardian consent." },
    { question: "Can we register as a team?", answer: "Ans:\nYes, you can register as a team." },
    { question: "Is there a registration fee?", answer: "Ans:\nYes, the fee is ₹1000 if paid before the closing date; late registration costs ₹1500." },
    { question: "What is the registration deadline?", answer: "Ans:\nRegistrations close one month before the event date; check website for exact date." },
    { question: "Can I edit my registration details?", answer: "Ans:\nYes, via a link sent in the confirmation email." }
  ],
  sponsor: [
    { question: "Who can become a sponsor?", answer: "Ans:\nAny organization or individual interested in supporting innovation and education." },
    { question: "What are the sponsorship packages?", answer: "Ans:\nPackages range from Title Sponsor (₹12,00,000) to Advertisement Sponsor (₹2,00,000) with various benefits." },
    { question: "What benefits do sponsors receive?", answer: "Ans:\nBrand visibility, networking, community impact, and branding opportunities." },
    { question: "How do sponsors apply?", answer: "Ans:\nContact Arun Kumar D. at arun@genixhub.in or call +91 98848 55616." },
    { question: "Are there deadlines for sponsorship?", answer: "Ans:\nEarly engagement recommended; timelines shared upon inquiry." },
    { question: "What sponsorship forms are accepted?", answer: "Ans:\nWe accept cash, products, services, and partnerships." }
  ],
  contact: [
    { question: "How can I contact support?", answer: "Ans:\nEmail support@genixhub.in or call +91 98848 55616." },
    { question: "What are your support hours?", answer: "Ans:\nMonday to Friday, 9am to 6pm IST." },
    { question: "How quickly will I get a response?", answer: "Ans:\nTypically within 24 hours on business days." },
    { question: "Are there social media channels for updates?", answer: "Ans:\nFollow @genixhub on Facebook, Twitter, and Instagram." },
    { question: "Can I get help with technical issues?", answer: "Ans:\nYes, assistance is available for technical or registration issues." }
  ]
};

let currentSection = null;

function showWelcome() {
  currentSection = null;
  chatBody.innerHTML = `
    <div class="welcomeMsg">Welcome young genius, how may I help you?</div>
    <button class="sectionBtn" onclick="showSection('competition')">1. Know more about the competition</button>
    <button class="sectionBtn" onclick="showSection('registration')">2. Help with registration process</button>
    <button class="sectionBtn" onclick="showSection('sponsor')">3. How to become a sponsor</button>
    <button class="sectionBtn" onclick="showSection('contact')">4. Get in touch</button>
  `;
}

function showSection(sectionKey) {
  currentSection = sectionKey;
  const faqs = faqSections[sectionKey];
  if(!faqs || faqs.length === 0) {
    chatBody.innerHTML = `<p>No FAQs available for this section yet.</p><button class="backBtn" onclick="showWelcome()">Back</button>`;
    return;
  }
  let faqHtml = '';
  faqs.forEach((faq, idx) => {
    faqHtml += `<button class="faqQuestion" onclick="showAnswer(${idx})">${faq.question}</button>`;
  });
  faqHtml += `<button class="backBtn" onclick="showWelcome()">Back</button>`;
  chatBody.innerHTML = faqHtml;
}

function showAnswer(index) {
  const faq = faqSections[currentSection][index];
  chatBody.innerHTML = `
    <button class="faqQuestion selected">${faq.question}</button>
    <div class="answerText">${faq.answer}</div>
    <div class="assistText">Is there anything I may assist you with?</div>
    <button class="answerBtn" onclick="yesHandler()">Yes</button>
    <button class="answerBtn" onclick="noHandler()">No</button>
    <button class="backBtn" onclick="showWelcome()">Back to Main Menu</button>
  `;
}

function yesHandler() {
  showSection(currentSection);
}

function noHandler() {
  chatBody.innerHTML = `
    <div class="answerText">Thank you for chatting with us!</div>
    <button class="backBtn" onclick="showWelcome()">Back to Main Menu</button>
  `;
}

function openChat() {
  faqChatbot.style.display = 'flex';
  showWelcome();
}

function closeChat() {
  faqChatbot.style.display = 'none';
}

faqTrigger.addEventListener('click', openChat);