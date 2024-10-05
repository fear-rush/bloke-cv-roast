import { useEffect, useState } from "react";

export function useRoastResume(file: File | null, language: string, submit: boolean) {
  const [streamData, setStreamData] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!file || !submit) return;

    const fetchData = async () => {
      setIsLoading(true);
      setStreamData("");
      setError(null);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("language", language);

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}`, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "text/event-stream",
          },
        });

        if (response.status === 429) {
          setError("Today's limit is reached, try again tomorrow.");
          return;
        }

        if (response.status === 413) {
          setError("File is too large. Max size is 2.0 MB");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to upload file");
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        // Read chunks of data
        const processStream = async () => {
          while (true) {
            const { done, value } = await reader!.read();
            if (done) break;

            // Decode the received chunk into text
            const chunk = decoder.decode(value, { stream: true });

            // Simulate smooth streaming by appending words incrementally
            const words = chunk.split(" ");
            for (const word of words) {
              setStreamData((prev) => prev + word + " ");

              // Delay for smoother animation (adjust for desired effect)
              await new Promise((resolve) => setTimeout(resolve, 100)); // 100ms per word
            }
          }
        };

        await processStream();
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred.";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [file, language, submit]);

  return { streamData, isLoading, error };
}
