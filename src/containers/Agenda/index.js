/**
 * Agenda
 *
 * This is the page we show when the user visits /agenda/
 *
 */

import React from 'react';
import NavigationComponent from '../../components/navigation';
import PageHeaderComponent from '../../components/pageHeader';
import AgendaTableComponent from '../../components/agendaTable';

export default function AgendaPage() {
  return (
    <div>
      <a aria-label="skip to Sunday, Nov 3 aganda" href="#Nov3" className="sr-only">skip to Sunday, Nov 3 aganda</a>
      <a aria-label="skip to Sunday, Nov 4 aganda" href="#Nov4" className="sr-only">skip to Sunday, Nov 4 aganda</a>
      <a aria-label="skip to Sunday, Nov 5 aganda" href="#Nov5" className="sr-only">skip to Sunday, Nov 5 aganda</a>
      <a aria-label="skip to Sunday, Nov 6 aganda" href="#Nov6" className="sr-only">skip to Sunday, Nov 6 aganda</a>
      <a aria-label="skip to Sunday, Nov 7 aganda" href="#Nov7" className="sr-only">skip to Sunday, Nov 7 aganda</a>

      <NavigationComponent />
      <PageHeaderComponent title="Agenda" />
      <AgendaTableComponent title="Design Track" />
    </div >
  );
}
