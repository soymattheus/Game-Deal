import Deal from '../types/Deal';
import { Button } from './Button';

interface DataTableProps {
  children: React.ReactNode;
  Columns: string[];
  deals: Deal[];
  loading: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setIsPagingUpdate?: (isPagingUpdate: boolean) => void;
}

export default function DataTable({
  children,
  Columns,
  deals,
  loading,
  currentPage,
  setCurrentPage,
  setIsPagingUpdate = () => {},
}: DataTableProps) {
  return (
    <div className="p-4">
  <div className="overflow-x-auto rounded-xl shadow-md">
    <table className="w-full table-auto border-collapse">
      <thead className="bg-blue-300 text-gray-800 text-sm uppercase tracking-wide">
        <tr>
          {Columns?.map((column) => (
            <th 
              key={column} 
              className="px-4 py-3 border text-left font-semibold"
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white">
        {loading
          ? Array.from({ length: 6 }).map((_, rowIndex) => (
              <tr key={rowIndex} className="animate-pulse">
                {Columns.map((_, colIndex) => (
                  <td key={colIndex} className="px-4 py-3 border">
                    <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                  </td>
                ))}
              </tr>
            ))
          : children}
      </tbody>
    </table>
  </div>

  {/* Paginação */}
  <div className="flex justify-center items-center mt-6 gap-3">
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

    <span className="px-4 py-2 text-sm font-medium text-gray-900 rounded-lg">
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
