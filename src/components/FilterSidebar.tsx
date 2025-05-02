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
    setOpenFavoritesModal?: () => void;
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
        setOpenFavoritesModal = () => {}
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

            <hr/>

            <div className='flex w-full justify-center items-center'>
                <button
                    onClick={() => setOpenFavoritesModal()}
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    >
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                    <span>Favoritos</span>
                </button>
            </div>
        </div>

        <div className={`${openMobileMenu ? 'fixed' : 'hidden'} md:hidden inset-0 z-50 top-14 backdrop-blur-sm bg-black/30 flex justify-center`}>
            <div className="bg-blue-300 p-6 rounded shadow-lg w-full max-w-md">
                <button
                    type="button"
                    onClick={() => setOpenMobileMenu(true)}
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

            <hr className='my-4'/>

            <div className='flex w-full justify-center items-center'>
                <button
                    onClick={() => setOpenFavoritesModal()}
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    >
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                    <span>Favoritos</span>
                </button>
            </div>
            </div>
        </div>
    </>
  );
}