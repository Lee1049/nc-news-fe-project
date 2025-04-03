function SortBy({ setSortBy }) {
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div>
      <label htmlFor="sort-by">Sort by: </label>
      <select id="sort-by" onChange={handleSortChange}>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="most_votes">Most Votes</option>
        <option value="least_votes">Least Votes</option>
        <option value="most_comments">Most Comments</option>
        <option value="least_comments">Least Comments</option>
      </select>
    </div>
  );
}
export default SortBy;
