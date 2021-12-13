import { ReactNode } from 'react';
import { UseQueryResult } from 'react-query';
import { Theme } from 'types';

export interface UseThemesResponse extends UseQueryResult<Theme[]> {
  themes: Theme[];
}
