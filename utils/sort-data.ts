export const SortData = (data: any) => {
  return Array.isArray(data)
    ? data.sort(
        (a: any, b: any) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      )
    : null;
};
