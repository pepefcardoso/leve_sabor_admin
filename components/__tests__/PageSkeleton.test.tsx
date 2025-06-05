import { render, screen } from '@testing-library/react';
import PageSkeleton from '../Skeletons/PageSkeleton';

describe('PageSkeleton', () => {
  it('renderiza corretamente', () => {
    render(<PageSkeleton />);
    expect(screen.getByTestId('page-skeleton')).toBeInTheDocument();
  });

  it('renderiza skeleton com elementos visuais', () => {
    render(<PageSkeleton />);
    // Verifica se há pelo menos um elemento com classe bg-gray-300 (skeleton)
    expect(document.querySelector('.bg-gray-300')).toBeInTheDocument();
  });
});
