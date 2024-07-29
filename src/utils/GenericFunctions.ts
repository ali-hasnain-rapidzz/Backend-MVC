export const createPaginationResponse = ({
  total = 0,
  list = [],
  currentPage = 1,
  limit = 10,
}: {
  total: number;
  list: any[];
  currentPage: number;
  limit: number;
}) => {
  const ttlPage = Math.ceil(total / limit);

  return {
    total,
    currentPage,
    nextPage: ttlPage <= currentPage || total === 0 ? null : currentPage + 1,
    listSize: list.length,
    limit,
    list,
  };
};

export const adjustFullNameWRTpartialName = (data: {
  old_first_name: string;
  old_last_name: string;
  new_first_name?: string;
  new_last_name?: string;
}) => {
  const { old_first_name, old_last_name, new_first_name, new_last_name } = data;
  let fullName = old_first_name + " " + old_last_name;
  if (new_first_name) fullName = new_first_name + " " + old_last_name;
  if (new_last_name) fullName = old_first_name + " " + new_last_name;
  if (new_first_name && new_last_name) fullName = new_first_name + " " + new_last_name;
  else fullName = old_first_name + " " + old_last_name;
  return fullName;
};
