import Input from '../components/Input';
import PriceRange from '../components/PriceRange';
import Select from '../components/Select';
import Store from '../types/Store';

const SortOptions = [
    { value: 'Price', label: 'Price' },
    { value: 'Savings', label: 'Savings' },
    { value: 'DealRating', label: 'Deal Rating' },
];

interface FilterSidebarProps {
    search: string;
    setSearch: (value: string) => void;
    storeID: string;
    setStoreID: (value: string) => void;
    priceRange: number[];
    setPriceRange: (value: number[]) => void;
    sortBy: string;
    setSortBy: (value: string) => void;
    stores: Store[];
    openMobileMenu: boolean;
    setOpenMobileMenu: (value: boolean) => void;
}

export default function FilterSidebar(
    {
        search, 
        setSearch, 
        storeID, 
        setStoreID, 
        priceRange, 
        setPriceRange,
        sortBy,
        setSortBy,
        stores,
        openMobileMenu,
        setOpenMobileMenu = () => {},
    }: FilterSidebarProps) {

  return (
    <>
        <div className="hidden md:flex flex-col gap-4 w-1/5 px-4 bg-blue-300">
            {/* Search Game */}
            <div className='pt-4'>
                <Input
                    description='Search Game' 
                    value={search}
                    placeholder='Enter game name'
                    onChange={setSearch}
                    type='text'
                />
            </div>

            {/* Select Store */}
            <Select description='Store' value={storeID} onChange={setStoreID}>
                <option value=''>All Stores</option>
                {stores.map((option) => (
                    <option key={option.storeID} value={option.storeID}>
                        {option.storeName}
                    </option>
                ))}
            </Select>

            {/* Price Range */}
            <PriceRange min={priceRange[0]} max={priceRange[1]} onChange={setPriceRange}/>

            {/* Sort By */}
            <Select description='Sort by' value={sortBy} onChange={setSortBy}>
            {SortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Select>
        </div>

        <div className={`${openMobileMenu ? 'fixed' : 'hidden'} md:hidden inset-0 z-50 backdrop-blur-sm bg-black/30 flex items-center justify-center`}>
            <div className="relative bg-blue-300 p-6 rounded shadow-lg w-full max-w-md">
                <button
                    type="button"
                    onClick={() => setOpenMobileMenu(false)}
                    className="absolute top-4 right-8 text-gray-600 hover:text-black cursor-pointer"
                >
                    ✕
                </button>
                {/* Search Game */}
                <div className='pt-4'>
                    <Input
                        description='Search Game' 
                        value={search}
                        placeholder='Enter game name'
                        onChange={setSearch}
                        type='text'
                    />
                </div>

                {/* Select Store */}
            <Select description='Store' value={storeID} onChange={setStoreID}>
                <option value=''>All Stores</option>
                {stores.map((option) => (
                    <option key={option.storeID} value={option.storeID}>
                        {option.storeName}
                    </option>
                ))}
            </Select>

            {/* Price Range */}
            <PriceRange min={priceRange[0]} max={priceRange[1]} onChange={setPriceRange}/>

            {/* Sort By */}
            <Select description='Sort by' value={sortBy} onChange={setSortBy}>
            {SortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Select>
            </div>
        </div>
    </>
  );
}