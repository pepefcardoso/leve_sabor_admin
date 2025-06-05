import { render, screen } from '@testing-library/react';
import HydrationZustand from '../hydrationZustand';

describe('HydrationZustand', () => {
  it('exibe children após hidratação', () => {
    render(
      <HydrationZustand>
        <div>Conteúdo</div>
      </HydrationZustand>
    );
    // O conteúdo deve aparecer após o efeito
    expect(screen.getByText('Conteúdo')).toBeInTheDocument();
  });
});
