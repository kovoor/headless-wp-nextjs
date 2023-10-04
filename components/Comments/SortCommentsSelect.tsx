import React from 'react';
import { useComments, SortingBehavior } from '../../lib/hooks/use-comments';

const SortCommentsSelect = (): JSX.Element => {
  const { sortingBehavior, setSortingBehavior } = useComments();

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>): void {
    setSortingBehavior(e.target.value as SortingBehavior);
  }
  return (
    <select
      className="text-gray-800 text-xs my-2 py-2 px-2 rounded-md border-gray-300 border-solid border focus-ring w-20 text-center bg-gray-200"
      onChange={handleSelect}
      value={sortingBehavior}
      aria-label="Sort votes by"
    >
      <option value="pathVotesRecent">Top</option>
      <option value="pathMostRecent">New</option>
      <option value="pathLeastRecent">Old</option>
    </select>
  );
};

export default SortCommentsSelect;
