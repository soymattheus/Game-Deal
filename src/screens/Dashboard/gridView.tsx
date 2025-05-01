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
    <div className="p-4">
      <div className="overflow-x-auto rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          loading
          ? Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow animate-pulse space-y-2"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              </div>
              <div className="w-full h-40 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mt-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="h-8 bg-gray-300 rounded w-full mt-2"></div>
            </div>
          ))
          :
            deals.map((deal) => (
                <div key={deal.dealID} className="p-4 border rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
                    <div className='flex flex-row items-center justify-between mb-2'>
                        <p>{deal.storeName}</p>
                        <StarRating rating={Number(deal?.dealRating)}/>
                    </div>
                    <img src={deal.thumb} alt={deal.title} className="w-full h-40 object-cover rounded" />
                    <p className="text-md text-blue-500 font-medium mt-2">{deal.title}</p>
                    <p>
                        <span className="line-through text-gray-500">From ${deal.normalPrice}</span> {' '}
                        <span className="text-green-600">to ${deal.salePrice}</span>
                    </p>
                    <p className="text-red-600">
                        {parseInt(deal.savings)}% saving
                    </p>

                    <Button onClick={() => handleSelectDeal(deal)}>
                        Details
                    </Button>
                </div>
                ))
        }
            </div>
      </div>

      {/* Paginação */}
        <div className="flex justify-center mt-4 gap-2">
            <Button 
                disabled={currentPage === 0 || loading}
                onClick={() => 
                  {setCurrentPage(currentPage - 1)
                  setIsPagingUpdate(true)
                }}
                className="disabled:opacity-50"
            >
                Previous
            </Button>

          <span className="px-3 py-1 text-gray-700">Page {currentPage + 1}</span>

          <Button
             onClick={() => 
              {setCurrentPage(currentPage + 1)
              setIsPagingUpdate(true)
            }}
            disabled={deals.length < 5 || loading}
            className="disabled:opacity-50"
          >
            Next
          </Button>
        </div>
    </div>
  );
}
