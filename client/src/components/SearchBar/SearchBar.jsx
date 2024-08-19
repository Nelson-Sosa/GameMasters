import './SearchBar.css'
const SearchBar = () =>{

    return(
      <div className="searchBarContain">
        <form class="max-w-md mx-auto">
          <label className='lab'
            for="default-search"
            
          >
            Search products
          </label>
          <div class="relative">
            <input
              type="search"
              id="default-search"
              placeholder="Search"
            />
            <button
              type="submit"
            >
              Search
            </button>
          </div>
        </form>
      </div>
   
    )
}

export default SearchBar;