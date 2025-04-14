function generateResume() {
  const name = document.getElementById('name').value;
  const title = document.getElementById('title').value;
  const linkedin = document.getElementById('linkedin').value;
  const github = document.getElementById('github').value;
  const summary = document.getElementById('summary').value;
  const education = document.getElementById('education').value;
  const skills = document.getElementById('skills').value;
  const projects = document.getElementById('projects').value;
  const experience = document.getElementById('experience').value;
  const imageInput = document.getElementById('profileImage');
  const imageURL = imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : '';

  const resumePreview = document.getElementById('resumePreview');
  resumePreview.innerHTML = `
    <div class="text-center mb-4">
      ${imageURL ? `<img src="${imageURL}" alt="Profile" class="mx-auto w-28 h-28 object-cover rounded-full border-4 border-blue-600 mb-2">` : ''}
      <h2 class="text-2xl font-bold">${name}</h2>
      <p class="text-gray-600">${title}</p>
      <div class="flex justify-center gap-4 mt-2">
        ${linkedin ? `<a href="${linkedin}" target="_blank" class="text-blue-500 hover:underline">LinkedIn</a>` : ''}
        ${github ? `<a href="${github}" target="_blank" class="text-blue-500 hover:underline">GitHub</a>` : ''}
      </div>
    </div>
    ${summary ? `<h3 class="font-semibold text-lg mt-4">Summary</h3><p class="text-sm text-gray-700">${summary}</p>` : ''}
    ${education ? `<h3 class="font-semibold text-lg mt-4">Education</h3>${convertToBullets(education)}` : ''}
    ${skills ? `<h3 class="font-semibold text-lg mt-4">Skills</h3>${convertToBullets(skills)}` : ''}
    ${projects ? `<h3 class="font-semibold text-lg mt-4">Projects</h3>${convertToBullets(projects)}` : ''}
    ${experience ? `<h3 class="font-semibold text-lg mt-4">Experience</h3>${convertToBullets(experience)}` : ''}
  `;

  resumePreview.classList.remove('hidden');
}

function convertToBullets(text) {
  const lines = text.split(/\n|•/).map(line => line.trim()).filter(line => line.length > 0);
  return `<ul class="list-disc list-inside text-sm text-gray-800 mt-2">${lines.map(line => `<li>${line}</li>`).join('')}</ul>`;
}

function printResume() {
  const originalContent = document.body.innerHTML;
  const resumeContent = document.getElementById('resumePreview').outerHTML;
  document.body.innerHTML = resumeContent;
  window.print();
  document.body.innerHTML = originalContent;
  // window.location.reload();
}

function downloadPDF() {
  const element = document.getElementById('resumePreview');
  if (!element || element.classList.contains('hidden')) {
    alert("Please generate the resume first.");
    return;
  }

  const opt = {
    margin: 0.5,
    filename: 'My_Resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save();
}
