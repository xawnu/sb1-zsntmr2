import React, { useState } from 'react';
import axios from 'axios';

function ImageProcessing() {
  const [file, setFile] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setProcessedImage(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/image/process', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setProcessedImage(response.data.processedImageUrl);
    } catch (error) {
      console.error('Error processing image:', error);
      setError('Error processing image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Image Processing</h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="file-upload" className="sr-only">
                Choose file
              </label>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={!file || isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                !file || isLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isLoading ? 'Processing...' : 'Process Image'}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-8 text-center text-red-600">
            {error}
          </div>
        )}

        {processedImage && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Processed Image</h2>
            <div className="flex justify-center">
              <img src={processedImage} alt="Processed" className="max-w-full h-auto rounded-lg shadow-lg" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageProcessing;