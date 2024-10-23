export const isEmailValid = (candidate: string) => {
  if (!candidate) return false;
  return candidate.match(
    /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm
  );
};
