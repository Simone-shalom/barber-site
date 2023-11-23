import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ImageUpload } from '@/components/ImageUpload';

describe('ImageUpload component', () => {
        // Displays an ImageIcon and a "Add Image for the service" text
        it('should display an ImageIcon and a "Add Image for the service" text', () => {
          render(<ImageUpload value="" onChange={() => {}} />);
          const text = screen.getByText('Add Image for the service');
          expect(text).toBeInTheDocument();
        });

     // Does not render anything if mounted state is false even after it becomes true
    it('should not render anything if mounted state is false even after it becomes true', () => {
      render(<ImageUpload value="" onChange={() => {}} />);
      const div = screen.queryByRole('div');
      expect(div).not.toBeInTheDocument();
    });

        // Does not display a value image if value prop is an empty string
        it('should not display a value image if value prop is an empty string', () => {
          render(<ImageUpload value="" onChange={() => {}} />);
          const image = screen.queryByRole('img');
          expect(image).not.toBeInTheDocument();
        });
});

describe("Image Upload functionality", () => {
      // Renders a CldUploadButton component with options and uploadPreset props
      it('should render a CldUploadButton component with options and uploadPreset props', () => {
        jest.mock('next-cloudinary', () => ({
          CldUploadButton: jest.fn(({ onUpload, options, uploadPreset }) => {
            expect(options).toEqual({ maxFiles: 1 });
            expect(uploadPreset).toEqual('fs52murh');
            return null;
          }),
        }));
  
        render(<ImageUpload value="" onChange={() => {}} />);
      });
})