import { useEffect, useState } from 'react';

export function useRoastResume(file: File | null, language: string) {
  const [streamData, setStreamData] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;

    const fetchData = async () => {
      setIsLoading(true);
      setStreamData('');
      setError(null);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('language', language);

      try {
        const response = await fetch('http://localhost:8000/roast-resume', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'text/event-stream',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to upload file');
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        let accumulatedText = '';

        while (true) {
          const { done, value } = await reader!.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          accumulatedText += chunk;

          // Add delay for a smoother effect
          await new Promise((resolve) => setTimeout(resolve, 50));

          // Update the UI with accumulated text in a way that it flows naturally
          setStreamData((prev) => prev + chunk.trim());  // Trim excess spaces
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [file, language]);

  return { streamData, isLoading, error };
}
