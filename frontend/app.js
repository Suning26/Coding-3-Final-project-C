const imageInput = document.getElementById('imageInput');
const preview = document.getElementById('preview');
const uploadBtn = document.getElementById('uploadBtn');
const resultDiv = document.getElementById('result');

imageInput.addEventListener('change', () => {
  const file = imageInput.files[0];
  if (file) {
    preview.src = URL.createObjectURL(file);
    preview.style.display = 'block';
    uploadBtn.disabled = false;
    resultDiv.textContent = '';
  } else {
    preview.style.display = 'none';
    uploadBtn.disabled = true;
  }
});

uploadBtn.addEventListener('click', async () => {
  const file = imageInput.files[0];
  if (!file) return;

  uploadBtn.disabled = true;
  resultDiv.textContent = 'Generating, please wait...';

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/api/upload_images', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Upload failed: ' + response.statusText);
    }

    const data = await response.json();
    resultDiv.textContent = data.story || 'No content returned';
  } catch (error) {
    resultDiv.textContent = 'Error: ' + error.message;
  } finally {
    uploadBtn.disabled = false;
  }
});
