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
  resultDiv.textContent = '正在生成，请稍候...';

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('上传失败: ' + response.statusText);
    }

    const data = await response.json();
    resultDiv.textContent = data.story || '无返回内容';
  } catch (error) {
    resultDiv.textContent = '错误: ' + error.message;
  } finally {
    uploadBtn.disabled = false;
  }
});
