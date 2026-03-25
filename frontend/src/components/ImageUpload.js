import { useState, useRef } from 'react';
import { Upload, X, Image } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const ImageUpload = ({ value, onChange, className = '' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value || '');
  const fileInputRef = useRef(null);
  const { token } = useAuth();

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) {
      return;
    }

    setUploading(true);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target.result;
      setPreview(base64);
      
      try {
        const response = await fetch(`${API}/upload/image`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            filename: file.name,
            data: base64
          })
        });

        if (response.ok) {
          const data = await response.json();
          const fullUrl = `${process.env.REACT_APP_BACKEND_URL}${data.url}`;
          setPreview(fullUrl);
          onChange(fullUrl);
        } else {
          console.error('Upload failed');
        }
      } catch (error) {
        console.error('Upload error:', error);
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleRemove = () => {
    setPreview('');
    onChange('');
  };

  return (
    <div className={className}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        accept="image/*"
        className="hidden"
      />
      
      {preview ? (
        <div className="relative border-2 border-[#0047FF] bg-white">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-white border-2 border-[#0047FF] text-[#0047FF] hover:bg-[#0047FF] hover:text-white transition-colors duration-200"
            data-testid="remove-image"
          >
            <X className="w-4 h-4" />
          </button>
          {uploading && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-[#0047FF] border-t-transparent animate-spin" />
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed cursor-pointer p-8 text-center transition-colors duration-200 ${
            isDragging
              ? 'border-[#0047FF] bg-[#0047FF]/10'
              : 'border-[#0047FF]/50 hover:border-[#0047FF] hover:bg-[#0047FF]/5'
          }`}
          data-testid="image-dropzone"
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-4 border-[#0047FF] border-t-transparent animate-spin" />
              <p className="font-futura text-[#0047FF]">Upload en cours...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              {isDragging ? (
                <Image className="w-12 h-12 text-[#0047FF]" />
              ) : (
                <Upload className="w-12 h-12 text-[#0047FF]/50" />
              )}
              <p className="font-futura text-[#0047FF]">
                {isDragging ? 'Déposez l\'image ici' : 'Glissez une image ou cliquez pour sélectionner'}
              </p>
              <p className="font-futura text-[#0047FF]/50 text-sm">
                PNG, JPG, WEBP (max 5MB)
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
