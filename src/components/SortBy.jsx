function SortBy({ setSortBy }) {
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div>
      <label htmlFor="sort-by">Sort by: </label>
      <select id="sort-by" onChange={handleSortChange}>
        <option value="created_at">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
}
export default SortBy;
