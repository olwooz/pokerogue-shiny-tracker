import { memo, useCallback, useState } from 'react';
import { decryptPrsvFile } from '../lib/file-decryptor';

interface FileDropZoneProps {
  onFileLoad: (content: string) => void;
  isDisabled?: boolean;
}

function FileDropZone({ onFileLoad, isDisabled = false }: FileDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const processFile = useCallback(
    async (file: File) => {
      setIsProcessing(true);
      setFileError(null);

      try {
        if (!file.name.endsWith('.prsv')) {
          throw new Error('Please upload a .prsv file');
        }

        const decryptedContent = await decryptPrsvFile(file);
        onFileLoad(decryptedContent);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to process file';
        setFileError(errorMessage);
        setTimeout(() => setFileError(null), 5000);
      } finally {
        setIsProcessing(false);
      }
    },
    [onFileLoad]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      if (isDisabled || isProcessing) return;

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        processFile(files[0]);
      }
    },
    [isDisabled, isProcessing, processFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        processFile(files[0]);
      }

      e.target.value = '';
    },
    [processFile]
  );

  return (
    <div className='mb-4'>
      <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
        Upload .prsv File
      </label>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center transition-all
          ${
            isDragging
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
              : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'
          }
          ${
            isDisabled || isProcessing
              ? 'opacity-50 cursor-not-allowed'
              : 'cursor-pointer hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30'
          }
        `}
      >
        <input
          type='file'
          accept='.prsv'
          onChange={handleFileInput}
          disabled={isDisabled || isProcessing}
          className='absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed'
          aria-label='Upload .prsv file'
        />

        <div className='pointer-events-none'>
          <svg
            className='mx-auto h-12 w-12 text-gray-400 dark:text-gray-500'
            stroke='currentColor'
            fill='none'
            viewBox='0 0 48 48'
            aria-hidden='true'
          >
            <path
              d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
              strokeWidth={2}
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>

          {isProcessing ? (
            <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>Processing file...</p>
          ) : (
            <>
              <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
                <span className='font-semibold text-blue-600 dark:text-blue-400'>
                  Click to upload
                </span>{' '}
                or drag and drop
              </p>
              <p className='mt-1 text-xs text-gray-500 dark:text-gray-400'>.prsv files only</p>
            </>
          )}
        </div>
      </div>

      {fileError && (
        <div className='mt-2 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 px-3 py-2 rounded text-sm'>
          {fileError}
        </div>
      )}
    </div>
  );
}

export default memo(FileDropZone);
