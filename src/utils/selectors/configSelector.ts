import { createSelector } from 'reselect';
import findItem from '@utils/findItem';

interface ConfigData {
  key: string,
  name: string,
  value: Record<string, object>
}

interface ResponseData {
  token: string,
  config: ConfigData[]
}

export interface Response {
  responseCode: number | string,
  reponseMessage: string,
  response: ResponseData
}

const selectResponse = (data: Response) => data?.response ?? {};

export const selectConfig = createSelector(selectResponse, response => response?.config ?? {});

export const selectHeaderConfig = createSelector(selectConfig, findItem<ConfigData>('header'));

export const selectFooterConfig = createSelector(selectConfig, findItem<ConfigData>('footer'));

export const selectGlobalConfig = createSelector(selectConfig, findItem<ConfigData>('global'));

export const selectPagesConfig = createSelector(selectConfig, findItem<ConfigData>('pages'));

export const selectHomePageConfig = createSelector(selectPagesConfig, pageConfig => pageConfig?.home ?? {} );

export const selectCategoryListingPageConfig = createSelector(selectPagesConfig, pageConfig => pageConfig?.categoryListing ?? {} );

export const selectCategoryFootballPageConfig = createSelector(selectCategoryListingPageConfig, categoryPageConfig => {
  return categoryPageConfig?.categories?.football ?? {}
});
