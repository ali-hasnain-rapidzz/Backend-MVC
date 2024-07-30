import { SORT_BY } from "@Constants/enum.constants";
import { FilterValidationType } from "@Validations/pagination.validation";
import { PipelineStage } from "mongoose";

class GenericAggregationClass {
  paginateAndSort = (data: { filter?: FilterValidationType; page: number; limit: number }): PipelineStage[] => {
    const { filter = { sortByKey: "createdAt", sortOrder: SORT_BY.DESC }, page, limit } = data;
    const sortOptions = filter?.sortByKey
      ? { [filter.sortByKey]: filter.sortOrder === SORT_BY.ASC ? 1 : -1 }
      : {};

    return [
      { $sort: { ...sortOptions } },
      { $skip: (Number(page) - 1) * Number(limit) },
      { $limit: limit },
    ] as PipelineStage[];
  };

  aggregateUsers = ({ page, limit, filter }: { page: number; limit: number; filter?: FilterValidationType }): PipelineStage[] => {
    const paginationStages = this.paginateAndSort({ page, limit, filter });

    return [
      {
        $facet: {
          data: paginationStages,
          count: [{ $count: "totalCount" }],
        },
      },
      {
        $project: {
          data: 1,
          totalCount: { $arrayElemAt: ["$count.totalCount", 0] },
        },
      },
    ] as PipelineStage[];
  };
}

export const GenericAggregation = new GenericAggregationClass();
