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
      <NavigationComponent />
      <PageHeaderComponent title="Agenda" />
      <AgendaTableComponent title="Design Track" />
    </div >
  );
}
