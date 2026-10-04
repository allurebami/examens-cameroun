const WHATSAPP_NUMBER = "237657806397";

const documents = [
  {
    level: "3e",
    series: "General",
    subject: "Mathematiques",
    exam: "BEPC",
    year: "2025",
    paperUrl: "#",
    correction: "premium",
  },
  {
    level: "3e",
    series: "General",
    subject: "Francais",
    exam: "BEPC",
    year: "2025",
    paperUrl: "#",
    correction: "free",
  },
  {
    level: "3e",
    series: "General",
    subject: "PCT",
    exam: "BEPC",
    year: "2024",
    paperUrl: "#",
    correction: "premium",
  },
  {
    level: "3e",
    series: "General",
    subject: "SVTEEHB",
    exam: "BEPC",
    year: "2024",
    paperUrl: "#",
    correction: "coming",
  },
  {
    level: "Premiere",
    series: "A",
    subject: "Francais",
    exam: "Probatoire",
    year: "2025",
    paperUrl: "#",
    correction: "premium",
  },
  {
    level: "Premiere",
    series: "C",
    subject: "Mathematiques",
    exam: "Probatoire",
    year: "2025",
    paperUrl: "#",
    correction: "premium",
  },
  {
    level: "Premiere",
    series: "D",
    subject: "Physique-Chimie",
    exam: "Probatoire",
    year: "2024",
    paperUrl: "#",
    correction: "free",
  },
  {
    level: "Premiere",
    series: "ESG",
    subject: "Comptabilite",
    exam: "Probatoire",
    year: "2024",
    paperUrl: "#",
    correction: "premium",
  },
  {
    level: "Terminale",
    series: "A",
    subject: "Philosophie",
    exam: "Baccalaureat",
    year: "2025",
    paperUrl: "#",
    correction: "free",
  },
  {
    level: "Terminale",
    series: "C",
    subject: "Mathematiques",
    exam: "Baccalaureat",
    year: "2025",
    paperUrl: "#",
    correction: "premium",
  },
  {
    level: "Terminale",
    series: "D",
    subject: "SVTEEHB",
    exam: "Baccalaureat",
    year: "2024",
    paperUrl: "#",
    correction: "premium",
  },
  {
    level: "Terminale",
    series: "ESG",
    subject: "Economie generale",
    exam: "Baccalaureat",
    year: "2024",
    paperUrl: "#",
    correction: "coming",
  },
];

const state = {
  level: "all",
  series: "all",
  subject: "",
};

const documentList = document.querySelector("#documentList");
const resultTitle = document.querySelector("#resultTitle");
const resultCount = document.querySelector("#resultCount");
const classFilter = document.querySelector("#classFilter");
const seriesFilter = document.querySelector("#seriesFilter");
const subjectFilter = document.querySelector("#subjectFilter");

function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function correctionLabel(status) {
  const labels = {
    free: "Corrige gratuit",
    premium: "Corrige premium",
    coming: "Corrige bientot",
  };
  return labels[status] || "Corrige";
}

function correctionClass(status) {
  return status === "free" ? "free" : status === "premium" ? "premium" : "";
}

function matchesFilters(item) {
  const subject = state.subject.trim().toLowerCase();
  const levelMatch = state.level === "all" || item.level === state.level;
  const seriesMatch = state.series === "all" || item.series === state.series;
  const subjectMatch = !subject || item.subject.toLowerCase().includes(subject);
  return levelMatch && seriesMatch && subjectMatch;
}

function renderDocuments() {
  const filtered = documents.filter(matchesFilters);

  resultTitle.textContent =
    state.level === "all" ? "Toutes les epreuves" : `${state.level} - epreuves disponibles`;
  resultCount.textContent = `${filtered.length} document${filtered.length > 1 ? "s" : ""}`;

  if (!filtered.length) {
    documentList.innerHTML = `
      <div class="empty-state">
        Aucun document ne correspond a ce filtre. Utilise le bouton WhatsApp pour demander une epreuve manquante.
      </div>
    `;
    return;
  }

  documentList.innerHTML = filtered
    .map((item) => {
      const correctionText = correctionLabel(item.correction);
      const correctionUrl =
        item.correction === "free"
          ? "#"
          : whatsappLink(
              `Bonjour, je veux le corrige ${item.exam} ${item.year} - ${item.level} serie ${item.series} - ${item.subject}.`
            );

      return `
        <article class="document-card">
          <div>
            <h4>${item.level} ${item.series} - ${item.subject}</h4>
            <div class="document-meta">
              <span class="badge">${item.exam}</span>
              <span class="badge">${item.year}</span>
              <span class="badge">${item.series}</span>
              <span class="badge ${correctionClass(item.correction)}">${correctionText}</span>
            </div>
          </div>
          <div class="document-actions">
            <a class="small-button" href="${item.paperUrl}" target="_blank" rel="noreferrer">Epreuve PDF</a>
            <a class="small-button primary" href="${correctionUrl}" target="_blank" rel="noreferrer">${correctionText}</a>
          </div>
        </article>
      `;
    })
    .join("");
}

function setActiveButtons(selector, attribute, value) {
  document.querySelectorAll(selector).forEach((button) => {
    button.classList.toggle("active", button.dataset[attribute] === value);
  });
}

document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", () => {
    state.level = button.dataset.level;
    classFilter.value = state.level;
    setActiveButtons(".tab", "level", state.level);
    renderDocuments();
  });
});

document.querySelectorAll(".filter-pill").forEach((button) => {
  button.addEventListener("click", () => {
    state.series = button.dataset.series;
    seriesFilter.value = state.series;
    setActiveButtons(".filter-pill", "series", state.series);
    renderDocuments();
  });
});

document.querySelector("#quickSearch").addEventListener("submit", (event) => {
  event.preventDefault();
  state.level = classFilter.value;
  state.series = seriesFilter.value;
  state.subject = subjectFilter.value;
  setActiveButtons(".tab", "level", state.level);
  setActiveButtons(".filter-pill", "series", state.series);
  document.querySelector("#bibliotheque").scrollIntoView({ behavior: "smooth" });
  renderDocuments();
});

document.querySelector("#heroWhatsapp").href = whatsappLink(
  "Bonjour, je veux demander un corrige pour la plateforme Examens Cameroun."
);
document.querySelector("#singleCorrection").href = whatsappLink(
  "Bonjour, je veux acheter un corrige detaille."
);
document.querySelector("#classPack").href = whatsappLink(
  "Bonjour, je veux le pack complet pour une classe ou une serie."
);
document.querySelector("#examPack").href = whatsappLink(
  "Bonjour, je veux reserver un pack de preparation intensive."
);
document.querySelector("#contactWhatsapp").href = whatsappLink(
  "Bonjour, je veux plus d'informations sur les epreuves et corriges."
);

renderDocuments();
