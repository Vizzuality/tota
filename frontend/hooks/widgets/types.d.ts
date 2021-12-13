import { ReactNode } from 'react';
import { UseQueryResult } from 'react-query';
import { Widget } from 'types';

export interface UseWidgetsResponse extends UseQueryResult<Widget[]> {
  widgets: Widget[];
}
