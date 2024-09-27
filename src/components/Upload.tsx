'use client'

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRoastResume } from '@/hooks/useRoastResume';  // Assuming the hook is in this file

export function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [language, setLanguage] = useState<string>('id');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { streamData, isLoading, error } = useRoastResume(file, language);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Please select a PDF file.');
      setFile(null);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      alert('Please select a file before submitting.');
    }
  };

  return (
    <Card className="w-full max-w-md bg-white border border-gray-200 shadow-md">
      <CardHeader>
        <CardTitle className="text-gray-800">Upload Your CV</CardTitle>
        <CardDescription className="text-gray-600">Upload your CV in PDF format for review</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Input 
              ref={fileInputRef}
              id="cv" 
              type="file" 
              accept=".pdf"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button 
              type="button"
              onClick={handleButtonClick}
              className="w-full bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {file ? 'Change File' : 'Select File'}
            </Button>
            {file && (
              <p className="mt-2 text-sm text-gray-600">
                Selected file: {file.name}
              </p>
            )}
          </div>
          <Button 
            type="submit" 
            className="w-full bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            disabled={!file}
          >
            Upload
          </Button>
        </form>
        <div className="mt-4">
          {isLoading && <p>Uploading and roasting...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          {streamData && (
            <div className="space-y-2">
              {/* Display the streamed data smoothly */}
              <pre className="whitespace-pre-wrap">{streamData}</pre>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
