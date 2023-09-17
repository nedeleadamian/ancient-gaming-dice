import { SortInput } from '@common/abstraction/schemes/base-pagination.input';
import { FindOptions } from 'sequelize/types/model';

export const PopulatePaginationSort = (
  sort: SortInput[],
  sortableFields: string[],
  queryOptions: FindOptions,
) => {
  const validSortFields = sort.filter((sort) =>
    sortableFields.includes(sort.field),
  );

  if (validSortFields.length) {
    queryOptions['order'] = validSortFields.map((sort) => [
      sort.field,
      sort.order,
    ]);
  }
  return queryOptions;
};
