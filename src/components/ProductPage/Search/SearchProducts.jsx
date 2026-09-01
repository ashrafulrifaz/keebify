const SearchProducts = ({ value = '', onChange }) => {
    return (
        <div className="flex gap-2 items-center bg-border/75 rounded-full py-2 px-2.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#414141" fill="none" stroke="#414141" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 17L21 21"></path>
                <path d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z"></path>
            </svg>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
                placeholder="Search products"
                className="focus:outline-0 text-sm bg-transparent w-full"
            />
        </div>
    );
};

export default SearchProducts;