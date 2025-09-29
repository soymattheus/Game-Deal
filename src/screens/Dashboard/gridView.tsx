import { Button } from '../../components/Button';
import StarRating from '../../components/StarRating';
import Deal from '../../types/Deal';

interface GridViewProps {
  Columns: string[];
  deals: Deal[];
  loading: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  handleSelectDeal: (deal: Deal) => void;
  setIsPagingUpdate?: (isPagingUpdate: boolean) => void;
}

export default function GridView({
  deals,
  loading,
  currentPage,
  setCurrentPage,
  handleSelectDeal,
  setIsPagingUpdate = () => {},
}: GridViewProps) {
  return (
    <div className="p-6">
  <div className="overflow-x-auto rounded-xl">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading
        ? Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="p-4 border rounded-xl shadow animate-pulse space-y-3 bg-white dark:bg-gray-800"
            >
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              </div>
              <div className="w-full h-40 bg-gray-300 rounded-lg"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="h-8 bg-gray-300 rounded w-full"></div>
            </div>
          ))
        : deals.map((deal) => (
            <div
              key={deal.dealID}
              className="p-4 border rounded-xl bg-white dark:bg-gray-800 shadow hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
            >
              <div className="flex flex-row items-center justify-between mb-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {deal.storeName}
                </p>
                <StarRating rating={Number(deal?.dealRating)} />
              </div>

              <img
                src={deal.thumb}
                alt={deal.title}
                className="w-full h-40 object-cover rounded-lg shadow-sm"
              />

              <p className="text-md font-semibold text-blue-600 mt-3">
                {deal.title}
              </p>

              <p className="mt-1 text-sm">
                <span className="line-through text-gray-500">
                  ${deal.normalPrice}
                </span>{" "}
                <span className="text-green-600 font-semibold text-lg">
                  ${deal.salePrice}
                </span>
              </p>

              <p className="text-red-600 text-sm font-medium">
                {parseInt(deal.savings)}% OFF
              </p>

              <Button
                onClick={() => handleSelectDeal(deal)}
                className="w-full mt-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              >
                Details
              </Button>
            </div>
          ))}
    </div>
  </div>

  {/* Paginação */}
  <div className="flex justify-center mt-6 gap-3 items-center">
    <Button
      disabled={currentPage === 0 || loading}
      onClick={() => {
        setCurrentPage(currentPage - 1);
        setIsPagingUpdate(true);
      }}
      className="disabled:opacity-50 rounded-full px-4 py-2"
    >
      Previous
    </Button>

    <span className="px-3 py-1 text-gray-900 text-sm">
      Page {currentPage + 1}
    </span>

    <Button
      onClick={() => {
        setCurrentPage(currentPage + 1);
        setIsPagingUpdate(true);
      }}
      disabled={deals.length < 5 || loading}
      className="disabled:opacity-50 rounded-full px-4 py-2"
    >
      Next
    </Button>
  </div>
</div>

  );
}
