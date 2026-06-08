import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import axios, { AxiosError } from 'axios';
import './App.css';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setUploadedImageUrl(null);
    setProgress(0);

    const file = event.target.files?.[0];
    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Дозволені лише зображення (JPEG, PNG, WEBP).');
      setSelectedFile(null);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('Розмір файлу не повинен перевищувати 5 МБ.');
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async (event: FormEvent) => {
    event.preventDefault();
    if (!selectedFile) return;

    setError(null);
    setIsUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      
      const response = await axios.post(`${apiUrl}/files`, formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
          }
        },
      });

      setUploadedImageUrl(response.data.url);
      setSelectedFile(null);
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string | string[] }>;
      const serverMessage = axiosError.response?.data?.message;
      setError(
        Array.isArray(serverMessage) 
          ? serverMessage.join(', ') 
          : serverMessage || 'Сталася помилка при завантаженні файлу на сервер.'
      );
      setProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Завантаження зображення</h1>
      </header>

      <main>
        <div className="upload-card">
          <form onSubmit={handleUpload}>
            <div className="file-input-wrapper">
              <label htmlFor="file-input" className="file-label">
                {selectedFile ? 'Обрати інше зображення' : 'Обрати зображення'}
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/jpeg, image/png, image/webp"
                onChange={handleFileSelect}
                disabled={isUploading}
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            {previewUrl && selectedFile && (
              <div className="preview-container">
                <img src={previewUrl} alt="Preview" className="image-preview" />
                <div className="file-info">
                  <span className="truncate">{selectedFile.name}</span>
                  <span>{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                </div>
              </div>
            )}

            {isUploading && (
              <div className="progress-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                <div className="progress-text">{progress}%</div>
              </div>
            )}

            <button 
              type="submit" 
              className="upload-button"
              disabled={!selectedFile || !!error || isUploading}
            >
              {isUploading ? 'Завантаження...' : 'Відправити на сервер'}
            </button>
          </form>
        </div>

        {uploadedImageUrl && (
          <div className="success-card">
            <h2>Успішно завантажено</h2>
            <div className="result-image-container">
              <img src={uploadedImageUrl} alt="Uploaded result" className="result-image" />
            </div>
            <a href={uploadedImageUrl} target="_blank" rel="noreferrer" className="result-link">
              Відкрити оригінал по URL
            </a>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
